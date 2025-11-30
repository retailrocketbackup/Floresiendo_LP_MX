"use client";

import { usePageTracking } from "@/hooks/usePageTracking";
import type { PageViewContentData } from "@/lib/meta-tracking";

interface PageTrackingProps {
  page: PageViewContentData["page"];
  contentName?: string;
  value?: number;
  currency?: string;
}

/**
 * Client component to handle page tracking for server components.
 * Add this component to any server-rendered page to track ViewContent events.
 */
export function PageTracking({ page, contentName, value, currency }: PageTrackingProps) {
  usePageTracking({
    page,
    contentName,
    value,
    currency,
  });

  // This component doesn't render anything
  return null;
}
