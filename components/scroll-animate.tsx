"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollAnimateProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale" | "fade";
  delay?: number;
  threshold?: number;
}

export function ScrollAnimate({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
}: ScrollAnimateProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay, threshold]);

  const animationClass = {
    "fade-up": "scroll-animate",
    "fade-left": "scroll-animate-left",
    "fade-right": "scroll-animate-right",
    scale: "scroll-animate-scale",
    fade: "scroll-animate",
  }[animation];

  return (
    <div
      ref={ref}
      className={`${animationClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
