// lib/supabase.ts
// Supabase client configuration for secure screening data storage

import { createClient } from '@supabase/supabase-js';

// Database types for screening applications
export interface ScreeningApplicationRow {
  id: string;
  application_id: string;
  email_hash: string;
  full_name: string;
  risk_level: 'green' | 'yellow' | 'red';
  screening_status: 'pending' | 'approved' | 'rejected';
  encrypted_contact: string; // JSON string of EncryptedData
  encrypted_medical: string; // JSON string of EncryptedData
  encrypted_lifestyle: string; // JSON string of EncryptedData
  iv: string;
  salt: string;
  created_at: string;
  updated_at: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
}

export interface ScreeningApplicationInsert {
  application_id: string;
  email_hash: string;
  full_name: string;
  risk_level: 'green' | 'yellow' | 'red';
  screening_status?: 'pending' | 'approved' | 'rejected';
  encrypted_contact: string;
  encrypted_medical: string;
  encrypted_lifestyle: string;
  iv: string;
  salt: string;
}

// Singleton for server-side Supabase client (uses service role key)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let serverClient: ReturnType<typeof createClient> | null = null;

/**
 * Get Supabase client for server-side operations (API routes)
 * Uses service role key for full access (bypasses RLS)
 */
export function getSupabaseServer() {
  if (serverClient) return serverClient;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables: SUPABASE_URL or SUPABASE_SERVICE_KEY');
  }

  serverClient = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return serverClient;
}

/**
 * Insert a new screening application
 */
export async function insertScreeningApplication(
  data: ScreeningApplicationInsert
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseServer();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await supabase
    .from('screening_applications')
    .insert(data as any);

  if (error) {
    console.error('[Supabase] Insert error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Get all screening applications (for admin)
 */
export async function getScreeningApplications(
  filters?: {
    status?: 'pending' | 'approved' | 'rejected';
    riskLevel?: 'green' | 'yellow' | 'red';
    limit?: number;
  }
): Promise<{ data: ScreeningApplicationRow[] | null; error?: string }> {
  const supabase = getSupabaseServer();

  let query = supabase
    .from('screening_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.status) {
    query = query.eq('screening_status', filters.status);
  }

  if (filters?.riskLevel) {
    query = query.eq('risk_level', filters.riskLevel);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[Supabase] Query error:', error);
    return { data: null, error: error.message };
  }

  return { data };
}

/**
 * Get a single screening application by ID
 */
export async function getScreeningApplicationById(
  applicationId: string
): Promise<{ data: ScreeningApplicationRow | null; error?: string }> {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from('screening_applications')
    .select('*')
    .eq('application_id', applicationId)
    .single();

  if (error) {
    console.error('[Supabase] Query error:', error);
    return { data: null, error: error.message };
  }

  return { data };
}

/**
 * Update screening application status
 */
export async function updateScreeningStatus(
  applicationId: string,
  status: 'approved' | 'rejected',
  reviewedBy: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseServer();

  const table = supabase.from('screening_applications');
  const { error } = await (table as ReturnType<typeof supabase.from>).update({
    screening_status: status,
    reviewed_by: reviewedBy,
    reviewed_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }).eq('application_id', applicationId);

  if (error) {
    console.error('[Supabase] Update error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
