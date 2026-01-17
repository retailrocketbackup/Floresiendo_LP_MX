'use client';

interface SkeletonProps {
  className?: string;
}

// Base skeleton with shimmer effect
function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden bg-warm-gray-200 rounded-lg ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
}

// KPI Card Skeleton
export function KPICardSkeleton() {
  return (
    <div className="rounded-xl p-4 border border-warm-gray-200 bg-white">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <Skeleton className="h-8 w-24 mb-2" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}

// Chart Skeleton
export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-warm-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
          <Skeleton className="h-8 w-16 rounded-lg" />
          <Skeleton className="h-8 w-16 rounded-lg" />
        </div>
      </div>
      <div className="h-[300px] flex items-end gap-1 pt-8">
        {Array.from({ length: 20 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t"
            style={{ height: `${30 + Math.random() * 60}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// Campaign List Skeleton
export function CampaignListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white border border-warm-gray-200 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-5 w-5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Conversions Table Skeleton
export function ConversionsTableSkeleton() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between py-3 px-4 border-b border-warm-gray-200">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex justify-between py-3 px-4">
          <div>
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}

// Full Dashboard Skeleton
export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* KPI Grid */}
      <section>
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <KPICardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* Chart */}
      <ChartSkeleton />

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-warm-gray-200 p-6">
          <Skeleton className="h-6 w-24 mb-4" />
          <CampaignListSkeleton />
        </div>
        <div className="bg-white rounded-xl border border-warm-gray-200 p-6">
          <Skeleton className="h-6 w-28 mb-4" />
          <ConversionsTableSkeleton />
        </div>
      </div>
    </div>
  );
}

// Export individual Skeleton for custom use
export { Skeleton };
