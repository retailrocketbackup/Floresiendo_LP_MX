// Nueva implementación robusta de Meta Pixel + CAPI
// Siguiendo las mejores prácticas de Facebook 2024

interface TrackingData {
  email?: string
  phone?: string
  first_name?: string
  last_name?: string
  [key: string]: any
}

interface CustomData {
  [key: string]: any
}

// Función para generar event_id único para deduplicación
function generateEventId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Función para obtener datos del navegador automáticamente
function getBrowserData() {
  const userAgent = typeof window !== "undefined" ? window.navigator.userAgent : ""
  const url = typeof window !== "undefined" ? window.location.href : ""

  // Obtener fbp y fbc de cookies si existen
  const fbp =
    typeof document !== "undefined"
      ? document.cookie
          .split("; ")
          .find((row) => row.startsWith("_fbp="))
          ?.split("=")[1]
      : undefined
  const fbc =
    typeof document !== "undefined"
      ? document.cookie
          .split("; ")
          .find((row) => row.startsWith("_fbc="))
          ?.split("=")[1]
      : undefined

  return {
    userAgent,
    url,
    fbp,
    fbc,
  }
}

// Función principal de tracking que maneja Pixel + CAPI automáticamente
export async function trackMetaEvent(eventName: string, userData: TrackingData = {}, customData: CustomData = {}) {
  const eventId = generateEventId()
  const browserData = getBrowserData()

  console.log(`[v0] Tracking ${eventName} with event_id: ${eventId}`)

  // 1. Enviar a Meta Pixel (cliente)
  try {
    if (typeof window !== "undefined" && (window as any).fbq) {
      ;(window as any).fbq("track", eventName, customData, { eventID: eventId })
      console.log(`[v0] ✅ Pixel: ${eventName} sent successfully`)
    }
  } catch (error) {
    console.error(`[v0] ❌ Pixel error for ${eventName}:`, error)
  }

  // 2. Enviar a CAPI (servidor)
  try {
    const capiPayload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: "website",
      event_source_url: browserData.url,
      user_data: {
        // Datos automáticos del navegador (siempre incluidos)
        client_user_agent: browserData.userAgent,
        ...(browserData.fbp && { fbp: browserData.fbp }),
        ...(browserData.fbc && { fbc: browserData.fbc }),

        // Datos del usuario (si están disponibles)
        ...(userData.email && { em: userData.email }),
        ...(userData.phone && { ph: userData.phone }),
        ...(userData.first_name && { fn: userData.first_name }),
        ...(userData.last_name && { ln: userData.last_name }),
      },
      custom_data: customData,
    }

    console.log(`[v0] Sending CAPI payload:`, capiPayload)

    const response = await fetch("/api/meta-capi-v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(capiPayload),
    })

    if (response.ok) {
      const result = await response.json()
      console.log(`[v0] ✅ CAPI: ${eventName} sent successfully`, result)
    } else {
      const error = await response.text()
      console.error(`[v0] ❌ CAPI error for ${eventName}:`, error)
    }
  } catch (error) {
    console.error(`[v0] ❌ CAPI network error for ${eventName}:`, error)
  }
}

// Funciones específicas para cada tipo de evento
export function trackViewContent(customData: CustomData = {}) {
  return trackMetaEvent("ViewContent", {}, customData)
}

export function trackLead(userData: TrackingData, customData: CustomData = {}) {
  return trackMetaEvent("Lead", userData, customData)
}

export function trackPageView() {
  return trackMetaEvent("PageView")
}
