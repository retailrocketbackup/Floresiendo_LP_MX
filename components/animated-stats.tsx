"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Heart, Calendar, Award } from "lucide-react";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: React.ElementType;
  description?: string;
}

interface AnimatedStatsProps {
  stats?: Stat[];
  title?: string;
  subtitle?: string;
}

const defaultStats: Stat[] = [
  {
    value: 500,
    suffix: "+",
    label: "Vidas Transformadas",
    icon: Users,
    description: "Personas que han encontrado su camino",
  },
  {
    value: 15,
    suffix: "+",
    label: "Años de Experiencia",
    icon: Calendar,
    description: "Acompañando procesos de sanación",
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfacción",
    icon: Heart,
    description: "Recomendarían la experiencia",
  },
  {
    value: 50,
    suffix: "+",
    label: "Retiros Realizados",
    icon: Award,
    description: "Ceremonias y encuentros sagrados",
  },
];

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration, start]);

  return count;
}

function StatCard({ stat, isVisible, delay }: { stat: Stat; isVisible: boolean; delay: number }) {
  const count = useCountUp(stat.value, 2000, isVisible);
  const Icon = stat.icon;

  return (
    <div
      className={`text-center p-8 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
        <Icon size={32} className="text-coral-light" />
      </div>

      {/* Number */}
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {stat.prefix}
        {count}
        {stat.suffix}
      </div>

      {/* Label */}
      <h3 className="text-xl font-semibold text-white mb-1">{stat.label}</h3>

      {/* Description */}
      {stat.description && (
        <p className="text-coral-light/70 text-sm">{stat.description}</p>
      )}
    </div>
  );
}

export function AnimatedStats({
  stats = defaultStats,
  title = "Nuestra Comunidad en Números",
  subtitle = "Cada número representa una historia de transformación y renacimiento",
}: AnimatedStatsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gradient-burgundy relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-burgundy-light/20 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-white/10 text-coral-light rounded-full text-sm font-semibold mb-4">
            Impacto
          </span>
          <h2 className="text-white mb-4">{title}</h2>
          <p className="text-coral-light/80 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              isVisible={isVisible}
              delay={index * 150}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-16 transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-coral-light/60 text-sm mb-4">
            ¿Listo para escribir tu propia historia?
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold bg-coral hover:bg-coral-dark text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Comienza Tu Transformación
          </a>
        </div>
      </div>
    </section>
  );
}
