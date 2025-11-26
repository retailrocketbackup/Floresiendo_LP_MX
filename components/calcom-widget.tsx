// components/calcom-widget.tsx
"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/meta-tracking";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    Cal?: any;
  }
}

interface CalcomWidgetProps {
  calLink: string; // e.g., "ramonhenriquez/meditacion-gratuita"
  funnel?: string;
  eventName?: string;
  className?: string;
}

export function CalcomWidget({
  calLink,
  funnel = "meditacion",
  eventName = "Schedule_Meditation",
  className,
}: CalcomWidgetProps) {
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;

    script.onload = () => {
      if (window.Cal) {
        // Initialize Cal.com inline embed
        window.Cal("init", { origin: "https://app.cal.com" });

        window.Cal("inline", {
          elementOrSelector: "#cal-inline-container",
          calLink: calLink,
          config: {
            layout: "month_view",
            theme: "light",
          },
        });

        // Listen for booking success
        window.Cal("on", {
          action: "bookingSuccessful",
          callback: () => {
            console.log(`[Cal.com Widget] Tracking Meta event: ${eventName}`);
            trackEvent(eventName, {
              funnel,
              content_type: "calcom_booking",
            });
          },
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        'script[src="https://app.cal.com/embed/embed.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [calLink, funnel, eventName]);

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

        <div
          className={cn(
            "bg-white rounded-2xl shadow-lg overflow-hidden border border-[#f78080]/10",
            className
          )}
        >
          <div
            id="cal-inline-container"
            style={{ width: "100%", height: "700px", overflow: "auto" }}
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
