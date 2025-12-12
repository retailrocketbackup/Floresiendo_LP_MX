// lib/meta-tracking.ts

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
  external_id?: string | null
}

const generateEventId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

const generateExternalId = (data: TrackingData): string | null => {
  if (data.email) {
    return `email_${btoa(data.email)
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 20)}`
  }
  if (data.phone) {
    return `phone_${data.phone.replace(/\D/g, "")}`
  }
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

export const getFbclid = (): string | null => {
  if (typeof window === "undefined") return null
  const urlParams = new URLSearchParams(window.location.search)
  const fbclid = urlParams.get("fbclid")
  if (fbclid) {
    sessionStorage.setItem("fbclid", fbclid)
    console.log("📍 FBCLID: Captured from URL and stored", { fbclid })
    return fbclid
  }
  const storedFbclid = sessionStorage.getItem("fbclid")
  if (storedFbclid) {
    console.log("📍 FBCLID: Retrieved from storage", { fbclid: storedFbclid })
    return storedFbclid
  }
  console.log("📍 FBCLID: Not found in URL or storage")
  return null
}

export const getFbp = (): string | null => {
  if (typeof window === "undefined") return null
  const fbpCookie = document.cookie.split("; ").find((row) => row.startsWith("_fbp="))
  if (fbpCookie) {
    const fbp = fbpCookie.split("=")[1]
    console.log("📍 FBP: Retrieved from cookie", { fbp })
    return fbp
  }
  console.log("📍 FBP: Not found in cookies")
  return null
}

export const trackPixelEvent = (eventName: string, data: TrackingData, eventId?: string, externalId?: string | null) => {
  if (typeof window !== "undefined") {
    if (window.fbq) {
      const finalEventId = eventId || generateEventId()
      const finalExternalId = externalId || data.external_id || generateExternalId(data)
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
      const standardEvents = [
        "ViewContent", "Lead", "Purchase", "AddToCart", "InitiateCheckout", "CompleteRegistration", "Schedule",
      ]
      const isStandardEvent = standardEvents.includes(eventName)
      if (isStandardEvent) {
        window.fbq("track", eventName, eventData, pixelOptions)
      } else {
        window.fbq("trackCustom", eventName, eventData, pixelOptions)
      }
      console.log(`✅ PIXEL: ${eventName} tracked successfully (${isStandardEvent ? "standard" : "custom"} event)`, {
        event: eventName, eventType: isStandardEvent ? "standard" : "custom", eventID: finalEventId,
        external_id: finalExternalId, funnel: data.funnel, content_type: data.content_type,
        timestamp: new Date().toISOString(), data: eventData,
        deduplication_ids: { event_id: finalEventId, external_id: finalExternalId },
      })
      return { eventId: finalEventId, externalId: finalExternalId }
    } else {
      console.warn(`⚠️ PIXEL: fbq not loaded - ${eventName} not tracked`, {
        event: eventName, funnel: data.funnel, message: "Meta Pixel script may not be loaded properly",
      })
    }
  } else {
    console.log(`🔧 PIXEL: Server-side environment detected - ${eventName} skipped`)
  }
  return null
}

export const trackViewContent = (funnel: string, contentType: string) => {
  return trackPixelEvent("ViewContent", {
    funnel, content_type: contentType, content_name: `${contentType}_${funnel}`,
  })
}

export const trackLead = (funnel: string, leadData?: Partial<TrackingData>) => {
  const eventName = funnel.includes("video") ? "Lead_Video" : "Lead_Testimonios"
  return trackPixelEvent(eventName, { funnel, ...leadData })
}

export const trackSchedule = (funnel: string) => {
  const eventName = funnel.includes("video") ? "Schedule_Video" : "Schedule_Testimonios"
  return trackPixelEvent(eventName, {
    funnel, content_type: "appointment", value: 0,
  })
}

export const trackCAPIEvent = async (
  eventName: string, data: TrackingData, eventId: string, userAgent?: string | null,
  ip?: string | null, externalId?: string | null, fbclid?: string | null,
) => {
  console.log(`🚀 CAPI: Starting ${eventName} tracking...`, {
    event: eventName, funnel: data.funnel, content_type: data.content_type, eventID: eventId,
    external_id: externalId, hasEmail: !!data.email, hasPhone: !!data.phone,
    hasUserAgent: !!userAgent, hasIP: !!ip, fbclid_passed: !!fbclid,
  })
  try {
    const finalFbclid = fbclid || getFbclid()
    const fbp = getFbp()
    console.log("[v0] FBCLID source:", fbclid ? "passed parameter" : "getFbclid()")
    console.log("[v0] Final FBCLID used:", finalFbclid)
    
    const userData: any = {}

    // =================== INICIO DE LA CORRECCIÓN MINUCIOSA ===================
    // Este bloque "traduce" los nombres de los campos que vienen del formulario
    // a los nombres cortos que la API de Meta y nuestro servidor esperan.
    if (data.email) userData.em = data.email;
    if (data.phone) userData.ph = data.phone;
    if (data.first_name) userData.fn = data.first_name;
    if (data.last_name) userData.ln = data.last_name;
    // =================== FIN DE LA CORRECCIÓN MINUCIOSA ===================

    const finalExternalId = externalId || data.external_id || generateExternalId(data)
    if (finalExternalId) {
      userData.external_id = finalExternalId
    }
    if (userAgent) {
      userData.client_user_agent = userAgent
      console.log("[v0] User agent included for enhanced matching")
    } else {
      console.warn("[v0] User agent missing - this reduces matching quality")
    }
    if (ip) {
      userData.client_ip_address = ip
      console.log("[v0] IP address included for enhanced matching")
    }
    if (fbp) {
      userData.fbp = fbp
      console.log("[v0] FBP cookie included for enhanced matching")
    }
    if (finalFbclid) {
      userData.fbc = `fb.1.${Date.now()}.${finalFbclid}`
      console.log("[v0] FBCLID included for enhanced matching")
    }
    const customData: any = {
      funnel: data.funnel, source: "floresiendo_lp",
    }
    if (data.content_type) customData.content_type = data.content_type
    if (data.content_name) customData.content_name = data.content_name
    if (data.currency) customData.currency = data.currency
    if (data.value !== undefined) customData.value = data.value
    const payload = {
      event_name: eventName, event_time: Math.floor(Date.now() / 1000), event_id: eventId,
      action_source: "website",
      event_source_url: typeof window !== "undefined" ? window.location.href : undefined,
      user_data: userData, custom_data: customData,
    }
    console.log(`📤 CAPI: Sending payload with enhanced matching data`, {
      ...payload, external_id_sent: !!finalExternalId,
      deduplication_method: "event_id + external_id (DOUBLE PROTECTION)",
      fbclid_captured: !!finalFbclid, fbp_captured: !!fbp, fbc_formatted: userData.fbc ? "Yes" : "No",
      user_data_fields: Object.keys(userData), custom_data_fields: Object.keys(customData),
      has_user_agent: !!userData.client_user_agent, has_ip: !!userData.client_ip_address,
      has_event_source_url: !!payload.event_source_url, has_email: !!userData.em,
      has_phone: !!userData.ph, has_first_name: !!userData.fn, has_last_name: !!userData.ln,
      matching_parameters_count: Object.keys(userData).length,
    })
    const response = await fetch("/api/meta-capi", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    let result
    const contentType = response.headers.get("content-type")
    if (!response.ok) {
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
        status: response.status, statusText: response.statusText, error: errorMessage,
      })
      throw new Error(`CAPI request failed: ${errorMessage}`)
    }
    try {
      result = await response.json()
    } catch (parseError) {
      console.error(`❌ CAPI: Failed to parse successful response as JSON`, {
        status: response.status, contentType,
        parseError: parseError instanceof Error ? parseError.message : parseError,
      })
      throw new Error(`CAPI server returned invalid JSON response`)
    }
    console.log(`✅ CAPI: ${eventName} tracked successfully with enhanced matching`, {
      event: eventName, eventID: eventId, external_id: externalId, funnel: data.funnel,
      events_received: result.events_received, fbtrace_id: result.fbtrace_id,
      fbclid_sent: !!finalFbclid, fbp_sent: !!fbp, deduplication_ready: "✅ DOUBLE PROTECTION",
      timestamp: new Date().toISOString(),
    })
    return result
  } catch (error) {
    console.error(`❌ CAPI: Tracking error for ${eventName}`, {
      event: eventName, funnel: data.funnel, eventID: eventId, external_id: externalId,
      error: error instanceof Error ? error.message : error, timestamp: new Date().toISOString(),
    })
    throw error
  }
}

