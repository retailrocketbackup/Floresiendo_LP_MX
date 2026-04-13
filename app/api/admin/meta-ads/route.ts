// app/api/admin/meta-ads/route.ts
// Main Meta Ads overview endpoint with full hierarchy (Campaign → Ad Sets → Ads)

import { NextResponse } from 'next/server';
import { requireAdminPassword } from '@/lib/admin-auth';
import {
  getAccountInfo,
  getAccountId,
  getCampaigns,
  getAdSets,
  getAds,
  getInsights,
  getAllInsights,
  clearCache,
} from '@/lib/meta-ads';
import type {
  MetaAdsOverviewResponse,
  MetaInsights,
  TimeRange,
  CampaignWithInsights,
  AdSetWithInsights,
  AdWithInsights,
} from '@/lib/meta-ads-types';

export async function GET(request: Request) {
  const auth = requireAdminPassword(request);
  if (!auth.ok) return auth.response;

  try {
    const { searchParams } = new URL(request.url);
    const timeRange = (searchParams.get('timeRange') as TimeRange) || 'maximum';
    const includeArchived = searchParams.get('includeArchived') === 'true';
    const bustCache = searchParams.get('bustCache') === 'true';

    // Clear cache if requested
    if (bustCache) {
      clearCache();
      console.log('[Meta Ads API] Cache cleared');
    }

    // Fetch account info and campaigns in parallel
    const [account, allCampaigns] = await Promise.all([
      getAccountInfo(),
      getCampaigns(),
    ]);

    // Filter out DELETED and ARCHIVED campaigns by default
    // This ensures visible campaigns better match account-level insights
    const campaigns = includeArchived
      ? allCampaigns
      : allCampaigns.filter(c => c.status !== 'DELETED' && c.status !== 'ARCHIVED');

    const accountId = getAccountId();

    // Fetch ad sets, ads, and ALL insights (per level, single call each) in parallel.
    // Replaces the old N+M+K /insights fan-out that blew Meta's rate limit.
    const [
      allAdSets,
      allAds,
      accountInsights,
      campaignInsightsList,
      adSetInsightsList,
      adInsightsList,
    ] = await Promise.all([
      getAdSets(undefined, 100),
      getAds(undefined, 100),
      getInsights(accountId, timeRange, 'account'),
      getAllInsights(timeRange, 'campaign'),
      getAllInsights(timeRange, 'adset'),
      getAllInsights(timeRange, 'ad'),
    ]);

    // Index insights by entity id for O(1) attach
    const campaignInsightsById = new Map<string, MetaInsights>();
    for (const row of campaignInsightsList) {
      if (row.campaign_id) campaignInsightsById.set(row.campaign_id, row);
    }
    const adSetInsightsById = new Map<string, MetaInsights>();
    for (const row of adSetInsightsList) {
      if (row.adset_id) adSetInsightsById.set(row.adset_id, row);
    }
    const adInsightsById = new Map<string, MetaInsights>();
    for (const row of adInsightsList) {
      if (row.ad_id) adInsightsById.set(row.ad_id, row);
    }

    // Build ads with insights map (by ad set id)
    const adsWithInsights: AdWithInsights[] = allAds.map((ad) => ({
      ...ad,
      insights: adInsightsById.get(ad.id) || undefined,
    }));

    // Group ads by ad set id
    const adsByAdSetId = new Map<string, AdWithInsights[]>();
    adsWithInsights.forEach((ad) => {
      const existing = adsByAdSetId.get(ad.adset_id) || [];
      existing.push(ad);
      adsByAdSetId.set(ad.adset_id, existing);
    });

    // Build ad sets with insights and their ads
    const adSetsWithInsights: AdSetWithInsights[] = allAdSets.map((adset) => ({
      ...adset,
      insights: adSetInsightsById.get(adset.id) || undefined,
      ads: adsByAdSetId.get(adset.id) || [],
    }));

    // Group ad sets by campaign id
    const adSetsByCampaignId = new Map<string, AdSetWithInsights[]>();
    adSetsWithInsights.forEach((adset) => {
      const existing = adSetsByCampaignId.get(adset.campaign_id) || [];
      existing.push(adset);
      adSetsByCampaignId.set(adset.campaign_id, existing);
    });

    // Build campaigns with insights and their ad sets
    const campaignsWithInsights: CampaignWithInsights[] = campaigns.map((campaign) => ({
      ...campaign,
      insights: campaignInsightsById.get(campaign.id) || undefined,
      adsets: adSetsByCampaignId.get(campaign.id) || [],
    }));

    const response: MetaAdsOverviewResponse = {
      account,
      campaigns: campaignsWithInsights,
      summary: {
        spend: accountInsights?.spend || '0',
        impressions: accountInsights?.impressions || '0',
        clicks: accountInsights?.clicks || '0',
        ctr: accountInsights?.ctr || '0',
        cpc: accountInsights?.cpc || '0',
        reach: accountInsights?.reach || '0',
      },
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[Meta Ads API Error]', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch Meta Ads data';

    // Check for rate limit error
    if (errorMessage.includes('request limit') || errorMessage.includes('limit reached')) {
      return NextResponse.json(
        { error: 'Límite de API alcanzado. Espera 2-3 minutos y recarga la página.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
