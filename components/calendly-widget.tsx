"use client"

import { useEffect } from "react"

export function CalendlyWidget() {
  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://assets.calendly.com/assets/external/widget.css"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: "https://calendly.com/ramonhenriquez/15min",
          text: "Agenda tu llamada",
          color: "#b400ff",
          textColor: "#ffffff",
          branding: true,
        })
      }
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup
      document.head.removeChild(link)
      document.head.removeChild(script)
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Agenda tu Llamada de 15 Minutos</h2>
        <p className="text-gray-600 mb-6">
          Habla directamente con nosotros para resolver todas tus dudas sobre nuestros retiros de transformación.
        </p>
        <div className="text-sm text-gray-500">
          El widget de Calendly se cargará automáticamente. Si no aparece,
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

declare global {
  interface Window {
    Calendly: any
  }
}