export const trackEvent = async (
  eventName: string, data: TrackingData,
  options: { enableCAPI?: boolean; userAgent?: string; ip?: string; fbclid?: string } = {},
) => {
  console.log(`🎯 TRACKING: Starting dual tracking for ${eventName}`, {
    event: eventName, funnel: data.funnel, enableCAPI: options.enableCAPI,
    fbclid_passed: !!options.fbclid, timestamp: new Date().toISOString(),
    windowExists: typeof window !== "undefined", fbqExists: typeof window !== "undefined" && !!window.fbq,
    currentUrl: typeof window !== "undefined" ? window.location.href : "server-side",
  })
  let finalUserAgent = options.userAgent
  let finalIp = options.ip
  if (options.enableCAPI && (!finalUserAgent || !finalIp)) {
    try {
      const technicalData = await getTechnicalData()
      finalUserAgent = finalUserAgent || technicalData.userAgent
      finalIp = finalIp || technicalData.clientIp
      console.log("[v0] Technical data auto-captured for CAPI:", {
        userAgent: finalUserAgent ? "✅" : "❌", clientIp: finalIp ? "✅" : "❌",
        userAgentLength: finalUserAgent?.length || 0, ipAddress: finalIp,
      })
    } catch (error) {
      console.warn("[v0] Failed to auto-capture technical data:", error)
    }
  }
  // Use event name as provided (no more auto-renaming Lead events)
  const finalEventName = eventName
  const sharedEventId = generateEventId()
  const sharedExternalId = data.external_id || generateExternalId(data)
  const fbclid = getFbclid()
  const fbp = getFbp()
  console.log(`🔑 DEDUPLICATION: Generated shared IDs for enhanced protection`, {
    eventName, sharedEventId, sharedExternalId, funnel: data.funnel,
    pixelEventID: sharedEventId, capiEventId: sharedEventId,
    pixelExternalId: sharedExternalId, capiExternalId: sharedExternalId,
    event_id_match: "✅ MATCH", external_id_match: "✅ MATCH",
    deduplication_method: "event_id + external_id (DOUBLE PROTECTION)",
    fbclid_available: !!fbclid, fbp_available: !!fbp,
    match_quality_boost: fbclid || fbp ? "✅ ENHANCED" : "⚠️ BASIC",
    technical_data_available: {
      userAgent: !!finalUserAgent, clientIp: !!finalIp && finalIp !== "unknown",
    },
  })
  const pixelResult = trackPixelEvent(
    finalEventName, { ...data, external_id: sharedExternalId }, sharedEventId, sharedExternalId,
  )
  console.log(`📱 PIXEL: Tracking result`, { pixelResult, eventSent: !!pixelResult })
  if (options.enableCAPI) {
    try {
      console.log(`🚀 CAPI: About to call trackCAPIEvent with enhanced deduplication and technical data`)
      const capiResult = await trackCAPIEvent(
        finalEventName, data, sharedEventId, finalUserAgent, finalIp, sharedExternalId, options.fbclid,
      )
      console.log(`✅ CAPI: trackCAPIEvent completed successfully`, capiResult)
      console.log(`🎊 DEDUPLICATION: Both events sent with matching IDs and enhanced protection`, {
        originalEvent: eventName, finalEvent: finalEventName, sharedEventId,
        sharedExternalId, funnel: data.funnel, pixelSent: "✅", capiSent: "✅",
        deduplicationReady: "✅ DOUBLE PROTECTION",
        protection_level: "MAXIMUM (event_id + external_id + fbclid/fbp + IP + UserAgent)",
        matchQualityEnhanced: fbclid || fbp ? "✅" : "⚠️",
        technicalDataSent: {
          userAgent: !!finalUserAgent, clientIp: !!finalIp && finalIp !== "unknown",
        },
        facebookWillSee: "Same event_name, event_id AND external_id for triple deduplication protection + fbclid/fbp + IP/UserAgent for maximum matching",
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error(`⚠️ TRACKING: CAPI failed but Pixel succeeded for ${finalEventName}`, {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
      })
    }
  } else {
    console.log(`📍 TRACKING: Only Pixel tracking enabled for ${finalEventName}`)
  }
  console.log(`🏁 TRACKING: Completed tracking attempt for ${finalEventName}`)
}

const getTechnicalData = async (): Promise<{ userAgent: string; clientIp: string }> => {
  const userAgent = typeof window !== "undefined" ? navigator.userAgent : "unknown"
  let clientIp = "unknown"
  try {
    const cachedIp = typeof window !== "undefined" ? sessionStorage.getItem("client_ip") : null
    if (cachedIp) {
      console.log("[v0] Using cached client IP:", cachedIp)
      clientIp = cachedIp
    } else {
      const ipResponse = await fetch("/api/get-client-ip")
      const ipData = await ipResponse.json()
      clientIp = ipData.ip || "unknown"
      if (typeof window !== "undefined" && clientIp !== "unknown") {
        sessionStorage.setItem("client_ip", clientIp)
      }
      console.log("[v0] Fetched and cached client IP:", clientIp)
    }
  } catch (error) {
    console.warn("[v0] Failed to get client IP:", error)
    clientIp = "unknown"
  }
  console.log("[v0] Technical data captured:", {
    userAgent: userAgent.substring(0, 100) + "...", clientIp,
    source: clientIp !== "unknown" ? "cache" : "api",
  })
  return { userAgent, clientIp }
}

export const testTracking = () => {
  console.log(`🧪 TEST: Starting tracking test`)
  trackEvent(
    "Lead", {
      funnel: "test", content_type: "test_event", email: "test@example.com",
    },
    { enableCAPI: true },
  )
}

// =================== WHATSAPP LEAD TRACKING ===================

export interface WhatsAppLeadData {
  page: "home" | "encuentro" | "escuela" | "practicas" | "contacto" | string
  buttonLocation: "hero" | "pricing" | "footer" | "cta" | "sticky" | string
  encuentroSlug?: string
  eventName?: string // Custom event name like "Lead_Duelo", "Lead_Encuentro", etc.
  value?: number
  currency?: string
}

export const trackWhatsAppLead = async (data: WhatsAppLeadData) => {
  // Use custom event name if provided, otherwise default to "Lead"
  const eventName = data.eventName || "Lead"
  const contentName = data.encuentroSlug
    ? `whatsapp_${data.page}_${data.encuentroSlug}`
    : `whatsapp_${data.page}`

  console.log(`📱 WHATSAPP LEAD: Tracking click`, {
    page: data.page,
    buttonLocation: data.buttonLocation,
    encuentroSlug: data.encuentroSlug,
    eventName,
    value: data.value,
    timestamp: new Date().toISOString(),
  })

  return trackEvent(
    eventName,
    {
      funnel: data.page,
      content_type: "whatsapp_click",
      content_name: contentName,
      value: data.value,
      currency: data.currency || "MXN",
    },
    { enableCAPI: true },
  )
}

// =================== PAGE VIEW CONTENT TRACKING ===================

export interface PageViewContentData {
  page: "home" | "encuentro" | "escuela" | "practicas" | "contacto" | string
  contentName?: string
  contentCategory?: string // For retargeting segmentation (estres, proposito, duelo, etc.)
  encuentroSlug?: string
  value?: number
  currency?: string
}

export const trackPageViewContent = (data: PageViewContentData) => {
  const contentName = data.contentName
    || data.encuentroSlug
    || data.page

  console.log(`👁️ VIEW CONTENT: Tracking page view`, {
    page: data.page,
    contentName,
    contentCategory: data.contentCategory,
    value: data.value,
    timestamp: new Date().toISOString(),
  })

  return trackPixelEvent("ViewContent", {
    funnel: data.page,
    content_type: data.page,
    content_name: contentName,
    content_category: data.contentCategory,
    value: data.value,
    currency: data.currency || "MXN",
  })
}

// =================== VIDEO TRACKING ===================

export type VideoMilestone = "play" | "25" | "50" | "75" | "complete"

export interface VideoTrackingData {
  funnel: string
  videoId: string
  milestone: VideoMilestone
}

export const trackVideoMilestone = async (data: VideoTrackingData) => {
  const eventName = data.milestone === "play"
    ? "ViewContent"
    : `Video${data.milestone === "complete" ? "Complete" : data.milestone}`

  const contentName = `video_${data.funnel}_${data.videoId}_${data.milestone}`

  console.log(`🎬 VIDEO: Tracking ${data.milestone} milestone`, {
    funnel: data.funnel,
    videoId: data.videoId,
    milestone: data.milestone,
    eventName,
    timestamp: new Date().toISOString(),
  })

  return trackEvent(
    eventName,
    {
      funnel: data.funnel,
      content_type: "video",
      content_name: contentName,
    },
    { enableCAPI: true },
  )
}
