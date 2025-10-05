// components/calendly-widget.tsx
"use client"

import { useEffect, useState } from "react";
import { getFbp, getFbclid } from "@/lib/meta-tracking"; // <-- Importamos las funciones
import { trackEvent } from "@/lib/meta-tracking";

interface CalendlyWidgetProps {
  funnel?: string;
}

export function CalendlyWidget({ funnel = "unknown" }: CalendlyWidgetProps) {
  const [calendlyUrl, setCalendlyUrl] = useState("https://calendly.com/ramonhenriquez/15min");

  useEffect(() => {
    // Ahora captura las cookies directamente aquí, en lugar de leerlas de la URL
    const fbp = getFbp();
    const fbclid = getFbclid();

    const url = new URL(calendlyUrl);

    if (fbp) url.searchParams.set('utm_source', fbp);
    if (fbclid) url.searchParams.set('utm_medium', fbclid);

    setCalendlyUrl(url.toString());

    // El resto de la lógica para cargar el script y escuchar eventos se mantiene igual
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    const handleCalendlyEvent = (event: MessageEvent) => {
      if (event.data.event === "calendly.event_scheduled") {
        const eventName = funnel.includes("video") ? "Schedule_Video" : "Schedule_Testimonios";
        trackEvent(eventName, { funnel });
      }
    };

    window.addEventListener("message", handleCalendlyEvent);

    return () => {
      window.removeEventListener("message", handleCalendlyEvent);
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [funnel, calendlyUrl]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div
          className="calendly-inline-widget"
          data-url={calendlyUrl}
          style={{ minWidth: "320px", height: "700px" }}
        ></div>
      </div>
    </div>
  );
}
