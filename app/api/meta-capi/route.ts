import { type NextRequest, NextResponse } from "next/server"

const FACEBOOK_PIXEL_ID = "1500366924641250"

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

    const facebookData = {
      data: [
        {
          event_name: body.event_name,
          event_time: body.event_time,
          event_id: body.event_id,
          action_source: "website",
          user_data: body.user_data || {},
          custom_data: body.custom_data || {},
          event_source_url: body.event_source_url,
        },
      ],
      test_event_code: body.test_event_code, // Optional: for testing in Events Manager
    }

    console.log("[v0] CAPI: Sending data to Facebook:", JSON.stringify(facebookData, null, 2))

    const facebookUrl = `https://graph.facebook.com/v18.0/${FACEBOOK_PIXEL_ID}/events`
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
    console.log("[v0] CAPI: Facebook response:", responseData)

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
    })
  } catch (error) {
    console.log("[v0] CAPI: Error caught:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
