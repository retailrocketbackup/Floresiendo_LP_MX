import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { checkCompliance } from '@/lib/social-publisher';

export const dynamic = 'force-dynamic';

// Max file size: 100MB
const MAX_FILE_SIZE = 100 * 1024 * 1024;
// Duration limits for reels (seconds)
const MIN_DURATION = 3;
const MAX_DURATION = 90;

function getSupabase() {
  return createClient(
    process.env.SUPABASE_SOCIAL_URL!,
    process.env.SUPABASE_SOCIAL_SERVICE_KEY!
  );
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Auth check
    const isDev = process.env.NODE_ENV === 'development';
    if (!isDev) {
      const password = formData.get('password') as string;
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (password !== adminPassword) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const file = formData.get('video') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'No video file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('video/mp4') && !file.type.startsWith('video/quicktime')) {
      return NextResponse.json(
        { error: 'Invalid file type. Only MP4 and MOV files are accepted.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.` },
        { status: 400 }
      );
    }

    // Optional metadata from form
    const caption = (formData.get('caption') as string) || '';
    const viralityScore = formData.get('virality_score')
      ? parseInt(formData.get('virality_score') as string, 10)
      : null;
    const funnel = (formData.get('funnel') as string) || 'general';
    const platformsRaw = formData.get('platforms') as string;
    const platforms = platformsRaw ? JSON.parse(platformsRaw) : ['facebook', 'instagram'];

    // Upload to Supabase Storage
    const supabase = getSupabase();
    const dateStr = new Date().toISOString().split('T')[0];
    const uuid = crypto.randomUUID();
    const ext = file.name.endsWith('.mov') ? 'mov' : 'mp4';
    const storagePath = `reels/${dateStr}/${uuid}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('reel-assets')
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('[Upload Reel] Storage error:', uploadError);
      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('reel-assets')
      .getPublicUrl(uploadData.path);

    const videoUrl = urlData.publicUrl;

    // Run compliance check if caption provided
    const compliance = caption ? checkCompliance(caption) : { status: 'pending' as const, blockedTerms: [], flaggedTerms: [], suggestions: [] };

    // Create scheduled_posts entry
    const { data: post, error: postError } = await supabase
      .from('scheduled_posts')
      .insert({
        platforms,
        content_type: 'video',
        media_type: 'reel',
        caption: caption || '',
        media_urls: [],
        video_url: videoUrl,
        virality_score: viralityScore,
        hashtags: [],
        funnel,
        image_source: 'uploaded',
        compliance_status: compliance.status === 'rejected' ? 'rejected' : (compliance.status === 'flagged' ? 'flagged' : 'pending'),
        compliance_notes: compliance.suggestions?.join('; ') || null,
        flagged_terms: [...compliance.blockedTerms, ...compliance.flaggedTerms],
        approval_status: 'pending',
        publish_status: 'draft',
        created_by: 'operator'
      })
      .select()
      .single();

    if (postError) {
      console.error('[Upload Reel] DB error:', postError);
      return NextResponse.json(
        { error: `Database error: ${postError.message}` },
        { status: 500 }
      );
    }

    // Audit log
    await supabase.from('social_media_audit_log').insert({
      post_id: post.id,
      action: 'created',
      actor: 'operator',
      details: {
        type: 'reel_upload',
        file_name: file.name,
        file_size: file.size,
        virality_score: viralityScore
      }
    });

    return NextResponse.json({
      success: true,
      post,
      videoUrl,
      message: 'Reel uploaded and queued for approval'
    });
  } catch (error) {
    console.error('[Upload Reel API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload reel' },
      { status: 500 }
    );
  }
}
