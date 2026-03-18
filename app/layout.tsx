// app/layout.tsx — Root layout providing HTML shell for ALL routes

import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"

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
    "Retiros de transformación personal con prácticas ancestrales en Morelos, México. +10 años de experiencia, +1,000 participantes.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
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
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
