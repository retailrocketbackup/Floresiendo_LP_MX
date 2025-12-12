"use client";

import { useEffect, useRef } from "react";
import { trackPageViewContent, type PageViewContentData } from "@/lib/meta-tracking";

interface UsePageTrackingOptions {
  page: PageViewContentData["page"];
  contentName?: string;
  contentCategory?: string;
  encuentroSlug?: string;
  value?: number;
  currency?: string;
}

/**
 * Hook to track ViewContent events when a page mounts.
 * Only fires once per page load to avoid duplicate events.
 *
 * @example
 * // In a page component:
 * usePageTracking({
 *   page: "encuentro",
 *   encuentroSlug: "febrero-2026",
 *   value: 15000,
 * });
 */
export function usePageTracking({
  page,
  contentName,
  contentCategory,
  encuentroSlug,
  value,
  currency = "MXN",
}: UsePageTrackingOptions) {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per component mount
    if (hasTracked.current) return;
    hasTracked.current = true;

    trackPageViewContent({
      page,
      contentName,
      contentCategory,
      encuentroSlug,
      value,
      currency,
    });
  }, [page, contentName, contentCategory, encuentroSlug, value, currency]);
}
