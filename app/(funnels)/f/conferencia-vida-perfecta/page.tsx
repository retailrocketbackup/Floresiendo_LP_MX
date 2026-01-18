"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  Users,
  Sparkles,
  Heart,
  Star,
  Shield,
  ArrowRight,
} from "lucide-react";
import { ConferenceRegistrationForm } from "@/components/conference-registration-form";
import { trackEvent } from "@/lib/meta-tracking";
import { ScrollAnimate } from "@/components/scroll-animate";
import { CountdownTimer } from "@/components/countdown-timer";

const FUNNEL_NAME = "conferencia_vida_perfecta";
const EVENT_PREFIX = "Conferencia_VidaPerfecta";

// Target date for countdown: February 11, 2026 at 7:00 PM CDMX (UTC-6)
const EVENT_DATE = new Date("2026-02-11T19:00:00-06:00");

// FAQ Accordion Item with improved styling
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

export default function ConferenciaVidaPerfectaPage() {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const mobileFormRef = useRef<HTMLDivElement>(null);
  const desktopFormRef = useRef<HTMLDivElement>(null);

  // Track page view on mount with funnel-specific event
  useEffect(() => {
    trackEvent(
      "ViewContent_Conferencia",
      {
        funnel: "conferencia",
        content_type: "landing",
        content_name: "conferencia_vida_perfecta_landing",
        content_category: "tofu_event",
      },
      { enableCAPI: true }
    );
  }, []);

  // Show sticky bar when mobile form is not visible on screen (mobile only)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when form is NOT intersecting (not visible)
        setShowStickyBar(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    if (mobileFormRef.current) {
      observer.observe(mobileFormRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    // On mobile (< 640px), scroll to mobile form section
    // On desktop, scroll to desktop form in hero
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
        "Sí, completamente gratis. No hay costos ocultos ni se te pedirá tarjeta de crédito. Es una conversación abierta para quienes resuenan con este tema.",
    },
    {
      question: "¿Dónde es exactamente?",
      answer:
        "La conferencia será en Filadelfia 128, piso 3, Colonia Nápoles, Ciudad de México. Es una zona céntrica y de fácil acceso. Te enviaremos la ubicación exacta por WhatsApp después de registrarte.",
    },
    {
      question: "¿Qué necesito para asistir?",
      answer:
        "Solo llegar con mente abierta y ganas de escuchar. Te recomendamos llegar 10-15 minutos antes para encontrar lugar y acomodarte tranquilamente.",
    },
    {
      question: "¿Esto es para venderme algo?",
      answer:
        "La conferencia es un espacio de reflexión genuina. Al final mencionaremos brevemente cómo puedes continuar si deseas profundizar, pero no hay presión de compra.",
    },
    {
      question: "¿Quién es Ramón Henríquez?",
      answer:
        "Ramón ha dedicado los últimos 10 años a acompañar procesos de transformación profunda. No como experto con todas las respuestas, sino como alguien que ha caminado por lugares oscuros y encontró un camino de regreso.",
    },
  ];

  return (
    <main className="min-h-screen bg-warm-white">
      {/* Hero Section - Full screen on all devices */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cosmic-spiritual-background.webp"
            alt="Fondo espiritual"
            fill
            priority
            sizes="100vw"
            className="object-cover scale-105 animate-[scale-in_20s_ease-out_forwards]"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        {/* Floating decorative elements - hidden on mobile for performance */}
        <div className="hidden sm:block absolute top-20 left-10 w-32 h-32 bg-coral/20 rounded-full blur-3xl animate-pulse-soft" />
        <div
          className="hidden sm:block absolute bottom-20 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl animate-pulse-soft"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 md:py-24">
          {/* Mobile: Compact info - two lines */}
          <div className="sm:hidden text-center mb-3 animate-fade-in space-y-1.5">
            <span className="inline-block px-3 py-1 bg-coral/90 text-white rounded-full text-[10px] font-semibold uppercase tracking-wide">
              Conferencia Presencial Gratuita
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold/20 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-gold/30">
              <MapPin className="w-3 h-3 text-gold" />
              <span>11 Feb • 7PM • CDMX</span>
            </div>
          </div>

          {/* Desktop: Full badge */}
          <div className="hidden sm:block text-center mb-6 sm:mb-8 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-gold/30">
              <MapPin className="w-4 h-4 text-gold" />
              Conferencia Presencial Gratuita
            </span>
          </div>

          {/* Desktop: Date, Time & Location pills */}
          <div
            className="hidden sm:flex flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8 text-white/90 text-sm animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-gold" />
              Miércoles 11 de Febrero 2026
            </span>
            <span className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
              <Clock className="w-4 h-4 text-gold" />
              7:00 PM
            </span>
            <span className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-gold" />
              Col. Nápoles, CDMX
            </span>
          </div>

          {/* Headline - Full story on all devices */}
          <h1
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-2 sm:mb-6 leading-tight animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            &ldquo;Cuando tu vida se ve perfecta
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span className="text-coral">pero se siente vacía&rdquo;</span>
          </h1>

          {/* Subheadline - Visible on all devices */}
          <p
            className="text-sm sm:text-xl md:text-2xl text-white/80 text-center mb-3 sm:mb-6 max-w-2xl mx-auto animate-slide-up px-2"
            style={{ animationDelay: "0.3s" }}
          >
            Una conversación honesta sobre el vacío que el éxito no llena
          </p>

          {/* Countdown Timer - xs on mobile, md on desktop */}
          <div
            className="mb-4 sm:mb-10 animate-slide-up"
            style={{ animationDelay: "0.35s" }}
          >
            <p className="text-[10px] sm:text-sm text-white/70 mb-1.5 sm:mb-3 uppercase tracking-wider text-center">
              Comienza en:
            </p>
            {/* Mobile: xs size for compactness */}
            <div className="sm:hidden">
              <CountdownTimer targetDate={EVENT_DATE} variant="light" size="xs" />
            </div>
            {/* Desktop: md size */}
            <div className="hidden sm:block">
              <CountdownTimer targetDate={EVENT_DATE} variant="light" size="md" />
            </div>
          </div>

          {/* Mobile CTA Button - scrolls to form below */}
          <div
            className="sm:hidden animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              onClick={scrollToForm}
              className="w-full bg-coral hover:bg-coral-dark text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-base group"
            >
              <span>Reserva tu lugar gratis</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-white/60 text-xs mt-2">
              Sin costo • Sin compromiso
            </p>
          </div>

          {/* Registration Form Card - Desktop only */}
          <div
            ref={desktopFormRef}
            className="hidden sm:block bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl max-w-lg mx-auto animate-scale-in border border-warm-gray-100 overflow-hidden"
            style={{ animationDelay: "0.4s" }}
          >
            {/* Urgency indicator */}
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4 text-coral text-xs sm:text-sm font-medium">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-coral rounded-full animate-pulse" />
              Solo 60 lugares disponibles
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-burgundy text-center mb-3 sm:mb-6">
              Reserva tu lugar gratis
            </h2>
            <ConferenceRegistrationForm
              funnelName={FUNNEL_NAME}
              eventNamePrefix={EVENT_PREFIX}
              redirectPath="/f/conferencia-vida-perfecta/gracias"
            />
          </div>

          {/* Trust Indicators - Hidden on mobile, shown on desktop */}
          <div className="hidden sm:flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />1 hora
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

          {/* Mobile: Facilitator mini-bio in hero (like meditacion-gratis) */}
          <div className="sm:hidden mt-4 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-warm-gray-200 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-warm-gray-400" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">Con Ramón Henríquez</p>
                <p className="text-white/70 text-xs">+10 años acompañando transformaciones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Form Section - Only visible on mobile, just below hero */}
      <section id="mobile-form" className="sm:hidden py-6 px-4 bg-warm-white">
        <div
          ref={mobileFormRef}
          className="bg-white rounded-2xl p-4 shadow-xl max-w-lg mx-auto border border-warm-gray-100"
        >
          <div className="flex items-center justify-center gap-2 mb-2 text-coral text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-coral rounded-full animate-pulse" />
            Solo 60 lugares disponibles
          </div>
          <h2 className="text-lg font-bold text-burgundy text-center mb-3">
            Reserva tu lugar gratis
          </h2>
          <ConferenceRegistrationForm
            funnelName={FUNNEL_NAME}
            eventNamePrefix={EVENT_PREFIX}
            redirectPath="/f/conferencia-vida-perfecta/gracias"
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
              <Star size={18} className="text-gold" />
              <span>+10 años de experiencia</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-burgundy" />
              <span>Equipo certificado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Validation Section */}
      <section className="section-padding bg-warm-white px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollAnimate animation="fade-up" className="text-center mb-12">
            <p className="text-coral font-semibold mb-3 uppercase tracking-wide text-sm">
              ¿Te identificas?
            </p>
            <h2 className="text-burgundy mb-4">¿Te suena familiar?</h2>
            <p className="text-warm-gray-600 text-lg">
              Quizás reconoces alguna de estas señales...
            </p>
          </ScrollAnimate>

          <div className="space-y-4">
            {[
              "Tienes todo lo que 'deberías' querer, pero despiertas sintiéndote vacío/a",
              "Tu vida se ve perfecta en fotos, pero por dentro algo fundamental falta",
              "No puedes contarle a nadie porque pensarían que eres malagradecido/a",
              "El éxito se suponía que debía sentirse diferente a esto",
              "No sabes quién eres fuera de tus roles y responsabilidades",
            ].map((item, index) => (
              <ScrollAnimate
                key={index}
                animation="fade-up"
                delay={index * 100}
              >
                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-warm-gray-100 hover:border-coral/30 group">
                  <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0 group-hover:bg-coral/20 transition-colors">
                    <div className="w-3 h-3 rounded-full bg-coral group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-warm-gray-700 text-base leading-relaxed">
                    {item}
                  </p>
                </div>
              </ScrollAnimate>
            ))}
          </div>

          <ScrollAnimate animation="fade-up" delay={500}>
            <p className="text-center text-burgundy font-semibold mt-12 text-lg">
              Si algo de esto resuena contigo, esta conferencia es para ti.
            </p>
          </ScrollAnimate>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-warm-gray-200 to-transparent" />

      {/* What You'll Discover Section */}
      <section className="section-padding bg-warm-gray-50 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimate animation="fade-up" className="text-center mb-12">
            <p className="text-coral font-semibold mb-3 uppercase tracking-wide text-sm">
              En esta conferencia
            </p>
            <h2 className="text-burgundy mb-4">Exploraremos juntos:</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto text-lg">
              No teorías motivacionales—conversaciones honestas sobre lo que
              nadie habla
            </p>
          </ScrollAnimate>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Por qué el éxito externo no llena el vacío interno",
                description:
                  "Entender la trampa de buscar afuera lo que solo puede encontrarse adentro.",
                color: "coral",
              },
              {
                icon: Heart,
                title: "El costo oculto de vivir las expectativas de otros",
                description:
                  "Reconocer cuánto de tu vida ha sido construida para complacer, no para vivir.",
                color: "burgundy",
              },
              {
                icon: Users,
                title: "Qué es realmente posible cuando dejas de actuar",
                description:
                  "Vislumbrar una vida donde no necesitas demostrar nada a nadie.",
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

      {/* About Ramón Section - Improved */}
      <section className="section-padding bg-warm-white px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimate animation="fade-up" className="text-center mb-12">
            <p className="text-coral font-semibold mb-3 uppercase tracking-wide text-sm">
              Tu facilitador
            </p>
            <h2 className="text-burgundy">Con Ramón Henríquez</h2>
          </ScrollAnimate>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
            {/* Photo */}
            <ScrollAnimate
              animation="fade-left"
              className="md:col-span-2 order-2 md:order-1"
            >
              <div className="relative aspect-[4/5] max-w-[300px] mx-auto w-full rounded-3xl overflow-hidden shadow-xl group">
                <div className="absolute inset-0 bg-gradient-to-b from-burgundy/20 to-burgundy/60" />
                {/* Placeholder - replace with actual photo */}
                <div className="absolute inset-0 flex items-center justify-center bg-warm-gray-100">
                  <div className="text-center text-warm-gray-400">
                    <Users className="w-16 h-16 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Foto de Ramón</p>
                  </div>
                </div>
                {/* Uncomment when photo is available:
                <Image
                  src="/images/ramon-henriquez.webp"
                  alt="Ramón Henríquez"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                */}
                {/* Experience badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-burgundy font-bold text-sm">
                          +10 años
                        </p>
                        <p className="text-warm-gray-600 text-xs">
                          de experiencia
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimate>

            {/* Bio */}
            <ScrollAnimate
              animation="fade-right"
              className="md:col-span-3 order-1 md:order-2"
            >
              <div className="space-y-5 text-warm-gray-700 leading-relaxed">
                <p className="text-lg">
                  Ramón ha dedicado los últimos{" "}
                  <strong className="text-burgundy">10 años</strong> a acompañar
                  a personas en momentos de profunda transformación.
                </p>
                <p>
                  No como experto que tiene todas las respuestas, sino como
                  alguien que ha caminado por lugares oscuros y encontró un
                  camino de regreso.
                </p>
                <p>
                  En esta conferencia, comparte lo que ha aprendido acompañando
                  a{" "}
                  <strong className="text-burgundy">
                    cientos de personas
                  </strong>{" "}
                  que, como tú, sentían que algo fundamental faltaba en sus
                  vidas—a pesar de tenerlo &ldquo;todo&rdquo;.
                </p>
              </div>

              {/* Quote */}
              <div className="mt-8 p-6 bg-gradient-to-r from-coral/5 to-burgundy/5 rounded-2xl border-l-4 border-coral">
                <p className="text-burgundy italic text-lg">
                  &ldquo;No vengo a enseñarte nada. Vengo a recordarte lo que ya
                  sabes pero has olvidado escuchar.&rdquo;
                </p>
                <p className="text-warm-gray-500 text-sm mt-3">
                  — Ramón Henríquez
                </p>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { value: "+1,000", label: "Participantes" },
                  { value: "+100", label: "Retiros" },
                  { value: "10", label: "Años" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="text-center p-4 bg-white rounded-xl shadow-sm"
                  >
                    <p className="text-2xl font-bold text-coral">{stat.value}</p>
                    <p className="text-warm-gray-500 text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-warm-gray-50 px-4 sm:px-6">
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

      {/* Final CTA Section - Only CTA besides hero */}
      <section className="section-padding text-white relative overflow-hidden bg-gradient-to-b from-coral via-coral-dark to-burgundy">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-burgundy/30 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto text-center relative z-10 px-4 sm:px-6">
          <ScrollAnimate animation="fade-up">
            <h2 className="text-white mb-6">
              El primer paso es dejar de fingir que todo está bien
            </h2>
            <p className="text-white/90 mb-10 text-lg max-w-2xl mx-auto">
              11 de febrero a las 7:00 PM en Col. Nápoles, CDMX. Una hora que
              puede cambiar tu perspectiva.
            </p>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl max-w-lg mx-auto">
              {/* Urgency */}
              <div className="flex items-center justify-center gap-2 mb-4 text-coral text-sm font-medium">
                <span className="w-2 h-2 bg-coral rounded-full animate-pulse" />
                Últimos lugares disponibles
              </div>
              <ConferenceRegistrationForm
                funnelName={FUNNEL_NAME}
                eventNamePrefix={EVENT_PREFIX}
                redirectPath="/f/conferencia-vida-perfecta/gracias"
              />
            </div>

            {/* Final Trust */}
            <p className="mt-10 text-white/70 text-sm">
              Sin costo. Sin compromiso. Sin grabación—solo para quienes estén
              presentes.
            </p>
          </ScrollAnimate>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-burgundy-dark text-white/60 text-center text-sm pb-24 md:pb-8">
        <p>© 2026 FloreSiendo. Todos los derechos reservados.</p>
      </footer>

      {/* Sticky Mobile CTA Bar - Only visible on mobile when form is not in view */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
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
                <span className="text-coral text-xs font-medium">Solo 60 lugares</span>
              </div>
              <p className="text-burgundy font-semibold text-sm truncate">
                Conferencia Gratuita - 11 Feb
              </p>
            </div>
            <button
              onClick={scrollToForm}
              className="flex-shrink-0 bg-coral hover:bg-coral-dark text-white font-semibold py-3 px-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 text-sm"
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
