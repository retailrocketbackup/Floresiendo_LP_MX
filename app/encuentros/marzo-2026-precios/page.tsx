'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image"
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from "@/lib/stripe-client"
import StripePaymentForm from "@/components/StripePaymentForm"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { trackEvent } from "@/lib/meta-tracking"
import { encuentroFebrero2026 } from "@/lib/encuentros-data"

type PaymentOption = {
  id: string;
  name: string;
  amount: number;
} | null;

// Package configuration mapping
const PACKAGE_CONFIG: Record<string, { id: string; name: string; amount: number }> = {
  DEPOSIT: { id: 'DEPOSIT', name: 'Anticipo - Encuentro Febrero 2026', amount: 300000 },
  TWO_NIGHTS_EARLY: { id: 'TWO_NIGHTS_EARLY', name: 'Retiro 2 Noches - Precio Especial', amount: 710000 },
  THREE_NIGHTS_EARLY: { id: 'THREE_NIGHTS_EARLY', name: 'Retiro 3 Noches - Precio Especial', amount: 1020000 },
};

export default function PreciosFebrero2026() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('applicationId');
  const autoOpenPayment = searchParams.get('autoOpenPayment') === 'true';
  const packageParam = searchParams.get('package');

  const [selectedPayment, setSelectedPayment] = useState<PaymentOption>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Track high-intent pricing page view with funnel-specific event
  useEffect(() => {
    trackEvent(
      "ViewContent_Precios",
      {
        funnel: "precios",
        content_type: "pricing",
        content_name: "febrero_2026_precios",
        content_category: "high_intent",
        value: 10200,
        currency: "MXN",
      },
      { enableCAPI: true }
    );
  }, []);

  // Auto-open payment modal when coming from approved application
  useEffect(() => {
    if (autoOpenPayment && applicationId && packageParam) {
      const packageConfig = PACKAGE_CONFIG[packageParam];
      if (packageConfig) {
        setSelectedPayment(packageConfig);
        setShowPaymentModal(true);
      }
    }
  }, [autoOpenPayment, applicationId, packageParam]);

  // If user has applicationId, they can proceed to payment directly
  // Otherwise, redirect to application form first
  const handlePackageSelect = (packageId: string, productName: string, amount: number) => {
    if (applicationId) {
      // User already completed application, open payment modal
      setSelectedPayment({ id: packageId, name: productName, amount });
      setShowPaymentModal(true);
    } else {
      // User needs to complete application first
      router.push(`/aplicar?package=${packageId}`);
    }
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedPayment(null);
  };

  return (
    <>
      {/* Site Header */}
      <SiteHeader />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp
        phoneNumber="524427845308"
        message="Hola Ramón, me interesa el Encuentro de Febrero 2026. ¿Podrías darme más información?"
        page="precios"
        encuentroSlug="febrero-2026"
      />

      <main className="min-h-screen bg-warm-white">
        {/* Hero Section - extends under header for transparent effect */}
        <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0">
            <Image
              src="/cosmic-spiritual-background.webp"
              alt="Fondo cósmico espiritual"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-burgundy/80 via-burgundy-dark/70 to-warm-white" />
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-coral/20 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-burgundy/30 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />

          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto py-20">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-coral/30 rounded-full blur-xl scale-150" />
                <Image
                  src="/floresiendo-logo-boton.webp"
                  alt="FloreSiendo Logo"
                  width={110}
                  height={110}
                  className="relative rounded-full shadow-2xl ring-4 ring-white/20"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance drop-shadow-lg">
              Encuentro de Febrero 2026
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-2 font-medium">
              19 - 22 de Febrero, 2026
            </p>
            <p className="text-lg text-white/70 mb-6">
              Morelos, México
            </p>
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-coral"></span>
              </span>
              <span className="text-sm font-semibold tracking-wide">15 lugares disponibles</span>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="relative py-24 px-4 overflow-hidden bg-warm-white">
          {/* Decorative orbs - light theme adapted */}
          <div className="absolute top-40 -left-40 w-80 h-80 bg-coral/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 -right-40 w-80 h-80 bg-burgundy/5 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-burgundy mb-4">
                Inversión en tu Transformación
              </h2>
              <p className="text-lg text-warm-gray-600 max-w-2xl mx-auto">
                Elige la opción que mejor se adapte a tu proceso de sanación y crecimiento personal.
              </p>
            </div>

            {/* Deposit Notice */}
            <div className="relative mb-20 max-w-2xl mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white rounded-3xl p-8 border border-gold/30 shadow-lg shadow-gold/10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-gold to-gold-dark text-warm-gray-900 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg whitespace-nowrap">
                    RESERVA TU LUGAR
                  </span>
                </div>
                <div className="text-center pt-4">
                  <p className="text-warm-gray-600 text-lg mb-2">Aparta con solo</p>
                  <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark">$3,000 MXN</p>
                  <p className="text-warm-gray-500 mb-8 text-sm mt-2">El resto lo pagas antes del encuentro</p>
                  <button
                    onClick={() => handlePackageSelect('DEPOSIT', 'Anticipo - Encuentro Febrero 2026', 300000)}
                    className="px-10 py-4 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-warm-gray-900 font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/30"
                  >
                    Reservar Ahora
                  </button>
                </div>
              </div>
            </div>

            {/* Package Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
              {/* 2-Night Package */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-coral/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative h-full bg-white rounded-3xl p-8 border border-warm-gray-200 hover:border-coral/30 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-warm-gray-100 to-warm-gray-50 rounded-2xl mb-6 shadow-md border border-warm-gray-200">
                      <span className="text-2xl flex gap-0.5">🌙🌙</span>
                    </div>
                    <h3 className="text-2xl font-bold text-warm-gray-800 mb-2">Retiro 2 Noches</h3>
                    <p className="text-warm-gray-500">Experiencia transformadora esencial</p>
                  </div>

                  <div className="text-center mb-8">
                    <p className="text-warm-gray-400 line-through text-lg mb-1">$8,000 MXN</p>
                    <p className="text-5xl font-bold text-warm-gray-800 mb-2">
                      $7,100 <span className="text-xl font-normal text-warm-gray-500">MXN</span>
                    </p>
                    <span className="inline-block bg-coral/10 text-coral-dark px-4 py-1.5 rounded-full text-sm font-medium border border-coral/20">
                      Ahorra $900
                    </span>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {[
                      '2 ceremonias de Planta Amazónica',
                      'Alojamiento completo',
                      'Todas las comidas incluidas',
                      'Sesiones de preparación e integración',
                      'Taller Encuentra tu propósito',
                      'Sesiones de respiración'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-warm-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-coral/10 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <button
                      onClick={() => handlePackageSelect('TWO_NIGHTS_EARLY', 'Retiro 2 Noches - Precio Especial', 710000)}
                      className="w-full py-4 bg-gradient-to-r from-coral to-coral-dark hover:from-coral-light hover:to-coral text-white font-bold rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-coral/30"
                    >
                      Invertir $7,100 MXN
                    </button>
                  </div>
                </div>
              </div>

              {/* 3-Night Package - Featured */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-coral via-coral-light to-coral rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all duration-500" />
                <div className="relative h-full bg-white rounded-3xl p-8 border-2 border-coral shadow-xl shadow-coral/20 flex flex-col">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-coral to-coral-dark text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-coral/30">
                      MÁS POPULAR
                    </span>
                  </div>

                  <div className="text-center mb-8 pt-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-coral/10 to-burgundy/10 rounded-2xl mb-6 shadow-md border border-coral/20">
                      <span className="text-xl flex gap-0">🌙🌙🌙</span>
                    </div>
                    <h3 className="text-2xl font-bold text-warm-gray-800 mb-2">Retiro 3 Noches</h3>
                    <p className="text-warm-gray-500">Experiencia transformadora completa</p>
                  </div>

                  <div className="text-center mb-8">
                    <p className="text-warm-gray-400 line-through text-lg mb-1">$11,500 MXN</p>
                    <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-coral to-coral-dark mb-2">
                      $10,200 <span className="text-xl font-normal text-warm-gray-500">MXN</span>
                    </p>
                    <span className="inline-block bg-coral/10 text-coral-dark px-4 py-1.5 rounded-full text-sm font-medium border border-coral/20">
                      Ahorra $1,300
                    </span>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {[
                      '3 ceremonias de Planta Amazónica',
                      'Alojamiento completo (3 noches)',
                      'Todas las comidas incluidas',
                      'Sesiones de preparación e integración',
                      'Taller Encuentra tu propósito',
                      'Sesiones de respiración',
                      '1 sesión individual de integración post-retiro'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-warm-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-coral/10 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <button
                      onClick={() => handlePackageSelect('THREE_NIGHTS_EARLY', 'Retiro 3 Noches - Precio Especial', 1020000)}
                      className="w-full py-4 bg-gradient-to-r from-coral to-coral-dark hover:from-coral-light hover:to-coral text-white font-bold rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-coral/30"
                    >
                      Invertir $10,200 MXN
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Add-ons */}
            <div className="relative">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-burgundy mb-2">Sesiones Opcionales</h3>
                <p className="text-warm-gray-500">Complementa tu experiencia</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
                {[
                  { name: 'Inmersión en Hielo', desc: 'Terapia de frío', price: '$1,500', icon: '🧊' },
                  { name: 'Kambó', desc: 'Purificación amazónica', price: '$1,500', icon: '🐸' },
                  { name: 'Bufo o Yopo', desc: 'Ceremonia breve e intensa', price: '$2,000', icon: '✨' },
                  { name: 'Vacuna Kambó', desc: 'Tratamiento completo', price: '$4,000', icon: '💫' }
                ].map((addon, i) => (
                  <div key={i} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="relative bg-white rounded-2xl p-6 border border-warm-gray-200 hover:border-gold/30 transition-all duration-300 text-center shadow-md hover:shadow-lg">
                      <span className="text-3xl mb-4 block">{addon.icon}</span>
                      <h4 className="text-lg font-semibold text-warm-gray-800 mb-1">{addon.name}</h4>
                      <p className="text-warm-gray-500 text-sm mb-4">{addon.desc}</p>
                      <p className="text-2xl font-bold text-gold-dark">{addon.price} <span className="text-sm font-normal text-warm-gray-400">MXN</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What's Included / Not Included */}
        <section className="relative py-24 px-4 overflow-hidden bg-warm-white">
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Included */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-coral/5 to-transparent rounded-3xl blur-xl opacity-50" />
                <div className="relative bg-white rounded-3xl p-8 border border-coral/20 h-full shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-warm-gray-800">Incluido en tu Retiro</h3>
                  </div>
                  <ul className="space-y-4">
                    {encuentroFebrero2026.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-warm-gray-700">
                        <span className="text-coral mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Not Included */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-warm-gray-200/30 to-transparent rounded-3xl blur-xl opacity-50" />
                <div className="relative bg-warm-gray-50 rounded-3xl p-8 border border-warm-gray-200 h-full shadow-md">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-warm-gray-200 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-warm-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-warm-gray-800">No Incluido</h3>
                  </div>
                  <ul className="space-y-4">
                    {encuentroFebrero2026.notIncluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-warm-gray-500">
                        <span className="text-warm-gray-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="relative py-24 px-4 overflow-hidden bg-warm-white">
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-burgundy mb-4">Requisitos Importantes</h2>
              <p className="text-warm-gray-600">Prepárate para una experiencia segura y transformadora</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent rounded-3xl blur-xl opacity-50" />
                <div className="relative bg-white rounded-3xl p-8 border border-gold/20 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center">
                      <span className="text-xl">📋</span>
                    </div>
                    <h3 className="text-xl font-bold text-gold-dark">Preparación</h3>
                  </div>
                  <ul className="space-y-4 text-warm-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">•</span>
                      <span>Dieta de 7 días antes del retiro (sin carne roja, alcohol, drogas recreativas)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">•</span>
                      <span>Completar formulario de salud obligatorio</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">•</span>
                      <span>Evitar actividad sexual 3 días antes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">•</span>
                      <span>Establecer intención clara para tu proceso</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-coral/5 to-transparent rounded-3xl blur-xl opacity-30" />
                <div className="relative bg-warm-gray-100 rounded-3xl p-8 border border-warm-gray-200 shadow-md">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center">
                      <span className="text-xl">⚠️</span>
                    </div>
                    <h3 className="text-xl font-bold text-coral-dark">Contraindicaciones</h3>
                  </div>
                  <ul className="space-y-4 text-warm-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="text-coral mt-1">•</span>
                      <span>Trastornos psicóticos o esquizofrenia</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-coral mt-1">•</span>
                      <span>Antidepresivos ISRS/IMAO (requiere supervisión para descontinuar)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-coral mt-1">•</span>
                      <span>Condiciones cardíacas severas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-coral mt-1">•</span>
                      <span>Embarazo o lactancia</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-coral mt-1">•</span>
                      <span>Hipertensión no controlada</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-coral via-coral-dark to-burgundy" />

          {/* Decorative elements */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-coral/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-burgundy-light/30 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para Transformar tu Vida?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Solo 15 lugares disponibles. Reserva ahora y asegura tu espacio en este encuentro transformador.
            </p>

            <a
              href="https://wa.me/5214427845308?text=Hola%20Ramón,%20me%20interesa%20el%20Encuentro%20de%20Febrero%202026.%20¿Podrías%20darme%20más%20información?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white hover:bg-white/90 text-burgundy font-bold text-xl rounded-full shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300"
            >
              <Image
                src="/whatsapp-icon.webp"
                alt="WhatsApp"
                width={28}
                height={28}
              />
              Contáctanos por WhatsApp
            </a>

            <p className="mt-8 text-white/60">
              +52 442 784 5308 • Ramón
            </p>
          </div>
        </section>

        {/* Site Footer - Consistent with rest of site */}
        <SiteFooter />

        {/* Payment Modal */}
        {showPaymentModal && selectedPayment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-warm-gray-800/80 backdrop-blur-md"
              onClick={closePaymentModal}
            />

            {/* Modal Content */}
            <div className="relative bg-gradient-to-b from-burgundy to-burgundy-dark rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl animate-scale-in">
              {/* Close Button */}
              <button
                onClick={closePaymentModal}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                aria-label="Cerrar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <Elements stripe={getStripe()}>
                <StripePaymentForm
                  productId={selectedPayment.id}
                  productName={selectedPayment.name}
                  amount={selectedPayment.amount}
                  applicationId={applicationId || undefined}
                  onCancel={closePaymentModal}
                />
              </Elements>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
