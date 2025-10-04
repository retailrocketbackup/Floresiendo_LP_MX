// components/calendly-widget.tsx
"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { trackEvent } from "@/lib/meta-tracking";

interface CalendlyWidgetProps {
  funnel?: string;
}

export function CalendlyWidget({ funnel = "unknown" }: CalendlyWidgetProps) {
  const searchParams = useSearchParams();
  const [calendlyUrl, setCalendlyUrl] = useState("https://calendly.com/ramonhenriquez/15min");

  useEffect(() => {
    // Leemos los datos que vienen en la URL
    const fbp = searchParams.get('fbp');
    const fbclid = searchParams.get('fbclid');

    const url = new URL(calendlyUrl);

    // Los inyectamos como parámetros UTM en la URL de Calendly
    if (fbp) url.searchParams.set('utm_source', fbp);
    if (fbclid) url.searchParams.set('utm_medium', fbclid);

    setCalendlyUrl(url.toString());

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    const handleCalendlyEvent = (event: MessageEvent) => {
      if (event.data.event === "calendly.event_scheduled") {
        const eventName = funnel.includes("video") ? "Schedule_Video" : "Schedule_Testimonios";
        // Llamamos a trackEvent SIN enableCAPI: true.
        // El webhook del servidor se encargará del evento de servidor.
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
  }, [funnel, searchParams, calendlyUrl]);

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
