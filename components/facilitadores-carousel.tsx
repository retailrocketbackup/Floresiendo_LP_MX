"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Facilitator {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface FacilitadoresCarouselProps {
  facilitators: Facilitator[];
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function FacilitadoresCarousel({
  facilitators,
  title = "Facilitadores",
  subtitle,
  autoPlay = true,
  autoPlayInterval = 5000,
}: FacilitadoresCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const minSwipeDistance = 50;

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % facilitators.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, facilitators.length]);

  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + facilitators.length) % facilitators.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, facilitators.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating, currentIndex]
  );

  // Auto-play
  useEffect(() => {
    if (autoPlay && facilitators.length > 1) {
      autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
      return () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      };
    }
  }, [autoPlay, autoPlayInterval, goToNext, facilitators.length]);

  // Pause on hover
  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const resumeAutoPlay = () => {
    if (autoPlay && facilitators.length > 1) {
      autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
    }
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  };

  if (facilitators.length === 0) return null;

  const currentFacilitator = facilitators[currentIndex];

  return (
    <section className="py-16 px-4 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#8b2a4a] mb-4">{title}</h2>
          {subtitle && (
            <p className="text-warm-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-[#fdf8f4] to-white rounded-3xl shadow-xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4a853]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8b2a4a]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    {/* Decorative ring */}
                    <div className="absolute -inset-3 bg-gradient-to-br from-[#d4a853] to-[#8b2a4a] rounded-full opacity-20 blur-sm" />
                    <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                      {currentFacilitator.image ? (
                        <Image
                          src={currentFacilitator.image}
                          alt={currentFacilitator.name}
                          fill
                          sizes="192px"
                          className="object-cover transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#8b2a4a] to-[#722240] flex items-center justify-center">
                          <span className="text-6xl">🙏</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#8b2a4a] mb-2">
                    {currentFacilitator.name}
                  </h3>
                  <p className="text-[#d4a853] font-semibold mb-6">
                    {currentFacilitator.role}
                  </p>

                  {/* Bio with quote icon */}
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#8b2a4a]/10" />
                    <p className="text-warm-gray-600 leading-relaxed pl-6">
                      {currentFacilitator.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {facilitators.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full md:-left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#8b2a4a] hover:bg-[#8b2a4a] hover:text-white transition-all duration-300 z-20"
                aria-label="Facilitador anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full md:-right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#8b2a4a] hover:bg-[#8b2a4a] hover:text-white transition-all duration-300 z-20"
                aria-label="Siguiente facilitador"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {facilitators.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {facilitators.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#8b2a4a] w-8"
                    : "bg-[#8b2a4a]/20 hover:bg-[#8b2a4a]/40"
                }`}
                aria-label={`Ver ${facilitators[index].name}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
