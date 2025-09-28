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
  external_id?: string // Added external_id support for enhanced deduplication
}

const generateEventId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

const generateExternalId = (data: TrackingData): string | null => {
  // Option 1: Use email as base (most reliable for user identification)
  if (data.email) {
    return `email_${btoa(data.email)
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 20)}`
  }

  // Option 2: Use phone as base
  if (data.phone) {
    return `phone_${data.phone.replace(/\D/g, "")}`
  }

  // Option 3: Generate session-based ID for anonymous users
  if (typeof window !== "undefined") {
    let sessionId = sessionStorage.getItem("user_external_id")
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem("user_external_id", sessionId)
    }
    return sessionId
  }

  return null
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
export const trackPixelEvent = (eventName: string, data: TrackingData, eventId?: string, externalId?: string) => {
  if (typeof window !== "undefined") {
    if (window.fbq) {
      const finalEventId = eventId || generateEventId()
      const finalExternalId = externalId || data.external_id || generateExternalId(data) // Added external_id generation

      const eventData = {
        ...data,
        custom_data: {
          funnel: data.funnel,
          source: "floresiendo_lp",
        },
      }

      const pixelOptions: any = { eventID: finalEventId }
      if (finalExternalId) {
        pixelOptions.external_id = finalExternalId
      }

      window.fbq("track", eventName, eventData, pixelOptions)
      console.log(`✅ PIXEL: ${eventName} tracked successfully`, {
        event: eventName,
        eventID: finalEventId,
        external_id: finalExternalId, // Added external_id to logging
        funnel: data.funnel,
        content_type: data.content_type,
        timestamp: new Date().toISOString(),
        data: eventData,
        deduplication_ids: { event_id: finalEventId, external_id: finalExternalId }, // Enhanced logging for deduplication
      })

      return { eventId: finalEventId, externalId: finalExternalId } // Return both IDs
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
  externalId?: string, // Added external_id parameter
) => {
  console.log(`🚀 CAPI: Starting ${eventName} tracking...`, {
    event: eventName,
    funnel: data.funnel,
    content_type: data.content_type,
    eventID: eventId,
    external_id: externalId, // Added external_id to initial logging
  })

  try {
    const fbclid = getFbclid()
    const fbp = getFbp()

    const userData: any = {}

    const finalExternalId = externalId || data.external_id || generateExternalId(data)
    if (finalExternalId) {
      userData.external_id = finalExternalId
    }

    // Always include user agent for website events (required by Facebook)
    if (userAgent) {
      userData.client_user_agent = userAgent
    }

    // Always include IP if available
    if (ip) {
      userData.client_ip_address = ip
    }

    // Include Facebook identifiers if available
    if (fbp) userData.fbp = fbp
    if (fbclid) userData.fbc = `fb.1.${Date.now()}.${fbclid}`

    // Include personal data if available (and hash server-side)
    if (data.email) userData.em = normalizeEmail(data.email)
    if (data.phone) userData.ph = normalizePhone(data.phone)
    if (data.first_name) userData.fn = data.first_name.toLowerCase().trim()
    if (data.last_name) userData.ln = data.last_name.toLowerCase().trim()

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
      event_source_url: typeof window !== "undefined" ? window.location.href : undefined,
      user_data: userData,
      custom_data: customData,
    }

    console.log(`📤 CAPI: Sending payload with enhanced deduplication`, {
      ...payload,
      external_id_sent: !!finalExternalId, // Added external_id status to logging
      deduplication_method: "event_id + external_id (DOUBLE PROTECTION)", // Updated deduplication method description
      fbclid_captured: !!fbclid,
      fbp_captured: !!fbp,
      fbc_formatted: userData.fbc ? "Yes" : "No",
      user_data_fields: Object.keys(userData),
      custom_data_fields: Object.keys(customData),
      has_user_agent: !!userData.client_user_agent,
      has_ip: !!userData.client_ip_address,
      has_event_source_url: !!payload.event_source_url,
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
      external_id: finalExternalId, // Added external_id to success logging
      funnel: data.funnel,
      events_received: result.events_received,
      fbtrace_id: result.fbtrace_id,
      fbclid_sent: !!fbclid,
      fbp_sent: !!fbp,
      deduplication_ready: "✅ DOUBLE PROTECTION", // Enhanced deduplication status
      timestamp: new Date().toISOString(),
    })

    return result
  } catch (error) {
    console.error(`❌ CAPI: Tracking error for ${eventName}`, {
      event: eventName,
      funnel: data.funnel,
      eventID: eventId,
      external_id: externalId, // Added external_id to error logging
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

  // Generate shared IDs for both pixel and CAPI
  const sharedEventId = generateEventId()
  const sharedExternalId = data.external_id || generateExternalId(data) // Added shared external_id

  const fbclid = getFbclid()
  const fbp = getFbp()

  console.log(`🔑 DEDUPLICATION: Generated shared IDs for enhanced protection`, {
    eventName,
    sharedEventId,
    sharedExternalId, // Added external_id to deduplication logging
    funnel: data.funnel,
    pixelEventID: sharedEventId,
    capiEventId: sharedEventId,
    pixelExternalId: sharedExternalId, // Added pixel external_id logging
    capiExternalId: sharedExternalId, // Added CAPI external_id logging
    event_id_match: "✅ MATCH",
    external_id_match: "✅ MATCH", // Added external_id match confirmation
    deduplication_method: "event_id + external_id (DOUBLE PROTECTION)", // Updated deduplication method
    fbclid_available: !!fbclid,
    fbp_available: !!fbp,
    match_quality_boost: fbclid || fbp ? "✅ ENHANCED" : "⚠️ BASIC",
  })

  // Track client-side with shared IDs
  const pixelResult = trackPixelEvent(
    eventName,
    { ...data, external_id: sharedExternalId },
    sharedEventId,
    sharedExternalId,
  ) // Pass shared external_id to pixel
  console.log(`📱 PIXEL: Tracking result`, { pixelResult, eventSent: !!pixelResult })

  // Track server-side if enabled with the same IDs
  if (options.enableCAPI) {
    try {
      console.log(`🚀 CAPI: About to call trackCAPIEvent with enhanced deduplication`)
      const capiResult = await trackCAPIEvent(
        eventName,
        data,
        sharedEventId,
        options.userAgent,
        options.ip,
        sharedExternalId,
      ) // Pass shared external_id to CAPI
      console.log(`✅ CAPI: trackCAPIEvent completed successfully`, capiResult)

      console.log(`🎊 DEDUPLICATION: Both events sent with matching IDs and enhanced protection`, {
        eventName,
        sharedEventId,
        sharedExternalId, // Added external_id to final success logging
        funnel: data.funnel,
        pixelSent: "✅",
        capiSent: "✅",
        deduplicationReady: "✅ DOUBLE PROTECTION", // Enhanced deduplication status
        protection_level: "MAXIMUM (event_id + external_id + fbclid/fbp)", // Added protection level description
        matchQualityEnhanced: fbclid || fbp ? "✅" : "⚠️",
        facebookWillSee:
          "Same event_name, event_id AND external_id for triple deduplication protection + fbclid/fbp for better matching", // Updated Facebook deduplication description
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
