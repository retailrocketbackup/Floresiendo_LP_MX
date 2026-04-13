import { NextResponse } from 'next/server';
import { requireAdminPassword, handleMetaError } from '@/lib/admin-auth';
import { getCampaignsWithInsights } from '@/lib/meta-ads';
import type { TimeRange } from '@/lib/meta-ads-types';

export async function GET(request: Request) {
  const auth = requireAdminPassword(request);
  if (!auth.ok) return auth.response;

  try {
    const { searchParams } = new URL(request.url);
    const timeRange = (searchParams.get('timeRange') as TimeRange) || 'last_30d';
    const withInsights = searchParams.get('withInsights') === '1';
    const campaigns = await getCampaignsWithInsights(timeRange, { withInsights });
    return NextResponse.json({ campaigns });
  } catch (err) {
    return handleMetaError(err);
  }
}
