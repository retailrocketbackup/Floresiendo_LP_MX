import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Users, Leaf, Calendar, ArrowRight, Star, Shield, Clock, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { AnimatedStats } from "@/components/animated-stats";
import { FAQAccordion } from "@/components/faq-accordion";
import { TeamCarousel } from "@/components/team-carousel";
import { ScrollAnimate } from "@/components/scroll-animate";
import { CommunityCarousel } from "@/components/community-carousel";
import { TrackedCTAButton } from "@/components/TrackedCTAButton";
import { JsonLd, getFAQSchema, getBreadcrumbSchema } from "@/lib/structured-data";
import { Link } from "@/i18n/routing";

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
      ? "FloreSiendo — Personal Transformation Retreats in Mexico"
      : "FloreSiendo — Retiros de Transformaci\u00f3n Personal en M\u00e9xico",
    description: isEn
      ? "Personal transformation retreats with ancestral practices in Morelos, Mexico. 10+ years of experience, 1,000+ participants. Intimate groups of 15 people max."
      : "Retiros de transformaci\u00f3n personal con pr\u00e1cticas ancestrales en Morelos, M\u00e9xico. +10 a\u00f1os de experiencia, +1,000 participantes. Grupos \u00edntimos de m\u00e1ximo 15 personas.",
    alternates: {
      canonical: `${BASE_URL}${prefix}`,
      languages: {
        es: BASE_URL,
        en: `${BASE_URL}/en`,
        "x-default": BASE_URL,
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const homeFAQs = [
    { question: t("faq_1_q"), answer: t("faq_1_a") },
    { question: t("faq_2_q"), answer: t("faq_2_a") },
    { question: t("faq_3_q"), answer: t("faq_3_a") },
    { question: t("faq_4_q"), answer: t("faq_4_a") },
    { question: t("faq_5_q"), answer: t("faq_5_a") },
  ];

  const breadcrumbName = locale === "en" ? "Home" : "Inicio";

  return (
    <main>
      {/* Structured Data */}
      <JsonLd data={getFAQSchema(homeFAQs)} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: breadcrumbName, url: locale === "en" ? `${BASE_URL}/en` : BASE_URL },
        ])}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cosmic-spiritual-background.webp"
            alt={locale === "en" ? "Spiritual transformation" : "Transformaci\u00f3n espiritual"}
            fill
            priority
            sizes="100vw"
            className="object-cover scale-105 animate-[scale-in_20s_ease-out_forwards]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy/70 via-burgundy/50 to-burgundy/80" />
        </div>

        <div className="absolute top-20 left-10 w-32 h-32 bg-coral/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-burgundy/15 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 animate-fade-in border border-white/20">
            <Sparkles size={16} className="text-gold" />
            <span className="text-sm font-medium">{tc("experience_badge")}</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl animate-slide-up">
            {t("hero_title_start")}{" "}
            <span className="text-coral relative">
              {t("hero_title_highlight")}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-coral/50 rounded-full" />
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-10 text-white/80 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
            {t("hero_description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <TrackedCTAButton
              href="/encuentros"
              page="home"
              buttonLocation="hero_primary"
              eventName="Lead_Encuentros"
              className="btn-primary hover-shine group"
            >
              {t("hero_cta_primary")}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </TrackedCTAButton>
            <TrackedCTAButton
              href="/escuela"
              page="home"
              buttonLocation="hero_secondary"
              eventName="Lead_Escuela"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50"
            >
              {t("hero_cta_secondary")}
            </TrackedCTAButton>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-6 bg-warm-gray-50 border-y border-warm-gray-100">
        <div className="section-container">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-warm-gray-500">
            {[
              { icon: Shield, text: t("trust_safe") },
              { icon: Users, text: t("trust_participants") },
              { icon: Clock, text: t("trust_experience") },
              { icon: Star, text: t("trust_certified") },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <item.icon size={18} className="text-coral" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Help With */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <ScrollAnimate animation="fade-up" className="text-center mb-16">
            <p className="text-coral font-semibold mb-3 uppercase tracking-wide text-sm">{t("accompaniment_label")}</p>
            <h2 className="text-burgundy mb-6">{t("accompaniment_title")}</h2>
            <p className="text-warm-gray-600 max-w-3xl mx-auto">
              {t("accompaniment_description")}
            </p>
          </ScrollAnimate>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: t("wellbeing_title"),
                description: t("wellbeing_description"),
                bgColor: "bg-coral/10",
                textColor: "text-coral",
              },
              {
                icon: Users,
                title: t("relationships_title"),
                description: t("relationships_description"),
                bgColor: "bg-burgundy/10",
                textColor: "text-burgundy",
              },
              {
                icon: Leaf,
                title: t("transformation_title"),
                description: t("transformation_description"),
                bgColor: "bg-gold/10",
                textColor: "text-gold",
              },
            ].map((item, index) => (
              <ScrollAnimate key={index} animation="fade-up" delay={index * 100}>
                <div className="card-interactive p-8 text-center group h-full">
                  <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <item.icon className={`w-8 h-8 ${item.textColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-warm-gray-800 mb-3">{item.title}</h3>
                  <p className="text-warm-gray-600">{item.description}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Team Carousel Section */}
      <TeamCarousel />

      {/* Services */}
      <section className="section-padding bg-gradient-burgundy text-white overflow-hidden">
        <div className="section-container">
          <ScrollAnimate animation="fade-up" className="text-center mb-16">
            <p className="text-coral-light font-semibold mb-3 uppercase tracking-wide text-sm">{t("experiences_label")}</p>
            <h2 className="text-white mb-6">{t("experiences_title")}</h2>
            <p className="text-coral-light/80 max-w-2xl mx-auto">
              {t("experiences_description")}
            </p>
          </ScrollAnimate>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollAnimate animation="fade-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 border border-white/10 h-full group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-coral rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">{t("encounters_title")}</h3>
                </div>
                <p className="text-coral-light/90 mb-6">
                  {t("encounters_description")}
                </p>
                <Link
                  href="/encuentros"
                  className="inline-flex items-center gap-2 text-coral font-semibold hover:text-coral-light transition-colors group/link"
                >
                  {t("encounters_cta")}
                  <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollAnimate>

            <ScrollAnimate animation="fade-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 border border-white/10 h-full group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Leaf className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">{t("wisdom_title")}</h3>
                </div>
                <p className="text-coral-light/90 mb-6">
                  {t("wisdom_description")}
                </p>
                <Link
                  href="/practicas-ancestrales"
                  className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors group/link"
                >
                  {t("wisdom_cta")}
                  <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Community Carousel Section */}
      <CommunityCarousel />

      {/* Animated Stats Section */}
      <AnimatedStats />

      {/* Video/Documentary Section */}
      <section className="section-padding bg-warm-gray-50">
        <div className="section-narrow text-center">
          <ScrollAnimate animation="fade-up">
            <p className="text-coral font-semibold mb-3 uppercase tracking-wide text-sm">{t("documentary_label")}</p>
            <h2 className="text-burgundy mb-6">{t("documentary_title")}</h2>
            <p className="text-warm-gray-600 mb-10">
              {t("documentary_description")}
            </p>
          </ScrollAnimate>

          <ScrollAnimate animation="scale" delay={100}>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl hover-glow group">
              <iframe
                src="https://www.youtube-nocookie.com/embed/3KZMMAd1Bsk?rel=0"
                title={locale === "en" ? "FloreSiendo Documentary" : "Documental FloreSiendo"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <FAQAccordion
            title={t("faq_title")}
            subtitle={t("faq_subtitle")}
            items={homeFAQs}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding text-white relative overflow-hidden bg-gradient-to-b from-coral via-coral-dark to-burgundy -mb-px">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-burgundy/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-burgundy/20 rounded-full blur-3xl" />

        <div className="section-container text-center relative z-10">
          <ScrollAnimate animation="fade-up">
            <h2 className="text-white mb-6">{tc("ready_cta_title")}</h2>
            <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg">
              {tc("ready_cta_description")}
            </p>

            <div className="flex justify-center">
              <TrackedCTAButton
                href="/contacto"
                page="home"
                buttonLocation="footer_cta"
                eventName="Lead_Contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold bg-white text-coral hover:bg-warm-gray-50 rounded-full shadow-xl hover:scale-105 transition-all duration-300 hover-shine group focus-ring"
              >
                {tc("cta_whatsapp")}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </TrackedCTAButton>
            </div>
          </ScrollAnimate>
        </div>
      </section>
    </main>
  );
}
