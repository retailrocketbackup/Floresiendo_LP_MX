// components/meditation-hero.tsx
"use client";

import Image from "next/image";

export function MeditationHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo de la sección */}
      <div className="absolute inset-0">
        <Image
          src="/cosmic-spiritual-background.webp"
          alt="Fondo cósmico espiritual para meditación"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* FloreSiendo brand overlay: burgundy gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8b2a4a]/80 via-[#8b2a4a]/70 to-black/80" />
      </div>

      {/* Contenido de texto y botón */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Problem-first headline */}
        <p className="text-lg md:text-xl mb-4 text-[#f78080] font-medium tracking-wide uppercase drop-shadow-lg">
          Sesión Gratuita en Vivo
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance drop-shadow-2xl leading-tight">
          ¿Tu mente no para?
          <br />
          <span className="text-[#f78080]">Especialmente a las 3 AM.</span>
        </h1>
        <p className="text-xl md:text-2xl mb-4 text-white/90 max-w-3xl mx-auto text-pretty drop-shadow-lg">
          Aprende una técnica de respiración que calma tu sistema nervioso en minutos.
          <br />
          <span className="text-[#d4a853] font-semibold">Respaldada por neurociencia.</span>
        </p>
        <p className="text-lg mb-8 text-white/70">
          Próxima sesión: <span className="font-bold text-[#d4a853]">Viernes 28 de Noviembre, 7:00 PM</span> — En vivo por Zoom
        </p>

        {/* CTA Button - Opens Cal.com popup */}
        <button
          data-cal-link="floresiendomexico/meditacion-guiada"
          data-cal-namespace="meditacion-guiada"
          data-cal-config='{"layout":"month_view"}'
          className="inline-flex items-center justify-center px-8 py-4 text-xl font-bold bg-[#f78080] hover:bg-[#e66b6b] text-white rounded-full shadow-2xl hover:shadow-[#f78080]/50 hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          Reservar Mi Lugar Gratis
        </button>

        {/* Trust indicator */}
        <p className="mt-6 text-sm text-white/60">
          Sin costo. Sin compromisos. Solo 45 minutos para ti.
        </p>
      </div>
    </section>
  );
}