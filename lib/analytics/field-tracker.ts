// lib/analytics/field-tracker.ts
// React hook for tracking field-level interactions (hesitation, dwell, refills)
"use client";

import { useRef, useCallback } from "react";
import { useAnalyticsStore } from "./analytics-store";
import type { FieldInteraction } from "./types";
import { DEFAULT_ANALYTICS_CONFIG } from "./types";

/**
 * Hook to track field-level analytics
 * Returns event handlers to spread onto input elements
 *
 * @param fieldId - Unique identifier for the field (e.g., "basicInfo.fullName")
 * @param stepId - Current step number (1-7)
 *
 * @example
 * const { handlers } = useFieldAnalytics("basicInfo.fullName", 1);
 * <input {...handlers} value={value} onChange={onChange} />
 */
export function useFieldAnalytics(fieldId: string, stepId: number) {
  const { logFieldInteraction, setLastActiveField, config } = useAnalyticsStore();

  // Use refs to avoid re-renders during typing
  const focusTime = useRef<number | null>(null);
  const firstInteractionTime = useRef<number | null>(null);
  const hasTyped = useRef(false);
  const refillCount = useRef(0);

  const onFocus = useCallback(() => {
    focusTime.current = Date.now();
    hasTyped.current = false;
    firstInteractionTime.current = null;
    refillCount.current = 0;

    // Track last active field for abandonment detection
    setLastActiveField(fieldId);

    if (config.debug) {
      console.log(`[Analytics] Field focus: ${fieldId}`);
    }
  }, [fieldId, setLastActiveField, config.debug]);

  const onInput = useCallback(() => {
    // Capture the VERY first interaction time for hesitation calculation
    if (!hasTyped.current && focusTime.current) {
      firstInteractionTime.current = Date.now();
      hasTyped.current = true;
    }
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Track deletions/corrections as "refills"
    if (e.key === "Backspace" || e.key === "Delete") {
      refillCount.current++;
    }
  }, []);

  const onBlur = useCallback(() => {
    if (focusTime.current) {
      const now = Date.now();
      const dwellMs = now - focusTime.current;

      // Calculate hesitation time
      let hesitationMs: number;
      if (firstInteractionTime.current) {
        hesitationMs = firstInteractionTime.current - focusTime.current;
      } else {
        // If they focused but never typed, hesitation equals dwell time
        // (They looked, hesitated, and left without answering)
        hesitationMs = dwellMs;
      }

      // Only log meaningful hesitation (above motor reaction time threshold)
      const meaningfulHesitation =
        hesitationMs >= config.minHesitationMs ? hesitationMs : 0;

      const interaction: FieldInteraction = {
        fieldId,
        stepId,
        hesitationMs: meaningfulHesitation,
        dwellMs,
        refillCount: refillCount.current,
        timestamp: now,
      };

      logFieldInteraction(interaction);

      if (config.debug) {
        console.log(`[Analytics] Field blur: ${fieldId}`, {
          hesitation: `${meaningfulHesitation}ms`,
          dwell: `${dwellMs}ms`,
          refills: refillCount.current,
        });
      }

      // Reset refs
      focusTime.current = null;
      firstInteractionTime.current = null;
      hasTyped.current = false;
      refillCount.current = 0;
    }
  }, [fieldId, stepId, logFieldInteraction, config.debug, config.minHesitationMs]);

  // Return handlers to spread onto input elements
  return {
    handlers: {
      onFocus,
      onBlur,
      onInput,
      onKeyDown,
    },
    // Also export individual handlers for more control
    onFocus,
    onBlur,
    onInput,
    onKeyDown,
  };
}

/**
 * Higher-order component style: wraps existing onChange/onBlur handlers
 * Useful when you can't easily spread handlers
 */
export function createTrackedHandlers(
  fieldId: string,
  stepId: number,
  existingHandlers?: {
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
    onChange?: (e: React.ChangeEvent) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
  }
) {
  const analytics = useFieldAnalytics(fieldId, stepId);

  return {
    onFocus: (e: React.FocusEvent) => {
      analytics.onFocus();
      existingHandlers?.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      analytics.onBlur();
      existingHandlers?.onBlur?.(e);
    },
    onChange: (e: React.ChangeEvent) => {
      analytics.onInput();
      existingHandlers?.onChange?.(e);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      analytics.onKeyDown(e);
      existingHandlers?.onKeyDown?.(e);
    },
  };
}
