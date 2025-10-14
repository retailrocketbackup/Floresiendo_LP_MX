// components/meditation-hero.tsx
"use client";

import Image from "next/image";

// Función para hacer scroll suave a una sección de la página
const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export function MeditationHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo de la sección, reutilizamos la misma imagen inspiradora */}
      <div className="absolute inset-0">
        <Image
          src="/cosmic-spiritual-background.webp"
          alt="Fondo cósmico espiritual para meditación"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Contenido de texto y botón */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance drop-shadow-2xl">
          El Primer Paso para Salir del Vacío
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto text-pretty drop-shadow-lg">
          Meditación Gratuita Online{" "}
          <br />
          <span className="font-bold text-yellow-300">24 de Noviembre</span>
          <br />
          Descubre una técnica poderosa para calmar tu mente y reencontrar tu
          centro.
        </p>

        {/* Botón que llevará al usuario a la sección de registro (Calendly) */}
        <button
          onClick={() => scrollTo("registro")} // Al hacer clic, se activará el scroll
          className="inline-flex items-center justify-center px-8 py-4 text-xl font-bold bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300"
        >
          Sí, ¡Quiero Reservar mi Lugar Gratis!
        </button>
      </div>
    </section>
  );
}