"use client"

import { useEffect } from "react"
import { trackEvent, trackViewContent } from "@/lib/meta-tracking"

interface HubSpotFormProps {
  funnel?: string
}

export function HubSpotForm({ funnel = "unknown" }: HubSpotFormProps) {
  useEffect(() => {
    console.log(`[v0] Loading HubSpot form for funnel: ${funnel}`)

    const script = document.createElement("script")
    script.src = "https://js.hsforms.net/forms/embed/50499487.js"
    script.defer = true
    document.head.appendChild(script)

    trackViewContent(funnel, "form_page_view")

    const handleHubSpotEvent = (event: MessageEvent) => {
      if (
        event.data &&
        (event.data.type === "hsFormCallback" || event.data.eventName || event.data.type === "hsFormReady")
      ) {
        // Check if it's a form submission
        if (event.data.eventName === "onFormSubmit" || event.data.type === "hsFormSubmit") {
          console.log(`[v0] HubSpot form submitted for funnel: ${funnel}`)

          // Extract form data
          const formData = event.data.data || {}
          const submissionData = formData.submissionValues || {}

          // Extract user data from form submission
          const userData = {
            email: submissionData.email,
            first_name: submissionData.firstname || submissionData.first_name,
            last_name: submissionData.lastname || submissionData.last_name,
            phone: submissionData.phone,
          }

          console.log(`[v0] Extracted user data from HubSpot form:`, userData)

          if (userData.email || userData.phone || userData.first_name) {
            const userAgent = navigator.userAgent
            const fbp = document.cookie
              .split("; ")
              .find((row) => row.startsWith("_fbp="))
              ?.split("=")[1]
            const fbc = document.cookie
              .split("; ")
              .find((row) => row.startsWith("_fbc="))
              ?.split("=")[1]

            trackEvent(
              "Lead",
              {
                funnel,
                content_type: "form_submission",
                content_name: `hubspot_form_${funnel}`,
                email: userData.email,
                first_name: userData.first_name,
                last_name: userData.last_name,
                phone: userData.phone,
                userAgent,
                fbp,
                fbc,
              },
              { enableCAPI: true },
            )
          } else {
            console.warn(`[v0] No user data available for Lead tracking`)
          }
        }
      }
    }

    // Listen for HubSpot form events
    if (typeof window !== "undefined") {
      window.addEventListener("message", handleHubSpotEvent)
    }

    return () => {
      const existingScript = document.querySelector('script[src="https://js.hsforms.net/forms/embed/50499487.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }

      if (typeof window !== "undefined") {
        window.removeEventListener("message", handleHubSpotEvent)
      }
    }
  }, [funnel])

  return (
    <div className="w-full">
      <div
        className="hs-form-frame"
        data-region="na1"
        data-form-id="9ec9c638-6169-46b5-bf03-716245b5e62b"
        data-portal-id="50499487"
      />
    </div>
  )
}
