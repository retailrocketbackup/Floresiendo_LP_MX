"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  Mail,
  MessageCircle,
  Navigation,
} from "lucide-react";
import { trackEvent } from "@/lib/meta-tracking";

const VENUE_ADDRESS = "Filadelfia 128, piso 3, Colonia Nápoles, CDMX";
const GOOGLE_MAPS_URL = "https://maps.google.com/?q=Filadelfia+128+Colonia+Napoles+CDMX";
const CONFERENCE_DATE = "Miércoles 11 de Febrero 2026";
const CONFERENCE_TIME = "7:00 PM (hora Ciudad de México)";

// Google Calendar link generator
function generateGoogleCalendarLink() {
  const title = encodeURIComponent(
    "Conferencia: Cuando tu vida se ve perfecta pero se siente vacía"
  );
  const details = encodeURIComponent(
    `Conferencia presencial gratuita con Ramón Henríquez.\n\nDirección: ${VENUE_ADDRESS}\n\nUna conversación honesta sobre el vacío que el éxito no llena.\n\nTe recomendamos llegar 10-15 minutos antes.`
  );
  const location = encodeURIComponent(VENUE_ADDRESS);
  // February 11, 2026, 7:00 PM - 8:30 PM Mexico City (UTC-6)
  const startDate = "20260212T010000Z"; // UTC time
  const endDate = "20260212T023000Z";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startDate}/${endDate}`;
}

// Outlook/Office 365 calendar link
function generateOutlookCalendarLink() {
  const title = encodeURIComponent(
    "Conferencia: Cuando tu vida se ve perfecta pero se siente vacía"
  );
  const details = encodeURIComponent(
    `Conferencia presencial gratuita con Ramón Henríquez.\n\nDirección: ${VENUE_ADDRESS}\n\nTe recomendamos llegar 10-15 minutos antes.`
  );
  const startDate = "2026-02-11T19:00:00";
  const endDate = "2026-02-11T20:30:00";

  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&body=${details}&startdt=${startDate}&enddt=${endDate}&path=/calendar/action/compose&location=${encodeURIComponent(VENUE_ADDRESS)}`;
}

export default function GraciasPage() {
  useEffect(() => {
    // Track thank you page view
    trackEvent(
      "ViewContent",
      {
        funnel: "conferencia_vida_perfecta",
        content_type: "thank_you_page",
        content_name: "conferencia_vida_perfecta_gracias",
      },
      { enableCAPI: false }
    );
  }, []);

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
            Te esperamos el 11 de febrero para una conversación diferente.
          </p>
        </div>

        {/* Conference Details Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Detalles de la conferencia
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 p-4 bg-[#fdf8f4] rounded-xl">
              <Calendar className="w-6 h-6 text-[#8b2a4a]" />
              <div>
                <p className="font-semibold text-gray-900">{CONFERENCE_DATE}</p>
                <p className="text-sm text-gray-600">Marca tu calendario</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#fdf8f4] rounded-xl">
              <Clock className="w-6 h-6 text-[#8b2a4a]" />
              <div>
                <p className="font-semibold text-gray-900">{CONFERENCE_TIME}</p>
                <p className="text-sm text-gray-600">Duración: 1 hora</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#fdf8f4] rounded-xl">
              <MapPin className="w-6 h-6 text-[#8b2a4a]" />
              <div>
                <p className="font-semibold text-gray-900">Evento presencial</p>
                <p className="text-sm text-gray-600">
                  Solo 60 lugares disponibles. Te recomendamos llegar 10-15 min antes.
                </p>
              </div>
            </div>
          </div>

          {/* Venue Location */}
          <div className="bg-[#8b2a4a] rounded-xl p-6 text-center">
            <p className="text-white/80 text-sm mb-3">Dirección:</p>
            <p className="text-white font-semibold text-lg mb-4">{VENUE_ADDRESS}</p>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#8b2a4a] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Navigation className="w-5 h-5" />
              Ver en Google Maps
            </a>
            <p className="text-white/60 text-xs mt-3">
              Col. Nápoles, cerca del metro Insurgentes Sur
            </p>
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

        {/* What to Expect */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            ¿Qué sigue ahora?
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#8b2a4a]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail className="w-3 h-3 text-[#8b2a4a]" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Revisa tu correo</p>
                <p className="text-sm text-gray-600">
                  Recibirás un email de confirmación con todos los detalles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#8b2a4a]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <MessageCircle className="w-3 h-3 text-[#8b2a4a]" />
              </div>
              <div>
                <p className="font-medium text-gray-900">WhatsApp</p>
                <p className="text-sm text-gray-600">
                  Ramón te enviará un mensaje personal de bienvenida y
                  recordatorios.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#8b2a4a]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-3 h-3 text-[#8b2a4a]" />
              </div>
              <div>
                <p className="font-medium text-gray-900">El día del evento</p>
                <p className="text-sm text-gray-600">
                  Llega 10-15 minutos antes. Busca el piso 3 en Filadelfia 128.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="text-center p-6 bg-[#fdf8f4] rounded-2xl">
          <p className="text-gray-700 mb-2">
            ¿Conoces a alguien que necesite escuchar esto?
          </p>
          <p className="text-sm text-gray-500">
            Comparte esta conferencia con quien creas que le puede servir.
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
