// lib/screening-types.ts
// Type definitions for the 44-question screening wizard

export type RiskLevel = 'green' | 'yellow' | 'red';

export interface RiskResult {
  level: RiskLevel;
  messages: string[];
  recommendation?: string;
  canProceed: boolean;
  requiresReview?: boolean;
}

export interface RiskRule {
  id: string;
  condition: (data: Partial<ScreeningFormData>) => boolean;
  severity: RiskLevel;
  message: string;
  recommendation?: string;
  followUp?: string;
}

// Step 1: Basic Info
export interface BasicInfoData {
  fullName: string;
  birthDate: string;
  gender: 'masculino' | 'femenino' | 'otro' | 'prefiero_no_decir';
  email: string;
  phone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

// Step 2: Medical History
export interface MedicalHistoryData {
  hasCardiacCondition: boolean;
  cardiacDetails?: string;
  hasHypertension: boolean;
  hypertensionControlled?: boolean;
  hasDiabetes: boolean;
  diabetesType?: 'tipo1' | 'tipo2';
  hasEpilepsy: boolean;
  hasLiverProblems: boolean;
  hasKidneyProblems: boolean;
  isPregnant: boolean;
  isBreastfeeding: boolean;
  hadRecentSurgery: boolean;
  surgeryDetails?: string;
}

// Step 3: Medications
export interface MedicationsData {
  takingMedications: boolean;
  hasMaoiInhibitors: boolean;
  hasSsriAntidepressants: boolean;
  ssriDetails?: string;
  hasLithium: boolean;
  hasAntipsychotics: boolean;
  hasCardiacMedications: boolean;
  otherMedications?: string;
  supplements?: string;
}

// Step 4: Mental Health
export interface MentalHealthData {
  hasPsychoticDisorder: boolean;
  hasSchizophrenia: boolean;
  hasBipolar: boolean;
  hasCurrentDepression: boolean;
  hasCurrentAnxiety: boolean;
  isInPsychiatricTreatment: boolean;
  treatmentDetails?: string;
  hasHistoryOfCrisis: boolean;
  hasSuicidalIdeation: boolean; // últimos 6 meses
  hasEatingDisorder: boolean;
  hasActiveAddiction: boolean;
  addictionDetails?: string;
}

// Step 5: Lifestyle
export interface LifestyleData {
  alcoholConsumption: 'nunca' | 'ocasional' | 'frecuente' | 'diario';
  recreationalSubstances: boolean;
  substanceDetails?: string;
  dietaryRestrictions: string;
  foodAllergies: string;
  physicalLimitations: string;
  hasPreviousExperience: boolean;
  previousExperienceDetails?: string;
}

// Step 6: Intentions
export interface IntentionsData {
  whyParticipate: string;
  whatToHeal: string;
  howFoundUs: string;
  questions?: string;
}

// Step 7: Consent
export interface ConsentData {
  accepts7DayPreparation: boolean;
  understandsSpiritualNotMedical: boolean;
  acceptsCancellationPolicy: boolean;
  acceptsTermsAndConditions: boolean;
  acceptsPrivacyPolicy: boolean;
  acceptsSensitiveDataProcessing: boolean;
}

// Combined form data
export interface ScreeningFormData {
  // Step 1
  basicInfo: BasicInfoData;
  // Step 2
  medicalHistory: MedicalHistoryData;
  // Step 3
  medications: MedicationsData;
  // Step 4
  mentalHealth: MentalHealthData;
  // Step 5
  lifestyle: LifestyleData;
  // Step 6
  intentions: IntentionsData;
  // Step 7
  consent: ConsentData;
}

// Store state
export interface ScreeningStoreState {
  formData: Partial<ScreeningFormData>;
  currentStep: number;
  riskLevel: RiskLevel;
  riskMessages: string[];
  completionPercentage: number;
  lastSavedAt: string | null;
  applicationId: string | null;
}

export interface ScreeningStoreActions {
  updateBasicInfo: (data: Partial<BasicInfoData>) => void;
  updateMedicalHistory: (data: Partial<MedicalHistoryData>) => void;
  updateMedications: (data: Partial<MedicationsData>) => void;
  updateMentalHealth: (data: Partial<MentalHealthData>) => void;
  updateLifestyle: (data: Partial<LifestyleData>) => void;
  updateIntentions: (data: Partial<IntentionsData>) => void;
  updateConsent: (data: Partial<ConsentData>) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  evaluateRisk: () => RiskResult;
  resetForm: () => void;
  setApplicationId: (id: string) => void;
}

export type ScreeningStore = ScreeningStoreState & ScreeningStoreActions;

// Step definition for wizard
export interface StepDefinition {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  questionCount: number;
}

export const STEPS: StepDefinition[] = [
  { id: 1, title: 'Información Básica', shortTitle: 'Datos', description: 'Datos personales y contacto de emergencia', questionCount: 7 },
  { id: 2, title: 'Historial Médico', shortTitle: 'Médico', description: 'Condiciones de salud actuales', questionCount: 8 },
  { id: 3, title: 'Medicamentos', shortTitle: 'Medicinas', description: 'Medicamentos y suplementos', questionCount: 8 },
  { id: 4, title: 'Salud Mental', shortTitle: 'Mental', description: 'Historial y estado psicológico', questionCount: 11 },
  { id: 5, title: 'Estilo de Vida', shortTitle: 'Vida', description: 'Hábitos y experiencia previa', questionCount: 6 },
  { id: 6, title: 'Intenciones', shortTitle: 'Intención', description: 'Motivación y expectativas', questionCount: 4 },
  { id: 7, title: 'Consentimiento', shortTitle: 'Aceptar', description: 'Términos y autorizaciones', questionCount: 6 },
];

export const TOTAL_QUESTIONS = STEPS.reduce((sum, step) => sum + step.questionCount, 0);
