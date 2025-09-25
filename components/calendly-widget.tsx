"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/meta-tracking"

interface CalendlyWidgetProps {
  funnel?: string
}

export function CalendlyWidget({ funnel = "unknown" }: CalendlyWidgetProps) {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    script.type = "text/javascript"
    document.head.appendChild(script)

    // Listen for Calendly events with comprehensive debugging
    if (typeof window !== 'undefined') {
      const handleCalendlyEvent = (event: MessageEvent) => {
        // Log ALL Calendly messages to debug what's happening
        if (event.origin?.includes('calendly') || event.data?.event?.includes('calendly')) {
          console.log('🔍 Calendly Message received:', {
            event: event.data.event,
            origin: event.origin,
            data: event.data
          });
        }

        // Try multiple possible Calendly event patterns
        const isCalendlyScheduled =
          event.data.event === 'calendly.event_scheduled' ||
          event.data.event === 'calendly.event_booked' ||
          event.data.type === 'calendly_event_scheduled';

        if (isCalendlyScheduled) {
          console.log('🎯 Calendly scheduling event detected!', event.data);

          // Extract user data from Calendly - try multiple data structures
          const payload = event.data.payload || event.data;
          console.log('📅 Full event data structure:', JSON.stringify(event.data, null, 2));

          // Try different possible locations for user data
          const inviteeData =
            payload.invitee ||
            payload.invitee_data ||
            payload.event?.invitee ||
            event.data.invitee ||
            {};

          // Also check if there's form data in the payload
          const formData = payload.form_data || payload.formData || {};

          console.log('📅 Raw invitee data:', inviteeData);
          console.log('📅 Form data:', formData);

          // Extract user data from multiple possible sources
          const userData = {
            email: inviteeData.email || formData.email || payload.email,
            first_name: inviteeData.first_name || inviteeData.firstName || formData.first_name || formData.name?.split(' ')[0],
            last_name: inviteeData.last_name || inviteeData.lastName || formData.last_name || formData.name?.split(' ').slice(1).join(' '),
            phone: inviteeData.phone || formData.phone,
            name: inviteeData.name || inviteeData.full_name || formData.name,
          };

          // Split name if first/last not provided separately
          if (userData.name && !userData.first_name && !userData.last_name) {
            const nameParts = userData.name.split(' ');
            userData.first_name = nameParts[0];
            userData.last_name = nameParts.slice(1).join(' ');
          }

          console.log('📅 Calendly user data extracted:', {
            hasEmail: !!userData.email,
            hasFirstName: !!userData.first_name,
            hasLastName: !!userData.last_name,
            hasPhone: !!userData.phone,
            hasName: !!userData.name,
            funnel,
            eventType: payload.event_type?.name,
            userData: userData  // Show actual values for debugging
          });

          // Track Schedule event when appointment is booked with user data
          trackEvent('Schedule',
            {
              funnel,
              content_type: 'appointment',
              content_name: `calendly_${funnel}`,
              value: 0,
              email: userData.email,
              first_name: userData.first_name,
              last_name: userData.last_name,
            },
            { enableCAPI: true }
          );
        }
      };

      (window as any).addEventListener('message', handleCalendlyEvent);

      return () => {
        (window as any).removeEventListener('message', handleCalendlyEvent);
      };
    }

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [funnel])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/ramonhenriquez/15min"
          style={{ minWidth: "320px", height: "700px" }}
        ></div>
      </div>
    </div>
  )
}
