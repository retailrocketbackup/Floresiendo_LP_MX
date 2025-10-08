// components/custom-contact-form.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { trackEvent } from "@/lib/meta-tracking"

interface CustomContactFormProps {
  funnel?: string
}

export function CustomContactForm({ funnel = "unknown" }: CustomContactFormProps) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false) // Re-introducimos este estado

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Este efecto se activará cuando isSubmitted cambie a true
  useEffect(() => {
    if (isSubmitted) {
      const userName = encodeURIComponent(formData.firstname);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=+526182301481&text=Hola%20Ramon,%20me%20puedes%20dar%20mas%20informaci%C3%B3n%20sobre%20los%20Retiros%20de%20Floresiendo,%20Me%20llamo%20${userName}.`;
      
      // Esperamos 3 segundos antes de redirigir para que el usuario pueda leer el mensaje.
      const redirectTimeout = setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 3000);

      // Limpieza por si el usuario navega a otro lado antes de la redirección
      return () => clearTimeout(redirectTimeout);
    }
  }, [isSubmitted, formData.firstname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 1. Enviar evento a CAPI
      await trackEvent(
        "Whatsapp_Mexico",
        {
          funnel,
          content_type: "form_submission",
          content_name: `custom_form_${funnel}`,
          first_name: formData.firstname,
          last_name: formData.lastname,
          phone: formData.phone,
        },
        { enableCAPI: true }
      );
      
      // 2. Enviar datos a HubSpot
      const hubspotFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        hubspotFormData.append(key, value);
      });
      hubspotFormData.append("funnel_source", funnel);
      hubspotFormData.append("landing_page", window.location.href);

      await fetch(
        "https://forms.hubspot.com/uploads/form/v2/50499487/9ec9c638-6169-46b5-bf03-716245b5e62b",
        { method: "POST", body: hubspotFormData, mode: "no-cors" }
      );

      // 3. Al tener éxito, mostramos el mensaje de agradecimiento
      setIsSubmitting(false);
      setIsSubmitted(true);

    } catch (error) {
      console.error("[v0] Error submitting form:", error);
      setIsSubmitting(false); // Si hay un error, solo detenemos el spinner
    }
  }

  // Si el formulario ya se envió, muestra el mensaje de agradecimiento
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

  // Si no, muestra el formulario
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
        <div className="md:col-span-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
          <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors" placeholder="+52 123 456 7890" />
        </div>
        <div className="flex justify-center pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="bg-transparent border-none transition-transform duration-200 flex items-center justify-center disabled:cursor-not-allowed transform hover:scale-110 disabled:opacity-50"
            aria-label="Iniciar Conversación por WhatsApp"
          >
            {isSubmitting ? (
              <svg className="animate-spin h-10 w-10 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <img 
                src="/whatsapp-button.png" 
                alt="Iniciar Conversación en WhatsApp" 
                className="h-14 w-auto"
              />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
