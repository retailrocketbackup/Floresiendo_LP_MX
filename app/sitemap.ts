import type { MetadataRoute } from "next";
import { encuentros } from "@/lib/encuentros-data";
import { getBlogPosts } from "@/lib/cosmic";

const BASE_URL = "https://escuelafloresiendomexico.com";

function bilingualEntry(
  path: string,
  options: {
    lastModified: Date;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }
): MetadataRoute.Sitemap[number] {
  const esUrl = path === "/" ? BASE_URL : `${BASE_URL}${path}`;
  const enUrl = path === "/" ? `${BASE_URL}/en` : `${BASE_URL}/en${path}`;

  return {
    url: esUrl,
    lastModified: options.lastModified,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: {
        es: esUrl,
        en: enUrl,
      },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages (bilingual)
  const staticPages: MetadataRoute.Sitemap = [
    bilingualEntry("/", { lastModified: now, changeFrequency: "weekly", priority: 1.0 }),
    bilingualEntry("/encuentros", { lastModified: now, changeFrequency: "weekly", priority: 0.9 }),
    bilingualEntry("/escuela", { lastModified: now, changeFrequency: "monthly", priority: 0.8 }),
    bilingualEntry("/practicas-ancestrales", { lastModified: now, changeFrequency: "monthly", priority: 0.8 }),
    bilingualEntry("/contacto", { lastModified: now, changeFrequency: "monthly", priority: 0.7 }),
    bilingualEntry("/blog", { lastModified: now, changeFrequency: "weekly", priority: 0.7 }),
    bilingualEntry("/politica-privacidad", { lastModified: now, changeFrequency: "yearly", priority: 0.3 }),
    bilingualEntry("/terminos-condiciones", { lastModified: now, changeFrequency: "yearly", priority: 0.3 }),
  ];

  // Dynamic encuentro pages (bilingual)
  const encuentroPages: MetadataRoute.Sitemap = encuentros
    .filter((e) => e.status === "upcoming")
    .map((encuentro) =>
      bilingualEntry(`/encuentros/${encuentro.slug}`, {
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      })
    );

  // Dynamic blog posts from CosmicJS (per locale)
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const [{ posts: esPosts }, { posts: enPosts }] = await Promise.all([
      getBlogPosts({ limit: 100, locale: "es" }),
      getBlogPosts({ limit: 100, locale: "en" }),
    ]);
    const esEntries = esPosts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.modified_at || post.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
    const enEntries = enPosts.map((post) => ({
      url: `${BASE_URL}/en/blog/${post.slug}`,
      lastModified: new Date(post.modified_at || post.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
    blogPages = [...esEntries, ...enEntries];
  } catch {
    // Graceful degradation if CosmicJS is unavailable
  }

  return [...staticPages, ...encuentroPages, ...blogPages];
}
