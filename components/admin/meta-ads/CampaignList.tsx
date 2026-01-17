'use client';

import { useState } from 'react';
import type { CampaignWithInsights, AdSetWithInsights, AdWithInsights } from '@/lib/meta-ads-types';
import { CampaignListSkeleton } from './Skeleton';
import { CampaignEmptyState, SearchEmptyState } from './EmptyState';

interface CampaignListProps {
  campaigns: CampaignWithInsights[];
  loading?: boolean;
  searchQuery?: string;
  onClearSearch?: () => void;
  onRefresh?: () => void;
  onStatusChange?: (campaignId: string, newStatus: 'ACTIVE' | 'PAUSED') => void;
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const statusClasses: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-800 border-green-200',
    PAUSED: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    DELETED: 'bg-red-100 text-red-800 border-red-200',
    ARCHIVED: 'bg-gray-100 text-gray-600 border-gray-200',
  };

  const statusLabels: Record<string, string> = {
    ACTIVE: 'Activo',
    PAUSED: 'Pausado',
    DELETED: 'Eliminado',
    ARCHIVED: 'Archivado',
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
        statusClasses[status] || statusClasses.ARCHIVED
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}

// Metric Display Component
function MetricDisplay({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <p className="text-xs text-warm-gray-500 uppercase">{label}</p>
      <p className={`text-lg font-semibold ${color}`}>{value}</p>
    </div>
  );
}

// Format helpers
function formatCurrency(value: string | undefined): string {
  if (!value) return '$0.00';
  const num = parseFloat(value);
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'USD' }).format(num);
}

function formatNumber(value: string | undefined): string {
  if (!value) return '0';
  return new Intl.NumberFormat('es-MX').format(parseInt(value, 10));
}

