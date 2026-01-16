-- Floresiendo Screening Applications - Supabase Schema
-- Run this SQL in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
--
-- SETUP INSTRUCTIONS:
-- 1. Create a new Supabase project at https://supabase.com
-- 2. Go to SQL Editor and paste this entire file
-- 3. Click "Run" to execute
-- 4. Go to Settings → API to get your keys for .env.local

-- ===========================================
-- TABLE: screening_applications
-- ===========================================
-- Stores encrypted screening form submissions
-- Sensitive data is encrypted with AES-256-GCM before storage

CREATE TABLE IF NOT EXISTS screening_applications (
  -- Primary key (auto-generated UUID)
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Application identifier (FL-xxxxx-xxxxx format)
  application_id TEXT UNIQUE NOT NULL,

  -- Hashed email for lookups (SHA-256, can't be reversed)
  email_hash TEXT NOT NULL,

  -- Non-sensitive fields (stored in plain text)
  full_name TEXT NOT NULL,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('green', 'yellow', 'red')),
  screening_status TEXT DEFAULT 'pending' CHECK (screening_status IN ('pending', 'approved', 'rejected')),

  -- Encrypted data payloads (JSON with ciphertext, iv, salt)
  -- These contain AES-256-GCM encrypted JSON objects
  encrypted_contact TEXT NOT NULL,   -- {phone, emergencyContact}
  encrypted_medical TEXT NOT NULL,   -- {medicalHistory, medications, mentalHealth}
  encrypted_lifestyle TEXT NOT NULL, -- {lifestyle, intentions}

  -- Encryption metadata (for primary encrypted_contact)
  iv TEXT NOT NULL,    -- Initialization vector (base64)
  salt TEXT NOT NULL,  -- Key derivation salt (base64)

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Audit trail
  reviewed_by TEXT,       -- Who reviewed (email or 'admin')
  reviewed_at TIMESTAMPTZ -- When reviewed
);

-- ===========================================
-- INDEXES
-- ===========================================
-- Speed up common queries

-- Lookup by email hash (for duplicate checking)
CREATE INDEX IF NOT EXISTS idx_screening_email_hash
ON screening_applications(email_hash);

-- Filter by status and risk level
CREATE INDEX IF NOT EXISTS idx_screening_status_risk
ON screening_applications(screening_status, risk_level);

-- Sort by creation date
CREATE INDEX IF NOT EXISTS idx_screening_created
ON screening_applications(created_at DESC);

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================
-- Restrict access to service role only (API routes)
-- No direct client access allowed

ALTER TABLE screening_applications ENABLE ROW LEVEL SECURITY;

-- Only service role can access (bypasses RLS when using service key)
-- This means the anon key CANNOT access this table
CREATE POLICY "Service role full access" ON screening_applications
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ===========================================
-- TRIGGER: Auto-update updated_at
-- ===========================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_screening_updated_at ON screening_applications;

CREATE TRIGGER trigger_update_screening_updated_at
  BEFORE UPDATE ON screening_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ===========================================
-- OPTIONAL: Scheduled cleanup for old data
-- ===========================================
-- Uncomment if you want automatic 5-year retention policy
-- Requires pg_cron extension (enable in Supabase Dashboard → Extensions)

-- CREATE EXTENSION IF NOT EXISTS pg_cron;
--
-- SELECT cron.schedule(
--   'cleanup-old-applications',
--   '0 0 1 * *', -- Run monthly on the 1st at midnight
--   $$DELETE FROM screening_applications
--     WHERE created_at < NOW() - INTERVAL '5 years'$$
-- );

-- ===========================================
-- VERIFICATION QUERIES
-- ===========================================
-- Run these to verify setup is correct

-- Check table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_name = 'screening_applications'
) AS table_exists;

-- Check RLS is enabled
SELECT relrowsecurity
FROM pg_class
WHERE relname = 'screening_applications';

-- List policies
SELECT policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'screening_applications';

-- ===========================================
-- NOTES FOR PRODUCTION
-- ===========================================
--
-- 1. ENCRYPTION_SECRET:
--    Generate with: openssl rand -base64 32
--    Store in Vercel environment variables
--    NEVER commit to git
--
-- 2. BACKUPS:
--    Enable daily backups in Supabase Dashboard → Settings → Backups
--    Pro plan includes point-in-time recovery
--
-- 3. MONITORING:
--    Check Dashboard → Logs for query performance
--    Set up alerts for high usage
--
-- 4. FREE TIER LIMITS:
--    - 500 MB database storage
--    - 2 GB bandwidth/month
--    - Pauses after 1 week inactivity
--
--    Each application uses ~1-2 KB, so you can store ~250,000 applications
--    To prevent pausing, set up a cron job to ping your API daily
