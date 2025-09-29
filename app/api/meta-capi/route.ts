import { type NextRequest, NextResponse } from "next/server"

async function hashSHA256(data: string): Promise<string> {
  try {
    console.log("[v0] Hashing data with Web Crypto API")
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(data.toLowerCase().trim())
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    console.log("[v0] Successfully hashed data")
    return hashHex
  } catch (error) {
    console.error("[v0] Error hashing data:", error)
    throw new Error(`Failed to hash data: ${error}`)
  }
}

export async function POST(request: NextRequest) {
  console.log("🚨 [v0] CAPI ENDPOINT CALLED - Starting debug analysis")

  console.log("[v0] Environment variables check:", {
    META_PIXEL_ID: process.env.META_PIXEL_ID ? "✅ Present" : "❌ Missing",
    META_CAPI_ACCESS_TOKEN: process.env.META_CAPI_ACCESS_TOKEN ? "✅ Present" : "❌ Missing",
    pixelIdValue: process.env.META_PIXEL_ID,
    tokenLength: process.env.META_CAPI_ACCESS_TOKEN?.length || 0,
  })

  try {
    console.log("[v0] Parsing request body...")
    const body = await request.json()

    console.log("🔍 [v0] FULL REQUEST BODY ANALYSIS:", {
      eventName: body.event_name,
      eventTime: body.event_time,
      eventId: body.event_id,
      actionSource: body.action_source,
      eventSourceUrl: body.event_source_url,
      hasUserData: !!body.user_data,
      hasCustomData: !!body.custom_data,
      userDataKeys: body.user_data ? Object.keys(body.user_data) : [],
      customDataKeys: body.custom_data ? Object.keys(body.custom_data) : [],
      fullBody: JSON.stringify(body, null, 2),
    })

    const clientIP =
      request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || request.ip || "unknown"
    console.log("[v0] Client IP captured:", clientIP)

    const userData = body.user_data || {}
    console.log("📊 [v0] USER DATA DETAILED ANALYSIS:", {
      hasEmail: !!userData.em,
      hasPhone: !!userData.ph,
      hasFirstName: !!userData.fn,
      hasLastName: !!userData.ln,
      hasExternalId: !!userData.external_id,
      hasUserAgent: !!userData.client_user_agent,
      hasClientIp: !!userData.client_ip_address,
      hasFbp: !!userData.fbp,
      hasFbc: !!userData.fbc,
      emailValue: userData.em ? `${userData.em.substring(0, 3)}***` : "none",
      phoneValue: userData.ph ? `${userData.ph.substring(0, 3)}***` : "none",
      userAgentLength: userData.client_user_agent?.length || 0,
      allUserDataKeys: Object.keys(userData),
      rawUserData: JSON.stringify(userData, null, 2),
    })

    const hashedUserData: any = {}

    if (userData.external_id) {
      hashedUserData.external_id = userData.external_id
      console.log("[v0] External ID preserved:", userData.external_id)
    }

    if (userData.em) {
      console.log("[v0] Hashing email...")
      hashedUserData.em = await hashSHA256(userData.em)
      console.log("[v0] Email hashed successfully")
    }

    if (userData.ph) {
      console.log("[v0] Hashing phone...")
      hashedUserData.ph = await hashSHA256(userData.ph)
      console.log("[v0] Phone hashed successfully")
    }

    if (userData.fn) {
      console.log("[v0] Hashing first name...")
      hashedUserData.fn = await hashSHA256(userData.fn)
      console.log("[v0] First name hashed successfully")
    }

    if (userData.ln) {
      console.log("[v0] Hashing last name...")
      hashedUserData.ln = await hashSHA256(userData.ln)
      console.log("[v0] Last name hashed successfully")
    }

    if (userData.client_ip_address) {
      hashedUserData.client_ip_address = userData.client_ip_address
    } else if (clientIP !== "unknown") {
      hashedUserData.client_ip_address = clientIP
      console.log("[v0] Using server-captured IP address")
    }

    if (userData.client_user_agent) hashedUserData.client_user_agent = userData.client_user_agent
    if (userData.fbp) hashedUserData.fbp = userData.fbp
    if (userData.fbc) hashedUserData.fbc = userData.fbc

    console.log("✅ [v0] FINAL HASHED USER DATA:", JSON.stringify(hashedUserData, null, 2))

    console.log("📈 [v0] MATCHING PARAMETERS SUMMARY:", {
      email: !!hashedUserData.em,
      phone: !!hashedUserData.ph,
      first_name: !!hashedUserData.fn,
      last_name: !!hashedUserData.ln,
      ip_address: !!hashedUserData.client_ip_address,
      user_agent: !!hashedUserData.client_user_agent,
      fbp: !!hashedUserData.fbp,
      fbc: !!hashedUserData.fbc,
      external_id: !!hashedUserData.external_id,
      total_parameters: Object.keys(hashedUserData).length,
    })

    const facebookPayload = {
      data: [
        {
          event_name: body.event_name,
          event_time: body.event_time,
          event_id: body.event_id,
          action_source: body.action_source,
          event_source_url: body.event_source_url, // Required for website events
          user_data: hashedUserData,
          custom_data: body.custom_data || {},
        },
      ],
    }

    const facebookUrl = `https://graph.facebook.com/v21.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_ACCESS_TOKEN}`
    console.log("🚀 [v0] SENDING TO FACEBOOK:", {
      url: `https://graph.facebook.com/v21.0/${process.env.META_PIXEL_ID}/events`,
      pixelId: process.env.META_PIXEL_ID,
      hasAccessToken: !!process.env.META_CAPI_ACCESS_TOKEN,
      payload: JSON.stringify(facebookPayload, null, 2),
    })

    const facebookResponse = await fetch(facebookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(facebookPayload),
    })

    const facebookResult = await facebookResponse.json()

    console.log("📥 [v0] FACEBOOK RESPONSE ANALYSIS:", {
      status: facebookResponse.status,
      statusText: facebookResponse.statusText,
      ok: facebookResponse.ok,
      headers: Object.fromEntries(facebookResponse.headers.entries()),
      result: JSON.stringify(facebookResult, null, 2),
    })

    if (!facebookResponse.ok) {
      console.error("❌ [v0] FACEBOOK API ERROR DETAILED:", {
        status: facebookResponse.status,
        statusText: facebookResponse.statusText,
        error: facebookResult,
        pixelIdUsed: process.env.META_PIXEL_ID,
        tokenPresent: !!process.env.META_CAPI_ACCESS_TOKEN,
        payloadSent: facebookPayload,
      })
      return NextResponse.json(
        {
          success: false,
          error: "Facebook API error",
          details: facebookResult,
        },
        { status: 400 },
      )
    }

    console.log("🎉 [v0] SUCCESS - Event sent to Facebook successfully!")
    return NextResponse.json({
      success: true,
      message: "Event sent to Facebook successfully",
      facebook_response: facebookResult,
    })
  } catch (error) {
    console.error("💥 [v0] CAPI ENDPOINT CRITICAL ERROR:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error,
      constructor: error?.constructor?.name,
    })
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
