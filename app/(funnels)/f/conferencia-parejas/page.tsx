"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  Users,
  Heart,
  Shield,
  ArrowRight,
  Flame,
  Eye,
  Swords,
  Snowflake,
} from "lucide-react";
import { ConferenceRegistrationForm } from "@/components/conference-registration-form";
import { trackEvent } from "@/lib/meta-tracking";
import { ScrollAnimate } from "@/components/scroll-animate";
import { CountdownTimer } from "@/components/countdown-timer";

const FUNNEL_NAME = "conferencia-parejas";
const EVENT_PREFIX = "Conferencia_Parejas";

// April 19, 2026 at 4:00 PM CDMX (UTC-6)
const EVENT_DATE = new Date("2026-04-19T16:00:00-06:00");

const PAIN_POINTS_PAREJAS = [
  "Siento que mi relación perdió la chispa",
  "Discutimos por las mismas cosas una y otra vez",
  "Nos amamos pero ya no nos deseamos",
  "Siento que vivimos como compañeros de cuarto",
  "Quiero reconectar antes de que sea tarde",
  "Otro",
];

// FAQ Accordion Item
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-warm-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:text-coral transition-colors group"
      >
        <span className="font-semibold text-warm-gray-800 pr-4 group-hover:text-coral transition-colors">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-coral flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-warm-gray-400 group-hover:text-coral flex-shrink-0 transition-colors" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-warm-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function ConferenciaParejasPage() {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const mobileFormRef = useRef<HTMLDivElement>(null);
  const desktopFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent(
      "ViewContent_Conferencia_Parejas",
      {
        funnel: "conferencia-parejas",
        content_type: "landing",
        content_name: "conferencia_parejas_landing",
        content_category: "tofu_event",
      },
      { enableCAPI: true }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const formToWatch =
        window.innerWidth < 640 ? mobileFormRef.current : desktopFormRef.current;
      if (formToWatch) {
        const rect = formToWatch.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    if (window.innerWidth < 640) {
      mobileFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      desktopFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const faqs = [
    {
      question: "¿Es realmente gratis?",
      answer:
        "Sí, completamente gratis. No hay costos ocultos ni se te pedirá tarjeta de crédito. Es un espacio abierto para parejas y personas que quieren transformar sus relaciones.",
    },
    {
      question: "¿Dónde es exactamente?",
      answer:
        "La conferencia será en Filadelfia 128, piso 3, Colonia Nápoles, Ciudad de México. Es una zona céntrica y de fácil acceso. Te enviaremos la ubicación exacta por WhatsApp después de registrarte.",
    },
    {
      question: "¿Puedo ir sin mi pareja?",
      answer:
        "Sí. Muchas personas asisten solas y aplican lo aprendido en su relación actual o en futuras relaciones. Las herramientas son igual de poderosas para una persona que para dos.",
    },
    {
      question: "¿Es terapia de pareja?",
      answer:
        "No es terapia. Es una conferencia inmersiva basada en la ciencia de John Gottman y Esther Perel, con ejercicios prácticos que te dan herramientas aplicables desde esa misma noche.",
    },
    {
      question: "¿Quién facilita la conferencia?",
      answer:
        "Ramón Henríquez y el equipo de FloreSiendo. Con más de 10 años acompañando procesos de transformación profunda y reconexión en relaciones.",
    },
  ];

  return (
    <main className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-16 sm:pt-20 md:items-center md:pt-0">
        <div className="absolute inset-0">
          <Image
            src="/images/cosmic-spiritual-background.webp"
            alt="Fondo"
            fill
            priority
            quality={60}
            sizes="100vw"
            className="object-cover scale-105 animate-[scale-in_20s_ease-out_forwards]"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        {/* Decorative elements */}
        <div className="hidden sm:block absolute top-20 left-10 w-32 h-32 bg-coral/20 rounded-full blur-3xl animate-pulse-soft" />
        <div
          className="hidden sm:block absolute bottom-20 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl animate-pulse-soft"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 md:py-24">
          {/* Mobile: Badge */}
          <div className="sm:hidden text-center mb-4 animate-fade-in">
            <div className="inline-flex flex-col items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <span className="px-3 py-1 bg-coral text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm text-shadow-sm">
                Conferencia Gratuita
              </span>
              <div className="flex items-center gap-2 text-white/90 text-xs font-medium">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span>19 Abr</span>
                <span className="text-white/40">&bull;</span>
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>4PM</span>
                <span className="text-white/40">&bull;</span>
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <span>CDMX</span>
              </div>
            </div>
          </div>

          {/* Desktop: Badge */}
          <div className="hidden sm:block text-center mb-6 sm:mb-8 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-gold/30">
              <Heart className="w-4 h-4 text-gold" />
              Conferencia Presencial Gratuita &mdash; Relaciones de Pareja
            </span>
          </div>

          {/* Desktop: Date, Time & Location pills */}
          <div
            className="hidden sm:flex flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8 text-white/90 text-sm animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-gold" />
              Domingo 19 de Abril 2026
            </span>
            <span className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
              <Clock className="w-4 h-4 text-gold" />
              4:00 PM &ndash; 6:00 PM
            </span>
            <span className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-gold" />
              Col. Nápoles, CDMX
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-2 sm:mb-6 leading-tight animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Lo amas.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span className="text-gold-light">
              Pero ya no lo deseas.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-sm sm:text-xl md:text-2xl text-white/80 text-center mb-3 sm:mb-6 max-w-2xl mx-auto animate-slide-up px-2"
            style={{ animationDelay: "0.3s" }}
          >
            La chispa se apagó y no sabes cuándo.
            <br />
            Hoy viven juntos pero como compañeros de cuarto.
            <br />
            Hay una razón científica — y tiene solución.
          </p>

          {/* Countdown Timer */}
          <div
            className="mb-4 sm:mb-10 animate-slide-up"
            style={{ animationDelay: "0.35s" }}
          >
            <p className="text-[10px] sm:text-sm text-white/70 mb-1.5 sm:mb-3 uppercase tracking-wider text-center">
              Comienza en:
            </p>
            <div className="sm:hidden">
              <CountdownTimer targetDate={EVENT_DATE} variant="light" size="xs" />
            </div>
            <div className="hidden sm:block">
              <CountdownTimer targetDate={EVENT_DATE} variant="light" size="md" />
            </div>
          </div>

          {/* Mobile CTA Button */}
          <div
            className="sm:hidden animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              onClick={scrollToForm}
              className="w-full bg-coral hover:bg-coral-dark text-white font-bold py-4 px-6 rounded-full shadow-[0_4px_20px_rgba(255,111,97,0.4)] hover:shadow-[0_6px_25px_rgba(255,111,97,0.5)] transition-all duration-300 flex items-center justify-center gap-2 text-base group text-shadow-sm"
            >
              <span>Asegura tu lugar ahora</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-white/60 text-xs mt-2">
              Sin costo &bull; Cupo limitado para garantizar la intimidad del espacio
            </p>
          </div>

          {/* Registration Form Card - Desktop only */}
          <div
            ref={desktopFormRef}
            className="hidden sm:block bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl max-w-lg mx-auto animate-scale-in border border-warm-gray-100 overflow-hidden"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4 text-coral text-xs sm:text-sm font-medium">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-coral rounded-full animate-pulse" />
              Cupo limitado para garantizar la intimidad del espacio
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-burgundy text-center mb-3 sm:mb-6">
              Asegura tu lugar en la Conferencia Interactiva
            </h2>
            <ConferenceRegistrationForm
              funnelName={FUNNEL_NAME}
              eventNamePrefix={EVENT_PREFIX}
              redirectPath="/f/conferencia-parejas/gracias"
              painPointOptions={PAIN_POINTS_PAREJAS}
              requirePhoneVerification
            />
          </div>

          {/* Trust Indicators - Desktop */}
          <div className="hidden sm:flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />2 horas
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Presencial e íntimo
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Espacio seguro
            </span>
          </div>

          {/* Mobile: Facilitator mini-bio */}
          <div className="sm:hidden mt-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center gap-3 p-3.5 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gold/50">
                <Image
                  src="/images/ramon-henriquez.webp"
                  alt="Ramón Henríquez"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">Con Ramón Henríquez</p>
                <p className="text-white/70 text-xs">+10 años acompañando transformaciones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Form Section */}
      <section id="mobile-form" className="sm:hidden py-6 px-4 bg-warm-white">
        <div
          ref={mobileFormRef}
          className="bg-white rounded-2xl p-4 shadow-xl max-w-lg mx-auto border border-warm-gray-100"
        >
          <div className="flex items-center justify-center gap-2 mb-2 text-coral text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-coral rounded-full animate-pulse" />
            Cupo limitado para garantizar la intimidad del espacio
          </div>
          <h2 className="text-lg font-bold text-burgundy text-center mb-3">
            Asegura tu lugar en la Conferencia Interactiva
          </h2>
          <ConferenceRegistrationForm
            funnelName={FUNNEL_NAME}
            eventNamePrefix={EVENT_PREFIX}
            redirectPath="/f/conferencia-parejas/gracias"
            painPointOptions={PAIN_POINTS_PAREJAS}
            requirePhoneVerification
          />
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-4 sm:py-6 bg-warm-gray-50 border-y border-warm-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 text-warm-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-coral" />
              <span>+1,000 participantes en retiros</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={18} className="text-gold" />
              <span>Basado en ciencia de Gottman y Perel</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-burgundy" />
              <span>Equipo con +10 años de experiencia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Validation — The 4 Horsemen Diagnostic Mirror */}
      <section className="section-padding bg-warm-white px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollAnimate animation="fade-up" className="text-center mb-8">
            <p className="text-coral font-semibold mb-3 uppercase tracking-wide text-sm">
              ¿Reconoces alguno?
            </p>
            <h2 className="text-burgundy">
              Los 4 Patrones que Erosionan tu Relación en Silencio
            </h2>
          </ScrollAnimate>

          <div className="space-y-4">
            {[
              {
                icon: Swords,
                title: "El Dardo de la Crítica",
                description:
                  "Ya no se quejan de una acción específica. Atacan la totalidad del carácter del otro: 'Tú siempre...', 'Tú nunca...'",
                internal:
                  "No importa cuánto me esfuerce, nunca es suficiente.",
                color: "coral",
              },
              {
                icon: Eye,
                title: "El Veneno del Desprecio",
                description:
                  "El suspiro condescendiente, el sarcasmo punzante, el rodar de ojos. Es el predictor número uno del divorcio según la ciencia.",
                internal:
                  "Me mira como si fuera inferior. Me siento ridiculizado.",
                color: "burgundy",
              },
              {
                icon: Shield,
                title: "El Escudo a la Defensiva",
                description:
                  "La incapacidad de asumir responsabilidad. Jugar a la víctima inocente y responder a cada queja con un contraataque.",
                internal:
                  "Todo es mi culpa según mi pareja. Tengo que defenderme.",
                color: "gold",
              },
              {
                icon: Snowflake,
                title: "El Muro de Hielo",
                description:
                  "La desconexión total. Estar físicamente en la misma habitación pero a kilómetros de distancia emocional.",
                internal:
                  "Estoy demasiado abrumado. Si digo algo, empeorará.",
                color: "coral",
              },
            ].map((item, index) => (
              <ScrollAnimate key={index} animation="fade-up" delay={index * 100}>
                <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-warm-gray-100 hover:border-coral/30">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-${item.color}/10 flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`w-5 h-5 text-${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-burgundy mb-1">{item.title}</h3>
                      <p className="text-warm-gray-600 text-sm mb-2">{item.description}</p>
                      <p className="text-warm-gray-500 text-sm italic border-l-2 border-coral/30 pl-3">
                        &ldquo;{item.internal}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollAnimate>
            ))}
          </div>

          <ScrollAnimate animation="fade-up" delay={500}>
            <p className="text-center text-burgundy font-semibold mt-10 text-lg">
              Si algo de esto resuena contigo, esta conferencia es tu primer paso
              para desarmarlo.
            </p>
          </ScrollAnimate>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-warm-gray-200 to-transparent" />

      {/* Unique Mechanism — The Gottman-Perel Protocol */}
      <section className="section-padding bg-warm-gray-50 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimate animation="fade-up" className="text-center mb-12">
            <p className="text-coral font-semibold mb-3 uppercase tracking-wide text-sm">
              Lo que vas a vivir en 2 horas
            </p>
            <h2 className="text-burgundy mb-4">
              3 Llaves Para Reconectar con tu Pareja
            </h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto text-lg">
              No es una charla donde tomas notas. Es una experiencia donde
              practicas herramientas reales que puedes usar esa misma noche.
            </p>
          </ScrollAnimate>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Aprende a frenar la pelea antes de que explote",
                description:
                  "Cuando la discusión escala, tu cuerpo entra en modo de emergencia y deja de escuchar. Te enseñamos una técnica simple para calmarte en menos de 3 minutos — y que la conversación sea productiva en vez de destructiva.",
                color: "coral",
              },
              {
                icon: Flame,
                title: "Recupera el deseo (sin forzarlo)",
                description:
                  "¿Por qué entre más confianza hay, menos deseo sientes? Hay una explicación real — y tiene que ver con cómo funciona la atracción. Vas a entender qué apaga la chispa y qué ejercicios la vuelven a encender.",
                color: "burgundy",
              },
              {
                icon: Heart,
                title: "Di lo que necesitas sin que se convierta en pelea",
                description:
                  "La mayoría de las discusiones no empiezan por el tema — empiezan por cómo se dice. Vas a practicar una forma de expresar lo que te duele que tu pareja pueda escuchar sin ponerse a la defensiva.",
                color: "gold",
              },
            ].map((item, index) => (
              <ScrollAnimate key={index} animation="fade-up" delay={index * 100}>
                <div className="card-interactive p-6 h-full group">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-${item.color}/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <item.icon className={`w-7 h-7 text-${item.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-burgundy mb-3">
                    {item.title}
                  </h3>
                  <p className="text-warm-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-warm-gray-200 to-transparent" />

      {/* The Paradox Section — Perel's Core Insight */}
      <section className="section-padding bg-warm-white px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollAnimate animation="fade-up" className="text-center mb-10">
            <p className="text-coral font-semibold mb-3 uppercase tracking-wide text-sm">
              La tensión que nadie te explicó
            </p>
            <h2 className="text-burgundy mb-4">
              ¿Por Qué Amamos Profundamente Pero Ya No Deseamos?
            </h2>
          </ScrollAnimate>

          <ScrollAnimate animation="fade-up" delay={100}>
            <div className="bg-gradient-to-r from-coral/5 to-burgundy/5 rounded-2xl p-6 sm:p-8 border border-coral/10">
              <p className="text-warm-gray-700 text-lg leading-relaxed mb-6">
                Lo que construye el amor — la rutina, la confianza, la seguridad — es
                exactamente lo que apaga el deseo. No es un defecto de tu relación.
                Es una paradoja que nadie te enseñó a navegar.
              </p>
              <div className="border-l-4 border-coral pl-4">
                <p className="text-burgundy italic text-lg font-medium">
                  &ldquo;El amor busca cerrar la distancia. El deseo necesita
                  espacio para existir.&rdquo;
                </p>
                <p className="text-warm-gray-500 text-sm mt-2">
                  &mdash; Esther Perel
                </p>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-warm-gray-200 to-transparent" />

      {/* About Facilitator */}
      <section className="section-padding bg-warm-gray-50 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollAnimate animation="fade-up" className="text-center mb-8">
            <p className="text-coral font-semibold mb-3 uppercase tracking-wide text-sm">
              Tu facilitador
            </p>
            <h2 className="text-burgundy">Con Ramón Henríquez</h2>
          </ScrollAnimate>

          <ScrollAnimate animation="fade-up" delay={100} className="mb-10">
            <div className="relative aspect-[4/5] max-w-[280px] mx-auto w-full rounded-3xl overflow-hidden shadow-xl group">
              <Image
                src="/images/ramon-henriquez.webp"
                alt="Ramón Henríquez"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-burgundy/40" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-burgundy font-bold text-sm">+10 años</p>
                      <p className="text-warm-gray-600 text-xs">acompañando transformaciones</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimate>

          <ScrollAnimate animation="fade-up" delay={200}>
            <div className="text-warm-gray-700 leading-relaxed text-center sm:text-left">
              <p className="text-lg">
                Ramón ha dedicado los últimos{" "}
                <strong className="text-burgundy">10 años</strong> a acompañar
                procesos de transformación en relaciones de pareja. Ha visto a cientos de
                parejas entender por qué su relación duele — y aun así recaer en los
                mismos patrones. Por eso diseñó esta conferencia como una experiencia
                práctica, no como una charla.
              </p>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-warm-white px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollAnimate animation="fade-up" className="text-center mb-12">
            <p className="text-coral font-semibold mb-3 uppercase tracking-wide text-sm">
              Resolvemos tus dudas
            </p>
            <h2 className="text-burgundy">Preguntas frecuentes</h2>
          </ScrollAnimate>

          <ScrollAnimate animation="fade-up" delay={100}>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-warm-gray-100">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Retreat Bridge Section */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 bg-warm-gray-50">
        <div className="max-w-3xl mx-auto">
          <ScrollAnimate animation="fade-up">
            <div className="bg-gradient-to-r from-coral/5 to-burgundy/5 rounded-2xl p-6 sm:p-8 border border-coral/15 text-center">
              <p className="text-warm-gray-700 text-lg leading-relaxed mb-4">
                Esta conferencia es el primer paso. Para quienes quieran llevar la
                transformación al nivel celular, existe un camino de inmersión de 3 días.
              </p>
              <Link
                href="/encuentros/abril-2026"
                className="inline-flex items-center gap-2 text-coral font-semibold hover:text-coral-dark transition-colors group"
              >
                <span>Conocer el retiro de inmersión</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding text-white relative overflow-hidden bg-gradient-to-b from-coral via-coral-dark to-burgundy">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-burgundy/30 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto text-center relative z-10 px-4 sm:px-6">
          <ScrollAnimate animation="fade-up">
            <h2 className="text-white mb-6">
              Tu relación merece más que sobrevivir en piloto automático
            </h2>
            <p className="text-white/90 mb-10 text-lg max-w-2xl mx-auto">
              Domingo 19 de abril a las 4:00 PM en Col. Nápoles, CDMX. Dos horas
              que pueden transformar la dinámica de tu relación.
            </p>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl max-w-lg mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4 text-coral text-sm font-medium">
                <span className="w-2 h-2 bg-coral rounded-full animate-pulse" />
                Esta no es una conferencia masiva. El cupo está diseñado para garantizar la profundidad de la experiencia.
              </div>
              <ConferenceRegistrationForm
                funnelName={FUNNEL_NAME}
                eventNamePrefix={EVENT_PREFIX}
                redirectPath="/f/conferencia-parejas/gracias"
                painPointOptions={PAIN_POINTS_PAREJAS}
                requirePhoneVerification
              />
            </div>

            <p className="mt-10 text-white/70 text-sm">
              Sin costo. Sin compromiso. Puedes asistir solo/a o en pareja.
            </p>
          </ScrollAnimate>
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
                <span className="w-1.5 h-1.5 bg-coral rounded-full animate-pulse" />
                <span className="text-coral text-xs font-medium">Cupo limitado</span>
              </div>
              <p className="text-burgundy font-semibold text-sm truncate">
                Conferencia Parejas - 19 Abr
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
