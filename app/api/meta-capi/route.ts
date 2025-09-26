import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Meta Conversions API endpoint
const CAPI_URL = "https://graph.facebook.com/v18.0"
const PIXEL_ID = "1500366924641250"

export async function POST(request: NextRequest) {
  console.log("🌐 CAPI API: Received request")

  try {
    const body = await request.json()

    console.log("📨 CAPI API: Request body received", {
      event_name: body.event_name,
      funnel: body.custom_data?.funnel,
      hasUserData: !!body.user_data,
      userDataFields: body.user_data ? Object.keys(body.user_data).filter((key) => body.user_data[key]) : [],
      timestamp: new Date().toISOString(),
    })

    // Get environment variables
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN

    if (!accessToken) {
      console.error("❌ CAPI API: META_CAPI_ACCESS_TOKEN not configured")
      return NextResponse.json(
        {
          error: "Server configuration error",
          message: "META_CAPI_ACCESS_TOKEN environment variable not set",
        },
        { status: 500 },
      )
    }

    console.log("✅ CAPI API: Access token found, preparing request to Meta")

    // Extract client information
    const forwarded = request.headers.get("x-forwarded-for")
    const clientIP = forwarded
      ? forwarded.split(",")[0].trim()
      : request.headers.get("x-real-ip") ||
        request.headers.get("cf-connecting-ip") || // Cloudflare
        "127.0.0.1"
    const userAgent = request.headers.get("user-agent") || ""

    console.log("🔍 CAPI API: Client info extracted", {
      clientIP,
      userAgent: userAgent.substring(0, 50) + "...",
      forwarded,
      hasUserAgent: !!userAgent,
    })

    // Hash PII data for privacy compliance
    const hashData = (data: string): string => {
      return crypto.createHash("sha256").update(data.toLowerCase().trim()).digest("hex")
    }

    // Prepare event data for CAPI
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
            client_user_agent: userAgent,
            fbc: extractFBC(request),
            fbp: extractFBP(request),
            // Hash PII if provided
            ...(body.user_data?.em && { em: [hashData(body.user_data.em)] }),
            ...(body.user_data?.ph && { ph: [hashData(body.user_data.ph.replace(/\D/g, ""))] }),
            ...(body.user_data?.fn && { fn: [hashData(body.user_data.fn)] }),
            ...(body.user_data?.ln && { ln: [hashData(body.user_data.ln)] }),
          },
          custom_data: body.custom_data,
        },
      ],
    }

    // Send to Meta CAPI
    const capiResponse = await fetch(`${CAPI_URL}/${PIXEL_ID}/events?access_token=${accessToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })

    const capiResult = await capiResponse.json()

    if (!capiResponse.ok) {
      console.error("CAPI request failed:", capiResult)
      return NextResponse.json({ error: "Failed to send event to Meta CAPI", details: capiResult }, { status: 400 })
    }

    console.log("🎯 CAPI API: Event sent to Meta successfully!", {
      event_name: body.event_name,
      event_id: body.event_id,
      funnel: body.custom_data?.funnel,
      events_received: capiResult.events_received,
      fbtrace_id: capiResult.fbtrace_id,
      sentUserData: {
        hasEmail: !!(body.user_data?.em && eventData.data[0].user_data.em),
        hasPhone: !!(body.user_data?.ph && eventData.data[0].user_data.ph),
        hasFirstName: !!(body.user_data?.fn && eventData.data[0].user_data.fn),
        hasLastName: !!(body.user_data?.ln && eventData.data[0].user_data.ln),
      },
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      events_received: capiResult.events_received,
      fbtrace_id: capiResult.fbtrace_id,
      message: `Successfully tracked ${body.event_name} for funnel: ${body.custom_data?.funnel}`,
    })
  } catch (error) {
    console.error("CAPI API route error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Extract Facebook Click ID from cookies
function extractFBC(request: NextRequest): string | undefined {
  const fbcCookie = request.cookies.get("_fbc")
  return fbcCookie?.value
}

// Extract Facebook Browser ID from cookies
function extractFBP(request: NextRequest): string | undefined {
  const fbpCookie = request.cookies.get("_fbp")
  return fbpCookie?.value
}
