// components/calcom-widget.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Cal.com type declaration
declare global {
  interface Window {
    Cal?: (action: string, ...args: unknown[]) => void;
  }
}

interface CalcomWidgetProps {
  calLink: string; // e.g., "floresiendomexico/meditacion-guiada"
  funnel?: string;
  eventName?: string;
  className?: string;
}

export function CalcomWidget({
  calLink,
  className,
}: CalcomWidgetProps) {
  const calRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    script.onload = () => {
      // Initialize Cal after script loads
      if (window.Cal) {
        window.Cal("init", { origin: "https://cal.com" });
        window.Cal("inline", {
          elementOrSelector: "#cal-inline-container",
          calLink: calLink,
          layout: "month_view",
          config: {
            theme: "light",
          },
        });

        // Hide loading after a short delay for Cal to render
        setTimeout(() => setIsLoading(false), 1000);
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [calLink]);

  return (
    <section id="registro" className={cn("py-16 sm:py-20 px-4", className)}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-[#f78080] font-semibold mb-2 uppercase tracking-wide text-sm">
            Reserva tu lugar
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b2a4a] mb-4">
            Elige tu Horario
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecciona el día y hora que mejor funcione para ti. Recibirás un
            correo de confirmación con el enlace de Zoom.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#f78080]/10 relative">
          {/* Loading state */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b2a4a] mx-auto mb-4"></div>
                <p className="text-gray-500">Cargando calendario...</p>
              </div>
            </div>
          )}

          {/* Cal.com inline embed */}
          <div
            id="cal-inline-container"
            ref={calRef}
            style={{ minHeight: "700px", width: "100%" }}
          />
        </div>

        {/* Trust indicators below calendar */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-[#d4a853]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>100% Gratis</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-[#d4a853]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Sin compromiso</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-[#d4a853]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Confirmación por email</span>
          </div>
        </div>
      </div>
    </section>
  );
}