// Ad Set Row Component
function AdSetRow({
  adset,
  isExpanded,
  onToggle,
}: {
  adset: AdSetWithInsights;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-warm-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full bg-warm-gray-50 p-3 flex items-center justify-between text-left hover:bg-warm-gray-100 transition-colors"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm text-warm-gray-700">{adset.name}</p>
            <StatusBadge status={adset.status} />
          </div>
          <p className="text-xs text-warm-gray-500 mt-0.5">
            {adset.daily_budget
              ? `$${(parseFloat(adset.daily_budget) / 100).toFixed(2)}/dia`
              : adset.optimization_goal?.replace(/_/g, ' ') || 'Sin presupuesto'}
          </p>
        </div>
        <svg
          className={`w-4 h-4 text-warm-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="p-3 bg-white border-t border-warm-gray-100 animate-[slide-down_0.2s_ease-out]">
          {/* Ad Set Metrics */}
          {adset.insights && (
            <div className="grid grid-cols-4 gap-3 mb-3">
              <div className="text-center">
                <p className="text-xs text-warm-gray-400">Gasto</p>
                <p className="text-sm font-semibold text-coral">{formatCurrency(adset.insights.spend)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-warm-gray-400">Impresiones</p>
                <p className="text-sm font-semibold text-blue-600">{formatNumber(adset.insights.impressions)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-warm-gray-400">Clics</p>
                <p className="text-sm font-semibold text-green-600">{formatNumber(adset.insights.clicks)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-warm-gray-400">CTR</p>
                <p className="text-sm font-semibold text-gold">{parseFloat(adset.insights.ctr || '0').toFixed(2)}%</p>
              </div>
            </div>
          )}

          {/* Ads List */}
          {adset.ads && adset.ads.length > 0 && (
            <div>
              <p className="text-xs text-warm-gray-500 uppercase mb-2">Anuncios ({adset.ads.length})</p>
              <div className="space-y-1.5">
                {adset.ads.map((ad) => (
                  <AdRow key={ad.id} ad={ad} />
                ))}
              </div>
            </div>
          )}

          {(!adset.ads || adset.ads.length === 0) && !adset.insights && (
            <p className="text-xs text-warm-gray-400 text-center py-2">Sin datos disponibles</p>
          )}
        </div>
      )}
    </div>
  );
}

// Ad Row Component
function AdRow({ ad }: { ad: AdWithInsights }) {
  return (
    <div className="flex items-center justify-between p-2 bg-warm-gray-50 rounded-lg">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="w-2 h-2 rounded-full bg-warm-gray-300 flex-shrink-0" />
        <p className="text-xs text-warm-gray-600 truncate">{ad.name}</p>
      </div>
      <div className="flex items-center gap-2">
        {ad.insights && (
          <span className="text-xs text-warm-gray-500">
            {formatCurrency(ad.insights.spend)}
          </span>
        )}
        <StatusBadge status={ad.status} />
      </div>
    </div>
  );
}

// Campaign Row Component
function CampaignRow({
  campaign,
  isExpanded,
  onToggle,
  expandedAdSetId,
  onAdSetToggle,
  onStatusChange,
}: {
  campaign: CampaignWithInsights;
  isExpanded: boolean;
  onToggle: () => void;
  expandedAdSetId: string | null;
  onAdSetToggle: (id: string) => void;
  onStatusChange?: (campaignId: string, newStatus: 'ACTIVE' | 'PAUSED') => void;
}) {
  const canToggleStatus = campaign.status === 'ACTIVE' || campaign.status === 'PAUSED';

  return (
    <div className="bg-white border border-warm-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all animate-[fade-in_0.2s_ease-out]">
      {/* Campaign Header */}
      <button
        onClick={onToggle}
        className="w-full px-4 py-4 flex items-center justify-between text-left"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-warm-gray-800">{campaign.name}</h3>
            <StatusBadge status={campaign.status} />
          </div>
          <p className="text-sm text-warm-gray-500 mt-1">
            {campaign.objective?.replace('OUTCOME_', '').replace(/_/g, ' ')} &bull;{' '}
            {new Date(campaign.created_time).toLocaleDateString('es-MX')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Quick Spend Indicator */}
          {campaign.insights?.spend && parseFloat(campaign.insights.spend) > 0 && (
            <span className="text-sm font-medium text-coral hidden sm:block">
              {formatCurrency(campaign.insights.spend)}
            </span>
          )}
          <svg
            className={`w-5 h-5 text-warm-gray-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Campaign Details (Expanded) */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-warm-gray-100 animate-[slide-down_0.2s_ease-out]">
          {/* Metrics Grid */}
          {campaign.insights ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <MetricDisplay label="Gasto" value={formatCurrency(campaign.insights.spend)} color="text-coral" />
              <MetricDisplay label="Impresiones" value={formatNumber(campaign.insights.impressions)} color="text-blue-600" />
              <MetricDisplay label="Clics" value={formatNumber(campaign.insights.clicks)} color="text-green-600" />
              <MetricDisplay label="CTR" value={`${parseFloat(campaign.insights.ctr || '0').toFixed(2)}%`} color="text-gold" />
            </div>
          ) : (
            <p className="text-sm text-warm-gray-500 mt-4 text-center py-2">
              Sin datos de rendimiento disponibles
            </p>
          )}

          {/* Action Buttons */}
          {canToggleStatus && onStatusChange && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onStatusChange(campaign.id, campaign.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  campaign.status === 'ACTIVE'
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {campaign.status === 'ACTIVE' ? 'Pausar campana' : 'Activar campana'}
              </button>
            </div>
          )}

          {/* Ad Sets */}
          {campaign.adsets && campaign.adsets.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-warm-gray-500 uppercase mb-2">
                Conjuntos de Anuncios ({campaign.adsets.length})
              </p>
              <div className="space-y-2">
                {campaign.adsets.map((adset) => (
                  <AdSetRow
                    key={adset.id}
                    adset={adset}
                    isExpanded={expandedAdSetId === adset.id}
                    onToggle={() => onAdSetToggle(adset.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Main Component
export default function CampaignList({
  campaigns,
  loading,
  searchQuery,
  onClearSearch,
  onRefresh,
  onStatusChange,
}: CampaignListProps) {
  const [expandedCampaignId, setExpandedCampaignId] = useState<string | null>(null);
  const [expandedAdSetId, setExpandedAdSetId] = useState<string | null>(null);

  if (loading) {
    return <CampaignListSkeleton />;
  }

  if (campaigns.length === 0) {
    if (searchQuery && onClearSearch) {
      return <SearchEmptyState query={searchQuery} onClear={onClearSearch} />;
    }
    return <CampaignEmptyState onRefresh={onRefresh} />;
  }

  return (
    <div className="space-y-3">
      {campaigns.map((campaign) => (
        <CampaignRow
          key={campaign.id}
          campaign={campaign}
          isExpanded={expandedCampaignId === campaign.id}
          onToggle={() => {
            setExpandedCampaignId(expandedCampaignId === campaign.id ? null : campaign.id);
            setExpandedAdSetId(null); // Reset ad set expansion when switching campaigns
          }}
          expandedAdSetId={expandedAdSetId}
          onAdSetToggle={(id) => setExpandedAdSetId(expandedAdSetId === id ? null : id)}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
