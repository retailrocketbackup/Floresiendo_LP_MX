import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, Leaf, Shield, Heart, AlertTriangle } from "lucide-react";
import { practicas } from "@/lib/practicas-data";
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
      ? "Ancestral Practices — Ceremonies and Traditions"
      : "Prácticas Ancestrales — Ceremonias y Tradiciones",
    description: isEn
      ? "Discover the traditional practices and ancestral ceremonies we work with at FloreSiendo. Integrative, safe, and respectful approach in Morelos, Mexico."
      : "Conoce las prácticas tradicionales y ceremonias ancestrales con las que trabajamos en FloreSiendo. Enfoque integrativo, seguro y respetuoso en Morelos, México.",
    alternates: {
      canonical: `${BASE_URL}${prefix}/practicas-ancestrales`,
      languages: {
        es: `${BASE_URL}/practicas-ancestrales`,
        en: `${BASE_URL}/en/practicas-ancestrales`,
        "x-default": `${BASE_URL}/practicas-ancestrales`,
      },
    },
    openGraph: {
      title: isEn
        ? "Ancestral Practices | FloreSiendo México"
        : "Prácticas Ancestrales | FloreSiendo México",
      description: isEn
        ? "Traditional ceremonies that facilitate connection with our authentic self and integral well-being."
        : "Ceremonias tradicionales que facilitan la conexión con nuestro ser auténtico y el bienestar integral.",
      url: `${BASE_URL}${prefix}/practicas-ancestrales`,
      images: [
        {
          url: "/images/elementos-naturales.webp",
          width: 1200,
          height: 630,
          alt: isEn
            ? "Ancestral practices FloreSiendo"
            : "Prácticas ancestrales FloreSiendo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn
        ? "Ancestral Practices | FloreSiendo México"
        : "Prácticas Ancestrales | FloreSiendo México",
      description: isEn
        ? "Traditional ceremonies with an integrative and safe approach."
        : "Ceremonias tradicionales con enfoque integrativo y seguro.",
      images: ["/images/elementos-naturales.webp"],
    },
  };
}

export default async function MedicinasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "practices" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const isEn = locale === "en";

  return (
    <main>
      {/* Hero */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/elementos-naturales.webp"
            alt={t("hero_title_highlight")}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-coral/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 section-container text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
            <Leaf size={16} className="text-gold" />
            <span className="text-sm font-medium">{tc("participants_badge")}</span>
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

      {/* Our Approach */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-coral font-semibold uppercase tracking-wide text-sm">{t("philosophy_label")}</span>
              <h2 className="text-burgundy mt-3 mb-6">{t("philosophy_title")}</h2>
              <blockquote className="text-xl text-warm-gray-700 mb-6 leading-relaxed border-l-4 border-coral pl-6 italic">
                &ldquo;{t("philosophy_quote")}&rdquo;
              </blockquote>
              <p className="text-warm-gray-600 mb-6 leading-relaxed">
                {t("philosophy_p1")}
              </p>
              <p className="text-warm-gray-600 leading-relaxed">
                {t("philosophy_p2")}
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
              <Image
                src="/images/elementos-naturales.webp"
                alt={t("hero_title_highlight")}
                width={500}
                height={400}
                className="relative rounded-3xl shadow-2xl hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-padding bg-gradient-warm">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">{t("principles_label")}</span>
            <h2 className="text-burgundy mt-3 mb-4">{t("principles_title")}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: t("safety_title"),
                description: t("safety_desc"),
                bgColor: "bg-coral/10",
                textColor: "text-coral",
              },
              {
                icon: Heart,
                title: t("respect_title"),
                description: t("respect_desc"),
                bgColor: "bg-burgundy/10",
                textColor: "text-burgundy",
              },
              {
                icon: Leaf,
                title: t("integration_title"),
                description: t("integration_desc"),
                bgColor: "bg-gold/10",
                textColor: "text-gold",
              },
            ].map((item, index) => (
              <div key={index} className="card-interactive p-8 group">
                <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-8 h-8 ${item.textColor}`} />
                </div>
                <h3 className="font-bold text-warm-gray-800 mb-3 text-xl">{item.title}</h3>
                <p className="text-warm-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practicas List */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">{t("practices_label")}</span>
            <h2 className="text-burgundy mt-3 mb-4">{t("practices_title")}</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              {t("practices_description")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {practicas.map((practica) => (
              <div
                key={practica.slug}
                className={`${practica.bgColor} rounded-3xl p-8 border ${practica.borderColor} hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    {practica.image ? (
                      <Image
                        src={practica.image}
                        alt={practica.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full ${practica.accentColor} flex items-center justify-center`}>
                        <Leaf className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className={`text-2xl font-bold ${practica.textColor}`}>
                        {isEn ? practica.nameEn : practica.name}
                      </h3>
                      {practica.optional && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-warm-gray-200 text-warm-gray-600 rounded-full">
                          {tc("optional")}
                        </span>
                      )}
                    </div>
                    {practica.subtitle && (
                      <p className={`text-sm font-medium ${practica.textColor} opacity-70 mb-3`}>
                        {isEn ? (practica.subtitleEn || practica.subtitle) : practica.subtitle}
                      </p>
                    )}
                    <p className="text-warm-gray-700 mb-4 italic text-lg">
                      {isEn ? practica.descriptionEn : practica.description}
                    </p>
                    <p className="text-warm-gray-600">
                      {isEn ? practica.detailsEn : practica.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 bg-gold/10">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-6 items-start bg-white rounded-2xl p-8 shadow-sm border border-gold/20">
              <div className="w-14 h-14 bg-gold/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-7 h-7 text-gold-dark" />
              </div>
              <div>
                <h3 className="font-bold text-warm-gray-800 mb-3 text-xl">{t("notice_title")}</h3>
                <p className="text-warm-gray-600 leading-relaxed">
                  {t("notice_text")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-burgundy text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-burgundy-light/20 rounded-full blur-3xl" />

        <div className="section-container relative z-10 text-center">
          <h2 className="text-white mb-6">{t("cta_title")}</h2>
          <p className="text-coral-light/80 mb-10 max-w-2xl mx-auto text-lg">
            {t("cta_description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold bg-coral hover:bg-coral-dark text-white rounded-full shadow-xl hover:scale-105 transition-all duration-300"
            >
              {tc("cta_schedule_call")}
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/encuentros"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold bg-white/20 hover:bg-white/30 text-white border border-white/40 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              {tc("view_encounters")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
