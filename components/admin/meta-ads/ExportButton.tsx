'use client';

import { useState } from 'react';
import type { CampaignWithInsights, DailyDataPoint, ConversionRow } from '@/lib/meta-ads-types';

interface ExportButtonProps {
  campaigns?: CampaignWithInsights[];
  dailyData?: DailyDataPoint[];
  conversions?: ConversionRow[];
  summary?: {
    spend: string;
    impressions: string;
    clicks: string;
    ctr: string;
    reach: string;
  };
  timeRange?: string;
  disabled?: boolean;
}

type ExportType = 'campaigns' | 'daily' | 'conversions' | 'summary';

export default function ExportButton({
  campaigns,
  dailyData,
  conversions,
  summary,
  timeRange = 'all',
  disabled = false,
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob(['\ufeff' + content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const exportCampaigns = () => {
    if (!campaigns || campaigns.length === 0) return;

    const headers = [
      'Nombre',
      'Estado',
      'Objetivo',
      'Gasto',
      'Impresiones',
      'Clics',
      'CTR',
      'Alcance',
      'Fecha Creacion',
    ];

    const rows = campaigns.map((c) => [
      `"${c.name.replace(/"/g, '""')}"`,
      c.status,
      c.objective || '',
      c.insights?.spend || '0',
      c.insights?.impressions || '0',
      c.insights?.clicks || '0',
      c.insights?.ctr || '0',
      c.insights?.reach || '0',
      c.created_time?.split('T')[0] || '',
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCSV(csv, `floresiendo-campanas-${timeRange}-${formatDate()}.csv`);
  };

  const exportDailyData = () => {
    if (!dailyData || dailyData.length === 0) return;

    const headers = ['Fecha', 'Gasto', 'Impresiones', 'Clics', 'CTR', 'Alcance'];

    const rows = dailyData.map((d) => [
      d.date,
      d.spend.toFixed(2),
      d.impressions.toString(),
      d.clicks.toString(),
      d.ctr?.toFixed(2) || '0',
      d.reach.toString(),
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCSV(csv, `floresiendo-diario-${timeRange}-${formatDate()}.csv`);
  };

  const exportConversions = () => {
    if (!conversions || conversions.length === 0) return;

    const headers = ['Tipo', 'Nombre', 'Cantidad', 'Costo por Accion'];

    const rows = conversions.map((c) => [
      c.action_type,
      `"${c.label.replace(/"/g, '""')}"`,
      c.count.toString(),
      c.cost_per?.toFixed(2) || '0',
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCSV(csv, `floresiendo-conversiones-${timeRange}-${formatDate()}.csv`);
  };

  const exportSummary = () => {
    if (!summary) return;

    const headers = ['Metrica', 'Valor'];
    const rows = [
      ['Gasto Total', `$${parseFloat(summary.spend).toFixed(2)}`],
      ['Impresiones', parseInt(summary.impressions).toLocaleString('es-MX')],
      ['Clics', parseInt(summary.clicks).toLocaleString('es-MX')],
      ['CTR', `${parseFloat(summary.ctr).toFixed(2)}%`],
      ['Alcance', parseInt(summary.reach).toLocaleString('es-MX')],
      ['Periodo', timeRange],
      ['Exportado', new Date().toLocaleString('es-MX')],
    ];

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCSV(csv, `floresiendo-resumen-${timeRange}-${formatDate()}.csv`);
  };

  const handleExport = async (type: ExportType) => {
    setIsExporting(true);
    setShowMenu(false);

    try {
      switch (type) {
        case 'campaigns':
          exportCampaigns();
          break;
        case 'daily':
          exportDailyData();
          break;
        case 'conversions':
          exportConversions();
          break;
        case 'summary':
          exportSummary();
          break;
      }
    } finally {
      setTimeout(() => setIsExporting(false), 500);
    }
  };

  const exportAll = async () => {
    setIsExporting(true);
    setShowMenu(false);

    try {
      if (campaigns && campaigns.length > 0) exportCampaigns();
      if (dailyData && dailyData.length > 0) exportDailyData();
      if (conversions && conversions.length > 0) exportConversions();
      if (summary) exportSummary();
    } finally {
      setTimeout(() => setIsExporting(false), 500);
    }
  };

  const availableExports = [
    { type: 'campaigns' as ExportType, label: 'Campanas', available: campaigns && campaigns.length > 0 },
    { type: 'daily' as ExportType, label: 'Datos diarios', available: dailyData && dailyData.length > 0 },
    { type: 'conversions' as ExportType, label: 'Conversiones', available: conversions && conversions.length > 0 },
    { type: 'summary' as ExportType, label: 'Resumen', available: !!summary },
  ].filter((e) => e.available);

  if (availableExports.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={disabled || isExporting}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
          disabled || isExporting
            ? 'bg-warm-gray-100 text-warm-gray-400 cursor-not-allowed'
            : 'bg-white border border-warm-gray-200 text-warm-gray-700 hover:bg-warm-gray-50 hover:border-warm-gray-300'
        }`}
      >
        {isExporting ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Exportando...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Exportar CSV
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white border border-warm-gray-200 rounded-xl shadow-lg z-20 py-1 animate-[fade-in_0.15s_ease-out]">
            {availableExports.map((exp) => (
              <button
                key={exp.type}
                onClick={() => handleExport(exp.type)}
                className="w-full px-4 py-2 text-left text-sm text-warm-gray-700 hover:bg-warm-gray-50 transition-colors"
              >
                {exp.label}
              </button>
            ))}

            {availableExports.length > 1 && (
              <>
                <hr className="my-1 border-warm-gray-100" />
                <button
                  onClick={exportAll}
                  className="w-full px-4 py-2 text-left text-sm font-medium text-coral hover:bg-coral/5 transition-colors"
                >
                  Exportar todo
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
