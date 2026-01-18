// lib/social-publisher.ts
// Social media publishing library for Facebook and Instagram organic posts
// Uses Google Imagen for AI image generation

import { getSupabaseServer } from './supabase';

// =============================================================================
// TYPES
// =============================================================================

export interface ScheduledPost {
  id: string;
  created_at: string;
  updated_at: string;
  platforms: ('facebook' | 'instagram')[];
  content_type: 'image' | 'video' | 'carousel' | 'text';
  caption: string;
  media_urls: string[];
  hashtags: string[];
  funnel: 'duelo' | 'proposito' | 'estres' | 'general' | 'evento' | null;
  content_theme: string | null;
  image_source: 'brand_asset' | 'ai_generated' | 'uploaded' | null;
  image_prompt: string | null;
  compliance_status: 'pending' | 'approved' | 'flagged' | 'rejected';
  compliance_notes: string | null;
  flagged_terms: string[] | null;
  approval_status: 'draft' | 'pending' | 'approved' | 'rejected';
  approved_by: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
  scheduled_for: string | null;
  publish_status: 'draft' | 'scheduled' | 'publishing' | 'published' | 'failed';
  published_at: string | null;
  platform_post_ids: Record<string, string>;
  error_message: string | null;
  retry_count: number;
  event_id: string;
  created_by: string;
}

export interface CreatePostInput {
  platforms: ('facebook' | 'instagram')[];
  caption: string;
  media_urls?: string[];
  funnel?: 'duelo' | 'proposito' | 'estres' | 'general' | 'evento';
  content_theme?: string;
  image_source?: 'brand_asset' | 'ai_generated' | 'uploaded';
  image_prompt?: string;
  hashtags?: string[];
}

export interface PublishResult {
  success: boolean;
  platform_post_ids?: Record<string, string>;
  errors?: string[];
}

// =============================================================================
// CONSTANTS
// =============================================================================

const META_API_VERSION = 'v21.0';
const META_API_BASE = `https://graph.facebook.com/${META_API_VERSION}`;

// Blocked terms for compliance (auto-reject)
const BLOCKED_TERMS = [
  // Medical claims
  'cura', 'trata', 'diagnostica', 'previene',
  'sana enfermedad', 'elimina', 'revierte',
  // Substance names
  'ayahuasca', 'peyote', 'hongos', 'psicodélico',
  'psilocibina', 'enteógeno', 'bufo', 'dmt',
  'alucinógeno',
  // Promise language
  'garantizado', '100% efectivo', 'milagroso',
  'resultados inmediatos', 'cura instantánea'
];

// Flagged terms (require human review)
const FLAGGED_TERMS = [
  'ceremonia', 'ceremonias',
  'medicina ancestral',
  'sanación', 'sanación espiritual',
  'transformación', 'transformacional',
  'proceso profundo', 'liberar'
];

// =============================================================================
// ENVIRONMENT HELPERS
// =============================================================================

function getMetaToken(): string {
  const token = process.env.META_ADS_ACCESS_TOKEN;
  if (!token) throw new Error('META_ADS_ACCESS_TOKEN not configured');
  return token;
}

function getPageId(): string {
  const pageId = process.env.META_PAGE_ID;
  if (!pageId) throw new Error('META_PAGE_ID not configured');
  return pageId;
}

function getIgUserId(): string {
  const igUserId = process.env.META_IG_USER_ID;
  if (!igUserId) throw new Error('META_IG_USER_ID not configured');
  return igUserId;
}

function getGoogleApiKey(): string {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_AI_API_KEY not configured');
  return apiKey;
}

// =============================================================================
// COMPLIANCE CHECK
// =============================================================================

export interface ComplianceResult {
  status: 'approved' | 'flagged' | 'rejected';
  blockedTerms: string[];
  flaggedTerms: string[];
  suggestions: string[];
}

export function checkCompliance(caption: string): ComplianceResult {
  const lowerCaption = caption.toLowerCase();

  const foundBlocked = BLOCKED_TERMS.filter(term =>
    lowerCaption.includes(term.toLowerCase())
  );

  const foundFlagged = FLAGGED_TERMS.filter(term =>
    lowerCaption.includes(term.toLowerCase())
  );

  if (foundBlocked.length > 0) {
    return {
      status: 'rejected',
      blockedTerms: foundBlocked,
      flaggedTerms: foundFlagged,
      suggestions: generateSafeAlternatives(foundBlocked)
    };
  }

  if (foundFlagged.length > 0) {
    return {
      status: 'flagged',
      blockedTerms: [],
      flaggedTerms: foundFlagged,
      suggestions: []
    };
  }

  return {
    status: 'approved',
    blockedTerms: [],
    flaggedTerms: [],
    suggestions: []
  };
}

