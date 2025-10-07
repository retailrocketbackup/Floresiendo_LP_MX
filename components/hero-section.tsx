// components/hero-section.tsx
"use client"; 

import Image from "next/image";

// La única propiedad que necesita es el enlace al que hará scroll
interface HeroSectionProps {
  ctaLink: string;
}

export function HeroSection({ ctaLink }: HeroSectionProps) {

  const handleButtonClick = () => {
    const targetSection = document.getElementById(ctaLink.substring(1)); // Quita el '#' del enlace
    targetSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const videoElement = document.getElementById('testimonialVideo') as HTMLVideoElement;
    if (videoElement) {
      videoElement.muted = true;
      setTimeout(() => {
        videoElement.play();
      }, 300);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/cosmic-spiritual-background.webp" 
          alt="Fondo cósmico espiritual"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" /> 
      </div>
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <Image
            src="/floresiendo-logo-boton.webp" 
            alt="FloreSiendo Logo"
            width={400} 
            height={400} 
            className="shadow-2xl w-full max-w-[192px] h-auto"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance drop-shadow-2xl">
          ¿Terminas el día sintiéndote vacío y sin propósito?
        </h1>
        <p className="text-xl md:text-2xl mb-6 text-purple-100 max-w-3xl mx-auto text-pretty drop-shadow-lg">
          Estas aqui por una razón, no es casualidad.
        </p>
        {/* Párrafo de transición añadido */}
        <p className="text-lg md:text-xl mb-8 text-purple-100 max-w-3xl mx-auto text-pretty">
         Encuentra la paz en tu día a día y dirige tu vida con propósito, en un retiro de 3 noches diseñado para tu transformación.
        </p>
        
        {/* Botón siempre visible */}
        <button
          onClick={handleButtonClick}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xl font-bold bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none max-w-xs whitespace-normal leading-tight"
        >
          "Es volver a nacer..."
          <br />
          Mira el testimonio de Edgar ↓
        </button>
      </div>
    </section>
  );
}