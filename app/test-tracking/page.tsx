"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { trackEvent } from "@/lib/meta-tracking"

export default function TestTrackingPage() {
  const [logs, setLogs] = useState<string[]>([])

  // Override console.log to capture logs
  const originalLog = console.log
  const originalError = console.error
  const originalWarn = console.warn

  const captureLog = (type: string, ...args: any[]) => {
    const message = `[${type}] ${args
      .map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)))
      .join(" ")}`

    setLogs((prev) => [...prev, message])

    // Still call original console methods
    if (type === "LOG") originalLog(...args)
    if (type === "ERROR") originalError(...args)
    if (type === "WARN") originalWarn(...args)
  }

  // Temporarily override console methods
  console.log = (...args) => captureLog("LOG", ...args)
  console.error = (...args) => captureLog("ERROR", ...args)
  console.warn = (...args) => captureLog("WARN", ...args)

  const runTest = async (testType: string) => {
    setLogs([])
    console.log(`🧪 Starting ${testType} test...`)

    try {
      switch (testType) {
        case "pixel-only":
          await trackEvent(
            "Lead",
            {
              funnel: "test_pixel_only",
              content_type: "test",
              email: "test@example.com",
            },
            {
              enableCAPI: false,
            },
          )
          break

        case "capi-only":
          await trackEvent(
            "Lead",
            {
              funnel: "test_capi_only",
              content_type: "test",
              email: "test@example.com",
            },
            {
              enableCAPI: true,
            },
          )
          break

        case "both":
          await trackEvent(
            "Lead",
            {
              funnel: "test_both",
              content_type: "test",
              email: "test@example.com",
              phone: "1234567890",
              first_name: "Test",
              last_name: "User",
            },
            {
              enableCAPI: true,
            },
          )
          break

        case "viewcontent":
          await trackEvent(
            "ViewContent",
            {
              funnel: "test_viewcontent",
              content_type: "video",
              content_name: "test_video",
            },
            {
              enableCAPI: true,
            },
          )
          break
      }

      console.log(`✅ ${testType} test completed`)
    } catch (error) {
      console.error(`❌ ${testType} test failed:`, error)
    }
  }

  const clearLogs = () => {
    setLogs([])
  }

  const checkPixelStatus = () => {
    console.log("🔍 Checking Meta Pixel status...")
    console.log("Window exists:", typeof window !== "undefined")
    console.log("fbq exists:", typeof window !== "undefined" && !!window.fbq)
    console.log("Current URL:", typeof window !== "undefined" ? window.location.href : "server-side")
    console.log("Cookies:", typeof window !== "undefined" ? document.cookie : "server-side")
    console.log("User Agent:", typeof window !== "undefined" ? navigator.userAgent : "server-side")
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>🧪 Meta Tracking Test Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Button onClick={() => runTest("pixel-only")} variant="outline">
                Test Pixel Only
              </Button>
              <Button onClick={() => runTest("capi-only")} variant="outline">
                Test CAPI Only
              </Button>
              <Button onClick={() => runTest("both")} variant="default">
                Test Both (Recommended)
              </Button>
              <Button onClick={() => runTest("viewcontent")} variant="secondary">
                Test ViewContent
              </Button>
              <Button onClick={checkPixelStatus} variant="secondary">
                Check Pixel Status
              </Button>
              <Button onClick={clearLogs} variant="destructive">
                Clear Logs
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📋 Debug Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <div className="text-gray-500">No logs yet. Click a test button to start.</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="mb-1 whitespace-pre-wrap">
                    {log}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📖 Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>1. Test Pixel Only:</strong> Tests only the client-side Meta Pixel
            </p>
            <p>
              <strong>2. Test CAPI Only:</strong> Tests only the server-side Conversions API
            </p>
            <p>
              <strong>3. Test Both:</strong> Tests both Pixel and CAPI with deduplication
            </p>
            <p>
              <strong>4. Test ViewContent:</strong> Tests ViewContent event type
            </p>
            <p>
              <strong>5. Check Pixel Status:</strong> Verifies if Meta Pixel is loaded correctly
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              After running tests, check Facebook Events Manager to see if events appear within 1-2 minutes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
