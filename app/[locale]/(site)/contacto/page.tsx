import Image from "next/image";
import { MapPin, Clock, ArrowRight, MessageSquare } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

import type { Metadata } from "next";

const BASE_URL = "https://escuelafloresiendomexico.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const isEn = locale === "en";
  const prefix = isEn ? "/en" : "";

  return {
    title: t("hero_title") + " — FloreSiendo",
    description: t("hero_description"),
    alternates: {
      canonical: `${BASE_URL}${prefix}/contacto`,
      languages: {
        es: `${BASE_URL}/contacto`,
        en: `${BASE_URL}/en/contacto`,
        "x-default": `${BASE_URL}/contacto`,
      },
    },
    openGraph: {
      title: `${t("hero_title")} | FloreSiendo México`,
      description: t("whatsapp_description"),
      url: `${BASE_URL}${prefix}/contacto`,
      images: [
        {
          url: "/images/cosmic-spiritual-background.webp",
          width: 1200,
          height: 630,
          alt: `${t("hero_title")} FloreSiendo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("hero_title")} | FloreSiendo México`,
      description: t("hero_description"),
      images: ["/images/cosmic-spiritual-background.webp"],
    },
  };
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const whatsappMessage =
    locale === "en"
      ? "Hello, I'd like to know more about FloreSiendo México encounters"
      : "Hola, me gustaría saber más sobre los encuentros de FloreSiendo México";

  const whatsappCallMessage =
    locale === "en"
      ? "Hello, I'd like to schedule a call to learn more about the encounters"
      : "Hola, me gustaría agendar una llamada para conocer más sobre los encuentros";

  const faqs = [
    { question: t("faq_1_q"), answer: t("faq_1_a") },
    { question: t("faq_2_q"), answer: t("faq_2_a") },
    { question: t("faq_3_q"), answer: t("faq_3_a") },
    { question: t("faq_4_q"), answer: t("faq_4_a") },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cosmic-spiritual-background.webp"
            alt={`${t("hero_title")} FloreSiendo`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy/80 via-burgundy/70 to-burgundy/90" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-coral/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 section-container text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
            <MessageSquare size={16} className="text-coral" />
            <span className="text-sm font-medium">{t("hero_badge")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto animate-slide-up">
            {t("hero_title")}
          </h1>
          <p className="text-xl text-coral-light/90 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {t("hero_description")}
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* WhatsApp - Primary */}
            <div className="card-interactive p-8 border-2 border-green-200 bg-green-50/50">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                <Image
                  src="/images/whatsapp-icon.webp"
                  alt="WhatsApp"
                  width={64}
                  height={64}
                />
              </div>
              <h2 className="text-2xl font-bold text-warm-gray-800 mb-4">
                {t("whatsapp_title")}
              </h2>
              <p className="text-warm-gray-600 mb-6">
                {t("whatsapp_description")}
              </p>
              <p className="text-2xl font-bold text-green-600 mb-6">
                {tc("phone")}
              </p>
              <a
                href={`https://wa.me/526182301481?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full px-6 py-4 text-lg font-bold bg-green-500 hover:bg-green-600 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Image
                  src="/images/whatsapp-icon.webp"
                  alt=""
                  width={24}
                  height={24}
                />
                {t("whatsapp_cta")}
              </a>
            </div>

            {/* Location Info */}
            <div className="card-interactive p-8 bg-coral/5 border-2 border-coral/20">
              <div className="w-16 h-16 bg-burgundy rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-warm-gray-800 mb-4">
                {t("space_title")}
              </h2>
              <p className="text-warm-gray-600 mb-6">
                {t("space_description")}
              </p>
              <div className="space-y-4 text-warm-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                  <span>Morelos, México<br /><span className="text-warm-gray-500 text-sm">({t("space_location_note")})</span></span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                  <span>{t("space_schedule")}<br /><span className="text-warm-gray-500 text-sm">{t("space_days")}</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section-padding bg-gradient-warm">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">{t("faq_label")}</span>
            <h2 className="text-burgundy mt-3 mb-4">{t("faq_title")}</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              {t("faq_description")}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-burgundy mb-2 text-lg">{item.question}</h3>
                <p className="text-warm-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-b from-coral via-coral-dark to-burgundy text-white -mb-px">
        <div className="section-container text-center">
          <h2 className="text-white mb-6">{t("call_cta_title")}</h2>
          <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg">
            {t("call_cta_description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/526182301481?text=${encodeURIComponent(whatsappCallMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold bg-white text-coral hover:bg-warm-gray-50 rounded-full shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Image
                src="/images/whatsapp-icon.webp"
                alt=""
                width={24}
                height={24}
              />
              {t("call_cta_button")}
            </a>
            <Link
              href="/encuentros"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold bg-white/20 hover:bg-white/30 text-white border border-white/40 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              {tc("view_encounters")}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
