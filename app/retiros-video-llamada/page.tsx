// app/retiros-video-llamada/page.tsx
"use client";

import { useState } from "react";
import { HeroSection } from "@/components/hero-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CustomContactForm } from "@/components/custom-contact-form";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";

export default function RetirosVideoLlamada() {
  const [playVideo, setPlayVideo] = useState(false);

  const handleHeroButtonClick = () => {
    setPlayVideo(true);
    const targetSection = document.getElementById("testimonios");
    targetSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Esta nueva función permite que el video se reproduzca desde la miniatura
  const handleThumbnailClick = () => {
    setPlayVideo(true);
  };

return (
    <main>
      <HeroSection onCtaClick={handleHeroButtonClick} />

      {/* SECCIÓN 1: TESTIMONIO (PICO EMOCIONAL) */}
      <section id="testimonios" className="bg-gray-50 py-20 sm:py-24 flex flex-col justify-center px-4">
        <TestimonialsSection
          funnel="video"
          shouldPlay={playVideo}
          onThumbnailClick={handleThumbnailClick}
        />
      </section>

      {/* SECCIÓN 2: CONTACTO (CONVERSIÓN INMEDIATA) */}
      <section id="contacto" className="bg-gradient-to-b from-gray-50 to-purple-900 py-20 sm:py-24 flex flex-col px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-900 mb-4">Tu transformación comienza con una conversación</h2>
          <p className="text-xl text-muted-purple-900 max-w-2xl mx-auto">Rellena el formulario para iniciar un chat por WhatsApp con un facilitador. Es 100% gratuito y sin compromiso.</p>
        </div>
        <CustomContactForm funnel="video" />
      </section>

      {/* SECCIÓN 3: SOBRE NOSOTROS (LÓGICA Y CONFIANZA) */}
      <section id="about" className="bg-purple-900 py-20 sm:py-24 flex flex-col justify-center px-4">
        <AboutSection />
      </section>

      <Footer />
    </main>
  );
}