'use client';

import { useState, ReactNode } from 'react';

interface CollapsibleSectionProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  defaultOpen?: boolean;
  badge?: string | number;
  badgeColor?: string;
  children: ReactNode;
}

export default function CollapsibleSection({
  title,
  subtitle,
  icon,
  defaultOpen = false,
  badge,
  badgeColor = '#E07A5F',
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl border border-warm-gray-200 shadow-sm overflow-hidden transition-all duration-300">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-warm-gray-50 transition-colors min-h-[56px]"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          {icon && (
            <div className="p-1.5 sm:p-2 rounded-lg bg-warm-gray-100 text-warm-gray-600 flex-shrink-0">
              {icon}
            </div>
          )}
          <div className="text-left min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-semibold text-warm-gray-800 truncate">{title}</h3>
              {badge !== undefined && (
                <span
                  className="px-2 py-0.5 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: badgeColor + '20',
                    color: badgeColor,
                  }}
                >
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-warm-gray-500">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Chevron - min 44px touch target */}
        <div
          className={`p-2 sm:p-1 rounded-full transition-transform duration-300 flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <svg
            className="w-5 h-5 text-warm-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Content - Collapsible */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t border-warm-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}