function generateSafeAlternatives(blockedTerms: string[]): string[] {
  const alternatives: Record<string, string> = {
    'cura': 'apoyo en tu bienestar',
    'trata': 'acompaña',
    'sanación': 'bienestar integral',
    'medicina ancestral': 'prácticas ancestrales guiadas',
    'garantizado': 'experiencias varían de persona a persona'
  };

  return blockedTerms
    .map(term => alternatives[term])
    .filter(Boolean);
}

// =============================================================================
// AI IMAGE GENERATION (Google Gemini API)
// =============================================================================
// Documentation: https://ai.google.dev/gemini-api/docs/imagen
// Documentation: https://ai.google.dev/gemini-api/docs/image-generation
//
// Available Models:
// - imagen-4.0-generate-001 (Standard Imagen 4)
// - imagen-4.0-fast-generate-001 (Fast Imagen 4)
// - gemini-2.5-flash-image (Nano Banana - speed optimized)
// - gemini-3-pro-image-preview (Nano Banana Pro - highest quality)
// =============================================================================

export interface ImageGenerationResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export type ImageModel =
  | 'imagen-4.0-generate-001'      // Standard Imagen 4
  | 'imagen-4.0-fast-generate-001' // Fast Imagen 4
  | 'gemini-2.5-flash-image'       // Nano Banana (speed)
  | 'gemini-3-pro-image-preview';  // Nano Banana Pro (quality)

export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';

/**
 * Generate an image using Google Imagen 4 API
 * Best for: Quick, standard image generation (1-4 images)
 *
 * @param prompt - Text description of the image
 * @param aspectRatio - Image aspect ratio (default: 1:1 for social media)
 * @param numberOfImages - How many images to generate (1-4)
 */
