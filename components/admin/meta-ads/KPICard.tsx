'use client';

import Sparkline from './Sparkline';

interface KPICardProps {
  label: string;
  value: string;
  color?: 'coral' | 'gold' | 'green' | 'blue' | 'purple' | 'teal';
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  sparklineData?: number[];
  loading?: boolean;
  previousValue?: string;
  tooltip?: string;
}

const colorClasses: Record<string, { bg: string; text: string; border: string; sparkline: string }> = {
  coral: { bg: 'bg-coral/10', text: 'text-coral', border: 'border-coral/20', sparkline: '#e85555' },
  gold: { bg: 'bg-gold/10', text: 'text-gold', border: 'border-gold/20', sparkline: '#d4a853' },
  green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', sparkline: '#16a34a' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', sparkline: '#2563eb' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', sparkline: '#9333ea' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', sparkline: '#0d9488' },
};

// Skeleton loader for KPI card
function KPICardSkeleton() {
  return (
    <div className="rounded-xl p-4 border border-warm-gray-200 bg-white animate-pulse">
      <div className="flex items-center justify-between mb-2">
        <div className="h-4 w-16 bg-warm-gray-200 rounded" />
        <div className="h-4 w-4 bg-warm-gray-200 rounded-full" />
      </div>
      <div className="h-8 w-24 bg-warm-gray-200 rounded mb-2" />
      <div className="flex items-center gap-2">
        <div className="h-3 w-12 bg-warm-gray-200 rounded" />
        <div className="h-8 flex-1 bg-warm-gray-200 rounded" />
      </div>
    </div>
  );
}

export default function KPICard({
  label,
  value,
  color = 'green',
  icon,
  trend,
  sparklineData,
  loading,
  previousValue,
  tooltip,
}: KPICardProps) {
  if (loading) {
    return <KPICardSkeleton />;
  }

  const colors = colorClasses[color] || colorClasses.green;

  // Determine trend color
  const getTrendColor = () => {
    if (!trend) return '';
    if (trend.direction === 'up') return 'text-green-600';
    if (trend.direction === 'down') return 'text-red-500';
    return 'text-warm-gray-400';
  };

  // Trend arrow
  const getTrendArrow = () => {
    if (!trend) return null;
    if (trend.direction === 'up') {
      return (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    if (trend.direction === 'down') {
      return (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div
      className={`rounded-xl p-4 border ${colors.bg} ${colors.border} transition-all hover:shadow-md hover:-translate-y-0.5 group`}
      title={tooltip}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <p className={`text-sm font-medium ${colors.text} opacity-80`}>{label}</p>
        <div className="flex items-center gap-1">
          {tooltip && (
            <span className="text-warm-gray-400 opacity-60 group-hover:opacity-100 transition-opacity cursor-help">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          )}
          {icon && <span className={`${colors.text} opacity-60 group-hover:opacity-100 transition-opacity`}>{icon}</span>}
        </div>
      </div>

      {/* Value with trend */}
      <div className="flex items-baseline gap-2 mb-2">
        <p className={`text-2xl font-bold ${colors.text}`}>{value}</p>
        {trend && (
          <div className={`flex items-center gap-0.5 text-xs font-medium ${getTrendColor()}`}>
            {getTrendArrow()}
            <span>{Math.abs(trend.value).toFixed(1)}%</span>
          </div>
        )}
      </div>

      {/* Sparkline or Previous Value */}
      <div className="flex items-center justify-between">
        {previousValue && (
          <p className="text-xs text-warm-gray-400">
            Anterior: {previousValue}
          </p>
        )}
        {sparklineData && sparklineData.length > 1 && (
          <div className="flex-1 flex justify-end">
            <Sparkline
              data={sparklineData}
              color={colors.sparkline}
              height={24}
              width={70}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Export skeleton for use elsewhere
export { KPICardSkeleton };
