// app/api/hubspot-contact/route.ts
// Uses HubSpot Contacts API to create contacts directly (more reliable than Forms API)
import { NextResponse } from "next/server"

const HUBSPOT_API_BASE = "https://api.hubapi.com"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstname, lastname, email, phone, pageUri, pageName, funnel_source } = body

    // Validar que los datos necesarios están presentes
    if (!firstname || !phone) {
      return NextResponse.json({ message: "Missing required fields (firstname, phone)" }, { status: 400 })
    }

    const hubspotToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN
    if (!hubspotToken) {
      console.error("[HubSpot] HUBSPOT_PRIVATE_APP_TOKEN not configured")
      return NextResponse.json({ message: "HubSpot not configured" }, { status: 500 })
    }

    // Generate a placeholder email from phone if not provided
    const cleanPhone = phone.replace(/\D/g, '') // Remove non-digits
    const generatedEmail = email || `lead-${cleanPhone}@floresiendo.mx`

    // Build contact properties
    const properties: Record<string, string> = {
      firstname,
      phone,
      email: generatedEmail,
    }

    if (lastname) {
      properties.lastname = lastname
    }

    // Add source tracking using a writable property
    if (pageUri) {
      properties.website = pageUri
    }

    // Track which funnel/form the lead came from
    if (funnel_source) {
      properties.funnel_source = funnel_source
    }

    console.log("[HubSpot] Creating contact via Contacts API:", {
      firstname,
      phone,
      email: generatedEmail,
      pageUri,
      funnel_source
    })

    // First, try to find existing contact by email
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
            value: generatedEmail
          }]
        }]
      }),
    })

    const searchData = await searchResponse.json()

    let response
    if (searchData.total > 0) {
      // Contact exists, update it
      const contactId = searchData.results[0].id
      console.log("[HubSpot] Updating existing contact:", contactId)

      response = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${contactId}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties }),
      })
    } else {
      // Create new contact
      console.log("[HubSpot] Creating new contact")

      response = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties }),
      })
    }

    if (!response.ok) {
      const errorBody = await response.text()
      console.error("HubSpot API Error:", errorBody)
      throw new Error(`HubSpot submission failed with status: ${response.status}`)
    }

    return NextResponse.json({ message: "Contact created successfully" }, { status: 200 })
  } catch (error) {
    console.error("[API HubSpot Error]", error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}