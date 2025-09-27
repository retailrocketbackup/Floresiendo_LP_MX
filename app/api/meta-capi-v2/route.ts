import { type NextRequest, NextResponse } from "next/server"

// Función para hashear datos con Web Crypto API
async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

// Función para normalizar email
function normalizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

// Función para normalizar teléfono
function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "")
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] CAPI v2 endpoint called")

    console.log("[v0] META_PIXEL_ID:", process.env.META_PIXEL_ID ? "✅ Set" : "❌ Missing")
    console.log("[v0] META_CAPI_ACCESS_TOKEN:", process.env.META_CAPI_ACCESS_TOKEN ? "✅ Set" : "❌ Missing")

    if (!process.env.META_PIXEL_ID) {
      console.error("[v0] ❌ META_PIXEL_ID environment variable is missing!")
      return NextResponse.json(
        {
          success: false,
          error: "META_PIXEL_ID environment variable is required",
        },
        { status: 500 },
      )
    }

    if (!process.env.META_CAPI_ACCESS_TOKEN) {
      console.error("[v0] ❌ META_CAPI_ACCESS_TOKEN environment variable is missing!")
      return NextResponse.json(
        {
          success: false,
          error: "META_CAPI_ACCESS_TOKEN environment variable is required",
        },
        { status: 500 },
      )
    }

    const body = await request.json()
    console.log("[v0] Request payload:", JSON.stringify(body, null, 2))

    // Extraer datos del usuario
    const userData = body.user_data || {}
    console.log("[v0] Original user_data:", userData)

    // Hashear datos personales si existen
    const hashedUserData: any = {}

    // Datos que NO se hashean
    if (userData.client_user_agent) {
      hashedUserData.client_user_agent = userData.client_user_agent
    }
    if (userData.fbp) {
      hashedUserData.fbp = userData.fbp
    }
    if (userData.fbc) {
      hashedUserData.fbc = userData.fbc
    }

    // Datos que SÍ se hashean
    if (userData.em) {
      hashedUserData.em = await hashData(normalizeEmail(userData.em))
    }
    if (userData.ph) {
      hashedUserData.ph = await hashData(normalizePhone(userData.ph))
    }
    if (userData.fn) {
      hashedUserData.fn = await hashData(userData.fn.toLowerCase().trim())
    }
    if (userData.ln) {
      hashedUserData.ln = await hashData(userData.ln.toLowerCase().trim())
    }

    console.log("[v0] Hashed user_data:", hashedUserData)

    // Construir payload para Facebook
    const facebookPayload = {
      data: [
        {
          event_name: body.event_name,
          event_time: body.event_time,
          event_id: body.event_id,
          action_source: body.action_source,
          event_source_url: body.event_source_url,
          user_data: hashedUserData,
          custom_data: body.custom_data || {},
        },
      ],
    }

    console.log("[v0] Sending to Facebook:", JSON.stringify(facebookPayload, null, 2))

    // Enviar a Facebook
    const facebookResponse = await fetch(
      `https://graph.facebook.com/v21.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facebookPayload),
      },
    )

    const responseText = await facebookResponse.text()
    console.log("[v0] Facebook response status:", facebookResponse.status)
    console.log("[v0] Facebook response body:", responseText)

    if (facebookResponse.ok) {
      const result = JSON.parse(responseText)
      console.log("[v0] ✅ Facebook CAPI success:", result)
      return NextResponse.json({ success: true, result })
    } else {
      console.error("[v0] ❌ Facebook CAPI error:", responseText)
      return NextResponse.json({ success: false, error: "Facebook API error", details: responseText }, { status: 400 })
    }
  } catch (error) {
    console.error("[v0] ❌ CAPI v2 endpoint error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
