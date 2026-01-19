"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Calendar, Clock, Users, CheckCircle, Brain, Heart, Moon, ArrowRight, Zap } from "lucide-react";
import { trackEvent } from "@/lib/meta-tracking";
import { CountdownTimer } from "@/components/countdown-timer";

export default function MeditacionGratisPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    countryCode: "+52",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Session details - update these for each campaign
  const sessionDate = "Martes 17 de Febrero";
  const sessionTime = "8:00 PM (Hora CDMX)";

  // Target date for countdown: February 17, 2026 at 8:00 PM CDMX (UTC-6)
  const eventDate = new Date("2026-02-17T20:00:00-06:00");

  // Track page view on mount with funnel-specific event
  useEffect(() => {
    trackEvent(
      "ViewContent_Meditacion",
      {
        funnel: "meditacion",
        content_type: "landing",
        content_name: "meditacion_en_vivo_landing",
        content_category: "lead_magnet",
      },
      { enableCAPI: true }
    );
  }, []);

  // Show sticky bar ONLY when user scrolls DOWN past the form (not when above it)
  useEffect(() => {
    const handleScroll = () => {
      if (formRef.current) {
        const rect = formRef.current.getBoundingClientRect();
        // Show sticky bar only when form's bottom is above viewport (user scrolled past it)
        setShowStickyBar(rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (isSubmitted) {
      const userName = encodeURIComponent(formData.firstname);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=+524427845308&text=Hola%20Ramon,%20quiero%20confirmar%20mi%20lugar%20para%20la%20meditaci%C3%B3n%20en%20vivo.%20Me%20llamo%20${userName}.`;

      const redirectTimeout = setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 3000);

      return () => clearTimeout(redirectTimeout);
    }
  }, [isSubmitted, formData.firstname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullPhoneNumber = `${formData.countryCode}${formData.phoneNumber}`;

    try {
      // 1. Meta tracking - Custom Lead event for meditation funnel
      await trackEvent(
        "Lead_Meditacion_Gratis",
        {
          funnel: "meditacion-gratis",
          content_type: "lead_magnet",
          content_name: "meditacion_en_vivo",
          first_name: formData.firstname,
          phone: fullPhoneNumber,
        },
        { enableCAPI: true }
      );

      // 2. Get HubSpot tracking cookie (hutk) for contact creation
      const hutk = document.cookie
        .split("; ")
        .find((row) => row.startsWith("hubspotutk="))
        ?.split("=")[1];

      // 3. Save to HubSpot (LM - Online Meditation Form)
      const contactData = {
        firstname: formData.firstname,
        phone: fullPhoneNumber,
        formId: "f6eee3f9-ac31-41a6-8247-91039e58776e",
        funnel_source: "meditacion-gratis",
        // HubSpot context for contact creation
        hutk: hutk || undefined,
        pageUri: window.location.href,
        pageName: "Meditación Gratis - Floresiendo",
      };

      await fetch("/api/hubspot-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      // 4. Meta tracking - CompleteRegistration after successful submission
      await trackEvent(
        "CompleteRegistration_Meditacion",
        {
          funnel: "meditacion-gratis",
          content_type: "meditation_registration",
          content_name: "meditacion_en_vivo",
          first_name: formData.firstname,
          phone: fullPhoneNumber,
          value: 0,
          currency: "MXN",
        },
        { enableCAPI: true }
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-burgundy to-burgundy-dark flex items-center justify-center px-4">
        <div className="max-w-xl mx-auto text-center text-white">
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold mb-4">¡Registro exitoso!</h2>
          <p className="text-xl text-coral-light mb-6">
            En un momento te redirigiremos a WhatsApp para confirmar tu lugar
            y enviarte el enlace de acceso.
          </p>
          <p className="text-coral-light/70">
            Redirigiendo...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden max-w-[100vw]">
      {/* Hero */}
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-16 sm:pt-20 md:items-center md:pt-0">
        <div className="absolute inset-0">
          <Image
            src="/cosmic-spiritual-background.webp"
            alt="Fondo meditación"
            fill
            priority
            quality={60}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy/90 via-burgundy/80 to-burgundy-dark/95" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12 overflow-hidden box-border">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full min-w-0">
            {/* Left - Copy */}
            <div className="text-white text-center lg:text-left overflow-hidden max-w-full min-w-0">
              <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-gold/20 backdrop-blur-sm rounded-full text-gold text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-gold/30">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                EVENTO EN VIVO GRATUITO
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight break-words">
                Meditación Guiada
                <br />
                en Vivo
              </h1>

              <p className="text-sm sm:text-xl md:text-2xl text-coral-light mb-4 sm:mb-6 break-words">
                30 minutos para calmar tu mente
                <br className="sm:hidden" />
                <span className="sm:hidden"> </span>
                y reconectar contigo
              </p>

              {/* Countdown Timer - xs on mobile, sm on tablet, md on desktop */}
              <div className="mb-6 sm:mb-8">
                <p className="text-xs sm:text-sm text-white/70 mb-2 sm:mb-3 uppercase tracking-wider">Comienza en:</p>
                <div className="sm:hidden">
                  <CountdownTimer targetDate={eventDate} variant="light" size="xs" />
                </div>
                <div className="hidden sm:block lg:hidden">
                  <CountdownTimer targetDate={eventDate} variant="light" size="sm" />
                </div>
                <div className="hidden lg:block">
                  <CountdownTimer targetDate={eventDate} variant="light" size="md" />
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-3 mb-5 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" />
                  <span className="text-sm sm:text-lg">{sessionDate}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" />
                  <span className="text-sm sm:text-lg">{sessionTime}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" />
                  <span className="text-sm sm:text-lg">Solo 50 lugares disponibles</span>
                </div>
              </div>

              {/* Mobile CTA Button - scrolls to form */}
              <div className="sm:hidden mb-5">
                <button
                  onClick={scrollToForm}
                  className="w-full bg-coral hover:bg-coral-dark text-white font-bold py-4 px-6 rounded-full shadow-[0_4px_20px_rgba(255,111,97,0.4)] hover:shadow-[0_6px_25px_rgba(255,111,97,0.5)] transition-all duration-300 flex items-center justify-center gap-2 text-base group text-shadow-sm"
                >
                  <span>Quiero mi lugar gratis</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-white/60 text-xs mt-2">
                  100% gratis • Registro en 30 seg
                </p>
              </div>

              {/* Facilitator mini-bio in hero */}
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gold/50">
                  <Image
                    src="/facilitador.jpg"
                    alt="Ramón Henríquez"
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white text-sm sm:text-base">Ramón Henríquez</p>
                  <p className="text-xs sm:text-sm text-coral-light">10+ años en meditación y bienestar</p>
                </div>
              </div>
            </div>

            {/* Right - Form (Optimized: 2 fields only) */}
            <div ref={formRef} className="bg-white rounded-2xl p-4 sm:p-8 shadow-2xl w-full max-w-full box-border min-w-0">
              {/* Scarcity indicator */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4 text-coral text-xs sm:text-sm font-medium">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-coral rounded-full animate-pulse" />
                Solo 50 lugares disponibles
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-burgundy mb-2 text-center">
                Reserva tu lugar
              </h2>
              <p className="text-warm-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">
                Es 100% gratis. Registro en 30 segundos.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Single Name Field (reduced from 2 fields per research) */}
                <div>
                  <label htmlFor="firstname" className="block text-sm font-medium text-warm-gray-700 mb-1">
                    Tu nombre *
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    required
                    value={formData.firstname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-warm-gray-300 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent text-lg"
                    placeholder="¿Cómo te llamas?"
                  />
                </div>

                {/* WhatsApp Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-warm-gray-700 mb-1">
                    WhatsApp *
                  </label>
                  <div className="flex gap-2 min-w-0">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="px-3 py-3 border border-warm-gray-300 rounded-xl focus:ring-2 focus:ring-coral bg-warm-gray-50 flex-shrink-0"
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
                      className="flex-1 min-w-0 px-4 py-3 border border-warm-gray-300 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent text-lg"
                      placeholder="10 dígitos"
                    />
                  </div>
                  <p className="text-xs text-warm-gray-500 mt-1">
                    Te enviaremos el link de Zoom por WhatsApp
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-coral hover:bg-coral-dark disabled:bg-coral/50 text-white font-bold py-4 rounded-full transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:cursor-not-allowed text-shadow-sm"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Reservando...
                    </span>
                  ) : (
                    "Quiero mi lugar gratis"
                  )}
                </button>

                <p className="text-xs text-warm-gray-500 text-center">
                  Al registrarte aceptas recibir mensajes de WhatsApp con información del evento.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Neuroscience Benefits */}
      <section className="bg-gradient-to-b from-warm-white to-coral/5 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">
              Lo que experimentarás
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-burgundy mt-2 mb-4">
              Beneficios de la Meditación Guiada
            </h2>
            <p className="text-lg text-warm-gray-600 max-w-2xl mx-auto">
              Prácticas milenarias para tu bienestar diario.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {[
              {
                icon: Brain,
                title: "Encuentra Calma Mental en Minutos",
                description: "La técnica que aprenderás te ayuda a reconectar con tu centro y soltar el ruido mental. Prácticas milenarias respaldadas por la ciencia moderna para tu bienestar diario.",
                science: "Técnicas ancestrales probadas"
              },
              {
                icon: Heart,
                title: "Reduce el Ruido Mental",
                description: "La respiración consciente te ayuda a encontrar claridad y calma. Sentirás mayor ligereza y presencia desde la primera sesión.",
                science: "Bienestar integral"
              },
              {
                icon: Moon,
                title: "Descansa Profundamente",
                description: "Muchos participantes reportan sentirse más relajados y descansar mejor después de la sesión. Aprende a soltar las tensiones del día.",
                science: "Resultado: Descanso reparador"
              }
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-coral/10 hover:shadow-md transition-shadow">
                <div className="bg-burgundy text-white rounded-full p-3 flex-shrink-0">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-burgundy">
                    {benefit.title}
                  </h3>
                  <p className="text-warm-gray-600 mt-2">
                    {benefit.description}
                  </p>
                  <p className="text-sm text-gold font-medium mt-2">
                    {benefit.science}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="mt-12 text-center">
            <p className="text-warm-gray-500 text-sm">
              Más de <span className="font-bold text-burgundy">500 personas</span> han experimentado esta técnica en sesiones anteriores
            </p>
          </div>
        </div>
      </section>

      {/* Facilitator */}
      <section className="bg-burgundy/5 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="w-full max-w-sm mx-auto">
              <div className="relative aspect-square rounded-full overflow-hidden shadow-2xl ring-4 ring-coral/30">
                <Image
                  src="/facilitador.jpg"
                  alt="Ramón Henríquez - Facilitador de meditación"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <span className="text-coral font-semibold uppercase tracking-wide text-sm">
                Tu facilitador
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-burgundy mt-2 mb-4">
                Ramón Henríquez
              </h2>
              <div className="space-y-4 text-warm-gray-600 leading-relaxed">
                <p>
                  Con más de <span className="font-semibold text-burgundy">10 años de experiencia</span> guiando
                  procesos de transformación personal, Ramón ha acompañado a cientos de personas
                  en su camino hacia la paz interior.
                </p>
                <p>
                  Su enfoque combina <span className="text-gold font-medium">técnicas de respiración respaldadas por neurociencia</span> con
                  la sabiduría de tradiciones contemplativas, creando experiencias
                  profundas pero accesibles.
                </p>
                <p className="text-burgundy font-medium italic">
                  "Mi trabajo es darte herramientas que funcionen. Sin misticismo innecesario.
                  Solo práctica que transforma."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-warm py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-burgundy mb-8 text-center">
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "¿Necesito experiencia previa en meditación?",
                a: "No. Esta sesión está diseñada tanto para principiantes como para personas con experiencia. Te guiaremos paso a paso.",
              },
              {
                q: "¿Cómo me conecto a la sesión?",
                a: "Te enviaremos un enlace de Zoom por WhatsApp. Solo necesitas un dispositivo con conexión a internet.",
              },
              {
                q: "¿Es realmente gratis?",
                a: "Sí, 100% gratuito. Es nuestra forma de compartir estas prácticas con más personas.",
              },
              {
                q: "¿Qué pasa si no puedo asistir?",
                a: "No hay problema. Solo avísanos por WhatsApp y te invitaremos a la próxima sesión.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
                <h3 className="font-bold text-burgundy mb-2">{item.q}</h3>
                <p className="text-warm-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA Bar - Appears when form is not visible */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 sm:hidden transition-all duration-300 ${
          showStickyBar
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        <div className="bg-white border-t border-warm-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] px-4 py-3 safe-area-bottom">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 bg-coral rounded-full animate-pulse" />
                <span className="text-coral text-xs font-medium">Solo 50 lugares</span>
              </div>
              <p className="text-burgundy font-semibold text-sm truncate">
                Meditación Gratuita - 17 Feb
              </p>
            </div>
            <button
              onClick={scrollToForm}
              className="flex-shrink-0 bg-coral hover:bg-coral-dark text-white font-semibold py-3 px-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 text-sm text-shadow-sm"
            >
              Reservar
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
