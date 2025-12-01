"use client";

import { useState } from "react";
import { MeditationHero } from "@/components/meditation-hero";
import { TestimonialsSection } from "@/components/testimonials-section";
import { MeditationBenefits } from "@/components/meditation-benefits";
import { MeditationFacilitator } from "@/components/meditation-facilitator";
import { MeditationFAQ } from "@/components/meditation-faq";
import { CalcomWidget } from "@/components/calcom-widget";

export default function FunnelMeditacionPage() {
  const [playVideo, setPlayVideo] = useState(false);
  const handleThumbnailClick = () => {
    setPlayVideo(true);
  };

  return (
    <main className="bg-white">
      {/* Hero: Problem-first headline with burgundy overlay */}
      <MeditationHero />

      {/* Testimonials: Social proof */}
      <section className="bg-gradient-to-b from-white to-[#f78080]/5 py-20 sm:py-24 flex flex-col justify-center">
        <TestimonialsSection
          funnel="meditacion"
          shouldPlay={playVideo}
          onThumbnailClick={handleThumbnailClick}
          className="bg-transparent"
        />
      </section>

      {/* Benefits: Neuroscience-backed messaging */}
      <MeditationBenefits />

      {/* Facilitator: Credibility section */}
      <MeditationFacilitator />

      {/* FAQ: Objection handling */}
      <MeditationFAQ className="bg-white" />

      {/* Cal.com Booking: Main conversion point */}
      <CalcomWidget
        calLink="floresiendomexico/meditacion-guiada"
        funnel="meditacion"
        eventName="CompleteRegistration"
        className="bg-gradient-to-b from-white to-[#8b2a4a]/10"
      />

      {/* Final CTA section */}
      <section className="bg-[#8b2a4a] py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Tu mente merece un descanso.
          </h2>
          <p className="text-xl text-white/80 mb-8">
            45 minutos pueden cambiar cómo te sientes esta semana.
          </p>
          <button
            data-cal-link="floresiendomexico/meditacion-guiada"
            data-cal-namespace="meditacion-guiada"
            data-cal-config='{"layout":"month_view"}'
            className="inline-flex items-center justify-center px-8 py-4 text-xl font-bold bg-[#f78080] hover:bg-[#e66b6b] text-white rounded-full shadow-2xl hover:shadow-[#f78080]/50 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Reservar Mi Lugar Gratis
          </button>
        </div>
      </section>
    </main>
  );
}
