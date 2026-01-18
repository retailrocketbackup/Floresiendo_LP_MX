'use client';

import { useState } from 'react';
import Image from 'next/image';

type Platform = 'facebook' | 'instagram';
type Funnel = 'duelo' | 'proposito' | 'estres' | 'general';
type ImageModel = 'gemini-3-pro-image-preview' | 'gemini-2.5-flash-image' | 'imagen-4.0-generate-001';

interface PostCreatorProps {
  onPostCreated: () => void;
}

export function PostCreator({ onPostCreated }: PostCreatorProps) {
  // Form state
  const [platforms, setPlatforms] = useState<Platform[]>(['facebook', 'instagram']);
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [funnel, setFunnel] = useState<Funnel>('general');
  const [contentTheme, setContentTheme] = useState('');

  // Image state
  const [imageSource, setImageSource] = useState<'upload' | 'ai'>('ai');
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageModel, setImageModel] = useState<ImageModel>('gemini-2.5-flash-image');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  // AI generation state
  const [generatingCaption, setGeneratingCaption] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Toggle platform selection
  const togglePlatform = (platform: Platform) => {
    if (platforms.includes(platform)) {
      if (platforms.length > 1) {
        setPlatforms(platforms.filter((p) => p !== platform));
      }
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      setUploadedImagePreview(URL.createObjectURL(file));
      setGeneratedImage(null);
    }
  };

  // Generate caption with AI
  const handleGenerateCaption = async () => {
    if (!contentTheme.trim()) {
      setError('Por favor ingresa un tema para generar el caption');
      return;
    }

    setGeneratingCaption(true);
    setError(null);

    try {
      const storedPassword = localStorage.getItem('admin_password');
      const res = await fetch('/api/social/generate-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: storedPassword,
          theme: contentTheme,
          funnel,
          platforms,
        }),
      });

      if (!res.ok) throw new Error('Error al generar caption');

      const data = await res.json();
      setCaption(data.caption);
      if (data.hashtags) {
        setHashtags(data.hashtags.join(' '));
      }
      if (data.imagePrompt) {
        setImagePrompt(data.imagePrompt);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setGeneratingCaption(false);
    }
  };

  // Generate image with AI
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) {
      setError('Por favor ingresa un prompt para generar la imagen');
      return;
    }

    setGeneratingImage(true);
    setError(null);

    try {
      const storedPassword = localStorage.getItem('admin_password');
      const res = await fetch('/api/social/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: storedPassword,
          prompt: imagePrompt,
          model: imageModel,
          aspectRatio: platforms.includes('instagram') ? '1:1' : '16:9',
        }),
      });

      if (!res.ok) throw new Error('Error al generar imagen');

      const data = await res.json();
      if (data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setUploadedImage(null);
        setUploadedImagePreview(null);
      } else {
        throw new Error(data.error || 'Error al generar imagen');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setGeneratingImage(false);
    }
  };

  // Submit post for approval
  const handleSubmit = async () => {
    if (!caption.trim()) {
      setError('El caption es requerido');
      return;
    }

    if (!generatedImage && !uploadedImage) {
      setError('Por favor genera o sube una imagen');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const storedPassword = localStorage.getItem('admin_password');

      // Prepare form data if uploading image
      let imageUrl = generatedImage;
      if (uploadedImage) {
        const formData = new FormData();
        formData.append('image', uploadedImage);
        formData.append('password', storedPassword || '');

        const uploadRes = await fetch('/api/social/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) throw new Error('Error al subir imagen');
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      // Create post
      const res = await fetch('/api/social/create-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: storedPassword,
          platforms,
          caption,
          hashtags: hashtags.split(/\s+/).filter(Boolean).map(h => h.replace(/^#/, '')),
          mediaUrls: imageUrl ? [imageUrl] : [],
          funnel,
          contentTheme,
          imageSource: uploadedImage ? 'brand_asset' : 'ai_generated',
        }),
      });

      if (!res.ok) throw new Error('Error al crear post');

      // Reset form
      setCaption('');
      setHashtags('');
      setImagePrompt('');
      setGeneratedImage(null);
      setUploadedImage(null);
      setUploadedImagePreview(null);
      setContentTheme('');

      onPostCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setSubmitting(false);
    }
  };

  const characterCount = caption.length;
  const maxChars = platforms.includes('instagram') ? 2200 : 63206;
  const isOverLimit = characterCount > maxChars;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-warm-gray-800 mb-6">
        Crear Nuevo Post
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* Platform Selection */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
            <label className="block text-sm font-medium text-warm-gray-700 mb-3">
              Plataformas
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => togglePlatform('facebook')}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                  platforms.includes('facebook')
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-warm-gray-200 text-warm-gray-500 hover:border-warm-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
              <button
                type="button"
                onClick={() => togglePlatform('instagram')}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                  platforms.includes('instagram')
                    ? 'border-pink-600 bg-pink-50 text-pink-700'
                    : 'border-warm-gray-200 text-warm-gray-500 hover:border-warm-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </button>
            </div>
          </div>

          {/* Theme & Funnel */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-warm-gray-700 mb-2">
                  Funnel
                </label>
                <select
                  value={funnel}
                  onChange={(e) => setFunnel(e.target.value as Funnel)}
                  className="w-full px-3 py-2 border border-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/50"
                >
                  <option value="general">General</option>
                  <option value="duelo">Duelo</option>
                  <option value="proposito">Propósito</option>
                  <option value="estres">Estrés</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray-700 mb-2">
                  Tema del contenido
                </label>
                <input
                  type="text"
                  value={contentTheme}
                  onChange={(e) => setContentTheme(e.target.value)}
                  placeholder="ej: Retiro de fin de semana"
                  className="w-full px-3 py-2 border border-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/50"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateCaption}
              disabled={generatingCaption || !contentTheme.trim()}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {generatingCaption ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generar Caption con AI
                </>
              )}
            </button>
          </div>

          {/* Caption */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-warm-gray-700">
                Caption
              </label>
              <span className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-warm-gray-400'}`}>
                {characterCount.toLocaleString()} / {maxChars.toLocaleString()}
              </span>
            </div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Escribe tu caption o genera uno con AI..."
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/50 resize-none ${
                isOverLimit ? 'border-red-300 bg-red-50' : 'border-warm-gray-200'
              }`}
            />
          </div>

          {/* Hashtags */}
          {platforms.includes('instagram') && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
              <label className="block text-sm font-medium text-warm-gray-700 mb-2">
                Hashtags (solo Instagram)
              </label>
              <input
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="#retiroespiritual #bienestar #mexico"
                className="w-full px-4 py-3 border border-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/50"
              />
              <p className="text-xs text-warm-gray-400 mt-2">
                Separa los hashtags con espacios. Se agregarán al final del caption.
              </p>
            </div>
          )}
        </div>

        {/* Right Column - Image */}
        <div className="space-y-6">
          {/* Image Source Toggle */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
            <label className="block text-sm font-medium text-warm-gray-700 mb-3">
              Origen de la imagen
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setImageSource('ai')}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                  imageSource === 'ai'
                    ? 'border-purple-600 bg-purple-50 text-purple-700'
                    : 'border-warm-gray-200 text-warm-gray-500 hover:border-warm-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generar con AI
              </button>
              <button
                type="button"
                onClick={() => setImageSource('upload')}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                  imageSource === 'upload'
                    ? 'border-coral bg-coral/10 text-coral'
                    : 'border-warm-gray-200 text-warm-gray-500 hover:border-warm-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Subir imagen
              </button>
            </div>
          </div>

          {/* AI Image Generation */}
          {imageSource === 'ai' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
              <label className="block text-sm font-medium text-warm-gray-700 mb-2">
                Modelo de AI
              </label>
              <select
                value={imageModel}
                onChange={(e) => setImageModel(e.target.value as ImageModel)}
                className="w-full px-3 py-2 border border-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/50 mb-4"
              >
                <option value="gemini-2.5-flash-image">Nano Banana (Rápido)</option>
                <option value="gemini-3-pro-image-preview">Nano Banana Pro (Alta Calidad)</option>
                <option value="imagen-4.0-generate-001">Imagen 4</option>
              </select>

              <label className="block text-sm font-medium text-warm-gray-700 mb-2">
                Prompt de imagen
              </label>
              <textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                placeholder="Describe la imagen que quieres generar..."
                rows={3}
                className="w-full px-4 py-3 border border-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/50 resize-none mb-4"
              />

              <button
                onClick={handleGenerateImage}
                disabled={generatingImage || !imagePrompt.trim()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {generatingImage ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generando imagen...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Generar Imagen
                  </>
                )}
              </button>
            </div>
          )}

          {/* Image Upload */}
          {imageSource === 'upload' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
              <label className="block text-sm font-medium text-warm-gray-700 mb-3">
                Subir imagen
              </label>
              <div className="border-2 border-dashed border-warm-gray-200 rounded-lg p-6 text-center hover:border-coral transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <svg className="w-10 h-10 mx-auto text-warm-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-warm-gray-600">
                    Haz clic para seleccionar una imagen
                  </p>
                  <p className="text-xs text-warm-gray-400 mt-1">
                    JPG, PNG o WebP (max 5MB)
                  </p>
                </label>
              </div>
            </div>
          )}

          {/* Image Preview */}
          {(generatedImage || uploadedImagePreview) && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-warm-gray-700">
                  Vista previa
                </label>
                <button
                  onClick={() => {
                    setGeneratedImage(null);
                    setUploadedImage(null);
                    setUploadedImagePreview(null);
                  }}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-warm-gray-100">
                <Image
                  src={generatedImage || uploadedImagePreview || ''}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
              {imageSource === 'ai' && (
                <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generada con AI
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={submitting || !caption.trim() || (!generatedImage && !uploadedImage)}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-coral text-white rounded-xl font-semibold hover:bg-coral/90 transition-colors disabled:opacity-50 shadow-lg"
          >
            {submitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Enviando para aprobación...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Enviar para Aprobación
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
