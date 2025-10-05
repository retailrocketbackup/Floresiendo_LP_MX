// components/hero-section.tsx
"use client"; 

import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  showCTA?: boolean;
  ctaLink?: string;
}

export function HeroSection({
  showCTA = false,
  ctaLink = "#",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/cosmic-spiritual-background.webp" 
          alt="Cosmic spiritual background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
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
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance drop-shadow-2xl">
          ¿Terminas el día sintiéndote vacío y sin propósito?
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto text-pretty drop-shadow-lg">
          Has sido guiado hasta aquí por una razón 
        <br/>
          Encuentra la paz y dirige tu vida 
        <br/>  
          Un retiro de 4 días diseñado para tu transformación
        </p>
        {showCTA && (
          <Link href={ctaLink}>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xl font-bold bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none">
              Iniciar mi transformación ↓
            </button>
          </Link>
        )}
      </div>
    </section>
  );
}