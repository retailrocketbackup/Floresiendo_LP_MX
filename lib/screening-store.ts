// lib/screening-store.ts
// Zustand store with localStorage persistence for screening wizard

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  ScreeningStore,
  ScreeningStoreState,
  BasicInfoData,
  MedicalHistoryData,
  MedicationsData,
  MentalHealthData,
  LifestyleData,
  IntentionsData,
  ConsentData,
  RiskLevel,
} from './screening-types';
import { evaluateRiskLevel } from './screening-logic';

// Debounce helper
function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return ((...args: unknown[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  }) as T;
}

// Callback to notify when save completes (set by component)
let onSaveCompleteCallback: (() => void) | null = null;
export function setOnSaveComplete(callback: (() => void) | null) {
  onSaveCompleteCallback = callback;
}

// Debounced localStorage storage to prevent excessive writes
const debouncedStorage = createJSONStorage(() => {
  const debouncedSetItem = debounce((name: string, value: string) => {
    try {
      localStorage.setItem(name, value);
      // Notify that save completed
      if (onSaveCompleteCallback) {
        onSaveCompleteCallback();
      }
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, 800); // Increased debounce for smoother UX

  return {
    getItem: (name: string) => {
      try {
        return localStorage.getItem(name);
      } catch {
        return null;
      }
    },
    setItem: (name: string, value: string) => {
      debouncedSetItem(name, value);
    },
    removeItem: (name: string) => {
      try {
        localStorage.removeItem(name);
      } catch {
        // ignore
      }
    },
  };
});

const initialState: ScreeningStoreState = {
  formData: {},
  currentStep: 1,
  riskLevel: 'green',
  riskMessages: [],
  completionPercentage: 0,
  lastSavedAt: null,
  applicationId: null,
};

export const useScreeningStore = create<ScreeningStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      updateBasicInfo: (data: Partial<BasicInfoData>) => {
        set((state) => ({
          formData: {
            ...state.formData,
            basicInfo: { ...state.formData.basicInfo, ...data } as BasicInfoData,
          },
          // lastSavedAt removed - save indicator managed separately to prevent re-renders
        }));
      },

      updateMedicalHistory: (data: Partial<MedicalHistoryData>) => {
        set((state) => ({
          formData: {
            ...state.formData,
            medicalHistory: { ...state.formData.medicalHistory, ...data } as MedicalHistoryData,
          },
        }));
      },

      updateMedications: (data: Partial<MedicationsData>) => {
        set((state) => ({
          formData: {
            ...state.formData,
            medications: { ...state.formData.medications, ...data } as MedicationsData,
          },
        }));
      },

      updateMentalHealth: (data: Partial<MentalHealthData>) => {
        set((state) => ({
          formData: {
            ...state.formData,
            mentalHealth: { ...state.formData.mentalHealth, ...data } as MentalHealthData,
          },
        }));
      },

      updateLifestyle: (data: Partial<LifestyleData>) => {
        set((state) => ({
          formData: {
            ...state.formData,
            lifestyle: { ...state.formData.lifestyle, ...data } as LifestyleData,
          },
        }));
      },

      updateIntentions: (data: Partial<IntentionsData>) => {
        set((state) => ({
          formData: {
            ...state.formData,
            intentions: { ...state.formData.intentions, ...data } as IntentionsData,
          },
        }));
      },

      updateConsent: (data: Partial<ConsentData>) => {
        set((state) => ({
          formData: {
            ...state.formData,
            consent: { ...state.formData.consent, ...data } as ConsentData,
          },
        }));
      },

      setStep: (step: number) => {
        set({ currentStep: Math.max(1, Math.min(step, 7)) });
      },

      nextStep: () => {
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 7),
        }));
      },

      prevStep: () => {
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        }));
      },

      evaluateRisk: () => {
        const { formData } = get();
        return evaluateRiskLevel(formData);
      },

      resetForm: () => {
        set(initialState);
      },

      setApplicationId: (id: string) => {
        set({ applicationId: id });
      },
    }),
    {
      name: 'floresiendo-screening',
      storage: debouncedStorage,
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
        applicationId: state.applicationId,
      }),
    }
  )
);

// Helper hook to calculate completion percentage - memoized to prevent excessive recalculation
export function useCompletionPercentage(): number {
  // Use shallow comparison selector to only recalculate when form structure changes
  const formData = useScreeningStore((state) => state.formData);

  // Memoize the calculation by checking if form data changed
  const calculatePercentage = () => {
    let filledFields = 0;

    // Count filled fields per section
    const sections = [
      formData.basicInfo,
      formData.medicalHistory,
      formData.medications,
      formData.mentalHealth,
      formData.lifestyle,
      formData.intentions,
      formData.consent,
    ];

    for (const section of sections) {
      if (section) {
        const entries = Object.entries(section);
        filledFields += entries.filter(([, value]) =>
          value !== undefined && value !== '' && value !== null
        ).length;
      }
    }

    // Estimate total expected fields (44 questions = roughly 44+ fields)
    const expectedTotal = 49; // 7 + 8 + 8 + 11 + 6 + 4 + 5
    return Math.round((filledFields / expectedTotal) * 100);
  };

  return calculatePercentage();
}
