'use client';

import { useMemo } from 'react';

interface ConversionSummary {
  total: number;
  paid: number;
  organic: number;
  direct: number;
  referral: number;
  email: number;
  social: number;
  unknown: number;
  byFunnel: Record<string, number>;
  byDate: Record<string, { total: number; paid: number; organic: number }>;
  recentContacts: Array<{
    id: string;
    name: string;
    email?: string;
    source: string;
    sourceDetail?: string;
    funnel?: string;
    createdAt: string;
    isPaid: boolean;
  }>;
}

interface HubSpotConversionsProps {
  data: ConversionSummary | null;
  loading: boolean;
  error?: string;
  configured?: boolean;
  metaConversions?: number;
}

const sourceColors: Record<string, { bg: string; text: string; icon: string }> = {
  paid: { bg: 'bg-coral/10', text: 'text-coral', icon: '💰' },
  organic: { bg: 'bg-green-100', text: 'text-green-700', icon: '🌱' },
  direct: { bg: 'bg-blue-100', text: 'text-blue-700', icon: '🔗' },
  referral: { bg: 'bg-purple-100', text: 'text-purple-700', icon: '👥' },
  email: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: '📧' },
  social: { bg: 'bg-pink-100', text: 'text-pink-700', icon: '📱' },
  unknown: { bg: 'bg-gray-100', text: 'text-gray-600', icon: '❓' },
};

