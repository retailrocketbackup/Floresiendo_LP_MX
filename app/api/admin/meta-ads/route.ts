// app/api/admin/meta-ads/route.ts
// Main Meta Ads overview endpoint with full hierarchy (Campaign → Ad Sets → Ads)

import { NextResponse } from 'next/server';
import {
  getAccountInfo,
  getAccountId,
  getCampaigns,
  getAdSets,
  getAds,
  getInsights,
} from '@/lib/meta-ads';
import type {
  MetaAdsOverviewResponse,
  TimeRange,
  CampaignWithInsights,
  AdSetWithInsights,
  AdWithInsights,
} from '@/lib/meta-ads-types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Skip auth in development
    const isDev = process.env.NODE_ENV === 'development';
    if (!isDev) {
      const adminPassword = process.env.ADMIN_PASSWORD;
      const authHeader = request.headers.get('x-admin-password');
      const queryPassword = searchParams.get('password');

      if (!adminPassword) {
        return NextResponse.json({ error: 'Admin not configured' }, { status: 500 });
      }

      if (authHeader !== adminPassword && queryPassword !== adminPassword) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const timeRange = (searchParams.get('timeRange') as TimeRange) || 'maximum';

    // Fetch account info and campaigns in parallel
    const [account, campaigns] = await Promise.all([
      getAccountInfo(),
      getCampaigns(),
    ]);

    // Fetch account-level insights
    const accountId = getAccountId();
    const accountInsights = await getInsights(accountId, timeRange, 'account');

    // Fetch ad sets and ads for all campaigns in parallel
    const [allAdSets, allAds] = await Promise.all([
      getAdSets(undefined, 100), // Get all ad sets for the account
      getAds(undefined, 100),    // Get all ads for the account
    ]);

    // Fetch insights for campaigns, ad sets, and ads in parallel
    const campaignInsightsPromises = campaigns.map((c) =>
      getInsights(c.id, timeRange, 'campaign')
    );
    const adSetInsightsPromises = allAdSets.map((a) =>
      getInsights(a.id, timeRange, 'adset')
    );
    const adInsightsPromises = allAds.map((a) =>
      getInsights(a.id, timeRange, 'ad')
    );

    const [campaignInsights, adSetInsights, adInsights] = await Promise.all([
      Promise.all(campaignInsightsPromises),
      Promise.all(adSetInsightsPromises),
      Promise.all(adInsightsPromises),
    ]);

    // Build ads with insights map (by ad set id)
    const adsWithInsights: AdWithInsights[] = allAds.map((ad, index) => ({
      ...ad,
      insights: adInsights[index] || undefined,
    }));

    // Group ads by ad set id
    const adsByAdSetId = new Map<string, AdWithInsights[]>();
    adsWithInsights.forEach((ad) => {
      const existing = adsByAdSetId.get(ad.adset_id) || [];
      existing.push(ad);
      adsByAdSetId.set(ad.adset_id, existing);
    });

    // Build ad sets with insights and their ads
    const adSetsWithInsights: AdSetWithInsights[] = allAdSets.map((adset, index) => ({
      ...adset,
      insights: adSetInsights[index] || undefined,
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
    const campaignsWithInsights: CampaignWithInsights[] = campaigns.map((campaign, index) => ({
      ...campaign,
      insights: campaignInsights[index] || undefined,
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
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch Meta Ads data' },
      { status: 500 }
    );
  }
}
