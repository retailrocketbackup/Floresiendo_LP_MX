"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Phone, MessageCircle, Clock, Shield, CheckCircle } from "lucide-react";
import { trackEvent } from "@/lib/meta-tracking";

export default function LlamadaPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    countryCode: "+52",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"whatsapp" | "call" | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (isSubmitted && selectedOption === "whatsapp") {
      const userName = encodeURIComponent(formData.firstname);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=+524427845308&text=Hola%20Ramon,%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20retiros.%20Me%20llamo%20${userName}.`;

      const redirectTimeout = setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 2000);

      return () => clearTimeout(redirectTimeout);
    }
  }, [isSubmitted, selectedOption, formData.firstname]);

  const handleSubmit = async (e: React.FormEvent, option: "whatsapp" | "call") => {
    e.preventDefault();
    setSelectedOption(option);
    setIsSubmitting(true);

    const fullPhoneNumber = `${formData.countryCode}${formData.phoneNumber}`;

    try {
      // Meta tracking - InitiateContact for BOFU
      await trackEvent(
        "Contact",
        {
          funnel: "llamada",
          content_type: option,
          content_name: `contact_${option}`,
          first_name: formData.firstname,
          phone: fullPhoneNumber,
        },
        { enableCAPI: true }
      );

      // Extract tracking parameters for attribution
      const urlParams = new URLSearchParams(window.location.search);

      // Save to HubSpot
      const contactData = {
        firstname: formData.firstname,
        lastname: "",
        phone: fullPhoneNumber,
        funnel_source: `llamada-${option}`,
        landing_page: window.location.href,
        pageUri: window.location.href,
        // Tracking parameters for proper source attribution
        fbclid: urlParams.get('fbclid') || undefined,
        gclid: urlParams.get('gclid') || undefined,
        utm_source: urlParams.get('utm_source') || undefined,
        utm_medium: urlParams.get('utm_medium') || undefined,
        utm_campaign: urlParams.get('utm_campaign') || undefined,
      };

      await fetch("/api/hubspot-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-950 flex items-center justify-center px-4">
        <div className="max-w-xl mx-auto text-center text-white">
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {selectedOption === "whatsapp" ? "¡Perfecto!" : "¡Solicitud recibida!"}
          </h2>
          <p className="text-xl text-purple-200 mb-6">
            {selectedOption === "whatsapp"
              ? "Te redirigimos a WhatsApp para iniciar la conversación..."
              : "Un facilitador te contactará pronto para agendar tu llamada."}
          </p>
          {selectedOption === "call" && (
            <p className="text-purple-300">
              Revisa tu WhatsApp, te escribiremos en las próximas horas.
            </p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-900 to-purple-950">
      {/* Hero */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0">
          <Image
            src="/cosmic-spiritual-background.webp"
            alt="Fondo"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Hablemos de tu transformación
          </h1>
          <p className="text-xl text-purple-200 mb-4 max-w-2xl mx-auto">
            Una conversación sin compromiso para resolver todas tus dudas
            y ver si nuestros retiros son para ti.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Clock,
                title: "15-20 minutos",
                description: "Una llamada breve para conocernos",
              },
              {
                icon: Shield,
                title: "Sin compromiso",
                description: "Solo información, sin presión",
              },
              {
                icon: MessageCircle,
                title: "Respuestas claras",
                description: "Resolvemos todas tus dudas",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
                <item.icon className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-1">{item.title}</h3>
                <p className="text-purple-200 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">
              ¿Cómo prefieres que te contactemos?
            </h2>

            <form className="space-y-4">
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                  Tu nombre *
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  required
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="¿Cómo te llamas?"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Tu número *
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-gray-50"
                  >
                    <option value="+52">+52</option>
                    <option value="+1">+1</option>
                    <option value="+34">+34</option>
                    <option value="+54">+54</option>
                    <option value="+598">+598</option>
                  </select>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tu número"
                  />
                </div>
              </div>

              <div className="pt-4 space-y-3">
                {/* WhatsApp Option - Primary */}
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e as unknown as React.FormEvent, "whatsapp")}
                  disabled={isSubmitting || !formData.firstname || !formData.phoneNumber}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isSubmitting && selectedOption === "whatsapp" ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      Chatear por WhatsApp
                    </>
                  )}
                </button>

                {/* Call Option - Secondary */}
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e as unknown as React.FormEvent, "call")}
                  disabled={isSubmitting || !formData.firstname || !formData.phoneNumber}
                  className="w-full bg-purple-900 hover:bg-purple-800 disabled:bg-gray-300 text-white font-bold py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-3 disabled:cursor-not-allowed"
                >
                  {isSubmitting && selectedOption === "call" ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      <Phone className="w-5 h-5" />
                      Prefiero una llamada
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center pt-2">
                Respetamos tu privacidad. Solo te contactaremos para darte información.
              </p>
            </form>
          </div>

          {/* Trust elements */}
          <div className="mt-12 text-center text-purple-200">
            <p className="text-sm">
              Más de 500 personas han encontrado su camino con nosotros
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
