import { NextRequest, NextResponse } from "next/server";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID;

const TWILIO_BASE_URL = `https://verify.twilio.com/v2/Services/${TWILIO_VERIFY_SERVICE_SID}`;

function getTwilioAuth() {
  return Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString(
    "base64"
  );
}

// POST: Send verification code via WhatsApp
export async function POST(request: NextRequest) {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_VERIFY_SERVICE_SID) {
    return NextResponse.json(
      { error: "Twilio credentials not configured" },
      { status: 500 }
    );
  }

  try {
    const { phone, action, code } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Send OTP
    if (action === "send") {
      const response = await fetch(`${TWILIO_BASE_URL}/Verifications`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${getTwilioAuth()}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: phone,
          Channel: "sms",
          Locale: "es",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("[TwilioVerify] Send error:", data);
        return NextResponse.json(
          { error: data.message || "Error sending verification" },
          { status: response.status }
        );
      }

      return NextResponse.json({
        success: true,
        status: data.status,
      });
    }

    // Verify OTP
    if (action === "verify") {
      if (!code) {
        return NextResponse.json(
          { error: "Verification code is required" },
          { status: 400 }
        );
      }

      const response = await fetch(`${TWILIO_BASE_URL}/VerificationCheck`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${getTwilioAuth()}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: phone,
          Code: code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("[TwilioVerify] Check error:", data);
        return NextResponse.json(
          { error: data.message || "Error verifying code" },
          { status: response.status }
        );
      }

      return NextResponse.json({
        success: data.status === "approved",
        status: data.status,
      });
    }

    return NextResponse.json(
      { error: "Invalid action. Use 'send' or 'verify'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("[TwilioVerify] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
