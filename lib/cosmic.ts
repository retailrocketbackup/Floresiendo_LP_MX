// lib/cosmic.ts
// CosmicJS headless CMS client + typed fetchers

import { createBucketClient } from "@cosmicjs/sdk";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface CosmicBlogPost {
  id: string;
  slug: string;
  title: string;
  metadata: {
    excerpt: string;
    body: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: {
      id: string;
      slug: string;
      title: string;
      metadata: {
        bio?: string;
        avatar?: {
          url: string;
          imgix_url: string;
        };
        credentials?: string;
      };
    };
    category?: string;
    tags?: string;
    locale?: string;
    // SEO fields
    meta_title?: string;
    meta_description?: string;
    og_image?: {
      url: string;
      imgix_url: string;
    };
    canonical_url?: string;
    // GEO fields
    answer_nugget?: string;
    key_statistics?: string;
    expert_quotes?: string;
  };
  created_at: string;
  modified_at: string;
  published_at: string;
  status: string;
}

export interface CosmicAuthor {
  id: string;
  slug: string;
  title: string;
  metadata: {
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    credentials?: string;
    social_links?: string;
  };
}

export interface CosmicTestimonial {
  id: string;
  slug: string;
  title: string;
  metadata: {
    participant_name: string;
    quote: string;
    rating?: number;
    date?: string;
    retreat_name?: string;
  };
}

export interface CosmicFAQ {
  id: string;
  slug: string;
  title: string;
  metadata: {
    question: string;
    answer: string;
    category?: string;
    sort_order?: number;
  };
}

// ─── Client Initialization ──────────────────────────────────────────────────

function getCosmicClient() {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG;
  const readKey = process.env.COSMIC_READ_KEY;

  if (!bucketSlug || !readKey) {
    return null;
  }

  return createBucketClient({
    bucketSlug,
    readKey,
  });
}

// ─── Blog Post Fetchers ─────────────────────────────────────────────────────

export async function getBlogPosts(options?: {
  limit?: number;
  skip?: number;
  category?: string;
  locale?: string;
}): Promise<{ posts: CosmicBlogPost[]; total: number }> {
  const cosmic = getCosmicClient();
  if (!cosmic) {
    return { posts: [], total: 0 };
  }

  try {
    const query: Record<string, unknown> = {
      type: "blog-posts",
      status: "published",
    };

    if (options?.locale) {
      query["metadata.locale"] = options.locale;
    }

    if (options?.category) {
      query["metadata.category"] = options.category;
    }

    const data = await cosmic.objects
      .find(query)
      .props("id,slug,title,metadata,created_at,modified_at,published_at,status")
      .sort("-created_at")
      .limit(options?.limit || 10)
      .skip(options?.skip || 0);

    return {
      posts: (data.objects || []) as CosmicBlogPost[],
      total: data.total || 0,
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { posts: [], total: 0 };
  }
}

export async function getBlogPost(
  slug: string
): Promise<CosmicBlogPost | null> {
  const cosmic = getCosmicClient();
  if (!cosmic) {
    return null;
  }

  try {
    const data = await cosmic.objects
      .findOne({
        type: "blog-posts",
        slug,
      })
      .props("id,slug,title,metadata,created_at,modified_at,published_at,status");

    return (data.object as CosmicBlogPost) || null;
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}

export async function getBlogPostSlugs(locale?: string): Promise<string[]> {
  const cosmic = getCosmicClient();
  if (!cosmic) {
    return [];
  }

  try {
    const query: Record<string, unknown> = { type: "blog-posts", status: "published" };
    if (locale) {
      query["metadata.locale"] = locale;
    }
    const data = await cosmic.objects
      .find(query)
      .props("slug")
      .limit(100);

    return (data.objects || []).map(
      (obj: { slug: string }) => obj.slug
    );
  } catch (error) {
    console.error("Error fetching blog post slugs:", error);
    return [];
  }
}

// ─── Blog Categories ────────────────────────────────────────────────────────

export async function getBlogCategories(locale?: string): Promise<string[]> {
  const { posts } = await getBlogPosts({ limit: 100, locale });
  const categories = new Set<string>();
  posts.forEach((post) => {
    if (post.metadata.category) {
      categories.add(post.metadata.category);
    }
  });
  return Array.from(categories).sort();
}

export async function getBlogPostsByCategory(
  category: string,
  options?: { limit?: number; skip?: number; locale?: string }
): Promise<{ posts: CosmicBlogPost[]; total: number }> {
  return getBlogPosts({ ...options, category });
}

// ─── Testimonials ───────────────────────────────────────────────────────────

export async function getTestimonials(
  limit = 10
): Promise<CosmicTestimonial[]> {
  const cosmic = getCosmicClient();
  if (!cosmic) {
    return [];
  }

  try {
    const data = await cosmic.objects
      .find({ type: "testimonials" })
      .props("id,slug,title,metadata")
      .sort("-created_at")
      .limit(limit);

    return (data.objects || []) as CosmicTestimonial[];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

// ─── FAQs ───────────────────────────────────────────────────────────────────

export async function getFAQs(
  category?: string
): Promise<CosmicFAQ[]> {
  const cosmic = getCosmicClient();
  if (!cosmic) {
    return [];
  }

  try {
    const query: Record<string, unknown> = { type: "faqs" };
    if (category) {
      query["metadata.category"] = category;
    }

    const data = await cosmic.objects
      .find(query)
      .props("id,slug,title,metadata")
      .sort("metadata.sort_order")
      .limit(50);

    return (data.objects || []) as CosmicFAQ[];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}

// ─── Helper: Decode HTML Entities ────────────────────────────────────────────

export function decodeHtmlEntities(text: string): string {
  if (!text) return "";
  // If content looks like escaped HTML (contains &lt; or &gt;), decode it
  if (!text.includes("&lt;") && !text.includes("&gt;")) return text;
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

// ─── Helper: Reading Time ───────────────────────────────────────────────────

export function getReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// ─── Helper: Format Date ────────────────────────────────────────────────────

export function formatDate(dateString: string, locale?: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === "en" ? "en-US" : "es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
