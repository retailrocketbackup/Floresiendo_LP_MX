'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ScheduledPost } from '@/lib/social-publisher';

interface ApprovalQueueProps {
  posts: ScheduledPost[];
  loading: boolean;
  onApprove: (postId: string, scheduledFor?: Date) => void;
  onReject: (postId: string, reason: string) => void;
  onRefresh: () => void;
}

export function ApprovalQueue({
  posts,
  loading,
  onApprove,
  onReject,
  onRefresh,
}: ApprovalQueueProps) {
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const handleApprove = (post: ScheduledPost) => {
    const scheduledFor = scheduleDate && scheduleTime
      ? new Date(`${scheduleDate}T${scheduleTime}`)
      : undefined;
    onApprove(post.id, scheduledFor);
    setSelectedPost(null);
    setScheduleDate('');
    setScheduleTime('');
  };

  const handleReject = () => {
    if (selectedPost && rejectReason.trim()) {
      onReject(selectedPost.id, rejectReason);
      setShowRejectModal(false);
      setSelectedPost(null);
      setRejectReason('');
    }
  };

  const getPlatformIcon = (platforms: string[]) => {
    const hasFB = platforms.includes('facebook');
    const hasIG = platforms.includes('instagram');

    return (
      <div className="flex gap-1">
        {hasFB && (
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
        )}
        {hasIG && (
          <div className="w-6 h-6 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
        )}
      </div>
    );
  };

  const getComplianceStatus = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
            Cumple
          </span>
        );
      case 'flagged':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
            Revisar
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
            Rechazado
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium bg-warm-gray-100 text-warm-gray-600 rounded-full">
            Pendiente
          </span>
        );
    }
  };

  if (loading && posts.length === 0) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100 animate-pulse">
            <div className="flex gap-4">
              <div className="w-32 h-32 bg-warm-gray-200 rounded-lg" />
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-warm-gray-200 rounded w-3/4" />
                <div className="h-3 bg-warm-gray-200 rounded w-1/2" />
                <div className="h-3 bg-warm-gray-200 rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-warm-gray-100 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-warm-gray-800 mb-2">
          No hay posts pendientes
        </h3>
        <p className="text-warm-gray-500 mb-6">
          Todos los posts han sido revisados. Crea nuevos contenidos para tu audiencia.
        </p>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-coral text-white rounded-lg font-medium hover:bg-coral/90 transition-colors"
        >
          Actualizar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-warm-gray-800">
          Posts Pendientes de Aprobación
        </h2>
        <span className="px-3 py-1 bg-coral/10 text-coral rounded-full text-sm font-medium">
          {posts.length} pendiente{posts.length !== 1 ? 's' : ''}
        </span>
      </div>

      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-xl shadow-sm border border-warm-gray-100 overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="p-6">
            <div className="flex gap-6">
              {/* Media Preview */}
              {post.media_urls && post.media_urls.length > 0 && (
                <div className="w-32 h-32 flex-shrink-0 relative rounded-lg overflow-hidden bg-warm-gray-100">
                  <Image
                    src={post.media_urls[0]}
                    alt="Post preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    {getPlatformIcon(post.platforms)}
                    {getComplianceStatus(post.compliance_status)}
                    {post.image_source === 'ai_generated' && (
                      <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                        AI Generado
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-warm-gray-400">
                    {new Date(post.created_at).toLocaleDateString('es-MX', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                {/* Caption Preview */}
                <p className="text-warm-gray-700 text-sm line-clamp-3 mb-3">
                  {post.caption}
                </p>

                {/* Flagged Terms */}
                {post.flagged_terms && post.flagged_terms.length > 0 && (
                  <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs font-medium text-yellow-800 mb-1">
                      Términos que requieren revisión:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {post.flagged_terms.map((term, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs bg-yellow-200 text-yellow-800 rounded"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hashtags */}
                {post.hashtags && post.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.hashtags.slice(0, 5).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs text-blue-600"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.hashtags.length > 5 && (
                      <span className="text-xs text-warm-gray-400">
                        +{post.hashtags.length - 5} más
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-warm-gray-100">
              {/* Schedule Inputs */}
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={selectedPost?.id === post.id ? scheduleDate : ''}
                  onChange={(e) => {
                    setSelectedPost(post);
                    setScheduleDate(e.target.value);
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  className="px-3 py-1.5 text-sm border border-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/50"
                />
                <input
                  type="time"
                  value={selectedPost?.id === post.id ? scheduleTime : ''}
                  onChange={(e) => {
                    setSelectedPost(post);
                    setScheduleTime(e.target.value);
                  }}
                  className="px-3 py-1.5 text-sm border border-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/50"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedPost(post);
                    setShowRejectModal(true);
                  }}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Rechazar
                </button>
                <button
                  onClick={() => handleApprove(post)}
                  className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {scheduleDate && scheduleTime ? 'Aprobar y Programar' : 'Aprobar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-warm-gray-800 mb-4">
              Rechazar Post
            </h3>
            <p className="text-sm text-warm-gray-500 mb-4">
              Por favor, indica el motivo del rechazo:
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Motivo del rechazo..."
              rows={4}
              className="w-full px-4 py-3 border border-warm-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/50 resize-none"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                }}
                className="px-4 py-2 text-sm font-medium text-warm-gray-600 hover:bg-warm-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectReason.trim()}
                className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                Confirmar Rechazo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
