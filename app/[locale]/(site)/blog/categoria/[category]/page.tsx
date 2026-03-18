import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Clock, Calendar } from "lucide-react";
import {
  getBlogPostsByCategory,
  getBlogCategories,
  getReadingTime,
  formatDate,
} from "@/lib/cosmic";
import { JsonLd, getBreadcrumbSchema } from "@/lib/structured-data";

const BASE_URL = "https://escuelafloresiendomexico.com";

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getBlogCategories();
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const displayCategory =
    decodeURIComponent(category).charAt(0).toUpperCase() +
    decodeURIComponent(category).slice(1);

  return {
    title: `${displayCategory} — Blog FloreSiendo`,
    description: `Artículos sobre ${displayCategory.toLowerCase()} en el blog de FloreSiendo México. Guías, consejos y experiencias.`,
    alternates: {
      canonical: `${BASE_URL}/blog/categoria/${category}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const displayCategory =
    decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);

  const [{ posts }, categories] = await Promise.all([
    getBlogPostsByCategory(decodedCategory, { limit: 20 }),
    getBlogCategories(),
  ]);

  return (
    <main>
      {/* Structured Data */}
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Inicio", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          {
            name: displayCategory,
            url: `${BASE_URL}/blog/categoria/${category}`,
          },
        ])}
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/cosmic-spiritual-background.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy/80 via-burgundy/70 to-burgundy" />

        <div className="relative z-10 section-container text-center text-white">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-coral-light hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Todos los artículos
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {displayCategory}
          </h1>
          <p className="text-xl text-coral-light/90 max-w-2xl mx-auto">
            {posts.length} artículo{posts.length !== 1 ? "s" : ""} en esta
            categoría
          </p>
        </div>
      </section>

      {/* Categories Nav */}
      {categories.length > 0 && (
        <section className="py-6 bg-warm-gray-50 border-b border-warm-gray-100">
          <div className="section-container">
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/blog"
                className="px-4 py-2 bg-white text-warm-gray-600 rounded-full text-sm font-medium hover:bg-coral/10 hover:text-coral transition-colors border border-warm-gray-200"
              >
                Todos
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog/categoria/${encodeURIComponent(cat.toLowerCase())}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    cat.toLowerCase() === decodedCategory.toLowerCase()
                      ? "bg-burgundy text-white"
                      : "bg-white text-warm-gray-600 hover:bg-coral/10 hover:text-coral border border-warm-gray-200"
                  }`}
                >
                  {cat}
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
                Sin artículos aún
              </h2>
              <p className="text-warm-gray-600 mb-8">
                Próximamente publicaremos contenido en esta categoría.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-coral text-white rounded-full font-semibold hover:bg-coral-dark transition-colors"
              >
                Ver todos los artículos
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
                  </div>
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
                        {formatDate(post.published_at || post.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {getReadingTime(post.metadata.body || "")} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
