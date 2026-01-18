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

    const { scheduledFor } = body;

    // Update post to approved
    const updateData: Record<string, unknown> = {
      approval_status: 'approved',
      approved_by: 'admin',
      approved_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // If scheduled for a specific time, update publish status
    if (scheduledFor) {
      updateData.scheduled_for = new Date(scheduledFor).toISOString();
      updateData.publish_status = 'scheduled';
    }

    const { data, error } = await supabase
      .from('scheduled_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[Approve Post API Error]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log audit trail
    await supabase.from('audit_log').insert({
      entity_type: 'scheduled_post',
      entity_id: id,
      action: 'approve',
      performed_by: 'admin',
      details: { scheduledFor },
    });

    return NextResponse.json({
      success: true,
      post: data,
    });
  } catch (error) {
    console.error('[Approve Post API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to approve post' },
      { status: 500 }
    );
  }
}
