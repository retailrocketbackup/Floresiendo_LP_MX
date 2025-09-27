import { type NextRequest, NextResponse } from "next/server"
import { createHash } from "crypto"

const FACEBOOK_PIXEL_ID = "1500366924641250"

function hashPII(value: string | undefined): string | undefined {
  if (!value || typeof value !== "string") return undefined

  // Normalize and hash the value
  const normalized = value.toLowerCase().trim()
  return createHash("sha256").update(normalized).digest("hex")
}

export async function POST(request: NextRequest) {
  console.log("[v0] CAPI: Route handler started")

  try {
    console.log("[v0] CAPI: About to parse request body")
    const body = await request.json()
    console.log("[v0] CAPI: Request body parsed successfully", body)

    console.log("[v0] CAPI: Checking environment variable")
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN
    console.log("[v0] CAPI: Access token exists:", !!accessToken)

    if (!accessToken) {
      console.log("[v0] CAPI: No access token found")
      return NextResponse.json({ error: "Missing access token" }, { status: 500 })
    }

    console.log("[v0] CAPI: Processing user data for hashing", body.user_data)

    const hashedUserData = {
      // Hash PII data
      em: hashPII(body.user_data?.em),
      ph: hashPII(body.user_data?.ph),
      fn: hashPII(body.user_data?.fn),
      ln: hashPII(body.user_data?.ln),
      // Keep non-PII data as-is
      client_ip_address: body.user_data?.client_ip_address,
      client_user_agent: body.user_data?.client_user_agent,
      fbp: body.user_data?.fbp,
      fbc: body.user_data?.fbc,
    }

    // Remove undefined values
    Object.keys(hashedUserData).forEach((key) => {
      if (hashedUserData[key] === undefined) {
        delete hashedUserData[key]
      }
    })

    console.log("[v0] CAPI: User data after hashing:", {
      originalKeys: Object.keys(body.user_data || {}),
      hashedKeys: Object.keys(hashedUserData),
      hasEmail: !!hashedUserData.em,
      hasPhone: !!hashedUserData.ph,
      hasFbp: !!hashedUserData.fbp,
      hasFbc: !!hashedUserData.fbc,
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
      test_event_code: body.test_event_code, // Optional: for testing in Events Manager
    }

    console.log("[v0] CAPI: Sending data to Facebook with hashed PII:", JSON.stringify(facebookData, null, 2))

    const facebookUrl = `https://graph.facebook.com/v18.0/${FACEBOOK_PIXEL_ID}/events`
    console.log("[v0] CAPI: Sending to Facebook API...")

    const response = await fetch(facebookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...facebookData,
        access_token: accessToken,
      }),
    })

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
  } catch (error) {
    console.log("[v0] CAPI: Error caught:", error)
    console.log("[v0] CAPI: Error stack:", error instanceof Error ? error.stack : "No stack trace")
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
