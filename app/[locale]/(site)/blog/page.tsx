import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { getBlogPosts, getBlogCategories, getReadingTime, formatDate } from "@/lib/cosmic";
import { JsonLd, getBreadcrumbSchema } from "@/lib/structured-data";

const BASE_URL = "https://escuelafloresiendomexico.com";

export const revalidate = 3600; // ISR: revalidate every hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("hero_title_start") + " " + t("hero_title_highlight") + " — " + t("hero_description"),
    description: t("hero_description"),
    alternates: {
      canonical: `${BASE_URL}/${locale === "es" ? "" : locale + "/"}blog`,
      languages: {
        es: `${BASE_URL}/blog`,
        en: `${BASE_URL}/en/blog`,
      },
    },
    openGraph: {
      title: `Blog | FloreSiendo México`,
      description: t("hero_description"),
      url: `${BASE_URL}/${locale === "es" ? "" : locale + "/"}blog`,
      images: [
        {
          url: "/images/cosmic-spiritual-background.webp",
          width: 1200,
          height: 630,
          alt: "Blog FloreSiendo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | FloreSiendo México",
      description: t("hero_description"),
      images: ["/images/cosmic-spiritual-background.webp"],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, tCommon] = await Promise.all([
    getTranslations({ locale, namespace: "blog" }),
    getTranslations({ locale, namespace: "common" }),
  ]);

  const [{ posts, total }, categories] = await Promise.all([
    getBlogPosts({ limit: 12, locale }),
    getBlogCategories(locale),
  ]);

  return (
    <main>
      {/* Structured Data */}
      <JsonLd
        data={getBreadcrumbSchema([
          { name: t("breadcrumb_home"), url: BASE_URL },
          { name: t("breadcrumb_blog"), url: `${BASE_URL}/blog` },
        ])}
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/cosmic-spiritual-background.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy/80 via-burgundy/70 to-burgundy" />

        <div className="relative z-10 section-container text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            {t("hero_title_start")} <span className="text-coral">{t("hero_title_highlight")}</span>
          </h1>
          <p className="text-xl text-coral-light/90 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {t("hero_description")}
          </p>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-6 bg-warm-gray-50 border-b border-warm-gray-100">
          <div className="section-container">
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/blog"
                className="px-4 py-2 bg-burgundy text-white rounded-full text-sm font-medium"
              >
                {tCommon("all")}
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog/categoria/${encodeURIComponent(category.toLowerCase())}`}
                  className="px-4 py-2 bg-white text-warm-gray-600 rounded-full text-sm font-medium hover:bg-coral/10 hover:text-coral transition-colors border border-warm-gray-200"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-burgundy mb-4">
                {t("coming_soon_title")}
              </h2>
              <p className="text-warm-gray-600 max-w-lg mx-auto mb-8">
                {t("coming_soon_description")}
              </p>
              <Link
                href="/encuentros"
                className="inline-flex items-center gap-2 px-6 py-3 bg-coral text-white rounded-full font-semibold hover:bg-coral-dark transition-colors"
              >
                {tCommon("view_upcoming")}
                <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-warm-gray-100"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {post.metadata.featured_image?.imgix_url ? (
                      <Image
                        src={post.metadata.featured_image.imgix_url}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-burgundy to-coral" />
                    )}
                    {post.metadata.category && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-burgundy text-xs font-semibold rounded-full">
                        {post.metadata.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-lg font-bold text-warm-gray-800 mb-2 group-hover:text-coral transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-warm-gray-600 text-sm mb-4 line-clamp-3">
                      {post.metadata.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-warm-gray-400 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(post.published_at || post.created_at, locale)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {getReadingTime(post.metadata.body || "")} {tCommon("min_read")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-b from-coral via-coral-dark to-burgundy text-white -mb-px">
        <div className="section-container text-center">
          <h2 className="text-white mb-6">
            {t("cta_title")}
          </h2>
          <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg">
            {t("cta_description")}
          </p>
          <Link
            href="/encuentros"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold bg-white text-coral hover:bg-warm-gray-50 rounded-full shadow-xl hover:scale-105 transition-all duration-300"
          >
            {tCommon("view_upcoming")}
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
