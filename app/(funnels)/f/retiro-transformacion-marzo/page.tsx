// app/retiro-transformacion-marzo/page.tsx
// Clean landing page for Google Ads traffic — NO substance names

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { encuentroMarzo2026Clean } from "@/lib/encuentros-data-clean";
import { FacilitadoresCarousel } from "@/components/facilitadores-carousel";
import { EncuentroTracking } from "@/components/encuentro-tracking";
import { TrackedWhatsAppLink } from "@/components/tracked-whatsapp-link";
import { VideoTestimonialSection } from "@/components/video-testimonial-section";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";

export const metadata: Metadata = {
  title: "Retiro de Transformación Personal — Marzo 2026 | FloreSiendo",
  description:
    "4 días de trabajo interior profundo en Morelos, México. Ceremonias de bienestar, talleres de propósito y acompañamiento terapéutico. Cupo limitado.",
  robots: { index: false, follow: false },
};

const encuentro = encuentroMarzo2026Clean;

// Clean practices for the grid (same images, sanitized names)
const practicasClean = [
  { name: "Meditación", desc: "Conexión interior", image: "/images/meditacion.jpg" },
  { name: "Ceremonia de Bienestar", desc: "2-3 sesiones guiadas", image: "/images/planta-amazonica.jpg" },
  { name: "Integración Terapéutica", desc: "Círculos de preparación", image: "/images/psicoterapia.jpg" },
  { name: "Purificación Ancestral", desc: "Práctica opcional", image: "/images/rana-mono-gigante.jpg" },
  { name: "Ceremonia de Integración", desc: "Práctica opcional", image: "/images/sapo-sonora.jpg" },
  { name: "Tradición Ceremonial", desc: "Práctica opcional", image: "/images/rape-dioses.jpg" },
];

