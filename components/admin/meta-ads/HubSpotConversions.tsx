'use client';

import { useMemo, useState } from 'react';

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

// Simplified source colors - only 3 categories
const sourceColors: Record<string, { bg: string; text: string; icon: string }> = {
  paid: { bg: 'bg-coral/10', text: 'text-coral', icon: '💰' },
  organic: { bg: 'bg-green-100', text: 'text-green-700', icon: '🌱' },
  unknown: { bg: 'bg-gray-100', text: 'text-gray-600', icon: '❓' },
};

// Hardcoded test data for visualization
const MOCK_DATA: ConversionSummary = {
  total: 47,
  paid: 28,
  organic: 8,
  direct: 5,
  referral: 2,
  email: 1,
  social: 2,
  unknown: 1,
  byFunnel: {
    'meditacion-gratis': 22,
    'conferencia-gratis': 15,
    'estres': 6,
    'proposito': 4,
  },
  byDate: {
    '2025-01-23': { total: 8, paid: 5, organic: 3 },
    '2025-01-22': { total: 12, paid: 8, organic: 4 },
    '2025-01-21': { total: 9, paid: 6, organic: 3 },
    '2025-01-20': { total: 7, paid: 4, organic: 3 },
    '2025-01-19': { total: 11, paid: 5, organic: 6 },
  },
  recentContacts: [
    { id: '1', name: 'María García', email: 'maria@test.com', source: 'paid', sourceDetail: 'Facebook Ads - TOFU-B Meditacion', funnel: 'meditacion-gratis', createdAt: '2025-01-23T14:30:00Z', isPaid: true },
    { id: '2', name: 'Carlos López', email: 'carlos@test.com', source: 'paid', sourceDetail: 'Facebook Ads - TOFU-B Conferencia', funnel: 'conferencia-gratis', createdAt: '2025-01-23T12:15:00Z', isPaid: true },
    { id: '3', name: 'Ana Martínez', source: 'organic', sourceDetail: 'Google Search', funnel: 'meditacion-gratis', createdAt: '2025-01-23T10:45:00Z', isPaid: false },
    { id: '4', name: 'Roberto Hernández', source: 'paid', sourceDetail: 'Facebook Ads - TOFU-A Estres', funnel: 'estres', createdAt: '2025-01-22T18:20:00Z', isPaid: true },
    { id: '5', name: 'Laura Sánchez', email: 'laura@test.com', source: 'organic', sourceDetail: 'Direct', createdAt: '2025-01-22T16:00:00Z', isPaid: false },
  ],
};

export default function HubSpotConversions({
  data: rawData,
  loading,
  error,
  configured = true,
  metaConversions = 0,
}: HubSpotConversionsProps) {
  // Toggle for test data visualization (dev only)
  const [useTestData, setUseTestData] = useState(false);
  const isDev = process.env.NODE_ENV === 'development';

  // Use test data if toggled on, otherwise use real data
  const data = useTestData ? MOCK_DATA : rawData;

  // Calculate attribution rate
  const attributionRate = useMemo(() => {
    if (!data || data.total === 0) return 0;
    return Math.round((data.paid / data.total) * 100);
  }, [data]);

  // Calculate organic count (combines all non-paid, non-unknown sources)
  const organicCount = useMemo(() => {
    if (!data) return 0;
    return data.organic + data.social + data.direct + data.referral + data.email;
  }, [data]);

  const organicRate = useMemo(() => {
    if (!data || data.total === 0) return 0;
    return Math.round((organicCount / data.total) * 100);
  }, [data, organicCount]);

  // Calculate unknown rate
  const unknownRate = useMemo(() => {
    if (!data || data.total === 0) return 0;
    return Math.round((data.unknown / data.total) * 100);
  }, [data]);

  // Calculate gap between HubSpot and Meta
  const attributionGap = useMemo(() => {
    if (!data) return 0;
    return data.paid - metaConversions;
  }, [data, metaConversions]);

  // Simplified breakdown data (only 3 categories) - must be before any returns
  const simplifiedBreakdown = useMemo(() => {
    if (!data) return [];
    return [
      { key: 'paid', label: 'Paid', count: data.paid, percentage: attributionRate },
      { key: 'organic', label: 'Organic', count: organicCount, percentage: organicRate },
      { key: 'unknown', label: 'Unknown', count: data.unknown, percentage: unknownRate },
    ];
  }, [data, attributionRate, organicCount, organicRate, unknownRate]);

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
      {/* Dev Test Data Toggle */}
      {isDev && (
        <div className="flex items-center justify-end gap-2">
          <span className="text-xs text-warm-gray-500">Test Data</span>
          <button
            onClick={() => setUseTestData(!useTestData)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
              useTestData ? 'bg-coral' : 'bg-warm-gray-300'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                useTestData ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      )}

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

        {/* Organic (excludes Unknown) */}
        <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border border-green-200">
          <div className="flex items-center gap-2 text-green-700 text-sm">
            <span>🌱</span>
            <span>Organico</span>
          </div>
          <div className="text-2xl font-bold text-green-700 mt-1">
            {organicCount}
          </div>
          <div className="text-xs text-warm-gray-400 mt-1">
            {organicRate}% del total
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

      {/* Source Breakdown - Simplified to 3 categories */}
      <div className="bg-white rounded-xl p-4 border border-warm-gray-200">
        <h4 className="text-sm font-medium text-warm-gray-700 mb-3">Desglose por Fuente</h4>
        <div className="grid grid-cols-3 gap-3">
          {simplifiedBreakdown.map(({ key, label, count, percentage }) => {
            const { bg, text, icon } = sourceColors[key] || sourceColors.unknown;

            return (
              <div
                key={key}
                className={`${bg} rounded-lg p-4 text-center transition-transform hover:scale-105`}
              >
                <div className="text-2xl mb-1">{icon}</div>
                <div className={`text-3xl font-bold ${text}`}>{count}</div>
                <div className="text-sm text-warm-gray-600 font-medium">{label}</div>
                <div className="text-sm text-warm-gray-400">{percentage}%</div>
              </div>
            );
          })}
        </div>
        {/* Hint about what Organic includes */}
        <p className="text-xs text-warm-gray-400 mt-3 text-center">
          Organic incluye: búsqueda orgánica, social orgánico, directo, referral y email
        </p>
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
              // Map to simplified categories: paid, organic, unknown
              const simplifiedSource = contact.isPaid ? 'paid' :
                (contact.source === 'unknown' ? 'unknown' : 'organic');
              const { bg, text, icon } = sourceColors[simplifiedSource];
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
