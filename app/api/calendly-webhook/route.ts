// app/api/calendly-webhook/route.ts

import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function hashSHA256(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

export async function POST(request: NextRequest) {
  console.log("[Calendly Webhook] Received webhook");

  try {
    const body = await request.json();
    console.log("[Calendly Webhook] Event type:", body.event);

    if (body.event !== "invitee.created") {
      return NextResponse.json({ message: "Ignoring non-creation event" });
    }

    const inviteeUri = body.payload?.uri;
    if (!inviteeUri) {
      console.error("[Calendly Webhook] No invitee URI found in payload");
      return NextResponse.json({ error: "No invitee URI" }, { status: 400 });
    }

    const accessToken = process.env.CALENDLY_ACCESS_TOKEN;
    const inviteeResponse = await fetch(inviteeUri, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!inviteeResponse.ok) {
      const errorText = await inviteeResponse.text();
      console.error("[Calendly Webhook] Failed to fetch invitee details:", errorText);
      return NextResponse.json({ error: "Failed to fetch details" }, { status: 500 });
    }

    const inviteeData = await inviteeResponse.json();
    console.log("[Calendly Webhook] Invitee details received.");

    // ----- ¡AQUÍ ESTÁ LA LÓGICA ROBUSTA! -----
    // Usamos la URI del TIPO de evento, que es un identificador único y fiable.
    const eventTypeUri = inviteeData.resource?.event_type?.uri || "";
    let metaEventName: string;

    if (eventTypeUri.includes("meditacion-gratuita")) {
      // Si la URI contiene el slug de nuestro evento de meditación...
      metaEventName = "CompleteRegistration";
    } else {
      // Para cualquier otro evento (como la llamada de ventas)...
      metaEventName = "Schedule";
    }
    console.log(`[Calendly Webhook] Determined event from URI: '${eventTypeUri}' -> Meta Event: '${metaEventName}'`);
    // ----- FIN DE LA LÓGICA ROBUSTA -----

    const email = inviteeData.resource?.email;
    const name = inviteeData.resource?.name || "";
    const nameParts = name.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";
    let phone = "";
    const questionsAndAnswers = inviteeData.resource?.questions_and_answers || [];
    for (const qa of questionsAndAnswers) {
      if (qa.question.toLowerCase().includes("teléfono")) {
        phone = qa.answer || "";
        break;
      }
    }
    const tracking = inviteeData.resource?.tracking || {};
    const fbp = tracking.utm_source || null;
    const fbc = tracking.utm_medium || null;
    const eventSourceUrl = tracking.utm_campaign || "https://www.escuelafloresiendomexico.com/meditacion-gratuita";
    const clientIP = request.headers.get("x-forwarded-for") || null;
    const userAgent = request.headers.get("user-agent");

    const userData: any = {};
    if (email) userData.em = hashSHA256(email);
    if (firstName) userData.fn = hashSHA256(firstName);
    if (lastName) userData.ln = hashSHA256(lastName);
    if (phone) userData.ph = hashSHA256(phone.replace(/\D/g, ''));
    if (clientIP) userData.client_ip_address = clientIP;
    if (userAgent) userData.client_user_agent = userAgent;
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    const metaPixelId = process.env.META_PIXEL_ID;
    const metaAccessToken = process.env.META_CAPI_ACCESS_TOKEN;
    const eventId = `calendly_${body.payload.uri.split('/').pop()}`;

    const metaPayload = {
      data: [{
        event_name: metaEventName,
        event_time: Math.floor(new Date(body.created_at).getTime() / 1000),
        action_source: "website",
        event_id: eventId,
        event_source_url: eventSourceUrl,
        user_data: userData,
        custom_data: {
          calendly_event_uri: eventTypeUri
        }
      }],
    };

    const metaUrl = `https://graph.facebook.com/v21.0/${metaPixelId}/events?access_token=${metaAccessToken}`;

    const metaResponse = await fetch(metaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metaPayload),
    });

    if (!metaResponse.ok) {
      const errorData = await metaResponse.json();
      console.error("[Calendly Webhook] Error sending event to Meta:", errorData);
      throw new Error(`Meta API responded with status ${metaResponse.status}`);
    }

    const metaResult = await metaResponse.json();
    console.log("[Calendly Webhook] Successfully sent event to Meta:", metaResult);

    return NextResponse.json({ success: true, message: "Webhook processed correctly" });

  } catch (error) {
    console.error("[Calendly Webhook] CRITICAL ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}