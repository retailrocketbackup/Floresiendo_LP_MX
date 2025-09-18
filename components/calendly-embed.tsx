"use client"

import { useEffect } from "react"

export function CalendlyEmbed() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/ramonhenriquez/15min"
        style={{ minWidth: '320px', height: '700px' }}
      />
    </div>
  )
}