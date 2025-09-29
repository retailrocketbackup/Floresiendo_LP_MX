"use client"

import { useEffect, useState } from "react"

declare global {
  interface Window {
    fbq: any
    _fbPixelInitialized?: boolean
    _fbPixelScriptLoaded?: boolean
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

    if (window.fbq && typeof window.fbq === "function") {
      console.log("[MetaPixel] fbq already exists, initializing pixel only")

      if (!window._fbPixelInitialized) {
        window.fbq("init", pixelId)
        window.fbq("track", "PageView")
        window._fbPixelInitialized = true
        console.log("[MetaPixel] Successfully initialized with ID:", pixelId)
      }

      setIsLoaded(true)
      return
    }

    const existingScript = document.getElementById("facebook-pixel-script")
    if (existingScript || window._fbPixelScriptLoaded) {
      console.log("[MetaPixel] Script already loading/loaded, waiting for fbq")

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

      waitForFbq()
        .then(() => {
          if (!window._fbPixelInitialized) {
            window.fbq("init", pixelId)
            window.fbq("track", "PageView")
            window._fbPixelInitialized = true
            console.log("[MetaPixel] Successfully initialized with ID:", pixelId)
          }
          setIsLoaded(true)
        })
        .catch((err) => {
          console.error("[MetaPixel] Error waiting for fbq:", err)
          setError("Failed to initialize pixel")
        })

      return
    }

    window._fbPixelScriptLoaded = true

    if (!window.fbq) {
      window.fbq = () => {
        ;(window.fbq.q = window.fbq.q || []).push(arguments)
      }
      window.fbq.l = +new Date()
    }

    const script = document.createElement("script")
    script.id = "facebook-pixel-script"
    script.async = true
    script.src = "https://connect.facebook.net/en_US/fbevents.js"

    script.onload = () => {
      console.log("[MetaPixel] Script loaded successfully")

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

      waitForFbq()
        .then(() => {
          if (!window._fbPixelInitialized) {
            window.fbq("init", pixelId)
            window.fbq("track", "PageView")
            window._fbPixelInitialized = true
            console.log("[MetaPixel] Successfully initialized with ID:", pixelId)
          }
          setIsLoaded(true)
          setError(null)
        })
        .catch((err) => {
          console.error("[MetaPixel] Initialization error:", err)
          setError("Failed to initialize pixel")
        })
    }

    script.onerror = () => {
      console.error("[MetaPixel] Failed to load Facebook script")
      setError("Failed to load Facebook script")
      window._fbPixelScriptLoaded = false
    }

    document.head.appendChild(script)

    return () => {
      // Intentionally empty - preserve singleton state
    }
  }, [pixelId])

  return null
}
