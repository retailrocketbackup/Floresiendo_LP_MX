// lib/google-tracking.ts

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

/**
 * Capture gclid from URL and persist in sessionStorage.
 * Same pattern as getFbclid() in meta-tracking.ts.
 */
export const getGclid = (): string | null => {
  if (typeof window === "undefined") return null
  const urlParams = new URLSearchParams(window.location.search)
  const gclid = urlParams.get("gclid")
  if (gclid) {
    sessionStorage.setItem("gclid", gclid)
    console.log("📍 GCLID: Captured from URL and stored", { gclid })
    return gclid
  }
  const storedGclid = sessionStorage.getItem("gclid")
  if (storedGclid) {
    console.log("📍 GCLID: Retrieved from storage", { gclid: storedGclid })
    return storedGclid
  }
  return null
}

/**
 * Wrapper for window.gtag('event', ...).
 */
export const trackGoogleEvent = (
  eventName: string,
  params: Record<string, any> = {}
) => {
  if (typeof window === "undefined" || !window.gtag) {
    console.warn(`⚠️ GTAG: Not loaded - ${eventName} not tracked`)
    return
  }
  window.gtag("event", eventName, params)
  console.log(`✅ GTAG: ${eventName} tracked`, params)
}

/**
 * Fire a Google Ads conversion event.
 */
export const trackGoogleAdsConversion = (value?: number, currency = "MXN") => {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL
  if (!adsId || !conversionLabel) {
    console.warn("⚠️ GTAG: Google Ads ID or Conversion Label not configured")
    return
  }
  if (typeof window === "undefined" || !window.gtag) {
    console.warn("⚠️ GTAG: Not loaded - conversion not tracked")
    return
  }
  const params: Record<string, any> = {
    send_to: `${adsId}/${conversionLabel}`,
  }
  if (value !== undefined) {
    params.value = value
    params.currency = currency
  }
  window.gtag("event", "conversion", params)
  console.log("✅ GTAG: Google Ads conversion tracked", params)
}

/**
 * GA4 standard generate_lead event + Google Ads conversion.
 */
export const trackGoogleLead = (source: string, value?: number) => {
  trackGoogleEvent("generate_lead", {
    source,
    value,
    currency: "MXN",
  })
  trackGoogleAdsConversion(value)
}

/**
 * GA4 standard purchase event.
 */
export const trackGooglePurchase = (transactionId: string, value: number, currency = "MXN") => {
  trackGoogleEvent("purchase", {
    transaction_id: transactionId,
    value,
    currency,
  })
}
