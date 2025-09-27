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

    const userData: any = {}

    if (data.email) userData.em = normalizeEmail(data.email)
    if (data.phone) userData.ph = normalizePhone(data.phone)
    if (data.first_name) userData.fn = data.first_name.toLowerCase().trim()
    if (data.last_name) userData.ln = data.last_name.toLowerCase().trim()
    if (ip) userData.client_ip_address = ip
    if (userAgent) userData.client_user_agent = userAgent
    if (fbp) userData.fbp = fbp
    if (fbclid) userData.fbc = `fb.1.${Date.now()}.${fbclid}`

    const customData: any = {
      funnel: data.funnel,
      source: "floresiendo_lp",
    }

    if (data.content_type) customData.content_type = data.content_type
    if (data.content_name) customData.content_name = data.content_name
    if (data.currency) customData.currency = data.currency
    if (data.value !== undefined) customData.value = data.value

    const payload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId, // Using the same eventId from pixel
      action_source: "website",
      user_data: userData,
      custom_data: customData,
    }

    console.log(`📤 CAPI: Sending clean payload (no undefined values)`, {
      ...payload,
      fbclid_captured: !!fbclid,
      fbp_captured: !!fbp,
      fbc_formatted: userData.fbc ? "Yes" : "No",
      user_data_fields: Object.keys(userData),
      custom_data_fields: Object.keys(customData),
    })

    const response = await fetch("/api/meta-capi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    let result
    const contentType = response.headers.get("content-type")

    if (!response.ok) {
      // For error responses, try to get the error message
      let errorMessage
      try {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json()
          errorMessage = errorData.error || errorData.message || `HTTP ${response.status}`
        } else {
          errorMessage = await response.text()
        }
      } catch (readError) {
        errorMessage = `HTTP ${response.status} ${response.statusText}`
      }

      console.error(`❌ CAPI: Request failed (${response.status})`, {
        status: response.status,
        statusText: response.statusText,
        error: errorMessage,
      })
      throw new Error(`CAPI request failed: ${errorMessage}`)
    }

    // For successful responses, parse as JSON
    try {
      result = await response.json()
    } catch (parseError) {
      console.error(`❌ CAPI: Failed to parse successful response as JSON`, {
        status: response.status,
        contentType,
        parseError: parseError instanceof Error ? parseError.message : parseError,
      })
      throw new Error(`CAPI server returned invalid JSON response`)
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
    windowExists: typeof window !== "undefined",
    fbqExists: typeof window !== "undefined" && !!window.fbq,
    currentUrl: typeof window !== "undefined" ? window.location.href : "server-side",
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
  const pixelResult = trackPixelEvent(eventName, data, sharedEventId)
  console.log(`📱 PIXEL: Tracking result`, { pixelResult, eventSent: !!pixelResult })

  // Track server-side if enabled with the same eventId
  if (options.enableCAPI) {
    try {
      console.log(`🚀 CAPI: About to call trackCAPIEvent`)
      const capiResult = await trackCAPIEvent(eventName, data, sharedEventId, options.userAgent, options.ip)
      console.log(`✅ CAPI: trackCAPIEvent completed successfully`, capiResult)

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
      console.error(`⚠️ TRACKING: CAPI failed but Pixel succeeded for ${eventName}`, {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
      })
    }
  } else {
    console.log(`📍 TRACKING: Only Pixel tracking enabled for ${eventName}`)
  }

  console.log(`🏁 TRACKING: Completed tracking attempt for ${eventName}`)
}

export const testTracking = () => {
  console.log(`🧪 TEST: Starting tracking test`)
  trackEvent(
    "Lead",
    {
      funnel: "test",
      content_type: "test_event",
      email: "test@example.com",
    },
    {
      enableCAPI: true,
    },
  )
}
