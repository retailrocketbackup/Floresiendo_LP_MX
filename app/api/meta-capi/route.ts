import { type NextRequest, NextResponse } from "next/server"

async function hashSHA256(data: string): Promise<string> {
  try {
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(data.toLowerCase().trim())
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    return hashHex
  } catch (error) {
    throw new Error(`Failed to hash data: ${error}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const clientIP =
      request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || request.ip || "unknown"

    const userData = body.user_data || {}
    const hashedUserData: any = {}

    if (userData.external_id) {
      hashedUserData.external_id = userData.external_id
    }

    if (userData.em) {
      hashedUserData.em = await hashSHA256(userData.em)
    }

    if (userData.ph) {
      hashedUserData.ph = await hashSHA256(userData.ph)
    }

    if (userData.fn) {
      hashedUserData.fn = await hashSHA256(userData.fn)
    }

    if (userData.ln) {
      hashedUserData.ln = await hashSHA256(userData.ln)
    }

    if (userData.client_ip_address) {
      hashedUserData.client_ip_address = userData.client_ip_address
    } else if (clientIP !== "unknown") {
      hashedUserData.client_ip_address = clientIP
    }

    if (userData.client_user_agent) hashedUserData.client_user_agent = userData.client_user_agent
    if (userData.fbp) hashedUserData.fbp = userData.fbp
    if (userData.fbc) hashedUserData.fbc = userData.fbc

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

    const facebookUrl = `https://graph.facebook.com/v21.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_ACCESS_TOKEN}`

    const facebookResponse = await fetch(facebookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(facebookPayload),
    })

    const facebookResult = await facebookResponse.json()

    if (!facebookResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Facebook API error",
          details: facebookResult,
        },
        { status: 400 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Event sent to Facebook successfully",
      facebook_response: facebookResult,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
