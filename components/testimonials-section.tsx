// components/testimonials-section.tsx
"use client"

import { Play } from "lucide-react";
import Image from "next/image";

// 1. Cambiamos lo que el componente espera recibir.
// Ahora espera una variable booleana 'shouldPlay'.
interface TestimonialsSectionProps {
  funnel?: string;
  shouldPlay: boolean;
}

// 2. Este es el ID de tu video de Vimeo.
const VIMEO_VIDEO_ID = "1126936015"; 

export function TestimonialsSection({ funnel = "unknown", shouldPlay }: TestimonialsSectionProps) {
  return (
    <section className="px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-3xl font-bold text-purple-900 mb-4">
            Una transformación real:
            <br />
            La historia de Edgar
          </h2>
          <p className="text-base md:text-xl text-muted-purple-900 max-w-3xl mx-auto text-pretty">
            "Vuelves a nacer. Es una sensación increíble, no hay palabras para describir."
          </p>
        </div>

        <div className="flex flex-col gap-8 justify-center items-center max-w-sm mx-auto">
          <div
            className="relative w-full aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden shadow-2xl"
          >
            {shouldPlay ? (
              // 3. Si 'shouldPlay' es true, mostramos el video de Vimeo con autoplay.
              <iframe
                src={`https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?autoplay=1&title=0&byline=0&portrait=0`}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Testimonio de Edgar"
              ></iframe>
            ) : (
              // 4. Si 'shouldPlay' es false, mostramos la miniatura y un ícono de Play.
              <>
                <Image
                  src="/miniatura-edgar.webp"
                  alt="Testimonio de Edgar"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <div 
                  className="absolute inset-0 bg-black/30 flex items-center justify-center"
                >
                  <div
                    className="bg-white/20 text-white border-2 border-white/50 rounded-full w-20 h-20 p-0 flex items-center justify-center"
                  >
                    <Play className="w-8 h-8 ml-1" fill="currentColor" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}