"use client";

import Image from "next/image";
import { useState } from "react";
import { Brain, ArrowDown } from "lucide-react";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CustomContactForm } from "@/components/custom-contact-form";
import { AboutSection } from "@/components/about-section";

export default function FunnelBienestarPage() {
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
      {/* Hero - Mental wellness focused */}
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
              <Brain className="w-10 h-10 text-purple-300" />
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-balance drop-shadow-2xl leading-tight">
            ¿Tu mente no para y el estrés te consume?
          </h1>

          <p className="text-xl md:text-2xl mb-6 text-purple-200 max-w-3xl mx-auto">
            La ansiedad no es tu destino. La paz interior es posible.
          </p>

          <p className="text-lg md:text-xl mb-10 text-purple-100/80 max-w-2xl mx-auto">
            Descubre cómo miles de personas han logrado calmar su mente,
            reducir el estrés y recuperar el control de sus emociones
            a través de prácticas milenarias en un ambiente seguro.
          </p>

          <button
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
          >
            Conoce una historia de transformación
            <ArrowDown size={20} />
          </button>
        </div>
      </section>

      {/* Symptoms Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8">
            Señales de que necesitas un cambio
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-purple-50 rounded-2xl p-8">
              <h3 className="font-bold text-purple-900 mb-4 text-xl">¿Te suena familiar?</h3>
              <ul className="space-y-3 text-gray-700">
                <li>Pensamientos que no paran, especialmente de noche</li>
                <li>Tensión constante en el cuerpo</li>
                <li>Dificultad para disfrutar el momento presente</li>
                <li>Irritabilidad que afecta tus relaciones</li>
                <li>Sensación de estar siempre &ldquo;corriendo&rdquo;</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-2xl p-8">
              <h3 className="font-bold text-purple-900 mb-4 text-xl">Lo que puedes experimentar...</h3>
              <ul className="space-y-3 text-gray-700">
                <li>Una mente en calma que responde, no reacciona</li>
                <li>Sueño profundo y reparador</li>
                <li>Mayor conexión con tus seres queridos</li>
                <li>Claridad para tomar decisiones</li>
                <li>Energía renovada para lo que importa</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonios" className="bg-gray-50 py-20 sm:py-24 flex flex-col justify-center px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            Una historia de bienestar
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mira cómo Edgar encontró la paz que buscaba después de años de estrés.
          </p>
        </div>
        <TestimonialsSection
          funnel="bienestar"
          shouldPlay={playVideo}
          onThumbnailClick={handleThumbnailClick}
        />
      </section>

      {/* Our Approach */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900 to-purple-950 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Nuestro enfoque hacia el bienestar
          </h2>
          <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            Combinamos prácticas ancestrales con un acompañamiento moderno
            para que logres resultados duraderos.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Prácticas de meditación",
                description: "Técnicas probadas para calmar la mente y reducir el estrés de manera natural.",
              },
              {
                title: "Trabajo corporal",
                description: "Liberación de tensiones acumuladas en el cuerpo a través de prácticas conscientes.",
              },
              {
                title: "Integración",
                description: "Herramientas prácticas para mantener el bienestar en tu vida cotidiana.",
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
            Comienza tu camino hacia el bienestar
          </h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Déjanos tus datos para una conversación sin compromiso.
            Te explicamos cómo podemos ayudarte.
          </p>
        </div>
        <CustomContactForm funnel="bienestar" />
      </section>
    </main>
  );
}
