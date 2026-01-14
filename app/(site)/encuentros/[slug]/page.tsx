// app/(site)/encuentros/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getEncuentroBySlug,
  encuentros,
  type Encuentro,
} from "@/lib/encuentros-data";
import { PracticasGrid } from "@/components/practicas-grid";
import { FacilitadoresCarousel } from "@/components/facilitadores-carousel";
import { EncuentroTracking } from "@/components/encuentro-tracking";
import { TrackedWhatsAppLink } from "@/components/tracked-whatsapp-link";
import { VideoTestimonialSection } from "@/components/video-testimonial-section";

// Generate static params for all encuentros
export async function generateStaticParams() {
  return encuentros.map((encuentro) => ({
    slug: encuentro.slug,
  }));
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const encuentro = getEncuentroBySlug(slug);

  if (!encuentro) {
    return { title: "Encuentro no encontrado" };
  }

  return {
    title: `${encuentro.title} | FloreSiendo`,
    description: encuentro.description.slice(0, 160),
  };
}

export default async function EncuentroPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const encuentro = getEncuentroBySlug(slug);

  if (!encuentro) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fdf8f4]">
      {/* Meta Tracking */}
      <EncuentroTracking slug={encuentro.slug} />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#8b2a4a] via-[#722240] to-[#5a1a33] text-white py-20 px-4">
        <div className="absolute inset-0 bg-[url('/images/cosmic-spiritual-background.webp')] opacity-20 bg-cover bg-center" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Link
            href="/encuentros"
            className="inline-flex items-center gap-2 text-[#f78080] hover:text-white transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Volver a Encuentros
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {encuentro.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-6">
            {encuentro.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <span className="bg-white/10 px-4 py-2 rounded-full">
              📅 {encuentro.displayDates}
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full">
              📍 {encuentro.location}
            </span>
            <span className="bg-[#d4a853]/20 text-[#d4a853] px-4 py-2 rounded-full border border-[#d4a853]/30">
              {encuentro.spotsRemaining} lugares disponibles
            </span>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-gray-700 leading-relaxed">
            {encuentro.description}
          </p>
        </div>
      </section>

      {/* Practices */}
      <PracticasGrid />

      {/* Schedule */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#8b2a4a] text-center mb-12">
            Itinerario del Encuentro
          </h2>

          <div className="space-y-8">
            {encuentro.schedule.map((day, dayIndex) => (
              <div key={dayIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-[#8b2a4a] text-white p-4">
                  <h3 className="text-xl font-bold">{day.day}</h3>
                  <p className="text-white/80">{day.date}</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {day.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-4">
                        <div className="flex-shrink-0 w-16 text-[#d4a853] font-semibold">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{item.activity}</p>
                          {item.description && (
                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#8b2a4a] text-center mb-12">
            ¿Qué Incluye?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Included */}
            <div className="bg-[#fdf8f4] p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-[#8b2a4a] mb-6 flex items-center gap-2">
                <span className="text-green-500">✓</span> Incluido
              </h3>
              <ul className="space-y-3">
                {encuentro.included.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Included */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-600 mb-6 flex items-center gap-2">
                <span className="text-gray-400">○</span> No Incluido
              </h3>
              <ul className="space-y-3">
                {encuentro.notIncluded.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonial - Social proof before Investment CTA */}
      <VideoTestimonialSection funnel={`encuentro_${encuentro.slug}`} />

      {/* Investment CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#8b2a4a] to-[#722240] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Reserva Tu Lugar
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Conoce las opciones de inversión y asegura tu espacio en este encuentro transformador.
          </p>

          <Link
            href="/encuentros/febrero-2026-precios"
            className="inline-flex items-center gap-3 bg-[#d4a853] hover:bg-[#c49943] text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Inversión
          </Link>
        </div>
      </section>

      {/* Facilitators Carousel */}
      <FacilitadoresCarousel facilitators={encuentro.facilitators} />

      {/* Preparation */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#8b2a4a] text-center mb-12">
            Preparación para el Encuentro
          </h2>

          <div className="bg-[#fdf8f4] p-8 rounded-2xl">
            <ul className="space-y-4">
              {encuentro.preparation.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#8b2a4a] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 pt-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contraindications */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#8b2a4a] text-center mb-4">
            Contraindicaciones
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Por tu seguridad, es importante que revises estas condiciones antes de aplicar.
            Si tienes dudas, consúltanos.
          </p>

          <div className="bg-red-50 border border-red-200 p-8 rounded-2xl">
            <ul className="space-y-3">
              {encuentro.contraindications.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
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
              page="encuentro"
              buttonLocation="footer"
              encuentroSlug={encuentro.slug}
              eventName={`Lead_Encuentro_${encuentro.slug.replace(/-/g, "_")}`}
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Reservar mi Lugar
            </TrackedWhatsAppLink>
            <Link
              href="/encuentros"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full text-lg transition-all border border-white/30"
            >
              Ver Otros Encuentros
            </Link>
          </div>

          <p className="mt-8 text-white/60 text-sm">
            Solo {encuentro.spotsRemaining} lugares disponibles para {encuentro.displayDates}
          </p>
        </div>
      </section>
    </main>
  );
}
