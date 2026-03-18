"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { trackWhatsAppLead } from "@/lib/meta-tracking";

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  message?: string;
  page?: string;
  encuentroSlug?: string;
}

export function FloatingWhatsApp({
  phoneNumber = "526182301481",
  message,
  page = "general",
  encuentroSlug,
}: FloatingWhatsAppProps) {
  const locale = useLocale();
  const defaultMessage = locale === "en"
    ? "Hi, I'd like to learn more about FloreSiendo retreats in Mexico"
    : "Hola, me gustar\u00eda saber m\u00e1s sobre los encuentros de FloreSiendo M\u00e9xico";
  const finalMessage = message || defaultMessage;
  const [isVisible, setIsVisible] = useState(false);

  // Show button after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    // Track WhatsApp click as Lead event
    trackWhatsAppLead({
      page: page,
      buttonLocation: "sticky",
      encuentroSlug: encuentroSlug,
      eventName: "Lead_WhatsApp_Sticky",
    });

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* WhatsApp Button - smaller on mobile to avoid blocking content */}
      <button
        onClick={handleClick}
        className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 overflow-hidden"
        aria-label={locale === "en" ? "Contact via WhatsApp" : "Contactar por WhatsApp"}
      >
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />

        {/* WhatsApp Icon Image */}
        <Image
          src="/images/whatsapp-icon.webp"
          alt="WhatsApp"
          width={64}
          height={64}
          className="relative z-10 w-14 h-14 sm:w-16 sm:h-16"
        />
      </button>
    </div>
  );
}
