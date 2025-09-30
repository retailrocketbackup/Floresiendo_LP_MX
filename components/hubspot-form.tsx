"use client"

import { useEffect } from "react"
import { trackLead } from "@/lib/meta-pixel"

interface HubSpotFormProps {
  funnel?: string
}

export function HubSpotForm({ funnel = "unknown" }: HubSpotFormProps) {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://js.hsforms.net/forms/embed/50499487.js"
    script.defer = true
    document.head.appendChild(script)

    const handleFormSubmit = (event: MessageEvent) => {
      if (event.data.type === "hsFormCallback" && event.data.eventName === "onFormSubmitted") {
        // Generate unique event ID for deduplication with CAPI
        const eventId = crypto.randomUUID()

        // Track Lead event
        trackLead({
          content_name: "Retiros Video Formulario",
          value: 50.0,
          currency: "USD",
          eventID: eventId,
        })

        console.log("[v0] Meta Pixel Lead event tracked:", {
          funnel,
          eventId,
          content_name: "Retiros Video Formulario",
        })
      }
    }

    window.addEventListener("message", handleFormSubmit)

    return () => {
      const existingScript = document.querySelector('script[src="https://js.hsforms.net/forms/embed/50499487.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
      window.removeEventListener("message", handleFormSubmit)
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
