"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  message?: string;
}

export function FloatingWhatsApp({
  phoneNumber = "526182301481",
  message = "Hola, me gustaría saber más sobre los encuentros de FloreSiendo México",
}: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Show button after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Show tooltip after 8 seconds if user hasn't interacted
  useEffect(() => {
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  const handleClick = () => {
    setHasInteracted(true);
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setHasInteracted(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip/Bubble */}
      <div
        className={`transform transition-all duration-300 ${
          isOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-4 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-[280px] relative border border-warm-gray-100">
          <button
            onClick={handleClose}
            className="absolute -top-2 -right-2 w-6 h-6 bg-warm-gray-200 hover:bg-warm-gray-300 rounded-full flex items-center justify-center transition-colors"
            aria-label="Cerrar"
          >
            <X size={14} className="text-warm-gray-600" />
          </button>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              <Image
                src="/images/whatsapp-icon.webp"
                alt="WhatsApp"
                width={40}
                height={40}
              />
            </div>
            <div>
              <p className="font-semibold text-warm-gray-800 text-sm">
                ¿Tienes preguntas?
              </p>
              <p className="text-warm-gray-600 text-sm mt-1">
                Escríbenos por WhatsApp y te responderemos a la brevedad.
              </p>
            </div>
          </div>
          {/* Arrow */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-warm-gray-100 transform rotate-45" />
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="relative">
        <button
          onClick={handleClick}
          onMouseEnter={() => !hasInteracted && setIsOpen(true)}
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

        {/* Notification dot - outside button to avoid overflow-hidden clipping */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-coral rounded-full border-2 border-white flex items-center justify-center z-20 pointer-events-none">
          <span className="text-[10px] text-white font-bold">1</span>
        </span>
      </div>
    </div>
  );
}
