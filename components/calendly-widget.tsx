"use client"

import { useEffect } from "react"
import { trackSchedule } from "@/lib/meta-pixel"

interface CalendlyWidgetProps {
  funnel?: string
}

export function CalendlyWidget({ funnel = "unknown" }: CalendlyWidgetProps) {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    script.type = "text/javascript"
    document.head.appendChild(script)

    const handleCalendlyEvent = (event: MessageEvent) => {
      if (event.data.event === "calendly.event_scheduled") {
        // Generate unique event ID for deduplication with CAPI
        const eventId = crypto.randomUUID()

        // Track Schedule event
        trackSchedule({
          content_name: "Retiros Video Llamada",
          value: 100.0,
          currency: "USD",
          eventID: eventId,
        })

        console.log("[v0] Meta Pixel Schedule event tracked:", {
          funnel,
          eventId,
          content_name: "Retiros Video Llamada",
        })
      }
    }

    window.addEventListener("message", handleCalendlyEvent)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
      window.removeEventListener("message", handleCalendlyEvent)
    }
  }, [funnel])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/ramonhenriquez/15min"
          style={{ minWidth: "320px", height: "700px" }}
        ></div>
      </div>
    </div>
  )
}
