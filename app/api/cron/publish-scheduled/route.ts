import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { publishToFacebook, publishToInstagram, type ScheduledPost } from '@/lib/social-publisher';

const supabase = createClient(
  process.env.SUPABASE_SOCIAL_URL!,
  process.env.SUPABASE_SOCIAL_SERVICE_KEY!
);

// Verify cron secret to prevent unauthorized access
function verifyCronSecret(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error('[Cron] CRON_SECRET not configured');
    return false;
  }

  return authHeader === `Bearer ${cronSecret}`;
}

export async function GET(request: Request) {
  try {
    // Verify authorization
    if (!verifyCronSecret(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[Cron] Starting scheduled publish check...');

    // Get all scheduled posts that are due
    const now = new Date();
    const { data: posts, error: fetchError } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('publish_status', 'scheduled')
      .eq('approval_status', 'approved')
      .lte('scheduled_for', now.toISOString())
      .order('scheduled_for', { ascending: true });

    if (fetchError) {
      console.error('[Cron] Error fetching posts:', fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!posts || posts.length === 0) {
      console.log('[Cron] No posts scheduled for now');
      return NextResponse.json({ message: 'No posts to publish', published: 0 });
    }

    console.log(`[Cron] Found ${posts.length} posts to publish`);

    const results: Array<{
      id: string;
      success: boolean;
      platforms: Record<string, { success: boolean; postId?: string; error?: string }>;
    }> = [];

    for (const post of posts) {
      console.log(`[Cron] Publishing post ${post.id}...`);

      // Mark as publishing
      await supabase
        .from('scheduled_posts')
        .update({ publish_status: 'publishing' })
        .eq('id', post.id);

      const platformResults: Record<string, { success: boolean; postId?: string; error?: string }> = {};

      // Publish to each platform
      for (const platform of post.platforms as string[]) {
        try {
          if (platform === 'facebook') {
            const result = await publishToFacebook({
              caption: buildFullCaption(post, 'facebook'),
              imageUrl: post.media_urls?.[0],
            });
            platformResults.facebook = {
              success: result.success,
              postId: result.postId,
              error: result.error,
            };
          } else if (platform === 'instagram') {
            const result = await publishToInstagram({
              caption: buildFullCaption(post, 'instagram'),
              imageUrl: post.media_urls?.[0],
            });
            platformResults.instagram = {
              success: result.success,
              postId: result.postId,
              error: result.error,
            };
          }
        } catch (err) {
          console.error(`[Cron] Error publishing to ${platform}:`, err);
          platformResults[platform] = {
            success: false,
            error: err instanceof Error ? err.message : 'Unknown error',
          };
        }
      }

      // Check if all platforms succeeded
      const allSuccess = Object.values(platformResults).every(r => r.success);
      const anySuccess = Object.values(platformResults).some(r => r.success);

      // Update post status
      const updateData: Record<string, unknown> = {
        platform_post_ids: platformResults,
        updated_at: new Date().toISOString(),
      };

      if (allSuccess) {
        updateData.publish_status = 'published';
        updateData.published_at = new Date().toISOString();
      } else if (anySuccess) {
        // Partial success - still mark as published
        updateData.publish_status = 'published';
        updateData.published_at = new Date().toISOString();
        updateData.error_message = 'Partial publish - some platforms failed';
      } else {
        updateData.publish_status = 'failed';
        updateData.error_message = Object.entries(platformResults)
          .map(([platform, result]) => `${platform}: ${result.error}`)
          .join('; ');
      }

      await supabase
        .from('scheduled_posts')
        .update(updateData)
        .eq('id', post.id);

      // Log audit trail
      await supabase.from('audit_log').insert({
        entity_type: 'scheduled_post',
        entity_id: post.id,
        action: 'publish',
        performed_by: 'cron',
        details: platformResults,
      });

      results.push({
        id: post.id,
        success: anySuccess,
        platforms: platformResults,
      });

      console.log(`[Cron] Post ${post.id} published: ${anySuccess ? 'success' : 'failed'}`);
    }

    const successCount = results.filter(r => r.success).length;
    console.log(`[Cron] Finished. Published ${successCount}/${results.length} posts`);

    return NextResponse.json({
      message: `Published ${successCount} of ${results.length} posts`,
      published: successCount,
      failed: results.length - successCount,
      results,
    });
  } catch (error) {
    console.error('[Cron] Unexpected error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Cron job failed' },
      { status: 500 }
    );
  }
}

// Build full caption with hashtags for the platform
function buildFullCaption(post: ScheduledPost, platform: 'facebook' | 'instagram'): string {
  let caption = post.caption;

  // Add hashtags for Instagram
  if (platform === 'instagram' && post.hashtags && post.hashtags.length > 0) {
    const hashtagString = post.hashtags.map(h => `#${h}`).join(' ');
    caption = `${caption}\n\n${hashtagString}`;
  }

  return caption;
}
