"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Play, Battery, Heart, Sparkles, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/meta-tracking";

// Lazy load Vimeo player - only loads when user clicks play
const TrackedVimeoPlayer = dynamic(
  () => import("@/components/tracked-vimeo-player").then((mod) => mod.TrackedVimeoPlayer),
  { ssr: false }
);

// V003 - "Sientes que tu rutina te consume"
const VIMEO_VIDEO_ID = "1143232548";
const ANA_WHATSAPP = "5219981984389"; // Ana (Mexico)
const WHATSAPP_MESSAGE = "Hola Ana, vi el video de Rodrigo sobre el estrés. Quiero el acceso a la meditación gratuita y saber más";

// WhatsApp icon SVG path (reused across components)
const WHATSAPP_SVG_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

// Zero-friction lead form with validation and WhatsApp redirect
function LeadForm({
  location,
  variant,
}: {
  location: string;
  variant: "dark" | "burgundy";
}) {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isSubmitted) {
      const encodedName = encodeURIComponent(formData.name.split(" ")[0]);
      const msg = encodeURIComponent(
        `Hola Ana, soy ${formData.name.split(" ")[0]}. Vi el video de Rodrigo sobre el estrés. Quiero el acceso a la meditación gratuita y saber más`
      );
      const whatsappUrl = `https://wa.me/${ANA_WHATSAPP}?text=${msg}`;

      const timeout = setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isSubmitted, formData.name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate phone: exactly 10 digits
    const cleanPhone = formData.phone.replace(/\s/g, "");
    if (!/^\d{10}$/.test(cleanPhone)) {
      setError("Ingresa un número válido de 10 dígitos");
      return;
    }

    if (!formData.name.trim()) {
      setError("Ingresa tu nombre");
      return;
    }

    setIsSubmitting(true);
    const fullPhone = `+52${cleanPhone}`;

    try {
      // 1. Meta tracking - Lead event
      await trackEvent(
        "Lead_Estres",
        {
          funnel: "estres",
          content_type: "form_submission",
          content_name: "estres_lead_form",
          first_name: formData.name,
          phone: fullPhone,
        },
        { enableCAPI: true }
      );

      // 2. Get HubSpot tracking cookie
      const hutk = document.cookie
        .split("; ")
        .find((row) => row.startsWith("hubspotutk="))
        ?.split("=")[1];

      // 3. Extract UTM params
      const urlParams = new URLSearchParams(window.location.search);

      // 4. Save to HubSpot
      await fetch("/api/hubspot-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.name,
          phone: fullPhone,
          funnel_source: "estres",
          hutk: hutk || undefined,
          pageUri: window.location.href,
          pageName: "Estrés Somático - Floresiendo",
          fbclid: urlParams.get("fbclid") || undefined,
          gclid: urlParams.get("gclid") || undefined,
          utm_source: urlParams.get("utm_source") || undefined,
          utm_medium: urlParams.get("utm_medium") || undefined,
          utm_campaign: urlParams.get("utm_campaign") || undefined,
        }),
      });

      // 5. Meta tracking - CompleteRegistration
      await trackEvent(
        "CompleteRegistration_Estres",
        {
          funnel: "estres",
          content_type: "estres_registration",
          content_name: "estres_lead_form",
          first_name: formData.name,
          phone: fullPhone,
          value: 0,
          currency: "MXN",
        },
        { enableCAPI: true }
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      setIsSubmitting(false);
      // Still redirect on error — don't lose the lead
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-6">
        <p className={`text-xl font-bold mb-2 ${variant === "dark" ? "text-white" : "text-white"}`}>
          ¡Gracias {formData.name.split(" ")[0]}!
        </p>
        <p className={`${variant === "dark" ? "text-white/70" : "text-white/80"}`}>
          Te redirigimos a WhatsApp con Ana...
        </p>
      </div>
    );
  }

  const isDark = variant === "dark";
  const inputClasses = isDark
    ? "w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-[#25D366] focus:border-transparent backdrop-blur-sm"
    : "w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-[#25D366] focus:border-transparent";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto space-y-3">
      <div>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className={inputClasses}
          placeholder="¿Cómo te llamas?"
          required
        />
      </div>
      <div>
        <div className="flex gap-2">
          <span className={`flex items-center px-3 py-3 rounded-xl text-sm font-medium ${isDark ? "bg-white/10 border border-white/30 text-white/70" : "bg-white/10 border border-white/30 text-white/70"}`}>
            +52
          </span>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
              setFormData((prev) => ({ ...prev, phone: val }));
            }}
            className={`flex-1 ${inputClasses}`}
            placeholder="10 dígitos"
            required
            inputMode="numeric"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-300 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] disabled:bg-[#25D366]/50 text-white font-bold py-4 px-6 rounded-full text-lg transition-all hover:scale-105 shadow-lg disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d={WHATSAPP_SVG_PATH} />
            </svg>
            Quiero mi meditación gratuita
          </>
        )}
      </button>

      <p className={`text-sm text-center ${isDark ? "text-white/50" : "text-white/60"}`}>
        Te responde Ana, quien te escucha en FloreSiendo
      </p>
    </form>
  );
}

