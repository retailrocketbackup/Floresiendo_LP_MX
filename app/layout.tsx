import type React from "react"
import type { Metadata } from "next"
import { RocknRoll_One } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const rocknrollOne = RocknRoll_One({
  subsets: ["latin"],
  weight: "400", // RocknRoll One only has one weight
})

export const metadata: Metadata = {
  title: "FloreSiendo - Retiros de Transformación",
  description: "Descubre tu potencial interior con nuestros retiros de transformación personal",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${rocknrollOne.className}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
