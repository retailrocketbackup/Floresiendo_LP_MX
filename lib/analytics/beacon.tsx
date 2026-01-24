// lib/analytics/beacon.ts
// Exit tracking using Beacon API for reliable data capture on page leave
"use client";

import { useEffect, useRef } from "react";
import { useAnalyticsStore } from "./analytics-store";

/**
 * Hook to track session exits using the Beacon API
 * Captures the last active field when user leaves the page
 *
 * Uses visibilitychange instead of beforeunload because:
 * - Works reliably on mobile (iOS Safari kills processes without firing beforeunload)
 * - Fires when tab is hidden (switching tabs, minimizing)
 * - Beacon API ensures data is sent even during page unload
 */
export function useExitTracking() {
  const { getSessionAnalytics, config, flushEvents } = useAnalyticsStore();
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null);
  const lastSentRef = useRef<number>(0);

  useEffect(() => {
    // Don't track in SSR
    if (typeof window === "undefined") return;

    // Handler for visibility change (tab hidden/shown)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // User is leaving - send beacon with current state
        sendBeacon("session_pause");
      } else if (document.visibilityState === "visible") {
        // User returned - send resume event
        const now = Date.now();
        const timeSinceLastSent = now - lastSentRef.current;

        // If they were gone for more than 5 minutes, it's a meaningful resume
        if (timeSinceLastSent > 5 * 60 * 1000) {
          sendBeacon("session_resume");
        }
      }
    };

    // Handler for page unload (backup for visibilitychange)
    const handleBeforeUnload = () => {
      sendBeacon("session_pause");
    };

    // Heartbeat: periodically send current state
    // This helps track abandonment more accurately
    const startHeartbeat = () => {
      heartbeatRef.current = setInterval(() => {
        // Only send heartbeat if there's been activity
        const analytics = getSessionAnalytics();
        if (analytics.lastActiveTime && analytics.lastActiveTime > lastSentRef.current) {
          sendHeartbeat();
        }
      }, config.heartbeatIntervalMs);
    };

    // Send beacon with analytics data
    const sendBeacon = (eventType: "session_pause" | "session_resume") => {
      const analytics = getSessionAnalytics();
      const payload = JSON.stringify({
        type: eventType,
        sessionId: analytics.sessionId,
        timestamp: Date.now(),
        data: {
          lastActiveStep: analytics.lastActiveStep,
          lastActiveField: analytics.lastActiveField,
          lastActiveTime: analytics.lastActiveTime,
          sessionDurationMs: analytics.lastActiveTime
            ? analytics.lastActiveTime - (analytics.startTime || 0)
            : 0,
        },
      });

      // Use sendBeacon for reliable delivery during unload
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/screening-analytics", payload);
      } else {
        // Fallback to fetch with keepalive
        fetch("/api/screening-analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {
          // Silently fail
        });
      }

      lastSentRef.current = Date.now();

      if (config.debug) {
        console.log(`[Analytics] Beacon sent: ${eventType}`, {
          lastStep: analytics.lastActiveStep,
          lastField: analytics.lastActiveField,
        });
      }
    };

    // Send heartbeat (less data than full beacon)
    const sendHeartbeat = () => {
      const analytics = getSessionAnalytics();
      const payload = JSON.stringify({
        type: "heartbeat",
        sessionId: analytics.sessionId,
        timestamp: Date.now(),
        data: {
          lastActiveStep: analytics.lastActiveStep,
          lastActiveField: analytics.lastActiveField,
        },
      });

      // Heartbeats can use regular fetch (not during unload)
      fetch("/api/screening-analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      }).catch(() => {
        // Silently fail
      });

      lastSentRef.current = Date.now();

      if (config.debug) {
        console.log("[Analytics] Heartbeat sent");
      }
    };

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Start heartbeat
    startHeartbeat();

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);

      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
      }

      // Flush any remaining events on unmount
      flushEvents();
    };
  }, [getSessionAnalytics, config, flushEvents]);
}

/**
 * Component to wrap form and enable exit tracking
 * Usage: <ExitTracker><YourForm /></ExitTracker>
 */
export function ExitTracker({ children }: { children: React.ReactNode }) {
  useExitTracking();
  return <>{children}</>;
}
