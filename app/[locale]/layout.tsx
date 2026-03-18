// app/[locale]/layout.tsx — Locale-aware root layout

import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getWebSiteSchema,
  JsonLd,
} from "@/lib/structured-data"

const rocknrollOne = localFont({
  src: "../../public/fonts/rocknroll-one-latin-400.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-rocknroll-one",
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'

  return {
    metadataBase: new URL("https://escuelafloresiendomexico.com"),
    title: {
      default: isEn
        ? "FloreSiendo — Personal Transformation Retreats in Mexico"
        : "FloreSiendo — Retiros de Transformaci\u00f3n Personal en M\u00e9xico",
      template: isEn ? "%s | FloreSiendo Mexico" : "%s | FloreSiendo M\u00e9xico",
    },
    description: isEn
      ? "Personal transformation retreats with ancestral practices in Morelos, Mexico. 10+ years of experience, 1,000+ participants. Intimate groups of 15 people max."
      : "Retiros de transformaci\u00f3n personal con pr\u00e1cticas ancestrales en Morelos, M\u00e9xico. +10 a\u00f1os de experiencia, +1,000 participantes. Grupos de m\u00e1ximo 15 personas.",
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
          "retiro de transformaci\u00f3n M\u00e9xico",
          "retiro espiritual Morelos",
          "retiro de meditaci\u00f3n M\u00e9xico",
          "retiro transformaci\u00f3n personal",
          "ceremonias ancestrales M\u00e9xico",
          "retiro cerca de CDMX",
          "escuela de facilitadores M\u00e9xico",
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
        : "FloreSiendo — Retiros de Transformaci\u00f3n Personal en M\u00e9xico",
      description: isEn
        ? "Personal transformation retreats with ancestral practices in Morelos, Mexico. 10+ years of experience, 1,000+ participants."
        : "Retiros de transformaci\u00f3n personal con pr\u00e1cticas ancestrales en Morelos, M\u00e9xico. +10 a\u00f1os de experiencia, +1,000 participantes.",
      images: [
        {
          url: "/images/venue-alberca.webp",
          width: 1200,
          height: 630,
          alt: isEn
            ? "FloreSiendo Sanctuary in Morelos, Mexico"
            : "Santuario FloreSiendo en Morelos, M\u00e9xico",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn
        ? "FloreSiendo — Personal Transformation Retreats in Mexico"
        : "FloreSiendo — Retiros de Transformaci\u00f3n Personal en M\u00e9xico",
      description: isEn
        ? "Personal transformation retreats with ancestral practices in Morelos, Mexico."
        : "Retiros de transformaci\u00f3n personal con pr\u00e1cticas ancestrales en Morelos, M\u00e9xico.",
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

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        {/* Structured Data (JSON-LD) */}
        <JsonLd data={getOrganizationSchema(locale)} />
        <JsonLd data={getLocalBusinessSchema(locale)} />
        <JsonLd data={getWebSiteSchema(locale)} />

        {/* Facebook Domain Verification */}
        <meta name="facebook-domain-verification" content="mmdw3nkuclo02a7bnon1g57cmuco52" />

        {/* Meta Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </head>
      <body className={`font-sans ${rocknrollOne.className}`}>
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
