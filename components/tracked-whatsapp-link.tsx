"use client";

import { useState, useEffect } from "react";
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
  const [finalMessage, setFinalMessage] = useState(message);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source");
    const utmCampaign = params.get("utm_campaign");
    const utmTerm = params.get("utm_term");

    if (utmSource === "google") {
      const utmSuffix = `\n[Fuente: Google | Campaña: ${utmCampaign || "—"} | Keyword: ${utmTerm || "—"}]`;
      setFinalMessage(message + utmSuffix);
    }
  }, [message]);

  const encodedMessage = encodeURIComponent(finalMessage);
  const whatsappUrl = `https://wa.me/${phone}${finalMessage ? `?text=${encodedMessage}` : ""}`;

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
