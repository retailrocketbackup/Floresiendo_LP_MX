// app/layout.tsx

import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getWebSiteSchema,
  JsonLd,
} from "@/lib/structured-data"

const rocknrollOne = localFont({
  src: "../public/fonts/rocknroll-one-latin-400.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-rocknroll-one",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://escuelafloresiendomexico.com"),
  title: {
    default: "FloreSiendo — Retiros de Transformación Personal en México",
    template: "%s | FloreSiendo México",
  },
  description:
    "Retiros de transformación personal con prácticas ancestrales en Morelos, México. +10 años de experiencia, +1,000 participantes. Grupos de máximo 15 personas.",
  keywords: [
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
    locale: "es_MX",
    url: "https://escuelafloresiendomexico.com",
    siteName: "FloreSiendo",
    title: "FloreSiendo — Retiros de Transformación Personal en México",
    description:
      "Retiros de transformación personal con prácticas ancestrales en Morelos, México. +10 años de experiencia, +1,000 participantes.",
    images: [
      {
        url: "/images/venue-alberca.webp",
        width: 1200,
        height: 630,
        alt: "Santuario FloreSiendo en Morelos, México",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FloreSiendo — Retiros de Transformación Personal en México",
    description:
      "Retiros de transformación personal con prácticas ancestrales en Morelos, México.",
    images: ["/images/venue-alberca.webp"],
  },
  alternates: {
    canonical: "https://escuelafloresiendomexico.com",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        {/* -- Structured Data (JSON-LD) -- */}
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getLocalBusinessSchema()} />
        <JsonLd data={getWebSiteSchema()} />

        {/* -- Facebook Domain Verification -- */}
        <meta name="facebook-domain-verification" content="mmdw3nkuclo02a7bnon1g57cmuco52" />

        {/* -- Meta Pixel noscript fallback -- */}
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
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
