// app/layout.tsx

import type React from "react"
import type { Metadata } from "next"
import { RocknRoll_One } from "next/font/google"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const rocknrollOne = RocknRoll_One({
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  title: "FloreSiendo - Retiros y Escuela donde la maestra es el Amor",
  description: "Descubre tu potencial interior con nuestros retiros de transformación personal",
  generator: "v0.app",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
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
