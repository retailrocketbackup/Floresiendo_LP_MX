import type React from "react"
import type { Metadata } from "next"
import { RocknRoll_One } from "next/font/google"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"
import Script from 'next/script'
import "./globals.css"

const rocknrollOne = RocknRoll_One({
  subsets: ["latin"],
  weight: "400",
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
      <head>
        {/* -- 2. Pega el código base del Píxel de Meta aquí -- */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function (f, b, e, v, n, t, s) {
              if (f.fbq) return;
              n = f.fbq = function () {
                n.callMethod ?
                  n.callMethod.apply(n, arguments) : n.queue.push(arguments)
              };
              if (!f._fbq) f._fbq = n;
              n.push = n;
              n.loaded = !0;
              n.version = '2.0';
              n.queue = [];
              t = b.createElement(e);
              t.async = !0;
              t.src = v;
              s = b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t, s)
            }(window, document, 'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1500366924641250');
              fbq('track', 'PageView');
            `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display: 'none'}}
               src="https://www.facebook.com/tr?id=1500366924641250&ev=PageView&noscript=1"
        /></noscript>
        {/* -- Fin del código del Píxel -- */}
      </head>
      <body className={`font-sans ${rocknrollOne.className}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
