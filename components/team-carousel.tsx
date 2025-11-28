"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

interface TeamCarouselProps {
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sergio Sanz",
    role: "Co-Fundador & Facilitador & Psicólogo Clínico",
    image: "/images/sergio.png",
    quote: "Mi propósito es acompañar a otros con amor mientras me acompañaba a mí mismo por todo aquello que nos tocaba atravesar en la vida.",
  },
  {
    id: 2,
    name: "Flor Soeiro",
    role: "Co-Fundadora & Facilitadora",
    image: "/images/Flor.jpg",
    quote: "El amor es la medicina más poderosa. Acompañamos desde el corazón cada proceso de transformación.",
  },
  {
    id: 3,
    name: "Ramon Henriquez",
    role: "Co-Fundador & Facilitador & Psicoterapeuta",
    image: "",
    quote: "Cada ceremonia es un encuentro sagrado con nuestra esencia más profunda.",
  },
  {
    id: 4,
    name: "Roble",
    role: "Facilitador",
    image: "/images/Roble.jpg",
    quote: "La naturaleza nos enseña que todo proceso de sanación requiere tiempo, presencia y amor.",
  },
  {
    id: 5,
    name: "Karla Nava",
    role: "Alumna de Escuela FloreSiendo",
    image: "",
    quote: "Crear espacios seguros donde cada persona pueda reconectarse con su luz interior es mi mayor regalo.",
  },
];

export function TeamCarousel({
  title = "Nuestro Equipo",
  subtitle = "Un equipo multidisciplinario de facilitadores con más de una década de experiencia en acompañamiento terapéutico y espiritual.",
  autoPlay = true,
  autoPlayInterval = 5000,
}: TeamCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (autoPlay && !isPaused) {
      intervalRef.current = setInterval(nextSlide, autoPlayInterval);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, isPaused, autoPlayInterval]);

  const currentMember = teamMembers[currentIndex];

  // Get visible members for desktop (show 3 at a time)
  const getVisibleMembers = () => {
    const members = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + teamMembers.length) % teamMembers.length;
      members.push({ ...teamMembers[index], position: i });
    }
    return members;
  };

  return (
    <section className="section-padding bg-gradient-warm">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-coral font-semibold uppercase tracking-wide text-sm">Sobre nosotros</span>
          <h2 className="text-burgundy mt-3 mb-4">{title}</h2>
          <p className="text-warm-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Desktop Carousel - Show 3 cards */}
        <div
          className="hidden md:block max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative">
            <div className="flex items-center justify-center gap-6">
              {getVisibleMembers().map((member) => (
                <div
                  key={member.id}
                  className={`transition-all duration-500 ${
                    member.position === 0
                      ? "scale-100 opacity-100 z-10"
                      : "scale-90 opacity-60"
                  }`}
                  style={{
                    flex: member.position === 0 ? "0 0 340px" : "0 0 280px",
                  }}
                >
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Image */}
                    <div className="relative h-64 bg-gradient-burgundy">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full bg-warm-gray-200 flex items-center justify-center text-warm-gray-400 text-4xl font-bold">
                              {member.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Decorative Quote */}
                      <div className="absolute top-4 left-4">
                        <Quote size={24} className="text-white/20" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 text-center">
                      <h3 className="font-bold text-burgundy text-lg mb-1">
                        {member.name}
                      </h3>
                      <p className="text-coral text-sm font-medium mb-4">
                        {member.role}
                      </p>
                      {member.position === 0 && (
                        <p className={`text-warm-gray-600 text-sm italic leading-relaxed transition-opacity duration-500 ${
                          isAnimating ? "opacity-0" : "opacity-100"
                        }`}>
                          "{member.quote}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-warm-gray-600 hover:text-coral hover:scale-110 transition-all z-20"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-warm-gray-600 hover:text-coral hover:scale-110 transition-all z-20"
              aria-label="Siguiente"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Carousel - Single card */}
        <div
          className="md:hidden max-w-sm mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Image */}
              <div className="relative h-56 bg-gradient-burgundy">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                    {currentMember.image ? (
                      <Image
                        src={currentMember.image}
                        alt={currentMember.name}
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full bg-warm-gray-200 flex items-center justify-center text-warm-gray-400 text-3xl font-bold">
                        {currentMember.name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <Quote size={20} className="text-white/20" />
                </div>
              </div>

              {/* Content */}
              <div className={`p-6 text-center transition-opacity duration-500 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}>
                <h3 className="font-bold text-burgundy text-lg mb-1">
                  {currentMember.name}
                </h3>
                <p className="text-coral text-sm font-medium mb-4">
                  {currentMember.role}
                </p>
                <p className="text-warm-gray-600 text-sm italic leading-relaxed">
                  "{currentMember.quote}"
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-warm-gray-600 hover:text-coral transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-warm-gray-600 hover:text-coral transition-all"
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-coral w-8"
                  : "bg-warm-gray-300 hover:bg-warm-gray-400"
              }`}
              aria-label={`Ver ${teamMembers[index].name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
