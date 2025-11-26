// components/hero-section.tsx
"use client"; 

import Image from "next/image";

// 1. Cambiamos lo que el componente espera recibir.
// Ahora espera una función llamada 'onCtaClick'.
interface HeroSectionProps {
  onCtaClick?: () => void;
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {/* Optimización de imagen que hicimos antes */}
        <Image
          src="/cosmic-spiritual-background.webp" 
          alt="Fondo cósmico espiritual"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" /> 
      </div>
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <Image
            src="/floresiendo-logo-boton.webp" 
            alt="FloreSiendo Logo"
            width={192} 
            height={192}
            className="shadow-2xl w-full max-w-[192px] h-auto"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance drop-shadow-2xl">
          ¿Terminas el día sintiendo un vacío y sin propósito?
        </h1>
        <p className="text-xl md:text-2xl mb-6 text-purple-100 max-w-3xl mx-auto text-pretty drop-shadow-lg">
          No es casualidad que estes AQUI y AHORA.
        </p>
        <p className="text-lg md:text-xl mb-8 text-purple-100 max-w-3xl mx-auto text-pretty">
         A veces, para avanzar, primero hay que detenerse. En 3 noches que pueden transformar el resto de tu vida. Encuentra la paz mental y dirige tu vida con propósito.
        </p>
        
        {/* 2. El 'onClick' del botón ahora llama a la nueva función 'onCtaClick' */}
        <button
          onClick={onCtaClick}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xl font-bold bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none max-w-xs whitespace-normal leading-tight"
        >
          "Es volver a nacer..."
          <br />
          Conoce la historia de Edgar ↓
        </button>
      </div>
    </section>
  );
}