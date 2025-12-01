// app/api/calcom-webhook/route.ts

import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function hashSHA256(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

// Verify Cal.com webhook signature
function verifySignature(payload: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: NextRequest) {
  console.log("[Cal.com Webhook] Received webhook");

  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-cal-signature-256");
    const webhookSecret = process.env.CALCOM_WEBHOOK_SECRET;

    // Verify webhook signature if secret is configured
    if (webhookSecret && !verifySignature(rawBody, signature, webhookSecret)) {
      console.error("[Cal.com Webhook] Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const body = JSON.parse(rawBody);
    console.log("[Cal.com Webhook] Trigger event:", body.triggerEvent);

    // Only process BOOKING_CREATED events
    if (body.triggerEvent !== "BOOKING_CREATED") {
      console.log("[Cal.com Webhook] Ignoring non-booking event:", body.triggerEvent);
      return NextResponse.json({ message: "Ignoring non-booking event" });
    }

    const payload = body.payload;
    if (!payload) {
      console.error("[Cal.com Webhook] No payload found");
      return NextResponse.json({ error: "No payload" }, { status: 400 });
    }

    // Extract user data from payload
    const responses = payload.responses || {};
    const attendees = payload.attendees || [];
    const firstAttendee = attendees[0] || {};

    // Get email from responses or attendees
    const email = responses.email?.value || firstAttendee.email || "";

    // Get name - could be in responses.name or attendees
    const fullName = responses.name?.value || firstAttendee.name || "";
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Get phone from responses (custom field)
    let phone = "";
    if (responses.phone?.value) {
      phone = responses.phone.value;
    } else if (responses["telefono"]?.value) {
      phone = responses["telefono"].value;
    } else if (responses["Teléfono"]?.value) {
      phone = responses["Teléfono"].value;
    }

    // Determine Meta event name based on event type
    const eventTypeSlug = payload.type || "";
    const eventTitle = payload.title || "";

    let metaEventName: string;

    // Check if this is a meditation session (TOFU) or a sales call (MOFU/BOFU)
    if (
      eventTypeSlug.includes("meditacion") ||
      eventTitle.toLowerCase().includes("meditación") ||
      eventTitle.toLowerCase().includes("meditacion")
    ) {
      metaEventName = "CompleteRegistration";
      console.log("[Cal.com Webhook] Detected TOFU meditation event -> CompleteRegistration");
    } else {
      metaEventName = "Schedule";
      console.log("[Cal.com Webhook] Detected MOFU/BOFU event -> Schedule");
    }

    // Get tracking parameters from metadata or organizer info
    const metadata = payload.metadata || {};
    const clientIP = request.headers.get("x-forwarded-for") || null;
    const userAgent = request.headers.get("user-agent");

    // Build user data for Meta CAPI
    const userData: Record<string, string> = {};
    if (email) userData.em = hashSHA256(email);
    if (firstName) userData.fn = hashSHA256(firstName);
    if (lastName) userData.ln = hashSHA256(lastName);
    if (phone) userData.ph = hashSHA256(phone.replace(/\D/g, ''));
    if (clientIP) userData.client_ip_address = clientIP;
    if (userAgent) userData.client_user_agent = userAgent;

    // Generate unique event ID
    const eventId = `calcom_${payload.uid || Date.now()}`;
    const eventSourceUrl = payload.bookerUrl
      ? `${payload.bookerUrl}/${eventTypeSlug}`
      : "https://www.escuelafloresiendomexico.com/f/meditacion";

    // Prepare Meta CAPI payload
    const metaPixelId = process.env.META_PIXEL_ID;
    const metaAccessToken = process.env.META_CAPI_ACCESS_TOKEN;

    if (!metaPixelId || !metaAccessToken) {
      console.error("[Cal.com Webhook] Missing Meta credentials");
      return NextResponse.json({ error: "Missing Meta credentials" }, { status: 500 });
    }

    const metaPayload = {
      data: [{
        event_name: metaEventName,
        event_time: Math.floor(new Date(body.createdAt || Date.now()).getTime() / 1000),
        action_source: "website",
        event_id: eventId,
        event_source_url: eventSourceUrl,
        user_data: userData,
        custom_data: {
          calcom_event_type: eventTypeSlug,
          calcom_event_title: eventTitle,
          content_type: "calcom_booking",
          funnel: eventTypeSlug.includes("meditacion") ? "meditacion" : "retiro",
        }
      }],
    };

    console.log("[Cal.com Webhook] Sending to Meta:", JSON.stringify(metaPayload, null, 2));

    // Send to Meta CAPI
    const metaUrl = `https://graph.facebook.com/v21.0/${metaPixelId}/events?access_token=${metaAccessToken}`;

    const metaResponse = await fetch(metaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metaPayload),
    });

    if (!metaResponse.ok) {
      const errorData = await metaResponse.json();
      console.error("[Cal.com Webhook] Error sending event to Meta:", errorData);
      throw new Error(`Meta API responded with status ${metaResponse.status}`);
    }

    const metaResult = await metaResponse.json();
    console.log("[Cal.com Webhook] Successfully sent event to Meta:", metaResult);

    // Optionally: Also create HubSpot contact
    if (email || phone) {
      try {
        const hubspotPayload = {
          firstname: firstName,
          lastname: lastName,
          phone: phone,
          funnel_source: eventTypeSlug.includes("meditacion") ? "meditacion" : "retiro",
          landing_page: eventSourceUrl,
        };

        await fetch(`${request.nextUrl.origin}/api/hubspot-contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hubspotPayload),
        });
        console.log("[Cal.com Webhook] HubSpot contact created/updated");
      } catch (hubspotError) {
        console.warn("[Cal.com Webhook] HubSpot sync failed (non-critical):", hubspotError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Webhook processed correctly",
      meta_event: metaEventName,
      event_id: eventId,
    });

  } catch (error) {
    console.error("[Cal.com Webhook] CRITICAL ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}