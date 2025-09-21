"use client"

import { useEffect } from "react"

export function CalendlyWidget() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    script.type = "text/javascript"
    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/ramonhenriquez/15min"
          style={{ minWidth: "320px", height: "700px" }}
        ></div>
        <div className="text-sm text-gray-500 text-center mt-4">
          Si el calendario no se carga,
          <a
            href="https://calendly.com/ramonhenriquez/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800 ml-1"
          >
            haz clic aquí para agendar directamente
          </a>
        </div>
      </div>
    </div>
  )
}
