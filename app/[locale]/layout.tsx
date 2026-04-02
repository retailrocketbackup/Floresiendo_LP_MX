// app/[locale]/layout.tsx — Locale-aware nested layout (i18n provider + metadata)
// HTML shell (<html>, <body>) is provided by root layout.tsx

import type React from "react"
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getWebSiteSchema,
  JsonLd,
} from "@/lib/structured-data"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'

  return {
    title: {
      default: isEn
        ? "FloreSiendo — Personal Transformation Retreats in Mexico"
        : "FloreSiendo — Retiros de Transformación Personal en México",
      template: isEn ? "%s | FloreSiendo Mexico" : "%s | FloreSiendo México",
    },
    description: isEn
      ? "Personal transformation retreats with ancestral practices in Morelos, Mexico. 10+ years of experience, 1,000+ participants. Intimate groups of 15 people max."
      : "Retiros de transformación personal con prácticas ancestrales en Morelos, México. +10 años de experiencia, +1,000 participantes. Grupos de máximo 15 personas.",
    keywords: isEn
      ? [
          "transformation retreat Mexico",
          "spiritual retreat Morelos",
          "meditation retreat Mexico",
          "personal transformation retreat",
          "ancestral ceremonies Mexico",
          "retreat near Mexico City",
          "facilitator school Mexico",
          "spiritual retreat 2026",
        ]
      : [
          "retiro de transformación México",
          "retiro espiritual Morelos",
          "retiro de meditación México",
          "retiro transformación personal",
          "ceremonias ancestrales México",
          "retiro cerca de CDMX",
          "escuela de facilitadores México",
          "retiro espiritual 2026",
        ],
    authors: [{ name: "FloreSiendo" }],
    creator: "FloreSiendo",
    publisher: "FloreSiendo",
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "es_MX",
      alternateLocale: isEn ? "es_MX" : "en_US",
      url: isEn
        ? "https://escuelafloresiendomexico.com/en"
        : "https://escuelafloresiendomexico.com",
      siteName: "FloreSiendo",
      title: isEn
        ? "FloreSiendo — Personal Transformation Retreats in Mexico"
        : "FloreSiendo — Retiros de Transformación Personal en México",
      description: isEn
        ? "Personal transformation retreats with ancestral practices in Morelos, Mexico. 10+ years of experience, 1,000+ participants."
        : "Retiros de transformación personal con prácticas ancestrales en Morelos, México. +10 años de experiencia, +1,000 participantes.",
      images: [
        {
          url: "/images/venue-alberca.webp",
          width: 1200,
          height: 630,
          alt: isEn
            ? "FloreSiendo Sanctuary in Morelos, Mexico"
            : "Santuario FloreSiendo en Morelos, México",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn
        ? "FloreSiendo — Personal Transformation Retreats in Mexico"
        : "FloreSiendo — Retiros de Transformación Personal en México",
      description: isEn
        ? "Personal transformation retreats with ancestral practices in Morelos, Mexico."
        : "Retiros de transformación personal con prácticas ancestrales en Morelos, México.",
      images: ["/images/venue-alberca.webp"],
    },
    alternates: {
      canonical: isEn
        ? "https://escuelafloresiendomexico.com/en"
        : "https://escuelafloresiendomexico.com",
      languages: {
        'es': "https://escuelafloresiendomexico.com",
        'en': "https://escuelafloresiendomexico.com/en",
        'x-default': "https://escuelafloresiendomexico.com",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* Structured Data (JSON-LD) */}
      <JsonLd data={getOrganizationSchema(locale)} />
      <JsonLd data={getLocalBusinessSchema(locale)} />
      <JsonLd data={getWebSiteSchema(locale)} />
      {children}
    </NextIntlClientProvider>
  )
}
