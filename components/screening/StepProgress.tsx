// components/screening/StepProgress.tsx
"use client";

interface StepProgressProps {
  completionPercentage: number;
}

export function StepProgress({ completionPercentage }: StepProgressProps) {
  // Endowed Progress Effect: Start at 10% to increase completion motivation
  // Research shows pre-filled progress increases form completion by 10-15%
  const displayPercentage = Math.max(10, completionPercentage);

  return (
    <div className="mb-6">
      {/* Progress bar */}
      <div className="h-2 bg-[var(--warm-gray-200)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--coral)] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${displayPercentage}%` }}
        />
      </div>

      {/* Completion text */}
      <div className="text-center text-sm text-[var(--warm-gray-500)] mt-2">
        {displayPercentage}% completado
      </div>
    </div>
  );
}
