-- Migration: Create scheduled_posts table for organic social media publishing
-- Created: 2026-01-17
-- Project: Floresiendo Meta Organic Publisher

-- Create scheduled_posts table
CREATE TABLE IF NOT EXISTS scheduled_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Content
  platforms TEXT[] NOT NULL DEFAULT '{}',
  content_type TEXT NOT NULL DEFAULT 'image' CHECK (content_type IN ('image', 'video', 'carousel', 'text')),
  caption TEXT NOT NULL,
  media_urls TEXT[] NOT NULL DEFAULT '{}',
  hashtags TEXT[] DEFAULT '{}',

  -- Metadata
  funnel TEXT CHECK (funnel IN ('duelo', 'proposito', 'estres', 'general', 'evento')),
  content_theme TEXT,
  image_source TEXT CHECK (image_source IN ('brand_asset', 'ai_generated', 'uploaded')),
  image_prompt TEXT, -- AI generation prompt if applicable

  -- Compliance
  compliance_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (compliance_status IN ('pending', 'approved', 'flagged', 'rejected')),
  compliance_notes TEXT,
  flagged_terms TEXT[],

  -- Approval
  approval_status TEXT NOT NULL DEFAULT 'draft'
    CHECK (approval_status IN ('draft', 'pending', 'approved', 'rejected')),
  approved_by TEXT,
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,

  -- Publishing
  scheduled_for TIMESTAMPTZ,
  publish_status TEXT NOT NULL DEFAULT 'draft'
    CHECK (publish_status IN ('draft', 'scheduled', 'publishing', 'published', 'failed')),
  published_at TIMESTAMPTZ,
  platform_post_ids JSONB DEFAULT '{}', -- {"facebook": "123", "instagram": "456"}
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,

  -- Tracking
  event_id TEXT UNIQUE DEFAULT gen_random_uuid()::text,
  created_by TEXT NOT NULL DEFAULT 'ai'
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_publish_status ON scheduled_posts(publish_status);
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_scheduled_for ON scheduled_posts(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_approval_status ON scheduled_posts(approval_status);
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_created_at ON scheduled_posts(created_at DESC);

-- Create audit log table for tracking changes
CREATE TABLE IF NOT EXISTS social_media_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  action TEXT NOT NULL CHECK (action IN (
    'created', 'updated', 'submitted', 'compliance_check',
    'approved', 'rejected', 'changes_requested',
    'scheduled', 'publishing', 'published', 'failed', 'deleted'
  )),
  post_id UUID REFERENCES scheduled_posts(id) ON DELETE CASCADE,
  actor TEXT NOT NULL, -- 'ai', 'system', or user email
  details JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_audit_log_post_id ON social_media_audit_log(post_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON social_media_audit_log(created_at DESC);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for scheduled_posts
DROP TRIGGER IF EXISTS update_scheduled_posts_updated_at ON scheduled_posts;
CREATE TRIGGER update_scheduled_posts_updated_at
    BEFORE UPDATE ON scheduled_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies (optional - for when using anon/authenticated clients)
-- For now, using service role key bypasses RLS

-- Enable RLS
ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_media_audit_log ENABLE ROW LEVEL SECURITY;

-- Policy for service role (full access)
CREATE POLICY "Service role full access to scheduled_posts"
  ON scheduled_posts FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to audit_log"
  ON social_media_audit_log FOR ALL
  USING (true)
  WITH CHECK (true);

-- Comments for documentation
COMMENT ON TABLE scheduled_posts IS 'Stores organic social media posts for Facebook and Instagram publishing';
COMMENT ON COLUMN scheduled_posts.platforms IS 'Array of platforms: facebook, instagram';
COMMENT ON COLUMN scheduled_posts.compliance_status IS 'Automated compliance check result';
COMMENT ON COLUMN scheduled_posts.approval_status IS 'Human approval status';
COMMENT ON COLUMN scheduled_posts.publish_status IS 'Publishing lifecycle status';
COMMENT ON COLUMN scheduled_posts.platform_post_ids IS 'JSON object with platform-specific post IDs after publishing';
