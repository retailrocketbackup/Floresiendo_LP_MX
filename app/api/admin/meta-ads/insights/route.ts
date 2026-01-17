// app/api/admin/meta-ads/insights/route.ts
// Detailed insights endpoint with time series data

import { NextResponse } from 'next/server';
import {
  getAccountId,
  getInsights,
  getDailyInsights,
  parseConversions,
} from '@/lib/meta-ads';
import type { MetaAdsInsightsResponse, TimeRange } from '@/lib/meta-ads-types';

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

    // Fetch insights and daily breakdown in parallel
    const [insights, dailyBreakdown] = await Promise.all([
      getInsights(objectId, timeRange, level),
      getDailyInsights(objectId, timeRange),
    ]);

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
