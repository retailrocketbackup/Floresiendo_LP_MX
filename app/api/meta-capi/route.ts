import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        success: false,
        message: "CAPI endpoint temporarily disabled - being rebuilt",
      },
      { status: 503 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