export default function RetiroTransformacionMarzo() {
  return (
    <main className="min-h-screen bg-warm-gray-50">
      <SiteHeader />
      <EncuentroTracking slug="marzo-2026-google" />

      <FloatingWhatsApp
        phoneNumber={encuentro.whatsappNumber}
        message={encuentro.whatsappMessage}
        page="retiro-google"
        encuentroSlug="marzo-2026"
      />

      {/* Hero Section */}
      <section className="relative text-white py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/venue-alberca.webp"
            alt="Retiro de transformación personal en Morelos"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy/80 via-burgundy/70 to-burgundy" />
        </div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-coral/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {encuentro.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-6">
            {encuentro.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <span className="bg-white/10 px-4 py-2 rounded-full">
              {encuentro.displayDates}
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full">
              {encuentro.location}
            </span>
            <span className="bg-gold/20 text-gold px-4 py-2 rounded-full border border-gold/30">
              {encuentro.spotsRemaining} lugares disponibles
            </span>
          </div>
        </div>
      </section>

      {/* Pain Points → Transformation */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Pain points */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-burgundy mb-6">
                ¿Te identificas?
              </h2>
              <ul className="space-y-4">
                {[
                  "Sientes ansiedad constante que no se va con nada",
                  "Un vacío emocional que no sabes cómo llenar",
                  "Relaciones que duelen o patrones que se repiten",
                  "Sensación de haber perdido el rumbo o tu propósito",
                  "Duelos no resueltos que cargas hace años",
                  "Desconexión contigo mismo y con la vida",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-warm-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-coral/10 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Transformation */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-burgundy mb-6">
                Lo que encontrarás aquí
              </h2>
              <ul className="space-y-4">
                {[
                  "Claridad sobre lo que realmente necesitas sanar",
                  "Paz interior y liberación de cargas emocionales",
                  "Reconexión profunda contigo mismo",
                  "Herramientas para encontrar tu propósito",
                  "Un espacio seguro con acompañamiento terapéutico",
                  "Una comunidad de personas en el mismo camino",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-warm-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-warm-gray-700 leading-relaxed">
            {encuentro.description}
          </p>
        </div>
      </section>

      {/* Venue Gallery */}
      <section className="py-16 px-4 bg-warm-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">El espacio</span>
            <h2 className="text-burgundy mt-3 mb-4 text-3xl md:text-4xl font-bold">Conoce tu refugio</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              Un espacio diseñado para tu proceso, rodeado de naturaleza y con todas las comodidades.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: "/images/venue-alberca.webp", alt: "Alberca y jardín", span: "md:col-span-2 md:row-span-2" },
              { src: "/images/venue-salon-ceremonias.webp", alt: "Salón de ceremonias", span: "" },
              { src: "/images/venue-jardin.webp", alt: "Jardín", span: "" },
              { src: "/images/venue-sala.webp", alt: "Sala común", span: "" },
              { src: "/images/venue-terraza.webp", alt: "Terraza", span: "" },
              { src: "/images/venue-habitacion-1.webp", alt: "Habitación", span: "" },
            ].map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl group ${image.span} ${index === 0 ? "aspect-square md:aspect-auto" : "aspect-square"}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={index === 0 ? "(max-width: 768px) 50vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-4 left-4 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.alt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practices Grid — Clean names, same images */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-burgundy text-center mb-8">
            Prácticas del Encuentro
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {practicasClean.map((practica, i) => (
              <div
                key={i}
                className="bg-warm-gray-50 p-4 md:p-6 rounded-xl text-center border border-warm-gray-200 hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mx-auto mb-3 md:mb-4">
                  <Image
                    src={practica.image}
                    alt={practica.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm md:text-lg font-medium text-warm-gray-800">
                  {practica.name}
                </p>
                <p className="text-xs md:text-sm text-warm-gray-500 mt-1">
                  {practica.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 bg-warm-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-burgundy text-center mb-12">
            ¿Qué Incluye?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-burgundy mb-6 flex items-center gap-2">
                <span className="text-green-500">&#10003;</span> Incluido
              </h3>
              <ul className="space-y-3">
                {encuentro.included.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-warm-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-warm-gray-600 mb-6 flex items-center gap-2">
                <span className="text-warm-gray-400">&#9675;</span> No Incluido
              </h3>
              <ul className="space-y-3">
                {encuentro.notIncluded.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-warm-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                    </svg>
                    <span className="text-warm-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonial */}
      <VideoTestimonialSection funnel="encuentro_marzo-2026-google" />

      {/* Investment CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-burgundy to-burgundy-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Reserva Tu Lugar
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Conoce las opciones de inversión y asegura tu espacio en este encuentro transformador.
          </p>

          <Link
            href="/retiro-transformacion-marzo/precios"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-dark text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Inversión
          </Link>
        </div>
      </section>

      {/* Facilitators */}
      <FacilitadoresCarousel facilitators={encuentro.facilitators} />

      {/* Screening note (replaces detailed contraindications) */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-burgundy mb-4">
            Proceso de Admisión
          </h2>
          <p className="text-warm-gray-600 mb-6">
            Para garantizar tu seguridad y la de todos los participantes, realizamos un
            proceso de screening previo que incluye un formulario de salud y una conversación
            con nuestro equipo. Este paso es fundamental para personalizar tu experiencia.
          </p>
          <p className="text-sm text-warm-gray-500">
            Grupos reducidos de máximo 15 personas para garantizar atención personalizada.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-burgundy text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para tu Transformación?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Da el primer paso hacia una versión más consciente y plena de ti mismo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedWhatsAppLink
              phone={encuentro.whatsappNumber}
              message={encuentro.whatsappMessage}
              page="retiro-google"
              buttonLocation="footer"
              encuentroSlug="marzo-2026"
              eventName="Lead_Retiro_Google"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
            >
              <Image src="/whatsapp-icon.webp" alt="WhatsApp" width={24} height={24} />
              Contáctanos por WhatsApp
            </TrackedWhatsAppLink>
            <Link
              href="/retiro-transformacion-marzo/precios"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full text-lg transition-all border border-white/30"
            >
              Ver Inversión
            </Link>
          </div>

          <p className="mt-8 text-white/60 text-sm">
            Solo {encuentro.spotsRemaining} lugares disponibles para {encuentro.displayDates}
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
