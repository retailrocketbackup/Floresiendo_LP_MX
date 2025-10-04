// components/contact-section-call.tsx
"use client"; // <--- ESTA ES LA LÍNEA MÁS IMPORTANTE

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getFbp, getFbclid } from "@/lib/meta-tracking";

interface ContactSectionCallProps {
  funnel: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export function ContactSectionCall({
  funnel,
  title = "¿Listo para tu Transformación?",
  subtitle = "Agenda una llamada gratuita y conecta con nosotros para comenzar tu viaje de sanación y crecimiento personal.",
  buttonText = "Agendar Llamada",
}: ContactSectionCallProps) {
  // El enlace original se construye con el "funnel"
  const originalLink = `/agendar-llamada-${funnel}`;
  // Estado para guardar el enlace final y enriquecido
  const [finalLink, setFinalLink] = useState(originalLink);

  useEffect(() => {
    // Lógica para capturar datos y enriquecer el enlace
    const fbp = getFbp();
    const fbclid = getFbclid();
    const url = new URL(originalLink, window.location.origin);

    if (fbp) url.searchParams.set('fbp', fbp);
    if (fbclid) url.searchParams.set('fbclid', fbclid);

    setFinalLink(url.pathname + url.search);
  }, [originalLink]);

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
          {/* Usamos el enlace final y enriquecido */}
          <Link href={finalLink} passHref>
            <Button
              size="lg"
              className="w-80 py-6 text-xl rounded-full text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: "#5A2D5A" }}
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
