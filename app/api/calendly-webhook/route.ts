// app/api/calendly-webhook/route.ts

import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Función para hashear datos (usaremos el crypto nativo de Node.js que es más simple aquí)
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
      console.error("[Calendly Webhook] No invitee URI found");
      return NextResponse.json({ error: "No invitee URI" }, { status: 400 });
    }

    console.log("[Calendly Webhook] Fetching invitee details from:", inviteeUri);
    
    const accessToken = process.env.CALENDLY_ACCESS_TOKEN;
    const inviteeResponse = await fetch(inviteeUri, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!inviteeResponse.ok) {
      const errorText = await inviteeResponse.text();
      console.error("[Calendly Webhook] Failed to fetch invitee:", errorText);
      return NextResponse.json({ error: "Failed to fetch invitee", details: errorText }, { status: 500 });
    }

    const inviteeData = await inviteeResponse.json();
    console.log("[Calendly Webhook] Invitee data received");

    // --- INICIO DE LA LÓGICA CORREGIDA ---

    // 1. EXTRAER DATOS DEL USUARIO (PII)
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

    // 2. EXTRAER DATOS DEL NAVEGADOR (¡CAMBIO CLAVE!)
    const tracking = inviteeData.resource?.tracking || {};
    const fbp = tracking.utm_source || null; // Aquí viene la cookie _fbp
    const fbclid = tracking.utm_medium || null; // Aquí viene la cookie _fbc
    const eventSourceUrl = tracking.utm_campaign || "https://www.escuelafloresiendomexico.com/agendar-llamada-video";

    // 3. OBTENER IP Y USER AGENT CORRECTOS (¡CAMBIO CLAVE!)
    const clientIP = inviteeData.resource?.ip_address || request.headers.get("x-forwarded-for") || null;
    const userAgent = request.headers.get("user-agent"); // El user-agent de Calendly es una aproximación aceptable

    // --- PREPARAR EL PAYLOAD PARA META ---
    const userData: any = {};
    
    // Hashear y añadir PII
    if (email) userData.em = hashSHA256(email);
    if (firstName) userData.fn = hashSHA256(firstName);
    if (lastName) userData.ln = hashSHA256(lastName);
    if (phone) userData.ph = hashSHA256(phone.replace(/\D/g, ''));
    
    // Añadir datos del navegador
    if (clientIP) userData.client_ip_address = clientIP;
    if (userAgent) userData.client_user_agent = userAgent;
    if (fbp) userData.fbp = fbp;
    if (fbclid) userData.fbc = fbclid; // Pasamos el valor completo de la cookie _fbc que capturamos

    // --- ENVIAR EL EVENTO DIRECTAMENTE A META ---
    const metaPixelId = process.env.META_PIXEL_ID;
    const metaAccessToken = process.env.META_ACCESS_TOKEN;
    const eventId = `calendly_${body.payload.uri.split('/').pop()}`; // ID de evento único y repetible

    const metaPayload = {
      data: [{
        event_name: "Schedule_Video",
        event_time: Math.floor(new Date(body.created_at).getTime() / 1000),
        action_source: "website",
        event_id: eventId,
        event_source_url: eventSourceUrl,
        user_data: userData,
      }],
      // test_event_code: process.env.META_TEST_CODE, // Descomentar para probar
    };

    console.log("[Calendly Webhook] Sending final payload to Meta CAPI. FBP:", fbp ? 'Present' : 'Missing', 'FBCLID:', fbclid ? 'Present' : 'Missing');

    const metaUrl = `https://graph.facebook.com/v19.0/${metaPixelId}/events?access_token=${metaAccessToken}`;

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

    return NextResponse.json({ success: true, message: "Webhook processed and event sent to Meta" });

  } catch (error) {
    console.error("[Calendly Webhook] CRITICAL ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}