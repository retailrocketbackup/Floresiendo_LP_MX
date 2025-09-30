"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

interface MetaPixelInitProps {
  pixelId: string
}

export function MetaPixelInit({ pixelId }: MetaPixelInitProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      console.log("[v0] Tracking PageView for:", pathname)
      window.fbq("track", "PageView")
    }
  }, [pathname, searchParams])

  return null
}
