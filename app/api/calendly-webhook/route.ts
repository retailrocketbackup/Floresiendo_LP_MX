import { type NextRequest, NextResponse } from "next/server"
import { trackCAPIEvent } from "@/lib/meta-tracking"
import crypto from "crypto"

// Función para verificar la firma del webhook
function verifyWebhookSignature(payload: string, signature: string, signingKey: string): boolean {
  const expectedSignature = crypto.createHmac("sha256", signingKey).update(payload).digest("base64")
  return signature === expectedSignature
}

// Función para hashear datos
async function hashSHA256(data: string): Promise<string> {
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function POST(request: NextRequest) {
  console.log("[Calendly Webhook] Received webhook")

  try {
    // Obtener el payload raw para verificar firma
    const rawBody = await request.text()
    const signature = request.headers.get("calendly-webhook-signature") || ""
    const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY

    // Verificar firma del webhook
    if (signingKey && !verifyWebhookSignature(rawBody, signature, signingKey)) {
      console.error("[Calendly Webhook] Invalid signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const body = JSON.parse(rawBody)
    console.log("[Calendly Webhook] Event type:", body.event)

    // Solo procesamos eventos de invitee.created
    if (body.event !== "invitee.created") {
      console.log("[Calendly Webhook] Ignoring non-creation event")
      return NextResponse.json({ received: true })
    }

    // Extraer el URI del invitee del payload
    const inviteeUri = body.payload?.uri
    if (!inviteeUri) {
      console.error("[Calendly Webhook] No invitee URI found")
      return NextResponse.json({ error: "No invitee URI" }, { status: 400 })
    }

    console.log("[Calendly Webhook] Fetching invitee details from:", inviteeUri)

    // Hacer petición a Calendly para obtener detalles completos del invitee
    const accessToken = process.env.CALENDLY_ACCESS_TOKEN
    const inviteeResponse = await fetch(inviteeUri, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!inviteeResponse.ok) {
      console.error("[Calendly Webhook] Failed to fetch invitee:", await inviteeResponse.text())
      return NextResponse.json({ error: "Failed to fetch invitee" }, { status: 500 })
    }

    const inviteeData = await inviteeResponse.json()
    console.log("[Calendly Webhook] Invitee data received")

    // Extraer datos del invitee
    const email = inviteeData.resource?.email
    const name = inviteeData.resource?.name || ""
    const eventUri = inviteeData.resource?.event

    // Extraer teléfono de questions_and_answers
    let phone = ""
    const questionsAndAnswers = inviteeData.resource?.questions_and_answers || []
    for (const qa of questionsAndAnswers) {
      if (qa.question.toLowerCase().includes("teléfono") || qa.question.toLowerCase().includes("phone")) {
        phone = qa.answer || ""
        break
      }
    }

    // Separar nombre en first_name y last_name
    const nameParts = name.split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    // Obtener información adicional del evento si está disponible
    let eventDetails = null
    if (eventUri) {
      const eventResponse = await fetch(eventUri, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      if (eventResponse.ok) {
        eventDetails = await eventResponse.json()
      }
    }

    // Determinar el funnel basado en el event type o URL
    const eventName = eventDetails?.resource?.name || ""
    let funnel = "video" // default
    if (eventName.toLowerCase().includes("testimonios")) {
      funnel = "testimonios"
    }

    console.log("[Calendly Webhook] Processing Schedule event", {
      email,
      name,
      phone: phone ? "present" : "missing",
      funnel,
    })

    // Preparar user_data para Meta
    const userData: any = {}

    if (email) {
      userData.em = await hashSHA256(email)
      userData.external_id = `email_${btoa(email).replace(/[^a-zA-Z0-9]/g, "").substring(0, 20)}`
    }

    if (firstName) {
      userData.fn = await hashSHA256(firstName)
    }

    if (lastName) {
      userData.ln = await hashSHA256(lastName)
    }

    if (phone) {
      // Limpiar el teléfono (solo números)
      const cleanPhone = phone.replace(/\D/g, "")
      userData.ph = await hashSHA256(cleanPhone)
    }

    // Capturar IP y User Agent del request original si están disponibles
    const clientIP =
      request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || request.ip || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    if (clientIP !== "unknown") {
      userData.client_ip_address = clientIP
    }

    if (userAgent !== "unknown") {
      userData.client_user_agent = userAgent
    }

    // Generar event ID único
    const eventId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Disparar evento Schedule con CAPI
    const metaEventName = funnel === "video" ? "Schedule_Video" : "Schedule_Testimonios"

    console.log("[Calendly Webhook] Sending to Meta CAPI:", {
      eventName: metaEventName,
      hasEmail: !!userData.em,
      hasPhone: !!userData.ph,
      hasFirstName: !!userData.fn,
      hasLastName: !!userData.ln,
      hasIP: !!userData.client_ip_address,
    })

    await trackCAPIEvent(
      metaEventName,
      {
        funnel,
        content_type: "appointment",
        value: 0,
      },
      eventId,
      userAgent !== "unknown" ? userAgent : undefined,
      clientIP !== "unknown" ? clientIP : undefined,
      userData.external_id,
    )

    console.log("[Calendly Webhook] Successfully processed webhook")

    return NextResponse.json({
      success: true,
      message: "Webhook processed successfully",
    })
  } catch (error) {
    console.error("[Calendly Webhook] Error processing webhook:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}