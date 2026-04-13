import { NextResponse } from 'next/server';
import { requireAdminPassword, handleMetaError } from '@/lib/admin-auth';
import { getAccountSummary } from '@/lib/meta-ads';
import type { TimeRange } from '@/lib/meta-ads-types';

export async function GET(request: Request) {
  const auth = requireAdminPassword(request);
  if (!auth.ok) return auth.response;

  try {
    const { searchParams } = new URL(request.url);
    const timeRange = (searchParams.get('timeRange') as TimeRange) || 'last_30d';
    const data = await getAccountSummary(timeRange);
    return NextResponse.json(data);
  } catch (err) {
    return handleMetaError(err);
  }
}
