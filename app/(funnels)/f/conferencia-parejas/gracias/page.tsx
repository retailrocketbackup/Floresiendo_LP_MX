"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  MessageCircle,
  Navigation,
  Sparkles,
} from "lucide-react";
import { trackEvent } from "@/lib/meta-tracking";

const VENUE_ADDRESS = "Filadelfia 128, piso 3, Colonia Nápoles, CDMX";
const GOOGLE_MAPS_URL =
  "https://maps.google.com/?q=Filadelfia+128+Colonia+Napoles+CDMX";
const CONFERENCE_DATE = "Domingo 19 de Abril 2026";
const CONFERENCE_TIME = "4:00 PM (hora Ciudad de México)";

// Google Calendar link
function generateGoogleCalendarLink() {
  const title = encodeURIComponent(
    "Conferencia: Relaciones de Pareja - FloreSiendo"
  );
  const details = encodeURIComponent(
    `Conferencia presencial gratuita sobre relaciones de pareja.\n\nDirección: ${VENUE_ADDRESS}\n\nBasada en la ciencia de John Gottman y Esther Perel.\n\nTe recomendamos llegar 10-15 minutos antes.`
  );
  const location = encodeURIComponent(VENUE_ADDRESS);
  // April 19, 2026, 4:00 PM - 6:00 PM Mexico City (UTC-6) = Apr 19, 10:00 PM - Apr 20, 12:00 AM UTC
  const startDate = "20260419T220000Z";
  const endDate = "20260420T000000Z";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startDate}/${endDate}`;
}

// Outlook calendar link
function generateOutlookCalendarLink() {
  const title = encodeURIComponent(
    "Conferencia: Relaciones de Pareja - FloreSiendo"
  );
  const details = encodeURIComponent(
    `Conferencia presencial gratuita sobre relaciones de pareja.\n\nDirección: ${VENUE_ADDRESS}\n\nTe recomendamos llegar 10-15 minutos antes.`
  );
  const startDate = "2026-04-19T16:00:00";
  const endDate = "2026-04-19T18:00:00";

  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&body=${details}&startdt=${startDate}&enddt=${endDate}&path=/calendar/action/compose&location=${encodeURIComponent(VENUE_ADDRESS)}`;
}

export default function ConferenciaParejasGraciasPage() {
  useEffect(() => {
    trackEvent(
      "ViewContent_Conferencia_Parejas_Gracias",
      {
        funnel: "conferencia_parejas",
        content_type: "thank_you_page",
        content_name: "conferencia_parejas_gracias",
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
            Te esperamos el 19 de abril para una experiencia que puede
            transformar tu relación.
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
                <p className="text-sm text-gray-600">Duración: 2 horas</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#fdf8f4] rounded-xl">
              <MapPin className="w-6 h-6 text-[#8b2a4a]" />
              <div>
                <p className="font-semibold text-gray-900">Evento presencial</p>
                <p className="text-sm text-gray-600">
                  Solo 60 lugares. Te recomendamos llegar 10-15 min antes.
                </p>
              </div>
            </div>
          </div>

          {/* Venue Location */}
          <div className="bg-[#8b2a4a] rounded-xl p-6 text-center">
            <p className="text-white/80 text-sm mb-3">Dirección:</p>
            <p className="text-white font-semibold text-lg mb-4">
              {VENUE_ADDRESS}
            </p>
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

        {/* What's Next */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            ¿Qué sigue ahora?
          </h3>
          <div className="space-y-4">
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
                  Puedes asistir solo/a o en pareja.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tease Retreat */}
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
                Del <strong>30 de abril al 3 de mayo</strong> tenemos un{" "}
                <strong>Encuentro de Transformacion en Morelos</strong>. 3 noches
                de inmersión profunda para quienes quieren llevar su proceso al
                siguiente nivel.
              </p>
              <Link
                href="/encuentros/abril-2026"
                className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium text-sm mt-2 transition-colors"
              >
                Conocer el retiro de abril &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Share */}
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
            Volver al inicio &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
