"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, ArrowDown } from "lucide-react";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CustomContactForm } from "@/components/custom-contact-form";
import { AboutSection } from "@/components/about-section";

export default function FunnelDueloPage() {
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
      {/* Hero - Grief focused */}
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
              <Heart className="w-10 h-10 text-purple-300" />
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-balance drop-shadow-2xl leading-tight">
            Perder a alguien que amamos es un dolor que parece no tener fin...
          </h1>

          <p className="text-xl md:text-2xl mb-6 text-purple-200 max-w-3xl mx-auto">
            Pero no tienes que atravesarlo solo.
          </p>

          <p className="text-lg md:text-xl mb-10 text-purple-100/80 max-w-2xl mx-auto">
            El duelo no es algo que debas &ldquo;superar&rdquo;. Es un proceso sagrado de transformación
            que, con el acompañamiento adecuado, puede convertirse en un camino hacia la paz interior.
          </p>

          <button
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
          >
            Conoce cómo podemos ayudarte
            <ArrowDown size={20} />
          </button>
        </div>
      </section>

      {/* Understanding Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8">
            Entendemos tu dolor
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-purple-50 rounded-2xl p-8">
              <h3 className="font-bold text-purple-900 mb-4 text-xl">Quizás sientes...</h3>
              <ul className="space-y-3 text-gray-700">
                <li>Un vacío que nada parece llenar</li>
                <li>Culpa por cosas que dijiste o dejaste de decir</li>
                <li>Rabia contra la vida, contra Dios, contra ti mismo</li>
                <li>Que nadie entiende realmente por lo que estás pasando</li>
                <li>Miedo de olvidar a quien ya no está</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-2xl p-8">
              <h3 className="font-bold text-purple-900 mb-4 text-xl">Lo que necesitas saber...</h3>
              <ul className="space-y-3 text-gray-700">
                <li>Todo lo que sientes es válido y natural</li>
                <li>No hay una forma &ldquo;correcta&rdquo; de vivir el duelo</li>
                <li>El tiempo solo no sana; el proceso consciente sí</li>
                <li>Es posible encontrar paz sin olvidar</li>
                <li>No tienes que hacerlo solo</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonios" className="bg-gray-50 py-20 sm:py-24 flex flex-col justify-center px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            Historias de transformación
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Personas que, como tú, atravesaron el dolor de la pérdida y encontraron un camino hacia la paz.
          </p>
        </div>
        <TestimonialsSection
          funnel="duelo"
          shouldPlay={playVideo}
          onThumbnailClick={handleThumbnailClick}
        />
      </section>

      {/* Our Approach */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900 to-purple-950 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Cómo te acompañamos
          </h2>
          <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            Nuestros encuentros ofrecen un espacio sagrado donde puedes procesar tu duelo
            de manera profunda, liberando el dolor que guardas dentro.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Espacio seguro",
                description: "Un ambiente de amor y contención donde puedes expresar todo lo que sientes sin juicio.",
              },
              {
                title: "Conexión profunda",
                description: "Las prácticas ancestrales facilitan un encuentro interior que permite encontrar bienestar desde la raíz.",
              },
              {
                title: "Integración",
                description: "Acompañamiento para dar sentido a la experiencia y llevar el bienestar a tu vida diaria.",
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
            Da el primer paso hacia el bienestar
          </h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Déjanos tus datos para una conversación privada y sin compromiso.
            Estamos aquí para escucharte.
          </p>
        </div>
        <CustomContactForm funnel="duelo" />
      </section>
    </main>
  );
}
