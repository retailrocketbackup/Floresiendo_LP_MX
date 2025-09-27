import { type NextRequest, NextResponse } from "next/server"
import { createHash } from "crypto"

const FACEBOOK_PIXEL_ID = "1500366924641250"

function hashPII(value: string | undefined): string | undefined {
  if (!value || typeof value !== "string") return undefined

  try {
    // Normalize and hash the value
    const normalized = value.toLowerCase().trim()
    return createHash("sha256").update(normalized).digest("hex")
  } catch (error) {
    console.log("[v0] CAPI: Error hashing PII:", error)
    return undefined
  }
}

export async function POST(request: NextRequest) {
  console.log("[v0] CAPI: Route handler started")

  try {
    let body
    try {
      body = await request.json()
      console.log("[v0] CAPI: Request body parsed successfully")
    } catch (parseError) {
      console.log("[v0] CAPI: JSON parse error:", parseError)
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    if (!body.event_name || !body.event_time || !body.event_id) {
      console.log("[v0] CAPI: Missing required fields:", {
        event_name: !!body.event_name,
        event_time: !!body.event_time,
        event_id: !!body.event_id,
      })
      return NextResponse.json({ error: "Missing required event fields" }, { status: 400 })
    }

    const accessToken = process.env.META_CAPI_ACCESS_TOKEN
    if (!accessToken) {
      console.log("[v0] CAPI: No access token found")
      return NextResponse.json({ error: "Missing access token" }, { status: 500 })
    }

    const userData = body.user_data || {}
    const hashedUserData = {}

    // Hash PII data safely
    if (userData.em) hashedUserData.em = hashPII(userData.em)
    if (userData.ph) hashedUserData.ph = hashPII(userData.ph)
    if (userData.fn) hashedUserData.fn = hashPII(userData.fn)
    if (userData.ln) hashedUserData.ln = hashPII(userData.ln)

    // Keep non-PII data as-is
    if (userData.client_ip_address) hashedUserData.client_ip_address = userData.client_ip_address
    if (userData.client_user_agent) hashedUserData.client_user_agent = userData.client_user_agent
    if (userData.fbp) hashedUserData.fbp = userData.fbp
    if (userData.fbc) hashedUserData.fbc = userData.fbc

    console.log("[v0] CAPI: Processed user data:", {
      originalKeys: Object.keys(userData),
      hashedKeys: Object.keys(hashedUserData),
      hasEmail: !!hashedUserData.em,
      hasFbp: !!hashedUserData.fbp,
    })

    const facebookData = {
      data: [
        {
          event_name: body.event_name,
          event_time: body.event_time,
          event_id: body.event_id,
          action_source: "website",
          user_data: hashedUserData,
          custom_data: body.custom_data || {},
          event_source_url: body.event_source_url,
        },
      ],
      access_token: accessToken,
    }

    console.log("[v0] CAPI: Sending to Facebook API...")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/${FACEBOOK_PIXEL_ID}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facebookData),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const responseData = await response.json()
      console.log("[v0] CAPI: Facebook API Response:", response.status, responseData)

      if (!response.ok) {
        console.log("[v0] CAPI: Facebook API error:", response.status, responseData)
        return NextResponse.json(
          {
            error: "Facebook API error",
            status: response.status,
            details: responseData,
          },
          { status: 500 },
        )
      }

      console.log("[v0] CAPI: Successfully sent to Facebook")
      return NextResponse.json({
        success: true,
        message: "Event sent to Facebook CAPI successfully",
        facebook_response: responseData,
        event_name: body.event_name,
        events_received: responseData.events_received,
        fbtrace_id: responseData.fbtrace_id,
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.log("[v0] CAPI: Fetch error:", fetchError)
      return NextResponse.json(
        {
          error: "Failed to connect to Facebook API",
          message: fetchError.message,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.log("[v0] CAPI: Unexpected error:", error)
    console.log("[v0] CAPI: Error type:", typeof error)
    console.log("[v0] CAPI: Error constructor:", error?.constructor?.name)

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error occurred",
        type: error?.constructor?.name || "Unknown",
      },
      { status: 500 },
    )
  }
}
