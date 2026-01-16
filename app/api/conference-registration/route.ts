import { NextResponse } from "next/server";

// Conference venue details
const VENUE_ADDRESS = "Filadelfia 128, piso 3, Colonia Nápoles, CDMX";
const CONFERENCE_DATE = "2026-02-11";
const CONFERENCE_TIME = "19:00"; // 7 PM Mexico City
const MAX_CAPACITY = 60;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      painPoint,
      funnelSource,
      landingPage,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Correo electrónico inválido" },
        { status: 400 }
      );
    }

    // 1. Create HubSpot contact (LM - Conf - Vida Perfecta Form)
    const hubspotPortalId = "50499487";
    const hubspotFormId = "3c984755-ccd7-4769-a0b1-cd09678b464f";
    const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`;

    const hubspotPayload = {
      fields: [
        { name: "firstname", value: firstName },
        { name: "lastname", value: lastName },
        { name: "email", value: email },
        { name: "phone", value: phone },
      ],
      context: {
        pageUri: landingPage,
        pageName: `Conferencia - ${funnelSource}`,
      },
    };

    const hubspotResponse = await fetch(hubspotUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hubspotPayload),
    });

    if (!hubspotResponse.ok) {
      const errorBody = await hubspotResponse.text();
      console.error("[Conference Registration] HubSpot Error:", errorBody);
      // Don't fail the whole request if HubSpot fails - still want to show thank you page
    }

    // 2. Log registration for debugging
    console.log("[Conference Registration] Success:", {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      painPoint,
      funnelSource,
      timestamp: new Date().toISOString(),
    });

    // 3. Return success with venue details
    return NextResponse.json(
      {
        success: true,
        message: "Registro exitoso",
        data: {
          venueAddress: VENUE_ADDRESS,
          conferenceDate: CONFERENCE_DATE,
          conferenceTime: CONFERENCE_TIME,
          maxCapacity: MAX_CAPACITY,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Conference Registration] Error:", error);
    return NextResponse.json(
      { error: "Error al procesar el registro" },
      { status: 500 }
    );
  }
}
