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

    const waitForFbq = (timeout = 10000): Promise<void> => {
      return new Promise((resolve, reject) => {
        const startTime = Date.now()

        const checkFbq = () => {
          if (window.fbq && typeof window.fbq === "function") {
            resolve()
          } else if (Date.now() - startTime > timeout) {
            reject(new Error("Timeout waiting for fbq"))
          } else {
            setTimeout(checkFbq, 100) // Check every 100ms
          }
        }

        checkFbq()
      })
    }

    // Check if already loaded
    if (window.fbq && typeof window.fbq === "function") {
      console.log("[MetaPixel] Already loaded, initializing with ID:", pixelId)
      window.fbq("init", pixelId)
      window.fbq("track", "PageView")
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
