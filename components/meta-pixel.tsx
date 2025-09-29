"use client"

import { useEffect, useState } from "react"

declare global {
  interface Window {
    fbq: any
    _fbPixelInitialized?: boolean
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

    if (window._fbPixelInitialized) {
      console.log("[MetaPixel] Already initialized, skipping")
      setIsLoaded(true)
      return
    }

    const waitForFbq = (timeout = 10000): Promise<void> => {
      return new Promise((resolve, reject) => {
        const startTime = Date.now()

        const checkFbq = () => {
          if (window.fbq && typeof window.fbq === "function") {
            resolve()
          } else if (Date.now() - startTime > timeout) {
            reject(new Error("Timeout waiting for fbq"))
          } else {
            setTimeout(checkFbq, 100)
          }
        }

        checkFbq()
      })
    }

    const existingScript = document.querySelector('script[src*="fbevents.js"]')

    if (existingScript && window.fbq && typeof window.fbq === "function") {
      console.log("[MetaPixel] Script already loaded, initializing once")

      if (!window._fbPixelInitialized) {
        window.fbq("init", pixelId)
        window.fbq("track", "PageView")
        window._fbPixelInitialized = true
        console.log("[MetaPixel] Successfully initialized with ID:", pixelId)
      }

      setIsLoaded(true)
      return
    }

    if (!window.fbq) {
      window.fbq = () => {
        ;(window.fbq.q = window.fbq.q || []).push(arguments)
      }
      window.fbq.l = +new Date()
    }

    // Load Facebook Pixel script
    const script = document.createElement("script")
    script.async = true
    script.src = "https://connect.facebook.net/en_US/fbevents.js"

    script.onload = async () => {
      try {
        await waitForFbq()

        if (!window._fbPixelInitialized) {
          window.fbq("init", pixelId)
          window.fbq("track", "PageView")
          window._fbPixelInitialized = true
          console.log("[MetaPixel] Successfully initialized with ID:", pixelId)
        }

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

    document.head.appendChild(script)

    return () => {
      // Intentionally empty - preserve singleton state
    }
  }, [pixelId])

  return null
}
