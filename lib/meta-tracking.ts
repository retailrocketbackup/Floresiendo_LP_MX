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
  external_id?: string
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
    return fbclid
  }

  const storedFbclid = sessionStorage.getItem("fbclid")
  if (storedFbclid) {
    return storedFbclid
  }

  return null
}

const getFbp = (): string | null => {
  if (typeof window === "undefined") return null

  const fbpCookie = document.cookie.split("; ").find((row) => row.startsWith("_fbp="))

  if (fbpCookie) {
    const fbp = fbpCookie.split("=")[1]
    return fbp
  }

  return null
}

// Client-side Meta Pixel tracking
export const trackPixelEvent = (eventName: string, data: TrackingData, eventId?: string, externalId?: string) => {
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

      window.fbq("track", eventName, eventData, pixelOptions)

      return { eventId: finalEventId, externalId: finalExternalId }
    }
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
  const eventName = funnel.includes("video") ? "Lead_Video" : "Lead_Testimonios"

  return trackPixelEvent(eventName, {
    funnel,
    ...leadData,
  })
}

export const trackSchedule = (funnel: string) => {
  const eventName = funnel.includes("video") ? "Schedule_Video" : "Schedule_Testimonios"

  return trackPixelEvent(eventName, {
    funnel,
    content_type: "appointment",
    value: 0,
  })
}

// Server-side CAPI tracking function
export const trackCAPIEvent = async (
  eventName: string,
  data: TrackingData,
  eventId: string,
  userAgent?: string,
  ip?: string,
  externalId?: string,
  fbclid?: string,
) => {
  try {
    const finalFbclid = fbclid || getFbclid()
    const fbp = getFbp()

    const userData: any = {}

    const finalExternalId = externalId || data.external_id || generateExternalId(data)
    if (finalExternalId) {
      userData.external_id = finalExternalId
    }

    if (data.email) {
      userData.em = data.email
    }

    if (data.phone) {
      userData.ph = data.phone
    }

    if (data.first_name) {
      userData.fn = data.first_name
    }

    if (data.last_name) {
      userData.ln = data.last_name
    }

    if (userAgent) {
      userData.client_user_agent = userAgent
    }

    if (ip) {
      userData.client_ip_address = ip
    }

    if (fbp) {
      userData.fbp = fbp
    }
    if (finalFbclid) {
      userData.fbc = `fb.1.${Date.now()}.${finalFbclid}`
    }

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
      event_id: eventId,
      action_source: "website",
      event_source_url: typeof window !== "undefined" ? window.location.href : undefined,
      user_data: userData,
      custom_data: customData,
    }

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

      throw new Error(`CAPI request failed: ${errorMessage}`)
    }

    try {
      result = await response.json()
    } catch (parseError) {
      throw new Error(`CAPI server returned invalid JSON response`)
    }

    return result
  } catch (error) {
    throw error
  }
}

// Combined tracking function (both Pixel and CAPI)
export const trackEvent = async (
  eventName: string,
  data: TrackingData,
  options: {
    enableCAPI?: boolean
    userAgent?: string
    ip?: string
    fbclid?: string
  } = {},
) => {
  let finalUserAgent = options.userAgent
  let finalIp = options.ip

  if (options.enableCAPI && (!finalUserAgent || !finalIp)) {
    try {
      const technicalData = await getTechnicalData()
      finalUserAgent = finalUserAgent || technicalData.userAgent
      finalIp = finalIp || technicalData.clientIp
    } catch (error) {
      // Silent fallback
    }
  }

  let finalEventName = eventName
  if (eventName === "Lead") {
    finalEventName = data.funnel.includes("video") ? "Lead_Video" : "Lead_Testimonios"
  }

  // Generate shared IDs for both pixel and CAPI
  const sharedEventId = generateEventId()
  const sharedExternalId = data.external_id || generateExternalId(data)

  // Track client-side with shared IDs using final event name
  const pixelResult = trackPixelEvent(
    finalEventName,
    { ...data, external_id: sharedExternalId },
    sharedEventId,
    sharedExternalId,
  )

  // Track server-side if enabled with the same IDs using final event name
  if (options.enableCAPI) {
    try {
      const capiResult = await trackCAPIEvent(
        finalEventName,
        data,
        sharedEventId,
        finalUserAgent,
        finalIp,
        sharedExternalId,
        options.fbclid,
      )
    } catch (error) {
      // Silent fallback - pixel tracking still succeeded
    }
  }
}

// Function to capture technical data automatically
const getTechnicalData = async (): Promise<{ userAgent: string; clientIp: string }> => {
  const userAgent = typeof window !== "undefined" ? navigator.userAgent : "unknown"

  let clientIp = "unknown"

  try {
    const cachedIp = typeof window !== "undefined" ? sessionStorage.getItem("client_ip") : null

    if (cachedIp) {
      clientIp = cachedIp
    } else {
      const ipResponse = await fetch("/api/get-client-ip")
      const ipData = await ipResponse.json()
      clientIp = ipData.ip || "unknown"

      if (typeof window !== "undefined" && clientIp !== "unknown") {
        sessionStorage.setItem("client_ip", clientIp)
      }
    }
  } catch (error) {
    clientIp = "unknown"
  }

  return { userAgent, clientIp }
}

export const testTracking = () => {
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
