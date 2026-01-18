import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { type ScheduledPost } from '@/lib/social-publisher';

export const dynamic = 'force-dynamic';

function getSupabase() {
  return createClient(
    process.env.SUPABASE_SOCIAL_URL!,
    process.env.SUPABASE_SOCIAL_SERVICE_KEY!
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Skip auth in development
    const isDev = process.env.NODE_ENV === 'development';
    if (!isDev) {
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (body.password !== adminPassword) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const {
      platforms,
      caption,
      hashtags,
      mediaUrls,
      funnel,
      contentTheme,
      imageSource,
      scheduledFor,
    } = body;

    // Validate required fields
    if (!platforms || platforms.length === 0) {
      return NextResponse.json({ error: 'At least one platform is required' }, { status: 400 });
    }

    if (!caption || caption.trim().length === 0) {
      return NextResponse.json({ error: 'Caption is required' }, { status: 400 });
    }

    // Create post (compliance validation handled manually for now)
    const post: Partial<ScheduledPost> = {
      platforms,
      content_type: 'image',
      caption: caption.trim(),
      hashtags: hashtags || [],
      media_urls: mediaUrls || [],
      funnel: funnel || 'general',
      content_theme: contentTheme,
      image_source: imageSource || 'ai_generated',
      compliance_status: 'pending',
      approval_status: 'pending',
      publish_status: 'draft',
      scheduled_for: scheduledFor ? new Date(scheduledFor).toISOString() : null,
      created_by: 'admin',
    };

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('scheduled_posts')
      .insert(post)
      .select()
      .single();

    if (error) {
      console.error('[Create Post API Error]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      post: data,
    });
  } catch (error) {
    console.error('[Create Post API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create post' },
      { status: 500 }
    );
  }
}
