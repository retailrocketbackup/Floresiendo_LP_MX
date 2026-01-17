'use client';

import type { TimeRange } from '@/lib/meta-ads-types';

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}

const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: 'today', label: 'Hoy' },
  { value: 'yesterday', label: 'Ayer' },
  { value: 'last_7d', label: 'Ultimos 7 dias' },
  { value: 'last_14d', label: 'Ultimos 14 dias' },
  { value: 'last_30d', label: 'Ultimos 30 dias' },
  { value: 'this_month', label: 'Este mes' },
  { value: 'last_month', label: 'Mes pasado' },
  { value: 'maximum', label: 'Todo el tiempo' },
];

export default function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TimeRange)}
      className="border border-warm-gray-200 rounded-xl px-4 py-2.5 bg-white text-warm-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all cursor-pointer"
    >
      {timeRangeOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
