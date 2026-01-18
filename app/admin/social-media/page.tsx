'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ContentCalendar } from '@/components/admin/social-media/ContentCalendar';
import { PostCreator } from '@/components/admin/social-media/PostCreator';
import { ApprovalQueue } from '@/components/admin/social-media/ApprovalQueue';
import { Analytics } from '@/components/admin/social-media/Analytics';
import type { ScheduledPost } from '@/lib/social-publisher';

type Tab = 'calendar' | 'create' | 'queue' | 'analytics';

export default function SocialMediaDashboardPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // UI state
  const [activeTab, setActiveTab] = useState<Tab>('queue');
  const [loading, setLoading] = useState(false);

  // Data state
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [pendingCount, setPendingCount] = useState(0);

  // Auth handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_session', 'true');
      localStorage.setItem('admin_password', password);
    } else {
      setAuthError('Contraseña incorrecta');
    }
  };

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const storedPassword = localStorage.getItem('admin_password');
      const res = await fetch(`/api/social/queue?password=${storedPassword}`);

      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false);
          localStorage.removeItem('admin_session');
          localStorage.removeItem('admin_password');
          return;
        }
        throw new Error('Error al obtener posts');
      }

      const data = await res.json();
      setPosts(data.posts || []);
      setPendingCount(data.pendingCount || 0);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Check session on mount
  useEffect(() => {
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isDev || localStorage.getItem('admin_session') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch posts when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  // Handle post approval
  const handleApprove = async (postId: string, scheduledFor?: Date) => {
    try {
      const storedPassword = localStorage.getItem('admin_password');
      const res = await fetch(`/api/social/approve/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: storedPassword,
          scheduledFor: scheduledFor?.toISOString(),
        }),
      });

      if (res.ok) {
        fetchPosts();
      }
    } catch (err) {
      console.error('Error approving post:', err);
    }
  };

  // Handle post rejection
  const handleReject = async (postId: string, reason: string) => {
    try {
      const storedPassword = localStorage.getItem('admin_password');
      const res = await fetch(`/api/social/reject/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: storedPassword,
          reason,
        }),
      });

      if (res.ok) {
        fetchPosts();
      }
    } catch (err) {
      console.error('Error rejecting post:', err);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_session');
    localStorage.removeItem('admin_password');
  };

  // Tab configuration
  const tabs: { id: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'queue',
      label: 'Cola de Aprobación',
      badge: pendingCount,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 'create',
      label: 'Crear Post',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      id: 'calendar',
      label: 'Calendario',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'analytics',
      label: 'Análisis',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  // Auth screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-warm-cream to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-[fade-in_0.3s_ease-out]">
          <div className="text-center mb-8">
            <Image
              src="/floresiendo-logo-boton.webp"
              alt="Floresiendo"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-warm-gray-800">Social Media Dashboard</h1>
            <p className="text-warm-gray-500 mt-2">Ingresa tu contraseña de administrador</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 border border-warm-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral"
            />
            {authError && (
              <p className="text-red-500 text-sm">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-coral text-white py-3 rounded-xl font-semibold hover:bg-coral/90 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-cream to-white">
      {/* Header */}
      <header className="bg-white border-b border-warm-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/floresiendo-logo-boton.webp"
                alt="Floresiendo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-warm-gray-800">Social Media</h1>
                  <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full">
                    FB + IG
                  </span>
                </div>
                <p className="text-sm text-warm-gray-500">
                  Publicaciones orgánicas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Refresh */}
              <button
                onClick={fetchPosts}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2.5 bg-coral text-white rounded-xl hover:bg-coral/90 transition-colors disabled:opacity-50 font-medium text-sm shadow-sm"
              >
                <svg
                  className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2.5 bg-warm-gray-100 text-warm-gray-600 rounded-xl hover:bg-warm-gray-200 transition-colors font-medium text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-4 -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-coral text-coral bg-coral/5'
                    : 'border-transparent text-warm-gray-500 hover:text-warm-gray-700 hover:border-warm-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-coral text-white rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'queue' && (
          <ApprovalQueue
            posts={posts.filter(p => p.approval_status === 'pending')}
            loading={loading}
            onApprove={handleApprove}
            onReject={handleReject}
            onRefresh={fetchPosts}
          />
        )}

        {activeTab === 'create' && (
          <PostCreator
            onPostCreated={() => {
              setActiveTab('queue');
              fetchPosts();
            }}
          />
        )}

        {activeTab === 'calendar' && (
          <ContentCalendar
            posts={posts.filter(p => p.publish_status === 'scheduled' || p.publish_status === 'published')}
            loading={loading}
          />
        )}

        {activeTab === 'analytics' && (
          <Analytics
            posts={posts.filter(p => p.publish_status === 'published')}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
}
