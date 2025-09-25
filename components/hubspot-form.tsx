"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/meta-tracking"

interface HubSpotFormProps {
  funnel?: string
}

export function HubSpotForm({ funnel = "unknown" }: HubSpotFormProps) {
  useEffect(() => {
    console.log('🔧 Loading HubSpot form for funnel:', funnel);

    const script = document.createElement("script")
    script.src = "https://js.hsforms.net/forms/embed/50499487.js"
    script.defer = true
    document.head.appendChild(script)

    // Track Lead event when form page loads (reliable approach)
    trackEvent('Lead', {
      funnel,
      content_type: 'form_page_view',
      content_name: `hubspot_form_${funnel}`,
    }, { enableCAPI: true });

    console.log('📋 Lead event tracked for form page view');

    return () => {
      const existingScript = document.querySelector('script[src="https://js.hsforms.net/forms/embed/50499487.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [funnel])

  return (
    <div className="w-full">
      <div
        className="hs-form-frame"
        data-region="na1"
        data-form-id="9ec9c638-6169-46b5-bf03-716245b5e62b"
        data-portal-id="50499487"
      />
    </div>
  )
}