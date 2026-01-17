'use client';

import { useState } from 'react';

interface AgeBreakdown {
  age: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  conversions: number;
  reach: number;
}

interface DemographicsChartProps {
  data: AgeBreakdown[];
  loading?: boolean;
}

// Skeleton loader
function DemographicsSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-48 bg-warm-gray-200 rounded" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-16 h-4 bg-warm-gray-200 rounded" />
            <div className="flex-1 h-8 bg-warm-gray-200 rounded" />
            <div className="w-20 h-4 bg-warm-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Format helpers
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value);
}

function formatNumber(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toLocaleString('es-MX');
}

function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

// Get color based on performance (higher CTR = better)
function getPerformanceColor(ctr: number, maxCtr: number): string {
  const ratio = ctr / maxCtr;
  if (ratio >= 0.8) return '#10B981'; // green - excellent
  if (ratio >= 0.5) return '#3B82F6'; // blue - good
  if (ratio >= 0.3) return '#F59E0B'; // amber - moderate
  return '#EF4444'; // red - needs improvement
}

// Badge component for best/worst indicators
function PerformanceBadge({ type, label }: { type: 'best' | 'worst'; label: string }) {
  const styles = type === 'best'
    ? 'bg-green-100 text-green-700 border-green-200'
    : 'bg-red-100 text-red-700 border-red-200';

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${styles}`}>
      {type === 'best' ? '⬆' : '⬇'} {label}
    </span>
  );
}

// Individual bar row
function AgeBarRow({
  data,
  maxSpend,
  maxCtr,
  bestCtrAge,
  worstCpcAge,
  isExpanded,
  onToggle,
}: {
  data: AgeBreakdown;
  maxSpend: number;
  maxCtr: number;
  bestCtrAge: string;
  worstCpcAge: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const barWidth = (data.spend / maxSpend) * 100;
  const barColor = getPerformanceColor(data.ctr, maxCtr);

  return (
    <div className="group">
      {/* Mobile Layout */}
      <div
        className="sm:hidden py-3 cursor-pointer active:bg-warm-gray-50"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-warm-gray-700">{data.age}</span>
            {data.age === bestCtrAge && <PerformanceBadge type="best" label="CTR" />}
            {data.age === worstCpcAge && <PerformanceBadge type="worst" label="CPC" />}
          </div>
          <svg
            className={`w-4 h-4 text-warm-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="h-6 bg-warm-gray-100 rounded-lg overflow-hidden">
          <div
            className="h-full rounded-lg flex items-center px-2"
            style={{
              width: `${Math.max(barWidth, 10)}%`,
              backgroundColor: barColor + '30',
              borderLeft: `3px solid ${barColor}`,
            }}
          >
            <span className="text-xs font-medium text-warm-gray-700">{formatCurrency(data.spend)}</span>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span>
            <span className="font-semibold" style={{ color: barColor }}>{formatPercentage(data.ctr)}</span>
            <span className="text-warm-gray-400 ml-1">CTR</span>
          </span>
          <span>
            <span className="font-medium text-warm-gray-600">{formatCurrency(data.cpc)}</span>
            <span className="text-warm-gray-400 ml-1">CPC</span>
          </span>
        </div>
        {/* Expanded details for mobile */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-warm-gray-100">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-warm-gray-50 rounded-lg p-2">
                <p className="text-warm-gray-400">Impresiones</p>
                <p className="font-semibold text-warm-gray-700">{formatNumber(data.impressions)}</p>
              </div>
              <div className="bg-warm-gray-50 rounded-lg p-2">
                <p className="text-warm-gray-400">Clics</p>
                <p className="font-semibold text-warm-gray-700">{formatNumber(data.clicks)}</p>
              </div>
              <div className="bg-warm-gray-50 rounded-lg p-2">
                <p className="text-warm-gray-400">Alcance</p>
                <p className="font-semibold text-warm-gray-700">{formatNumber(data.reach)}</p>
              </div>
              <div className="bg-coral/10 rounded-lg p-2">
                <p className="text-coral">Conversiones</p>
                <p className="font-bold text-coral">{formatNumber(data.conversions)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block">
        <div className="flex items-center gap-4 py-2">
          {/* Age label */}
          <div className="w-16 text-sm font-medium text-warm-gray-700 flex items-center gap-1">
            {data.age}
            {data.age === bestCtrAge && <PerformanceBadge type="best" label="CTR" />}
            {data.age === worstCpcAge && <PerformanceBadge type="worst" label="CPC" />}
          </div>

          {/* Bar */}
          <div className="flex-1 relative">
            <div className="h-8 bg-warm-gray-100 rounded-lg overflow-hidden">
              <div
                className="h-full rounded-lg transition-all duration-500 flex items-center px-3"
                style={{
                  width: `${Math.max(barWidth, 5)}%`,
                  backgroundColor: barColor + '30',
                  borderLeft: `4px solid ${barColor}`,
                }}
              >
                <span className="text-xs font-medium text-warm-gray-700">
                  {formatCurrency(data.spend)}
                </span>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex gap-4 text-xs">
            <div className="w-16 text-right">
              <span className="font-semibold" style={{ color: barColor }}>
                {formatPercentage(data.ctr)}
              </span>
              <span className="text-warm-gray-400 ml-1">CTR</span>
            </div>
            <div className="w-20 text-right">
              <span className="font-medium text-warm-gray-600">
                {formatCurrency(data.cpc)}
              </span>
              <span className="text-warm-gray-400 ml-1">CPC</span>
            </div>
          </div>
        </div>

        {/* Expanded details on hover - desktop only */}
        <div className="hidden group-hover:block bg-warm-gray-50 rounded-lg p-3 mb-2 ml-20">
          <div className="grid grid-cols-4 gap-4 text-xs">
            <div>
              <p className="text-warm-gray-400">Impresiones</p>
              <p className="font-semibold text-warm-gray-700">{formatNumber(data.impressions)}</p>
            </div>
            <div>
              <p className="text-warm-gray-400">Clics</p>
              <p className="font-semibold text-warm-gray-700">{formatNumber(data.clicks)}</p>
            </div>
            <div>
              <p className="text-warm-gray-400">Alcance</p>
              <p className="font-semibold text-warm-gray-700">{formatNumber(data.reach)}</p>
            </div>
            <div>
              <p className="text-warm-gray-400">Conversiones</p>
              <p className="font-semibold text-coral">{formatNumber(data.conversions)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Summary stats component
function SummaryStats({ data }: { data: AgeBreakdown[] }) {
  const totalSpend = data.reduce((sum, d) => sum + d.spend, 0);
  const totalConversions = data.reduce((sum, d) => sum + d.conversions, 0);
  const avgCtr = data.reduce((sum, d) => sum + d.ctr, 0) / data.length;
  const avgCpc = data.reduce((sum, d) => sum + d.cpc, 0) / data.length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-3 sm:p-4 bg-warm-gray-50 rounded-lg mb-4">
      <div className="text-center">
        <p className="text-base sm:text-lg font-bold text-warm-gray-800">{formatCurrency(totalSpend)}</p>
        <p className="text-xs text-warm-gray-500">Gasto Total</p>
      </div>
      <div className="text-center">
        <p className="text-base sm:text-lg font-bold text-coral">{formatNumber(totalConversions)}</p>
        <p className="text-xs text-warm-gray-500">Conversiones</p>
      </div>
      <div className="text-center">
        <p className="text-base sm:text-lg font-bold text-green-600">{formatPercentage(avgCtr)}</p>
        <p className="text-xs text-warm-gray-500">CTR Promedio</p>
      </div>
      <div className="text-center">
        <p className="text-base sm:text-lg font-bold text-blue-600">{formatCurrency(avgCpc)}</p>
        <p className="text-xs text-warm-gray-500">CPC Promedio</p>
      </div>
    </div>
  );
}

export default function DemographicsChart({ data, loading }: DemographicsChartProps) {
  const [expandedAge, setExpandedAge] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-warm-gray-200 p-4 sm:p-6 shadow-sm">
        <DemographicsSkeleton />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-warm-gray-200 p-4 sm:p-6 shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold text-warm-gray-800 mb-4">
          Rendimiento por Edad
        </h3>
        <div className="text-center py-8 text-warm-gray-500">
          <svg className="w-12 h-12 mx-auto mb-3 text-warm-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p>No hay datos demográficos disponibles</p>
        </div>
      </div>
    );
  }

  // Calculate max values for scaling
  const maxSpend = Math.max(...data.map((d) => d.spend));
  const maxCtr = Math.max(...data.map((d) => d.ctr));

  // Find best/worst performers
  const bestCtrAge = data.reduce((best, d) => (d.ctr > best.ctr ? d : best), data[0]).age;
  const worstCpcAge = data.reduce((worst, d) => (d.cpc > worst.cpc ? d : worst), data[0]).age;

  // Sort by age group (natural order)
  const sortedData = [...data].sort((a, b) => {
    const getMinAge = (age: string) => parseInt(age.split('-')[0]) || 65;
    return getMinAge(a.age) - getMinAge(b.age);
  });

  const handleToggle = (age: string) => {
    setExpandedAge(expandedAge === age ? null : age);
  };

  return (
    <div className="bg-white rounded-xl border border-warm-gray-200 p-4 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-warm-gray-800">
            Rendimiento por Edad
          </h3>
          <p className="text-xs sm:text-sm text-warm-gray-500">
            Análisis demográfico de la audiencia
          </p>
        </div>
        {/* Legend - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-warm-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            Excelente
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            Bueno
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            Moderado
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            Mejorar
          </span>
        </div>
      </div>

      {/* Mobile tip */}
      <p className="sm:hidden text-xs text-warm-gray-400 mb-3">
        Toca cada grupo para ver más detalles
      </p>

      {/* Summary stats */}
      <SummaryStats data={data} />

      {/* Column headers - desktop only */}
      <div className="hidden sm:flex items-center gap-4 py-2 border-b border-warm-gray-100 text-xs text-warm-gray-500 font-medium">
        <div className="w-16">Edad</div>
        <div className="flex-1">Gasto</div>
        <div className="w-16 text-right">CTR</div>
        <div className="w-20 text-right">CPC</div>
      </div>

      {/* Age bars */}
      <div className="divide-y divide-warm-gray-100 sm:divide-warm-gray-50">
        {sortedData.map((ageData) => (
          <AgeBarRow
            key={ageData.age}
            data={ageData}
            maxSpend={maxSpend}
            maxCtr={maxCtr}
            bestCtrAge={bestCtrAge}
            worstCpcAge={worstCpcAge}
            isExpanded={expandedAge === ageData.age}
            onToggle={() => handleToggle(ageData.age)}
          />
        ))}
      </div>

      {/* Insights footer */}
      <div className="mt-4 pt-4 border-t border-warm-gray-100">
        <h4 className="text-sm font-medium text-warm-gray-700 mb-2">Insights</h4>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2">
          <div className="px-3 py-2 bg-green-50 rounded-lg text-xs">
            <span className="font-semibold text-green-700">{bestCtrAge}</span>
            <span className="text-green-600"> tiene el mejor CTR - Audiencia más comprometida</span>
          </div>
          <div className="px-3 py-2 bg-amber-50 rounded-lg text-xs">
            <span className="font-semibold text-amber-700">{worstCpcAge}</span>
            <span className="text-amber-600"> tiene el CPC más alto - Considera optimizar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
