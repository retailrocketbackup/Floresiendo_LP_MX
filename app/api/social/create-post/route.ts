import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateCompliance, type ScheduledPost } from '@/lib/social-publisher';

const supabase = createClient(
  process.env.SUPABASE_SOCIAL_URL!,
  process.env.SUPABASE_SOCIAL_SERVICE_KEY!
);

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

    // Run compliance validation
    const complianceResult = validateCompliance(caption);

    // Create post
    const post: Partial<ScheduledPost> = {
      platforms,
      content_type: 'image',
      caption: caption.trim(),
      hashtags: hashtags || [],
      media_urls: mediaUrls || [],
      funnel: funnel || 'general',
      content_theme: contentTheme,
      image_source: imageSource || 'ai_generated',
      compliance_status: complianceResult.status,
      compliance_notes: complianceResult.notes,
      flagged_terms: complianceResult.flaggedTerms,
      approval_status: complianceResult.status === 'rejected' ? 'rejected' : 'pending',
      publish_status: 'draft',
      scheduled_for: scheduledFor ? new Date(scheduledFor).toISOString() : null,
      created_by: 'admin',
    };

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
      compliance: complianceResult,
    });
  } catch (error) {
    console.error('[Create Post API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create post' },
      { status: 500 }
    );
  }
}
