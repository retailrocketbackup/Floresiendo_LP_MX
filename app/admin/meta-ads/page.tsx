'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import {
  KPICard,
  TimeRangeSelector,
  CampaignList,
  PerformanceChart,
  ConversionsTable,
} from '@/components/admin/meta-ads';
import SearchFilter from '@/components/admin/meta-ads/SearchFilter';
import ExportButton from '@/components/admin/meta-ads/ExportButton';
import { DashboardSkeleton } from '@/components/admin/meta-ads/Skeleton';
import { ErrorEmptyState } from '@/components/admin/meta-ads/EmptyState';
// Dashboard 3.0 Components
import ConversionFunnel from '@/components/admin/meta-ads/ConversionFunnel';
import DemographicsChart from '@/components/admin/meta-ads/DemographicsChart';
import AdPerformanceTable from '@/components/admin/meta-ads/AdPerformanceTable';
import EngagementMetrics from '@/components/admin/meta-ads/EngagementMetrics';
import CostBreakdown from '@/components/admin/meta-ads/CostBreakdown';
import BudgetTracker from '@/components/admin/meta-ads/BudgetTracker';
import CollapsibleSection from '@/components/admin/meta-ads/CollapsibleSection';
import CampaignSelector from '@/components/admin/meta-ads/CampaignSelector';
import type {
  TimeRange,
  MetaAdsOverviewResponse,
  MetaAdsInsightsResponse,
  DailyDataPoint,
  ConversionRow,
  CampaignWithInsights,
} from '@/lib/meta-ads-types';

// Time range labels for display
const timeRangeLabels: Record<TimeRange, string> = {
  today: 'Hoy',
  yesterday: 'Ayer',
  last_7d: 'Ultimos 7 dias',
  last_14d: 'Ultimos 14 dias',
  last_30d: 'Ultimos 30 dias',
  this_month: 'Este mes',
  last_month: 'Mes pasado',
  maximum: 'Todo',
};

