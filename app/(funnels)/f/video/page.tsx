"use client";

import Image from "next/image";
import { useState } from "react";
import { Sparkles, ArrowDown } from "lucide-react";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CustomContactForm } from "@/components/custom-contact-form";
import { AboutSection } from "@/components/about-section";

export default function FunnelRetiroPage() {
  const [playVideo, setPlayVideo] = useState(false);

  const handleCtaClick = () => {
    setPlayVideo(true);
    const targetSection = document.getElementById("testimonios");
    targetSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleThumbnailClick = () => {
    setPlayVideo(true);
  };

  return (
    <main>
      {/* Hero - Retreat transformation focused */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/cosmic-spiritual-background.webp"
            alt="Fondo espiritual"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-purple-900/70 to-black/80" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-purple-600/30 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-10 h-10 text-yellow-400" />
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-balance drop-shadow-2xl leading-tight">
            ¿Sientes que algo falta en tu vida, pero no sabes qué es?
          </h1>

          <p className="text-xl md:text-2xl mb-6 text-purple-200 max-w-3xl mx-auto">
            No estás solo. Miles de personas sienten ese vacío.
          </p>

          <p className="text-lg md:text-xl mb-10 text-purple-100/80 max-w-2xl mx-auto">
            Nuestros retiros te ofrecen un espacio seguro para reconectar contigo mismo,
            liberar lo que te pesa y redescubrir tu propósito. Sin dogmas, sin juicios,
            solo transformación real.
          </p>

          <button
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full shadow-xl hover:shadow-yellow-500/30 hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none"
          >
            Conoce la historia de Edgar
            <ArrowDown size={20} />
          </button>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8">
            ¿Te identificas con alguno de estos?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-purple-50 rounded-2xl p-8">
              <h3 className="font-bold text-purple-900 mb-4 text-xl">Quizás sientes...</h3>
              <ul className="space-y-3 text-gray-700">
                <li>Que la rutina diaria te consume sin sentido</li>
                <li>Ansiedad o estrés que no logras controlar</li>
                <li>Desconexión de ti mismo y de los demás</li>
                <li>Que hay algo más en la vida, pero no sabes cómo encontrarlo</li>
                <li>Cansancio emocional que no se quita con descanso</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-2xl p-8">
              <h3 className="font-bold text-purple-900 mb-4 text-xl">Lo que puedes lograr...</h3>
              <ul className="space-y-3 text-gray-700">
                <li>Claridad mental y paz interior profunda</li>
                <li>Liberación de cargas emocionales del pasado</li>
                <li>Reconexión con tu propósito de vida</li>
                <li>Herramientas para mantener tu bienestar</li>
                <li>Una comunidad de apoyo genuino</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Edgar's Story */}
      <section id="testimonios" className="bg-gray-50 py-20 sm:py-24 flex flex-col justify-center px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            Una transformación real
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Edgar llegó buscando respuestas. Mira lo que encontró.
          </p>
        </div>
        <TestimonialsSection
          funnel="retiro"
          shouldPlay={playVideo}
          onThumbnailClick={handleThumbnailClick}
        />
      </section>

      {/* What We Offer */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900 to-purple-950 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            ¿Qué incluye el retiro?
          </h2>
          <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            3 días y 3 noches de inmersión profunda en un ambiente de naturaleza
            y contención total.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Prácticas ancestrales",
                description: "Ceremonias facilitadas por expertos con más de 10 años de experiencia en un ambiente seguro.",
              },
              {
                title: "Integración guiada",
                description: "Acompañamiento antes, durante y después para que la transformación perdure en tu vida diaria.",
              },
              {
                title: "Comunidad de apoyo",
                description: "Conecta con personas en el mismo camino. Seguimiento grupal post-retiro incluido.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-6">
                <h3 className="font-bold text-yellow-400 mb-3">{item.title}</h3>
                <p className="text-purple-200 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-purple-900 py-20 sm:py-24 flex flex-col justify-center px-4">
        <AboutSection />
      </section>

      {/* Contact Form */}
      <section id="contacto" className="bg-gradient-to-b from-purple-900 to-gray-50 py-20 sm:py-24 flex flex-col px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Da el primer paso hacia tu transformación
          </h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Déjanos tus datos para una conversación privada y sin compromiso.
            Te contamos todo sobre el próximo retiro.
          </p>
        </div>
        <CustomContactForm funnel="retiro" />
      </section>
    </main>
  );
}
