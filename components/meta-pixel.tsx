"use client"

import { useEffect, useState } from "react"

declare global {
  interface Window {
    fbq: any
  }
}

interface MetaPixelProps {
  pixelId: string
}

export default function MetaPixel({ pixelId }: MetaPixelProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!pixelId) {
      setError("No pixel ID provided")
      return
    }

    // Check if already loaded
    if (window.fbq) {
      console.log("[MetaPixel] Already loaded, initializing with ID:", pixelId)
      window.fbq("init", pixelId)
      window.fbq("track", "PageView")
      setIsLoaded(true)
      return
    }

    // Load Facebook Pixel script
    const script = document.createElement("script")
    script.async = true
    script.src = "https://connect.facebook.net/en_US/fbevents.js"

    script.onload = () => {
      try {
        // Initialize fbq function
        window.fbq =
          window.fbq ||
          (() => {
            ;(window.fbq.q = window.fbq.q || []).push(arguments)
          })
        window.fbq.l = +new Date()

        // Initialize pixel
        window.fbq("init", pixelId)
        window.fbq("track", "PageView")

        console.log("[MetaPixel] Successfully initialized with ID:", pixelId)
        setIsLoaded(true)
        setError(null)
      } catch (err) {
        console.error("[MetaPixel] Initialization error:", err)
        setError("Failed to initialize pixel")
      }
    }

    script.onerror = () => {
      console.error("[MetaPixel] Failed to load Facebook script")
      setError("Failed to load Facebook script")
    }

    // Add script to document
    document.head.appendChild(script)

    // Cleanup function
    return () => {
      // Don't remove script on unmount to avoid re-loading
    }
  }, [pixelId])

  // This component doesn't render anything visible
  return null
}
