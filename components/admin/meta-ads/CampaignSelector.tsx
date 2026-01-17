'use client';

import { useState, useRef, useEffect } from 'react';

interface Campaign {
  id: string;
  name: string;
  status: string;
}

interface CampaignSelectorProps {
  campaigns: Campaign[];
  selectedCampaigns: string[];
  onSelectionChange: (selected: string[]) => void;
  loading?: boolean;
}

export default function CampaignSelector({
  campaigns,
  selectedCampaigns,
  onSelectionChange,
  loading,
}: CampaignSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allSelected = selectedCampaigns.length === 0 || selectedCampaigns.length === campaigns.length;
  const someSelected = selectedCampaigns.length > 0 && selectedCampaigns.length < campaigns.length;

  const handleSelectAll = () => {
    onSelectionChange([]);
  };

  const handleToggleCampaign = (campaignId: string) => {
    if (selectedCampaigns.includes(campaignId)) {
      // Remove from selection
      const newSelection = selectedCampaigns.filter(id => id !== campaignId);
      onSelectionChange(newSelection);
    } else {
      // Add to selection
      onSelectionChange([...selectedCampaigns, campaignId]);
    }
  };

  const getDisplayText = () => {
    if (allSelected) return 'Todas las campanas';
    if (selectedCampaigns.length === 1) {
      const campaign = campaigns.find(c => c.id === selectedCampaigns[0]);
      return campaign?.name || 'Campana seleccionada';
    }
    return `${selectedCampaigns.length} campanas`;
  };

  if (loading) {
    return (
      <div className="h-10 w-48 bg-warm-gray-100 rounded-xl animate-pulse" />
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-warm-gray-200 rounded-xl hover:border-coral/50 transition-colors text-sm font-medium text-warm-gray-700 shadow-sm"
      >
        <svg className="w-4 h-4 text-warm-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="max-w-[150px] truncate">{getDisplayText()}</span>
        {someSelected && (
          <span className="px-1.5 py-0.5 text-xs bg-coral/10 text-coral rounded-full">
            {selectedCampaigns.length}
          </span>
        )}
        <svg
          className={`w-4 h-4 text-warm-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-warm-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {/* Header */}
          <div className="p-3 border-b border-warm-gray-100 bg-warm-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-warm-gray-700">Filtrar por campana</span>
              <button
                onClick={handleSelectAll}
                className="text-xs text-coral hover:text-coral/80 font-medium"
              >
                {allSelected ? 'Deseleccionar' : 'Seleccionar todas'}
              </button>
            </div>
          </div>

          {/* Campaign List */}
          <div className="max-h-64 overflow-y-auto">
            {/* All Campaigns Option */}
            <label className="flex items-center gap-3 px-4 py-3 hover:bg-warm-gray-50 cursor-pointer border-b border-warm-gray-100">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                className="w-4 h-4 rounded border-warm-gray-300 text-coral focus:ring-coral/50"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-warm-gray-800">Todas las campanas</p>
                <p className="text-xs text-warm-gray-400">{campaigns.length} campanas disponibles</p>
              </div>
              <svg className="w-5 h-5 text-warm-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </label>

            {/* Individual Campaigns */}
            {campaigns.map((campaign) => {
              const isSelected = allSelected || selectedCampaigns.includes(campaign.id);
              const statusColor = campaign.status === 'ACTIVE'
                ? 'bg-green-500'
                : campaign.status === 'PAUSED'
                  ? 'bg-yellow-500'
                  : 'bg-gray-400';

              return (
                <label
                  key={campaign.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-warm-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleToggleCampaign(campaign.id)}
                    className="w-4 h-4 rounded border-warm-gray-300 text-coral focus:ring-coral/50"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-warm-gray-800 truncate">
                      {campaign.name}
                    </p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${statusColor}`} title={campaign.status} />
                </label>
              );
            })}
          </div>

          {/* Footer */}
          {someSelected && (
            <div className="p-3 border-t border-warm-gray-100 bg-warm-gray-50">
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="w-full py-2 bg-coral text-white rounded-lg text-sm font-medium hover:bg-coral/90 transition-colors"
              >
                Aplicar filtro
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
