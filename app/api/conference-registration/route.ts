import { NextResponse } from "next/server";

// Conference venue details
const VENUE_ADDRESS = "Filadelfia 128, piso 3, Colonia Nápoles, CDMX";
const CONFERENCE_DATE = "2026-02-26";
const CONFERENCE_TIME = "19:00"; // 7 PM Mexico City
const MAX_CAPACITY = 60;

const HUBSPOT_API_BASE = "https://api.hubapi.com";

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
      utm_source,
      utm_medium,
      utm_campaign,
      fbclid,
      gclid,
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

    const hubspotToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
    if (!hubspotToken) {
      console.error("[Conference Registration] HUBSPOT_PRIVATE_APP_TOKEN not configured");
      // Continue without HubSpot - don't fail the registration
    }

    // 1. Create HubSpot contact via Contacts API
    if (hubspotToken) {
      const properties: Record<string, string> = {
        firstname: firstName,
        lastname: lastName,
        email,
        phone,
        funnel_source: "conferencia-vida-perfecta",
      };

      if (landingPage) {
        properties.website = landingPage;
      }
      if (utm_source) properties.utm_source = utm_source;
      if (utm_medium) properties.utm_medium = utm_medium;
      if (utm_campaign) properties.utm_campaign = utm_campaign;
      if (fbclid) properties.hs_facebook_click_id = fbclid;
      if (gclid) properties.hs_google_click_id = gclid;

      console.log("[Conference Registration] Creating contact via Contacts API:", {
        firstName,
        lastName,
        email,
        phone,
        funnel_source: "conferencia-vida-perfecta",
        landingPage,
      });

      // Search for existing contact by email
      const searchResponse = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts/search`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: "email",
              operator: "EQ",
              value: email,
            }],
          }],
        }),
      });

      const searchData = await searchResponse.json();

      let hubspotResponse;
      if (searchData.total > 0) {
        // Contact exists, update it
        const contactId = searchData.results[0].id;
        console.log("[Conference Registration] Updating existing contact:", contactId);

        hubspotResponse = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${contactId}`, {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${hubspotToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ properties }),
        });
      } else {
        // Create new contact
        console.log("[Conference Registration] Creating new contact");

        hubspotResponse = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${hubspotToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ properties }),
        });
      }

      if (!hubspotResponse.ok) {
        const errorBody = await hubspotResponse.text();
        console.error("[Conference Registration] HubSpot API Error:", errorBody);
        // Don't fail the whole request if HubSpot fails - still want to show thank you page
      } else {
        console.log("[Conference Registration] HubSpot contact created/updated successfully");
      }
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
