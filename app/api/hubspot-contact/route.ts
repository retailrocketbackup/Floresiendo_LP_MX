// app/api/hubspot-contact/route.ts
// Uses HubSpot Contacts API to create contacts directly (more reliable than Forms API)
import { NextResponse } from "next/server"

const HUBSPOT_API_BASE = "https://api.hubapi.com"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      firstname, lastname, email, phone, pageUri, pageName, funnel_source,
      // Tracking parameters for attribution
      fbclid, gclid, utm_source, utm_medium, utm_campaign
    } = body

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
    const generatedEmail = email || `lead-${cleanPhone}@escuelafloresiendomexico.com`

    // Build contact properties
    const properties: Record<string, string> = {
      firstname,
      phone,
      email: generatedEmail,
    }

    if (lastname) {
      properties.lastname = lastname
    }

    // IMPORTANT: hs_analytics_source is READ-ONLY via API - HubSpot ignores these values.
    // Instead, we store tracking data in CUSTOM properties for attribution.
    // These custom properties must be created in HubSpot first (single-line text):
    // - floresiendo_source: 'paid_facebook', 'paid_google', 'organic', 'direct', etc.
    // - floresiendo_medium: 'cpc', 'organic', 'referral', etc.
    // - floresiendo_campaign: UTM campaign name
    // - floresiendo_fbclid: Facebook click ID for attribution

    if (fbclid) {
      properties.floresiendo_source = 'paid_facebook'
      properties.floresiendo_medium = 'cpc'
      properties.floresiendo_fbclid = fbclid
      if (utm_campaign) {
        properties.floresiendo_campaign = utm_campaign
      }
    } else if (gclid) {
      properties.floresiendo_source = 'paid_google'
      properties.floresiendo_medium = 'cpc'
      if (utm_campaign) {
        properties.floresiendo_campaign = utm_campaign
      }
    } else if (utm_medium === 'cpc' || utm_medium === 'paid') {
      properties.floresiendo_source = `paid_${utm_source || 'unknown'}`
      properties.floresiendo_medium = utm_medium
      if (utm_campaign) {
        properties.floresiendo_campaign = utm_campaign
      }
    } else if (utm_source) {
      // Has UTM but not paid - likely organic or referral
      properties.floresiendo_source = utm_source
      properties.floresiendo_medium = utm_medium || 'referral'
      if (utm_campaign) {
        properties.floresiendo_campaign = utm_campaign
      }
    } else {
      properties.floresiendo_source = 'direct'
      properties.floresiendo_medium = 'none'
    }

    // Store the first URL for debugging and additional attribution checks
    if (pageUri) {
      properties.hs_analytics_first_url = pageUri
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