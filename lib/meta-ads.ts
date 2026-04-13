// Meta Ads API Client for Floresiendo Dashboard
// Server-side only - never import in client components

import { revalidateTag } from 'next/cache';
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

// Cache TTL for Next.js Data Cache (persists across serverless invocations)
const CACHE_TTL_SECONDS = 5 * 60; // 5 minutes
const CACHE_TAG = 'meta-ads';

// Invalidate all cached Meta Ads fetches via Next.js Data Cache.
export function clearCache(): void {
  revalidateTag(CACHE_TAG);
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

// Generic Meta API fetch wrapper. Relies on Next.js Data Cache (tag-based),
// which persists across serverless invocations unlike an in-process Map.
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

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: CACHE_TTL_SECONDS, tags: [CACHE_TAG] },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.error('[Meta API Error]', error);
    const code = error?.error?.code;
    const subcode = error?.error?.error_subcode;
    const message = error?.error?.message || 'Meta API request failed';
    // Codes 4 (app rate limit), 17 (user request limit), 32 (page rate limit),
    // 613 (ads insights throttle). Normalize so the route handler maps to 429.
    if (code === 4 || code === 17 || code === 32 || code === 613 || subcode === 2446079) {
      throw new Error(`Meta API request limit reached: ${message}`);
    }
    throw new Error(message);
  }

  return response.json();
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

export async function getCampaigns(limit = 100): Promise<MetaCampaign[]> {
  const accountId = getAccountId();
  const data = await metaFetch<{ data: MetaCampaign[] }>(`/${accountId}/campaigns`, {
    fields: 'id,name,objective,status,buying_type,start_time,created_time,updated_time,daily_budget,lifetime_budget',
    limit: String(limit),
  });
  return data.data || [];
}

export async function getAdSets(campaignId?: string, limit = 100): Promise<MetaAdSet[]> {
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

export async function getAds(adsetId?: string, limit = 100): Promise<MetaAd[]> {
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

// Fetch insights for EVERY entity at a given level in a single account-scoped
// /insights call. Replaces N+M+K per-entity fan-out. Each response row carries
// campaign_id / adset_id / ad_id so the caller can build lookup maps.
export async function getAllInsights(
  timeRange: TimeRange,
  level: 'campaign' | 'adset' | 'ad'
): Promise<MetaInsights[]> {
  const accountId = getAccountId();
  const timeParams = getTimeRangeParams(timeRange);

  const results: MetaInsights[] = [];
  let endpoint: string | null = `/${accountId}/insights`;
  let params: Record<string, string> | null = {
    fields:
      'spend,impressions,clicks,ctr,cpc,cpm,reach,frequency,actions,conversions,cost_per_action_type,date_start,date_stop,campaign_id,adset_id,ad_id',
    level,
    limit: '500',
    ...timeParams,
  };

  try {
    while (endpoint) {
      const data: { data: MetaInsights[]; paging?: { next?: string } } =
        await metaFetch(endpoint, params || {});
      results.push(...(data.data || []));

      // Follow cursor-based pagination if present
      const nextUrl = data.paging?.next;
      if (nextUrl) {
        const parsed = new URL(nextUrl);
        endpoint = parsed.pathname.replace(/^\/v\d+\.\d+/, '');
        params = null;
        // Preserve the querystring exactly as Meta returned it
        const nextParams: Record<string, string> = {};
        parsed.searchParams.forEach((v, k) => {
          if (k !== 'access_token') nextParams[k] = v;
        });
        params = nextParams;
      } else {
        endpoint = null;
      }
    }
  } catch (error) {
    console.error(`[Meta getAllInsights Error] level=${level}:`, error);
    throw error;
  }

  return results;
}

export async function getInsights(
  objectId: string,
  timeRange: TimeRange = 'maximum',
  level: 'account' | 'campaign' | 'adset' | 'ad' = 'account'
): Promise<MetaInsights | null> {
  const timeParams = getTimeRangeParams(timeRange);

  try {
    const data = await metaFetch<{ data: MetaInsights[] }>(`/${objectId}/insights`, {
      fields: 'spend,impressions,clicks,ctr,cpc,cpm,reach,frequency,actions,conversions,cost_per_action_type,date_start,date_stop',
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
  if (!insights) return [];

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
    // Floresiendo TOFU-B Lead Magnet events (full Meta API format)
    'offsite_conversion.fb_pixel_custom.Lead_Meditacion_Gratis': 'Leads Meditación',
    'offsite_conversion.fb_pixel_custom.Lead_Conferencia_Gratis': 'Leads Conferencia',
    'offsite_conversion.fb_pixel_custom.CompleteRegistration_Meditacion': 'Registros Meditación',
    'offsite_conversion.fb_pixel_custom.CompleteRegistration_Conferencia': 'Registros Conferencia',
    // Floresiendo TOFU-A Pain Funnel events
    'offsite_conversion.fb_pixel_custom.Lead_Estres': 'Leads Estrés',
    'offsite_conversion.fb_pixel_custom.Lead_Duelo': 'Leads Duelo',
    'offsite_conversion.fb_pixel_custom.Lead_Proposito': 'Leads Propósito',
    'offsite_conversion.fb_pixel_custom.ViewContent_Estres': 'Vista Estrés',
    'offsite_conversion.fb_pixel_custom.ViewContent_Duelo': 'Vista Duelo',
    'offsite_conversion.fb_pixel_custom.ViewContent_Proposito': 'Vista Propósito',
  };

  // Helper to extract event name from Meta's full format
  // e.g. "offsite_conversion.fb_pixel_custom.Lead_Meditacion_Gratis" -> "Lead_Meditacion_Gratis"
  const extractEventName = (type: string) => {
    if (type.startsWith('offsite_conversion.fb_pixel_custom.')) {
      return type.replace('offsite_conversion.fb_pixel_custom.', '');
    }
    return type;
  };

  // Helper to check if action should be included
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

  // Helper to create a readable label
  const getLabel = (type: string) => {
    if (actionLabels[type]) return actionLabels[type];
    const eventName = extractEventName(type);
    return eventName.replace(/_/g, ' ');
  };

  const costMap = new Map<string, number>();
  insights.cost_per_action_type?.forEach((action) => {
    costMap.set(action.action_type, parseFloat(action.value));
  });

  // Combine both actions and conversions arrays
  // Meta returns custom pixel events in the 'conversions' array with full event names
  const allActions = [
    ...(insights.actions || []),
    ...(insights.conversions || []),
  ];

  // Dedupe by action_type (prefer conversions array as it has more specific event names)
  const actionMap = new Map<string, { action_type: string; value: string }>();
  for (const action of allActions) {
    // Skip the aggregated "offsite_conversion.fb_pixel_custom" entry (no specific event name)
    if (action.action_type === 'offsite_conversion.fb_pixel_custom') continue;
    actionMap.set(action.action_type, action);
  }

  return Array.from(actionMap.values())
    .filter((action) => actionLabels[action.action_type] || isFloresiendo(action.action_type))
    .map((action) => ({
      action_type: action.action_type,
      label: getLabel(action.action_type),
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
