// app/api/admin/update-status/route.ts
import { NextResponse } from 'next/server';
import { updateScreeningStatus } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { applicationId, status } = await request.json();

    if (!applicationId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (status !== 'approved' && status !== 'rejected') {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const { success, error } = await updateScreeningStatus(
      applicationId,
      status,
      'admin' // In a real app, use actual user identity
    );

    if (!success) {
      return NextResponse.json({ error }, { status: 500 });
    }

    // Log audit trail
    console.log(`[Audit] Application ${applicationId} ${status} at ${new Date().toISOString()}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Admin Update Status] Error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
