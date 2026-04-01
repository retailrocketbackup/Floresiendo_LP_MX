import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, Calendar, MapPin, Clock, Users, Check, Heart, Star, Sparkles } from "lucide-react";
import { FAQAccordion } from "@/components/faq-accordion";
import { PageTracking } from "@/components/page-tracking";
import { retreatInclusions } from "@/lib/encuentros-data";
import { getTranslations } from "next-intl/server";

import type { Metadata } from "next";

const BASE_URL = "https://escuelafloresiendomexico.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const prefix = isEn ? "/en" : "";

  return {
    title: isEn
      ? "Encounters & Personal Transformation Retreats"
      : "Encuentros y Retiros de Transformación Personal",
    description: isEn
      ? "Discover our 3-night retreats with ancestral practices and traditional ceremonies in Morelos, Mexico. Upcoming dates, pricing and full information."
      : "Descubre nuestros retiros de 3 noches con prácticas ancestrales y ceremonias tradicionales en Morelos, México. Próximas fechas, precios e información completa.",
    alternates: {
      canonical: `${BASE_URL}${prefix}/encuentros`,
      languages: {
        es: `${BASE_URL}/encuentros`,
        en: `${BASE_URL}/en/encuentros`,
        "x-default": `${BASE_URL}/encuentros`,
      },
    },
    openGraph: {
      title: isEn
        ? "Encounters & Retreats | FloreSiendo Mexico"
        : "Encuentros y Retiros | FloreSiendo México",
      description: isEn
        ? "3-night retreats with ancestral practices and traditional ceremonies in Morelos, Mexico. Limited to 15 participants."
        : "Retiros de 3 noches con prácticas ancestrales y ceremonias tradicionales en Morelos, México. Cupo limitado a 15 personas.",
      url: `${BASE_URL}${prefix}/encuentros`,
      images: [
        {
          url: "/images/venue-alberca.webp",
          width: 1200,
          height: 630,
          alt: isEn
            ? "FloreSiendo Retreats in Morelos, Mexico"
            : "Retiros FloreSiendo en Morelos, México",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn
        ? "Encounters & Retreats | FloreSiendo Mexico"
        : "Encuentros y Retiros | FloreSiendo México",
      description: isEn
        ? "3-night retreats with ancestral practices and ceremonies in Morelos, Mexico."
        : "Retiros de 3 noches con prácticas ancestrales y ceremonias en Morelos, México.",
      images: ["/images/venue-alberca.webp"],
    },
  };
}

export default async function EncuentrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "encounters" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const isEn = locale === "en";

  return (
    <main>
      {/* Page View Tracking */}
      <PageTracking
        page="encuentros"
        contentName="encuentros_listing"
        contentCategory="encuentros"
      />

      {/* Hero */}
      <section className="relative py-32 md:py-40 overflow-hidden -mb-px">
        <div className="absolute inset-0 bg-[url('/images/cosmic-spiritual-background.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy/80 via-burgundy/70 to-burgundy" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-coral/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 section-container text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
            <Calendar size={16} className="text-gold" />
            <span className="text-sm font-medium">{t("hero_badge")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto animate-slide-up">
            {t("hero_title_start")}{" "}
            <span className="text-coral">{t("hero_title_highlight")}</span>
          </h1>
          <p className="text-xl text-coral-light/90 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {t("hero_description")}
          </p>
        </div>
      </section>

      {/* Upcoming Dates - Moved to top */}
      <section className="section-padding bg-burgundy text-white relative overflow-hidden -mt-1">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-burgundy-light/20 rounded-full blur-3xl" />

        <div className="section-container relative z-10">
          <div className="text-center mb-12">
            <span className="text-coral-light font-semibold uppercase tracking-wide text-sm">{t("confirmed_dates")}</span>
            <h2 className="text-white mt-3 mb-4">{t("upcoming_title")}</h2>
            <p className="text-coral-light/80 max-w-2xl mx-auto">
              {t("upcoming_description")}
            </p>
          </div>

          {/* Events Container */}
          <div className="max-w-2xl mx-auto space-y-6">

            {/* 1. Free Meditation Card - Apr 3 */}
            <Link
              href="/f/meditacion-gratis"
              className="block bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-purple-400/40 hover:border-purple-400 hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Date Box - Purple accent */}
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-5 text-center min-w-[120px] shadow-lg">
                  <span className="text-white/80 text-xs font-medium uppercase tracking-wide">
                    {isEn ? "April" : "Abril"}
                  </span>
                  <div className="text-3xl font-bold text-white my-1">3</div>
                  <span className="text-white/80 text-xs font-medium">8:00 PM</span>
                </div>

                {/* Event Details */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-purple-500/30 text-purple-200 font-bold text-xs uppercase tracking-wide rounded-full">
                      {t("free")}
                    </span>
                    <span className="text-coral-light/80 text-sm">
                      {isEn ? "Live Meditation \u00b7 Online" : "Meditaci\u00f3n en Vivo \u00b7 Online"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {isEn ? "Live Guided Meditation" : "Meditaci\u00f3n Guiada en Vivo"}
                  </h3>
                  <p className="text-coral-light/70 text-sm mb-3">
                    {isEn
                      ? "30 minutes to calm your mind and reconnect with yourself"
                      : "30 minutos para calmar tu mente y reconectar contigo"}
                  </p>
                  <span className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg group-hover:scale-105 transition-all duration-300">
                    {isEn ? "Reserve my spot" : "Apartar mi lugar"}
                    <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            </Link>

            {/* 2. Free Meditation Card - Apr 20 */}
            <Link
              href="/f/meditacion-gratis-2"
              className="block bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-purple-400/40 hover:border-purple-400 hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Date Box - Purple accent */}
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-5 text-center min-w-[120px] shadow-lg">
                  <span className="text-white/80 text-xs font-medium uppercase tracking-wide">
                    {isEn ? "April" : "Abril"}
                  </span>
                  <div className="text-3xl font-bold text-white my-1">20</div>
                  <span className="text-white/80 text-xs font-medium">8:00 PM</span>
                </div>

                {/* Event Details */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-purple-500/30 text-purple-200 font-bold text-xs uppercase tracking-wide rounded-full">
                      {t("free")}
                    </span>
                    <span className="text-coral-light/80 text-sm">
                      {isEn ? "Live Meditation \u00b7 Online" : "Meditaci\u00f3n en Vivo \u00b7 Online"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {isEn ? "Live Guided Meditation" : "Meditaci\u00f3n Guiada en Vivo"}
                  </h3>
                  <p className="text-coral-light/70 text-sm mb-3">
                    {isEn
                      ? "30 minutes to calm your mind and reconnect with yourself"
                      : "30 minutos para calmar tu mente y reconectar contigo"}
                  </p>
                  <span className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg group-hover:scale-105 transition-all duration-300">
                    {isEn ? "Reserve my spot" : "Apartar mi lugar"}
                    <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            </Link>

            {/* 3. Conference Card - Apr 19 */}
            <Link
              href="/f/conferencia-parejas"
              className="block bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-gold/40 hover:border-gold hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Date Box - Gold accent */}
                <div className="bg-gradient-to-br from-gold to-gold-dark rounded-2xl p-5 text-center min-w-[120px] shadow-lg">
                  <span className="text-white/80 text-xs font-medium uppercase tracking-wide">
                    {isEn ? "April" : "Abril"}
                  </span>
                  <div className="text-3xl font-bold text-white my-1">19</div>
                  <span className="text-white/80 text-xs font-medium">4:00 PM</span>
                </div>

                {/* Event Details */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-gold/30 text-gold-light font-bold text-xs uppercase tracking-wide rounded-full">
                      {t("free")}
                    </span>
                    <span className="px-2 py-0.5 bg-white/10 text-white/80 font-bold text-xs uppercase tracking-wide rounded-full">
                      {t("in_person")}
                    </span>
                    <span className="text-coral-light/80 text-sm">
                      {isEn ? "Conference \u00b7 CDMX" : "Conferencia \u00b7 CDMX"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {isEn ? "Conference: Romantic Relationships" : "Conferencia: Relaciones de Pareja"}
                  </h3>
                  <p className="text-coral-light/70 text-sm mb-2">
                    {isEn
                      ? "You love them but no longer desire them. Discover why \u2014 and what to do about it."
                      : "Lo amas pero ya no lo deseas. Descubre por qu\u00e9 \u2014 y qu\u00e9 hacer al respecto."}
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 text-coral-light/70 text-sm mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      N\u00e1poles, CDMX
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      60 {t("spots")}
                    </span>
                  </div>
                  <span className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold bg-gold hover:bg-gold-dark text-white rounded-full shadow-lg group-hover:scale-105 transition-all duration-300">
                    {isEn ? "Reserve my spot" : "Reservar mi lugar"}
                    <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            </Link>

            {/* 4. Retreat Card - Apr 30 - May 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-coral rounded-2xl p-5 text-center min-w-[120px] shadow-lg">
                  <span className="text-white/80 text-xs font-medium uppercase tracking-wide">
                    {isEn ? "Apr - May" : "Abr - May"}
                  </span>
                  <div className="text-3xl font-bold text-white my-1">30 - 3</div>
                  <span className="text-white/80 text-xs font-medium">2026</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {isEn ? "April Encounter" : "Encuentro de Abril"}
                  </h3>
                  <p className="text-coral-light/70 text-sm mb-2">
                    {isEn
                      ? "4 days of deep immersion to reconnect with yourself and transform what no longer works."
                      : "4 d\u00edas de inmersi\u00f3n profunda para reconectarte contigo y transformar lo que ya no funciona."}
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 text-coral-light/90 text-sm mb-3">
                    <span className="flex items-center gap-1"><MapPin size={14} />{t("morelos")}</span>
                    <span className="flex items-center gap-1"><Clock size={14} />{t("three_nights")}</span>
                    <span className="flex items-center gap-1"><Users size={14} />{t("limited_spots")}</span>
                  </div>
                  <Link
                    href="/encuentros/abril-2026"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold bg-coral hover:bg-coral-dark text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    {isEn ? "View details" : "Ver detalles"} <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Additional Info */}
          <p className="text-center text-coral-light/60 text-sm mt-8">
            {t("questions_help")}
          </p>
        </div>
      </section>

      {/* What is an Encuentro */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-coral font-semibold uppercase tracking-wide text-sm">{t("what_is_label")}</span>
              <h2 className="text-burgundy mt-3 mb-6">{t("what_is_title")}</h2>
              <p className="text-warm-gray-600 mb-6 leading-relaxed">
                {t("what_is_p1")}
              </p>
              <p className="text-warm-gray-600 mb-8 leading-relaxed">
                {t("what_is_p2")}
              </p>
              <ul className="space-y-4">
                {[
                  t("what_is_list_1"),
                  t("what_is_list_2"),
                  t("what_is_list_3"),
                  t("what_is_list_4"),
                  t("what_is_list_5"),
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-warm-gray-700">
                    <div className="w-6 h-6 bg-coral/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-coral" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-coral/10 rounded-full blur-3xl" />
              <Image
                src="/images/circulo-integracion.webp"
                alt="Círculo de integración grupal"
                width={600}
                height={400}
                className="relative rounded-3xl shadow-2xl hover-lift object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-padding bg-gradient-warm">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">{t("location_label")}</span>
            <h2 className="text-burgundy mt-3 mb-4">{t("location_title")}</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              {t("location_description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: t("location_access_title"),
                description: t("location_access_desc"),
                bgColor: "bg-coral/10",
                textColor: "text-coral",
              },
              {
                icon: Users,
                title: t("location_intimate_title"),
                description: t("location_intimate_desc"),
                bgColor: "bg-burgundy/10",
                textColor: "text-burgundy",
              },
              {
                icon: Clock,
                title: t("location_nights_title"),
                description: t("location_nights_desc"),
                bgColor: "bg-gold/10",
                textColor: "text-gold",
              },
            ].map((item, index) => (
              <div key={index} className="card-interactive p-8 text-center group">
                <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-8 h-8 ${item.textColor}`} />
                </div>
                <h3 className="font-bold text-warm-gray-800 mb-3 text-xl">{item.title}</h3>
                <p className="text-warm-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Gallery */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">{t("venue_label")}</span>
            <h2 className="text-burgundy mt-3 mb-4">{t("venue_title")}</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              {t("venue_description")}
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

      {/* What's Included */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">{t("included_label")}</span>
            <h2 className="text-burgundy mt-3 mb-4">{t("included_title")}</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              {t("included_description")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {retreatInclusions.included.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-warm-gray-100 hover:border-coral/30 hover:shadow-md transition-all">
                  <div className="w-8 h-8 bg-coral rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-warm-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-gradient-warm">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">{t("process_label")}</span>
            <h2 className="text-burgundy mt-3 mb-4">{t("process_title")}</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              {t("process_description")}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: t("process_1_title"),
                  description: t("process_1_desc"),
                },
                {
                  step: "2",
                  title: t("process_2_title"),
                  description: t("process_2_desc"),
                },
                {
                  step: "3",
                  title: t("process_3_title"),
                  description: t("process_3_desc"),
                },
                {
                  step: "4",
                  title: t("process_4_title"),
                  description: t("process_4_desc"),
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-coral rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xl shadow-lg">
                    {item.step}
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-gray-100 flex-1 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-burgundy mb-2 text-xl">{item.title}</h3>
                    <p className="text-warm-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <FAQAccordion
            title={t("faq_title")}
            subtitle={t("faq_subtitle")}
            items={[
              {
                question: t("faq_1_q"),
                answer: t("faq_1_a"),
              },
              {
                question: t("faq_2_q"),
                answer: t("faq_2_a"),
              },
              {
                question: t("faq_3_q"),
                answer: t("faq_3_a"),
              },
              {
                question: t("faq_4_q"),
                answer: t("faq_4_a"),
              },
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-b from-coral via-coral-dark to-burgundy text-white -mb-px">
        <div className="section-container text-center">
          <h2 className="text-white mb-6">{tc("ready_cta_title")}</h2>
          <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg">
            {t("cta_description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold bg-white text-coral hover:bg-warm-gray-50 rounded-full shadow-xl hover:scale-105 transition-all duration-300"
            >
              {tc("cta_schedule_call")}
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/practicas-ancestrales"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold bg-white/20 hover:bg-white/30 text-white border border-white/40 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              {t("cta_secondary")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
