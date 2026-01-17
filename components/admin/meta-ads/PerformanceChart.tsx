'use client';

import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  ComposedChart,
} from 'recharts';
import type { DailyDataPoint } from '@/lib/meta-ads-types';
import { ChartSkeleton } from './Skeleton';
import { ChartEmptyState } from './EmptyState';

type MetricKey = 'spend' | 'impressions' | 'clicks' | 'reach' | 'ctr';

interface PerformanceChartProps {
  data: DailyDataPoint[];
  comparisonData?: DailyDataPoint[];
  metric?: MetricKey;
  loading?: boolean;
  showComparison?: boolean;
  onToggleComparison?: () => void;
}

const metricConfig: Record<MetricKey, { label: string; color: string; format: (v: number) => string; suffix?: string }> = {
  spend: {
    label: 'Gasto',
    color: '#E07A5F', // coral
    format: (v) => `$${v.toFixed(2)}`,
    suffix: 'USD',
  },
  impressions: {
    label: 'Impresiones',
    color: '#3B82F6', // blue
    format: (v) => v.toLocaleString('es-MX'),
  },
  clicks: {
    label: 'Clics',
    color: '#10B981', // green
    format: (v) => v.toLocaleString('es-MX'),
  },
  reach: {
    label: 'Alcance',
    color: '#8B5CF6', // purple
    format: (v) => v.toLocaleString('es-MX'),
  },
  ctr: {
    label: 'CTR',
    color: '#D4A853', // gold
    format: (v) => `${v.toFixed(2)}%`,
    suffix: '%',
  },
};

// Custom tooltip component
function CustomTooltip({
  active,
  payload,
  label,
  selectedMetrics,
  showComparison
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
  selectedMetrics: MetricKey[];
  showComparison: boolean;
}) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white border border-warm-gray-200 rounded-xl shadow-lg p-3 min-w-[180px]">
      <p className="text-sm font-medium text-warm-gray-700 mb-2 border-b border-warm-gray-100 pb-2">
        {label}
      </p>
      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          const isComparison = entry.dataKey.startsWith('comparison_');
          const metricKey = isComparison
            ? entry.dataKey.replace('comparison_', '') as MetricKey
            : entry.dataKey as MetricKey;
          const config = metricConfig[metricKey];

          if (!config) return null;

          return (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${isComparison ? 'border-2 bg-transparent' : ''}`}
                  style={{
                    backgroundColor: isComparison ? 'transparent' : entry.color,
                    borderColor: isComparison ? entry.color : 'transparent'
                  }}
                />
                <span className="text-xs text-warm-gray-500">
                  {config.label}
                  {isComparison && ' (anterior)'}
                </span>
              </div>
              <span className="text-sm font-semibold" style={{ color: entry.color }}>
                {config.format(entry.value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Metric toggle button
function MetricToggle({
  metric,
  isActive,
  onClick
}: {
  metric: MetricKey;
  isActive: boolean;
  onClick: () => void;
}) {
  const config = metricConfig[metric];

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
        isActive
          ? 'text-white shadow-sm'
          : 'bg-warm-gray-100 text-warm-gray-500 hover:bg-warm-gray-200'
      }`}
      style={isActive ? { backgroundColor: config.color } : {}}
    >
      {config.label}
    </button>
  );
}

