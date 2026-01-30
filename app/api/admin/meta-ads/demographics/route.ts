// app/api/admin/meta-ads/demographics/route.ts
// Demographics breakdown endpoint for age/gender analysis

import { NextResponse } from 'next/server';
import { getAccountId } from '@/lib/meta-ads';
import type { TimeRange } from '@/lib/meta-ads-types';

const META_API_VERSION = 'v21.0';
const META_API_BASE = `https://graph.facebook.com/${META_API_VERSION}`;

interface AgeBreakdownItem {
  age: string;
  spend: string;
  impressions: string;
  clicks: string;
  ctr: string;
  cpc: string;
  reach: string;
  actions?: Array<{ action_type: string; value: string }>;
}

interface DemographicData {
  age: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  reach: number;
  conversions: number;
}

function transformItems(items: AgeBreakdownItem[]): DemographicData[] {
  return items.map((item) => {
    const conversions = item.actions?.reduce((sum, action) => {
      if (
        action.action_type.includes('Llamada') ||
        action.action_type.includes('Whatsapp') ||
        action.action_type.includes('conversion')
      ) {
        return sum + parseInt(action.value, 10);
      }
      return sum;
    }, 0) || 0;

    return {
      age: item.age,
      spend: parseFloat(item.spend || '0'),
      impressions: parseInt(item.impressions || '0', 10),
      clicks: parseInt(item.clicks || '0', 10),
      ctr: parseFloat(item.ctr || '0'),
      cpc: parseFloat(item.cpc || '0'),
      reach: parseInt(item.reach || '0', 10),
      conversions,
    };
  });
}

function aggregateDemographics(allData: DemographicData[][]): DemographicData[] {
  const byAge = new Map<string, DemographicData>();

  for (const campaignData of allData) {
    for (const item of campaignData) {
      const existing = byAge.get(item.age);
      if (existing) {
        existing.spend += item.spend;
        existing.impressions += item.impressions;
        existing.clicks += item.clicks;
        existing.conversions += item.conversions;
        // Reach cannot be summed (unique users) - keeping first value as approximation
      } else {
        byAge.set(item.age, { ...item });
      }
    }
  }

  // Recalculate CTR and CPC based on aggregated values
  return Array.from(byAge.values()).map(d => ({
    ...d,
    ctr: d.impressions > 0 ? (d.clicks / d.impressions) * 100 : 0,
    cpc: d.clicks > 0 ? d.spend / d.clicks : 0,
  }));
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
    const breakdown = searchParams.get('breakdown') || 'age';
    const campaignIds = searchParams.get('campaignIds')?.split(',').filter(Boolean) || [];
    const accountId = getAccountId();
    const accessToken = process.env.META_ADS_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json({ error: 'META_ADS_ACCESS_TOKEN not configured' }, { status: 500 });
    }

    let transformedData: DemographicData[];

    if (campaignIds.length > 0) {
      // Fetch demographics for each campaign and aggregate
      const allDemoData = await Promise.all(
        campaignIds.map(async (campaignId) => {
          const url = new URL(`${META_API_BASE}/${campaignId}/insights`);
          url.searchParams.set('access_token', accessToken);
          url.searchParams.set('fields', 'spend,impressions,clicks,ctr,cpc,reach,actions');
          url.searchParams.set('breakdowns', breakdown);
          url.searchParams.set('date_preset', timeRange);

          const response = await fetch(url.toString());
          if (!response.ok) return [];

          const data = await response.json();
          return transformItems(data.data || []);
        })
      );
      transformedData = aggregateDemographics(allDemoData);
    } else {
      // Default: account-level demographics
      const url = new URL(`${META_API_BASE}/${accountId}/insights`);
      url.searchParams.set('access_token', accessToken);
      url.searchParams.set('fields', 'spend,impressions,clicks,ctr,cpc,reach,actions');
      url.searchParams.set('breakdowns', breakdown);
      url.searchParams.set('date_preset', timeRange);

      const response = await fetch(url.toString());

      if (!response.ok) {
        const error = await response.json();
        console.error('[Meta Demographics API Error]', error);
        return NextResponse.json(
          { error: error.error?.message || 'Failed to fetch demographics' },
          { status: 500 }
        );
      }

      const data = await response.json();

      if (!data.data || data.data.length === 0) {
        return NextResponse.json({
          breakdown,
          data: [],
          timeRange,
          message: 'No demographic data available',
        });
      }

      transformedData = transformItems(data.data);
    }

    return NextResponse.json({
      breakdown,
      data: transformedData,
      timeRange,
    });
  } catch (error) {
    console.error('[Meta Demographics API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch demographics' },
      { status: 500 }
    );
  }
}
