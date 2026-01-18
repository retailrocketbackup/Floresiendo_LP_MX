import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_SOCIAL_URL!,
  process.env.SUPABASE_SOCIAL_SERVICE_KEY!
);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Skip auth in development
    const isDev = process.env.NODE_ENV === 'development';
    if (!isDev) {
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (body.password !== adminPassword) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const { reason } = body;

    if (!reason || reason.trim().length === 0) {
      return NextResponse.json({ error: 'Rejection reason is required' }, { status: 400 });
    }

    // Update post to rejected
    const { data, error } = await supabase
      .from('scheduled_posts')
      .update({
        approval_status: 'rejected',
        rejection_reason: reason.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[Reject Post API Error]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log audit trail
    await supabase.from('audit_log').insert({
      entity_type: 'scheduled_post',
      entity_id: id,
      action: 'reject',
      performed_by: 'admin',
      details: { reason },
    });

    return NextResponse.json({
      success: true,
      post: data,
    });
  } catch (error) {
    console.error('[Reject Post API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to reject post' },
      { status: 500 }
    );
  }
}