export default function PerformanceChart({
  data,
  comparisonData,
  metric = 'spend',
  loading,
  showComparison = false,
  onToggleComparison,
}: PerformanceChartProps) {
  const [selectedMetrics, setSelectedMetrics] = useState<MetricKey[]>([metric]);
  const [hoveredMetric, setHoveredMetric] = useState<MetricKey | null>(null);

  const toggleMetric = (m: MetricKey) => {
    setSelectedMetrics(prev => {
      if (prev.includes(m)) {
        // Don't allow deselecting the last metric
        if (prev.length === 1) return prev;
        return prev.filter(x => x !== m);
      }
      // Limit to 3 metrics for readability
      if (prev.length >= 3) {
        return [...prev.slice(1), m];
      }
      return [...prev, m];
    });
  };

  if (loading) {
    return <ChartSkeleton />;
  }

  if (data.length === 0) {
    return <ChartEmptyState />;
  }

  // Format dates and merge comparison data
  const chartData = data.map((d, index) => {
    const baseData: Record<string, unknown> = {
      ...d,
      dateLabel: new Date(d.date).toLocaleDateString('es-MX', {
        month: 'short',
        day: 'numeric',
      }),
    };

    // Add comparison data if available
    if (showComparison && comparisonData && comparisonData[index]) {
      const compData = comparisonData[index];
      baseData.comparison_spend = compData.spend;
      baseData.comparison_impressions = compData.impressions;
      baseData.comparison_clicks = compData.clicks;
      baseData.comparison_reach = compData.reach;
      baseData.comparison_ctr = compData.ctr;
    }

    return baseData;
  });

  // Check if multi-metric mode
  const isMultiMetric = selectedMetrics.length > 1;

  return (
    <div className="space-y-4">
      {/* Chart Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Metric Toggles */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(metricConfig) as MetricKey[]).map((m) => (
            <MetricToggle
              key={m}
              metric={m}
              isActive={selectedMetrics.includes(m)}
              onClick={() => toggleMetric(m)}
            />
          ))}
        </div>

        {/* Comparison Toggle */}
        {onToggleComparison && (
          <button
            onClick={onToggleComparison}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              showComparison
                ? 'bg-purple-100 text-purple-700 border border-purple-200'
                : 'bg-warm-gray-100 text-warm-gray-500 hover:bg-warm-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Comparar periodo
          </button>
        )}
      </div>

      {/* Chart */}
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              {selectedMetrics.map((m) => (
                <linearGradient key={m} id={`gradient-${m}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={metricConfig[m].color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={metricConfig[m].color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="dateLabel"
              tick={{ fontSize: 11, fill: '#6B7280' }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              tickMargin={8}
            />

            {/* Primary Y-Axis */}
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11, fill: '#6B7280' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                const primaryMetric = selectedMetrics[0];
                if (primaryMetric === 'spend') return `$${value}`;
                if (primaryMetric === 'ctr') return `${value}%`;
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                return value;
              }}
              width={50}
            />

            {/* Secondary Y-Axis for multi-metric */}
            {isMultiMetric && (
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: '#6B7280' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  const secondaryMetric = selectedMetrics[1];
                  if (secondaryMetric === 'spend') return `$${value}`;
                  if (secondaryMetric === 'ctr') return `${value}%`;
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                  return value;
                }}
                width={50}
              />
            )}

            <Tooltip
              content={
                <CustomTooltip
                  selectedMetrics={selectedMetrics}
                  showComparison={showComparison}
                />
              }
            />

            {/* Render areas for each selected metric */}
            {selectedMetrics.map((m, index) => (
              <Area
                key={m}
                yAxisId={index === 0 ? 'left' : 'right'}
                type="monotone"
                dataKey={m}
                stroke={metricConfig[m].color}
                strokeWidth={hoveredMetric === m ? 3 : 2}
                fill={`url(#gradient-${m})`}
                fillOpacity={hoveredMetric && hoveredMetric !== m ? 0.3 : 1}
                onMouseEnter={() => setHoveredMetric(m)}
                onMouseLeave={() => setHoveredMetric(null)}
                animationDuration={500}
              />
            ))}

            {/* Comparison lines (dashed) */}
            {showComparison && comparisonData && selectedMetrics.map((m, index) => (
              <Line
                key={`comparison-${m}`}
                yAxisId={index === 0 ? 'left' : 'right'}
                type="monotone"
                dataKey={`comparison_${m}`}
                stroke={metricConfig[m].color}
                strokeWidth={1.5}
                strokeDasharray="5 5"
                dot={false}
                opacity={0.5}
                animationDuration={500}
              />
            ))}

            {/* Legend */}
            {(selectedMetrics.length > 1 || showComparison) && (
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value: string) => {
                  const isComparison = value.startsWith('comparison_');
                  const metricKey = isComparison
                    ? value.replace('comparison_', '') as MetricKey
                    : value as MetricKey;
                  const config = metricConfig[metricKey];
                  return (
                    <span className="text-xs text-warm-gray-600">
                      {config?.label || value}
                      {isComparison && ' (anterior)'}
                    </span>
                  );
                }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Summary */}
      <div className="flex flex-wrap gap-4 pt-2 border-t border-warm-gray-100">
        {selectedMetrics.map((m) => {
          const config = metricConfig[m];
          const values = data.map(d => d[m] || 0);
          const total = values.reduce((a, b) => a + b, 0);
          const avg = values.length > 0 ? total / values.length : 0;
          const max = Math.max(...values);
          const min = Math.min(...values);

          return (
            <div key={m} className="flex-1 min-w-[120px]">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-xs font-medium text-warm-gray-600">{config.label}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-warm-gray-400">Total</p>
                  <p className="font-semibold text-warm-gray-700">{config.format(total)}</p>
                </div>
                <div>
                  <p className="text-warm-gray-400">Prom.</p>
                  <p className="font-semibold text-warm-gray-700">{config.format(avg)}</p>
                </div>
                <div>
                  <p className="text-warm-gray-400">Max</p>
                  <p className="font-semibold text-warm-gray-700">{config.format(max)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
