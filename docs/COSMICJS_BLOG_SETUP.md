# FloreSiendo — CosmicJS Blog & SEO/GEO Setup

## Overview

FloreSiendo uses **CosmicJS** as headless CMS for blog content, testimonials, and FAQs. The site also implements comprehensive SEO and GEO (Generative Engine Optimization) to drive traffic from both traditional search engines and AI platforms.

---

## CosmicJS Configuration

### Credentials (in `.env.local` + Vercel)
```
COSMIC_BUCKET_SLUG=blog-floresiendo-production
COSMIC_READ_KEY=<in .env.local>
COSMIC_WRITE_KEY=<in .env.local>
```

### Content Models (Object Types)

#### 1. Blog Posts (`blog-posts`)
| Metafield | Type | Key | Purpose |
|-----------|------|-----|---------|
| Excerpt | Text Area | `excerpt` | Card preview + meta |
| Body | Rich Text | `body` | Full article HTML |
| Featured Image | Image | `featured_image` | Hero + OG image |
| Author | Single Object → Authors | `author` | Author bio card |
| Category | Text Input | `category` | Filtering + URL |
| Tags | Text Input | `tags` | Comma-separated |
| Meta Title | Text Input | `meta_title` | SEO `<title>` override |
| Meta Description | Text Area | `meta_description` | SEO meta description |
| OG Image | Image | `og_image` | Social sharing override |
| Canonical URL | Text Input | `canonical_url` | Canonical link |
| Answer Nugget | Text Area | `answer_nugget` | GEO: 40-60 word direct answer for AI |
| Key Statistics | Rich Text | `key_statistics` | GEO: data points for AI citations |
| Expert Quotes | Rich Text | `expert_quotes` | GEO: authority signals |

#### 2. Authors (`authors`)
| Metafield | Type | Key |
|-----------|------|-----|
| Bio | Text Area | `bio` |
| Avatar | Image | `avatar` |
| Credentials | Text Input | `credentials` |
| Social Links | Text Input | `social_links` |

#### 3. Testimonials (`testimonials`)
| Metafield | Type | Key |
|-----------|------|-----|
| Participant Name | Text Input | `participant_name` |
| Quote | Text Area | `quote` |
| Rating | Number | `rating` |
| Date | Text Input | `date` |
| Retreat Name | Text Input | `retreat_name` |

#### 4. FAQs (`faqs`)
| Metafield | Type | Key |
|-----------|------|-----|
| Question | Text Input | `question` |
| Answer | Text Area | `answer` |
| Category | Text Input | `category` |
| Sort Order | Number | `sort_order` |

---

## Blog Routes

| Route | File | Purpose |
|-------|------|---------|
| `/blog` | `app/(site)/blog/page.tsx` | Listing with category filter |
| `/blog/[slug]` | `app/(site)/blog/[slug]/page.tsx` | Individual article |
| `/blog/categoria/[category]` | `app/(site)/blog/categoria/[category]/page.tsx` | Category page |

All blog routes use **ISR** with `revalidate = 3600` (1 hour). After publishing in CosmicJS, content goes live within 1 hour without redeploy.

---

## SEO Implementation

### Files Created/Modified

| File | What it does |
|------|-------------|
| `app/robots.ts` | AI crawler permissions (ChatGPT, Perplexity, Claude, Google AI, Apple) |
| `app/sitemap.ts` | Dynamic sitemap with all public routes + encuentros |
| `public/llms.txt` | Markdown file for AI systems (llmstxt.org spec) |
| `lib/structured-data.tsx` | JSON-LD schema generators |
| `app/layout.tsx` | Organization + LocalBusiness + WebSite schemas, full OG/Twitter meta |

### Structured Data Schemas

| Schema | Where | Purpose |
|--------|-------|---------|
| Organization | `layout.tsx` (site-wide) | Brand identity for Google |
| LocalBusiness | `layout.tsx` (site-wide) | Wellness center with rating, geo, price |
| WebSite | `layout.tsx` (site-wide) | Sitelinks search box |
| Event | `encuentros/[slug]/page.tsx` | Each retreat as Google Event |
| FAQPage | `(site)/page.tsx` | Homepage FAQs in rich results |
| BreadcrumbList | Multiple pages | Navigation trail in SERPs |
| Article | `blog/[slug]/page.tsx` | Blog post rich results |

### OG Meta Tags

All site pages have complete `openGraph` and `twitter` metadata:
- `/` (home)
- `/encuentros`
- `/encuentros/[slug]`
- `/escuela`
- `/practicas-ancestrales`
- `/contacto`
- `/blog`
- `/blog/[slug]`
- `/blog/categoria/[category]`

---

## GEO (Generative Engine Optimization)

### What is GEO?
Optimization for AI platforms (ChatGPT/SearchGPT, Google AI Overviews, Perplexity, Claude) to cite FloreSiendo in their answers.

### Implementation

1. **llms.txt** — AI-readable site summary at `/llms.txt`
2. **AI crawler access** — robots.txt explicitly allows OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-Web, Google-Extended, Applebot-Extended
3. **Answer Nuggets** — 40-60 word direct answers in blog posts (rendered as highlighted block)
4. **Key Statistics** — Cited data points per article
5. **Expert Quotes** — Named quotes with credentials
6. **Structured Data** — JSON-LD on every page
7. **FAQ Schema** — Questions that match "People Also Ask" queries

### Blog Post GEO Checklist
When creating a new blog post in CosmicJS:
- [ ] Write an `answer_nugget` (40-60 words) that directly answers the main query
- [ ] Include 1 statistic per ~200 words in the body
- [ ] Include at least 1 expert quote with name + credentials
- [ ] Fill `key_statistics` field with bullet list of data points
- [ ] Fill `expert_quotes` field with cited quotes
- [ ] Use comparison tables where relevant (AI systems extract tables)
- [ ] Add internal links to `/encuentros`, `/practicas-ancestrales`, `/escuela`, `/contacto`
- [ ] Set `meta_title` (max 60 chars) and `meta_description` (max 155 chars)

---

## API Layer

**File:** `lib/cosmic.ts`

### Available Functions
```typescript
getBlogPosts(options?)        // List posts, optional category filter + pagination
getBlogPost(slug)             // Single post by slug
getBlogPostSlugs()            // All slugs (for generateStaticParams)
getBlogCategories()           // Unique categories from all posts
getBlogPostsByCategory(cat)   // Posts filtered by category
getTestimonials(limit?)       // Testimonials list
getFAQs(category?)            // FAQs, optional category filter
getReadingTime(text)          // Reading time in minutes
formatDate(dateString)        // Spanish-formatted date
```

### Graceful Degradation
If CosmicJS credentials are missing or the API is down, all functions return empty arrays/null. The site still renders — blog pages show "Próximamente" state.

---

## Deployment

1. CosmicJS env vars must be in **Vercel** (Settings → Environment Variables)
2. After adding/editing content in CosmicJS, it appears on site within 1 hour (ISR)
3. To force immediate update: trigger redeploy in Vercel
4. Image domains `*.cosmicjs.com` and `imgix.cosmicjs.com` are configured in `next.config.mjs`

---

## Verification Checklist

After deploying:
- [ ] `/robots.txt` — verify AI crawler rules
- [ ] `/sitemap.xml` — verify all routes present
- [ ] `/llms.txt` — verify accessible
- [ ] Google Rich Results Test — test homepage + encuentro page + blog post
- [ ] Facebook Sharing Debugger — test OG tags
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Test blog renders with CosmicJS content
