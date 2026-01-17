'use client';

import type { ConversionRow } from '@/lib/meta-ads-types';

interface ConversionsTableProps {
  conversions: ConversionRow[];
  loading?: boolean;
}

function formatCurrency(value: number | undefined): string {
  if (!value) return '-';
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export default function ConversionsTable({ conversions, loading }: ConversionsTableProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-12 bg-warm-gray-100 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (conversions.length === 0) {
    return (
      <div className="text-center py-6 text-warm-gray-500">
        <p>Sin conversiones registradas</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card Layout */}
      <div className="sm:hidden space-y-3">
        {conversions.map((conversion) => (
          <div
            key={conversion.action_type}
            className="bg-warm-gray-50 rounded-lg p-3"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0 pr-2">
                <p className="font-medium text-warm-gray-800 text-sm truncate">{conversion.label}</p>
                <p className="text-xs text-warm-gray-400 truncate">{conversion.action_type}</p>
              </div>
              <span className="font-bold text-green-600 text-lg">
                {conversion.count.toLocaleString('es-MX')}
              </span>
            </div>
            {conversion.cost_per && (
              <div className="flex items-center justify-between pt-2 border-t border-warm-gray-200">
                <span className="text-xs text-warm-gray-500">Costo por conversión</span>
                <span className="text-sm font-medium text-warm-gray-700">
                  {formatCurrency(conversion.cost_per)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-warm-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-warm-gray-500 uppercase">
                Conversión
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-warm-gray-500 uppercase">
                Cantidad
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-warm-gray-500 uppercase">
                Costo por Conversión
              </th>
            </tr>
          </thead>
          <tbody>
            {conversions.map((conversion) => (
              <tr
                key={conversion.action_type}
                className="border-b border-warm-gray-100 hover:bg-warm-gray-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <p className="font-medium text-warm-gray-800">{conversion.label}</p>
                  <p className="text-xs text-warm-gray-400">{conversion.action_type}</p>
                </td>
                <td className="py-3 px-4 text-right">
                  <span className="font-semibold text-green-600">
                    {conversion.count.toLocaleString('es-MX')}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <span className="text-warm-gray-600">
                    {formatCurrency(conversion.cost_per)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
