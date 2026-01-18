import { NextResponse } from 'next/server';
import { generateImage, type ImageModel, type AspectRatio } from '@/lib/social-publisher';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Skip auth in development
    const isDev = process.env.NODE_ENV === 'development';
    if (!isDev) {
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (body.password !== adminPassword) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const { prompt, model, aspectRatio } = body;

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Check for Google AI API key
    if (!process.env.GOOGLE_AI_API_KEY || process.env.GOOGLE_AI_API_KEY === 'your_google_ai_api_key_here') {
      return NextResponse.json(
        { error: 'Google AI API key not configured. Please add GOOGLE_AI_API_KEY to .env.local' },
        { status: 500 }
      );
    }

    // Generate image
    const result = await generateImage(prompt, {
      model: (model as ImageModel) || 'gemini-2.5-flash-image',
      aspectRatio: (aspectRatio as AspectRatio) || '1:1',
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to generate image' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl: result.imageUrl,
      model: result.model,
    });
  } catch (error) {
    console.error('[Generate Image API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate image' },
      { status: 500 }
    );
  }
}
