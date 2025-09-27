import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  console.log("[v0] CAPI endpoint called")

  try {
    console.log("[v0] Parsing request body...")
    const body = await request.json()
    console.log("[v0] Request body parsed:", JSON.stringify(body, null, 2))

    return NextResponse.json({
      success: true,
      message: "CAPI endpoint working - test mode",
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
