"use client";

import { useState } from "react";
import { MeditationHero } from "@/components/meditation-hero";
import { TestimonialsSection } from "@/components/testimonials-section";
import { MeditationBenefits } from "@/components/meditation-benefits";
import { MeditationFacilitator } from "@/components/meditation-facilitator";
import { CalendlyWidget } from "@/components/calendly-widget";

export default function FunnelMeditacionPage() {
  const [playVideo, setPlayVideo] = useState(false);
  const handleThumbnailClick = () => {
    setPlayVideo(true);
  };

  return (
    <main>
      <MeditationHero />

      <section className="bg-gray-50 py-20 sm:py-24 flex flex-col justify-center">
        <TestimonialsSection
          funnel="meditacion"
          shouldPlay={playVideo}
          onThumbnailClick={handleThumbnailClick}
          className="bg-transparent"
        />
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white">
        <MeditationBenefits className="bg-transparent" />
      </section>

      <section className="bg-gradient-to-b from-white to-purple-50">
        <MeditationFacilitator className="bg-transparent" />
      </section>

      <section id="registro" className="bg-gradient-to-b from-gray-50 to-purple-900 py-20 sm:py-24 px-4">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-purple-900 mb-4">
            Reserva tu Lugar 100% Gratis
          </h2>
          <p className="text-xl text-muted-purple-900">
            La invitación llegará directamente a tu calendario.
          </p>
        </div>

        <CalendlyWidget
          funnel="meditacion"
          url="https://calendly.com/ramonhenriquez/meditacion-gratuita"
          eventName="CompleteRegistration"
          className="bg-transparent"
        />
      </section>
    </main>
  );
}