export async function generateImageWithImagen(
  prompt: string,
  aspectRatio: AspectRatio = '1:1',
  numberOfImages: number = 1
): Promise<ImageGenerationResult> {
  const apiKey = getGoogleApiKey();

  // Apply Floresiendo brand guidelines to prompt
  const brandedPrompt = `${prompt}, Mexican wellness retreat setting, earth tones (terra-cotta, deep agave green, cream), warm natural lighting, contemplative atmosphere, high-end boutique style, no text overlay, professional photography`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instances: [{ prompt: brandedPrompt }],
          parameters: {
            sampleCount: Math.min(numberOfImages, 4),
            aspectRatio: aspectRatio,
            personGeneration: 'dont_allow', // Don't generate faces per brand guidelines
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('[Imagen] Generation error:', error);
      return { success: false, error: error.error?.message || 'Image generation failed' };
    }

    const result = await response.json();

    if (result.predictions && result.predictions.length > 0) {
      // The image is returned as base64
      const base64Image = result.predictions[0].bytesBase64Encoded;
      const imageUrl = await uploadBase64Image(base64Image);
      return { success: true, imageUrl };
    }

    return { success: false, error: 'No image generated' };
  } catch (error) {
    console.error('[Imagen] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Generate an image using Nano Banana Pro (Gemini 3 Pro Image)
 * Best for: Highest quality, professional asset production, text rendering
 *
 * Note: This model includes "thinking" for complex instructions
 *
 * @param prompt - Text description of the image
 * @param aspectRatio - Image aspect ratio
 */
export async function generateImageWithNanoBananaPro(
  prompt: string,
  aspectRatio: AspectRatio = '1:1'
): Promise<ImageGenerationResult> {
  const apiKey = getGoogleApiKey();

  // Apply Floresiendo brand guidelines to prompt
  const brandedPrompt = `${prompt}. Style: Mexican wellness retreat, earth tones (terra-cotta, deep agave green, cream), warm natural lighting, contemplative atmosphere, high-end boutique aesthetic, no text overlay, professional photography quality.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: brandedPrompt }]
          }],
          generationConfig: {
            responseModalities: ['TEXT', 'IMAGE'],
            imageConfig: {
              aspectRatio: aspectRatio,
              imageSize: '1K' // Options: 1K, 2K, 4K
            }
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('[NanoBananaPro] Generation error:', error);
      return { success: false, error: error.error?.message || 'Image generation failed' };
    }

    const result = await response.json();

    // Extract image from response parts
    if (result.candidates && result.candidates[0]?.content?.parts) {
      for (const part of result.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Image = part.inlineData.data;
          const imageUrl = await uploadBase64Image(base64Image);
          return { success: true, imageUrl };
        }
      }
    }

    return { success: false, error: 'No image generated' };
  } catch (error) {
    console.error('[NanoBananaPro] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Generate an image using Nano Banana (Gemini 2.5 Flash Image)
 * Best for: Fast generation, good quality, cost-effective
 *
 * @param prompt - Text description of the image
 */
export async function generateImageWithNanoBanana(
  prompt: string
): Promise<ImageGenerationResult> {
  const apiKey = getGoogleApiKey();

  // Apply Floresiendo brand guidelines to prompt
  const brandedPrompt = `${prompt}. Style: Mexican wellness retreat, earth tones, warm natural lighting, contemplative atmosphere, high-end boutique aesthetic, professional photography.`;

  try {
    // Use Gemini 2.0 Flash Preview Image Generation model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Generate an image: ${brandedPrompt}` }]
          }],
          generationConfig: {
            responseModalities: ['IMAGE']
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('[Gemini Image] Generation error:', error);
      return { success: false, error: error.error?.message || 'Image generation failed' };
    }

    const result = await response.json();

    // Extract image from response parts
    if (result.candidates && result.candidates[0]?.content?.parts) {
      for (const part of result.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Image = part.inlineData.data;
          const imageUrl = await uploadBase64Image(base64Image);
          return { success: true, imageUrl };
        }
      }
    }

    return { success: false, error: 'No image generated' };
  } catch (error) {
    console.error('[Gemini Image] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Main image generation function - automatically selects best model
 *
 * @param prompt - Text description of the image
 * @param options - Generation options
 */
export async function generateImage(
  prompt: string,
  options: {
    model?: ImageModel;
    aspectRatio?: AspectRatio;
    highQuality?: boolean;
  } = {}
): Promise<ImageGenerationResult> {
  const {
    model,
    aspectRatio = '1:1',
    highQuality = false
  } = options;

  // Auto-select model based on needs
  const selectedModel = model || (highQuality ? 'gemini-3-pro-image-preview' : 'gemini-2.0-flash-preview-image-generation');

  console.log(`[ImageGen] Using model: ${selectedModel}`);

  switch (selectedModel) {
    case 'gemini-3-pro-image-preview':
      return generateImageWithNanoBananaPro(prompt, aspectRatio);
    case 'gemini-2.0-flash-preview-image-generation':
    default:
      return generateImageWithNanoBanana(prompt);
  }
}

/**
 * Upload base64 image to Supabase Storage
 */
async function uploadBase64Image(base64Data: string): Promise<string> {
  const supabase = getSupabaseServer();

  // Convert base64 to buffer
  const buffer = Buffer.from(base64Data, 'base64');
  const fileName = `ai-generated/${Date.now()}-${Math.random().toString(36).substring(7)}.png`;

  const { data, error } = await supabase.storage
    .from('social-media-assets')
    .upload(fileName, buffer, {
      contentType: 'image/png',
      upsert: false
    });

  if (error) {
    console.error('[Storage] Upload error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('social-media-assets')
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

// =============================================================================
// FACEBOOK PUBLISHING
// =============================================================================

export async function publishToFacebook(
  post: ScheduledPost
): Promise<{ success: boolean; postId?: string; error?: string }> {
  const pageId = getPageId();
  const token = getMetaToken();

  // Strip hashtags for Facebook (keep caption cleaner)
  const fbCaption = stripHashtagsForFacebook(post.caption);

  try {
    let response: Response;
    let endpoint: string;

    if (post.media_urls.length > 0) {
      // Photo post
      endpoint = `${META_API_BASE}/${pageId}/photos`;
      response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: post.media_urls[0],
          message: fbCaption,
          access_token: token
        })
      });
    } else {
      // Text-only post
      endpoint = `${META_API_BASE}/${pageId}/feed`;
      response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: fbCaption,
          access_token: token
        })
      });
    }

    if (!response.ok) {
      const error = await response.json();
      console.error('[Facebook] Publish error:', error);
      return { success: false, error: error.error?.message || 'Facebook publish failed' };
    }

    const result = await response.json();
    return { success: true, postId: result.post_id || result.id };
  } catch (error) {
    console.error('[Facebook] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

function stripHashtagsForFacebook(caption: string): string {
  // Remove lines that are just hashtags
  const lines = caption.split('\n');
  const contentLines = lines.filter(line => !line.trim().startsWith('#'));
  return contentLines.join('\n').trim();
}

// =============================================================================
// INSTAGRAM PUBLISHING
// =============================================================================

export async function publishToInstagram(
  post: ScheduledPost
): Promise<{ success: boolean; postId?: string; error?: string }> {
  const igUserId = getIgUserId();
  const token = getMetaToken();

  if (post.media_urls.length === 0) {
    return { success: false, error: 'Instagram requires at least one image' };
  }

  try {
    // Step 1: Create media container
    const containerResponse = await fetch(
      `${META_API_BASE}/${igUserId}/media`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: post.media_urls[0],
          caption: post.caption, // Keep hashtags for Instagram
          access_token: token
        })
      }
    );

    if (!containerResponse.ok) {
      const error = await containerResponse.json();
      console.error('[Instagram] Container error:', error);
      return { success: false, error: error.error?.message || 'IG container creation failed' };
    }

    const { id: containerId } = await containerResponse.json();

    // Step 2: Wait for container to be ready
    await waitForContainerReady(containerId, token);

    // Step 3: Publish container
    const publishResponse = await fetch(
      `${META_API_BASE}/${igUserId}/media_publish`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creation_id: containerId,
          access_token: token
        })
      }
    );

    if (!publishResponse.ok) {
      const error = await publishResponse.json();
      console.error('[Instagram] Publish error:', error);
      return { success: false, error: error.error?.message || 'IG publish failed' };
    }

    const { id: mediaId } = await publishResponse.json();
    return { success: true, postId: mediaId };
  } catch (error) {
    console.error('[Instagram] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function waitForContainerReady(
  containerId: string,
  token: string,
  maxAttempts: number = 10
): Promise<void> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const response = await fetch(
      `${META_API_BASE}/${containerId}?fields=status_code&access_token=${token}`
    );

    const { status_code } = await response.json();

    if (status_code === 'FINISHED') {
      return; // Ready to publish
    }

    if (status_code === 'ERROR') {
      throw new Error('IG container processing failed');
    }

    // Wait 3 seconds before checking again
    await new Promise(r => setTimeout(r, 3000));
  }

  throw new Error('IG container processing timeout');
}

