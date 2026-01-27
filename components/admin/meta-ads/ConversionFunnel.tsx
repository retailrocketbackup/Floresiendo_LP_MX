'use client';

interface FunnelStep {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

interface ConversionItem {
  action_type: string;
  label: string;
  value: number;
  cost_per?: number;
  color: string;
}

interface ConversionFunnelProps {
  impressions: number;
  clicks: number;
  landingPageViews: number;
  conversions: ConversionItem[];
  totalSpend: number;
  loading?: boolean;
  // New: separate leads and registrations for distinct funnel stages
  totalLeads?: number;
  totalRegistrations?: number;
}

// Skeleton loader
function FunnelSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-32 bg-warm-gray-200 rounded" />
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex-1 h-32 bg-warm-gray-200 rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 bg-warm-gray-200 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// Format helpers
function formatNumber(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toLocaleString('es-MX');
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value);
}

// Funnel step component
function FunnelStep({
  step,
  index,
  total,
  previousValue,
}: {
  step: FunnelStep;
  index: number;
  total: number;
  previousValue: number;
}) {
  const percentage = previousValue > 0 ? ((step.value / previousValue) * 100).toFixed(1) : '100';
  const widthPercent = Math.max(30, (step.value / total) * 100);

  return (
    <div className="flex flex-col items-center flex-1">
      {/* Arrow from previous */}
      {index > 0 && (
        <div className="flex items-center justify-center mb-2 text-warm-gray-400">
          <svg className="w-4 h-4 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span className="text-xs ml-1">{percentage}%</span>
        </div>
      )}

      {/* Step box */}
      <div
        className="relative w-full rounded-xl p-2 sm:p-4 text-center transition-all hover:scale-105 hover:shadow-lg"
        style={{
          backgroundColor: step.color + '15',
          borderColor: step.color + '40',
          borderWidth: 2,
        }}
      >
        <div className="flex justify-center mb-1 sm:mb-2" style={{ color: step.color }}>
          {step.icon}
        </div>
        <p className="text-lg sm:text-2xl font-bold" style={{ color: step.color }}>
          {formatNumber(step.value)}
        </p>
        <p className="text-[10px] sm:text-xs text-warm-gray-500 mt-1 truncate">{step.label}</p>
      </div>
    </div>
  );
}

