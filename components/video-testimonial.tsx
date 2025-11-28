"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Play, Pause, Quote, Star } from "lucide-react";

interface VideoTestimonialProps {
  title?: string;
  subtitle?: string;
}

export function VideoTestimonial({
  title = "Historias de Transformación",
  subtitle = "Escucha de primera mano cómo nuestras experiencias han transformado vidas.",
}: VideoTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <section className="section-padding bg-gradient-warm">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-coral/10 text-coral rounded-full text-sm font-semibold mb-4">
            Testimonios
          </span>
          <h2 className="text-burgundy mb-4">{title}</h2>
          <p className="text-warm-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Video Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Video Side */}
              <div className="relative aspect-[9/16] md:aspect-auto md:min-h-[700px] bg-warm-gray-900">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="/images/miniatura-edgar.webp"
                  onEnded={handleVideoEnd}
                  playsInline
                >
                  <source src="/TestimonioEdgarFinal2.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>

                {/* Play/Pause Overlay */}
                <button
                  onClick={togglePlay}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                  }`}
                >
                  <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-burgundy" />
                    ) : (
                      <Play className="w-8 h-8 text-burgundy ml-1" />
                    )}
                  </div>
                </button>

                {/* Video badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-coral rounded-full text-white text-sm font-medium">
                  Video Testimonio
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                {/* Quote Icon */}
                <Quote className="w-12 h-12 text-coral/20 mb-6" />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-gold fill-gold"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-warm-gray-700 leading-relaxed mb-8 italic">
                  "Quise conocerlo para poder cerrar un ciclo que tenía pendiente con mi padre, el cual falleció hace 18 años. Sentía que nunca nos habíamos despedido. Y también quería encontrar una mejor versión de mí, ser un mejor papá, una mejor persona en todos los aspectos."
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-coral/20">
                    <Image
                      src="/images/miniatura-edgar.webp"
                      alt="Edgar"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-burgundy text-lg">Edgar</p>
                    <p className="text-warm-gray-500 text-sm">México</p>
                  </div>
                </div>

                {/* Experience tag */}
                <div className="mt-6">
                  <span className="inline-block px-4 py-2 bg-coral/10 text-coral text-sm rounded-full font-medium">
                    Ceremonia de Bienestar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicator */}
        <div className="text-center mt-12">
          <p className="text-warm-gray-500 text-sm">
            +500 personas han transformado sus vidas con nosotros
          </p>
        </div>
      </div>
    </section>
  );
}
