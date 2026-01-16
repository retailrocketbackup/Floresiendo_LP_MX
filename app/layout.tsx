// app/layout.tsx

import type React from "react"
import type { Metadata } from "next"
import { RocknRoll_One } from "next/font/google"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"
import "./globals.css"

const rocknrollOne = RocknRoll_One({
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  title: "FloreSiendo - Retiros y Escuela donde la maestra es el Amor",
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
        {/* -- Facebook Domain Verification -- */}
        <meta name="facebook-domain-verification" content="mmdw3nkuclo02a7bnon1g57cmuco52" />

        {/* -- Píxel de Meta con carga perezosa -- */}
        <Script id="meta-pixel" strategy="lazyOnload">
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
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        {/* -- Fin del código del Píxel -- */}

        {/* -- HubSpot/Hotjar con carga perezosa -- */}
        <Script id="hubspot-tracking" strategy="lazyOnload">
          {`
            (function(h,u,b,s,p,o,t){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:6538146,hjsv:6};
              o=u.createElement(b);o.async=1;
              o.src=s+h._hjSettings.hjid+t+h._hjSettings.hjsv;
              p=u.getElementsByTagName(b)[0];
              p.parentNode.insertBefore(o,p);
            })(window,document,'script','https://static.hotjar.com/c/hotjar-','.js?sv=');

            var _hsq = _hsq || [];
            _hsq.push(['setPortalId', 50499487]);
            (function(d,s,i,r) {
              if (d.getElementById(i)){return;}
              var n = d.createElement(s),e = d.getElementsByTagName(s)[0];
              n.id=i;n.src='//js.hs-analytics.net/analytics/'+(Math.ceil(new Date()/r)*r)+'/50499487.js';
              e.parentNode.insertBefore(n, e);
            })(document, "script", "hs-analytics", 300000);
          `}
        </Script>
        {/* -- Fin del código de HubSpot -- */}
      </head>
      <body className={`font-sans ${rocknrollOne.className}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
