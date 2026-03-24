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

    // Step 1: Core properties only (these always exist in HubSpot)
    const coreProperties: Record<string, string> = {
      firstname,
      phone,
      email: generatedEmail,
    }

    if (lastname) {
      coreProperties.lastname = lastname
    }

    if (pageUri) {
      coreProperties.website = pageUri
    }

    // Step 2: Attribution properties (custom — may not exist in portal)
    const attributionProperties: Record<string, string> = {}

    if (funnel_source) {
      attributionProperties.funnel_source = funnel_source
    }

    if (fbclid) {
      attributionProperties.floresiendo_source = 'paid_facebook'
      attributionProperties.floresiendo_medium = 'cpc'
      attributionProperties.floresiendo_fbclid = fbclid
      if (utm_campaign) {
        attributionProperties.floresiendo_campaign = utm_campaign
      }
    } else if (gclid) {
      attributionProperties.floresiendo_source = 'paid_google'
      attributionProperties.floresiendo_medium = 'cpc'
      if (utm_campaign) {
        attributionProperties.floresiendo_campaign = utm_campaign
      }
    } else if (utm_medium === 'cpc' || utm_medium === 'paid') {
      attributionProperties.floresiendo_source = `paid_${utm_source || 'unknown'}`
      attributionProperties.floresiendo_medium = utm_medium
      if (utm_campaign) {
        attributionProperties.floresiendo_campaign = utm_campaign
      }
    } else if (utm_source) {
      attributionProperties.floresiendo_source = utm_source
      attributionProperties.floresiendo_medium = utm_medium || 'referral'
      if (utm_campaign) {
        attributionProperties.floresiendo_campaign = utm_campaign
      }
    } else {
      attributionProperties.floresiendo_source = 'direct'
      attributionProperties.floresiendo_medium = 'none'
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

    let contactId: string
    if (searchData.total > 0) {
      // Contact exists, update with core properties
      contactId = searchData.results[0].id
      console.log("[HubSpot] Updating existing contact:", contactId)

      const updateResponse = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${contactId}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties: coreProperties }),
      })

      if (!updateResponse.ok) {
        const errorBody = await updateResponse.text()
        console.error("[HubSpot] Core update failed:", updateResponse.status, errorBody)
        return NextResponse.json(
          { message: `Error al guardar contacto: ${updateResponse.status}`, details: errorBody },
          { status: 500 }
        )
      }
    } else {
      // Create new contact with core properties only
      console.log("[HubSpot] Creating new contact with core fields")

      const createResponse = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties: coreProperties }),
      })

      if (!createResponse.ok) {
        const errorBody = await createResponse.text()
        console.error("[HubSpot] Core create failed:", createResponse.status, errorBody)
        return NextResponse.json(
          { message: `Error al crear contacto: ${createResponse.status}`, details: errorBody },
          { status: 500 }
        )
      }

      const createData = await createResponse.json()
      contactId = createData.id
    }

    // Step 2: Try to add attribution properties separately — if they fail, the lead is already saved
    if (Object.keys(attributionProperties).length > 0) {
      try {
        const attrResponse = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${contactId}`, {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${hubspotToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ properties: attributionProperties }),
        })

        if (!attrResponse.ok) {
          const attrError = await attrResponse.text()
          console.warn("[HubSpot] Attribution properties failed (contact was still saved):", attrResponse.status, attrError)
          // Don't fail the request — the lead is already saved with core data
        } else {
          console.log("[HubSpot] Attribution properties saved successfully")
        }
      } catch (attrErr) {
        console.warn("[HubSpot] Attribution properties error (contact was still saved):", attrErr)
      }
    }

    return NextResponse.json({ message: "Contact created successfully" }, { status: 200 })
  } catch (error) {
    console.error("[API HubSpot Error]", error)
    return NextResponse.json(
      { message: "Error interno del servidor. Por favor intenta de nuevo." },
      { status: 500 }
    )
  }
}
