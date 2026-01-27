'use client';

import { useState } from 'react';

interface AdSetPerformance {
  id: string;
  name: string;
  campaignName: string;
  status: string;
  dailyBudget?: number;
  optimizationGoal?: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  reach: number;
  adsCount: number;
}

interface AdSetPerformanceTableProps {
  adSets: AdSetPerformance[];
  loading?: boolean;
  onAdSetClick?: (adSetId: string) => void;
}

type SortKey = keyof AdSetPerformance;
type SortDirection = 'asc' | 'desc';

// Skeleton loader
function TableSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-48 bg-warm-gray-200 rounded mb-4" />
      <div className="space-y-2">
        <div className="h-10 bg-warm-gray-200 rounded" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-14 bg-warm-gray-100 rounded" />
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

// Status badge
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-700 border-green-200',
    PAUSED: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    DELETED: 'bg-gray-100 text-gray-700 border-gray-200',
    ARCHIVED: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const labels: Record<string, string> = {
    ACTIVE: 'Activo',
    PAUSED: 'Pausado',
    DELETED: 'Eliminado',
    ARCHIVED: 'Archivado',
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${styles[status] || styles.PAUSED}`}>
      {labels[status] || status}
    </span>
  );
}

// Performance indicator
function PerformanceIndicator({ type }: { type: 'best' | 'worst' | 'normal' }) {
  if (type === 'best') {
    return (
      <span className="ml-1 text-green-500" title="Mejor rendimiento">
        <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
        </svg>
      </span>
    );
  }
  if (type === 'worst') {
    return (
      <span className="ml-1 text-red-500" title="Menor rendimiento">
        <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
        </svg>
      </span>
    );
  }
  return null;
}

// Sortable header
function SortableHeader({
  label,
  sortKey,
  currentSort,
  currentDirection,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  currentSort: SortKey;
  currentDirection: SortDirection;
  onSort: (key: SortKey) => void;
}) {
  const isActive = currentSort === sortKey;

  return (
    <th
      className="px-3 py-3 text-left text-xs font-medium text-warm-gray-500 uppercase tracking-wider cursor-pointer hover:bg-warm-gray-100 transition-colors"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center gap-1">
        {label}
        <span className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-30'}`}>
          {isActive && currentDirection === 'asc' ? '↑' : '↓'}
        </span>
      </div>
    </th>
  );
}

