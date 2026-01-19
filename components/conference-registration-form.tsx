"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/meta-tracking";
import { Loader2, ArrowRight } from "lucide-react";

interface ConferenceRegistrationFormProps {
  funnelName: string;
  eventNamePrefix: string; // e.g., "Conferencia_VidaPerfecta"
  redirectPath: string; // e.g., "/f/conferencia-vida-perfecta/gracias"
}

const PAIN_POINTS = [
  "Mi vida se ve bien pero me siento vacío/a",
  "Siento que construí la vida equivocada",
  "Estoy agotado/a y desconectado/a de mí mismo/a",
  "Logré todo lo que 'debía' lograr pero no me hace feliz",
  "Otro",
];

export function ConferenceRegistrationForm({
  funnelName,
  eventNamePrefix,
  redirectPath,
}: ConferenceRegistrationFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+52",
    phoneNumber: "",
    painPoint: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const fullPhoneNumber = `${formData.countryCode}${formData.phoneNumber}`;

    try {
      // 1. Track Lead event (form interaction)
      await trackEvent(
        `Lead_${eventNamePrefix}`,
        {
          funnel: funnelName,
          content_type: "conference_registration",
          content_name: `conference_${funnelName}`,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: fullPhoneNumber,
        },
        { enableCAPI: true }
      );

      // 2. Submit to registration API
      const response = await fetch("/api/conference-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: fullPhoneNumber,
          painPoint: formData.painPoint,
          funnelSource: funnelName,
          landingPage: window.location.href,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al registrar");
      }

      // 3. Track CompleteRegistration event
      await trackEvent(
        `CompleteRegistration`,
        {
          funnel: funnelName,
          content_type: "conference_registration",
          content_name: `conference_${funnelName}`,
          value: 0,
          currency: "MXN",
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: fullPhoneNumber,
        },
        { enableCAPI: true }
      );

      // 4. Redirect to thank you page
      router.push(redirectPath);
    } catch (err) {
      console.error("[ConferenceForm] Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Hubo un error. Por favor intenta de nuevo."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-xs sm:text-sm font-medium text-warm-gray-700 mb-1 sm:mb-1.5"
            >
              Nombre *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-warm-gray-200 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent transition-all bg-white text-sm sm:text-base"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-xs sm:text-sm font-medium text-warm-gray-700 mb-1 sm:mb-1.5"
            >
              Apellido *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-warm-gray-200 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent transition-all bg-white text-sm sm:text-base"
              placeholder="Tu apellido"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs sm:text-sm font-medium text-warm-gray-700 mb-1 sm:mb-1.5"
          >
            Correo electrónico *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-warm-gray-200 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent transition-all bg-white text-sm sm:text-base"
            placeholder="tu@email.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-xs sm:text-sm font-medium text-warm-gray-700 mb-1 sm:mb-1.5"
          >
            WhatsApp *
          </label>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <select
              name="countryCode"
              id="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              className="flex-shrink-0 w-16 sm:w-auto px-1.5 sm:px-3 py-2.5 sm:py-3 border border-warm-gray-200 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent transition-all bg-white text-xs sm:text-sm"
            >
              <option value="+52">+52</option>
              <option value="+1">+1</option>
              <option value="+34">+34</option>
              <option value="+54">+54</option>
              <option value="+57">+57</option>
              <option value="+51">+51</option>
              <option value="+56">+56</option>
            </select>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 border border-warm-gray-200 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent transition-all bg-white text-sm sm:text-base"
              placeholder="10 dígitos"
            />
          </div>
          <p className="text-[10px] sm:text-xs text-warm-gray-500 mt-1">
            Te enviaremos recordatorios por WhatsApp
          </p>
        </div>

        {/* Pain Point (Optional) - Hidden on very small screens for cleaner form */}
        <div className="hidden sm:block">
          <label
            htmlFor="painPoint"
            className="block text-xs sm:text-sm font-medium text-warm-gray-700 mb-1 sm:mb-1.5"
          >
            ¿Qué te trae aquí? (opcional)
          </label>
          <select
            name="painPoint"
            id="painPoint"
            value={formData.painPoint}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-warm-gray-200 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent transition-all bg-white text-sm"
          >
            <option value="">Selecciona una opción...</option>
            {PAIN_POINTS.map((point) => (
              <option key={point} value={point}>
                {point}
              </option>
            ))}
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl text-red-700 text-xs sm:text-sm">
            {error}
          </div>
        )}

        {/* Submit Button - Coral primary style */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-coral hover:bg-coral-dark disabled:bg-coral/50 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:hover:scale-100 text-base group text-shadow-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Registrando...</span>
            </>
          ) : (
            <>
              <span>Reservar mi lugar gratis</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Trust Indicators */}
        <p className="text-center text-[10px] sm:text-xs text-warm-gray-500">
          Sin costo. Sin compromiso. Recibirás confirmación por correo y
          WhatsApp.
        </p>
      </form>
    </div>
  );
}
