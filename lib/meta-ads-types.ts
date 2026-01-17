// Meta Ads API Types for Floresiendo Dashboard

// ============ API Response Types ============

export interface MetaAccount {
  id: string;
  name: string;
  account_id: string;
  account_status: number;
  currency: string;
  amount_spent: string;
  balance: string;
  business_city?: string;
  business_country_code?: string;
}

export interface MetaCampaign {
  id: string;
  name: string;
  objective: string;
  status: 'ACTIVE' | 'PAUSED' | 'DELETED' | 'ARCHIVED';
  buying_type: string;
  start_time?: string;
  created_time: string;
  updated_time: string;
  daily_budget?: string;
  lifetime_budget?: string;
}

export interface MetaAdSet {
  id: string;
  name: string;
  campaign_id: string;
  status: 'ACTIVE' | 'PAUSED' | 'DELETED' | 'ARCHIVED';
  daily_budget?: string;
  lifetime_budget?: string;
  optimization_goal?: string;
  billing_event?: string;
  targeting?: Record<string, unknown>;
  start_time?: string;
  end_time?: string;
  created_time: string;
  updated_time: string;
}

export interface MetaAd {
  id: string;
  name: string;
  adset_id: string;
  campaign_id: string;
  status: 'ACTIVE' | 'PAUSED' | 'DELETED' | 'ARCHIVED';
  creative?: {
    id: string;
    name?: string;
  };
  created_time: string;
  updated_time: string;
}

export interface MetaAction {
  action_type: string;
  value: string;
}

export interface MetaInsights {
  spend: string;
  impressions: string;
  clicks: string;
  ctr: string;
  cpc: string;
  cpm: string;
  reach: string;
  frequency?: string;
  actions?: MetaAction[];
  cost_per_action_type?: MetaAction[];
  date_start: string;
  date_stop: string;
}

// ============ Dashboard Display Types ============

export type TimeRange =
  | 'today'
  | 'yesterday'
  | 'last_7d'
  | 'last_14d'
  | 'last_30d'
  | 'this_month'
  | 'last_month'
  | 'maximum';

export interface KPI {
  id: string;
  label: string;
  value: string;
  rawValue: number;
  color: 'coral' | 'gold' | 'green' | 'blue' | 'purple' | 'teal';
  format: 'currency' | 'number' | 'percentage';
}

export interface DailyDataPoint {
  date: string;
  spend: number;
  impressions: number;
  clicks: number;
  reach: number;
  ctr: number;
}

export interface ConversionRow {
  action_type: string;
  label: string;
  count: number;
  cost_per?: number;
}

// ============ API Response Wrappers ============

export interface MetaAdsOverviewResponse {
  account: MetaAccount;
  campaigns: MetaCampaign[];
  summary: {
    spend: string;
    impressions: string;
    clicks: string;
    ctr: string;
    cpc: string;
    reach: string;
  };
  lastUpdated: string;
}

export interface MetaAdsInsightsResponse {
  insights: MetaInsights;
  dailyBreakdown?: DailyDataPoint[];
  conversions?: ConversionRow[];
  timeRange: TimeRange;
}

export interface CampaignWithInsights extends MetaCampaign {
  insights?: MetaInsights;
  adsets?: AdSetWithInsights[];
}

export interface AdSetWithInsights extends MetaAdSet {
  insights?: MetaInsights;
  ads?: AdWithInsights[];
}

export interface AdWithInsights extends MetaAd {
  insights?: MetaInsights;
}

// ============ Component Props ============

export interface KPICardProps {
  label: string;
  value: string;
  color?: 'coral' | 'gold' | 'green' | 'blue' | 'purple' | 'teal';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}

export interface CampaignListProps {
  campaigns: CampaignWithInsights[];
  loading?: boolean;
  onCampaignClick?: (campaignId: string) => void;
}

export interface PerformanceChartProps {
  data: DailyDataPoint[];
  metric: 'spend' | 'impressions' | 'clicks' | 'reach';
  loading?: boolean;
}
