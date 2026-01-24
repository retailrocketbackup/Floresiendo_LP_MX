// app/(site)/encuentros/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
import { ScheduleDisplay } from "@/components/schedule-display";

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
    <main className="min-h-screen bg-warm-gray-50">
      {/* Meta Tracking */}
      <EncuentroTracking slug={encuentro.slug} />
      {/* Hero Section */}
      <section className="relative text-white py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/venue-alberca.webp"
            alt="Retiro FloreSiendo en Morelos"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy/80 via-burgundy/70 to-burgundy" />
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-coral/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Link
            href="/encuentros"
            className="inline-flex items-center gap-2 text-coral-light hover:text-white transition-colors mb-6"
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
            <span className="bg-gold/20 text-gold px-4 py-2 rounded-full border border-gold/30">
              {encuentro.spotsRemaining} lugares disponibles
            </span>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-warm-gray-700 leading-relaxed">
            {encuentro.description}
          </p>
        </div>
      </section>

      {/* El Espacio - Venue Gallery */}
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

      {/* Practices */}
      <PracticasGrid />

      {/* Schedule */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header with Subtitle */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-burgundy mb-3">
              Tu Viaje de Transformación
            </h2>
            <p className="text-lg text-warm-gray-600 max-w-2xl mx-auto">
              Cuatro días diseñados para reconectarte con tu esencia
            </p>
          </div>

          {/* Interactive Schedule with Accordion */}
          <ScheduleDisplay
            schedule={encuentro.schedule}
            retreatTitle={encuentro.title}
            retreatYear={parseInt(encuentro.startDate.split("-")[0])}
          />
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-burgundy text-center mb-12">
            ¿Qué Incluye?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Included */}
            <div className="bg-warm-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-burgundy mb-6 flex items-center gap-2">
                <span className="text-green-500">✓</span> Incluido
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

            {/* Not Included */}
            <div className="bg-warm-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-warm-gray-600 mb-6 flex items-center gap-2">
                <span className="text-warm-gray-400">○</span> No Incluido
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

      {/* Video Testimonial - Social proof before Investment CTA */}
      <VideoTestimonialSection funnel={`encuentro_${encuentro.slug}`} />

      {/* Investment CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-burgundy to-burgundy-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Reserva Tu Lugar
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Conoce las opciones de inversión y asegura tu espacio en este encuentro transformador.
          </p>

          <Link
            href="/encuentros/marzo-2026-precios"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-dark text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
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
          <h2 className="text-3xl font-bold text-burgundy text-center mb-12">
            Preparación para el Encuentro
          </h2>

          <div className="bg-warm-gray-50 p-8 rounded-2xl">
            <ul className="space-y-4">
              {encuentro.preparation.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-burgundy text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <span className="text-warm-gray-700 pt-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contraindications */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-burgundy text-center mb-4">
            Contraindicaciones
          </h2>
          <p className="text-center text-warm-gray-600 mb-12 max-w-2xl mx-auto">
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
                  <span className="text-warm-gray-700">{item}</span>
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
