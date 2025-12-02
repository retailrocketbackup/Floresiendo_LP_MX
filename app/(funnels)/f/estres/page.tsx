"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Battery, Brain, Heart, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { trackWhatsAppLead } from "@/lib/meta-tracking";
import { TrackedVimeoPlayer } from "@/components/tracked-vimeo-player";

// TODO: Replace with actual Vimeo video ID for V003
const VIMEO_VIDEO_ID = "PENDING";
const MAIN_WHATSAPP = "526182301481";
const WHATSAPP_MESSAGE = "Hola, vi el video sobre el estres y la rutina, y me gustaria saber como pueden ayudarme.";

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
      page: "estres",
      buttonLocation: location,
      eventName: "Lead_Estres",
    });
  };

  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
  const whatsappUrl = `https://wa.me/${MAIN_WHATSAPP}?text=${encodedMessage}`;

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

export default function EstresPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const faqs = [
    {
      question: "¿Que puedo esperar al escribirles?",
      answer: "Te responderemos personalmente para escucharte, entender tu situacion y explorar juntos si nuestro acompanamiento puede ayudarte. Sin presion, sin compromiso.",
    },
    {
      question: "¿Esto es terapia psicologica?",
      answer: "No. Ofrecemos acompanamiento espiritual basado en practicas ancestrales. Si necesitas atencion psicologica, te recomendamos buscar un profesional de salud mental.",
    },
    {
      question: "¿Tiene algun costo la conversacion inicial?",
      answer: "No. La primera conversacion es gratuita y sin compromiso. Tu decides si quieres dar el siguiente paso.",
    },
    {
      question: "¿Que tipo de practicas utilizan?",
      answer: "Trabajamos con ceremonias y rituales de tradiciones ancestrales que facilitan la reconexion interior y el descanso profundo del ser. Todo en un ambiente seguro.",
    },
    {
      question: "¿Puedo combinarlo con mi tratamiento medico?",
      answer: "Nuestro acompanamiento es complementario. Siempre recomendamos mantener cualquier tratamiento medico o psicologico que estes llevando.",
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

          {/* Headline - Based on V003 video */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4 leading-tight">
            &ldquo;Atrapado en una rutina
            <br />
            <span className="text-[#f78080]">que resta tu paz.&rdquo;</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 text-center mb-10 max-w-2xl mx-auto">
            Se lo que es despertar con un peso inmenso, ahogado entre trabajo,
            problemas y deudas. Encontre una alternativa, y quiero compartirla contigo.
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
              Escribenos por WhatsApp
            </WhatsAppCTA>
            <p className="mt-4 text-white/60 text-sm">
              Sin costo. Sin presion. Solo una conversacion para escucharte.
            </p>
          </div>

          {/* Optional Video - Secondary */}
          {VIMEO_VIDEO_ID !== "PENDING" && (
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
                    funnel="estres"
                    className="absolute top-0 left-0 w-full h-full"
                    autoplay={true}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Validation Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b2a4a] text-center mb-4">
            ¿Te identificas?
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Tal vez reconoces algunas de estas senales...
          </p>

          <div className="space-y-4">
            {[
              "Despiertas con una sensacion de vacio y un peso inmenso",
              "Te sientes atrapado en una rutina de trabajo y reuniones interminables",
              "Problemas familiares, de pareja y deudas que restan tu paz",
              "Un trabajo que te agota dia a dia sin darte nada a cambio",
              "Sientes que lo que dices, piensas y sientes no tiene congruencia",
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
            No estas solo. Y hay una alternativa.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 bg-[#fdf8f4]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b2a4a] text-center mb-6">
            Recupera tu paz interior
          </h2>
          <p className="text-xl text-gray-600 text-center mb-6 max-w-2xl mx-auto">
            En FloreSiendo ofrecemos un espacio donde puedes soltar el peso,
            reconectar contigo mismo y encontrar claridad.
          </p>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            A traves de practicas ancestrales, te acompanamos a:
          </p>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Brain,
                title: "Silenciar el ruido mental",
                description: "Tecnicas para calmar la mente y salir del ciclo de estres y preocupacion constante",
              },
              {
                icon: Battery,
                title: "Recargar tu energia",
                description: "Reconectar con fuentes de vitalidad que van mas alla del descanso fisico",
              },
              {
                icon: Heart,
                title: "Encontrar congruencia",
                description: "Alinear lo que piensas, sientes y haces para vivir con autenticidad",
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
              Para quienes buscan una inmersion mas profunda, tambien facilitamos
              <strong className="text-[#8b2a4a]"> encuentros de 3 noches en Morelos, Mexico</strong>—retiros
              donde puedes desconectarte completamente y reconectar con tu esencia.
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

      {/* Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b2a4a] text-center mb-12">
            Alguien que encontro la salida
          </h2>

          <div className="bg-[#fdf8f4] rounded-2xl p-8">
            <blockquote className="text-gray-700 leading-relaxed text-lg italic text-center">
              &ldquo;Todos los dias al despertar me levantaba con una sensacion de vacio
              y un peso inmenso que me impedia ir a trabajar. Me encontraba atrapado
              en una rutina de trabajo, reuniones, problemas familiares y con pareja,
              deudas... todo restaba mi paz.
              <br /><br />
              Estaba en un trabajo que no me llenaba, que me agotaba dia a dia.
              <br /><br />
              <span className="text-[#8b2a4a] font-semibold not-italic">
                Al final del dia pude encontrar una alternativa.
                Y si esto resuena contigo, juntos podremos encontrar una solucion.
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

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-burgundy text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Recupera tu paz
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Una conversacion puede ser el primer paso para salir del ciclo.
          </p>

          <WhatsAppCTA
            location="footer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Escribenos por WhatsApp
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