import type { MetadataRoute } from "next";
import { encuentros } from "@/lib/encuentros-data";
import { getBlogPosts } from "@/lib/cosmic";

const BASE_URL = "https://escuelafloresiendomexico.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/encuentros`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/escuela`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/practicas-ancestrales`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/politica-privacidad`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terminos-condiciones`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic encuentro pages
  const encuentroPages: MetadataRoute.Sitemap = encuentros
    .filter((e) => e.status === "upcoming")
    .map((encuentro) => ({
      url: `${BASE_URL}/encuentros/${encuentro.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  // Dynamic blog posts from CosmicJS
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const { posts } = await getBlogPosts({ limit: 100 });
    blogPages = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.modified_at || post.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Graceful degradation if CosmicJS is unavailable
  }

  return [...staticPages, ...encuentroPages, ...blogPages];
}
