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
  /** Render the campaign list inline (no dropdown popup). Use when inside a parent menu. */
  inline?: boolean;
}

export default function CampaignSelector({
  campaigns,
  selectedCampaigns,
  onSelectionChange,
  loading,
  inline = false,
}: CampaignSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (inline) return; // No dropdown to close in inline mode
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [inline]);

  // Standard multi-select logic:
  // - Empty array = nothing selected (show all data by default)
  // - Array with IDs = those specific campaigns are selected
  const allSelected = campaigns.length > 0 && selectedCampaigns.length === campaigns.length;
  const noneSelected = selectedCampaigns.length === 0;
  const someSelected = !allSelected && !noneSelected;

  const handleSelectAll = () => {
    if (allSelected) {
      // Deselect all
      onSelectionChange([]);
    } else {
      // Select all
      onSelectionChange(campaigns.map(c => c.id));
    }
  };

  const handleToggleCampaign = (campaignId: string) => {
    if (selectedCampaigns.includes(campaignId)) {
      // Remove from selection
      onSelectionChange(selectedCampaigns.filter(id => id !== campaignId));
    } else {
      // Add to selection
      onSelectionChange([...selectedCampaigns, campaignId]);
    }
  };

  const getDisplayText = () => {
    if (allSelected) return 'Todas las campañas';
    if (noneSelected) return 'Todas las campañas'; // Show all when none specifically selected
    if (selectedCampaigns.length === 1) {
      const campaign = campaigns.find(c => c.id === selectedCampaigns[0]);
      return campaign?.name || 'Campaña seleccionada';
    }
    return `${selectedCampaigns.length} campañas`;
  };

  if (loading) {
    return (
      <div className="h-10 w-48 bg-warm-gray-100 rounded-xl animate-pulse" />
    );
  }

  // Shared campaign list content
  const campaignList = (
    <>
      {/* Header */}
      <div className={`flex items-center justify-between ${inline ? 'pb-2' : 'p-3 border-b border-warm-gray-100 bg-warm-gray-50'}`}>
        <span className="text-sm font-medium text-warm-gray-700">Filtrar por campaña</span>
        <button
          onClick={handleSelectAll}
          className="flex items-center gap-1 text-xs text-coral hover:text-coral/80 font-medium"
        >
          {allSelected ? (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          Todas
        </button>
      </div>

      {/* Campaign List */}
      <div className={`${inline ? 'max-h-52' : 'max-h-64'} overflow-y-auto`}>
        {/* All Campaigns Option */}
        <label className={`flex items-center gap-3 px-3 py-2 hover:bg-warm-gray-50 cursor-pointer border-b border-warm-gray-100 ${inline ? 'rounded-t-lg' : ''}`}>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAll}
            className="w-4 h-4 rounded border-warm-gray-300 text-coral focus:ring-coral/50"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-warm-gray-800">Todas las campañas</p>
            <p className="text-xs text-warm-gray-400">{campaigns.length} campañas disponibles</p>
          </div>
        </label>

        {/* Individual Campaigns */}
        {campaigns.map((campaign) => {
          const isSelected = selectedCampaigns.includes(campaign.id);
          const statusColor = campaign.status === 'ACTIVE'
            ? 'bg-green-500'
            : campaign.status === 'PAUSED'
              ? 'bg-yellow-500'
              : 'bg-gray-400';

          return (
            <label
              key={campaign.id}
              className="flex items-center gap-3 px-3 py-2 hover:bg-warm-gray-50 cursor-pointer"
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
    </>
  );

  // Inline mode: render list directly without dropdown wrapper
  if (inline) {
    return (
      <div className="border border-warm-gray-200 rounded-xl overflow-hidden bg-white">
        {campaignList}
      </div>
    );
  }

  // Dropdown mode: trigger button + popup
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 bg-white border border-warm-gray-200 rounded-xl hover:border-coral/50 transition-colors text-sm font-medium text-warm-gray-700 shadow-sm w-auto sm:w-[200px] min-w-0"
      >
        <svg className="w-4 h-4 text-warm-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="hidden sm:block flex-1 truncate text-left">{getDisplayText()}</span>
        {someSelected && (
          <span className="px-1.5 py-0.5 text-xs bg-coral/10 text-coral rounded-full flex-shrink-0">
            {selectedCampaigns.length}
          </span>
        )}
        <svg
          className={`w-4 h-4 text-warm-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 sm:left-0 sm:right-auto mt-2 w-[calc(100vw-2rem)] sm:w-72 max-w-[288px] bg-white border border-warm-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {campaignList}

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