// =============================================================================
// DATABASE OPERATIONS
// =============================================================================

export async function createPost(input: CreatePostInput): Promise<ScheduledPost | null> {
  const supabase = getSupabaseServer();

  // Run compliance check
  const compliance = checkCompliance(input.caption);

  const { data, error } = await supabase
    .from('scheduled_posts')
    .insert({
      platforms: input.platforms,
      caption: input.caption,
      media_urls: input.media_urls || [],
      funnel: input.funnel || null,
      content_theme: input.content_theme || null,
      image_source: input.image_source || null,
      image_prompt: input.image_prompt || null,
      hashtags: input.hashtags || [],
      compliance_status: compliance.status,
      compliance_notes: compliance.suggestions.join('; ') || null,
      flagged_terms: [...compliance.blockedTerms, ...compliance.flaggedTerms],
      approval_status: 'draft',
      publish_status: 'draft',
      created_by: 'ai'
    })
    .select()
    .single();

  if (error) {
    console.error('[DB] Create post error:', error);
    return null;
  }

  // Create audit log
  await createAuditLog(data.id, 'created', 'ai', { compliance });

  return data;
}

export async function getPostById(id: string): Promise<ScheduledPost | null> {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from('scheduled_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('[DB] Get post error:', error);
    return null;
  }

  return data;
}

export async function getPendingApprovalPosts(): Promise<ScheduledPost[]> {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from('scheduled_posts')
    .select('*')
    .eq('approval_status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[DB] Get pending posts error:', error);
    return [];
  }

  return data || [];
}

export async function getScheduledPosts(
  from: Date,
  to: Date
): Promise<ScheduledPost[]> {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from('scheduled_posts')
    .select('*')
    .eq('publish_status', 'scheduled')
    .eq('approval_status', 'approved')
    .gte('scheduled_for', from.toISOString())
    .lt('scheduled_for', to.toISOString())
    .order('scheduled_for', { ascending: true });

  if (error) {
    console.error('[DB] Get scheduled posts error:', error);
    return [];
  }

  return data || [];
}

