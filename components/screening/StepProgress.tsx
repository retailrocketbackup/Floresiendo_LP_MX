// components/screening/StepProgress.tsx
"use client";

import { cn } from "@/lib/utils";
import type { StepDefinition } from "@/lib/screening-types";

interface StepProgressProps {
  currentStep: number;
  steps: StepDefinition[];
  completionPercentage: number;
}

export function StepProgress({ currentStep, steps, completionPercentage }: StepProgressProps) {
  // Endowed Progress Effect: Start at 10% to increase completion motivation
  // Research shows pre-filled progress increases form completion by 10-15%
  const displayPercentage = Math.max(10, completionPercentage);

  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="h-2 bg-[var(--warm-gray-200)] rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-[var(--coral)] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${displayPercentage}%` }}
        />
      </div>

      {/* Step indicators - horizontal scroll on mobile */}
      <div className="flex justify-between py-2 px-2">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div
              key={step.id}
              className={cn(
                "flex flex-col items-center min-w-[48px]",
                "transition-all duration-200"
              )}
            >
              {/* Circle wrapper - provides space for ring */}
              <div className="p-1">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    isCompleted && "bg-[var(--burgundy)] text-white",
                    isActive && "bg-[var(--coral)] text-white ring-4 ring-[var(--coral-light)]",
                    !isCompleted && !isActive && "bg-[var(--warm-gray-200)] text-[var(--warm-gray-500)]"
                  )}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
              </div>

              {/* Label - hide on mobile except current */}
              <span
                className={cn(
                  "mt-2 text-xs text-center whitespace-nowrap",
                  isActive ? "text-[var(--coral)] font-medium" : "text-[var(--warm-gray-500)]",
                  "hidden md:block",
                  isActive && "block md:block"
                )}
              >
                {step.shortTitle}
              </span>
            </div>
          );
        })}
      </div>

      {/* Completion text */}
      <div className="text-center text-sm text-[var(--warm-gray-500)] mt-2">
        {displayPercentage}% completado
      </div>
    </div>
  );
}
