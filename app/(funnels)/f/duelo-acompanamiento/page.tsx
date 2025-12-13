"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Play, Heart, Users, Leaf, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { trackWhatsAppLead, trackPageViewContent } from "@/lib/meta-tracking";

// Lazy load Vimeo player - only loads when user clicks play
const TrackedVimeoPlayer = dynamic(
  () => import("@/components/tracked-vimeo-player").then((mod) => mod.TrackedVimeoPlayer),
  { ssr: false }
);

const VIMEO_VIDEO_ID = "1142274109";
const KARLA_WHATSAPP = "5215540180914";
const WHATSAPP_MESSAGE = "Hola Karla, vi el video sobre el acompañamiento en duelo y me gustaría saber más.";

// WhatsApp button component with tracking
function WhatsAppCTA({
  location,
  className = "",
  children
}: {
  location: string;
  className?: string;
  children: React.ReactNode;
}) {
  const handleClick = () => {
    trackWhatsAppLead({
      page: "duelo-acompanamiento",
      buttonLocation: location,
      eventName: "Lead_Duelo",
    });
  };

  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
  const whatsappUrl = `https://wa.me/${KARLA_WHATSAPP}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
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

export default function DueloAcompanamientoPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  // Track page view on mount
  useEffect(() => {
    trackPageViewContent({
      page: "duelo-acompanamiento",
      contentName: "vsl_duelo_landing",
      contentCategory: "duelo",
    });
  }, []);

  const faqs = [
    {
      question: "¿Qué puedo esperar al escribirles?",
      answer: "Te responderemos personalmente para escucharte, entender tu situación y explorar si nuestro acompañamiento puede servirte. Sin presión.",
    },
    {
      question: "¿Necesito experiencia previa con prácticas ancestrales?",
      answer: "No. El acompañamiento está diseñado para cualquier persona que busque apoyo en su proceso de pérdida.",
    },
    {
      question: "¿Tiene algún costo escribirles?",
      answer: "No. La conversación inicial es gratuita y sin compromiso. Tú decides el siguiente paso cuando estés listo.",
    },
    {
      question: "¿Qué tipo de prácticas utilizan?",
      answer: "Ceremonias y rituales de tradiciones espirituales que buscan reconectar con la memoria y encontrar paz interior. Siempre con respeto y sin promesas médicas.",
    },
    {
      question: "¿Puedo combinar esto con terapia u otras formas de apoyo?",
      answer: "Por supuesto. Nuestro acompañamiento complementa otras formas de cuidado personal que ya estés realizando.",
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
              Acompañamiento Espiritual
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4 leading-tight">
            &ldquo;Ese vacío que no llena nada...
            <br />
            <span className="text-[#f78080]">también lo conocí.&rdquo;</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 text-center mb-10 max-w-2xl mx-auto">
            Sé lo que es cargar con una pérdida que cambió todo. Por eso quiero acompañarte.
          </p>

          {/* CTA - Primary focus */}
          <div className="text-center mb-10">
            <WhatsAppCTA
              location="hero"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escríbenos por WhatsApp
            </WhatsAppCTA>
            <p className="mt-4 text-white/60 text-sm">
              Sin costo. Sin presión. Solo una conversación para escucharte.
            </p>
          </div>

          {/* Optional Video - Secondary */}
          <div className="text-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
            >
              <Play className="w-4 h-4" />
              {isPlaying ? "Cerrar video" : "Ver video completo"}
            </button>

            {isPlaying && (
              <div className="mt-6 relative aspect-[9/16] max-w-xs mx-auto rounded-2xl overflow-hidden shadow-2xl">
                <TrackedVimeoPlayer
                  videoId={VIMEO_VIDEO_ID}
                  funnel="duelo-acompanamiento"
                  className="absolute top-0 left-0 w-full h-full"
                  autoplay={true}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Validation Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b2a4a] text-center mb-4">
            Entendemos tu dolor
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Tal vez reconoces algunas de estas señales...
          </p>

          <div className="space-y-4">
            {[
              "Un vacío que parece imposible de llenar",
              "Actuar en piloto automático, sin emoción real",
              "Sentir que nadie entiende por lo que estás pasando",
              "Culpa por cosas que dijiste o dejaste de decir",
              "Querer encontrar paz sin olvidar a quien ya no está",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-[#fdf8f4] rounded-xl"
              >
                <div className="w-6 h-6 rounded-full bg-[#f78080]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Heart className="w-3 h-3 text-[#f78080]" />
                </div>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-[#8b2a4a] font-medium mt-10 text-lg">
            Todo lo que sientes es válido. Y no tienes que atravesarlo solo.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 bg-[#fdf8f4]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b2a4a] text-center mb-6">
            Un camino hacia la paz interior
          </h2>
          <p className="text-xl text-gray-600 text-center mb-6 max-w-2xl mx-auto">
            En FloreSiendo ofrecemos acompañamiento basado en la sabiduría ancestral.
            No prometemos soluciones rápidas—el duelo tiene su propio ritmo.
          </p>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Lo que sí ofrecemos es un espacio seguro donde puedas:
          </p>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Users,
                title: "Sentirte acompañado",
                description: "Una guía que entiende tu proceso desde la experiencia personal",
              },
              {
                icon: Leaf,
                title: "Conectar con prácticas ancestrales",
                description: "Ceremonias tradicionales en un entorno sagrado y contenido",
              },
              {
                icon: Heart,
                title: "Encontrar tu propio camino",
                description: "Sin presión, respetando tu ritmo hacia la paz interior",
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

          {/* Hint at Encuentros */}
          <div className="bg-white rounded-2xl p-8 border border-[#8b2a4a]/10">
            <p className="text-gray-700 text-center mb-4">
              Para quienes buscan una inmersión más profunda, también facilitamos
              <strong className="text-[#8b2a4a]"> encuentros de 3 noches en Morelos, México</strong>—retiros
              donde el proceso continúa en comunidad.
            </p>
            <div className="text-center">
              <Link
                href="/encuentros"
                className="inline-flex items-center gap-2 text-[#8b2a4a] font-semibold hover:text-[#722240] transition-colors"
              >
                Conocer los encuentros
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Facilitator Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b2a4a] text-center mb-12">
            Alguien que entiende desde la experiencia
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Photo placeholder */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#8b2a4a] to-[#722240] flex items-center justify-center shadow-xl">
                <span className="text-6xl">🙏</span>
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-[#8b2a4a] mb-2">
                Karla Nava
              </h3>
              <p className="text-[#d4a853] font-semibold mb-4">
                Facilitadora en Formación en Escuela FloreSiendo
              </p>
              <blockquote className="text-gray-700 leading-relaxed italic">
                &ldquo;Yo también perdí a alguien que amaba profundamente. Sé lo que es ese vacío,
                la culpa, el no saber cómo seguir. Mi propio proceso con las prácticas ancestrales
                me enseñó que es posible encontrar paz sin olvidar.
                <br /><br />
                Hoy acompaño a otros en ese camino—no como experta, sino como alguien que camina contigo.&rdquo;
              </blockquote>
            </div>
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

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-burgundy text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Da el primer paso
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Una conversación puede ser el inicio de tu camino hacia la paz interior.
          </p>

          <WhatsAppCTA
            location="footer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Escríbenos por WhatsApp
          </WhatsAppCTA>

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
