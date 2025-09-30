import type React from "react"
import type { Metadata } from "next"
import { RocknRoll_One } from "next/font/google"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"
import { MetaPixel } from "@/components/meta-pixel"
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
        <MetaPixel />

        <Script id="hubspot-tracking" strategy="afterInteractive">
          {`
            (function(h,u,b,s,p,o,t){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:50499487,hjsv:6};
              o=u.createElement(b);o.async=1;
              o.src=s+h._hjSettings.hjid+t+h._hjSettings.hjsv;
              p=u.getElementsByTagName(b)[0];
              p.parentNode.insertBefore(o,p);
            })(window,document,'script','https://static.hotjar.com/c/hotjar-','.js?sv=');
            
            // HubSpot tracking code
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
