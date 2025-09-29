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

export const getFbclid = (): string | null => {
  // Stub function - will be reimplemented in Phase 2
  return null
}

export const trackViewContent = (funnel: string, contentType: string) => {
  // Stub function - will be reimplemented in Phase 2
  console.log(`[STUB] trackViewContent called: ${funnel}, ${contentType}`)
  return null
}

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
  // Stub function - will be reimplemented in Phase 2
  console.log(`[STUB] trackEvent called: ${eventName}`, data, options)
  return null
}
