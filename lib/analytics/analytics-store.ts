// lib/analytics/analytics-store.ts
// Zustand store for buffering and managing analytics events
"use client";

import { create } from "zustand";
import type {
  FieldInteraction,
  StepAnalytics,
  SessionAnalytics,
  AnalyticsConfig,
  AnalyticsEvent,
} from "./types";
import { DEFAULT_ANALYTICS_CONFIG } from "./types";

// Generate ephemeral session ID (not linked to user identity)
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Get or create session ID from sessionStorage
function getSessionId(): string {
  if (typeof window === "undefined") return generateSessionId();

  const existing = sessionStorage.getItem("screening_analytics_session");
  if (existing) return existing;

  const newId = generateSessionId();
  sessionStorage.setItem("screening_analytics_session", newId);
  return newId;
}

interface AnalyticsState {
  // Session data
  sessionId: string;
  sessionStartTime: number;
  lastActiveTime: number;
  lastActiveStep: number;
  lastActiveField: string | null;

  // Buffered events (sent in batches)
  fieldInteractions: FieldInteraction[];
  stepAnalytics: StepAnalytics[];

  // Step timing tracking
  currentStepStartTime: number | null;

  // Configuration
  config: AnalyticsConfig;

  // Actions
  initSession: () => void;
  logFieldInteraction: (interaction: FieldInteraction) => void;
  logStepComplete: (stepId: number, stepName: string, validationAttempts: number) => void;
  setLastActiveField: (fieldId: string) => void;
  setCurrentStep: (stepId: number) => void;
  markSessionComplete: () => void;
  flushEvents: () => Promise<void>;
  getSessionAnalytics: () => Partial<SessionAnalytics>;
}

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  // Initial state
  sessionId: "",
  sessionStartTime: 0,
  lastActiveTime: 0,
  lastActiveStep: 1,
  lastActiveField: null,
  fieldInteractions: [],
  stepAnalytics: [],
  currentStepStartTime: null,
  config: DEFAULT_ANALYTICS_CONFIG,

  // Initialize session (called on form mount)
  initSession: () => {
    const sessionId = getSessionId();
    const now = Date.now();

    set({
      sessionId,
      sessionStartTime: now,
      lastActiveTime: now,
      currentStepStartTime: now,
    });

    if (get().config.debug) {
      console.log("[Analytics] Session initialized:", sessionId);
    }

    // Send session_start event
    sendAnalyticsEvent({
      type: "session_start",
      sessionId,
      timestamp: now,
      data: {
        sessionId,
        startTime: now,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        screenWidth: typeof window !== "undefined" ? window.innerWidth : 0,
      },
    });
  },

  // Log a field interaction (called on blur)
  logFieldInteraction: (interaction: FieldInteraction) => {
    const state = get();

    // Add session ID to interaction
    const fullInteraction = {
      ...interaction,
      sessionId: state.sessionId,
    };

    set((s) => ({
      fieldInteractions: [...s.fieldInteractions, fullInteraction],
      lastActiveTime: Date.now(),
      lastActiveField: interaction.fieldId,
      lastActiveStep: interaction.stepId,
    }));

    // Check if we should flush events
    if (get().fieldInteractions.length >= state.config.batchSize) {
      get().flushEvents();
    }
  },

  // Log step completion (called when user advances)
  logStepComplete: (stepId: number, stepName: string, validationAttempts: number) => {
    const state = get();
    const now = Date.now();
    const timeOnStepMs = state.currentStepStartTime
      ? now - state.currentStepStartTime
      : 0;

    const stepAnalytics: StepAnalytics = {
      stepId,
      stepName,
      timeOnStepMs,
      fieldsInteracted: state.fieldInteractions.filter((f) => f.stepId === stepId).length,
      validationAttempts,
      timestamp: now,
    };

    set((s) => ({
      stepAnalytics: [...s.stepAnalytics, stepAnalytics],
      currentStepStartTime: now, // Reset for next step
      lastActiveTime: now,
      lastActiveStep: stepId + 1,
    }));

    if (state.config.debug) {
      console.log(`[Analytics] Step ${stepId} complete:`, {
        time: `${timeOnStepMs}ms`,
        fieldsInteracted: stepAnalytics.fieldsInteracted,
        validationAttempts,
      });
    }

    // Always flush on step change
    get().flushEvents();
  },

  // Update last active field (for abandonment tracking)
  setLastActiveField: (fieldId: string) => {
    set({ lastActiveField: fieldId, lastActiveTime: Date.now() });
  },

  // Update current step (for timing)
  setCurrentStep: (stepId: number) => {
    set({
      lastActiveStep: stepId,
      currentStepStartTime: Date.now(),
      lastActiveTime: Date.now(),
    });
  },

  // Mark session as complete (form submitted)
  markSessionComplete: () => {
    const state = get();
    const now = Date.now();

    if (state.config.debug) {
      console.log("[Analytics] Session complete");
    }

    // Send session_complete event
    sendAnalyticsEvent({
      type: "session_complete",
      sessionId: state.sessionId,
      timestamp: now,
      data: get().getSessionAnalytics(),
    });

    // Flush any remaining events
    get().flushEvents();

    // Clear session storage
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("screening_analytics_session");
    }
  },

  // Flush buffered events to the server
  flushEvents: async () => {
    const state = get();

    if (state.fieldInteractions.length === 0 && state.stepAnalytics.length === 0) {
      return;
    }

    const eventsToSend = {
      sessionId: state.sessionId,
      fieldInteractions: [...state.fieldInteractions],
      stepAnalytics: [...state.stepAnalytics],
      lastActiveStep: state.lastActiveStep,
      lastActiveField: state.lastActiveField,
      timestamp: Date.now(),
    };

    // Clear the buffer
    set({ fieldInteractions: [], stepAnalytics: [] });

    try {
      await fetch("/api/screening-analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventsToSend),
      });

      if (state.config.debug) {
        console.log("[Analytics] Events flushed:", {
          fieldInteractions: eventsToSend.fieldInteractions.length,
          stepAnalytics: eventsToSend.stepAnalytics.length,
        });
      }
    } catch (error) {
      // Silently fail - don't break the form for analytics
      console.error("[Analytics] Failed to flush events:", error);

      // Re-add events to buffer for retry
      set((s) => ({
        fieldInteractions: [...eventsToSend.fieldInteractions, ...s.fieldInteractions],
        stepAnalytics: [...eventsToSend.stepAnalytics, ...s.stepAnalytics],
      }));
    }
  },

  // Get current session analytics (for beacon/exit)
  getSessionAnalytics: () => {
    const state = get();
    return {
      sessionId: state.sessionId,
      startTime: state.sessionStartTime,
      lastActiveTime: state.lastActiveTime,
      lastActiveStep: state.lastActiveStep,
      lastActiveField: state.lastActiveField,
      completed: false,
      fieldInteractions: state.fieldInteractions,
      stepAnalytics: state.stepAnalytics,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      screenWidth: typeof window !== "undefined" ? window.innerWidth : 0,
    };
  },
}));

// Helper to send analytics events
async function sendAnalyticsEvent(event: AnalyticsEvent) {
  try {
    await fetch("/api/screening-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
  } catch (error) {
    // Silently fail
    console.error("[Analytics] Failed to send event:", error);
  }
}

// Export a hook for step tracking integration
export function useStepAnalytics() {
  const { logStepComplete, setCurrentStep, initSession, markSessionComplete } =
    useAnalyticsStore();

  return {
    onStepEnter: (stepId: number) => setCurrentStep(stepId),
    onStepComplete: (stepId: number, stepName: string, validationAttempts: number) =>
      logStepComplete(stepId, stepName, validationAttempts),
    initSession,
    markSessionComplete,
  };
}
