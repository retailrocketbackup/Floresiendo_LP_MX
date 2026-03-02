"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Users,
  Brain,
  Heart,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Shield,
  Target,
  Flame,
} from "lucide-react";
import { trackEvent } from "@/lib/meta-tracking";
import { CountdownTimer } from "@/components/countdown-timer";

// Session details
const SESSION_DATE = "Miércoles 19 de Marzo";
const SESSION_TIME = "8:00 PM (Hora CDMX)";
const EVENT_DATE = new Date("2026-03-19T20:00:00-06:00");

// FAQ Accordion Item
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:text-orange-700 transition-colors"
      >
        <span className="font-semibold text-gray-800 pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-orange-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-5 text-gray-600 leading-relaxed">{answer}</div>
      )}
    </div>
  );
}

export default function MastermindEstresPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: "",
    countryCode: "+52",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Track page view on mount
  useEffect(() => {
    trackEvent(
      "ViewContent_Mastermind",
      {
        funnel: "mastermind-estres",
        content_type: "landing",
        content_name: "mastermind_estres_landing",
        content_category: "lead_magnet",
      },
      { enableCAPI: true }
    );
  }, []);

  // Sticky bar logic
  useEffect(() => {
    const handleScroll = () => {
      if (formRef.current) {
        const rect = formRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const fullPhoneNumber = `${formData.countryCode}${formData.phoneNumber}`;

    try {
      // 1. Meta tracking - Lead event
      await trackEvent(
        "Lead_Mastermind",
        {
          funnel: "mastermind-estres",
          content_type: "lead_magnet",
          content_name: "mastermind_estres",
          first_name: formData.firstname,
          phone: fullPhoneNumber,
        },
        { enableCAPI: true }
      );

      // 2. Get HubSpot tracking cookie
      const hutk = document.cookie
        .split("; ")
        .find((row) => row.startsWith("hubspotutk="))
        ?.split("=")[1];

      // 3. Extract tracking parameters
      const urlParams = new URLSearchParams(window.location.search);

      // 4. Save to HubSpot
      const contactData = {
        firstname: formData.firstname,
        phone: fullPhoneNumber,
        funnel_source: "mastermind-estres",
        hutk: hutk || undefined,
        pageUri: window.location.href,
        pageName: "Mastermind Estrés Laboral - Floresiendo",
        fbclid: urlParams.get("fbclid") || undefined,
        gclid: urlParams.get("gclid") || undefined,
        utm_source: urlParams.get("utm_source") || undefined,
        utm_medium: urlParams.get("utm_medium") || undefined,
        utm_campaign: urlParams.get("utm_campaign") || undefined,
      };

      const hubspotResponse = await fetch("/api/hubspot-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      if (!hubspotResponse.ok) {
        const errorData = await hubspotResponse.json().catch(() => ({}));
        console.error(
          "[MastermindForm] HubSpot error:",
          hubspotResponse.status,
          errorData
        );
        throw new Error(
          errorData.message || "Error al registrar. Intenta de nuevo."
        );
      }

      // 5. Meta tracking - CompleteRegistration
      await trackEvent(
        "CompleteRegistration_Mastermind",
        {
          funnel: "mastermind-estres",
          content_type: "mastermind_registration",
          content_name: "mastermind_estres",
          first_name: formData.firstname,
          phone: fullPhoneNumber,
          value: 0,
          currency: "MXN",
        },
        { enableCAPI: true }
      );

      setIsSubmitting(false);
      router.push("/f/mastermind-estres/gracias");
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Hubo un error al registrarte. Por favor intenta de nuevo."
      );
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "¿Es realmente gratis?",
      answer:
        "Sí, 100% gratuito. Es nuestra forma de compartir herramientas de bienestar con profesionales que las necesitan. No hay costos ocultos ni ventas agresivas.",
    },
    {
      question: "¿Necesito experiencia en meditación o desarrollo personal?",
      answer:
        "No. El Mastermind está diseñado para cualquier profesional que sienta estrés laboral, sin importar su experiencia previa. Todo se explica paso a paso.",
    },
    {
      question: "¿Qué necesito para conectarme?",
      answer:
        "Solo un dispositivo con internet y Google Meet. Te enviaremos el enlace después de registrarte. Cámara opcional pero recomendada para conectar mejor.",
    },
    {
      question: "¿Qué pasa si no puedo asistir el 19 de marzo?",
      answer:
        "No hay problema. Regístrate y te avisaremos de próximas sesiones. También tenemos una meditación guiada el 3 de abril.",
    },
    {
      question: "¿Es un webinar donde solo escucho?",
      answer:
        "No. Es una sesión interactiva con formato Mastermind: participación activa, preguntas en vivo y herramientas que puedes aplicar desde el día siguiente.",
    },
  ];

  return (
    <main className="overflow-x-hidden max-w-[100vw]">
      {/* Hero */}
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-16 sm:pt-20 md:items-center md:pt-0">
        <div className="absolute inset-0">
          <Image
            src="/images/cosmic-spiritual-background.webp"
            alt="Fondo"
            fill
            priority
            quality={60}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/90 via-[#1a1a2e]/80 to-[#0f0f1a]/95" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12 overflow-hidden box-border">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full min-w-0">
            {/* Left - Copy */}
            <div className="text-white text-center lg:text-left overflow-hidden max-w-full min-w-0">
              <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-500/20 backdrop-blur-sm rounded-full text-orange-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-orange-500/30">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                SESIÓN INTERACTIVA GRATUITA
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight break-words">
                Cuando el trabajo consume todo el día y queda{" "}
                <span className="text-orange-400">cero energía para vivir</span>
              </h1>

              <p className="text-sm sm:text-lg md:text-xl text-white/80 mb-4 sm:mb-6 break-words">
                Herramientas tácticas para profesionales que quieren recuperar el
                control de su carrera y su bienestar — en 60 minutos.
              </p>

              {/* Countdown Timer */}
              <div className="mb-6 sm:mb-8">
                <p className="text-xs sm:text-sm text-white/70 mb-2 sm:mb-3 uppercase tracking-wider">
                  Comienza en:
                </p>
                <div className="sm:hidden">
                  <CountdownTimer
                    targetDate={EVENT_DATE}
                    variant="light"
                    size="xs"
                  />
                </div>
                <div className="hidden sm:block lg:hidden">
                  <CountdownTimer
                    targetDate={EVENT_DATE}
                    variant="light"
                    size="sm"
                  />
                </div>
                <div className="hidden lg:block">
                  <CountdownTimer
                    targetDate={EVENT_DATE}
                    variant="light"
                    size="md"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-3 mb-5 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 flex-shrink-0" />
                  <span className="text-sm sm:text-lg">{SESSION_DATE}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 flex-shrink-0" />
                  <span className="text-sm sm:text-lg">{SESSION_TIME}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 flex-shrink-0" />
                  <span className="text-sm sm:text-lg">
                    Google Meet · Máximo 30 personas
                  </span>
                </div>
              </div>

              {/* Mobile CTA Button */}
              <div className="sm:hidden mb-5">
                <button
                  onClick={scrollToForm}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-full shadow-[0_4px_20px_rgba(249,115,22,0.4)] hover:shadow-[0_6px_25px_rgba(249,115,22,0.5)] transition-all duration-300 flex items-center justify-center gap-2 text-base group"
                >
                  <span>Quiero mi lugar gratis</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-white/60 text-xs mt-2">
                  100% gratis · Registro en 30 seg
                </p>
              </div>

              {/* Facilitator */}
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-orange-400/50">
                  <Image
                    src="/images/ramon-henriquez.png"
                    alt="Ramón Henríquez"
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white text-sm sm:text-base">
                    Ramón Henríquez
                  </p>
                  <p className="text-xs sm:text-sm text-orange-300/80">
                    10+ años en bienestar y alto rendimiento
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div
              ref={formRef}
              className="bg-white rounded-2xl p-4 sm:p-8 shadow-2xl w-full max-w-full box-border min-w-0"
            >
              {/* Scarcity indicator */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4 text-orange-600 text-xs sm:text-sm font-medium">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full animate-pulse" />
                Máximo 30 personas por sesión
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
                Reserva tu lugar
              </h2>
              <p className="text-warm-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">
                Es 100% gratis. Registro en 30 segundos.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium text-warm-gray-700 mb-1"
                  >
                    Tu nombre *
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    required
                    value={formData.firstname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-warm-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    placeholder="¿Cómo te llamas?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-warm-gray-700 mb-1"
                  >
                    WhatsApp *
                  </label>
                  <div className="flex gap-2 min-w-0">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="px-3 py-3 border border-warm-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 bg-warm-gray-50 flex-shrink-0"
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
                      className="flex-1 min-w-0 px-4 py-3 border border-warm-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      placeholder="10 dígitos"
                    />
                  </div>
                  <p className="text-xs text-warm-gray-500 mt-1">
                    Recibirás el enlace de Google Meet en la siguiente página
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400/50 text-white font-bold py-4 rounded-full transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Reservando...
                    </span>
                  ) : (
                    "Quiero mi lugar gratis"
                  )}
                </button>

                <p className="text-xs text-warm-gray-500 text-center">
                  Al registrarte aceptas nuestro{" "}
                  <a href="/politica-privacidad" target="_blank" rel="noopener noreferrer" className="underline hover:text-warm-gray-700">
                    Aviso de Privacidad
                  </a>{" "}
                  y recibir mensajes de WhatsApp con información del evento.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Validation Section */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            El costo oculto de estar &ldquo;siempre disponible&rdquo;
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Muchos profesionales experimentan estos patrones sin darse cuenta de
            que hay formas concretas de cambiarlos.
          </p>

          <div className="space-y-4">
            {[
              {
                icon: Brain,
                text: "La mente sigue procesando problemas del trabajo incluso en momentos de descanso con familia o amigos",
              },
              {
                icon: Target,
                text: "Cuando las urgencias de otros dictan la agenda, es fácil perder la soberanía sobre el propio tiempo",
              },
              {
                icon: Flame,
                text: "Un solo correo fuera de horario puede detonar frustración o cuestionar decisiones de carrera",
              },
              {
                icon: Heart,
                text: "Ese cansancio que no se quita con un fin de semana libre es más común de lo que parece",
              },
              {
                icon: Shield,
                text: "A veces lo que se necesita no es otro consejo de 'respira profundo', sino herramientas reales",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-orange-50/60 rounded-xl"
              >
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-orange-600" />
                </div>
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-orange-700 font-medium mt-10 text-lg">
            La buena noticia: nadie tiene que enfrentar este desgaste en soledad.
          </p>
        </div>
      </section>

      {/* Mastermind Solution Section */}
      <section className="py-16 sm:py-20 px-4 bg-[#fdf8f4]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-semibold uppercase tracking-wide text-sm">
              Tu nueva red de apoyo estratégico
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Esto NO es un webinar donde solo escuchas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Es una mesa redonda virtual de alto rendimiento. El antídoto
              contra la soledad del profesional abrumado.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Hot Seat Interactivo",
                description:
                  "Escucha cómo otros profesionales de tu nivel resuelven los mismos cuellos de botella que te quitan el sueño.",
              },
              {
                icon: Shield,
                title: "Límites Digitales",
                description:
                  "Herramientas conversacionales para establecer límites de desconexión sin parecer poco comprometido.",
              },
              {
                icon: Target,
                title: "Gestión de Sobrecarga",
                description:
                  "Estrategias reales para descomponer proyectos imposibles y recuperar la tracción operativa.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meditation Preview — Science framing */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-orange-600 font-semibold uppercase tracking-wide text-sm">
              Incluido en la sesión
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 mb-4">
              Herramientas Prácticas de Calma en Vivo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Olvídate de &ldquo;poner la mente en blanco&rdquo;. Estas son
              técnicas prácticas diseñadas para mentes que no paran.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: "1",
                title: "Anclaje Corporal (Grounding)",
                description:
                  "Una técnica para redirigir la atención del ruido mental hacia sensaciones físicas concretas. Ayuda a encontrar calma en momentos de presión.",
              },
              {
                icon: "2",
                title: "Respiración Guiada",
                description:
                  "Una técnica de respiración profunda diseñada para ayudar a regresar a un estado de calma y sentir más claridad en pocos minutos.",
              },
              {
                icon: "3",
                title: "Observación de Pensamientos",
                description:
                  "Aprende a observar los pensamientos que generan presión sin engancharte. Una herramienta para tomar distancia y responder con más claridad.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-5 p-6 bg-gradient-to-r from-orange-50 to-white rounded-xl border border-orange-100"
              >
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Te llevarás una herramienta que puedes ejecutar en tu escritorio
            antes de cualquier junta.
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 bg-[#fdf8f4]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            Lo que dicen quienes ya participaron
          </h2>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <blockquote className="text-gray-700 leading-relaxed text-lg italic text-center">
              &ldquo;El ritmo de vida me tenía atrapado; en estos encuentros
              aprendí a respirar, a soltar y a volver a mi centro. Las
              herramientas son prácticas y las puedes aplicar desde el día
              siguiente.&rdquo;
            </blockquote>
            <p className="text-center text-gray-500 text-sm mt-4">
              — Participante de sesión anterior
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Preguntas frecuentes
          </h2>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            El siguiente paso hacia{" "}
            <span className="text-orange-400">una carrera más sostenible</span>
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Muchos profesionales descubren que rodearse de personas con retos
            similares es el primer paso para encontrar nuevas soluciones.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Calendar className="w-4 h-4 text-orange-400" />
              {SESSION_DATE}
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Clock className="w-4 h-4 text-orange-400" />
              {SESSION_TIME}
            </div>
          </div>

          <button
            onClick={scrollToForm}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-[0_4px_20px_rgba(249,115,22,0.4)] hover:shadow-[0_6px_25px_rgba(249,115,22,0.5)] transition-all duration-300 text-lg hover:scale-105"
          >
            Reservar mi espacio en el Mastermind
          </button>

          <p className="text-white/50 text-sm mt-4">
            Máximo 30 personas por sesión. 100% gratis.
          </p>
        </div>
      </section>

      {/* Sticky CTA Bar - Mobile */}
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
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-orange-600 text-xs font-medium">
                  Máx. 30 personas
                </span>
              </div>
              <p className="text-gray-900 font-semibold text-sm truncate">
                Mastermind Gratuito - 19 Mar
              </p>
            </div>
            <button
              onClick={scrollToForm}
              className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 text-sm"
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
