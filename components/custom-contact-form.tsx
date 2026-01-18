// components/custom-contact-form.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { trackEvent } from "@/lib/meta-tracking"

interface CustomContactFormProps {
  funnel?: string
}

export function CustomContactForm({ funnel = "unknown" }: CustomContactFormProps) {
  // --- CAMBIO 1: Estado del formulario actualizado para lada y número ---
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    countryCode: "+52", // México por defecto
    phoneNumber: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (isSubmitted) {
      const userName = encodeURIComponent(formData.firstname);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=+524427845308&text=Hola%20Ramon,%20me%20puedes%20dar%20mas%20informaci%C3%B3n%20sobre%20los%20Retiros%20de%20Floresiendo,%20Me%20llamo%20${userName}.`;
      
      const redirectTimeout = setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 3000);

      return () => clearTimeout(redirectTimeout);
    }
  }, [isSubmitted, formData.firstname]);

      const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)

      const fullPhoneNumber = `${formData.countryCode}${formData.phoneNumber}`

      try {
        // 1. El tracking de Meta se queda igual
        await trackEvent(
          "Whatsapp_Mexico",
          {
            funnel,
            content_type: "form_submission",
            content_name: `custom_form_${funnel}`,
            first_name: formData.firstname,
            last_name: formData.lastname,
            phone: fullPhoneNumber,
          },
          { enableCAPI: true }
        )

        // 2. Get HubSpot tracking cookie (hutk) for contact creation
        const hutk = document.cookie
          .split("; ")
          .find((row) => row.startsWith("hubspotutk="))
          ?.split("=")[1]

        // 3. Prepara los datos para tu nueva API
        const contactData = {
          firstname: formData.firstname,
          lastname: formData.lastname,
          phone: fullPhoneNumber,
          funnel_source: funnel,
          landing_page: window.location.href,
          // HubSpot context for contact creation
          hutk: hutk || undefined,
          pageUri: window.location.href,
          pageName: document.title || "Floresiendo Landing Page",
        }

        // 4. Llama a TU PROPIA API, no a la de HubSpot
        await fetch("/api/hubspot-contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        })

        setIsSubmitting(false)
        setIsSubmitted(true)
      } catch (error) {
        console.error("[v0] Error submitting form:", error)
        setIsSubmitting(false)
      }
    }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center transition-opacity duration-500 ease-in">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">¡Gracias por tus datos!</h3>
        <p className="text-xl text-gray-600">
          En un momento te redirigiremos a WhatsApp para que inicies la conversación...
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
            <input type="text" id="firstname" name="firstname" required value={formData.firstname} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors" placeholder="Tu nombre" />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">Apellido *</label>
            <input type="text" id="lastname" name="lastname" required value={formData.lastname} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors" placeholder="Tu apellido" />
          </div>
        </div>

        {/* --- CAMBIO 3: Nuevo campo de teléfono con selector de lada --- */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <select
              name="countryCode"
              id="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-gray-50"
            >
              <option value="+52">🇲🇽 +52</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+34">🇪🇸 +34</option>
              <option value="+54">🇦🇷 +54</option>
              <option value="+598">🇺🇾 +598</option>
            </select>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              placeholder="Tu número"
            />
          </div>
        </div>
        
        {/* --- CAMBIO 4: Nuevo diseño del botón de WhatsApp --- */}
      <div className="pt-4 text-center">
        <p className="text-sm text-gray-500 mb-4">
          Chatea sin compromiso, un facilitador experimentado te responderá.
        </p>
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="bg-purple-900 hover:bg-purple-800 disabled:bg-purple-400 text-white font-semibold w-auto px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center mx-auto disabled:cursor-not-allowed transform hover:scale-105 shadow-2xl animate-pulse hover:animate-none"
          aria-label="Quiero dar el primer paso para iniciar conversación por WhatsApp"
        >
          {isSubmitting ? (
            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            <>
              <span className="text-lg">Quiero dar el primer paso</span>
              <img 
                src="/whatsapp-icon.webp" 
                alt="ícono de WhatsApp" 
                className="h-6 w-6 ml-3"
              />
            </>
          )}
        </button>
      </div>
      </form>
    </div>
  );
}