export async function approvePost(
  id: string,
  approvedBy: string
): Promise<boolean> {
  const supabase = getSupabaseServer();

  const { error } = await supabase
    .from('scheduled_posts')
    .update({
      approval_status: 'approved',
      approved_by: approvedBy,
      approved_at: new Date().toISOString()
    })
    .eq('id', id);

  if (error) {
    console.error('[DB] Approve post error:', error);
    return false;
  }

  await createAuditLog(id, 'approved', approvedBy, {});
  return true;
}

export async function rejectPost(
  id: string,
  rejectedBy: string,
  reason: string
): Promise<boolean> {
  const supabase = getSupabaseServer();

  const { error } = await supabase
    .from('scheduled_posts')
    .update({
      approval_status: 'rejected',
      rejection_reason: reason
    })
    .eq('id', id);

  if (error) {
    console.error('[DB] Reject post error:', error);
    return false;
  }

  await createAuditLog(id, 'rejected', rejectedBy, { reason });
  return true;
}

export async function schedulePost(
  id: string,
  scheduledFor: Date
): Promise<boolean> {
  const supabase = getSupabaseServer();

  // Validate scheduling time
  const now = new Date();
  if (scheduledFor <= now) {
    console.error('[Schedule] Time must be in the future');
    return false;
  }

  // Check time restrictions (no 11pm-6am Mexico City time)
  const hour = scheduledFor.getHours();
  if (hour < 6 || hour >= 23) {
    console.error('[Schedule] Cannot schedule between 11pm and 6am');
    return false;
  }

  const { error } = await supabase
    .from('scheduled_posts')
    .update({
      scheduled_for: scheduledFor.toISOString(),
      publish_status: 'scheduled'
    })
    .eq('id', id);

  if (error) {
    console.error('[DB] Schedule post error:', error);
    return false;
  }

  await createAuditLog(id, 'scheduled', 'system', { scheduled_for: scheduledFor.toISOString() });
  return true;
}

export async function updatePublishStatus(
  id: string,
  status: 'publishing' | 'published' | 'failed',
  platformPostIds?: Record<string, string>,
  errorMessage?: string
): Promise<boolean> {
  const supabase = getSupabaseServer();

  const updateData: Record<string, unknown> = { publish_status: status };

  if (status === 'published') {
    updateData.published_at = new Date().toISOString();
    if (platformPostIds) {
      updateData.platform_post_ids = platformPostIds;
    }
  }

  if (status === 'failed' && errorMessage) {
    updateData.error_message = errorMessage;
  }

  const { error } = await supabase
    .from('scheduled_posts')
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error('[DB] Update status error:', error);
    return false;
  }

  await createAuditLog(id, status, 'system', { platformPostIds, errorMessage });
  return true;
}

async function createAuditLog(
  postId: string,
  action: string,
  actor: string,
  details: Record<string, unknown>
): Promise<void> {
  const supabase = getSupabaseServer();

  await supabase
    .from('social_media_audit_log')
    .insert({
      post_id: postId,
      action,
      actor,
      details
    });
}

// =============================================================================
// MAIN PUBLISH FUNCTION
// =============================================================================

export async function publishPost(post: ScheduledPost): Promise<PublishResult> {
  // Update status to publishing
  await updatePublishStatus(post.id, 'publishing');

  const platformPostIds: Record<string, string> = {};
  const errors: string[] = [];

  // Publish to each platform
  for (const platform of post.platforms) {
    try {
      if (platform === 'facebook') {
        const result = await publishToFacebook(post);
        if (result.success && result.postId) {
          platformPostIds.facebook = result.postId;
        } else {
          errors.push(`Facebook: ${result.error}`);
        }
      } else if (platform === 'instagram') {
        const result = await publishToInstagram(post);
        if (result.success && result.postId) {
          platformPostIds.instagram = result.postId;
        } else {
          errors.push(`Instagram: ${result.error}`);
        }
      }
    } catch (error) {
      errors.push(`${platform}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Update final status
  if (errors.length === 0) {
    await updatePublishStatus(post.id, 'published', platformPostIds);
    return { success: true, platform_post_ids: platformPostIds };
  } else {
    await updatePublishStatus(post.id, 'failed', undefined, errors.join('; '));
    return { success: false, errors };
  }
}