// FAQ Accordion Item
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:text-[#8b2a4a] transition-colors"
      >
        <span className="font-semibold text-gray-800 pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#8b2a4a] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-5 text-gray-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function EstresPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  // Track page view on mount with funnel-specific event
  useEffect(() => {
    trackEvent(
      "ViewContent_Estres",
      {
        funnel: "estres",
        content_type: "landing",
        content_name: "vsl_estres_landing",
        content_category: "estres",
      },
      { enableCAPI: true }
    );
  }, []);

  const faqs = [
    {
      question: "¿En qué consiste el encuentro?",
      answer: "Es una experiencia inmersiva de tres noches en Morelos con prácticas ancestrales para encontrar paz y claridad.",
    },
    {
      question: "¿Se necesita experiencia en espiritualidad?",
      answer: "No, está diseñado para cualquier persona que busque un espacio de paz y acompañamiento.",
    },
    {
      question: "¿Cómo es el horario durante el retiro?",
      answer: "Combina actividades guiadas con momentos libres para integrar y descansar.",
    },
    {
      question: "¿Es posible asistir solo un día?",
      answer: "Para mejores resultados recomendamos vivir las tres noches completas.",
    },
    {
      question: "¿Cómo puedo registrarme?",
      answer: "Deja tu nombre y WhatsApp en el formulario de esta página. Ana te contactará con el acceso a la meditación gratuita y toda la información que necesites.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cosmic-spiritual-background.webp"
            alt="Fondo espiritual"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#8b2a4a]/80 via-[#8b2a4a]/70 to-black/80" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-20">
          {/* Badge */}
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-[#f78080] rounded-full text-sm font-semibold border border-white/20">
              Bienestar Interior
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4 leading-tight">
            El estrés no solo está en tu mente
            <br />
            <span className="text-[#f78080]">— lo cargas en el cuerpo.</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 text-center mb-10 max-w-2xl mx-auto">
            Esa tensión en los hombros, el nudo en el pecho, el cansancio que no se va con descanso.
            Existe una forma de soltarlo — y el primer paso es una meditación gratuita que puedes vivir esta semana.
          </p>

          {/* Lead Form - Hero */}
          <div className="mb-10">
            <LeadForm location="hero" variant="dark" />
          </div>

          {/* Video Section */}
          <div className="text-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
            >
              <Play className="w-4 h-4" />
              {isPlaying ? "Cerrar video" : "Ver video completo"}
            </button>

            {isPlaying && (
              <div className="mt-6 max-w-xs mx-auto rounded-2xl overflow-hidden shadow-2xl">
                <TrackedVimeoPlayer
                  videoId={VIMEO_VIDEO_ID}
                  funnel="estres"
                  className="w-full"
                  autoplay={true}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Validation Section — Somatic Angle */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b2a4a] text-center mb-4">
            ¿Te identificas?
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Tal vez reconoces algunas de estas señales...
          </p>

          <div className="space-y-4">
            {[
              "Despiertas con tensión en el cuerpo antes de que empiece el día",
              "El estrés se acumula en tu espalda, cuello y mandíbula",
              "Sientes un peso en el pecho que no se va con descanso",
              "Tu mente no para, y tu cuerpo paga las consecuencias",
              "Sabes que necesitas algo más profundo que unas vacaciones",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-[#fdf8f4] rounded-xl"
              >
                <div className="w-6 h-6 rounded-full bg-[#f78080]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Battery className="w-3 h-3 text-[#f78080]" />
                </div>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-[#8b2a4a] font-medium mt-10 text-lg">
            Tu cuerpo ya te está pidiendo un cambio. El primer paso es gratis.
          </p>
        </div>
      </section>

      {/* Solution Section — Lead Magnets */}
      <section className="py-20 px-4 bg-[#fdf8f4]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b2a4a] text-center mb-6">
            Tu primer paso: una meditación gratuita para soltar
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Regístrate y recibe acceso a una sesión de meditación guiada
            diseñada para liberar la tensión acumulada en tu cuerpo. Sin costo. Sin compromiso.
          </p>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Meditación guiada para soltar tensión",
                description: "Una sesión online donde aprenderás a liberar el estrés acumulado en tu cuerpo.",
              },
              {
                icon: MessageCircle,
                title: "Acompañamiento personal por WhatsApp",
                description: "Ana, quien te escucha en FloreSiendo, te orientará según lo que necesites.",
              },
              {
                icon: Heart,
                title: "Acceso a experiencias presenciales",
                description: "Si resuena contigo, hay conferencias y encuentros inmersivos como siguiente paso.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#8b2a4a]/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#8b2a4a]" />
                </div>
                <h3 className="text-lg font-bold text-[#8b2a4a] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b2a4a] text-center mb-12">
            Alguien que encontró la salida
          </h2>

          <div className="bg-[#fdf8f4] rounded-2xl p-8">
            <blockquote className="text-gray-700 leading-relaxed text-lg italic text-center">
              &ldquo;El ritmo de vida me tenía atrapado; en estos encuentros aprendí a respirar,
              a soltar y a volver a mi centro.
              <br /><br />
              <span className="text-[#8b2a4a] font-semibold not-italic">
                Si esto resuena contigo, regístrate arriba — el primer paso es gratis.
              </span>&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-[#fdf8f4]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b2a4a] text-center mb-12">
            Preguntas frecuentes
          </h2>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Bridge — Ana */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            Cuando te registres, quien te recibe es{" "}
            <strong className="text-[#8b2a4a]">Ana</strong>. Ella te escucha
            en FloreSiendo México, te compartirá el acceso a la meditación
            gratuita y, si lo deseas, te acompañará sin prisa para entender
            qué necesitas. Ana lleva años acompañando procesos de sanación
            y caminando su propio camino.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-burgundy text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Empieza a soltar hoy
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Regístrate en 10 segundos y recibe tu meditación gratuita por WhatsApp.
          </p>

          <LeadForm location="footer" variant="burgundy" />

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-white/60 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#25D366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Sin costo
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#25D366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Sin compromiso
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#25D366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Respuesta personal
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
