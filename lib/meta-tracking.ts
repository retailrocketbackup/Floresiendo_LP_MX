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

const getFbclid = (): string | null => {
  if (typeof window === "undefined") return null

  // First check if fbclid is in current URL
  const urlParams = new URLSearchParams(window.location.search)
  const fbclid = urlParams.get("fbclid")

  if (fbclid) {
    // Store fbclid in sessionStorage for future use
    sessionStorage.setItem("fbclid", fbclid)
    console.log("📍 FBCLID: Captured from URL and stored", { fbclid })
    return fbclid
  }

  // If not in URL, check sessionStorage
  const storedFbclid = sessionStorage.getItem("fbclid")
  if (storedFbclid) {
    console.log("📍 FBCLID: Retrieved from storage", { fbclid: storedFbclid })
    return storedFbclid
  }

  console.log("📍 FBCLID: Not found in URL or storage")
  return null
}

const getFbp = (): string | null => {
  if (typeof window === "undefined") return null

  // Get Facebook Browser ID from _fbp cookie
  const fbpCookie = document.cookie.split("; ").find((row) => row.startsWith("_fbp="))

  if (fbpCookie) {
    const fbp = fbpCookie.split("=")[1]
    console.log("📍 FBP: Retrieved from cookie", { fbp })
    return fbp
  }

  console.log("📍 FBP: Not found in cookies")
  return null
}

// Client-side Meta Pixel tracking
export const trackPixelEvent = (eventName: string, data: TrackingData, eventId?: string) => {
  if (typeof window !== "undefined") {
    if (window.fbq) {
      const finalEventId = eventId || generateEventId()
      const eventData = {
        ...data,
        custom_data: {
          funnel: data.funnel,
          source: "floresiendo_lp",
        },
      }

      window.fbq("track", eventName, eventData, { eventID: finalEventId })
      console.log(`✅ PIXEL: ${eventName} tracked successfully`, {
        event: eventName,
        eventID: finalEventId,
        funnel: data.funnel,
        content_type: data.content_type,
        timestamp: new Date().toISOString(),
        data: eventData,
      })

      return finalEventId
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
  return null
}

// Standard funnel events
export const trackViewContent = (funnel: string, contentType: string) => {
  return trackPixelEvent("ViewContent", {
    funnel,
    content_type: contentType,
    content_name: `${contentType}_${funnel}`,
  })
}

export const trackLead = (funnel: string, leadData?: Partial<TrackingData>) => {
  return trackPixelEvent("Lead", {
    funnel,
    ...leadData,
  })
}

export const trackSchedule = (funnel: string) => {
  return trackPixelEvent("Schedule", {
    funnel,
    content_type: "appointment",
    value: 0, // Free consultation
  })
}

// Server-side CAPI tracking function
export const trackCAPIEvent = async (
  eventName: string,
  data: TrackingData,
  eventId: string,
  userAgent?: string,
  ip?: string,
) => {
  console.log(`🚀 CAPI: Starting ${eventName} tracking...`, {
    event: eventName,
    funnel: data.funnel,
    content_type: data.content_type,
    eventID: eventId,
  })

  try {
    const fbclid = getFbclid()
    const fbp = getFbp()

    const payload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId, // Using the same eventId from pixel
      action_source: "website",
      user_data: {
        em: data.email ? normalizeEmail(data.email) : undefined,
        ph: data.phone ? normalizePhone(data.phone) : undefined,
        fn: data.first_name ? data.first_name.toLowerCase().trim() : undefined,
        ln: data.last_name ? data.last_name.toLowerCase().trim() : undefined,
        client_ip_address: ip,
        client_user_agent: userAgent,
        fbp: fbp || undefined,
        fbc: fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined,
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

    console.log(`📤 CAPI: Sending payload with enhanced matching data`, {
      ...payload,
      fbclid_captured: !!fbclid,
      fbp_captured: !!fbp,
      fbc_formatted: payload.user_data.fbc ? "Yes" : "No",
    })

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

    console.log(`✅ CAPI: ${eventName} tracked successfully with enhanced matching`, {
      event: eventName,
      eventID: eventId,
      funnel: data.funnel,
      events_received: result.events_received,
      fbtrace_id: result.fbtrace_id,
      fbclid_sent: !!fbclid,
      fbp_sent: !!fbp,
      timestamp: new Date().toISOString(),
    })

    return result
  } catch (error) {
    console.error(`❌ CAPI: Tracking error for ${eventName}`, {
      event: eventName,
      funnel: data.funnel,
      eventID: eventId,
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

  // Generate a single eventId for both pixel and CAPI
  const sharedEventId = generateEventId()

  const fbclid = getFbclid()
  const fbp = getFbp()

  console.log(`🔑 EVENT_ID: Generated shared ID for deduplication`, {
    eventName,
    sharedEventId,
    funnel: data.funnel,
    pixelEventID: sharedEventId,
    capiEventId: sharedEventId,
    match: sharedEventId === sharedEventId ? "✅ MATCH" : "❌ MISMATCH",
    fbclid_available: !!fbclid,
    fbp_available: !!fbp,
    match_quality_boost: fbclid || fbp ? "✅ ENHANCED" : "⚠️ BASIC",
  })

  // Track client-side with shared eventId
  trackPixelEvent(eventName, data, sharedEventId)

  // Track server-side if enabled with the same eventId
  if (options.enableCAPI) {
    try {
      await trackCAPIEvent(eventName, data, sharedEventId, options.userAgent, options.ip)

      console.log(`🎊 DEDUPLICATION: Both events sent with matching IDs and enhanced data`, {
        eventName,
        sharedEventId,
        funnel: data.funnel,
        pixelSent: "✅",
        capiSent: "✅",
        deduplicationReady: "✅",
        matchQualityEnhanced: fbclid || fbp ? "✅" : "⚠️",
        facebookWillSee: "Same event_name and event_id for deduplication + fbclid/fbp for better matching",
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error(`⚠️ TRACKING: CAPI failed but Pixel succeeded for ${eventName}`, error)
    }
  } else {
    console.log(`📍 TRACKING: Only Pixel tracking enabled for ${eventName}`)
  }
}
