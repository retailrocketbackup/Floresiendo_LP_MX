// components/screening/WelcomeScreen.tsx
"use client";

import Image from "next/image";

interface WelcomeScreenProps {
  selectedPackage: string | null;
  onStart: () => void;
}

const PACKAGE_INFO: Record<string, { name: string; price: string; nights: string }> = {
  DEPOSIT: { name: "Anticipo", price: "$3,000 MXN", nights: "" },
  TWO_NIGHTS_EARLY: { name: "Retiro 2 Noches", price: "$7,100 MXN", nights: "2 noches" },
  THREE_NIGHTS_EARLY: { name: "Retiro 3 Noches", price: "$10,200 MXN", nights: "3 noches" },
};

export function WelcomeScreen({ selectedPackage, onStart }: WelcomeScreenProps) {
  const packageInfo = selectedPackage ? PACKAGE_INFO[selectedPackage] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--burgundy)] via-[var(--burgundy-dark)] to-[var(--warm-gray-900)]">
      {/* Hero Section */}
      <div className="relative pt-12 pb-8 px-4">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--coral)]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--burgundy)]/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--coral)]/30 rounded-full blur-xl scale-150" />
              <Image
                src="/floresiendo-logo-boton.webp"
                alt="FloreSiendo Logo"
                width={100}
                height={100}
                className="relative rounded-full shadow-2xl ring-4 ring-white/20"
              />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Tu Transformación Comienza Aquí
          </h1>
          <p className="text-lg text-white/80 mb-6">
            Encuentro de Febrero 2026 · Morelos, México
          </p>

          {/* Selected Package Badge */}
          {packageInfo && (
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 mb-8">
              <span className="text-[var(--gold)] font-semibold">{packageInfo.name}</span>
              <span className="text-white/60">•</span>
              <span className="text-white font-bold">{packageInfo.price}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            {/* Preamble of Care */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-[var(--burgundy)] mb-4">
                Tu Proceso de Sanación Comienza Aquí
              </h2>

              {/* Care Statement - NOT a waiver */}
              <div className="bg-[var(--coral-light)]/30 border border-[var(--coral)]/30 rounded-xl p-5 mb-4 text-left">
                <p className="text-[var(--burgundy-dark)] leading-relaxed">
                  <span className="text-xl mr-2">🌸</span>
                  <strong>Este formulario no es un examen.</strong> Es nuestra herramienta principal para
                  conocerte y cuidarte. Tu honestidad nos permite crear un espacio seguro diseñado
                  especialmente para ti.
                </p>
                <p className="text-[var(--warm-gray-600)] text-sm mt-3">
                  Toda tu información está protegida y es tratada con absoluta confidencialidad.
                </p>
              </div>
            </div>

            {/* What to expect */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-[var(--warm-gray-50)] rounded-xl">
                <div className="w-10 h-10 bg-[var(--coral)]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-[var(--coral)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-[var(--warm-gray-700)]">5-10 minutos</p>
                <p className="text-xs text-[var(--warm-gray-500)]">Tiempo estimado</p>
              </div>

              <div className="text-center p-4 bg-[var(--warm-gray-50)] rounded-xl">
                <div className="w-10 h-10 bg-[var(--coral)]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-[var(--coral)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-[var(--warm-gray-700)]">7 secciones</p>
                <p className="text-xs text-[var(--warm-gray-500)]">Progreso guardado</p>
              </div>

              <div className="text-center p-4 bg-[var(--warm-gray-50)] rounded-xl">
                <div className="w-10 h-10 bg-[var(--coral)]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-[var(--coral)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-[var(--warm-gray-700)]">100% privado</p>
                <p className="text-xs text-[var(--warm-gray-500)]">Datos protegidos</p>
              </div>
            </div>

            {/* Requirements Preview */}
            <div className="bg-[var(--warm-gray-50)] rounded-xl p-5 mb-8">
              <h3 className="font-semibold text-[var(--burgundy)] mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[var(--coral)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Requisitos para participar
              </h3>
              <ul className="space-y-2 text-sm text-[var(--warm-gray-600)]">
                <li className="flex items-start">
                  <span className="text-[var(--coral)] mr-2">•</span>
                  Mayor de 18 años
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--coral)] mr-2">•</span>
                  Disposición para seguir dieta preparatoria de 7 días
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--coral)] mr-2">•</span>
                  Sin contraindicaciones médicas severas
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--coral)] mr-2">•</span>
                  Apertura para una experiencia de crecimiento personal
                </li>
              </ul>
            </div>

            {/* Spots indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--coral)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--coral)]"></span>
              </span>
              <span className="text-sm font-medium text-[var(--warm-gray-700)]">
                Solo 15 lugares disponibles
              </span>
            </div>

            {/* CTA Button */}
            <button
              onClick={onStart}
              className="w-full py-4 bg-[var(--coral)] hover:bg-[var(--coral-dark)] text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--coral)]/30"
            >
              Comenzar mi Solicitud
            </button>

            {/* Trust note */}
            <p className="text-center text-xs text-[var(--warm-gray-500)] mt-4">
              Tu información está protegida bajo la LFPDPPP.
              <br />
              <a href="/politica-privacidad" className="text-[var(--coral)] hover:underline">
                Consulta nuestra Política de Privacidad
              </a>
            </p>
          </div>

          {/* Questions? */}
          <div className="text-center mt-6">
            <p className="text-white/60 text-sm mb-2">
              ¿Tienes dudas antes de comenzar?
            </p>
            <a
              href="https://wa.me/5214427845308?text=Hola%20Ramón,%20tengo%20dudas%20sobre%20el%20cuestionario%20de%20elegibilidad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-[var(--coral)] transition-colors"
            >
              <Image
                src="/whatsapp-icon.webp"
                alt="WhatsApp"
                width={20}
                height={20}
              />
              <span className="text-sm font-medium">Escríbenos por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
