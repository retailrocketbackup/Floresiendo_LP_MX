'use client';

interface CostMetric {
  action_type: string;
  label: string;
  cost: number;
  count: number;
  color: string;
}

interface CostBreakdownProps {
  metrics: CostMetric[];
  totalSpend: number;
  loading?: boolean;
}

// Skeleton loader
function CostSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-36 bg-warm-gray-200 rounded mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-28 bg-warm-gray-200 rounded-xl" />
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

// Get efficiency rating
function getEfficiencyRating(cost: number, avgCost: number): 'excellent' | 'good' | 'moderate' | 'high' {
  const ratio = cost / avgCost;
  if (ratio <= 0.5) return 'excellent';
  if (ratio <= 1) return 'good';
  if (ratio <= 2) return 'moderate';
  return 'high';
}

// Efficiency badge
function EfficiencyBadge({ rating }: { rating: 'excellent' | 'good' | 'moderate' | 'high' }) {
  const config = {
    excellent: { label: 'Excelente', color: 'bg-green-100 text-green-700 border-green-200' },
    good: { label: 'Bueno', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    moderate: { label: 'Moderado', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    high: { label: 'Alto', color: 'bg-red-100 text-red-700 border-red-200' },
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${config[rating].color}`}>
      {config[rating].label}
    </span>
  );
}

// Individual cost card
function CostCard({
  metric,
  avgCost,
  maxCost,
}: {
  metric: CostMetric;
  avgCost: number;
  maxCost: number;
}) {
  const rating = getEfficiencyRating(metric.cost, avgCost);
  const barWidth = (metric.cost / maxCost) * 100;

  return (
    <div
      className="rounded-xl p-4 border-2 transition-all hover:shadow-md"
      style={{
        backgroundColor: metric.color + '08',
        borderColor: metric.color + '25',
      }}
    >
      {/* Header with label and badge */}
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-warm-gray-700 leading-tight">
          {metric.label}
        </p>
        <EfficiencyBadge rating={rating} />
      </div>

      {/* Cost value */}
      <p className="text-2xl font-bold mb-1" style={{ color: metric.color }}>
        {formatCurrency(metric.cost)}
      </p>

      {/* Count */}
      <p className="text-xs text-warm-gray-400 mb-3">
        {formatNumber(metric.count)} acciones
      </p>

      {/* Visual bar */}
      <div className="h-2 bg-warm-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${barWidth}%`,
            backgroundColor: metric.color,
          }}
        />
      </div>
    </div>
  );
}

// Summary section
function CostSummary({
  metrics,
  totalSpend,
}: {
  metrics: CostMetric[];
  totalSpend: number;
}) {
  const avgCost = metrics.reduce((sum, m) => sum + m.cost, 0) / metrics.length;
  const lowestCost = Math.min(...metrics.map((m) => m.cost));
  const highestCost = Math.max(...metrics.map((m) => m.cost));

  const cheapest = metrics.find((m) => m.cost === lowestCost);
  const mostExpensive = metrics.find((m) => m.cost === highestCost);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-warm-gray-50 rounded-lg mb-6">
      <div className="text-center">
        <p className="text-lg font-bold text-warm-gray-800">{formatCurrency(totalSpend)}</p>
        <p className="text-xs text-warm-gray-500">Gasto Total</p>
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-blue-600">{formatCurrency(avgCost)}</p>
        <p className="text-xs text-warm-gray-500">Costo Promedio</p>
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-green-600">{formatCurrency(lowestCost)}</p>
        <p className="text-xs text-warm-gray-500">Mas Barato</p>
        {cheapest && (
          <p className="text-xs text-warm-gray-400 truncate">{cheapest.label}</p>
        )}
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-red-600">{formatCurrency(highestCost)}</p>
        <p className="text-xs text-warm-gray-500">Mas Caro</p>
        {mostExpensive && (
          <p className="text-xs text-warm-gray-400 truncate">{mostExpensive.label}</p>
        )}
      </div>
    </div>
  );
}

export default function CostBreakdown({ metrics, totalSpend, loading }: CostBreakdownProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-warm-gray-200 p-6 shadow-sm">
        <CostSkeleton />
      </div>
    );
  }

  if (!metrics || metrics.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-warm-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-warm-gray-800 mb-4">
          Costo por Accion
        </h3>
        <div className="text-center py-8 text-warm-gray-500">
          <svg className="w-12 h-12 mx-auto mb-3 text-warm-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>No hay datos de costos disponibles</p>
        </div>
      </div>
    );
  }

  // Calculate stats
  const avgCost = metrics.reduce((sum, m) => sum + m.cost, 0) / metrics.length;
  const maxCost = Math.max(...metrics.map((m) => m.cost));

  // Sort by cost (lowest first for efficiency)
  const sortedMetrics = [...metrics].sort((a, b) => a.cost - b.cost);

  return (
    <div className="bg-white rounded-xl border border-warm-gray-200 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-warm-gray-800">
            Costo por Accion (CPA)
          </h3>
          <p className="text-sm text-warm-gray-500">
            Eficiencia del gasto publicitario
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-warm-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            Excelente
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            Alto
          </span>
        </div>
      </div>

      {/* Summary */}
      <CostSummary metrics={metrics} totalSpend={totalSpend} />

      {/* Cost cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sortedMetrics.map((metric) => (
          <CostCard
            key={metric.action_type}
            metric={metric}
            avgCost={avgCost}
            maxCost={maxCost}
          />
        ))}
      </div>

      {/* Optimization tip */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-blue-800">Consejo de Optimizacion</p>
            <p className="text-xs text-blue-600 mt-1">
              Las acciones con costo mas bajo indican mayor eficiencia. Considera enfocar tu presupuesto
              en las acciones con mejor relacion costo-resultado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
