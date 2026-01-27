// components/screening/TrackedInput.tsx
// Wrapper components with built-in analytics tracking
"use client";

import React from "react";
import { useFieldAnalytics } from "@/lib/analytics/field-tracker";

interface TrackedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fieldId: string;
  stepId: number;
}

interface TrackedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  fieldId: string;
  stepId: number;
}

interface TrackedSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  fieldId: string;
  stepId: number;
  children: React.ReactNode;
}

/**
 * Input with built-in analytics tracking
 * Tracks hesitation time, dwell time, and corrections
 */
export function TrackedInput({
  fieldId,
  stepId,
  onFocus,
  onBlur,
  onInput,
  onKeyDown,
  ...props
}: TrackedInputProps) {
  const analytics = useFieldAnalytics(fieldId, stepId);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    analytics.onFocus();
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    analytics.onBlur();
    onBlur?.(e);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    analytics.onInput();
    onInput?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    analytics.onKeyDown(e);
    onKeyDown?.(e);
  };

  return (
    <input
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
    />
  );
}

/**
 * Textarea with built-in analytics tracking
 */
export function TrackedTextarea({
  fieldId,
  stepId,
  onFocus,
  onBlur,
  onInput,
  onKeyDown,
  ...props
}: TrackedTextareaProps) {
  const analytics = useFieldAnalytics(fieldId, stepId);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    analytics.onFocus();
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    analytics.onBlur();
    onBlur?.(e);
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    analytics.onInput();
    onInput?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    analytics.onKeyDown(e);
    onKeyDown?.(e);
  };

  return (
    <textarea
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
    />
  );
}

/**
 * Select with built-in analytics tracking
 */
export function TrackedSelect({
  fieldId,
  stepId,
  onFocus,
  onBlur,
  onChange,
  children,
  ...props
}: TrackedSelectProps) {
  const analytics = useFieldAnalytics(fieldId, stepId);

  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    analytics.onFocus();
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    analytics.onBlur();
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    analytics.onInput(); // Track selection as interaction
    onChange?.(e);
  };

  return (
    <select
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    >
      {children}
    </select>
  );
}

/**
 * Higher-order component to add tracking to any input-like component
 * Useful for custom components (date pickers, etc.)
 */
export function withTracking<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fieldId: string,
  stepId: number
) {
  return function TrackedComponent(props: P) {
    const analytics = useFieldAnalytics(fieldId, stepId);

    return (
      <div
        onFocus={analytics.onFocus}
        onBlur={analytics.onBlur}
      >
        <WrappedComponent {...props} />
      </div>
    );
  };
}

/**
 * Boolean toggle (Yes/No buttons) with analytics tracking
 * Common pattern in screening forms
 */
interface TrackedBooleanToggleProps {
  fieldId: string;
  stepId: number;
  value: boolean | undefined;
  onChange: (value: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
  className?: string;
}

export function TrackedBooleanToggle({
  fieldId,
  stepId,
  value,
  onChange,
  yesLabel = "Sí",
  noLabel = "No",
  className = "",
}: TrackedBooleanToggleProps) {
  const analytics = useFieldAnalytics(fieldId, stepId);

  const handleClick = (newValue: boolean) => {
    // Track as if user focused and immediately selected
    analytics.onFocus();
    analytics.onInput();
    onChange(newValue);
    // Small delay to ensure interaction is captured
    setTimeout(() => analytics.onBlur(), 50);
  };

  return (
    <div className={`flex gap-3 ${className}`}>
      <button
        type="button"
        onClick={() => handleClick(true)}
        className={`px-6 py-2 rounded-lg font-medium transition-all ${
          value === true
            ? "bg-[var(--coral)] text-white"
            : "bg-[var(--warm-gray-100)] text-[var(--warm-gray-700)] hover:bg-[var(--warm-gray-200)]"
        }`}
      >
        {yesLabel}
      </button>
      <button
        type="button"
        onClick={() => handleClick(false)}
        className={`px-6 py-2 rounded-lg font-medium transition-all ${
          value === false
            ? "bg-[var(--coral)] text-white"
            : "bg-[var(--warm-gray-100)] text-[var(--warm-gray-700)] hover:bg-[var(--warm-gray-200)]"
        }`}
      >
        {noLabel}
      </button>
    </div>
  );
}
