"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function CalendlyWidget() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  const openCalendly = () => {
    setIsCalendlyOpen(true)
    const calendlyUrl = "https://calendly.com/floresiendo-retiros/consulta-inicial"
    window.open(calendlyUrl, "_blank", "width=800,height=600")
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-gray-900">Agenda una Consulta</CardTitle>
        <CardDescription className="text-gray-600">
          Habla directamente con nuestros facilitadores para resolver todas tus dudas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>30 minutos</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Videollamada gratuita</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>Consulta personalizada</span>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">En esta consulta hablaremos sobre:</h4>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Tu experiencia previa con medicina ancestral</li>
            <li>• Expectativas y objetivos del retiro</li>
            <li>• Proceso de preparación recomendado</li>
            <li>• Fechas disponibles y logística</li>
          </ul>
        </div>

        <Button
          onClick={openCalendly}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-3"
        >
          Agendar Consulta Gratuita
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Al agendar, recibirás un enlace de Zoom y recordatorios por email
        </p>
      </CardContent>
    </Card>
  )
}
