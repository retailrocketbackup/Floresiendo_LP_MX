// Meta Pixel and CAPI tracking utilities

declare global {
  interface Window {
    fbq: any
  }
}

export interface TrackingData {
  funnel: string
  content_type?: string
  content_name?: string
  currency?: string
  value?: number
  email?: string
  phone?: string
  first_name?: string
  last_name?: string
}

const generateEventId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Client-side Meta Pixel tracking
export const trackPixelEvent = (eventName: string, data: TrackingData) => {
  if (typeof window !== "undefined") {
    if (window.fbq) {
      const eventId = generateEventId()
      const eventData = {
        ...data,
        custom_data: {
          funnel: data.funnel,
          source: "floresiendo_lp",
        },
      }

      window.fbq("track", eventName, eventData, { eventID: eventId })
      console.log(`✅ PIXEL: ${eventName} tracked successfully`, {
        event: eventName,
        eventID: eventId,
        funnel: data.funnel,
        content_type: data.content_type,
        timestamp: new Date().toISOString(),
        data: eventData,
      })
    } else {
      console.warn(`⚠️ PIXEL: fbq not loaded - ${eventName} not tracked`, {
        event: eventName,
        funnel: data.funnel,
        message: "Meta Pixel script may not be loaded properly",
      })
    }
  } else {
    console.log(`🔧 PIXEL: Server-side environment detected - ${eventName} skipped`)
  }
}

// Standard funnel events
export const trackViewContent = (funnel: string, contentType: string) => {
  trackPixelEvent("ViewContent", {
    funnel,
    content_type: contentType,
    content_name: `${contentType}_${funnel}`,
  })
}

export const trackLead = (funnel: string, leadData?: Partial<TrackingData>) => {
  trackPixelEvent("Lead", {
    funnel,
    ...leadData,
  })
}

export const trackSchedule = (funnel: string) => {
  trackPixelEvent("Schedule", {
    funnel,
    content_type: "appointment",
    value: 0, // Free consultation
  })
}

// Server-side CAPI tracking function
export const trackCAPIEvent = async (eventName: string, data: TrackingData, userAgent?: string, ip?: string) => {
  console.log(`🚀 CAPI: Starting ${eventName} tracking...`, {
    event: eventName,
    funnel: data.funnel,
    content_type: data.content_type,
  })

  try {
    const eventId = generateEventId()
    const payload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: "website",
      user_data: {
        em: data.email ? normalizeEmail(data.email) : undefined,
        ph: data.phone ? normalizePhone(data.phone) : undefined,
        fn: data.first_name ? data.first_name.toLowerCase().trim() : undefined,
        ln: data.last_name ? data.last_name.toLowerCase().trim() : undefined,
        client_ip_address: ip,
        client_user_agent: userAgent,
      },
      custom_data: {
        funnel: data.funnel,
        content_type: data.content_type,
        content_name: data.content_name,
        currency: data.currency || "MXN",
        value: data.value,
        source: "floresiendo_lp",
      },
    }

    console.log(`📤 CAPI: Sending payload to /api/meta-capi`, payload)

    const response = await fetch("/api/meta-capi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error(`❌ CAPI: Request failed (${response.status})`, {
        status: response.status,
        statusText: response.statusText,
        error: result,
      })
      throw new Error(`CAPI request failed: ${response.statusText}`)
    }

    console.log(`✅ CAPI: ${eventName} tracked successfully`, {
      event: eventName,
      eventID: eventId,
      funnel: data.funnel,
      events_received: result.events_received,
      fbtrace_id: result.fbtrace_id,
      timestamp: new Date().toISOString(),
    })

    return result
  } catch (error) {
    console.error(`❌ CAPI: Tracking error for ${eventName}`, {
      event: eventName,
      funnel: data.funnel,
      error: error instanceof Error ? error.message : error,
      timestamp: new Date().toISOString(),
    })
    throw error
  }
}

// Hash functions for PII (required by Meta CAPI)
// Note: Actual hashing happens server-side for security
const normalizeEmail = (email: string): string => {
  return email.toLowerCase().trim()
}

const normalizePhone = (phone: string): string => {
  // Remove all non-digits
  return phone.replace(/\D/g, "")
}

// Combined tracking function (both Pixel and CAPI)
export const trackEvent = async (
  eventName: string,
  data: TrackingData,
  options: {
    enableCAPI?: boolean
    userAgent?: string
    ip?: string
  } = {},
) => {
  console.log(`🎯 TRACKING: Starting dual tracking for ${eventName}`, {
    event: eventName,
    funnel: data.funnel,
    enableCAPI: options.enableCAPI,
    timestamp: new Date().toISOString(),
  })

  // Always track client-side
  trackPixelEvent(eventName, data)

  // Track server-side if enabled
  if (options.enableCAPI) {
    try {
      await trackCAPIEvent(eventName, data, options.userAgent, options.ip)
      console.log(`🎊 TRACKING: Both Pixel and CAPI completed for ${eventName}`)
    } catch (error) {
      console.error(`⚠️ TRACKING: CAPI failed but Pixel succeeded for ${eventName}`, error)
    }
  } else {
    console.log(`📍 TRACKING: Only Pixel tracking enabled for ${eventName}`)
  }
}