export default function MetaAdsDashboardPage() {
  // Auth state - starts as false, will be set in useEffect to avoid hydration mismatch
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Data state
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('last_30d');
  const [overview, setOverview] = useState<MetaAdsOverviewResponse | null>(null);
  const [dailyData, setDailyData] = useState<DailyDataPoint[]>([]);
  const [conversions, setConversions] = useState<ConversionRow[]>([]);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ACTIVE' | 'PAUSED'>('all');
  const [selectedCampaignIds, setSelectedCampaignIds] = useState<string[]>([]);

  // Comparison state
  const [showComparison, setShowComparison] = useState(false);

  // Dashboard 3.0 state
  const [demographics, setDemographics] = useState<Array<{
    age: string;
    spend: number;
    impressions: number;
    clicks: number;
    ctr: number;
    cpc: number;
    conversions: number;
    reach: number;
  }>>([]);
  const [demographicsLoading, setDemographicsLoading] = useState(false);

  // Last refresh indicator
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [refreshCountdown, setRefreshCountdown] = useState(300); // 5 minutes in seconds

  // Auth handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_session', 'true');
      localStorage.setItem('admin_password', password);
    } else {
      setAuthError('Contrasena incorrecta');
    }
  };

  // Fetch overview data
  const fetchOverview = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const storedPassword = localStorage.getItem('admin_password');
      const res = await fetch(`/api/admin/meta-ads?timeRange=${timeRange}&password=${storedPassword}`);

      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false);
          localStorage.removeItem('admin_session');
          localStorage.removeItem('admin_password');
          return;
        }
        throw new Error('Error al obtener datos');
      }

      const data: MetaAdsOverviewResponse = await res.json();
      setOverview(data);
      setLastRefresh(new Date());
      setRefreshCountdown(300);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, [timeRange]);

  // Fetch insights with daily breakdown
  const fetchInsights = useCallback(async () => {
    try {
      const storedPassword = localStorage.getItem('admin_password');
      const res = await fetch(
        `/api/admin/meta-ads/insights?timeRange=${timeRange}&password=${storedPassword}`
      );

      if (res.ok) {
        const data: MetaAdsInsightsResponse = await res.json();
        setDailyData(data.dailyBreakdown || []);
        setConversions(data.conversions || []);
      }
    } catch (err) {
      console.error('Error fetching insights:', err);
    }
  }, [timeRange]);

  // Fetch demographics data (Dashboard 3.0)
  const fetchDemographics = useCallback(async () => {
    setDemographicsLoading(true);
    try {
      const storedPassword = localStorage.getItem('admin_password');
      const res = await fetch(
        `/api/admin/meta-ads/demographics?timeRange=${timeRange}&password=${storedPassword}`
      );

      if (res.ok) {
        const data = await res.json();
        setDemographics(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching demographics:', err);
    } finally {
      setDemographicsLoading(false);
    }
  }, [timeRange]);

  // Check session on mount (also auto-auth in dev mode)
  useEffect(() => {
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isDev || localStorage.getItem('admin_session') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data when authenticated or time range changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchOverview();
      fetchInsights();
      fetchDemographics();
    }
  }, [isAuthenticated, timeRange, fetchOverview, fetchInsights, fetchDemographics]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      fetchOverview();
      fetchInsights();
      fetchDemographics();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated, timeRange, fetchOverview, fetchInsights, fetchDemographics]);

  // Countdown timer
  useEffect(() => {
    if (!isAuthenticated || !lastRefresh) return;

    const interval = setInterval(() => {
      setRefreshCountdown((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated, lastRefresh]);

  // Format helpers
  const formatCurrency = (value: string) => {
    const num = parseFloat(value || '0');
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
    }).format(num);
  };

  const formatNumber = (value: string) => {
    return new Intl.NumberFormat('es-MX').format(parseInt(value || '0', 10));
  };

  const formatPercentage = (value: string) => {
    return `${parseFloat(value || '0').toFixed(2)}%`;
  };

  // Filtered campaigns
  const filteredCampaigns = useMemo(() => {
    let campaigns = overview?.campaigns as CampaignWithInsights[] || [];

    // Filter by selected campaign IDs (top-level filter)
    if (selectedCampaignIds.length > 0) {
      campaigns = campaigns.filter((c) => selectedCampaignIds.includes(c.id));
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      campaigns = campaigns.filter((c) =>
        c.name.toLowerCase().includes(query) ||
        c.objective?.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      campaigns = campaigns.filter((c) => c.status === statusFilter);
    }

    return campaigns;
  }, [overview?.campaigns, searchQuery, statusFilter, selectedCampaignIds]);

  // Sparkline data from daily breakdown (last 7 points)
  const sparklineData = useMemo(() => {
    if (dailyData.length === 0) return {};
    const last7 = dailyData.slice(-7);
    return {
      spend: last7.map((d) => d.spend),
      impressions: last7.map((d) => d.impressions),
      clicks: last7.map((d) => d.clicks),
      reach: last7.map((d) => d.reach),
      ctr: last7.map((d) => d.ctr || 0),
    };
  }, [dailyData]);

  // Calculate trends (comparing to previous period)
  const calculateTrend = (current: number, previous: number): { value: number; direction: 'up' | 'down' | 'neutral' } => {
    if (previous === 0) return { value: 0, direction: 'neutral' };
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change),
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
    };
  };

  // Relative time display
  const getRelativeTime = () => {
    if (!lastRefresh) return '';
    const seconds = Math.floor((new Date().getTime() - lastRefresh.getTime()) / 1000);
    if (seconds < 60) return 'hace unos segundos';
    const minutes = Math.floor(seconds / 60);
    return `hace ${minutes} min`;
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchOverview();
    fetchInsights();
    fetchDemographics();
  };

  // Aggregated summary based on selected campaigns
  const aggregatedSummary = useMemo(() => {
    // If no specific campaigns selected, use account-level summary
    if (selectedCampaignIds.length === 0) {
      return overview?.summary || null;
    }

    // Aggregate from filtered campaigns
    const campaigns = filteredCampaigns.filter(c => c.insights);
    if (campaigns.length === 0) return overview?.summary || null;

    const totalSpend = campaigns.reduce((sum, c) => sum + parseFloat(c.insights?.spend || '0'), 0);
    const totalImpressions = campaigns.reduce((sum, c) => sum + parseInt(c.insights?.impressions || '0', 10), 0);
    const totalClicks = campaigns.reduce((sum, c) => sum + parseInt(c.insights?.clicks || '0', 10), 0);
    const totalReach = campaigns.reduce((sum, c) => sum + parseInt(c.insights?.reach || '0', 10), 0);
    const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const cpc = totalClicks > 0 ? totalSpend / totalClicks : 0;

    return {
      spend: totalSpend.toString(),
      impressions: totalImpressions.toString(),
      clicks: totalClicks.toString(),
      reach: totalReach.toString(),
      ctr: ctr.toString(),
      cpc: cpc.toString(),
    };
  }, [overview?.summary, filteredCampaigns, selectedCampaignIds]);

  // Prepare Dashboard 3.0 data
  const funnelData = useMemo(() => {
    if (!aggregatedSummary) return null;

    // Get total impressions, clicks, landing page views
    const impressions = parseInt(aggregatedSummary.impressions || '0', 10);
    const clicks = parseInt(aggregatedSummary.clicks || '0', 10);

    // Get landing page views from conversions
    const lpvConversion = conversions.find(c => c.action_type === 'landing_page_view');
    const landingPageViews = lpvConversion?.count || Math.floor(clicks * 0.6);

    // Get Floresiendo-specific conversions
    const conversionItems = conversions
      .filter(c =>
        c.action_type.includes('Llamada') ||
        c.action_type.includes('Whatsapp') ||
        c.action_type.includes('Schedule')
      )
      .map((c, i) => ({
        action_type: c.action_type,
        label: c.label,
        value: c.count,
        cost_per: c.cost_per,
        color: ['#E07A5F', '#10B981', '#3B82F6', '#8B5CF6'][i % 4],
      }));

    return {
      impressions,
      clicks,
      landingPageViews,
      conversions: conversionItems,
      totalSpend: parseFloat(aggregatedSummary.spend || '0'),
    };
  }, [aggregatedSummary, conversions]);

  const engagementData = useMemo(() => {
    // Extract engagement metrics from conversions
    const getCount = (type: string) =>
      conversions.find(c => c.action_type === type)?.count || 0;

    return {
      postEngagement: getCount('post_engagement'),
      postReactions: getCount('post_reaction'),
      postSaves: getCount('onsite_conversion.post_save'),
      videoViews: getCount('video_view'),
      comments: getCount('comment'),
      shares: getCount('post'),
      messagingStarted: getCount('onsite_conversion.messaging_conversation_started_7d'),
      pageEngagement: getCount('page_engagement'),
    };
  }, [conversions]);

  const costMetrics = useMemo(() => {
    return conversions
      .filter(c => c.cost_per && c.cost_per > 0)
      .slice(0, 6)
      .map((c, i) => ({
        action_type: c.action_type,
        label: c.label,
        cost: c.cost_per || 0,
        count: c.count,
        color: ['#E07A5F', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899'][i % 6],
      }));
  }, [conversions]);

  const adPerformanceData = useMemo(() => {
    // This would come from ad-level API, for now extract from campaigns
    const ads: Array<{
      id: string;
      name: string;
      status: string;
      spend: number;
      impressions: number;
      clicks: number;
      ctr: number;
      cpc: number;
      landingPageViews: number;
      conversions: number;
    }> = [];

    // Flatten campaign data to simulate ad data
    filteredCampaigns.forEach((campaign) => {
      if (campaign.insights) {
        ads.push({
          id: campaign.id,
          name: campaign.name,
          status: campaign.status,
          spend: parseFloat(campaign.insights.spend || '0'),
          impressions: parseInt(campaign.insights.impressions || '0', 10),
          clicks: parseInt(campaign.insights.clicks || '0', 10),
          ctr: parseFloat(campaign.insights.ctr || '0'),
          cpc: parseFloat(campaign.insights.cpc || '0'),
          landingPageViews: Math.floor(parseInt(campaign.insights.clicks || '0', 10) * 0.6),
          conversions: campaign.insights.actions?.reduce(
            (sum, a) =>
              a.action_type.includes('Llamada') || a.action_type.includes('conversion')
                ? sum + parseInt(a.value, 10)
                : sum,
            0
          ) || 0,
        });
      }
    });

    return ads;
  }, [filteredCampaigns]);

  const budgetData = useMemo(() => {
    const dailyBudget = 15; // MXN - from ad set config
    const totalSpent = parseFloat(aggregatedSummary?.spend || '0');
    const daysActive = dailyData.length || 1;

    return { dailyBudget, totalSpent, daysActive };
  }, [overview?.summary?.spend, dailyData.length]);

  // Auth screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-warm-cream to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-[fade-in_0.3s_ease-out]">
          <div className="text-center mb-8">
            <Image
              src="/floresiendo-logo-boton.webp"
              alt="Floresiendo"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-warm-gray-800">Meta Ads Dashboard</h1>
            <p className="text-warm-gray-500 mt-2">Ingresa tu contrasena de administrador</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contrasena"
              className="w-full px-4 py-3 border border-warm-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral"
            />
            {authError && (
              <p className="text-red-500 text-sm">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-coral text-white py-3 rounded-xl font-semibold hover:bg-coral/90 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Initial loading state
  if (initialLoad) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-warm-cream to-white">
        {/* Header skeleton */}
        <header className="bg-white border-b border-warm-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-warm-gray-200 rounded-full animate-pulse" />
              <div>
                <div className="h-6 w-40 bg-warm-gray-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-warm-gray-100 rounded mt-1 animate-pulse" />
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">
          <DashboardSkeleton />
        </main>
      </div>
    );
  }

  // Error state
  if (error && !overview) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-warm-cream to-white flex items-center justify-center p-4">
        <ErrorEmptyState onRetry={handleRefresh} />
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-cream to-white">
      {/* Header */}
      <header className="bg-white border-b border-warm-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <Image
                src="/floresiendo-logo-boton.webp"
                alt="Floresiendo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-warm-gray-800">Meta Ads Dashboard</h1>
                  <span className="px-2 py-0.5 text-xs font-medium bg-coral/10 text-coral rounded-full">
                    3.0
                  </span>
                </div>
                <p className="text-sm text-warm-gray-500">
                  {overview?.account?.name || 'Floresiendo'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Refresh countdown */}
              {lastRefresh && (
                <div className="hidden md:flex items-center gap-2 text-xs text-warm-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span>{getRelativeTime()}</span>
                  <span className="text-warm-gray-300">|</span>
                  <span>
                    {Math.floor(refreshCountdown / 60)}:{(refreshCountdown % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              )}

              {/* Campaign Selector */}
              <CampaignSelector
                campaigns={(overview?.campaigns as CampaignWithInsights[] || []).map(c => ({
                  id: c.id,
                  name: c.name,
                  status: c.status,
                }))}
                selectedCampaigns={selectedCampaignIds}
                onSelectionChange={setSelectedCampaignIds}
                loading={loading && !overview}
              />

              <TimeRangeSelector value={timeRange} onChange={setTimeRange} />

              <ExportButton
                campaigns={filteredCampaigns}
                dailyData={dailyData}
                conversions={conversions}
                summary={overview?.summary}
                timeRange={timeRangeLabels[timeRange]}
                disabled={loading}
              />

              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2.5 bg-coral text-white rounded-xl hover:bg-coral/90 transition-colors disabled:opacity-50 font-medium text-sm shadow-sm"
                title="Actualizar datos"
              >
                <svg
                  className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="hidden sm:inline">Actualizar</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          {aggregatedSummary && (
            <div className="flex items-center gap-6 text-sm border-t border-warm-gray-100 pt-3 overflow-x-auto">
              {selectedCampaignIds.length > 0 && (
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <span className="px-2 py-0.5 text-xs bg-coral/10 text-coral rounded-full font-medium">
                    {selectedCampaignIds.length} campana{selectedCampaignIds.length > 1 ? 's' : ''}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-warm-gray-400">Gasto:</span>
                <span className="font-semibold text-coral">{formatCurrency(aggregatedSummary.spend)}</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-warm-gray-400">Impresiones:</span>
                <span className="font-semibold text-blue-600">{formatNumber(aggregatedSummary.impressions)}</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-warm-gray-400">Clics:</span>
                <span className="font-semibold text-green-600">{formatNumber(aggregatedSummary.clicks)}</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-warm-gray-400">CTR:</span>
                <span className="font-semibold text-gold">{formatPercentage(aggregatedSummary.ctr)}</span>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
            <button
              onClick={handleRefresh}
              className="ml-auto text-sm font-medium text-red-700 hover:text-red-800"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* KPI Cards */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-warm-gray-800 mb-4">Metricas Principales</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <KPICard
              label="Gasto"
              value={formatCurrency(aggregatedSummary?.spend || '0')}
              color="coral"
              loading={loading && !overview}
              sparklineData={sparklineData.spend}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <KPICard
              label="Impresiones"
              value={formatNumber(aggregatedSummary?.impressions || '0')}
              color="blue"
              loading={loading && !overview}
              sparklineData={sparklineData.impressions}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
            />
            <KPICard
              label="Clics"
              value={formatNumber(aggregatedSummary?.clicks || '0')}
              color="green"
              loading={loading && !overview}
              sparklineData={sparklineData.clicks}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              }
            />
            <KPICard
              label="CTR"
              value={formatPercentage(aggregatedSummary?.ctr || '0')}
              color="gold"
              loading={loading && !overview}
              sparklineData={sparklineData.ctr}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
            <KPICard
              label="CPC"
              value={formatCurrency(aggregatedSummary?.cpc || '0')}
              color="purple"
              loading={loading && !overview}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
            />
            <KPICard
              label="Alcance"
              value={formatNumber(aggregatedSummary?.reach || '0')}
              color="teal"
              loading={loading && !overview}
              sparklineData={sparklineData.reach}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
          </div>
        </section>

        {/* Performance Chart - Always Open */}
        <section className="mb-6">
          <CollapsibleSection
            title="Rendimiento"
            subtitle={timeRangeLabels[timeRange]}
            defaultOpen={true}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            }
          >
            <PerformanceChart
              data={dailyData}
              loading={loading && dailyData.length === 0}
              showComparison={showComparison}
              onToggleComparison={() => setShowComparison(!showComparison)}
            />
          </CollapsibleSection>
        </section>

        {/* Dashboard 3.0: Conversion Funnel */}
        {funnelData && (
          <section className="mb-6">
            <CollapsibleSection
              title="Embudo de Conversion"
              subtitle="Floresiendo - Llamadas y WhatsApp"
              badge={funnelData.conversions.reduce((sum, c) => sum + c.value, 0)}
              badgeColor="#E07A5F"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              }
            >
              <ConversionFunnel
                impressions={funnelData.impressions}
                clicks={funnelData.clicks}
                landingPageViews={funnelData.landingPageViews}
                conversions={funnelData.conversions}
                totalSpend={funnelData.totalSpend}
                loading={loading && !overview}
              />
            </CollapsibleSection>
          </section>
        )}

        {/* Dashboard 3.0: Demographics */}
        <section className="mb-6">
          <CollapsibleSection
            title="Rendimiento por Edad"
            subtitle="Analisis demografico de audiencia"
            badge={demographics.length > 0 ? `${demographics.length} grupos` : undefined}
            badgeColor="#3B82F6"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          >
            <DemographicsChart
              data={demographics}
              loading={demographicsLoading}
            />
          </CollapsibleSection>
        </section>

        {/* Dashboard 3.0: Budget Tracker */}
        <section className="mb-6">
          <CollapsibleSection
            title="Control de Presupuesto"
            subtitle="Seguimiento del gasto publicitario"
            badge={formatCurrency(overview?.summary?.spend || '0')}
            badgeColor="#10B981"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            <BudgetTracker
              dailyBudget={budgetData.dailyBudget}
              totalSpent={budgetData.totalSpent}
              daysActive={budgetData.daysActive}
              currency="USD"
              loading={loading && !overview}
            />
          </CollapsibleSection>
        </section>

        {/* Dashboard 3.0: Engagement Metrics */}
        <section className="mb-6">
          <CollapsibleSection
            title="Metricas de Engagement"
            subtitle="Interacciones con el contenido"
            badge={engagementData.postEngagement + engagementData.videoViews}
            badgeColor="#8B5CF6"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            }
          >
            <EngagementMetrics
              data={engagementData}
              loading={loading && !overview}
            />
          </CollapsibleSection>
        </section>

        {/* Dashboard 3.0: Cost Breakdown */}
        <section className="mb-6">
          <CollapsibleSection
            title="Costo por Accion (CPA)"
            subtitle="Eficiencia del gasto publicitario"
            badge={costMetrics.length > 0 ? `${costMetrics.length} acciones` : undefined}
            badgeColor="#F59E0B"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            }
          >
            <CostBreakdown
              metrics={costMetrics}
              totalSpend={parseFloat(aggregatedSummary?.spend || '0')}
              loading={loading && !overview}
            />
          </CollapsibleSection>
        </section>

        {/* Dashboard 3.0: Ad Performance Table */}
        {adPerformanceData.length > 0 && (
          <section className="mb-6">
            <CollapsibleSection
              title="Rendimiento de Anuncios"
              subtitle="Comparacion de anuncios activos"
              badge={adPerformanceData.length}
              badgeColor="#EC4899"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              }
            >
              <AdPerformanceTable
                ads={adPerformanceData}
                loading={loading && !overview}
              />
            </CollapsibleSection>
          </section>
        )}

        {/* Campaigns Section */}
        <section className="mb-6">
          <CollapsibleSection
            title="Campanas"
            subtitle="Gestion de campanas publicitarias"
            badge={filteredCampaigns.length}
            badgeColor="#6366F1"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          >
            <SearchFilter
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              totalCount={(overview?.campaigns as CampaignWithInsights[] || []).length}
              filteredCount={filteredCampaigns.length}
            />
            <CampaignList
              campaigns={filteredCampaigns}
              loading={loading && !overview}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
              onRefresh={handleRefresh}
            />
          </CollapsibleSection>
        </section>

        {/* Conversions Section */}
        <section className="mb-6">
          <CollapsibleSection
            title="Conversiones"
            subtitle="Desglose de acciones de conversion"
            badge={conversions.reduce((sum, c) => sum + c.count, 0)}
            badgeColor="#E07A5F"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            <ConversionsTable conversions={conversions} loading={loading && conversions.length === 0} />
          </CollapsibleSection>
        </section>

        {/* Last Updated */}
        {overview?.lastUpdated && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <p className="text-sm text-warm-gray-400">
              Ultima actualizacion: {new Date(overview.lastUpdated).toLocaleString('es-MX')}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
