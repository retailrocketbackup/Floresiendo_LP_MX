// components/testimonials-section.tsx
"use client"

import { useState, useRef, useEffect } from "react"; // Importamos useRef
import { trackEvent } from "@/lib/meta-tracking";
import Link from "next/link";
import { Volume2, VolumeX, Play, Pause } from "lucide-react"; // Importamos Play y Pause


interface TestimonialsSectionProps {
  funnel?: string;
}

export function TestimonialsSection({ funnel = "unknown" }: TestimonialsSectionProps) {
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // 1. Nuevo estado para controlar el ícono de Play/Pausa
  const [isPlaying, setIsPlaying] = useState(true); 
  // Referencia directa al elemento de video
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;

    // Esta es la misma lógica de tu función handleVideoEnd
    const onVideoEnd = () => {
      setIsVideoFinished(true);
      setIsPlaying(false);
    };

    // Nos aseguramos de que el video exista antes de añadir el "listener"
    if (video) {
      video.addEventListener('ended', onVideoEnd);
    }

    // Función de limpieza: elimina el "listener" si el componente se desmonta
    return () => {
      if (video) {
        video.removeEventListener('ended', onVideoEnd);
      }
    };
  }, []);

  const handleVideoEnd = () => {
    setIsVideoFinished(true);
    setIsPlaying(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // 2. Nueva función para el botón de Play/Pausa
  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation(); // Importante: Evita que este clic también cambie el estado del sonido
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-3xl font-bold text-foreground mb-4">
            Una transformación real: 
          <br/>  
          La historia de Edgar
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Escucha de primera mano cómo fue el proceso para cerrar ciclos y encontrar una mejor versión de sí mismo.
          </p>
        </div>

        <div className="flex flex-col gap-8 justify-center items-center max-w-sm mx-auto">
          <div 
            onClick={toggleMute}
            className="relative w-full aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden shadow-2xl cursor-pointer"
          >
            <video
              ref={videoRef} // Añadimos la referencia para poder controlarlo
              id="testimonialVideo"
              className="w-full h-full object-cover"
              autoPlay
              muted={isMuted}
              poster="/miniatura-edgar.webp"
              onPlay={() => {
                setIsPlaying(true);
                trackEvent("ViewContent", {
                  funnel,
                  content_type: "testimonial",
                  content_name: `testimonial_edgar_${funnel}`,
                });
              }}   // Actualiza el ícono cuando se reproduce
              onPause={() => setIsPlaying(false)} // Actualiza el ícono cuando se pausa
          >
              <source src="/TestimonioEdgarFinal2.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>

            {/* Indicador de sonido (se queda igual) */}
            {!isVideoFinished && (
              <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full pointer-events-none">
                {isMuted ? <VolumeX className="h-6 w-6 text-white" /> : <Volume2 className="h-6 w-6 text-white" />}
              </div>
            )}

            {/* 3. Nuevo Botón de Play/Pausa */}
            {!isVideoFinished && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <button
                        onClick={togglePlayPause}
                        className="bg-black/50 p-3 rounded-full text-white z-10 backdrop-blur-sm hover:bg-black/75 transition-colors"
                        aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
                    >
                        {isPlaying ? ( <Pause className="h-5 w-5" /> ) : ( <Play className="h-5 w-5" /> )}
                    </button>
                </div>
            )}

            {/* Botón del final del video (se queda igual) */}
            {isVideoFinished && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center animate-fade-in">
                <Link href="#contacto" className="z-10">
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xl font-bold bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full shadow-lg hover:shadow-2xl transition-all scale-100 hover:scale-105">
                    Da el primer paso: Contáctanos
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}