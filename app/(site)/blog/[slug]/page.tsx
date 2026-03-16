import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { getBlogPost, getBlogPostSlugs, getReadingTime, formatDate } from "@/lib/cosmic";
import { JsonLd, getArticleSchema, getBreadcrumbSchema } from "@/lib/structured-data";

const BASE_URL = "https://escuelafloresiendomexico.com";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: "Artículo no encontrado" };
  }

  const title = post.metadata.meta_title || post.title;
  const description =
    post.metadata.meta_description || post.metadata.excerpt || "";
  const image =
    post.metadata.og_image?.imgix_url ||
    post.metadata.featured_image?.imgix_url ||
    "/images/cosmic-spiritual-background.webp";

  return {
    title,
    description,
    alternates: {
      canonical:
        post.metadata.canonical_url || `${BASE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.modified_at,
      authors: post.metadata.author
        ? [post.metadata.author.title]
        : ["FloreSiendo"],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const readingTime = getReadingTime(post.metadata.body || "");
  const authorName = post.metadata.author?.title || "FloreSiendo";
  const publishedDate = post.published_at || post.created_at;

  return (
    <main className="min-h-screen bg-warm-gray-50">
      {/* Structured Data */}
      <JsonLd
        data={getArticleSchema({
          title: post.title,
          description: post.metadata.excerpt || "",
          slug: post.slug,
          datePublished: publishedDate,
          dateModified: post.modified_at,
          authorName,
          image:
            post.metadata.featured_image?.imgix_url ||
            `${BASE_URL}/images/cosmic-spiritual-background.webp`,
        })}
      />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Inicio", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: post.title, url: `${BASE_URL}/blog/${post.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          {post.metadata.featured_image?.imgix_url ? (
            <Image
              src={post.metadata.featured_image.imgix_url}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-burgundy to-coral" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy/80 via-burgundy/70 to-burgundy" />
        </div>

        <div className="relative z-10 section-container text-white">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-coral-light hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Volver al blog
          </Link>

          {post.metadata.category && (
            <span className="inline-block px-3 py-1 bg-coral/20 text-coral-light rounded-full text-sm font-medium mb-4">
              {post.metadata.category}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-coral-light/80 text-sm">
            <span className="flex items-center gap-1.5">
              <User size={16} />
              {authorName}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={16} />
              {formatDate(publishedDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={16} />
              {readingTime} min de lectura
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Answer Nugget (GEO optimization) */}
          {post.metadata.answer_nugget && (
            <div className="bg-coral/5 border-l-4 border-coral p-6 rounded-r-xl mb-10">
              <p className="text-warm-gray-700 text-lg leading-relaxed font-medium">
                {post.metadata.answer_nugget}
              </p>
            </div>
          )}

          {/* Main content */}
          <article
            className="prose prose-lg prose-warm-gray max-w-none
              prose-headings:text-burgundy prose-headings:font-bold
              prose-a:text-coral prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl prose-img:shadow-lg
              prose-blockquote:border-l-coral prose-blockquote:bg-warm-gray-50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
              prose-strong:text-warm-gray-800
              prose-li:marker:text-coral"
            dangerouslySetInnerHTML={{ __html: post.metadata.body || "" }}
          />

          {/* Key Statistics (GEO) */}
          {post.metadata.key_statistics && (
            <div className="mt-10 bg-burgundy/5 p-6 rounded-2xl border border-burgundy/10">
              <h3 className="text-lg font-bold text-burgundy mb-3">
                Datos clave
              </h3>
              <div
                className="text-warm-gray-700 prose prose-sm"
                dangerouslySetInnerHTML={{
                  __html: post.metadata.key_statistics,
                }}
              />
            </div>
          )}

          {/* Expert Quotes (GEO) */}
          {post.metadata.expert_quotes && (
            <div className="mt-8 bg-gold/5 p-6 rounded-2xl border border-gold/10">
              <h3 className="text-lg font-bold text-burgundy mb-3">
                Opinión experta
              </h3>
              <div
                className="text-warm-gray-700 prose prose-sm"
                dangerouslySetInnerHTML={{
                  __html: post.metadata.expert_quotes,
                }}
              />
            </div>
          )}

          {/* Last Updated */}
          <p className="text-warm-gray-400 text-sm mt-10 pt-6 border-t border-warm-gray-200">
            Última actualización: {formatDate(post.modified_at)}
          </p>
        </div>
      </section>

      {/* Author Bio */}
      {post.metadata.author && (
        <section className="py-12 px-4 bg-warm-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-5 bg-white p-6 rounded-2xl shadow-sm border border-warm-gray-100">
              {post.metadata.author.metadata.avatar?.imgix_url && (
                <Image
                  src={post.metadata.author.metadata.avatar.imgix_url}
                  alt={post.metadata.author.title}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              )}
              <div>
                <p className="text-sm text-warm-gray-500 font-medium">
                  Escrito por
                </p>
                <h3 className="text-lg font-bold text-burgundy">
                  {post.metadata.author.title}
                </h3>
                {post.metadata.author.metadata.credentials && (
                  <p className="text-sm text-coral font-medium">
                    {post.metadata.author.metadata.credentials}
                  </p>
                )}
                {post.metadata.author.metadata.bio && (
                  <p className="text-warm-gray-600 text-sm mt-2">
                    {post.metadata.author.metadata.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-b from-coral via-coral-dark to-burgundy text-white -mb-px">
        <div className="section-container text-center">
          <h2 className="text-white mb-6">
            ¿Quieres vivir la experiencia?
          </h2>
          <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg">
            La transformación comienza cuando decides dar el primer paso.
            Conoce nuestros próximos retiros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/encuentros"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold bg-white text-coral hover:bg-warm-gray-50 rounded-full shadow-xl hover:scale-105 transition-all duration-300"
            >
              Ver próximos encuentros
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold bg-white/20 hover:bg-white/30 text-white border border-white/40 rounded-full transition-all duration-300 hover:scale-105"
            >
              Más artículos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
