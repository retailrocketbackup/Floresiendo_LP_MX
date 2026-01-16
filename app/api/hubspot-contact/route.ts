// app/api/hubspot-contact/route.ts
import { NextResponse } from "next/server"

const HUBSPOT_PORTAL_ID = "50499487"

// Default form ID (fallback)
const DEFAULT_FORM_ID = "f6eee3f9-ac31-41a6-8247-91039e58776e"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstname, lastname, email, phone, formId } = body

    // Validar que los datos necesarios están presentes
    if (!firstname || !phone) {
      return NextResponse.json({ message: "Missing required fields (firstname, phone)" }, { status: 400 })
    }

    // Use provided formId or default
    const hubspotFormId = formId || DEFAULT_FORM_ID
    const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${hubspotFormId}`

    // Build fields array dynamically (only include fields that have values)
    const fields: { name: string; value: string }[] = [
      { name: "firstname", value: firstname },
      { name: "phone", value: phone },
    ]

    if (lastname) {
      fields.push({ name: "lastname", value: lastname })
    }
    if (email) {
      fields.push({ name: "email", value: email })
    }

    const payload = {
      fields,
      context: {
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