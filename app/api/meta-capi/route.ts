import { type NextRequest, NextResponse } from "next/server"
import { createHash } from "crypto"

const FACEBOOK_PIXEL_ID = "1500366924641250"

function hashPII(value: string | undefined): string | undefined {
  if (!value) return undefined
  const normalized = value.toLowerCase().trim()
  return createHash("sha256").update(normalized).digest("hex")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.event_name || !body.event_time || !body.event_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const accessToken = process.env.META_CAPI_ACCESS_TOKEN
    if (!accessToken) {
      return NextResponse.json({ error: "Missing access token" }, { status: 500 })
    }

    const userData = body.user_data || {}
    const processedUserData = {
      // Hash PII data
      em: hashPII(userData.em),
      ph: hashPII(userData.ph),
      fn: hashPII(userData.fn),
      ln: hashPII(userData.ln),
      // Keep non-PII as-is
      client_ip_address: userData.client_ip_address,
      client_user_agent: userData.client_user_agent,
      fbp: userData.fbp,
      fbc: userData.fbc,
    }

    const facebookData = {
      data: [
        {
          event_name: body.event_name,
          event_time: body.event_time,
          event_id: body.event_id,
          action_source: "website",
          user_data: processedUserData,
          custom_data: body.custom_data || {},
          event_source_url: body.event_source_url,
        },
      ],
      access_token: accessToken,
    }

    const response = await fetch(`https://graph.facebook.com/v18.0/${FACEBOOK_PIXEL_ID}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(facebookData),
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error("Facebook API error:", response.status, responseData)
      return NextResponse.json({ error: "Facebook API error", details: responseData }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Event sent successfully",
      events_received: responseData.events_received,
      fbtrace_id: responseData.fbtrace_id,
    })
  } catch (error) {
    console.error("CAPI endpoint error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
