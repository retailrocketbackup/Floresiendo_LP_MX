// app/api/admin/applications/route.ts
import { NextResponse } from 'next/server';
import { getScreeningApplications } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'pending' | 'approved' | 'rejected' | null;
    const riskLevel = searchParams.get('riskLevel') as 'green' | 'yellow' | 'red' | null;

    const { data, error } = await getScreeningApplications({
      status: status || undefined,
      riskLevel: riskLevel || undefined,
      limit: 100,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    // Return only non-sensitive fields for the list view
    const applications = data?.map((app) => ({
      id: app.id,
      application_id: app.application_id,
      full_name: app.full_name,
      risk_level: app.risk_level,
      screening_status: app.screening_status,
      created_at: app.created_at,
      reviewed_by: app.reviewed_by,
      reviewed_at: app.reviewed_at,
    }));

    return NextResponse.json({ applications });
  } catch (error) {
    console.error('[Admin Applications] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
