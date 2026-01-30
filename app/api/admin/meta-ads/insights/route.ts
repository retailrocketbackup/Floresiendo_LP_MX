// app/api/admin/meta-ads/insights/route.ts
// Detailed insights endpoint with time series data

import { NextResponse } from 'next/server';
import {
  getAccountId,
  getInsights,
  getDailyInsights,
  parseConversions,
} from '@/lib/meta-ads';
import type { MetaAdsInsightsResponse, TimeRange, DailyDataPoint } from '@/lib/meta-ads-types';

// Helper to aggregate daily data from multiple campaigns
function aggregateDailyData(allData: DailyDataPoint[][]): DailyDataPoint[] {
  const byDate = new Map<string, DailyDataPoint>();

  for (const campaignData of allData) {
    for (const day of campaignData) {
      const existing = byDate.get(day.date);
      if (existing) {
        existing.spend += day.spend;
        existing.impressions += day.impressions;
        existing.clicks += day.clicks;
        // Reach cannot be summed (unique users would be double-counted)
        // We keep the first reach value as a rough approximation
      } else {
        byDate.set(day.date, { ...day });
      }
    }
  }

  // Recalculate CTR for aggregated data
  return Array.from(byDate.values())
    .map(d => ({
      ...d,
      ctr: d.impressions > 0 ? (d.clicks / d.impressions) * 100 : 0,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

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

    const timeRange = (searchParams.get('timeRange') as TimeRange) || 'last_30d';
    const objectId = searchParams.get('objectId') || getAccountId();
    const level = (searchParams.get('level') as 'account' | 'campaign' | 'adset' | 'ad') || 'account';

    // Parse campaignIds for filtered daily data
    const campaignIds = searchParams.get('campaignIds')?.split(',').filter(Boolean) || [];

    // Fetch insights (always account-level for summary)
    const insights = await getInsights(objectId, timeRange, level);

    // Fetch daily breakdown - either per-campaign or account-level
    let dailyBreakdown: DailyDataPoint[];

    if (campaignIds.length > 0) {
      // Fetch daily insights for each selected campaign and aggregate
      const allDailyData = await Promise.all(
        campaignIds.map(id => getDailyInsights(id, timeRange))
      );
      dailyBreakdown = aggregateDailyData(allDailyData);
    } else {
      // Default: account-level daily breakdown
      dailyBreakdown = await getDailyInsights(objectId, timeRange);
    }

    if (!insights) {
      return NextResponse.json({
        insights: null,
        dailyBreakdown: [],
        conversions: [],
        timeRange,
        message: 'No data available for the selected time range',
      });
    }

    const conversions = parseConversions(insights);

    const response: MetaAdsInsightsResponse = {
      insights,
      dailyBreakdown,
      conversions,
      timeRange,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[Meta Ads Insights API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch insights' },
      { status: 500 }
    );
  }
}
