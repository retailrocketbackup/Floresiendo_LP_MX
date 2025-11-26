"use client";

import { useState } from "react";
import { HeroSection } from "@/components/hero-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CustomContactForm } from "@/components/custom-contact-form";
import { AboutSection } from "@/components/about-section";

export default function FunnelVideoFormularioPage() {
  const [playVideo, setPlayVideo] = useState(false);

  const handleHeroButtonClick = () => {
    setPlayVideo(true);
    const targetSection = document.getElementById("testimonios");
    targetSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main>
      <HeroSection onCtaClick={handleHeroButtonClick} />

      <section id="testimonios" className="bg-gray-50 min-h-screen flex flex-col justify-center px-4">
        <TestimonialsSection funnel="video" shouldPlay={playVideo} />
      </section>

      <section id="about" className="bg-purple-900 min-h-screen flex flex-col justify-center py-20 px-4">
        <AboutSection />
      </section>

      <section id="contacto" className="bg-gray-50 min-h-screen flex flex-col px-4 pt-20 pb-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-900 mb-4">¿Interesado/a? Da el primer paso</h2>
          <p className="text-xl text-muted-purple-900 max-w-2xl mx-auto">El viaje más importante empieza con una conversación. Déjanos tus datos y escríbenos por WhatsApp para conocerte y guiarte.</p>
        </div>
        <CustomContactForm funnel="video" />
      </section>
    </main>
  );
}
