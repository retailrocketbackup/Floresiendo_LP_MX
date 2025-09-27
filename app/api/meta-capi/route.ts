import { type NextRequest, NextResponse } from "next/server"

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

    console.log("[v0] CAPI: Returning success response")
    return NextResponse.json({
      success: true,
      message: "CAPI endpoint is working",
      received_event: body.event_name,
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
