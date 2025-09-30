"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

interface MetaPixelInitProps {
  pixelId: string
}

export function MetaPixelInit({ pixelId }: MetaPixelInitProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize pixel on mount
  useEffect(() => {
    const initPixel = () => {
      if (typeof window !== "undefined" && window.fbq && pixelId) {
        console.log("[v0] Initializing Meta Pixel with ID:", pixelId)
        window.fbq("init", pixelId)
        window.fbq("track", "PageView")
      } else {
        // Retry if fbq is not ready yet
        setTimeout(initPixel, 100)
      }
    }

    initPixel()
  }, [pixelId])

  // Track page views on route changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      console.log("[v0] Tracking PageView for:", pathname)
      window.fbq("track", "PageView")
    }
  }, [pathname, searchParams])

  return null
}
