"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"

interface MetaPixelProps {
  pixelId: string
}

export function MetaPixel({ pixelId }: MetaPixelProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isInitialized = useRef(false)

  useEffect(() => {
    // Track page views on route changes
    if (typeof window !== "undefined" && window.fbq && isInitialized.current) {
      console.log("[v0] Tracking PageView for:", pathname)
      window.fbq("track", "PageView")
    }
  }, [pathname, searchParams])

  if (!pixelId) {
    console.error("[Meta Pixel] - No Pixel ID provided")
    return null
  }

  const handleScriptLoad = () => {
    if (typeof window !== "undefined" && window.fbq && !isInitialized.current) {
      console.log("[v0] Initializing Meta Pixel with ID:", pixelId)
      window.fbq("init", pixelId)
      window.fbq("track", "PageView")
      isInitialized.current = true
    }
  }

  return (
    <>
      <Script
        id="meta-pixel-base"
        src="https://connect.facebook.net/en_US/fbevents.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />

      <Script id="meta-pixel-stub" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
        `}
      </Script>

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