// Conversion card component
function ConversionCard({ conversion, totalSpend }: { conversion: ConversionItem; totalSpend: number }) {
  const costPer = conversion.cost_per || (totalSpend / conversion.value);

  return (
    <div
      className="rounded-xl p-4 border-2 transition-all hover:shadow-md"
      style={{
        backgroundColor: conversion.color + '10',
        borderColor: conversion.color + '30',
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-medium text-warm-gray-700">{conversion.label}</p>
        <span
          className="px-2 py-0.5 text-xs font-medium rounded-full"
          style={{ backgroundColor: conversion.color + '20', color: conversion.color }}
        >
          {formatNumber(conversion.value)}
        </span>
      </div>

      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-xs text-warm-gray-400">Costo por conversion</p>
          <p className="text-lg font-bold" style={{ color: conversion.color }}>
            {formatCurrency(costPer)}
          </p>
        </div>

        {/* Visual indicator */}
        <div className="flex-1 mx-4">
          <div className="h-2 bg-warm-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min(100, (conversion.value / 5000) * 100)}%`,
                backgroundColor: conversion.color,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConversionFunnel({
  impressions,
  clicks,
  landingPageViews,
  conversions,
  totalSpend,
  loading,
  totalLeads,
  totalRegistrations,
}: ConversionFunnelProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-warm-gray-200 p-6 shadow-sm">
        <FunnelSkeleton />
      </div>
    );
  }

  // Calculate leads and registrations from conversions if not provided
  const leadsCount = totalLeads ?? conversions
    .filter(c => c.action_type.startsWith('Lead_') || c.action_type === 'offsite_conversion.fb_pixel_lead')
    .reduce((sum, c) => sum + c.value, 0);

  const registrationsCount = totalRegistrations ?? conversions
    .filter(c => c.action_type.startsWith('CompleteRegistration_') || c.action_type === 'offsite_conversion.fb_pixel_complete_registration')
    .reduce((sum, c) => sum + c.value, 0);

  // Build funnel steps - separate Leads and Registrations
  const funnelSteps: FunnelStep[] = [
    {
      label: 'Impresiones',
      value: impressions,
      color: '#3B82F6', // blue
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      label: 'Clics',
      value: clicks,
      color: '#10B981', // green
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
    },
    {
      label: 'Vistas Landing',
      value: landingPageViews,
      color: '#8B5CF6', // purple
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: 'Leads',
      value: leadsCount,
      color: '#F59E0B', // amber/gold for leads
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      label: 'Registros',
      value: registrationsCount,
      color: '#E07A5F', // coral for registrations
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  // Calculate conversion rates
  const leadRate = landingPageViews > 0 ? ((leadsCount / landingPageViews) * 100).toFixed(1) : '0';
  const registrationRate = leadsCount > 0 ? ((registrationsCount / leadsCount) * 100).toFixed(1) : '0';
  const overallConversionRate = impressions > 0 ? ((registrationsCount / impressions) * 100).toFixed(2) : '0';
  const clickThroughRate = impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : '0';
  const lpvRate = clicks > 0 ? ((landingPageViews / clicks) * 100).toFixed(1) : '0';

  return (
    <div className="bg-white rounded-xl border border-warm-gray-200 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-warm-gray-800">Embudo de Conversion</h3>
          <p className="text-sm text-warm-gray-500">Floresiendo - Lead Magnets y Funnels</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-coral">{overallConversionRate}%</p>
          <p className="text-xs text-warm-gray-400">Impresion → Registro</p>
        </div>
      </div>

      {/* Funnel visualization */}
      <div className="grid grid-cols-2 sm:flex items-end justify-center gap-2 sm:gap-3 mb-6">
        {funnelSteps.map((step, index) => (
          <FunnelStep
            key={step.label}
            step={step}
            index={index}
            total={impressions}
            previousValue={index === 0 ? impressions : funnelSteps[index - 1].value}
          />
        ))}
      </div>

      {/* Funnel rates summary */}
      <div className="flex justify-center gap-3 sm:gap-6 mb-6 py-3 bg-warm-gray-50 rounded-lg flex-wrap">
        <div className="text-center px-2">
          <p className="text-lg font-bold text-green-600">{clickThroughRate}%</p>
          <p className="text-xs text-warm-gray-500">CTR</p>
        </div>
        <div className="text-center px-2">
          <p className="text-lg font-bold text-purple-600">{lpvRate}%</p>
          <p className="text-xs text-warm-gray-500">LPV Rate</p>
        </div>
        <div className="text-center px-2">
          <p className="text-lg font-bold text-amber-500">{leadRate}%</p>
          <p className="text-xs text-warm-gray-500">Lead Rate</p>
        </div>
        <div className="text-center px-2">
          <p className="text-lg font-bold text-coral">{registrationRate}%</p>
          <p className="text-xs text-warm-gray-500">Reg Rate</p>
        </div>
      </div>

      {/* Conversion breakdown */}
      <div>
        <h4 className="text-sm font-medium text-warm-gray-700 mb-3">Desglose por Conversion</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {conversions.map((conversion) => (
            <ConversionCard
              key={conversion.action_type}
              conversion={conversion}
              totalSpend={totalSpend}
            />
          ))}
        </div>
      </div>

      {/* Total spend footer */}
      <div className="mt-4 pt-4 border-t border-warm-gray-100 flex justify-between items-center">
        <p className="text-sm text-warm-gray-500">Gasto total del periodo</p>
        <p className="text-lg font-bold text-warm-gray-800">{formatCurrency(totalSpend)}</p>
      </div>
    </div>
  );
}
