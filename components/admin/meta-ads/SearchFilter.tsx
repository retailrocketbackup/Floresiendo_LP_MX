'use client';

import { useState } from 'react';

interface SearchFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusFilter: 'all' | 'ACTIVE' | 'PAUSED';
  onStatusFilterChange: (status: 'all' | 'ACTIVE' | 'PAUSED') => void;
  totalCount: number;
  filteredCount: number;
}

export default function SearchFilter({
  searchValue,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalCount,
  filteredCount,
}: SearchFilterProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md w-full">
        <div
          className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${
            isFocused ? 'text-coral' : 'text-warm-gray-400'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Buscar campanas..."
          className="w-full pl-10 pr-4 py-2.5 border border-warm-gray-200 rounded-xl bg-white text-warm-gray-700 placeholder-warm-gray-400 focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
        />
        {searchValue && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-warm-gray-400 hover:text-warm-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-3">
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as 'all' | 'ACTIVE' | 'PAUSED')}
          className="px-3 py-2.5 border border-warm-gray-200 rounded-xl bg-white text-warm-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all cursor-pointer"
        >
          <option value="all">Todos los estados</option>
          <option value="ACTIVE">Activos</option>
          <option value="PAUSED">Pausados</option>
        </select>

        {/* Results Count */}
        <div className="text-sm text-warm-gray-500 whitespace-nowrap">
          {filteredCount === totalCount ? (
            <span>{totalCount} campana{totalCount !== 1 ? 's' : ''}</span>
          ) : (
            <span>
              {filteredCount} de {totalCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
