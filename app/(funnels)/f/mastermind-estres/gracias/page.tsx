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
  Sparkles,
} from "lucide-react";
import { trackEvent } from "@/lib/meta-tracking";

const MEET_URL = "https://meet.google.com/vom-orye-woa";
const EVENT_DATE = "Miércoles 19 de Marzo 2026";
const EVENT_TIME = "8:00 PM (hora Ciudad de México)";
const EVENT_DURATION = "60 minutos";

// Google Calendar link
function generateGoogleCalendarLink() {
  const title = encodeURIComponent(
    "Mastermind: Estrés Laboral y Burnout - FloreSiendo"
  );
  const details = encodeURIComponent(
    `Mastermind interactivo gratuito sobre estrés laboral.\n\nEnlace de Google Meet: ${MEET_URL}\n\nDuración: ${EVENT_DURATION}.\n\nTe recomendamos conectarte 5 minutos antes para probar tu audio.`
  );
  // March 19, 2026, 8:00 PM - 9:00 PM Mexico City (UTC-6) = Mar 20, 2:00 AM - 3:00 AM UTC
  const startDate = "20260320T020000Z";
  const endDate = "20260320T030000Z";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startDate}/${endDate}`;
}

// Outlook calendar link
function generateOutlookCalendarLink() {
  const title = encodeURIComponent(
    "Mastermind: Estrés Laboral y Burnout - FloreSiendo"
  );
  const details = encodeURIComponent(
    `Mastermind interactivo gratuito sobre estrés laboral.\n\nEnlace de Google Meet: ${MEET_URL}\n\nTe recomendamos conectarte 5 minutos antes.`
  );
  const startDate = "2026-03-19T20:00:00";
  const endDate = "2026-03-19T21:00:00";

  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&body=${details}&startdt=${startDate}&enddt=${endDate}&path=/calendar/action/compose`;
}

export default function MastermindGraciasPage() {
  useEffect(() => {
    trackEvent(
      "ViewContent_Mastermind_Gracias",
      {
        funnel: "mastermind-estres",
        content_type: "thank_you_page",
        content_name: "mastermind_estres_gracias",
      },
      { enableCAPI: true }
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¡Tu lugar está reservado!
          </h1>
          <p className="text-xl text-gray-600">
            Te esperamos el 19 de marzo para el Mastermind.
          </p>
        </div>

        {/* Event Details Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Detalles de la sesión
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
              <Calendar className="w-6 h-6 text-orange-600" />
              <div>
                <p className="font-semibold text-gray-900">{EVENT_DATE}</p>
                <p className="text-sm text-gray-600">Marca tu calendario</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
              <Clock className="w-6 h-6 text-orange-600" />
              <div>
                <p className="font-semibold text-gray-900">{EVENT_TIME}</p>
                <p className="text-sm text-gray-600">
                  Duración: {EVENT_DURATION}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
              <Video className="w-6 h-6 text-orange-600" />
              <div>
                <p className="font-semibold text-gray-900">
                  Sesión interactiva vía Google Meet
                </p>
                <p className="text-sm text-gray-600">
                  Cámara opcional pero recomendada para conectar mejor.
                </p>
              </div>
            </div>
          </div>

          {/* Google Meet Link */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-center">
            <p className="text-white/80 text-sm mb-3">
              Enlace de Google Meet:
            </p>
            <a
              href={MEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Abrir Google Meet
            </a>
            <button
              onClick={handleCopyMeetLink}
              className="mt-2 inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors py-3 px-4"
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
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <Calendar className="w-4 h-4" />
              Google Calendar
            </a>
            <a
              href={generateOutlookCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
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
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <ExternalLink className="w-3 h-3 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Guarda el enlace de Google Meet
                </p>
                <p className="text-sm text-gray-600">
                  Cópialo o agrega la sesión a tu calendario para tenerlo a la
                  mano.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Calendar className="w-3 h-3 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Agrega al calendario
                </p>
                <p className="text-sm text-gray-600">
                  Para que no se te pase. Usa los botones de arriba.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-3 h-3 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Llega 5 minutos antes
                </p>
                <p className="text-sm text-gray-600">
                  Para probar tu audio y video, y estar listo/a cuando
                  comencemos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tease Next Event — Meditation Apr 3 */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-purple-900 mb-1">
                También te puede interesar
              </h3>
              <p className="text-purple-800 text-sm leading-relaxed">
                El <strong>jueves 3 de abril</strong> tenemos una{" "}
                <strong>meditación guiada gratuita en vivo</strong>. 30 minutos
                para calmar tu mente y reconectar contigo. Es el complemento
                perfecto después del Mastermind.
              </p>
              <Link
                href="/f/meditacion-gratis"
                className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium text-sm mt-2 transition-colors"
              >
                Reservar lugar en la meditación →
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-700 transition-colors text-sm py-3 inline-block"
          >
            Volver al inicio →
          </Link>
        </div>
      </div>
    </main>
  );
}
