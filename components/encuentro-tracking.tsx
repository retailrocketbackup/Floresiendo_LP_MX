"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/meta-tracking";
import { trackGoogleEvent, getGclid } from "@/lib/google-tracking";

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

    // Meta Pixel + CAPI
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

    // Google Analytics 4 — view_item (standard e-commerce event)
    getGclid();
    trackGoogleEvent("view_item", {
      item_name: slug,
      item_category: "retreat",
      value: value || 10200,
      currency: "MXN",
    });
  }, [slug, value]);

  // This component doesn't render anything
  return null;
}
