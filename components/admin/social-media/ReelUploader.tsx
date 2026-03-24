'use client';

import { useState, useRef } from 'react';

type Platform = 'facebook' | 'instagram';
type Funnel = 'duelo' | 'proposito' | 'estres' | 'general';

interface ReelUploaderProps {
  onReelUploaded: () => void;
}

export function ReelUploader({ onReelUploaded }: ReelUploaderProps) {
  const [platforms, setPlatforms] = useState<Platform[]>(['facebook', 'instagram']);
  const [funnel, setFunnel] = useState<Funnel>('general');
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [viralityScore, setViralityScore] = useState('');
  const [contentTheme, setContentTheme] = useState('');

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);
  const [generatingCaption, setGeneratingCaption] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const togglePlatform = (platform: Platform) => {
    if (platforms.includes(platform)) {
      if (platforms.length > 1) setPlatforms(platforms.filter(p => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setError('Solo se aceptan archivos de video (MP4, MOV)');
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setError('El archivo es demasiado grande. Máximo 100MB.');
      return;
    }

    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setError(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      if (file.size > 100 * 1024 * 1024) {
        setError('El archivo es demasiado grande. Máximo 100MB.');
        return;
      }
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setError(null);
    } else {
      setError('Solo se aceptan archivos de video (MP4, MOV)');
    }
  };

  const handleGenerateCaption = async () => {
    if (!contentTheme.trim()) {
      setError('Ingresa un tema para generar el caption');
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
          format: 'reel',
        }),
      });

      if (!res.ok) throw new Error('Error al generar caption');

      const data = await res.json();
      setCaption(data.caption);
      if (data.hashtags) {
        setHashtags(data.hashtags.map((h: string) => `#${h}`).join(' '));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setGeneratingCaption(false);
    }
  };

  const handleUpload = async () => {
    if (!videoFile) {
      setError('Selecciona un video para subir');
      return;
    }

    if (!caption.trim()) {
      setError('El caption es requerido');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const storedPassword = localStorage.getItem('admin_password');
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('caption', caption);
      formData.append('platforms', JSON.stringify(platforms));
      formData.append('funnel', funnel);
      formData.append('password', storedPassword || '');

      if (viralityScore) {
        formData.append('virality_score', viralityScore);
      }

      const res = await fetch('/api/social/upload-reel', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al subir reel');
      }

      setSuccess('Reel subido y en cola de aprobación');

      // Reset form
      setVideoFile(null);
      setVideoPreview(null);
      setCaption('');
      setHashtags('');
      setViralityScore('');
      setContentTheme('');
      if (fileInputRef.current) fileInputRef.current.value = '';

      onReelUploaded();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setUploading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-warm-gray-800 mb-6">
        Subir Reel
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

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Video + Metadata */}
        <div className="space-y-6">
          {/* Video Upload */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
            <label className="block text-sm font-medium text-warm-gray-700 mb-3">
              Video del Reel
            </label>

            {videoPreview ? (
              <div className="relative">
                <video
                  src={videoPreview}
                  controls
                  className="w-full rounded-lg bg-black max-h-80"
                  preload="metadata"
                />
                <button
                  onClick={() => {
                    setVideoFile(null);
                    setVideoPreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <p className="text-xs text-warm-gray-500 mt-2">
                  {videoFile?.name} ({((videoFile?.size || 0) / (1024 * 1024)).toFixed(1)} MB)
                </p>
              </div>
            ) : (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-warm-gray-200 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/quicktime"
                  onChange={handleVideoSelect}
                  className="hidden"
                />
                <svg className="w-12 h-12 mx-auto text-warm-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-warm-gray-600 font-medium">
                  Arrastra un video o haz clic para seleccionar
                </p>
                <p className="text-xs text-warm-gray-400 mt-1">
                  MP4 o MOV, max 100MB, 3-90 segundos
                </p>
              </div>
            )}
          </div>

          {/* OpusClip Virality Score */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
            <label className="block text-sm font-medium text-warm-gray-700 mb-2">
              Virality Score (OpusClip)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max="99"
                value={viralityScore}
                onChange={(e) => setViralityScore(e.target.value)}
                placeholder="0-99"
                className="w-24 px-3 py-2 border border-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/50 text-center"
              />
              {viralityScore && (
                <span className={`text-sm font-bold ${getScoreColor(parseInt(viralityScore))}`}>
                  {parseInt(viralityScore) >= 85 ? 'Excelente' :
                   parseInt(viralityScore) >= 70 ? 'Bueno' :
                   'Bajo'}
                </span>
              )}
            </div>
            <p className="text-xs text-warm-gray-400 mt-2">
              Opcional. Copia el score del dashboard de OpusClip.
            </p>
          </div>

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
                FB Reels
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
                IG Reels
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Caption */}
        <div className="space-y-6">
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
                  Tema
                </label>
                <input
                  type="text"
                  value={contentTheme}
                  onChange={(e) => setContentTheme(e.target.value)}
                  placeholder="ej: Reconexión interior"
                  className="w-full px-3 py-2 border border-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/50"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateCaption}
              disabled={generatingCaption || !contentTheme.trim()}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
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
                  Generar Caption para Reel
                </>
              )}
            </button>
          </div>

          {/* Caption */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-warm-gray-700">
                Caption del Reel
              </label>
              <span className="text-xs text-warm-gray-400">
                {caption.length} caracteres
              </span>
            </div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Escribe el caption o genera uno con AI..."
              rows={5}
              className="w-full px-4 py-3 border border-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/50 resize-none"
            />
          </div>

          {/* Hashtags */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
            <label className="block text-sm font-medium text-warm-gray-700 mb-2">
              Hashtags
            </label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="#retiromexico #reelsviral #bienestar"
              className="w-full px-4 py-3 border border-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/50"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleUpload}
            disabled={uploading || !videoFile || !caption.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-lg"
          >
            {uploading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Subiendo reel...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Subir Reel para Aprobación
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
