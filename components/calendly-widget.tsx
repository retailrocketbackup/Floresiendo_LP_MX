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
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Agenda tu Llamada de 15 Minutos</h2>
        <p className="text-gray-600 mb-6 text-center">
          Habla directamente con nosotros para resolver todas tus dudas sobre nuestros retiros de transformación.
        </p>
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
