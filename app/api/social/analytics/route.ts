import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const META_API_VERSION = 'v21.0';
const META_API_BASE = `https://graph.facebook.com/${META_API_VERSION}`;

function getSupabase() {
  return createClient(
    process.env.SUPABASE_SOCIAL_URL!,
    process.env.SUPABASE_SOCIAL_SERVICE_KEY!
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Auth check
    const isDev = process.env.NODE_ENV === 'development';
    if (!isDev) {
      const password = searchParams.get('password');
      if (password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const token = process.env.META_ADS_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.json({ error: 'META_ADS_ACCESS_TOKEN not configured' }, { status: 500 });
    }

    // Get published posts from DB
    const supabase = getSupabase();
    const { data: posts, error: dbError } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('publish_status', 'published')
      .order('published_at', { ascending: false })
      .limit(20);

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    if (!posts || posts.length === 0) {
      return NextResponse.json({ posts: [], insights: [] });
    }

    // Fetch insights for each published post
    const insights = [];

    for (const post of posts) {
      const postInsight: Record<string, unknown> = {
        id: post.id,
        caption: post.caption.substring(0, 100),
        media_type: post.media_type || 'image',
        published_at: post.published_at,
        platforms: post.platforms,
        virality_score: post.virality_score,
        insights: {},
      };

      const platformPostIds = post.platform_post_ids || {};

      // Fetch FB insights
      if (platformPostIds.facebook) {
        try {
          const isReel = post.media_type === 'reel';
          const metrics = isReel
            ? 'total_video_views,total_video_avg_time_watched'
            : 'post_impressions,post_engaged_users,post_reactions_by_type_total';

          const fbRes = await fetch(
            `${META_API_BASE}/${platformPostIds.facebook}/insights?metric=${metrics}&access_token=${token}`
          );

          if (fbRes.ok) {
            const fbData = await fbRes.json();
            postInsight.insights = {
              ...(postInsight.insights as Record<string, unknown>),
              facebook: fbData.data,
            };
          }
        } catch {
          // Skip failed insight fetches
        }
      }

      // Fetch IG insights
      if (platformPostIds.instagram) {
        try {
          const isReel = post.media_type === 'reel';
          const metrics = isReel
            ? 'plays,reach,saved,shares,total_interactions'
            : 'impressions,reach,saved,total_interactions';

          const igRes = await fetch(
            `${META_API_BASE}/${platformPostIds.instagram}/insights?metric=${metrics}&access_token=${token}`
          );

          if (igRes.ok) {
            const igData = await igRes.json();
            postInsight.insights = {
              ...(postInsight.insights as Record<string, unknown>),
              instagram: igData.data,
            };
          }
        } catch {
          // Skip failed insight fetches
        }
      }

      insights.push(postInsight);
    }

    // Summary stats
    const totalPosts = posts.length;
    const totalReels = posts.filter(p => p.media_type === 'reel').length;
    const totalImages = totalPosts - totalReels;
    const avgViralityScore = posts
      .filter(p => p.virality_score != null)
      .reduce((sum, p) => sum + (p.virality_score || 0), 0) /
      (posts.filter(p => p.virality_score != null).length || 1);

    return NextResponse.json({
      summary: {
        totalPosts,
        totalReels,
        totalImages,
        avgViralityScore: Math.round(avgViralityScore),
      },
      insights,
    });
  } catch (error) {
    console.error('[Analytics API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
