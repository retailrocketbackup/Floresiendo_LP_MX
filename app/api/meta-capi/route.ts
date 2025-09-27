import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Meta Conversions API endpoint
const CAPI_URL = "https://graph.facebook.com/v18.0"
const PIXEL_ID = "1500366924641250"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] CAPI: Starting request processing")

    // Parse request body
    const body = await request.json()
    console.log("[v0] CAPI: Request parsed successfully", { event_name: body.event_name })

    // Check environment variable
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN
    if (!accessToken) {
      console.log("[v0] CAPI: Missing access token")
      return NextResponse.json({ error: "Missing access token" }, { status: 500 })
    }
    console.log("[v0] CAPI: Access token found")

    // Get client IP (simplified)
    const forwarded = request.headers.get("x-forwarded-for")
    const clientIP = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1"
    console.log("[v0] CAPI: Client IP extracted", { clientIP })

    // Hash email if provided
    const hashData = (data: string): string => {
      return crypto.createHash("sha256").update(data.toLowerCase().trim()).digest("hex")
    }

    // Prepare event data
    const eventData = {
      data: [
        {
          event_name: body.event_name,
          event_time: body.event_time,
          event_id: body.event_id,
          action_source: "website",
          event_source_url: request.headers.get("referer") || "",
          user_data: {
            client_ip_address: clientIP,
            client_user_agent: request.headers.get("user-agent") || "",
            // Hash email if provided
            ...(body.user_data?.em && { em: [hashData(body.user_data.em)] }),
          },
          custom_data: body.custom_data,
        },
      ],
    }
    console.log("[v0] CAPI: Event data prepared")

    // Send to Meta
    const capiResponse = await fetch(`${CAPI_URL}/${PIXEL_ID}/events?access_token=${accessToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })

    console.log("[v0] CAPI: Meta response received", { status: capiResponse.status })

    const capiResult = await capiResponse.json()
    console.log("[v0] CAPI: Response parsed", { success: capiResponse.ok })

    if (!capiResponse.ok) {
      console.log("[v0] CAPI: Meta rejected request", capiResult)
      return NextResponse.json({ error: "Meta API error", details: capiResult }, { status: 400 })
    }

    console.log("[v0] CAPI: Success!")
    return NextResponse.json({
      success: true,
      events_received: capiResult.events_received,
      fbtrace_id: capiResult.fbtrace_id,
    })
  } catch (error) {
    console.log("[v0] CAPI: Error occurred", { message: error.message, name: error.name })
    return NextResponse.json({ error: "Internal server error", message: error.message }, { status: 500 })
  }
}
