import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  // Try to get the real client IP from various headers
  const forwarded = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  const cfConnectingIp = request.headers.get("cf-connecting-ip") // Cloudflare

  // Parse forwarded header (can contain multiple IPs)
  let clientIp = "unknown"

  if (forwarded) {
    // x-forwarded-for can be "client, proxy1, proxy2"
    clientIp = forwarded.split(",")[0].trim()
  } else if (realIp) {
    clientIp = realIp
  } else if (cfConnectingIp) {
    clientIp = cfConnectingIp
  }

  console.log("[v0] Client IP captured:", {
    clientIp,
    forwarded,
    realIp,
    cfConnectingIp,
    userAgent: request.headers.get("user-agent")?.substring(0, 100),
  })

  return Response.json({
    ip: clientIp,
    timestamp: new Date().toISOString(),
  })
}
