"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/meta-tracking"

interface HubSpotFormProps {
  funnel?: string
}

export function HubSpotForm({ funnel = "unknown" }: HubSpotFormProps) {
  useEffect(() => {
    console.log("[v0] Loading HubSpot form for funnel:", funnel)

    const script = document.createElement("script")
    script.src = "https://js.hsforms.net/forms/embed/50499487.js"
    script.defer = true
    document.head.appendChild(script)

    trackEvent(
      "Lead",
      {
        funnel,
        content_type: "form_page_view",
        content_name: `hubspot_form_${funnel}`,
      },
      { enableCAPI: true },
    )

    console.log("[v0] Lead event tracked on form load")

    const handleHubSpotEvent = (event: MessageEvent) => {
      console.log("[v0] ===== HUBSPOT EVENT DEBUG =====")
      console.log("[v0] Full event object:", event)
      console.log("[v0] Event origin:", event.origin)
      console.log("[v0] Event data:", event.data)
      console.log("[v0] Event data type:", typeof event.data)

      // Log all properties of event.data if it's an object
      if (event.data && typeof event.data === "object") {
        console.log("[v0] Event data keys:", Object.keys(event.data))
        console.log("[v0] Event data values:", Object.values(event.data))

        // Check for common HubSpot properties
        if (event.data.type) console.log("[v0] Event type:", event.data.type)
        if (event.data.eventName) console.log("[v0] Event name:", event.data.eventName)
        if (event.data.id) console.log("[v0] Event id:", event.data.id)
        if (event.data.data) console.log("[v0] Event nested data:", event.data.data)
      }
      console.log("[v0] ================================")

      if (
        event.data &&
        (event.data.type === "hsFormCallback" ||
          event.data.eventName ||
          event.data.type === "hsFormReady" ||
          event.data.type === "hsFormSubmit")
      ) {
        console.log("[v0] HubSpot event detected:", event.data)

        // Check if it's a form submission
        if (event.data.eventName === "onFormSubmit" || event.data.type === "hsFormSubmit") {
          console.log("[v0] HubSpot form submitted!", event.data)

          // Extract form data
          const formData = event.data.data || {}
          const submissionData = formData.submissionValues || {}

          console.log("[v0] Form submission data:", submissionData)

          // Extract user data from form submission
          const userData = {
            email: submissionData.email,
            first_name: submissionData.firstname || submissionData.first_name,
            last_name: submissionData.lastname || submissionData.last_name,
            phone: submissionData.phone,
          }

          console.log("[v0] Extracted user data:", userData)

          // Track Lead event with actual user data from form submission
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
            },
            { enableCAPI: true },
          )

          console.log("[v0] Lead event tracked with user data")
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
