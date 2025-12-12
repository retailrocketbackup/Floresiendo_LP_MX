"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Quote, Star } from "lucide-react";
import { TrackedVimeoPlayer } from "@/components/tracked-vimeo-player";

interface VideoTestimonialSectionProps {
  className?: string;
  funnel?: string;
}

const VIMEO_VIDEO_ID = "1126936015";

export function VideoTestimonialSection({ className = "", funnel = "encuentro" }: VideoTestimonialSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className={`py-16 px-4 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-[#f78080]/10 text-[#f78080] rounded-full text-sm font-semibold mb-4">
            Testimonio Real
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b2a4a] mb-4">
            Historias de Transformación
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Escucha de primera mano cómo nuestras experiencias han transformado vidas.
          </p>
        </div>

        {/* Video Testimonial Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Video Side */}
            <div
              className="relative aspect-[9/16] md:aspect-auto md:min-h-[500px] bg-gray-900 cursor-pointer"
              onClick={() => !isPlaying && setIsPlaying(true)}
            >
              {isPlaying ? (
                <TrackedVimeoPlayer
                  videoId={VIMEO_VIDEO_ID}
                  funnel={funnel}
                  className="absolute top-0 left-0 w-full h-full"
                  autoplay={true}
                />
              ) : (
                <>
                  <Image
                    src="/miniatura-edgar.webp"
                    alt="Testimonio de Edgar"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-[#8b2a4a] ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#f78080] rounded-full text-white text-sm font-medium">
                    Video Testimonio
                  </div>
                </>
              )}
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <Quote className="w-12 h-12 text-[#f78080]/20 mb-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-[#d4a853] fill-[#d4a853]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                "Quise conocerlo para poder cerrar un ciclo que tenía pendiente con mi padre,
                el cual falleció hace 18 años. Sentía que nunca nos habíamos despedido.
                Y también quería encontrar una mejor versión de mí, ser un mejor papá,
                una mejor persona en todos los aspectos."
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#f78080]/20">
                  <Image
                    src="/miniatura-edgar.webp"
                    alt="Edgar"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="font-bold text-[#8b2a4a] text-lg">Edgar</p>
                  <p className="text-gray-500 text-sm">México</p>
                </div>
              </div>

              {/* Experience tag */}
              <div className="mt-6">
                <span className="inline-block px-4 py-2 bg-[#f78080]/10 text-[#f78080] text-sm rounded-full font-medium">
                  Ceremonia de Bienestar
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