export default function AdSetPerformanceTable({ adSets, loading, onAdSetClick }: AdSetPerformanceTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('spend');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-warm-gray-200 p-6 shadow-sm">
        <TableSkeleton />
      </div>
    );
  }

  if (!adSets || adSets.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-warm-gray-200 p-6 shadow-sm">
        <div className="text-center py-8 text-warm-gray-500">
          <svg className="w-12 h-12 mx-auto mb-3 text-warm-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <p>No hay conjuntos de anuncios disponibles</p>
        </div>
      </div>
    );
  }

  // Handle sort
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  // Sort ad sets
  const sortedAdSets = [...adSets].sort((a, b) => {
    const aValue = a[sortKey] ?? 0;
    const bValue = b[sortKey] ?? 0;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    const numA = typeof aValue === 'number' ? aValue : 0;
    const numB = typeof bValue === 'number' ? bValue : 0;

    return sortDirection === 'asc' ? numA - numB : numB - numA;
  });

  // Find best/worst performers
  const bestCtrAdSet = adSets.reduce((best, adSet) => (adSet.ctr > best.ctr ? adSet : best), adSets[0]);
  const worstCpcAdSet = adSets.reduce((worst, adSet) => (adSet.cpc > worst.cpc ? adSet : worst), adSets[0]);
  const bestSpendAdSet = adSets.reduce((best, adSet) => (adSet.spend > best.spend ? adSet : best), adSets[0]);

  // Calculate totals
  const totals = adSets.reduce(
    (acc, adSet) => ({
      spend: acc.spend + adSet.spend,
      impressions: acc.impressions + adSet.impressions,
      clicks: acc.clicks + adSet.clicks,
      reach: acc.reach + adSet.reach,
      adsCount: acc.adsCount + adSet.adsCount,
    }),
    { spend: 0, impressions: 0, clicks: 0, reach: 0, adsCount: 0 }
  );

  return (
    <div className="bg-white rounded-xl border border-warm-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-warm-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-warm-gray-800">
              Conjuntos de Anuncios
            </h3>
            <p className="text-xs sm:text-sm text-warm-gray-500">
              {adSets.length} ad set{adSets.length !== 1 ? 's' : ''} &bull; {totals.adsCount} anuncio{totals.adsCount !== 1 ? 's' : ''} total
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-green-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
              Mejor
            </span>
            <span className="flex items-center gap-1 text-red-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
              Peor
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden divide-y divide-warm-gray-100">
        {sortedAdSets.map((adSet) => (
          <div
            key={adSet.id}
            className="p-4 hover:bg-warm-gray-50 transition-colors cursor-pointer"
            onClick={() => onAdSetClick?.(adSet.id)}
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0 pr-2">
                <p className="text-sm font-medium text-warm-gray-900 truncate">{adSet.name}</p>
                <p className="text-xs text-warm-gray-500 truncate">{adSet.campaignName}</p>
              </div>
              <StatusBadge status={adSet.status} />
            </div>
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-warm-gray-50 rounded-lg p-2">
                <p className="text-xs text-warm-gray-500">Gasto</p>
                <p className="text-sm font-semibold text-warm-gray-800">
                  {formatCurrency(adSet.spend)}
                  <PerformanceIndicator type={adSet.id === bestSpendAdSet.id ? 'best' : 'normal'} />
                </p>
              </div>
              <div className="bg-warm-gray-50 rounded-lg p-2">
                <p className="text-xs text-warm-gray-500">Impresiones</p>
                <p className="text-sm font-semibold text-warm-gray-800">{formatNumber(adSet.impressions)}</p>
              </div>
              <div className="bg-warm-gray-50 rounded-lg p-2">
                <p className="text-xs text-warm-gray-500">Clics</p>
                <p className="text-sm font-semibold text-warm-gray-800">{formatNumber(adSet.clicks)}</p>
              </div>
              <div className="bg-warm-gray-50 rounded-lg p-2">
                <p className="text-xs text-warm-gray-500">CTR</p>
                <p className="text-sm font-semibold text-warm-gray-800">
                  {formatPercentage(adSet.ctr)}
                  <PerformanceIndicator type={adSet.id === bestCtrAdSet.id ? 'best' : 'normal'} />
                </p>
              </div>
              <div className="bg-warm-gray-50 rounded-lg p-2">
                <p className="text-xs text-warm-gray-500">CPC</p>
                <p className="text-sm font-semibold text-warm-gray-800">
                  {formatCurrency(adSet.cpc)}
                  <PerformanceIndicator type={adSet.id === worstCpcAdSet.id ? 'worst' : 'normal'} />
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-2">
                <p className="text-xs text-purple-600">Anuncios</p>
                <p className="text-sm font-bold text-purple-700">{adSet.adsCount}</p>
              </div>
            </div>
          </div>
        ))}
        {/* Mobile Totals */}
        <div className="p-4 bg-warm-gray-50">
          <p className="text-xs font-medium text-warm-gray-500 mb-2">TOTALES</p>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-xs text-warm-gray-500">Gasto</p>
              <p className="text-sm font-semibold">{formatCurrency(totals.spend)}</p>
            </div>
            <div>
              <p className="text-xs text-warm-gray-500">Clics</p>
              <p className="text-sm font-semibold">{formatNumber(totals.clicks)}</p>
            </div>
            <div>
              <p className="text-xs text-purple-600">Anuncios</p>
              <p className="text-sm font-bold text-purple-700">{totals.adsCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-warm-gray-200">
          <thead className="bg-warm-gray-50">
            <tr>
              <SortableHeader label="Nombre" sortKey="name" currentSort={sortKey} currentDirection={sortDirection} onSort={handleSort} />
              <SortableHeader label="Campaña" sortKey="campaignName" currentSort={sortKey} currentDirection={sortDirection} onSort={handleSort} />
              <th className="px-3 py-3 text-left text-xs font-medium text-warm-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <SortableHeader label="Gasto" sortKey="spend" currentSort={sortKey} currentDirection={sortDirection} onSort={handleSort} />
              <SortableHeader label="Impresiones" sortKey="impressions" currentSort={sortKey} currentDirection={sortDirection} onSort={handleSort} />
              <SortableHeader label="Clics" sortKey="clicks" currentSort={sortKey} currentDirection={sortDirection} onSort={handleSort} />
              <SortableHeader label="CTR" sortKey="ctr" currentSort={sortKey} currentDirection={sortDirection} onSort={handleSort} />
              <SortableHeader label="CPC" sortKey="cpc" currentSort={sortKey} currentDirection={sortDirection} onSort={handleSort} />
              <SortableHeader label="Alcance" sortKey="reach" currentSort={sortKey} currentDirection={sortDirection} onSort={handleSort} />
              <SortableHeader label="Anuncios" sortKey="adsCount" currentSort={sortKey} currentDirection={sortDirection} onSort={handleSort} />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-warm-gray-100">
            {sortedAdSets.map((adSet) => (
              <tr
                key={adSet.id}
                className="hover:bg-warm-gray-50 transition-colors cursor-pointer"
                onClick={() => onAdSetClick?.(adSet.id)}
              >
                <td className="px-3 py-4">
                  <div className="text-sm font-medium text-warm-gray-900 max-w-[180px] truncate" title={adSet.name}>
                    {adSet.name}
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="text-sm text-warm-gray-600 max-w-[150px] truncate" title={adSet.campaignName}>
                    {adSet.campaignName}
                  </div>
                </td>
                <td className="px-3 py-4">
                  <StatusBadge status={adSet.status} />
                </td>
                <td className="px-3 py-4 text-sm text-warm-gray-700">
                  {formatCurrency(adSet.spend)}
                  <PerformanceIndicator type={adSet.id === bestSpendAdSet.id ? 'best' : 'normal'} />
                </td>
                <td className="px-3 py-4 text-sm text-warm-gray-700">
                  {formatNumber(adSet.impressions)}
                </td>
                <td className="px-3 py-4 text-sm text-warm-gray-700">
                  {formatNumber(adSet.clicks)}
                </td>
                <td className="px-3 py-4 text-sm">
                  <span className="font-medium text-warm-gray-700">
                    {formatPercentage(adSet.ctr)}
                  </span>
                  <PerformanceIndicator type={adSet.id === bestCtrAdSet.id ? 'best' : 'normal'} />
                </td>
                <td className="px-3 py-4 text-sm">
                  <span className="font-medium text-warm-gray-700">
                    {formatCurrency(adSet.cpc)}
                  </span>
                  <PerformanceIndicator type={adSet.id === worstCpcAdSet.id ? 'worst' : 'normal'} />
                </td>
                <td className="px-3 py-4 text-sm text-warm-gray-700">
                  {formatNumber(adSet.reach)}
                </td>
                <td className="px-3 py-4 text-sm">
                  <span className="font-bold text-purple-700">{adSet.adsCount}</span>
                </td>
              </tr>
            ))}
          </tbody>
          {/* Totals row */}
          <tfoot className="bg-warm-gray-50">
            <tr className="font-semibold">
              <td className="px-3 py-4 text-sm text-warm-gray-800">Total</td>
              <td className="px-3 py-4"></td>
              <td className="px-3 py-4"></td>
              <td className="px-3 py-4 text-sm text-warm-gray-800">{formatCurrency(totals.spend)}</td>
              <td className="px-3 py-4 text-sm text-warm-gray-800">{formatNumber(totals.impressions)}</td>
              <td className="px-3 py-4 text-sm text-warm-gray-800">{formatNumber(totals.clicks)}</td>
              <td className="px-3 py-4 text-sm text-warm-gray-800">
                {formatPercentage(totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0)}
              </td>
              <td className="px-3 py-4 text-sm text-warm-gray-800">
                {formatCurrency(totals.clicks > 0 ? totals.spend / totals.clicks : 0)}
              </td>
              <td className="px-3 py-4 text-sm text-warm-gray-800">{formatNumber(totals.reach)}</td>
              <td className="px-3 py-4 text-sm font-bold text-purple-700">{totals.adsCount}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
