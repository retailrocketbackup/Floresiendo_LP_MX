'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

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

// Column configuration
interface ColumnConfig {
  key: SortKey;
  label: string;
  width: number;
  minWidth: number;
  sortable: boolean;
}

const DEFAULT_COLUMNS: ColumnConfig[] = [
  { key: 'name', label: 'Nombre', width: 180, minWidth: 100, sortable: true },
  { key: 'campaignName', label: 'Campaña', width: 150, minWidth: 100, sortable: true },
  { key: 'status', label: 'Estado', width: 90, minWidth: 80, sortable: true },
  { key: 'spend', label: 'Gasto', width: 100, minWidth: 80, sortable: true },
  { key: 'impressions', label: 'Impresiones', width: 110, minWidth: 80, sortable: true },
  { key: 'clicks', label: 'Clics', width: 80, minWidth: 60, sortable: true },
  { key: 'ctr', label: 'CTR', width: 80, minWidth: 60, sortable: true },
  { key: 'cpc', label: 'CPC', width: 100, minWidth: 80, sortable: true },
  { key: 'reach', label: 'Alcance', width: 90, minWidth: 70, sortable: true },
  { key: 'adsCount', label: 'Anuncios', width: 90, minWidth: 70, sortable: true },
];

const STORAGE_KEY = 'adset-table-columns';

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

