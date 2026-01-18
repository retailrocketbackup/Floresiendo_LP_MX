import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_SOCIAL_URL!,
  process.env.SUPABASE_SOCIAL_SERVICE_KEY!
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Skip auth in development
    const isDev = process.env.NODE_ENV === 'development';
    if (!isDev) {
      const adminPassword = process.env.ADMIN_PASSWORD;
      const queryPassword = searchParams.get('password');

      if (!adminPassword) {
        return NextResponse.json({ error: 'Admin not configured' }, { status: 500 });
      }

      if (queryPassword !== adminPassword) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // Fetch all posts
    const { data: posts, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Social Queue API Error]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Count pending approvals
    const pendingCount = posts?.filter(p => p.approval_status === 'pending').length || 0;

    return NextResponse.json({
      posts: posts || [],
      pendingCount,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Social Queue API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
