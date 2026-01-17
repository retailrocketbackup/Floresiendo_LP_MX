// app/api/admin/meta-ads/route.ts
// Main Meta Ads overview endpoint

import { NextResponse } from 'next/server';
import {
  getAccountInfo,
  getAccountId,
  getCampaigns,
  getInsights,
  formatCurrency,
  formatNumber,
  formatPercentage,
} from '@/lib/meta-ads';
import type { MetaAdsOverviewResponse, TimeRange } from '@/lib/meta-ads-types';

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
    const insights = await getInsights(accountId, timeRange, 'account');

    const response: MetaAdsOverviewResponse = {
      account,
      campaigns,
      summary: {
        spend: insights?.spend || '0',
        impressions: insights?.impressions || '0',
        clicks: insights?.clicks || '0',
        ctr: insights?.ctr || '0',
        cpc: insights?.cpc || '0',
        reach: insights?.reach || '0',
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
