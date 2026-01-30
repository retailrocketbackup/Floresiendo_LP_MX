'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import {
  KPICard,
  TimeRangeSelector,
  PerformanceChart,
  ConversionsTable,
} from '@/components/admin/meta-ads';
import AdSetPerformanceTable from '@/components/admin/meta-ads/AdSetPerformanceTable';
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
import HubSpotConversions from '@/components/admin/meta-ads/HubSpotConversions';
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

  // HubSpot integration state
  const [hubspotData, setHubspotData] = useState<{
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
  } | null>(null);
  const [hubspotLoading, setHubspotLoading] = useState(false);
  const [hubspotError, setHubspotError] = useState<string | null>(null);
  const [hubspotConfigured, setHubspotConfigured] = useState(true);

  // Last refresh indicator
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [refreshCountdown, setRefreshCountdown] = useState(300); // 5 minutes in seconds

  // Menu state for collapsible controls
  const [menuOpen, setMenuOpen] = useState(false);
  // Pending state: staged values edited inside the menu, applied on "Aplicar"
  const [pendingCampaignIds, setPendingCampaignIds] = useState<string[]>([]);
  const [pendingTimeRange, setPendingTimeRange] = useState<TimeRange>('last_30d');

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
  const fetchOverview = useCallback(async (bustCache = false) => {
    setLoading(true);
    setError(null);

    try {
      const storedPassword = localStorage.getItem('admin_password');
      const cacheParam = bustCache ? '&bustCache=true' : '';
      const res = await fetch(`/api/admin/meta-ads?timeRange=${timeRange}&password=${storedPassword}${cacheParam}`);

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

      // Only pass campaignIds when filtering (not all campaigns selected)
      const allCampaignCount = overview?.campaigns?.length || 0;
      const isFiltered = selectedCampaignIds.length > 0 && selectedCampaignIds.length < allCampaignCount;
      const campaignParam = isFiltered
        ? `&campaignIds=${selectedCampaignIds.join(',')}`
        : '';

      const res = await fetch(
        `/api/admin/meta-ads/insights?timeRange=${timeRange}&password=${storedPassword}${campaignParam}`
      );

      if (res.ok) {
        const data: MetaAdsInsightsResponse = await res.json();
        setDailyData(data.dailyBreakdown || []);
        setConversions(data.conversions || []);
      }
    } catch (err) {
      console.error('Error fetching insights:', err);
    }
  }, [timeRange, selectedCampaignIds, overview?.campaigns?.length]);

  // Fetch demographics data (Dashboard 3.0)
  const fetchDemographics = useCallback(async () => {
    setDemographicsLoading(true);
    try {
      const storedPassword = localStorage.getItem('admin_password');

      // Only pass campaignIds when filtering (not all campaigns selected)
      const allCampaignCount = overview?.campaigns?.length || 0;
      const isFiltered = selectedCampaignIds.length > 0 && selectedCampaignIds.length < allCampaignCount;
      const campaignParam = isFiltered
        ? `&campaignIds=${selectedCampaignIds.join(',')}`
        : '';

      const res = await fetch(
        `/api/admin/meta-ads/demographics?timeRange=${timeRange}&password=${storedPassword}${campaignParam}`
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
  }, [timeRange, selectedCampaignIds, overview?.campaigns?.length]);

  // Fetch HubSpot contacts data
  const fetchHubspotContacts = useCallback(async () => {
    setHubspotLoading(true);
    setHubspotError(null);
    try {
      const storedPassword = localStorage.getItem('admin_password');
      // Map time range to days
      const daysMap: Record<TimeRange, number> = {
        today: 1,
        yesterday: 2,
        last_7d: 7,
        last_14d: 14,
        last_30d: 30,
        this_month: 31,
        last_month: 60,
        maximum: 365,
      };
      const days = daysMap[timeRange] || 30;

      const res = await fetch(
        `/api/admin/hubspot/contacts?days=${days}&password=${storedPassword}`
      );

      if (res.ok) {
        const data = await res.json();
        setHubspotConfigured(data.configured !== false);
        if (data.summary) {
          setHubspotData(data.summary);
        }
        if (data.error && !data.configured) {
          setHubspotError(data.error);
        }
      } else {
        const errorData = await res.json();
        setHubspotError(errorData.error || 'Error fetching HubSpot data');
      }
    } catch (err) {
      console.error('Error fetching HubSpot contacts:', err);
      setHubspotError('Error connecting to HubSpot');
    } finally {
      setHubspotLoading(false);
    }
  }, [timeRange]);

  // Check session on mount (also auto-auth in dev mode)
  useEffect(() => {
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isDev || localStorage.getItem('admin_session') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Initialize campaign selection with all campaigns when data loads
  useEffect(() => {
    if (overview?.campaigns && selectedCampaignIds.length === 0) {
      const allCampaignIds = (overview.campaigns as CampaignWithInsights[]).map(c => c.id);
      setSelectedCampaignIds(allCampaignIds);
    }
  }, [overview?.campaigns]);

  // Fetch data when authenticated or time range changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchOverview();
      fetchInsights();
      fetchDemographics();
      fetchHubspotContacts();
    }
  }, [isAuthenticated, timeRange, fetchOverview, fetchInsights, fetchDemographics, fetchHubspotContacts]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      fetchOverview();
      fetchInsights();
      fetchDemographics();
      fetchHubspotContacts();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated, timeRange, fetchOverview, fetchInsights, fetchDemographics, fetchHubspotContacts]);

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
  // Sort by date to ensure correct trend visualization
  const sparklineData = useMemo(() => {
    if (dailyData.length === 0) return {};
    // Sort by date ascending before slicing to ensure correct order
    const sortedData = [...dailyData].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const last7 = sortedData.slice(-7);
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

  // Handle refresh - clears cache and fetches fresh data
  const handleRefresh = () => {
    fetchOverview(true); // bustCache=true
    fetchInsights();
    fetchDemographics();
    fetchHubspotContacts();
  };

  // Menu handlers: stage changes, apply on confirm
  const handleMenuToggle = () => {
    if (!menuOpen) {
      // Opening: snapshot current state into pending
      setPendingCampaignIds(selectedCampaignIds);
      setPendingTimeRange(timeRange);
    }
    setMenuOpen(!menuOpen);
  };

  const handleMenuApply = () => {
    setSelectedCampaignIds(pendingCampaignIds);
    setTimeRange(pendingTimeRange);
    setMenuOpen(false);
  };

  const handleMenuClose = () => {
    // Discard pending changes
    setMenuOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_session');
    localStorage.removeItem('admin_password');
  };

  // Aggregated summary based on selected campaigns
  // NOTE: Reach cannot be summed across campaigns (unique users would be double-counted)
  // When filtering campaigns, reach shows "N/A" or account-level value when all selected
  const aggregatedSummary = useMemo(() => {
    const allCampaigns = overview?.campaigns as CampaignWithInsights[] || [];
    const allSelected = selectedCampaignIds.length === allCampaigns.length;

    // If all campaigns selected, use account-level summary (includes correct reach)
    if (allSelected || selectedCampaignIds.length === 0) {
      return overview?.summary || null;
    }

    // Aggregate from filtered campaigns
    const campaigns = filteredCampaigns.filter(c => c.insights);
    if (campaigns.length === 0) return overview?.summary || null;

    const totalSpend = campaigns.reduce((sum, c) => sum + parseFloat(c.insights?.spend || '0'), 0);
    const totalImpressions = campaigns.reduce((sum, c) => sum + parseInt(c.insights?.impressions || '0', 10), 0);
    const totalClicks = campaigns.reduce((sum, c) => sum + parseInt(c.insights?.clicks || '0', 10), 0);
    const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const cpc = totalClicks > 0 ? totalSpend / totalClicks : 0;

    // IMPORTANT: Reach is NOT aggregated when filtering campaigns
    // Setting to empty string signals the UI to show "N/A" for filtered selections
    return {
      spend: totalSpend.toString(),
      impressions: totalImpressions.toString(),
      clicks: totalClicks.toString(),
      reach: '', // Cannot sum reach across campaigns - show N/A in UI
      ctr: ctr.toString(),
      cpc: cpc.toString(),
      isFiltered: true, // Flag to indicate this is aggregated from filtered campaigns
    };
  }, [overview?.summary, filteredCampaigns, selectedCampaignIds, overview?.campaigns]);

  // Filtered conversions based on selected campaigns
  // When all campaigns selected: use account-level conversions (most accurate)
  // When filtered: aggregate actions+conversions from each campaign's insights
  const filteredConversions = useMemo(() => {
    const allCampaigns = overview?.campaigns as CampaignWithInsights[] || [];
    const allSelected = selectedCampaignIds.length === allCampaigns.length
                        || selectedCampaignIds.length === 0;

    if (allSelected) return conversions;

    // Aggregate from filtered campaigns' insights
    const actionSums = new Map<string, number>();
    const costTotals = new Map<string, { totalCost: number; totalCount: number }>();

    const campaignsToAggregate = allCampaigns.filter(c => selectedCampaignIds.includes(c.id));

    for (const campaign of campaignsToAggregate) {
      if (!campaign.insights) continue;

      // Combine actions + conversions arrays from each campaign
      const allActions = [
        ...(campaign.insights.actions || []),
        ...(campaign.insights.conversions || []),
      ];

      // Dedupe within this campaign (prefer conversions array)
      const campaignActionMap = new Map<string, { action_type: string; value: string }>();
      for (const action of allActions) {
        if (action.action_type === 'offsite_conversion.fb_pixel_custom') continue;
        campaignActionMap.set(action.action_type, action);
      }

      // Sum values by action_type across campaigns
      for (const [actionType, action] of campaignActionMap) {
        const count = parseInt(action.value, 10);
        actionSums.set(actionType, (actionSums.get(actionType) || 0) + count);
      }

      // Aggregate cost_per_action_type
      for (const costAction of campaign.insights.cost_per_action_type || []) {
        const costValue = parseFloat(costAction.value);
        // Find the count for this action in this campaign
        const actionEntry = campaignActionMap.get(costAction.action_type);
        const count = actionEntry ? parseInt(actionEntry.value, 10) : 0;
        const existing = costTotals.get(costAction.action_type) || { totalCost: 0, totalCount: 0 };
        costTotals.set(costAction.action_type, {
          totalCost: existing.totalCost + (costValue * count),
          totalCount: existing.totalCount + count,
        });
      }
    }

    // Build ConversionRow[] using same label logic as parseConversions
    const actionLabels: Record<string, string> = {
      'offsite_conversion.fb_pixel_lead': 'Leads',
      'offsite_conversion.fb_pixel_purchase': 'Compras',
      'offsite_conversion.fb_pixel_view_content': 'Vistas de Contenido',
      'offsite_conversion.fb_pixel_initiate_checkout': 'Inicios de Checkout',
      'offsite_conversion.fb_pixel_add_to_cart': 'Agregar al Carrito',
      'offsite_conversion.fb_pixel_complete_registration': 'Registros',
      'offsite_conversion.fb_pixel_schedule': 'Citas Agendadas',
      'link_click': 'Clics en Enlace',
      'landing_page_view': 'Vistas de Landing',
      'post_engagement': 'Interacciones',
      'page_engagement': 'Interacciones de Pagina',
      'video_view': 'Vistas de Video',
      'onsite_conversion.messaging_conversation_started_7d': 'Conversaciones Iniciadas',
      'offsite_conversion.fb_pixel_custom.Lead_Meditacion_Gratis': 'Leads Meditación',
      'offsite_conversion.fb_pixel_custom.Lead_Conferencia_Gratis': 'Leads Conferencia',
      'offsite_conversion.fb_pixel_custom.CompleteRegistration_Meditacion': 'Registros Meditación',
      'offsite_conversion.fb_pixel_custom.CompleteRegistration_Conferencia': 'Registros Conferencia',
      'offsite_conversion.fb_pixel_custom.Lead_Estres': 'Leads Estrés',
      'offsite_conversion.fb_pixel_custom.Lead_Duelo': 'Leads Duelo',
      'offsite_conversion.fb_pixel_custom.Lead_Proposito': 'Leads Propósito',
      'offsite_conversion.fb_pixel_custom.ViewContent_Estres': 'Vista Estrés',
      'offsite_conversion.fb_pixel_custom.ViewContent_Duelo': 'Vista Duelo',
      'offsite_conversion.fb_pixel_custom.ViewContent_Proposito': 'Vista Propósito',
    };

    const extractEventName = (type: string) => {
      if (type.startsWith('offsite_conversion.fb_pixel_custom.')) {
        return type.replace('offsite_conversion.fb_pixel_custom.', '');
      }
      return type;
    };

    const isFloresiendo = (type: string) => {
      const eventName = extractEventName(type);
      return (
        eventName.startsWith('Lead_') ||
        eventName.startsWith('CompleteRegistration_') ||
        eventName.startsWith('ViewContent_') ||
        eventName.includes('Video') ||
        eventName.includes('Llamada') ||
        eventName.includes('Whatsapp')
      );
    };

    const getLabel = (type: string) => {
      if (actionLabels[type]) return actionLabels[type];
      const eventName = extractEventName(type);
      return eventName.replace(/_/g, ' ');
    };

    const rows: ConversionRow[] = [];
    for (const [actionType, count] of actionSums) {
      if (!actionLabels[actionType] && !isFloresiendo(actionType)) continue;
      const costEntry = costTotals.get(actionType);
      const costPer = costEntry && costEntry.totalCount > 0
        ? costEntry.totalCost / costEntry.totalCount
        : undefined;
      rows.push({
        action_type: actionType,
        label: getLabel(actionType),
        count,
        cost_per: costPer,
      });
    }

    return rows.sort((a, b) => b.count - a.count);
  }, [conversions, selectedCampaignIds, overview?.campaigns]);

  // Prepare Dashboard 3.0 data
  const funnelData = useMemo(() => {
    if (!aggregatedSummary) return null;

    // Get total impressions, clicks, landing page views
    const impressions = parseInt(aggregatedSummary.impressions || '0', 10);
    const clicks = parseInt(aggregatedSummary.clicks || '0', 10);

    // Get landing page views from conversions
    const lpvConversion = filteredConversions.find(c => c.action_type === 'landing_page_view');
    const landingPageViews = lpvConversion?.count || Math.floor(clicks * 0.6);

    // Calculate total LEADS (form submissions - first funnel stage after landing)
    // Only count Floresiendo custom events (Lead_*) to avoid double-counting with
    // the generic offsite_conversion.fb_pixel_lead which overlaps
    const totalLeads = filteredConversions
      .filter(c => c.action_type.includes('Lead_'))
      .reduce((sum, c) => sum + c.count, 0);

    // Calculate total REGISTRATIONS (complete registration - final funnel stage)
    // Only count Floresiendo custom events (CompleteRegistration_*) to avoid
    // double-counting with the generic offsite_conversion.fb_pixel_complete_registration
    const totalRegistrations = filteredConversions
      .filter(c => c.action_type.includes('CompleteRegistration_'))
      .reduce((sum, c) => sum + c.count, 0);

    // Get Floresiendo-specific conversions for breakdown cards
    const conversionItems = filteredConversions
      .filter(c =>
        // TOFU-B Lead Magnet events
        c.action_type.includes('Lead_Meditacion') ||
        c.action_type.includes('Lead_Conferencia') ||
        c.action_type.includes('CompleteRegistration_') ||
        // TOFU-A Pain Funnel events
        c.action_type.includes('Lead_Estres') ||
        c.action_type.includes('Lead_Duelo') ||
        c.action_type.includes('Lead_Proposito') ||
        // Legacy events (calls/WhatsApp)
        c.action_type.includes('Llamada') ||
        c.action_type.includes('Whatsapp') ||
        c.action_type.includes('Schedule')
      )
      .map((c, i) => ({
        action_type: c.action_type,
        label: c.label,
        value: c.count,
        cost_per: c.cost_per,
        // Color coding: amber for leads, coral for registrations, others get blue/green
        color: c.action_type.includes('Lead_') ? '#F59E0B' :
               c.action_type.includes('CompleteRegistration_') ? '#E07A5F' :
               ['#10B981', '#3B82F6', '#8B5CF6'][i % 3],
      }));

    return {
      impressions,
      clicks,
      landingPageViews,
      conversions: conversionItems,
      totalSpend: parseFloat(aggregatedSummary.spend || '0'),
      totalLeads,
      totalRegistrations,
    };
  }, [aggregatedSummary, filteredConversions]);

  const engagementData = useMemo(() => {
    // Extract engagement metrics from conversions
    const getCount = (type: string) =>
      filteredConversions.find(c => c.action_type === type)?.count || 0;

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
  }, [filteredConversions]);

  const costMetrics = useMemo(() => {
    return filteredConversions
      .filter(c => c.cost_per && c.cost_per > 0)
      .slice(0, 6)
      .map((c, i) => ({
        action_type: c.action_type,
        label: c.label,
        cost: c.cost_per || 0,
        count: c.count,
        color: ['#E07A5F', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899'][i % 6],
      }));
  }, [filteredConversions]);

  // Calculate total Meta conversions for HubSpot comparison
  const metaTotalConversions = useMemo(() => {
    // Count primary conversion types from Meta
    const conversionTypes = [
      'offsite_conversion.fb_pixel_complete_registration',
      'offsite_conversion.fb_pixel_lead',
      'offsite_conversion.fb_pixel_purchase',
      'complete_registration',
    ];
    return filteredConversions
      .filter(c => conversionTypes.includes(c.action_type))
      .reduce((sum, c) => sum + c.count, 0);
  }, [filteredConversions]);

  // Ad Set Performance Data - extract from campaigns hierarchy
  const adSetPerformanceData = useMemo(() => {
    const adSets: Array<{
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
    }> = [];

    filteredCampaigns.forEach((campaign) => {
      campaign.adsets?.forEach((adset) => {
        if (adset.insights) {
          adSets.push({
            id: adset.id,
            name: adset.name,
            campaignName: campaign.name,
            status: adset.status,
            dailyBudget: adset.daily_budget ? parseFloat(adset.daily_budget) / 100 : undefined,
            optimizationGoal: adset.optimization_goal,
            spend: parseFloat(adset.insights.spend || '0'),
            impressions: parseInt(adset.insights.impressions || '0', 10),
            clicks: parseInt(adset.insights.clicks || '0', 10),
            ctr: parseFloat(adset.insights.ctr || '0'),
            cpc: parseFloat(adset.insights.cpc || '0'),
            reach: parseInt(adset.insights.reach || '0', 10),
            adsCount: adset.ads?.length || 0,
          });
        }
      });
    });

    return adSets;
  }, [filteredCampaigns]);

  // Ad Performance Data - extract ACTUAL ad data from campaigns hierarchy
  const adPerformanceData = useMemo(() => {
    const ads: Array<{
      id: string;
      name: string;
      campaignName?: string;
      adsetName?: string;
      status: string;
      spend: number;
      impressions: number;
      clicks: number;
      ctr: number;
      cpc: number;
      reach?: number;
      landingPageViews: number;
      conversions: number;
    }> = [];

    filteredCampaigns.forEach((campaign) => {
      campaign.adsets?.forEach((adset) => {
        adset.ads?.forEach((ad) => {
          if (ad.insights) {
            ads.push({
              id: ad.id,
              name: ad.name,
              campaignName: campaign.name,
              adsetName: adset.name,
              status: ad.status,
              spend: parseFloat(ad.insights.spend || '0'),
              impressions: parseInt(ad.insights.impressions || '0', 10),
              clicks: parseInt(ad.insights.clicks || '0', 10),
              ctr: parseFloat(ad.insights.ctr || '0'),
              cpc: parseFloat(ad.insights.cpc || '0'),
              reach: parseInt(ad.insights.reach || '0', 10),
              // Use actual landing_page_view from actions, fallback to 60% estimate
              landingPageViews: (() => {
                const lpvAction = ad.insights.actions?.find(a => a.action_type === 'landing_page_view');
                return lpvAction
                  ? parseInt(lpvAction.value, 10)
                  : Math.floor(parseInt(ad.insights.clicks || '0', 10) * 0.6);
              })(),
              // Count Floresiendo-specific pixel events
              conversions: ad.insights.actions?.reduce(
                (sum, a) =>
                  // Floresiendo custom events (full format: offsite_conversion.fb_pixel_custom.Lead_*)
                  a.action_type.includes('Lead_') ||
                  a.action_type.includes('CompleteRegistration_') ||
                  // Standard Meta pixel events
                  a.action_type === 'offsite_conversion.fb_pixel_lead' ||
                  a.action_type === 'offsite_conversion.fb_pixel_complete_registration'
                    ? sum + parseInt(a.value, 10)
                    : sum,
                0
              ) || 0,
            });
          }
        });
      });
    });

    return ads;
  }, [filteredCampaigns]);

  const budgetData = useMemo(() => {
    // Calculate daily budget from actual ad set configurations
    let totalDailyBudget = 0;
    filteredCampaigns.forEach((campaign) => {
      campaign.adsets?.forEach((adset) => {
        if (adset.status === 'ACTIVE' && adset.daily_budget) {
          // daily_budget is in cents, convert to dollars
          totalDailyBudget += parseFloat(adset.daily_budget) / 100;
        }
      });
    });

    // Fallback to default if no active ad sets with budgets
    const dailyBudget = totalDailyBudget > 0 ? totalDailyBudget : 15;
    const totalSpent = parseFloat(aggregatedSummary?.spend || '0');
    const daysActive = dailyData.length || 1;

    return { dailyBudget, totalSpent, daysActive };
  }, [aggregatedSummary?.spend, dailyData.length, filteredCampaigns]);

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

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Refresh Button - Always visible */}
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
              </button>

              {/* Menu Toggle Button */}
              <div className="relative">
                <button
                  onClick={handleMenuToggle}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-colors font-medium text-sm ${
                    menuOpen
                      ? 'bg-coral text-white'
                      : 'bg-warm-gray-100 text-warm-gray-600 hover:bg-warm-gray-200'
                  }`}
                  title="Menu"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {menuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                  <span className="hidden sm:inline">Menu</span>
                </button>

                {/* Dropdown Menu Panel */}
                {menuOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={handleMenuClose}
                    />

                    {/* Menu Panel */}
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-warm-gray-200 z-50 overflow-hidden animate-[fade-in_0.15s_ease-out]">
                      {/* Refresh countdown */}
                      {lastRefresh && (
                        <div className="flex items-center gap-2 px-4 py-3 bg-warm-gray-50 border-b border-warm-gray-100 text-xs text-warm-gray-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          <span>Actualizado {getRelativeTime()}</span>
                          <span className="text-warm-gray-300">|</span>
                          <span>
                            Prox: {Math.floor(refreshCountdown / 60)}:{(refreshCountdown % 60).toString().padStart(2, '0')}
                          </span>
                        </div>
                      )}

                      {/* Menu Items */}
                      <div className="p-3 space-y-3">
                        {/* Campaign Selector */}
                        <div>
                          <label className="block text-xs font-medium text-warm-gray-500 mb-1.5 px-1">
                            Campanas
                          </label>
                          <CampaignSelector
                            campaigns={(overview?.campaigns as CampaignWithInsights[] || []).map(c => ({
                              id: c.id,
                              name: c.name,
                              status: c.status,
                            }))}
                            selectedCampaigns={pendingCampaignIds}
                            onSelectionChange={setPendingCampaignIds}
                            loading={loading && !overview}
                            inline
                          />
                        </div>

                        {/* Time Range */}
                        <div>
                          <label className="block text-xs font-medium text-warm-gray-500 mb-1.5 px-1">
                            Periodo
                          </label>
                          <TimeRangeSelector value={pendingTimeRange} onChange={setPendingTimeRange} />
                        </div>

                        {/* Export */}
                        <div>
                          <label className="block text-xs font-medium text-warm-gray-500 mb-1.5 px-1">
                            Exportar
                          </label>
                          <ExportButton
                            campaigns={filteredCampaigns}
                            dailyData={dailyData}
                            conversions={filteredConversions}
                            summary={overview?.summary}
                            timeRange={timeRangeLabels[timeRange]}
                            disabled={loading}
                          />
                        </div>
                      </div>

                      {/* Apply Button */}
                      <div className="px-3 py-3 border-t border-warm-gray-100">
                        <button
                          onClick={handleMenuApply}
                          className="flex items-center justify-center gap-2 w-full px-3 py-2.5 bg-coral text-white rounded-lg hover:bg-coral/90 transition-colors font-medium text-sm shadow-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Aplicar
                        </button>
                      </div>

                      {/* Logout Footer */}
                      <div className="px-3 pb-3 pt-0">
                        <button
                          onClick={handleLogout}
                          className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-warm-gray-100 text-warm-gray-500 rounded-lg hover:bg-warm-gray-200 transition-colors font-medium text-xs"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Cerrar Sesion
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          {aggregatedSummary && (
            <div className="flex items-center gap-3 sm:gap-6 text-sm border-t border-warm-gray-100 pt-3 overflow-x-auto pb-1 scrollbar-hide">
              {selectedCampaignIds.length > 0 && selectedCampaignIds.length < (overview?.campaigns?.length || 0) && (
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <span className="px-2 py-0.5 text-xs bg-coral/10 text-coral rounded-full font-medium">
                    {selectedCampaignIds.length} campaña{selectedCampaignIds.length > 1 ? 's' : ''}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-warm-gray-400">Gasto:</span>
                <span className="font-semibold text-coral">{formatCurrency(aggregatedSummary?.spend || '0')}</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-warm-gray-400">Impresiones:</span>
                <span className="font-semibold text-blue-600">{formatNumber(aggregatedSummary?.impressions || '0')}</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-warm-gray-400">Clics:</span>
                <span className="font-semibold text-green-600">{formatNumber(aggregatedSummary?.clicks || '0')}</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-warm-gray-400">CTR:</span>
                <span className="font-semibold text-gold">{formatPercentage(aggregatedSummary?.ctr || '0')}</span>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
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
              value={aggregatedSummary?.reach ? formatNumber(aggregatedSummary.reach) : 'N/A'}
              color="teal"
              loading={loading && !overview}
              sparklineData={aggregatedSummary?.reach ? sparklineData.reach : undefined}
              tooltip={!aggregatedSummary?.reach ? 'El alcance no puede sumarse entre campañas filtradas (usuarios únicos)' : undefined}
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
              subtitle={`${funnelData.totalLeads} Leads → ${funnelData.totalRegistrations} Registros`}
              badge={funnelData.totalRegistrations}
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
                totalLeads={funnelData.totalLeads}
                totalRegistrations={funnelData.totalRegistrations}
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

        {/* Ad Set Performance Table */}
        {adSetPerformanceData.length > 0 && (
          <section className="mb-6">
            <CollapsibleSection
              title="Conjuntos de Anuncios"
              subtitle="Metricas por ad set"
              badge={adSetPerformanceData.length}
              badgeColor="#8B5CF6"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              }
            >
              <AdSetPerformanceTable
                adSets={adSetPerformanceData}
                loading={loading && !overview}
              />
            </CollapsibleSection>
          </section>
        )}

        {/* Ad Performance Table */}
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

        {/* Conversions Section */}
        <section className="mb-6">
          <CollapsibleSection
            title="Conversiones"
            subtitle="Desglose de acciones de conversion"
            badge={filteredConversions.reduce((sum, c) => sum + c.count, 0)}
            badgeColor="#E07A5F"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            <ConversionsTable conversions={filteredConversions} loading={loading && filteredConversions.length === 0} />
          </CollapsibleSection>
        </section>

        {/* HubSpot Conversions Section - Paid vs Organic */}
        <section className="mb-6">
          <CollapsibleSection
            title="HubSpot: Paid vs Organic"
            subtitle="Comparacion de fuentes de conversion"
            badge={hubspotData?.total || 0}
            badgeColor="#FF7A59"
            defaultOpen={true}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          >
            <HubSpotConversions
              data={hubspotData}
              loading={hubspotLoading}
              error={hubspotError || undefined}
              configured={hubspotConfigured}
              metaConversions={metaTotalConversions}
            />
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
