'use client';

interface BudgetTrackerProps {
  dailyBudget: number;
  totalSpent: number;
  daysActive: number;
  currency?: string;
  loading?: boolean;
}

// Skeleton loader
function BudgetSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-40 bg-warm-gray-200 rounded mb-4" />
      <div className="grid grid-cols-3 gap-4 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-warm-gray-200 rounded-xl" />
        ))}
      </div>
      <div className="h-8 bg-warm-gray-200 rounded-full" />
    </div>
  );
}

// Format helpers
function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Budget gauge component
function BudgetGauge({
  spent,
  budget,
  label,
}: {
  spent: number;
  budget: number;
  label: string;
}) {
  const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;

  // Color based on utilization
  let color = '#10B981'; // green - under budget
  if (percentage >= 90) {
    color = '#EF4444'; // red - at/over budget
  } else if (percentage >= 70) {
    color = '#F59E0B'; // amber - approaching budget
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-warm-gray-700">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>
          {percentage.toFixed(1)}%
        </span>
      </div>
      <div className="h-4 bg-warm-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-warm-gray-400 mt-1">
        <span>{formatCurrency(spent)}</span>
        <span>de {formatCurrency(budget)}</span>
      </div>
    </div>
  );
}

// Projection card
function ProjectionCard({
  label,
  value,
  icon,
  color,
  subtitle,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}) {
  return (
    <div
      className="rounded-xl p-4 border-2"
      style={{
        backgroundColor: color + '10',
        borderColor: color + '30',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="p-1.5 rounded-lg"
          style={{ backgroundColor: color + '20' }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        <span className="text-xs font-medium text-warm-gray-500">{label}</span>
      </div>
      <p className="text-xl font-bold" style={{ color }}>
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-warm-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}

// Icons
const icons = {
  daily: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  monthly: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  average: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  remaining: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

export default function BudgetTracker({
  dailyBudget,
  totalSpent,
  daysActive,
  currency = 'USD',
  loading,
}: BudgetTrackerProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-warm-gray-200 p-6 shadow-sm">
        <BudgetSkeleton />
      </div>
    );
  }

  // Calculate projections
  const dailyAverage = daysActive > 0 ? totalSpent / daysActive : 0;
  const monthlyBudget = dailyBudget * 30;
  const projectedMonthlySpend = dailyAverage * 30;
  const expectedBudget = dailyBudget * daysActive;
  const budgetVariance = expectedBudget - totalSpent;
  const remainingDaysInMonth = 30 - (daysActive % 30);
  const remainingBudget = monthlyBudget - totalSpent;

  // Efficiency rating
  const efficiency = expectedBudget > 0 ? (totalSpent / expectedBudget) * 100 : 0;
  let efficiencyLabel = 'Optimo';
  let efficiencyColor = '#10B981';
  if (efficiency > 110) {
    efficiencyLabel = 'Sobre presupuesto';
    efficiencyColor = '#EF4444';
  } else if (efficiency > 95) {
    efficiencyLabel = 'En presupuesto';
    efficiencyColor = '#3B82F6';
  } else if (efficiency < 70) {
    efficiencyLabel = 'Subejecutado';
    efficiencyColor = '#F59E0B';
  }

  return (
    <div className="bg-white rounded-xl border border-warm-gray-200 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-warm-gray-800">
            Control de Presupuesto
          </h3>
          <p className="text-sm text-warm-gray-500">
            Seguimiento del gasto publicitario
          </p>
        </div>
        <div
          className="px-3 py-1.5 rounded-full text-sm font-medium"
          style={{
            backgroundColor: efficiencyColor + '20',
            color: efficiencyColor,
          }}
        >
          {efficiencyLabel}
        </div>
      </div>

      {/* Projection cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <ProjectionCard
          label="Presupuesto Diario"
          value={formatCurrency(dailyBudget, currency)}
          icon={icons.daily}
          color="#3B82F6"
          subtitle="Configurado"
        />
        <ProjectionCard
          label="Gasto Diario Promedio"
          value={formatCurrency(dailyAverage, currency)}
          icon={icons.average}
          color={dailyAverage <= dailyBudget ? '#10B981' : '#EF4444'}
          subtitle={`${daysActive} dias activos`}
        />
        <ProjectionCard
          label="Proyeccion Mensual"
          value={formatCurrency(projectedMonthlySpend, currency)}
          icon={icons.monthly}
          color={projectedMonthlySpend <= monthlyBudget ? '#8B5CF6' : '#F59E0B'}
          subtitle={`vs ${formatCurrency(monthlyBudget, currency)} presupuesto`}
        />
        <ProjectionCard
          label="Presupuesto Restante"
          value={formatCurrency(Math.max(remainingBudget, 0), currency)}
          icon={icons.remaining}
          color={remainingBudget > 0 ? '#10B981' : '#EF4444'}
          subtitle={`~${remainingDaysInMonth} dias restantes`}
        />
      </div>

      {/* Budget gauges */}
      <div className="space-y-4">
        <BudgetGauge
          spent={totalSpent}
          budget={expectedBudget}
          label="Utilizacion del Periodo"
        />
        <BudgetGauge
          spent={totalSpent}
          budget={monthlyBudget}
          label="Utilizacion Mensual"
        />
      </div>

      {/* Variance indicator */}
      <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: budgetVariance >= 0 ? '#D1FAE5' : '#FEE2E2' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {budgetVariance >= 0 ? (
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className={`text-sm font-medium ${budgetVariance >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {budgetVariance >= 0 ? 'Bajo presupuesto' : 'Sobre presupuesto'}
            </span>
          </div>
          <span className={`text-lg font-bold ${budgetVariance >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            {budgetVariance >= 0 ? '+' : ''}{formatCurrency(budgetVariance, currency)}
          </span>
        </div>
      </div>
    </div>
  );
}
