import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

function hashSHA256(data: string): string {
  return crypto.createHash("sha256").update(data.toLowerCase().trim()).digest("hex")
}

export async function POST(request: NextRequest) {
  console.log("[v0] CAPI endpoint called")

  try {
    console.log("[v0] Parsing request body...")
    const body = await request.json()
    console.log("[v0] Request body parsed:", JSON.stringify(body, null, 2))

    const userData: any = {}

    // Hash PII data as required by Facebook
    if (body.user_data?.em) {
      userData.em = hashSHA256(body.user_data.em)
      console.log("[v0] Hashed email")
    }
    if (body.user_data?.ph) {
      userData.ph = hashSHA256(body.user_data.ph)
      console.log("[v0] Hashed phone")
    }
    if (body.user_data?.fn) {
      userData.fn = hashSHA256(body.user_data.fn)
      console.log("[v0] Hashed first name")
    }
    if (body.user_data?.ln) {
      userData.ln = hashSHA256(body.user_data.ln)
      console.log("[v0] Hashed last name")
    }

    // Keep non-PII data as-is
    if (body.user_data?.client_ip_address) userData.client_ip_address = body.user_data.client_ip_address
    if (body.user_data?.client_user_agent) userData.client_user_agent = body.user_data.client_user_agent
    if (body.user_data?.fbp) userData.fbp = body.user_data.fbp
    if (body.user_data?.fbc) userData.fbc = body.user_data.fbc

    const facebookPayload = {
      data: [
        {
          event_name: body.event_name,
          event_time: body.event_time,
          event_id: body.event_id,
          action_source: body.action_source,
          user_data: userData,
          custom_data: body.custom_data || {},
        },
      ],
    }

    console.log("[v0] Facebook payload prepared:", JSON.stringify(facebookPayload, null, 2))

    const facebookResponse = await fetch(
      `https://graph.facebook.com/v21.0/1500366924641250/events?access_token=${process.env.META_CAPI_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facebookPayload),
      },
    )

    const facebookResult = await facebookResponse.json()
    console.log("[v0] Facebook response:", JSON.stringify(facebookResult, null, 2))

    if (!facebookResponse.ok) {
      console.error("[v0] Facebook API error:", facebookResult)
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
      received_data: body,
    })
  } catch (error) {
    console.error("[v0] CAPI endpoint error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
