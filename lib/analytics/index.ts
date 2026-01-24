// lib/analytics/index.ts
// Central export for analytics module

// Types
export type {
  FieldInteraction,
  StepAnalytics,
  SessionAnalytics,
  FieldAnalyticsReport,
  StepAnalyticsReport,
  AnalyticsEventType,
  AnalyticsEvent,
  AnalyticsConfig,
} from "./types";

export { DEFAULT_ANALYTICS_CONFIG } from "./types";

// Store
export { useAnalyticsStore, useStepAnalytics } from "./analytics-store";

// Hooks
export { useFieldAnalytics, createTrackedHandlers } from "./field-tracker";

// Exit tracking
export { useExitTracking, ExitTracker } from "./beacon";
