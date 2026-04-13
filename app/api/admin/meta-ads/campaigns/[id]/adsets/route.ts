import { NextResponse } from 'next/server';
import { requireAdminPassword, handleMetaError } from '@/lib/admin-auth';
import { getCampaignAdSets } from '@/lib/meta-ads';
import type { TimeRange } from '@/lib/meta-ads-types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = requireAdminPassword(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Missing campaign id' }, { status: 400 });
    }
    const { searchParams } = new URL(request.url);
    const timeRange = (searchParams.get('timeRange') as TimeRange) || 'last_30d';
    const adsets = await getCampaignAdSets(id, timeRange);
    return NextResponse.json({ adsets });
  } catch (err) {
    return handleMetaError(err);
  }
}
