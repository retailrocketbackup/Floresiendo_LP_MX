"use client";

import { usePageTracking } from "@/hooks/usePageTracking";

interface EncuentroTrackingProps {
  slug: string;
  value?: number;
}

/**
 * Client component to handle page tracking for encuentro pages.
 * Must be included in server components that need ViewContent tracking.
 */
export function EncuentroTracking({ slug, value }: EncuentroTrackingProps) {
  usePageTracking({
    page: "encuentro",
    encuentroSlug: slug,
    value,
  });

  // This component doesn't render anything
  return null;
}
