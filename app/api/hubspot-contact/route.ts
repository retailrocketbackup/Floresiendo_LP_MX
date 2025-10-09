// app/api/hubspot-contact/route.ts
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstname, lastname, phone, funnel_source, landing_page } = body

    // Validar que los datos necesarios están presentes
    if (!firstname || !lastname || !phone) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const hubspotPortalId = "50499487" // Tu Portal ID
    const hubspotFormId = "9e9fc339-b779-491c-9659-27aa57781ed4" // Tu Form ID
    const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`

    const payload = {
      fields: [
        { name: "firstname", value: firstname },
        { name: "lastname", value: lastname },
        { name: "phone", value: phone },
        { name: "funnel_source", value: funnel_source },
        { name: "landing_page", value: landing_page },
      ],
      context: {
        pageUri: landing_page,
        pageName: "Floresiendo Landing Page",
      },
    }

    const response = await fetch(hubspotUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

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