export default function AdSetPerformanceTable({ adSets, loading, onAdSetClick }: AdSetPerformanceTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('spend');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [columns, setColumns] = useState<ColumnConfig[]>(DEFAULT_COLUMNS);
  const [draggedColumn, setDraggedColumn] = useState<number | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<number | null>(null);
  const [resizingColumn, setResizingColumn] = useState<number | null>(null);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);
  const tableRef = useRef<HTMLTableElement>(null);

  // Load saved column configuration
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge saved config with defaults (in case new columns were added)
        const merged = DEFAULT_COLUMNS.map(defaultCol => {
          const savedCol = parsed.find((c: ColumnConfig) => c.key === defaultCol.key);
          return savedCol ? { ...defaultCol, width: savedCol.width } : defaultCol;
        });
        // Reorder based on saved order
        const orderedKeys = parsed.map((c: ColumnConfig) => c.key);
        merged.sort((a, b) => {
          const aIndex = orderedKeys.indexOf(a.key);
          const bIndex = orderedKeys.indexOf(b.key);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });
        setColumns(merged);
      }
    } catch (e) {
      console.error('Failed to load column config:', e);
    }
  }, []);

  // Save column configuration
  const saveColumns = useCallback((newColumns: ColumnConfig[]) => {
    setColumns(newColumns);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newColumns));
    } catch (e) {
      console.error('Failed to save column config:', e);
    }
  }, []);

  // Column drag handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedColumn(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
    // Add drag image styling
    const target = e.target as HTMLElement;
    target.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    target.style.opacity = '1';
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedColumn !== null && draggedColumn !== index) {
      setDragOverColumn(index);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedColumn === null || draggedColumn === dropIndex) return;

    const newColumns = [...columns];
    const [draggedItem] = newColumns.splice(draggedColumn, 1);
    newColumns.splice(dropIndex, 0, draggedItem);
    saveColumns(newColumns);
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  // Column resize handlers
  const handleResizeStart = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setResizingColumn(index);
    setResizeStartX(e.clientX);
    setResizeStartWidth(columns[index].width);
  };

  useEffect(() => {
    if (resizingColumn === null) return;

    const handleMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - resizeStartX;
      const newWidth = Math.max(columns[resizingColumn].minWidth, resizeStartWidth + diff);
      const newColumns = [...columns];
      newColumns[resizingColumn] = { ...newColumns[resizingColumn], width: newWidth };
      setColumns(newColumns);
    };

    const handleMouseUp = () => {
      if (resizingColumn !== null) {
        // Save on mouse up
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
        } catch (e) {
          console.error('Failed to save column config:', e);
        }
      }
      setResizingColumn(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingColumn, resizeStartX, resizeStartWidth, columns]);

  // Reset columns to default
  const resetColumns = () => {
    saveColumns([...DEFAULT_COLUMNS]);
  };

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

  // Render cell content based on column key
  const renderCell = (adSet: AdSetPerformance, columnKey: SortKey) => {
    switch (columnKey) {
      case 'name':
        return (
          <div className="text-sm font-medium text-warm-gray-900 truncate" title={adSet.name}>
            {adSet.name}
          </div>
        );
      case 'campaignName':
        return (
          <div className="text-sm text-warm-gray-600 truncate" title={adSet.campaignName}>
            {adSet.campaignName}
          </div>
        );
      case 'status':
        return <StatusBadge status={adSet.status} />;
      case 'spend':
        return (
          <span className="text-sm text-warm-gray-700">
            {formatCurrency(adSet.spend)}
            <PerformanceIndicator type={adSet.id === bestSpendAdSet.id ? 'best' : 'normal'} />
          </span>
        );
      case 'impressions':
        return <span className="text-sm text-warm-gray-700">{formatNumber(adSet.impressions)}</span>;
      case 'clicks':
        return <span className="text-sm text-warm-gray-700">{formatNumber(adSet.clicks)}</span>;
      case 'ctr':
        return (
          <span className="text-sm font-medium text-warm-gray-700">
            {formatPercentage(adSet.ctr)}
            <PerformanceIndicator type={adSet.id === bestCtrAdSet.id ? 'best' : 'normal'} />
          </span>
        );
      case 'cpc':
        return (
          <span className="text-sm font-medium text-warm-gray-700">
            {formatCurrency(adSet.cpc)}
            <PerformanceIndicator type={adSet.id === worstCpcAdSet.id ? 'worst' : 'normal'} />
          </span>
        );
      case 'reach':
        return <span className="text-sm text-warm-gray-700">{formatNumber(adSet.reach)}</span>;
      case 'adsCount':
        return <span className="text-sm font-bold text-purple-700">{adSet.adsCount}</span>;
      default:
        return null;
    }
  };

  // Render total cell content
  const renderTotalCell = (columnKey: SortKey) => {
    switch (columnKey) {
      case 'name':
        return <span className="text-sm font-semibold text-warm-gray-800">Total</span>;
      case 'campaignName':
      case 'status':
        return null;
      case 'spend':
        return <span className="text-sm font-semibold text-warm-gray-800">{formatCurrency(totals.spend)}</span>;
      case 'impressions':
        return <span className="text-sm font-semibold text-warm-gray-800">{formatNumber(totals.impressions)}</span>;
      case 'clicks':
        return <span className="text-sm font-semibold text-warm-gray-800">{formatNumber(totals.clicks)}</span>;
      case 'ctr':
        return (
          <span className="text-sm font-semibold text-warm-gray-800">
            {formatPercentage(totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0)}
          </span>
        );
      case 'cpc':
        return (
          <span className="text-sm font-semibold text-warm-gray-800">
            {formatCurrency(totals.clicks > 0 ? totals.spend / totals.clicks : 0)}
          </span>
        );
      case 'reach':
        return <span className="text-sm font-semibold text-warm-gray-800">{formatNumber(totals.reach)}</span>;
      case 'adsCount':
        return <span className="text-sm font-bold text-purple-700">{totals.adsCount}</span>;
      default:
        return null;
    }
  };

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
          <div className="flex items-center gap-3">
            <button
              onClick={resetColumns}
              className="text-xs text-warm-gray-400 hover:text-warm-gray-600 transition-colors"
              title="Restablecer columnas"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
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
        <table ref={tableRef} className="min-w-full divide-y divide-warm-gray-200" style={{ tableLayout: 'fixed' }}>
          <thead className="bg-warm-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className={`relative px-3 py-3 text-left text-xs font-medium text-warm-gray-500 uppercase tracking-wider select-none
                    ${column.sortable ? 'cursor-pointer hover:bg-warm-gray-100' : ''}
                    ${dragOverColumn === index ? 'bg-coral/10 border-l-2 border-coral' : ''}
                    ${draggedColumn === index ? 'opacity-50' : ''}
                  `}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-1 pr-2">
                    <svg className="w-3 h-3 text-warm-gray-300 cursor-grab flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
                    </svg>
                    <span className="truncate">{column.label}</span>
                    {column.sortable && (
                      <span className={`transition-opacity flex-shrink-0 ${sortKey === column.key ? 'opacity-100' : 'opacity-30'}`}>
                        {sortKey === column.key && sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                  {/* Resize handle */}
                  <div
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-coral/50 group"
                    onMouseDown={(e) => handleResizeStart(e, index)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-warm-gray-300 group-hover:bg-coral transition-colors" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-warm-gray-100">
            {sortedAdSets.map((adSet) => (
              <tr
                key={adSet.id}
                className="hover:bg-warm-gray-50 transition-colors cursor-pointer"
                onClick={() => onAdSetClick?.(adSet.id)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    style={{ width: column.width, maxWidth: column.width }}
                    className="px-3 py-4 overflow-hidden"
                  >
                    {renderCell(adSet, column.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* Totals row */}
          <tfoot className="bg-warm-gray-50">
            <tr>
              {columns.map((column) => (
                <td
                  key={column.key}
                  style={{ width: column.width }}
                  className="px-3 py-4"
                >
                  {renderTotalCell(column.key)}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Help text */}
      <div className="hidden md:block px-4 py-2 bg-warm-gray-50 border-t border-warm-gray-100">
        <p className="text-xs text-warm-gray-400">
          Arrastra las columnas para reordenar &bull; Arrastra el borde derecho para redimensionar &bull; Clic en encabezado para ordenar
        </p>
      </div>
    </div>
  );
}
