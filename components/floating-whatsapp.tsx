"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  message?: string;
}

export function FloatingWhatsApp({
  phoneNumber = "526182301481",
  message = "Hola, me gustaría saber más sobre los encuentros de FloreSiendo México",
}: FloatingWhatsAppProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        className="group relative w-16 h-16 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 overflow-hidden"
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />

        {/* WhatsApp Icon Image */}
        <Image
          src="/images/whatsapp-icon.webp"
          alt="WhatsApp"
          width={64}
          height={64}
          className="relative z-10"
        />
      </button>
    </div>
  );
}
