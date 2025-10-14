// components/calendly-widget.tsx
"use client";

import { useEffect } from "react";
import { getFbp, getFbclid, trackEvent } from "@/lib/meta-tracking";
import { cn } from "@/lib/utils"; // <-- Importamos nuestra utilidad de estilos

declare global {
  interface Window {
    Calendly?: any;
  }
}

interface CalendlyWidgetProps {
  funnel?: string;
  eventName?: string;
  url: string;
  className?: string; // <-- AÑADIDO: Ahora el componente puede recibir una clase
}

export function CalendlyWidget({
  funnel = "unknown",
  eventName,
  url,
  className, // <-- AÑADIDO: Recibimos la nueva propiedad
}: CalendlyWidgetProps) {
  useEffect(() => {
    if (document.querySelector("script[src='https://assets.calendly.com/assets/external/widget.js']")) {
      // Si el script ya está, solo reiniciamos el widget
      const widgetDiv = document.getElementById("calendly-widget-container");
      if (widgetDiv && window.Calendly) {
        widgetDiv.innerHTML = ""; // Limpiamos el contenedor por si acaso
        window.Calendly.initInlineWidget({
          url: url,
          parentElement: widgetDiv,
        });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    script.onload = () => {
      const fbp = getFbp();
      const fbclid = getFbclid();
      const finalUrl = new URL(url);
      if (fbp) finalUrl.searchParams.set("utm_source", fbp);
      if (fbclid) finalUrl.searchParams.set("utm_medium", fbclid);

      const widgetDiv = document.getElementById("calendly-widget-container");
      
      if (widgetDiv && window.Calendly) {
        window.Calendly.initInlineWidget({
          url: finalUrl.toString(),
          parentElement: widgetDiv,
        });
      }
    };

    document.head.appendChild(script);

    const handleCalendlyEvent = (event: MessageEvent) => {
      if (event.data.event === "calendly.event_scheduled") {
        let finalEventName: string;
        if (eventName) {
          finalEventName = eventName;
        } else {
          finalEventName = funnel.includes("video")
            ? "Schedule_Video"
            : "Schedule_Testimonios";
        }
        console.log(`[Calendly Widget] Tracking Meta event: ${finalEventName}`);
        trackEvent(finalEventName, {
          funnel,
          content_type: "calendly_booking",
        });
      }
    };

    window.addEventListener("message", handleCalendlyEvent);

    return () => {
      window.removeEventListener("message", handleCalendlyEvent);
    };
  }, [funnel, eventName, url]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* CAMBIO CLAVE: Aplicamos la clase que viene de afuera al contenedor del widget */}
      <div className={cn("bg-white rounded-lg shadow-lg overflow-hidden", className)}>
        <div
          id="calendly-widget-container"
          style={{ minWidth: "320px", height: "700px" }}
        ></div>
      </div>
    </div>
  );
}