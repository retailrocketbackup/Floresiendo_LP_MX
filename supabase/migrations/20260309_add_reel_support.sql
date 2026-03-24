-- Migration: Add reel/video support to scheduled_posts
-- Created: 2026-03-09
-- Project: Floresiendo OpusClip Reel Pipeline

-- Add media_type column to distinguish image posts from reels
ALTER TABLE scheduled_posts
  ADD COLUMN IF NOT EXISTS media_type TEXT NOT NULL DEFAULT 'image'
    CHECK (media_type IN ('image', 'reel', 'carousel'));

-- Add video_url for reel source (separate from media_urls which holds images)
ALTER TABLE scheduled_posts
  ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Add virality_score from OpusClip (0-99 scale)
ALTER TABLE scheduled_posts
  ADD COLUMN IF NOT EXISTS virality_score INTEGER
    CHECK (virality_score IS NULL OR (virality_score >= 0 AND virality_score <= 99));

-- Index for filtering by media type
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_media_type ON scheduled_posts(media_type);

-- Update content_type CHECK constraint to include 'reel'
-- (content_type already supports 'video' but we add explicit 'reel' for clarity)
-- Note: The existing CHECK allows 'video' which covers reels functionally.
-- media_type is the canonical column for reel vs image distinction.

-- Create reel-assets storage bucket (run via Supabase dashboard or API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('reel-assets', 'reel-assets', true)
-- ON CONFLICT DO NOTHING;

COMMENT ON COLUMN scheduled_posts.media_type IS 'Type of media: image (default), reel, carousel';
COMMENT ON COLUMN scheduled_posts.video_url IS 'Public URL of the video file for reels';
COMMENT ON COLUMN scheduled_posts.virality_score IS 'OpusClip virality score 0-99 (null if not from OpusClip)';
