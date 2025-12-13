"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  quote: string;
  rating: number;
  experience: string;
}

interface TestimonialCardsProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Edgar",
    location: "México",
    image: "/images/miniatura-edgar.webp",
    quote: "Y vuelves a nacer. Después de años sintiéndome perdido, finalmente encontré mi propósito y paz interior. Esta experiencia cambió completamente mi perspectiva de vida.",
    rating: 5,
    experience: "Ceremonia de Bienestar",
  },
  {
    id: 2,
    name: "María Elena",
    location: "Guadalajara",
    image: "",
    quote: "Llegué con el corazón roto después de perder a mi madre. Encontré no solo bienestar, sino una familia que me acompañó en cada paso del proceso.",
    rating: 5,
    experience: "Retiro de 3 Noches",
  },
  {
    id: 3,
    name: "Roberto",
    location: "Monterrey",
    image: "",
    quote: "Después de 20 años luchando con ansiedad, finalmente pude soltar lo que me estaba deteniendo. El equipo crea un espacio verdaderamente sagrado.",
    rating: 5,
    experience: "Ceremonia Individual",
  },
  {
    id: 4,
    name: "Ana",
    location: "Puebla",
    image: "",
    quote: "No sabía qué esperar, pero la experiencia superó todas mis expectativas. Profesionalismo, amor y un acompañamiento que te hace sentir segura en todo momento.",
    rating: 5,
    experience: "Primera Experiencia",
  },
];

export function TestimonialCards({
  testimonials = defaultTestimonials,
  title = "Historias de Transformación",
  subtitle = "Miles de personas han encontrado su camino. Estas son sus historias.",
  autoPlay = true,
  autoPlayInterval = 5000,
}: TestimonialCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding bg-gradient-warm">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-coral/10 text-coral rounded-full text-sm font-semibold mb-4">
            Testimonios
          </span>
          <h2 className="text-burgundy mb-4">{title}</h2>
          <p className="text-warm-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Testimonial Carousel */}
        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative">
            {/* Main Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-5 gap-0">
                {/* Image Side */}
                <div className="md:col-span-2 relative h-64 md:h-auto bg-gradient-burgundy">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                      {currentTestimonial.image ? (
                        <Image
                          src={currentTestimonial.image}
                          alt={currentTestimonial.name}
                          fill
                          sizes="160px"
                          className="object-cover"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-coral/20 to-burgundy/20" />
                          <div className="w-full h-full bg-warm-gray-200 flex items-center justify-center text-warm-gray-400 text-4xl font-bold">
                            {currentTestimonial.name.charAt(0)}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4">
                    <Quote size={32} className="text-white/20" />
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Quote size={32} className="text-white/20 rotate-180" />
                  </div>
                </div>

                {/* Content Side */}
                <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={`${
                          i < currentTestimonial.rating
                            ? "text-gold fill-gold"
                            : "text-warm-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote
                    className={`text-lg md:text-xl text-warm-gray-700 leading-relaxed mb-6 transition-opacity duration-500 ${
                      isAnimating ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    "{currentTestimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div
                    className={`transition-opacity duration-500 ${
                      isAnimating ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <p className="font-bold text-burgundy text-lg">
                      {currentTestimonial.name}
                    </p>
                    <p className="text-warm-gray-500 text-sm">
                      {currentTestimonial.location}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 bg-coral/10 text-coral text-xs rounded-full font-medium">
                      {currentTestimonial.experience}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-warm-gray-600 hover:text-coral hover:scale-110 transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-warm-gray-600 hover:text-coral hover:scale-110 transition-all"
              aria-label="Siguiente"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
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
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
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
