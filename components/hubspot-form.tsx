"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function HubSpotForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In production, replace this with actual HubSpot API integration
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("[v0] Form submitted to HubSpot:", formData)
      setIsSubmitted(true)
    } catch (error) {
      console.error("[v0] Error submitting to HubSpot:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Gracias por tu interés!</h3>
          <p className="text-gray-600">
            Nos pondremos en contacto contigo muy pronto para brindarte más información sobre nuestros retiros.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-gray-900">Solicita Información</CardTitle>
        <CardDescription className="text-center text-gray-600">
          Déjanos tus datos y te contactaremos para brindarte más detalles sobre nuestros retiros
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                name="firstName"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="bg-white"
              />
            </div>
            <div>
              <Input
                name="lastName"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="bg-white"
              />
            </div>
          </div>

          <Input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-white"
          />

          <Input
            name="phone"
            type="tel"
            placeholder="Teléfono (opcional)"
            value={formData.phone}
            onChange={handleChange}
            className="bg-white"
          />

          <Textarea
            name="message"
            placeholder="¿Tienes alguna pregunta específica sobre los retiros?"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="bg-white resize-none"
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3"
          >
            {isSubmitting ? "Enviando..." : "Solicitar Información"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
