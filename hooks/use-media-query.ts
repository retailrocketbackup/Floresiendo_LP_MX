"use client";

import { useState, useEffect } from "react";

/**
 * Hook for responsive behavior based on media queries
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 639px)");
 * const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 *
 * // Or use predefined breakpoints
 * const { isMobile, isTablet, isDesktop } = useBreakpoints();
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener (modern API)
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * Predefined breakpoints matching Tailwind defaults
 */
export function useBreakpoints() {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isLargeDesktop = useMediaQuery("(min-width: 1280px)");

  // Prefer reduced motion
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    prefersReducedMotion,
    // Convenience aliases
    isSmall: isMobile,
    isMedium: isTablet,
    isLarge: isDesktop,
  };
}

/**
 * Check if device supports touch
 */
export function useTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsTouch(
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    );
  }, []);

  return isTouch;
}
