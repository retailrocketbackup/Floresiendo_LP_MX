// lib/screening-store.ts
// Zustand store with localStorage persistence for screening wizard

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
          lastSavedAt: new Date().toISOString(),
        }));
        // Re-evaluate risk after each update
        const result = get().evaluateRisk();
        set({ riskLevel: result.level, riskMessages: result.messages });
      },

      updateMedicalHistory: (data: Partial<MedicalHistoryData>) => {
        set((state) => ({
          formData: {
            ...state.formData,
            medicalHistory: { ...state.formData.medicalHistory, ...data } as MedicalHistoryData,
          },
          lastSavedAt: new Date().toISOString(),
        }));
        const result = get().evaluateRisk();
        set({ riskLevel: result.level, riskMessages: result.messages });
      },

      updateMedications: (data: Partial<MedicationsData>) => {
        set((state) => ({
          formData: {
            ...state.formData,
            medications: { ...state.formData.medications, ...data } as MedicationsData,
          },
          lastSavedAt: new Date().toISOString(),
        }));
        const result = get().evaluateRisk();
        set({ riskLevel: result.level, riskMessages: result.messages });
      },

      updateMentalHealth: (data: Partial<MentalHealthData>) => {
        set((state) => ({
          formData: {
            ...state.formData,
            mentalHealth: { ...state.formData.mentalHealth, ...data } as MentalHealthData,
          },
          lastSavedAt: new Date().toISOString(),
        }));
        const result = get().evaluateRisk();
        set({ riskLevel: result.level, riskMessages: result.messages });
      },

      updateLifestyle: (data: Partial<LifestyleData>) => {
        set((state) => ({
          formData: {
            ...state.formData,
            lifestyle: { ...state.formData.lifestyle, ...data } as LifestyleData,
          },
          lastSavedAt: new Date().toISOString(),
        }));
        const result = get().evaluateRisk();
        set({ riskLevel: result.level, riskMessages: result.messages });
      },

      updateIntentions: (data: Partial<IntentionsData>) => {
        set((state) => ({
          formData: {
            ...state.formData,
            intentions: { ...state.formData.intentions, ...data } as IntentionsData,
          },
          lastSavedAt: new Date().toISOString(),
        }));
      },

      updateConsent: (data: Partial<ConsentData>) => {
        set((state) => ({
          formData: {
            ...state.formData,
            consent: { ...state.formData.consent, ...data } as ConsentData,
          },
          lastSavedAt: new Date().toISOString(),
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
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
        lastSavedAt: state.lastSavedAt,
        applicationId: state.applicationId,
      }),
    }
  )
);

// Helper hook to calculate completion percentage
export function useCompletionPercentage(): number {
  const formData = useScreeningStore((state) => state.formData);

  let filledFields = 0;
  let totalFields = 0;

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
      totalFields += entries.length;
      filledFields += entries.filter(([, value]) =>
        value !== undefined && value !== '' && value !== null
      ).length;
    }
  }

  // Estimate total expected fields (44 questions = roughly 44+ fields)
  const expectedTotal = 49; // 7 + 8 + 8 + 11 + 6 + 4 + 5

  return Math.round((filledFields / expectedTotal) * 100);
}
