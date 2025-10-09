// components/testimonials-section.tsx
"use client"

import { useState, useRef, useEffect } from "react";
import { trackEvent } from "@/lib/meta-tracking";
import Link from "next/link";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface TestimonialsSectionProps {
  funnel?: string;
}

export function TestimonialsSection({ funnel = "unknown" }: TestimonialsSectionProps) {
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const trackingProgress = useRef({
    fired25: false,
    fired50: false,
    fired75: false,
    fired100: false,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const percentage = (video.currentTime / video.duration) * 100;

      // Track 25% con el nuevo nombre de evento
      if (percentage >= 25 && !trackingProgress.current.fired25) {
        trackEvent("EdgarVideoProgress_25", { funnel, content_name: `testimonial_edgar_${funnel}` }, { enableCAPI: true });
        trackingProgress.current.fired25 = true;
      }
      // Track 50% con el nuevo nombre de evento
      if (percentage >= 50 && !trackingProgress.current.fired50) {
        trackEvent("EdgarVideoProgress_50", { funnel, content_name: `testimonial_edgar_${funnel}` }, { enableCAPI: true });
        trackingProgress.current.fired50 = true;
      }
      // Track 75% con el nuevo nombre de evento
      if (percentage >= 75 && !trackingProgress.current.fired75) {
        trackEvent("EdgarVideoProgress_75", { funnel, content_name: `testimonial_edgar_${funnel}` }, { enableCAPI: true });
        trackingProgress.current.fired75 = true;
      }
    };

    const handleVideoEnd = () => {
      setIsVideoFinished(true);
      setIsPlaying(false);
      // Track 100% con el nuevo nombre de evento
      if (!trackingProgress.current.fired100) {
        trackEvent("EdgarVideoProgress_100", { funnel, content_name: `testimonial_edgar_${funnel}` }, { enableCAPI: true });
        trackingProgress.current.fired100 = true;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [funnel]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
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
            onClick={toggleMute}
            className="relative w-full aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden shadow-2xl cursor-pointer"
          >
            <video
              ref={videoRef}
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
              }}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/TestimonioEdgarFinal2.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>

            {!isVideoFinished && (
              <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full pointer-events-none">
                {isMuted ? <VolumeX className="h-6 w-6 text-white" /> : <Volume2 className="h-6 w-6 text-white" />}
              </div>
            )}
            
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
            
            {isVideoFinished && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center animate-fade-in">
                <Link href="#about" className="z-10">
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xl font-bold bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full shadow-lg hover:shadow-2xl transition-all scale-100 hover:scale-105">
                    Nuestros Retiros, Tu Casa ↓
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