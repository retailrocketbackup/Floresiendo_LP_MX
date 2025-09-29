"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/meta-tracking"

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

    if (typeof window !== "undefined") {
      const handleCalendlyEvent = (event: MessageEvent) => {
        // Only process Calendly scheduling events
        if (event.data.event === "calendly.event_scheduled") {
          console.log("[v0] Calendly appointment scheduled", { funnel })

          // Track the specific funnel event
          const eventName = funnel.includes("video") ? "Schedule_Video" : "Schedule_Testimonios"

          // Track without user data (Option 3: Privacy-focused tracking)
          trackEvent(
            eventName,
            {
              funnel,
              content_type: "appointment",
              content_name: `calendly_${funnel}`,
              value: 0,
            },
            {
              enableCAPI: true,
            },
          )
        }
      }

      window.addEventListener("message", handleCalendlyEvent)

      return () => {
        window.removeEventListener("message", handleCalendlyEvent)
      }
    }

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
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
