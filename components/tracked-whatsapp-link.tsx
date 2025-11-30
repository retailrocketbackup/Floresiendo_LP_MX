"use client";

import { trackWhatsAppLead, type WhatsAppLeadData } from "@/lib/meta-tracking";

interface TrackedWhatsAppLinkProps {
  phone: string;
  message?: string;
  page: WhatsAppLeadData["page"];
  buttonLocation: WhatsAppLeadData["buttonLocation"];
  encuentroSlug?: string;
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
  value,
  currency = "MXN",
  children,
  className,
}: TrackedWhatsAppLinkProps) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}${message ? `?text=${encodedMessage}` : ""}`;

  const handleClick = () => {
    trackWhatsAppLead({
      page,
      buttonLocation,
      encuentroSlug,
      value,
      currency,
    });
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
