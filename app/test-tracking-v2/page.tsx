"use client"

import { trackViewContent, trackLead, trackPageView } from "@/lib/meta-tracking-v2"
import { useState } from "react"

export default function TestTrackingV2() {
  const [results, setResults] = useState<string[]>([])

  const addResult = (message: string) => {
    setResults((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testViewContent = async () => {
    addResult("Testing ViewContent...")
    try {
      await trackViewContent({
        funnel: "test",
        source: "test_page",
        content_type: "video",
        content_name: "test_video",
      })
      addResult("✅ ViewContent test completed")
    } catch (error) {
      addResult(`❌ ViewContent error: ${error}`)
    }
  }

  const testLead = async () => {
    addResult("Testing Lead...")
    try {
      await trackLead(
        {
          email: "test@example.com",
          phone: "+1234567890",
          first_name: "Test",
          last_name: "User",
        },
        {
          funnel: "test",
          source: "test_page",
        },
      )
      addResult("✅ Lead test completed")
    } catch (error) {
      addResult(`❌ Lead error: ${error}`)
    }
  }

  const testPageView = async () => {
    addResult("Testing PageView...")
    try {
      await trackPageView()
      addResult("✅ PageView test completed")
    } catch (error) {
      addResult(`❌ PageView error: ${error}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Meta Tracking V2 - Test Page</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button onClick={testViewContent} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Test ViewContent
            </button>
            <button onClick={testLead} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Test Lead
            </button>
            <button onClick={testPageView} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Test PageView
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <div className="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-gray-500">No tests run yet...</p>
            ) : (
              results.map((result, index) => (
                <div key={index} className="mb-2 font-mono text-sm">
                  {result}
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => setResults([])}
            className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Clear Results
          </button>
        </div>
      </div>
    </div>
  )
}
