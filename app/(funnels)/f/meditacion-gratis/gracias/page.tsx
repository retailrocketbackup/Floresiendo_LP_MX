"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CheckCircle,
  Video,
  Copy,
  ExternalLink,
} from "lucide-react";
import { trackEvent } from "@/lib/meta-tracking";

const MEET_URL = "https://meet.google.com/vom-orye-woa";
const EVENT_DATE = "Lunes 17 de Febrero 2026";
const EVENT_TIME = "8:00 PM (hora Ciudad de México)";

// Google Calendar link generator
function generateGoogleCalendarLink() {
  const title = encodeURIComponent(
    "Meditación Guiada en Vivo - FloreSiendo"
  );
  const details = encodeURIComponent(
    `Meditación guiada gratuita con Ramón Henríquez.\n\nEnlace de Google Meet: ${MEET_URL}\n\nDuración: 30 minutos.\n\nTe recomendamos conectarte 5 minutos antes para probar tu audio.`
  );
  // February 17, 2026, 8:00 PM - 8:30 PM Mexico City (UTC-6) = Feb 18, 2:00 AM - 2:30 AM UTC
  const startDate = "20260218T020000Z";
  const endDate = "20260218T023000Z";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startDate}/${endDate}`;
}

// Outlook/Office 365 calendar link
function generateOutlookCalendarLink() {
  const title = encodeURIComponent(
    "Meditación Guiada en Vivo - FloreSiendo"
  );
  const details = encodeURIComponent(
    `Meditación guiada gratuita con Ramón Henríquez.\n\nEnlace de Google Meet: ${MEET_URL}\n\nTe recomendamos conectarte 5 minutos antes.`
  );
  const startDate = "2026-02-17T20:00:00";
  const endDate = "2026-02-17T20:30:00";

  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&body=${details}&startdt=${startDate}&enddt=${endDate}&path=/calendar/action/compose`;
}

export default function MeditacionGraciasPage() {
  useEffect(() => {
    trackEvent(
      "ViewContent",
      {
        funnel: "meditacion_gratis",
        content_type: "thank_you_page",
        content_name: "meditacion_gratis_gracias",
      },
      { enableCAPI: false }
    );
  }, []);

  const handleCopyMeetLink = () => {
    navigator.clipboard.writeText(MEET_URL);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fdf8f4] to-white">
      <div className="max-w-2xl mx-auto px-4 py-16 md:py-24">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#8b2a4a] mb-4">
            ¡Tu lugar está reservado!
          </h1>
          <p className="text-xl text-gray-600">
            Te esperamos el 17 de febrero para meditar juntos.
          </p>
        </div>

        {/* Event Details Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Detalles del evento
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 p-4 bg-[#fdf8f4] rounded-xl">
              <Calendar className="w-6 h-6 text-[#8b2a4a]" />
              <div>
                <p className="font-semibold text-gray-900">{EVENT_DATE}</p>
                <p className="text-sm text-gray-600">Marca tu calendario</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#fdf8f4] rounded-xl">
              <Clock className="w-6 h-6 text-[#8b2a4a]" />
              <div>
                <p className="font-semibold text-gray-900">{EVENT_TIME}</p>
                <p className="text-sm text-gray-600">Duración: 30 minutos</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#fdf8f4] rounded-xl">
              <Video className="w-6 h-6 text-[#8b2a4a]" />
              <div>
                <p className="font-semibold text-gray-900">Evento en línea vía Google Meet</p>
                <p className="text-sm text-gray-600">
                  Conéctate desde cualquier lugar con internet.
                </p>
              </div>
            </div>
          </div>

          {/* Google Meet Link */}
          <div className="bg-[#8b2a4a] rounded-xl p-6 text-center">
            <p className="text-white/80 text-sm mb-3">Enlace de Google Meet:</p>
            <a
              href={MEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#8b2a4a] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Abrir Google Meet
            </a>
            <button
              onClick={handleCopyMeetLink}
              className="mt-3 inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copiar enlace
            </button>
          </div>
        </div>

        {/* Add to Calendar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
            Agregar a tu calendario
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={generateGoogleCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <Calendar className="w-4 h-4" />
              Google Calendar
            </a>
            <a
              href={generateOutlookCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <Calendar className="w-4 h-4" />
              Outlook
            </a>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            ¿Qué sigue ahora?
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#8b2a4a]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <ExternalLink className="w-3 h-3 text-[#8b2a4a]" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Guarda el enlace de Google Meet</p>
                <p className="text-sm text-gray-600">
                  Cópialo o agréga la sesión a tu calendario para tenerlo a la mano.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#8b2a4a]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Calendar className="w-3 h-3 text-[#8b2a4a]" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Agrega al calendario</p>
                <p className="text-sm text-gray-600">
                  Para que no se te pase. Usa los botones de arriba.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#8b2a4a]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-3 h-3 text-[#8b2a4a]" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Llega 5 minutos antes</p>
                <p className="text-sm text-gray-600">
                  Para probar tu audio y video, y estar listo/a cuando comencemos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="text-center p-6 bg-[#fdf8f4] rounded-2xl">
          <p className="text-gray-700 mb-2">
            ¿Conoces a alguien que necesite un momento de calma?
          </p>
          <p className="text-sm text-gray-500">
            Comparte esta meditación con quien creas que le puede servir.
          </p>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-[#8b2a4a] hover:text-[#722240] transition-colors text-sm"
          >
            Volver al inicio →
          </Link>
        </div>
      </div>
    </main>
  );
}
