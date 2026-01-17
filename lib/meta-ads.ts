// Meta Ads API Client for Floresiendo Dashboard
// Server-side only - never import in client components

import {
  MetaAccount,
  MetaCampaign,
  MetaAdSet,
  MetaAd,
  MetaInsights,
  TimeRange,
  DailyDataPoint,
  ConversionRow,
} from './meta-ads-types';

const META_API_VERSION = 'v21.0';
const META_API_BASE = `https://graph.facebook.com/${META_API_VERSION}`;

// Cache for API responses (5 minute TTL)
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  cache.delete(key);
  return null;
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// Get access token from environment
function getAccessToken(): string {
  const token = process.env.META_ADS_ACCESS_TOKEN;
  if (!token) {
    throw new Error('META_ADS_ACCESS_TOKEN not configured');
  }
  return token;
}

// Get account ID from environment
export function getAccountId(): string {
  // Support both naming conventions
  const accountId = process.env.META_ADS_ACCOUNT_ID || process.env.META_AD_ACCOUNT_ID;
  if (!accountId) {
    throw new Error('META_ADS_ACCOUNT_ID or META_AD_ACCOUNT_ID not configured');
  }
  return accountId;
}

// Generic Meta API fetch wrapper
async function metaFetch<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const token = getAccessToken();
  const url = new URL(`${META_API_BASE}${endpoint}`);

  url.searchParams.set('access_token', token);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const cacheKey = url.toString();
  const cached = getCached<T>(cacheKey);
  if (cached) {
    return cached;
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('[Meta API Error]', error);
    throw new Error(error.error?.message || 'Meta API request failed');
  }

  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

// Convert TimeRange to Meta API date_preset or time_range
function getTimeRangeParams(timeRange: TimeRange): Record<string, string> {
  const presetMap: Record<string, string> = {
    today: 'today',
    yesterday: 'yesterday',
    last_7d: 'last_7d',
    last_14d: 'last_14d',
    last_30d: 'last_30d',
    this_month: 'this_month',
    last_month: 'last_month',
    maximum: 'maximum',
  };

  return { date_preset: presetMap[timeRange] || 'maximum' };
}

// ============ API Functions ============

export async function getAccountInfo(): Promise<MetaAccount> {
  const accountId = getAccountId();
  const data = await metaFetch<MetaAccount>(`/${accountId}`, {
    fields: 'id,name,account_id,account_status,currency,amount_spent,balance,business_city,business_country_code',
  });
  return data;
}

export async function getCampaigns(limit = 25): Promise<MetaCampaign[]> {
  const accountId = getAccountId();
  const data = await metaFetch<{ data: MetaCampaign[] }>(`/${accountId}/campaigns`, {
    fields: 'id,name,objective,status,buying_type,start_time,created_time,updated_time,daily_budget,lifetime_budget',
    limit: String(limit),
  });
  return data.data || [];
}

export async function getAdSets(campaignId?: string, limit = 25): Promise<MetaAdSet[]> {
  const accountId = getAccountId();
  const endpoint = campaignId
    ? `/${campaignId}/adsets`
    : `/${accountId}/adsets`;

  const data = await metaFetch<{ data: MetaAdSet[] }>(endpoint, {
    fields: 'id,name,campaign_id,status,daily_budget,lifetime_budget,optimization_goal,billing_event,start_time,end_time,created_time,updated_time',
    limit: String(limit),
  });
  return data.data || [];
}

export async function getAds(adsetId?: string, limit = 25): Promise<MetaAd[]> {
  const accountId = getAccountId();
  const endpoint = adsetId
    ? `/${adsetId}/ads`
    : `/${accountId}/ads`;

  const data = await metaFetch<{ data: MetaAd[] }>(endpoint, {
    fields: 'id,name,adset_id,campaign_id,status,creative{id,name},created_time,updated_time',
    limit: String(limit),
  });
  return data.data || [];
}

export async function getInsights(
  objectId: string,
  timeRange: TimeRange = 'maximum',
  level: 'account' | 'campaign' | 'adset' | 'ad' = 'account'
): Promise<MetaInsights | null> {
  const timeParams = getTimeRangeParams(timeRange);

  try {
    const data = await metaFetch<{ data: MetaInsights[] }>(`/${objectId}/insights`, {
      fields: 'spend,impressions,clicks,ctr,cpc,cpm,reach,frequency,actions,cost_per_action_type,date_start,date_stop',
      level,
      ...timeParams,
    });
    return data.data?.[0] || null;
  } catch (error) {
    console.error(`[Meta Insights Error] for ${objectId}:`, error);
    return null;
  }
}

export async function getDailyInsights(
  objectId: string,
  timeRange: TimeRange = 'last_30d'
): Promise<DailyDataPoint[]> {
  const timeParams = getTimeRangeParams(timeRange);

  try {
    const data = await metaFetch<{ data: Array<MetaInsights & { date_start: string }> }>(
      `/${objectId}/insights`,
      {
        fields: 'spend,impressions,clicks,reach,ctr,date_start',
        time_increment: '1',
        ...timeParams,
      }
    );

    return (data.data || []).map((day) => ({
      date: day.date_start,
      spend: parseFloat(day.spend || '0'),
      impressions: parseInt(day.impressions || '0', 10),
      clicks: parseInt(day.clicks || '0', 10),
      reach: parseInt(day.reach || '0', 10),
      ctr: parseFloat(day.ctr || '0'),
    }));
  } catch (error) {
    console.error(`[Meta Daily Insights Error] for ${objectId}:`, error);
    return [];
  }
}

export function parseConversions(insights: MetaInsights | null): ConversionRow[] {
  if (!insights?.actions) return [];

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
  };

  const costMap = new Map<string, number>();
  insights.cost_per_action_type?.forEach((action) => {
    costMap.set(action.action_type, parseFloat(action.value));
  });

  return insights.actions
    .filter((action) => actionLabels[action.action_type] || action.action_type.includes('Llamada') || action.action_type.includes('Whatsapp'))
    .map((action) => ({
      action_type: action.action_type,
      label: actionLabels[action.action_type] || action.action_type.replace(/_/g, ' '),
      count: parseInt(action.value, 10),
      cost_per: costMap.get(action.action_type),
    }))
    .sort((a, b) => b.count - a.count);
}

// ============ Formatting Helpers ============

export function formatCurrency(value: string | number, currency = 'USD'): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(num);
}

export function formatNumber(value: string | number): string {
  const num = typeof value === 'string' ? parseInt(value, 10) : value;
  return new Intl.NumberFormat('es-MX').format(num);
}

export function formatPercentage(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return `${num.toFixed(2)}%`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-100 text-green-800';
    case 'PAUSED':
      return 'bg-yellow-100 text-yellow-800';
    case 'DELETED':
    case 'ARCHIVED':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'ACTIVE':
      return 'Activo';
    case 'PAUSED':
      return 'Pausado';
    case 'DELETED':
      return 'Eliminado';
    case 'ARCHIVED':
      return 'Archivado';
    default:
      return status;
  }
}
