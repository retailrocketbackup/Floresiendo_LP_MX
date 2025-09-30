declare global {
  interface Window {
    fbq: (
      action: "track" | "trackCustom" | "init",
      eventName: string,
      parameters?: Record<string, any>,
      options?: { eventID?: string },
    ) => void
    _fbq: any
  }
}

// export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ""

export const pageview = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView")
  }
}

export const trackViewContent = (params: {
  content_name: string
  content_type?: string
  content_ids?: string[]
  value?: number
  currency?: string
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "ViewContent", params)
  }
}

export const trackLead = (params: {
  content_name: string
  value?: number
  currency?: string
  eventID?: string
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    const { eventID, ...trackParams } = params
    window.fbq("track", "Lead", trackParams, eventID ? { eventID } : undefined)
  }
}

export const trackSchedule = (params: {
  content_name: string
  value?: number
  currency?: string
  eventID?: string
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    const { eventID, ...trackParams } = params
    window.fbq("track", "Schedule", trackParams, eventID ? { eventID } : undefined)
  }
}
