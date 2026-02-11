"use client";

import { trackWhatsAppLead, type WhatsAppLeadData } from "@/lib/meta-tracking";
import { trackGoogleLead } from "@/lib/google-tracking";

interface TrackedWhatsAppLinkProps {
  phone: string;
  message?: string;
  page: WhatsAppLeadData["page"];
  buttonLocation: WhatsAppLeadData["buttonLocation"];
  encuentroSlug?: string;
  eventName?: string;
  value?: number;
  currency?: string;
  children: React.ReactNode;
  className?: string;
}

export function TrackedWhatsAppLink({
  phone,
  message = "",
  page,
  buttonLocation,
  encuentroSlug,
  eventName,
  value,
  currency = "MXN",
  children,
  className,
}: TrackedWhatsAppLinkProps) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}${message ? `?text=${encodedMessage}` : ""}`;

  const handleClick = () => {
    // Meta Pixel + CAPI
    trackWhatsAppLead({
      page,
      buttonLocation,
      encuentroSlug,
      eventName,
      value,
      currency,
    });

    // Google Ads conversion + GA4 generate_lead
    trackGoogleLead(`whatsapp_${page}`, value);
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