export default function HubSpotConversions({
  data,
  loading,
  error,
  configured = true,
  metaConversions = 0,
}: HubSpotConversionsProps) {
  // Calculate attribution rate
  const attributionRate = useMemo(() => {
    if (!data || data.total === 0) return 0;
    return Math.round((data.paid / data.total) * 100);
  }, [data]);

  // Calculate gap between HubSpot and Meta
  const attributionGap = useMemo(() => {
    if (!data) return 0;
    return data.paid - metaConversions;
  }, [data, metaConversions]);

  if (!configured) {
    return (
      <div className="bg-warm-gray-50 rounded-xl p-6 border border-warm-gray-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-warm-gray-800">HubSpot no configurado</h4>
            <p className="text-sm text-warm-gray-500 mt-1">
              Para ver conversiones de HubSpot, agrega <code className="bg-warm-gray-200 px-1 rounded">HUBSPOT_PRIVATE_APP_TOKEN</code> a tu archivo .env.local
            </p>
            <a
              href="https://app.hubspot.com/private-apps/50499487"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-coral hover:text-coral/80 mt-2"
            >
              Crear Private App en HubSpot
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-warm-gray-100 rounded-xl p-4 animate-pulse">
              <div className="h-4 w-16 bg-warm-gray-200 rounded mb-2" />
              <div className="h-8 w-12 bg-warm-gray-200 rounded" />
            </div>
          ))}
        </div>
        <div className="bg-warm-gray-100 rounded-xl p-4 animate-pulse h-32" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-xl p-4 border border-red-200">
        <div className="flex items-center gap-2 text-red-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="font-medium">Error cargando HubSpot</span>
        </div>
        <p className="text-sm text-red-600 mt-1">{error}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Total HubSpot */}
        <div className="bg-gradient-to-br from-warm-gray-50 to-white rounded-xl p-4 border border-warm-gray-200">
          <div className="flex items-center gap-2 text-warm-gray-500 text-sm">
            <span>📊</span>
            <span>Total HubSpot</span>
          </div>
          <div className="text-2xl font-bold text-warm-gray-800 mt-1">{data.total}</div>
          <div className="text-xs text-warm-gray-400 mt-1">Ultimos 30 dias</div>
        </div>

        {/* Paid (Meta Ads) */}
        <div className="bg-gradient-to-br from-coral/5 to-white rounded-xl p-4 border border-coral/20">
          <div className="flex items-center gap-2 text-coral text-sm">
            <span>💰</span>
            <span>Paid (Meta Ads)</span>
          </div>
          <div className="text-2xl font-bold text-coral mt-1">{data.paid}</div>
          <div className="text-xs text-warm-gray-400 mt-1">
            {attributionRate}% del total
          </div>
        </div>

        {/* Organic */}
        <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border border-green-200">
          <div className="flex items-center gap-2 text-green-700 text-sm">
            <span>🌱</span>
            <span>Organico</span>
          </div>
          <div className="text-2xl font-bold text-green-700 mt-1">
            {data.organic + data.social + data.direct + data.referral}
          </div>
          <div className="text-xs text-warm-gray-400 mt-1">
            {100 - attributionRate}% del total
          </div>
        </div>

        {/* Attribution Gap */}
        <div className={`bg-gradient-to-br ${attributionGap > 0 ? 'from-yellow-50 to-white border-yellow-200' : 'from-blue-50 to-white border-blue-200'} rounded-xl p-4 border`}>
          <div className={`flex items-center gap-2 ${attributionGap > 0 ? 'text-yellow-700' : 'text-blue-700'} text-sm`}>
            <span>{attributionGap > 0 ? '⚠️' : '✅'}</span>
            <span>Gap Atribucion</span>
          </div>
          <div className={`text-2xl font-bold ${attributionGap > 0 ? 'text-yellow-700' : 'text-blue-700'} mt-1`}>
            {attributionGap > 0 ? `+${attributionGap}` : attributionGap}
          </div>
          <div className="text-xs text-warm-gray-400 mt-1">
            HubSpot paid vs Meta
          </div>
        </div>
      </div>

      {/* Source Breakdown */}
      <div className="bg-white rounded-xl p-4 border border-warm-gray-200">
        <h4 className="text-sm font-medium text-warm-gray-700 mb-3">Desglose por Fuente</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {(['paid', 'organic', 'social', 'direct', 'referral', 'email', 'unknown'] as const).map((source) => {
            const count = data[source];
            const { bg, text, icon } = sourceColors[source];
            const percentage = data.total > 0 ? Math.round((count / data.total) * 100) : 0;

            return (
              <div
                key={source}
                className={`${bg} rounded-lg p-3 text-center transition-transform hover:scale-105`}
              >
                <div className="text-lg">{icon}</div>
                <div className={`text-xl font-bold ${text}`}>{count}</div>
                <div className="text-xs text-warm-gray-500 capitalize">{source}</div>
                <div className="text-xs text-warm-gray-400">{percentage}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Chart: Meta vs HubSpot */}
      <div className="bg-white rounded-xl p-4 border border-warm-gray-200">
        <h4 className="text-sm font-medium text-warm-gray-700 mb-3">Comparacion: Meta Ads vs HubSpot</h4>
        <div className="flex items-center gap-4">
          {/* Meta Conversions */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-warm-gray-600">Meta Ads (Atribuidos)</span>
              <span className="font-bold text-coral">{metaConversions}</span>
            </div>
            <div className="h-3 bg-warm-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-coral rounded-full transition-all duration-500"
                style={{
                  width: `${data.total > 0 ? Math.min((metaConversions / data.total) * 100, 100) : 0}%`,
                }}
              />
            </div>
          </div>

          {/* HubSpot Paid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-warm-gray-600">HubSpot (Paid Source)</span>
              <span className="font-bold text-blue-600">{data.paid}</span>
            </div>
            <div className="h-3 bg-warm-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{
                  width: `${data.total > 0 ? (data.paid / data.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          {/* HubSpot Total */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-warm-gray-600">HubSpot (Total)</span>
              <span className="font-bold text-green-600">{data.total}</span>
            </div>
            <div className="h-3 bg-warm-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Interpretation */}
        {attributionGap > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Nota:</strong> HubSpot detecta {attributionGap} conversion(es) paid mas que Meta.
              Esto puede deberse a cookies bloqueadas, Safari ITP, o conversiones cross-device.
            </p>
          </div>
        )}
      </div>

      {/* Recent Contacts */}
      {data.recentContacts.length > 0 && (
        <div className="bg-white rounded-xl p-4 border border-warm-gray-200">
          <h4 className="text-sm font-medium text-warm-gray-700 mb-3">Contactos Recientes</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {data.recentContacts.map((contact) => {
              const { bg, text, icon } = sourceColors[contact.source] || sourceColors.unknown;
              const date = new Date(contact.createdAt);

              return (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-warm-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center text-sm`}>
                      {icon}
                    </div>
                    <div>
                      <div className="font-medium text-warm-gray-800 text-sm">{contact.name}</div>
                      <div className="text-xs text-warm-gray-500">
                        {contact.funnel && <span className="mr-2">📍 {contact.funnel}</span>}
                        {contact.sourceDetail && <span>{contact.sourceDetail}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-medium ${text} ${bg} px-2 py-0.5 rounded-full`}>
                      {contact.isPaid ? 'Paid' : 'Organic'}
                    </div>
                    <div className="text-xs text-warm-gray-400 mt-1">
                      {date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Funnel Breakdown */}
      {Object.keys(data.byFunnel).length > 0 && (
        <div className="bg-white rounded-xl p-4 border border-warm-gray-200">
          <h4 className="text-sm font-medium text-warm-gray-700 mb-3">Por Funnel</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(data.byFunnel)
              .sort(([, a], [, b]) => b - a)
              .map(([funnel, count]) => (
                <div
                  key={funnel}
                  className="flex items-center gap-2 bg-warm-gray-50 rounded-full px-3 py-1.5"
                >
                  <span className="text-sm text-warm-gray-600">{funnel}</span>
                  <span className="bg-coral text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
