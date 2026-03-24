import { NextResponse } from 'next/server';
import { checkCompliance, publishReel } from '@/lib/social-publisher';
import { createClient } from '@supabase/supabase-js';

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

    // Auth check
    const isDev = process.env.NODE_ENV === 'development';
    if (!isDev) {
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (body.password !== adminPassword) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const { videoUrl, caption, platforms = ['facebook', 'instagram'], hashtags = [] } = body;

    if (!videoUrl) {
      return NextResponse.json({ error: 'videoUrl is required' }, { status: 400 });
    }

    if (!caption || caption.trim().length === 0) {
      return NextResponse.json({ error: 'caption is required' }, { status: 400 });
    }

    // Compliance check
    const compliance = checkCompliance(caption);
    if (compliance.status === 'rejected') {
      return NextResponse.json({
        error: 'Caption rejected by compliance',
        blockedTerms: compliance.blockedTerms,
        suggestions: compliance.suggestions
      }, { status: 422 });
    }

    // Build full caption with hashtags for Instagram
    let fullCaption = caption;
    if (hashtags.length > 0) {
      const hashtagString = hashtags.map((h: string) => h.startsWith('#') ? h : `#${h}`).join(' ');
      fullCaption = `${caption}\n\n${hashtagString}`;
    }

    // Publish to platforms
    const result = await publishReel(videoUrl, fullCaption, platforms);

    // Log to audit trail
    const supabase = getSupabase();
    await supabase.from('social_media_audit_log').insert({
      action: result.success ? 'published' : 'failed',
      actor: 'api',
      details: {
        type: 'reel',
        videoUrl,
        platforms,
        result,
        compliance: compliance.status
      }
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Reel published successfully',
        platform_post_ids: result.platform_post_ids
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Reel publishing failed',
        errors: result.errors,
        platform_post_ids: result.platform_post_ids // partial success
      }, { status: 500 });
    }
  } catch (error) {
    console.error('[Publish Reel API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to publish reel' },
      { status: 500 }
    );
  }
}
