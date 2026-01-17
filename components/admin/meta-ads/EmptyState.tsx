'use client';

interface EmptyStateProps {
  icon?: 'chart' | 'campaign' | 'conversion' | 'search' | 'error';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const icons = {
  chart: (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  campaign: (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  conversion: (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  search: (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  error: (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
};

export default function EmptyState({ icon = 'chart', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-[fade-in_0.3s_ease-out]">
      <div className="text-warm-gray-300 mb-4">
        {icons[icon]}
      </div>
      <h3 className="text-lg font-semibold text-warm-gray-700 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-warm-gray-500 max-w-sm mb-4">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-coral text-white rounded-lg font-medium hover:bg-coral/90 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// Specific empty states for different sections
export function ChartEmptyState() {
  return (
    <EmptyState
      icon="chart"
      title="Sin datos para mostrar"
      description="No hay datos de rendimiento para el periodo seleccionado. Prueba con un rango de fechas diferente."
    />
  );
}

export function CampaignEmptyState({ onRefresh }: { onRefresh?: () => void }) {
  return (
    <EmptyState
      icon="campaign"
      title="No hay campanas"
      description="Crea tu primera campana en Meta Business Suite para comenzar a ver datos aqui."
      action={onRefresh ? { label: 'Actualizar', onClick: onRefresh } : undefined}
    />
  );
}

export function ConversionEmptyState() {
  return (
    <EmptyState
      icon="conversion"
      title="Sin conversiones"
      description="No se han registrado conversiones en el periodo seleccionado."
    />
  );
}

export function SearchEmptyState({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <EmptyState
      icon="search"
      title={`Sin resultados para "${query}"`}
      description="Intenta con otros terminos de busqueda o limpia los filtros."
      action={{ label: 'Limpiar busqueda', onClick: onClear }}
    />
  );
}

export function ErrorEmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <EmptyState
      icon="error"
      title="Error al cargar datos"
      description="Hubo un problema al obtener la informacion. Por favor intenta de nuevo."
      action={{ label: 'Reintentar', onClick: onRetry }}
    />
  );
}
