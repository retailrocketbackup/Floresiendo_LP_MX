"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/meta-tracking";

interface TrackedCTAButtonProps {
  href: string;
  eventName?: string;
  page: string;
  buttonLocation: string;
  children: React.ReactNode;
  className?: string;
}

export function TrackedCTAButton({
  href,
  eventName = "Lead",
  page,
  buttonLocation,
  children,
  className,
}: TrackedCTAButtonProps) {
  const handleClick = () => {
    trackEvent(
      eventName,
      {
        funnel: page,
        content_type: "cta_click",
        content_name: `${page}_${buttonLocation}`,
      },
      { enableCAPI: true }
    );
    console.log(`🔘 CTA: ${eventName} tracked`, { page, buttonLocation, href });
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
