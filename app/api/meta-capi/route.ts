import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Meta Conversions API endpoint
const CAPI_URL = "https://graph.facebook.com/v18.0"
const PIXEL_ID = "1500366924641250"

export async function POST(request: NextRequest) {
  console.log("🌐 CAPI API: Received request")

  try {
    let body
    try {
      body = await request.json()
      console.log("📨 CAPI API: Successfully parsed request body")
    } catch (parseError) {
      console.error("❌ CAPI API: Failed to parse request body", parseError)
      return NextResponse.json({ error: "Invalid JSON in request body", details: parseError.message }, { status: 400 })
    }

    console.log("📨 CAPI API: Request body received", {
      event_name: body.event_name,
      funnel: body.custom_data?.funnel,
      hasUserData: !!body.user_data,
      userDataFields: body.user_data ? Object.keys(body.user_data).filter((key) => body.user_data[key]) : [],
      timestamp: new Date().toISOString(),
    })

    // Get environment variables
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN

    console.log("🔑 CAPI API: Environment check", {
      hasAccessToken: !!accessToken,
      tokenLength: accessToken ? accessToken.length : 0,
      tokenPrefix: accessToken ? accessToken.substring(0, 10) + "..." : "undefined",
    })

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

    let clientIP
    try {
      clientIP = extractClientIP(request)
      console.log("🔍 CAPI API: IP extraction successful", { clientIP })
    } catch (ipError) {
      console.error("❌ CAPI API: IP extraction failed", ipError)
      clientIP = "127.0.0.1" // fallback
    }

    const userAgent = request.headers.get("user-agent") || ""

    console.log("🔍 CAPI API: Client info extracted", {
      clientIP,
      ipVersion: isIPv6(clientIP) ? "IPv6" : "IPv4",
      userAgent: userAgent.substring(0, 50) + "...",
      hasUserAgent: !!userAgent,
    })

    // Hash PII data for privacy compliance
    const hashData = (data: string): string => {
      return crypto.createHash("sha256").update(data.toLowerCase().trim()).digest("hex")
    }

    let eventData
    try {
      eventData = {
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
      console.log("📦 CAPI API: Event data prepared successfully")
    } catch (dataError) {
      console.error("❌ CAPI API: Failed to prepare event data", dataError)
      return NextResponse.json({ error: "Failed to prepare event data", details: dataError.message }, { status: 500 })
    }

    let capiResponse
    let capiResult
    try {
      console.log("🚀 CAPI API: Sending request to Meta...")
      capiResponse = await fetch(`${CAPI_URL}/${PIXEL_ID}/events?access_token=${accessToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      })

      console.log("📡 CAPI API: Received response from Meta", {
        status: capiResponse.status,
        statusText: capiResponse.statusText,
        ok: capiResponse.ok,
      })

      capiResult = await capiResponse.json()
      console.log("📄 CAPI API: Parsed Meta response", capiResult)
    } catch (fetchError) {
      console.error("❌ CAPI API: Failed to communicate with Meta", fetchError)
      return NextResponse.json(
        { error: "Failed to communicate with Meta API", details: fetchError.message },
        { status: 500 },
      )
    }

    if (!capiResponse.ok) {
      console.error("❌ CAPI API: Meta rejected the request:", capiResult)
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
    console.error("❌ CAPI API: Unexpected error occurred", {
      error: error.message,
      stack: error.stack,
      name: error.name,
      timestamp: new Date().toISOString(),
    })
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

function extractClientIP(request: NextRequest): string {
  // Get all possible IP sources
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const cfConnectingIP = request.headers.get("cf-connecting-ip") // Cloudflare
  const remoteAddr = request.headers.get("remote-addr")

  // Collect all potential IPs
  const potentialIPs: string[] = []

  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, first one is the original client
    potentialIPs.push(...forwarded.split(",").map((ip) => ip.trim()))
  }

  if (realIP) potentialIPs.push(realIP)
  if (cfConnectingIP) potentialIPs.push(cfConnectingIP)
  if (remoteAddr) potentialIPs.push(remoteAddr)

  // Filter out invalid IPs and prioritize IPv6
  const validIPs = potentialIPs.filter((ip) => isValidIP(ip))

  // Prioritize IPv6 addresses as recommended by Facebook
  const ipv6Address = validIPs.find((ip) => isIPv6(ip))
  if (ipv6Address) {
    console.log("🌐 Using IPv6 address:", ipv6Address)
    return ipv6Address
  }

  // Fall back to IPv4
  const ipv4Address = validIPs.find((ip) => !isIPv6(ip))
  if (ipv4Address) {
    console.log("🌐 Using IPv4 address:", ipv4Address)
    return ipv4Address
  }

  // Ultimate fallback
  return "127.0.0.1"
}

function isIPv6(ip: string): boolean {
  // IPv6 addresses contain colons
  return ip.includes(":")
}

function isValidIP(ip: string): boolean {
  if (!ip || ip === "unknown") return false

  // Basic IPv4 validation
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  if (ipv4Regex.test(ip)) {
    const parts = ip.split(".")
    return parts.every((part) => {
      const num = Number.parseInt(part, 10)
      return num >= 0 && num <= 255
    })
  }

  // Basic IPv6 validation (simplified)
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/
  if (ipv6Regex.test(ip)) return true

  // IPv6 with IPv4 suffix (e.g., ::ffff:192.168.1.1)
  const ipv6WithIpv4Regex = /^::ffff:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
  if (ipv6WithIpv4Regex.test(ip)) return true

  return false
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
