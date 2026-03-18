// app/layout.tsx — Minimal root layout (locale-specific content in [locale]/layout.tsx)

import type React from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
