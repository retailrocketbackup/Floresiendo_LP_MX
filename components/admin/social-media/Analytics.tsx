'use client';

import { useMemo } from 'react';
import type { ScheduledPost } from '@/lib/social-publisher';

interface AnalyticsProps {
  posts: ScheduledPost[];
  loading: boolean;
}

export function Analytics({ posts, loading }: AnalyticsProps) {
  // Calculate analytics
  const analytics = useMemo(() => {
    const totalPosts = posts.length;
    const fbPosts = posts.filter((p) => p.platforms.includes('facebook')).length;
    const igPosts = posts.filter((p) => p.platforms.includes('instagram')).length;
    const aiGenerated = posts.filter((p) => p.image_source === 'ai_generated').length;
    const brandAssets = posts.filter((p) => p.image_source === 'brand_asset').length;

    // Posts by funnel
    const byFunnel = {
      general: posts.filter((p) => p.funnel === 'general').length,
      duelo: posts.filter((p) => p.funnel === 'duelo').length,
      proposito: posts.filter((p) => p.funnel === 'proposito').length,
      estres: posts.filter((p) => p.funnel === 'estres').length,
    };

    // Posts by day of week
    const byDayOfWeek = [0, 0, 0, 0, 0, 0, 0];
    posts.forEach((post) => {
      if (post.published_at) {
        const day = new Date(post.published_at).getDay();
        byDayOfWeek[day]++;
      }
    });

    // Recent posts (last 7 days)
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const recentPosts = posts.filter((p) => {
      if (!p.published_at) return false;
      return new Date(p.published_at) >= weekAgo;
    });

    return {
      totalPosts,
      fbPosts,
      igPosts,
      aiGenerated,
      brandAssets,
      byFunnel,
      byDayOfWeek,
      recentPosts: recentPosts.length,
    };
  }, [posts]);

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100 animate-pulse">
            <div className="h-6 bg-warm-gray-200 rounded w-32 mb-4" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="h-24 bg-warm-gray-100 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-warm-gray-100 text-center">
        <div className="w-16 h-16 bg-warm-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-warm-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-warm-gray-800 mb-2">
          Sin datos de análisis
        </h3>
        <p className="text-warm-gray-500">
          Publica contenido para comenzar a ver métricas.
        </p>
      </div>
    );
  }

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
          <p className="text-sm text-warm-gray-500 mb-1">Total Publicados</p>
          <p className="text-3xl font-bold text-warm-gray-800">{analytics.totalPosts}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
          <p className="text-sm text-warm-gray-500 mb-1">Últimos 7 días</p>
          <p className="text-3xl font-bold text-green-600">{analytics.recentPosts}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-blue-600 rounded-full" />
            <p className="text-sm text-warm-gray-500">Facebook</p>
          </div>
          <p className="text-3xl font-bold text-blue-600">{analytics.fbPosts}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
            <p className="text-sm text-warm-gray-500">Instagram</p>
          </div>
          <p className="text-3xl font-bold text-pink-600">{analytics.igPosts}</p>
        </div>
      </div>

      {/* Content Source */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
        <h3 className="text-lg font-semibold text-warm-gray-800 mb-4">Origen del Contenido</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-700">{analytics.aiGenerated}</p>
              <p className="text-sm text-purple-600">Generados con AI</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-coral/10 rounded-lg">
            <div className="w-12 h-12 bg-coral/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-coral">{analytics.brandAssets}</p>
              <p className="text-sm text-coral">Assets de marca</p>
            </div>
          </div>
        </div>
      </div>

      {/* By Funnel */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
        <h3 className="text-lg font-semibold text-warm-gray-800 mb-4">Posts por Funnel</h3>
        <div className="space-y-3">
          {Object.entries(analytics.byFunnel).map(([funnel, count]) => {
            const percentage = analytics.totalPosts > 0 ? (count / analytics.totalPosts) * 100 : 0;
            const colors: Record<string, string> = {
              general: 'bg-warm-gray-500',
              duelo: 'bg-blue-500',
              proposito: 'bg-green-500',
              estres: 'bg-orange-500',
            };
            const labels: Record<string, string> = {
              general: 'General',
              duelo: 'Duelo',
              proposito: 'Propósito',
              estres: 'Estrés',
            };

            return (
              <div key={funnel}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-warm-gray-700">{labels[funnel]}</span>
                  <span className="text-sm text-warm-gray-500">{count} posts</span>
                </div>
                <div className="h-2 bg-warm-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${colors[funnel]} rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* By Day of Week */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
        <h3 className="text-lg font-semibold text-warm-gray-800 mb-4">Publicaciones por Día</h3>
        <div className="flex items-end justify-between gap-2 h-32">
          {analytics.byDayOfWeek.map((count, index) => {
            const maxCount = Math.max(...analytics.byDayOfWeek, 1);
            const height = (count / maxCount) * 100;

            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center justify-end h-20">
                  <div
                    className="w-full bg-coral rounded-t transition-all duration-500"
                    style={{ height: `${height}%`, minHeight: count > 0 ? '8px' : '0' }}
                  />
                </div>
                <span className="text-xs text-warm-gray-500">{dayNames[index]}</span>
                <span className="text-xs font-medium text-warm-gray-700">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Optimal Posting Times */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
        <h3 className="text-lg font-semibold text-warm-gray-800 mb-4">Horarios Óptimos Sugeridos</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <span className="font-medium text-warm-gray-700">Facebook</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-warm-gray-500">Entre semana:</span>
                <span className="font-medium text-warm-gray-700">9am, 1pm, 5pm, 8pm</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-warm-gray-500">Fin de semana:</span>
                <span className="font-medium text-warm-gray-700">10am, 2pm, 7pm</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <span className="font-medium text-warm-gray-700">Instagram</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-warm-gray-500">Entre semana:</span>
                <span className="font-medium text-warm-gray-700">7am, 12pm, 7pm, 9pm</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-warm-gray-500">Fin de semana:</span>
                <span className="font-medium text-warm-gray-700">9am, 11am, 6pm</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-warm-gray-400 mt-4">
          Horarios óptimos basados en mejores prácticas para audiencias en México (CST)
        </p>
      </div>
    </div>
  );
}
