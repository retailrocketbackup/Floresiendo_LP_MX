"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/meta-tracking";

interface EncuentroTrackingProps {
  slug: string;
  value?: number;
}

/**
 * Client component to handle page tracking for encuentro pages.
 * Fires ViewContent_Retreat with CAPI for BOFU optimization.
 */
export function EncuentroTracking({ slug, value }: EncuentroTrackingProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    trackEvent(
      "ViewContent_Retreat",
      {
        funnel: "encuentro",
        content_type: "retreat_detail",
        content_name: slug,
        content_category: "retreat",
        value: value || 10200,
        currency: "MXN",
      },
      { enableCAPI: true }
    );
  }, [slug, value]);

  // This component doesn't render anything
  return null;
}
