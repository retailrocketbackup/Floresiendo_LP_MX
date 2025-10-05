// components/hero-section.tsx
import Image from "next/image";
import { SmartLink } from "@/components/SmartLink"; // <-- Cambio #1: Importamos SmartLink

interface HeroSectionProps {
  showCTA?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export function HeroSection({
  showCTA = false,
  ctaText = "Agendar Llamada Gratuita",
  ctaLink = "/formulario-video",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/cosmic-spiritual-background.webp"
          alt="Cosmic spiritual background with person walking toward mandala galaxy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* ... (todo el contenido visual se queda igual) ... */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/floresiendo-logo-boton.png"
            alt="FloreSiendo Logo"
            width={971}
            height={989}
            className="shadow-2xl w-full max-w-[192px] h-auto"
          />
        </div>
        <h1 className="text-4xl md:text-4xl font-bold mb-6 text-balance drop-shadow-2xl">
          Retiros FloreSiendo
          <br />
          6 al 9 de Noviembre
          <span className="block text-3xl md:text-4xl font-normal mt-2 text-purple-200">
            Cocoyoc, Morelos
          </span>
        </h1>
        <p className="text-2xl md:text-4xl mb-8 text-purple-100 max-w-2xl mx-auto text-pretty drop-shadow-lg font-semibold">
          Libera tu mente del estrés y encuentra la paz en tu vida
        </p>
        {showCTA && (
          // Cambio #2: Usamos SmartLink en lugar de Link
          <SmartLink href={ctaLink}>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xl font-bold bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none">
              {ctaText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </SmartLink>
        )}
      </div>
    </section>
  );
}