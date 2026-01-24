// lib/analytics/types.ts
// Field-level analytics types for screening form optimization

/**
 * Represents a single field interaction event
 * Captures hesitation, dwell time, and correction behavior
 */
export interface FieldInteraction {
  fieldId: string;           // e.g., "basicInfo.fullName", "medicalHistory.hasCardiacCondition"
  stepId: number;            // 1-7 step number
  hesitationMs: number;      // Time from focus to first keystroke (cognitive load indicator)
  dwellMs: number;           // Total time field was focused (UI friction indicator)
  refillCount: number;       // Number of deletions/corrections (input UX problems)
  timestamp: number;         // Unix timestamp when interaction ended
}

/**
 * Analytics data for a single step completion
 */
export interface StepAnalytics {
  stepId: number;
  stepName: string;          // e.g., "basicInfo", "medicalHistory"
  timeOnStepMs: number;      // Total time spent on this step
  fieldsInteracted: number;  // Number of fields the user touched
  validationAttempts: number; // How many times they tried to advance
  timestamp: number;
}

/**
 * Complete session analytics for a screening form attempt
 */
export interface SessionAnalytics {
  sessionId: string;         // Ephemeral session ID (not linked to user identity)
  startTime: number;         // When the form was started
  lastActiveTime: number;    // Last interaction timestamp
  lastActiveStep: number;    // Step number when user left
  lastActiveField: string | null; // Field ID when user left (abandonment point)
  completed: boolean;        // Whether form was submitted
  fieldInteractions: FieldInteraction[];
  stepAnalytics: StepAnalytics[];
  userAgent: string;         // For device cohort analysis
  screenWidth: number;       // For responsive design analysis
}

/**
 * Aggregated analytics for reporting
 * This is what gets displayed in admin dashboard
 */
export interface FieldAnalyticsReport {
  fieldId: string;
  sampleSize: number;
  avgHesitationMs: number;
  medianHesitationMs: number;
  avgDwellMs: number;
  medianDwellMs: number;
  avgRefillCount: number;
  abandonmentRate: number;   // % of sessions that ended on this field
}

export interface StepAnalyticsReport {
  stepId: number;
  stepName: string;
  sampleSize: number;
  avgTimeMs: number;
  medianTimeMs: number;
  dropOffRate: number;       // % of users who didn't proceed to next step
  completionRate: number;    // % of users who reached this step and completed it
}

/**
 * Analytics event types for the API
 */
export type AnalyticsEventType =
  | 'field_interaction'
  | 'step_complete'
  | 'session_start'
  | 'session_pause'      // Tab hidden / navigated away
  | 'session_resume'     // Returned to form
  | 'session_complete'   // Form submitted
  | 'session_abandon';   // Inferred abandonment (24h+ inactive)

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  sessionId: string;
  timestamp: number;
  data: FieldInteraction | StepAnalytics | Partial<SessionAnalytics>;
}

/**
 * Configuration for analytics behavior
 */
export interface AnalyticsConfig {
  enabled: boolean;
  debug: boolean;                    // Log events to console
  minHesitationMs: number;           // Ignore hesitation below this (motor reaction time)
  heartbeatIntervalMs: number;       // How often to send heartbeat
  abandonmentThresholdMs: number;    // Time after which session is considered abandoned
  batchSize: number;                 // Number of events to batch before sending
}

export const DEFAULT_ANALYTICS_CONFIG: AnalyticsConfig = {
  enabled: true,
  debug: process.env.NODE_ENV === 'development',
  minHesitationMs: 200,              // 200ms minimum (human reaction time)
  heartbeatIntervalMs: 30000,        // 30 seconds
  abandonmentThresholdMs: 86400000,  // 24 hours
  batchSize: 10,                     // Send every 10 events or on step change
};
