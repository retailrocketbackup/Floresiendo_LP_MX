'use client';

interface EngagementData {
  postEngagement: number;
  postReactions: number;
  postSaves: number;
  videoViews: number;
  comments: number;
  shares: number;
  messagingStarted: number;
  pageEngagement: number;
}

interface EngagementMetricsProps {
  data: EngagementData;
  loading?: boolean;
}

// Skeleton loader
function EngagementSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-40 bg-warm-gray-200 rounded mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-24 bg-warm-gray-200 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// Format helper
function formatNumber(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toLocaleString('es-MX');
}

// Individual engagement card
function EngagementCard({
  label,
  value,
  icon,
  color,
  description,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  description?: string;
}) {
  return (
    <div
      className="rounded-xl p-4 border-2 transition-all hover:shadow-md hover:scale-[1.02]"
      style={{
        backgroundColor: color + '10',
        borderColor: color + '30',
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: color + '20' }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        <span
          className="text-2xl font-bold"
          style={{ color }}
        >
          {formatNumber(value)}
        </span>
      </div>
      <p className="text-sm font-medium text-warm-gray-700">{label}</p>
      {description && (
        <p className="text-xs text-warm-gray-400 mt-1">{description}</p>
      )}
    </div>
  );
}

// Icons for engagement types
const icons = {
  engagement: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  reactions: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  saves: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  ),
  video: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  comments: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  shares: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  ),
  messaging: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  page: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  ),
};

// Colors for each metric
const colors = {
  postEngagement: '#E07A5F',   // coral
  postReactions: '#F59E0B',    // amber
  postSaves: '#8B5CF6',        // purple
  videoViews: '#3B82F6',       // blue
  comments: '#10B981',         // green
  shares: '#EC4899',           // pink
  messagingStarted: '#06B6D4', // cyan
  pageEngagement: '#6366F1',   // indigo
};

export default function EngagementMetrics({ data, loading }: EngagementMetricsProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-warm-gray-200 p-6 shadow-sm">
        <EngagementSkeleton />
      </div>
    );
  }

  // Calculate total engagement
  const totalEngagement =
    data.postEngagement +
    data.postReactions +
    data.postSaves +
    data.videoViews +
    data.comments +
    data.shares +
    data.messagingStarted +
    data.pageEngagement;

  // Define engagement cards config
  const engagementCards = [
    {
      key: 'postEngagement',
      label: 'Interacciones',
      value: data.postEngagement,
      icon: icons.engagement,
      color: colors.postEngagement,
      description: 'Likes, comentarios, shares',
    },
    {
      key: 'videoViews',
      label: 'Vistas de Video',
      value: data.videoViews,
      icon: icons.video,
      color: colors.videoViews,
      description: 'Reproducciones de video',
    },
    {
      key: 'postReactions',
      label: 'Reacciones',
      value: data.postReactions,
      icon: icons.reactions,
      color: colors.postReactions,
      description: 'Me gusta, love, wow...',
    },
    {
      key: 'postSaves',
      label: 'Guardados',
      value: data.postSaves,
      icon: icons.saves,
      color: colors.postSaves,
      description: 'Posts guardados',
    },
    {
      key: 'comments',
      label: 'Comentarios',
      value: data.comments,
      icon: icons.comments,
      color: colors.comments,
      description: 'Comentarios en posts',
    },
    {
      key: 'shares',
      label: 'Compartidos',
      value: data.shares,
      icon: icons.shares,
      color: colors.shares,
      description: 'Veces compartido',
    },
    {
      key: 'messagingStarted',
      label: 'Mensajes Iniciados',
      value: data.messagingStarted,
      icon: icons.messaging,
      color: colors.messagingStarted,
      description: 'Conversaciones nuevas',
    },
    {
      key: 'pageEngagement',
      label: 'Engagement de Pagina',
      value: data.pageEngagement,
      icon: icons.page,
      color: colors.pageEngagement,
      description: 'Interacciones con la pagina',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-warm-gray-200 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-warm-gray-800">
            Metricas de Engagement
          </h3>
          <p className="text-sm text-warm-gray-500">
            Interacciones totales con el contenido
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-coral">{formatNumber(totalEngagement)}</p>
          <p className="text-xs text-warm-gray-400">Engagement Total</p>
        </div>
      </div>

      {/* Engagement cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {engagementCards.map((card) => (
          <EngagementCard
            key={card.key}
            label={card.label}
            value={card.value}
            icon={card.icon}
            color={card.color}
            description={card.description}
          />
        ))}
      </div>

      {/* Engagement breakdown bar */}
      <div className="mt-6">
        <p className="text-xs font-medium text-warm-gray-500 mb-2">
          Distribucion de Engagement
        </p>
        <div className="h-4 bg-warm-gray-100 rounded-full overflow-hidden flex">
          {engagementCards
            .filter((card) => card.value > 0)
            .sort((a, b) => b.value - a.value)
            .map((card) => {
              const percentage = (card.value / totalEngagement) * 100;
              if (percentage < 1) return null;
              return (
                <div
                  key={card.key}
                  className="h-full transition-all"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: card.color,
                  }}
                  title={`${card.label}: ${formatNumber(card.value)} (${percentage.toFixed(1)}%)`}
                />
              );
            })}
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-3">
          {engagementCards
            .filter((card) => card.value > 0)
            .sort((a, b) => b.value - a.value)
            .slice(0, 4)
            .map((card) => (
              <div key={card.key} className="flex items-center gap-1 text-xs text-warm-gray-500">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: card.color }}
                />
                {card.label}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
