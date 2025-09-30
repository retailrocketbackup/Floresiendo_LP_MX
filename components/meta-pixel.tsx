"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { pageview } from "@/lib/meta-pixel"

export function MetaPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

  useEffect(() => {
    // Track pageview on route change
    pageview()
  }, [pathname, searchParams])

  useEffect(() => {
    console.log("[v0] META_PIXEL_ID:", META_PIXEL_ID)
  }, [META_PIXEL_ID])

  if (!META_PIXEL_ID) {
    console.error("[Meta Pixel] - Missing NEXT_PUBLIC_META_PIXEL_ID environment variable")
    return null
  }

  const pixelScript = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `

  return (
    <>
      {/* Meta Pixel Base Code */}
      <Script
        id="meta-pixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: pixelScript,
        }}
      />

      {/* Meta Pixel Noscript Fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
