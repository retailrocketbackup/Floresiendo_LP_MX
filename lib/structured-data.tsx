// lib/structured-data.ts
// JSON-LD Structured Data generators for SEO & GEO

import type { Encuentro } from "./encuentros-data";

const BASE_URL = "https://escuelafloresiendomexico.com";

// ─── Organization Schema (site-wide) ────────────────────────────────────────
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FloreSiendo",
    alternateName: "Escuela FloreSiendo México",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo-floresiendo.webp`,
    description:
      "Escuela y centro de retiros de transformación personal con prácticas ancestrales en Morelos, México. Más de 10 años de experiencia.",
    foundingDate: "2015",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+52-618-230-1481",
      contactType: "customer service",
      availableLanguage: ["Spanish"],
      areaServed: "MX",
    },
    sameAs: [
      "https://www.facebook.com/FloreSiendoMexico",
      "https://www.instagram.com/floresiendomexico",
    ],
  };
}

// ─── LocalBusiness Schema (wellness retreat center) ─────────────────────────
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${BASE_URL}/#localbusiness`,
    name: "FloreSiendo — Retiros de Transformación Personal",
    description:
      "Centro de retiros de transformación personal y escuela de facilitadores. Ofrecemos retiros de 3 noches con prácticas ancestrales, ceremonias tradicionales e integración terapéutica en Morelos, México.",
    url: BASE_URL,
    telephone: "+52-618-230-1481",
    image: `${BASE_URL}/images/venue-alberca.webp`,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Morelos",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 18.9,
      longitude: -99.2,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "120",
      bestRating: "5",
    },
  };
}

// ─── Event Schema (per retreat/encuentro) ───────────────────────────────────
export function getEventSchema(encuentro: Encuentro, locale?: string) {
  const isEn = locale === 'en';
  const prefix = isEn ? '/en' : '';
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${encuentro.title} — FloreSiendo`,
    description: encuentro.description,
    url: `${BASE_URL}${prefix}/encuentros/${encuentro.slug}`,
    image: `${BASE_URL}/images/venue-alberca.webp`,
    startDate: encuentro.startDate,
    endDate: encuentro.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus:
      encuentro.status === "upcoming"
        ? "https://schema.org/EventScheduled"
        : encuentro.status === "full"
          ? "https://schema.org/EventMovedOnline"
          : "https://schema.org/EventCancelled",
    location: {
      "@type": "Place",
      name: encuentro.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Morelos",
        addressCountry: "MX",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "FloreSiendo",
      url: BASE_URL,
    },
    performer: encuentro.facilitators.map((f) => ({
      "@type": "Person",
      name: f.name,
      jobTitle: f.role,
    })),
    offers: {
      "@type": "AggregateOffer",
      availability:
        encuentro.spotsRemaining > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      priceCurrency: "MXN",
      lowPrice: "7100",
      highPrice: "10200",
      offerCount: encuentro.spotsRemaining,
      url: `${BASE_URL}${prefix}/encuentros/${encuentro.slug}`,
    },
    maximumAttendeeCapacity: encuentro.spotsTotal,
    remainingAttendeeCapacity: encuentro.spotsRemaining,
    inLanguage: isEn ? "en-US" : "es-MX",
    typicalAgeRange: "18+",
  };
}

// ─── FAQPage Schema ─────────────────────────────────────────────────────────
export interface FAQItem {
  question: string;
  answer: string;
}

export function getFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─── BreadcrumbList Schema ──────────────────────────────────────────────────
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── WebSite Schema (for sitelinks search box) ─────────────────────────────
export function getWebSiteSchema(locale?: string) {
  const isEn = locale === 'en';
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FloreSiendo",
    alternateName: isEn ? "FloreSiendo Mexico School" : "Escuela FloreSiendo México",
    url: BASE_URL,
    inLanguage: isEn ? "en-US" : "es-MX",
    description: isEn
      ? "Personal transformation retreats and facilitator school with ancestral practices in Morelos, Mexico."
      : "Retiros de transformación personal y escuela de facilitadores con prácticas ancestrales en Morelos, México.",
  };
}

// ─── Blog Article Schema ────────────────────────────────────────────────────
export interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  image?: string;
  locale?: string;
}

export function getArticleSchema(article: ArticleSchemaProps) {
  const isEn = article.locale === 'en';
  const prefix = isEn ? '/en' : '';
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${BASE_URL}${prefix}/blog/${article.slug}`,
    image: article.image || `${BASE_URL}/images/cosmic-spiritual-background.webp`,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Person",
      name: article.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "FloreSiendo",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo-floresiendo.webp`,
      },
    },
    inLanguage: isEn ? "en-US" : "es-MX",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${prefix}/blog/${article.slug}`,
    },
  };
}

// ─── Helper: Render JSON-LD as script tag ───────────────────────────────────
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
