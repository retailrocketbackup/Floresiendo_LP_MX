// components/community-carousel.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CommunityPhoto {
  src: string;
  alt: string;
  location: string;
  country: string;
  flag: string;
}

const communityPhotos: CommunityPhoto[] = [
  {
    src: "/images/comunidad-espana-1.webp",
    alt: "Círculo de integración al aire libre",
    location: "Círculo de integración",
    country: "España",
    flag: "🇪🇸",
  },
  {
    src: "/images/comunidad-grupo-2.webp",
    alt: "Grupo de participantes sonriendo",
    location: "Nuestra familia",
    country: "Portugal",
    flag: "🇵🇹",
  },
  {
    src: "/images/comunidad-abrazo-3.webp",
    alt: "Amigos abrazándose viendo el atardecer",
    location: "Conexión profunda",
    country: "Uruguay",
    flag: "🇺🇾",
  },
  {
    src: "/images/comunidad-integracion-4.webp",
    alt: "Sesión de integración grupal",
    location: "Sesión grupal",
    country: "Rumania",
    flag: "🇷🇴",
  },
  {
    src: "/images/comunidad-silueta-5.webp",
    alt: "Mujer con brazos abiertos al atardecer",
    location: "Transformación",
    country: "México",
    flag: "🇲🇽",
  },
  {
    src: "/images/comunidad-yoga-6.webp",
    alt: "Meditación en la naturaleza",
    location: "Práctica contemplativa",
    country: "Internacional",
    flag: "🌎",
  },
];

export function CommunityCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance carousel
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % communityPhotos.length);
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? communityPhotos.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % communityPhotos.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Get visible photos (3 at a time on desktop)
  const getVisiblePhotos = () => {
    const photos = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % communityPhotos.length;
      photos.push({ ...communityPhotos[index], originalIndex: index });
    }
    return photos;
  };

  return (
    <section className="section-padding bg-warm-white overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-coral font-semibold mb-3 uppercase tracking-wide text-sm">
            Comunidad Internacional
          </p>
          <h2 className="text-burgundy mb-4">5 países, una sola familia</h2>
          <p className="text-warm-gray-600 max-w-2xl mx-auto">
            Desde España hasta México, facilitamos encuentros que transforman
            vidas y crean vínculos que trascienden fronteras.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 ml-1 sm:-ml-2 md:-ml-4"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 text-burgundy" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 mr-1 sm:-mr-2 md:-mr-4"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6 text-burgundy" />
          </button>

          {/* Photos Grid */}
          <div className="mx-8 md:mx-16">
            {/* Mobile: Single photo */}
            <div className="md:hidden">
              <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={communityPhotos[currentIndex].src}
                    alt={communityPhotos[currentIndex].alt}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy/70 via-transparent to-transparent" />
                </div>

                {/* Photo Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">
                      {communityPhotos[currentIndex].flag}
                    </span>
                    <span className="text-sm font-medium text-coral-light">
                      {communityPhotos[currentIndex].country}
                    </span>
                  </div>
                  <p className="font-semibold text-lg">
                    {communityPhotos[currentIndex].location}
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop: 3 photos */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
              {getVisiblePhotos().map((photo, index) => (
                <div
                  key={`${photo.src}-${index}`}
                  className={`relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer transition-all duration-300 ${
                    index === 1 ? "scale-105 z-10" : "opacity-90 hover:opacity-100"
                  }`}
                  onClick={() => goToSlide(photo.originalIndex)}
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-burgundy/70 via-transparent to-transparent" />
                  </div>

                  {/* Photo Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{photo.flag}</span>
                      <span className="text-xs font-medium text-coral-light">
                        {photo.country}
                      </span>
                    </div>
                    <p className="font-semibold">{photo.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {communityPhotos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-coral w-8"
                    : "bg-warm-gray-300 hover:bg-warm-gray-400"
                }`}
                aria-label={`Ir a foto ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Country Flags Row */}
        <div className="flex justify-center items-center gap-6 mt-10 flex-wrap">
          {[
            { flag: "🇪🇸", name: "España" },
            { flag: "🇵🇹", name: "Portugal" },
            { flag: "🇷🇴", name: "Rumania" },
            { flag: "🇺🇾", name: "Uruguay" },
            { flag: "🇲🇽", name: "México" },
          ].map((country) => (
            <div
              key={country.name}
              className="flex items-center gap-2 text-warm-gray-600"
            >
              <span className="text-2xl">{country.flag}</span>
              <span className="text-sm font-medium">{country.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
