// lib/screening-validation.ts
// Step validation logic for screening wizard

import type { ScreeningFormData } from './screening-types';

export interface ValidationResult {
  isValid: boolean;
  missingFields: string[];
  errorMessage?: string;
}

// Helper to check if a string field has content
const hasContent = (value: string | undefined | null): boolean => {
  return typeof value === 'string' && value.trim().length > 0;
};

// Helper to check if a boolean field is defined (answered)
const isAnswered = (value: boolean | undefined): boolean => {
  return typeof value === 'boolean';
};

// Step 1: Basic Info - ALL 7 fields required
export function validateBasicInfo(data: ScreeningFormData): ValidationResult {
  const basicInfo = data.basicInfo;
  const missingFields: string[] = [];

  if (!basicInfo) {
    return {
      isValid: false,
      missingFields: ['Todos los campos'],
      errorMessage: 'Por favor completa tu información básica',
    };
  }

  if (!hasContent(basicInfo.fullName)) missingFields.push('Nombre completo');
  if (!hasContent(basicInfo.birthDate)) missingFields.push('Fecha de nacimiento');
  if (!hasContent(basicInfo.gender)) missingFields.push('Género');
  if (!hasContent(basicInfo.email)) missingFields.push('Correo electrónico');
  if (!hasContent(basicInfo.phone)) missingFields.push('Teléfono');
  if (!hasContent(basicInfo.emergencyContactName)) missingFields.push('Contacto de emergencia');
  if (!hasContent(basicInfo.emergencyContactPhone)) missingFields.push('Teléfono de emergencia');

  // Age validation (must be 18+)
  if (hasContent(basicInfo.birthDate)) {
    const birthDate = new Date(basicInfo.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

    if (actualAge < 18) {
      return {
        isValid: false,
        missingFields: [],
        errorMessage: 'Debes ser mayor de 18 años para participar',
      };
    }
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    errorMessage: missingFields.length > 0 ? `Campos faltantes: ${missingFields.join(', ')}` : undefined,
  };
}

// Step 2: Intentions - 3 required fields
export function validateIntentions(data: ScreeningFormData): ValidationResult {
  const intentions = data.intentions;
  const missingFields: string[] = [];

  if (!intentions) {
    return {
      isValid: false,
      missingFields: ['Todas las preguntas'],
      errorMessage: 'Por favor responde las preguntas sobre tus intenciones',
    };
  }

  if (!hasContent(intentions.whyParticipate)) missingFields.push('¿Por qué deseas participar?');
  if (!hasContent(intentions.whatToHeal)) missingFields.push('¿Qué esperas sanar?');
  if (!hasContent(intentions.howFoundUs)) missingFields.push('¿Cómo nos encontraste?');

  return {
    isValid: missingFields.length === 0,
    missingFields,
    errorMessage: missingFields.length > 0 ? `Campos faltantes: ${missingFields.join(', ')}` : undefined,
  };
}

// Step 3: Lifestyle - Conditional validation
export function validateLifestyle(data: ScreeningFormData): ValidationResult {
  const lifestyle = data.lifestyle;
  const missingFields: string[] = [];

  if (!lifestyle) {
    // Lifestyle step is mostly optional, so empty is OK
    return { isValid: true, missingFields: [] };
  }

  // If uses recreational substances, must provide details
  if (lifestyle.recreationalSubstances === true && !hasContent(lifestyle.substanceDetails)) {
    missingFields.push('Detalles de sustancias recreativas');
  }

  // If has previous experience, must provide details
  if (lifestyle.hasPreviousExperience === true && !hasContent(lifestyle.previousExperienceDetails)) {
    missingFields.push('Detalles de experiencia previa');
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    errorMessage: missingFields.length > 0 ? `Por favor completa: ${missingFields.join(', ')}` : undefined,
  };
}

// Step 4: Medical History - Conditional validation
export function validateMedicalHistory(data: ScreeningFormData): ValidationResult {
  const medical = data.medicalHistory;
  const missingFields: string[] = [];

  if (!medical) {
    // Medical step needs at least some answers
    return { isValid: true, missingFields: [] };
  }

  // If has cardiac condition, must provide details
  if (medical.hasCardiacCondition === true && !hasContent(medical.cardiacDetails)) {
    missingFields.push('Detalles de condición cardíaca');
  }

  // If has hypertension, must answer if controlled
  if (medical.hasHypertension === true && !isAnswered(medical.hypertensionControlled)) {
    missingFields.push('¿Hipertensión controlada?');
  }

  // If has diabetes, must select type
  if (medical.hasDiabetes === true && !hasContent(medical.diabetesType)) {
    missingFields.push('Tipo de diabetes');
  }

  // If had recent surgery, must provide details
  if (medical.hadRecentSurgery === true && !hasContent(medical.surgeryDetails)) {
    missingFields.push('Detalles de cirugía reciente');
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    errorMessage: missingFields.length > 0 ? `Por favor completa: ${missingFields.join(', ')}` : undefined,
  };
}

// Step 5: Medications - Conditional validation
export function validateMedications(data: ScreeningFormData): ValidationResult {
  const meds = data.medications;
  const missingFields: string[] = [];

  if (!meds) {
    return { isValid: true, missingFields: [] };
  }

  // If taking medications and has SSRI, must provide details
  if (meds.takingMedications === true && meds.hasSsriAntidepressants === true && !hasContent(meds.ssriDetails)) {
    missingFields.push('Detalles de antidepresivos ISRS');
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    errorMessage: missingFields.length > 0 ? `Por favor completa: ${missingFields.join(', ')}` : undefined,
  };
}

// Step 6: Mental Health - Conditional validation
export function validateMentalHealth(data: ScreeningFormData): ValidationResult {
  const mental = data.mentalHealth;
  const missingFields: string[] = [];

  if (!mental) {
    return { isValid: true, missingFields: [] };
  }

  // If in psychiatric treatment, must provide details
  if (mental.isInPsychiatricTreatment === true && !hasContent(mental.treatmentDetails)) {
    missingFields.push('Detalles del tratamiento psiquiátrico');
  }

  // If has active addiction, must provide details
  if (mental.hasActiveAddiction === true && !hasContent(mental.addictionDetails)) {
    missingFields.push('Detalles de adicción activa');
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    errorMessage: missingFields.length > 0 ? `Por favor completa: ${missingFields.join(', ')}` : undefined,
  };
}

// Step 7: Consent - ALL 6 checkboxes required
export function validateConsent(data: ScreeningFormData): ValidationResult {
  const consent = data.consent;
  const missingFields: string[] = [];

  if (!consent) {
    return {
      isValid: false,
      missingFields: ['Todos los consentimientos'],
      errorMessage: 'Por favor acepta todos los consentimientos para continuar',
    };
  }

  if (!consent.accepts7DayPreparation) missingFields.push('Dieta preparatoria');
  if (!consent.understandsSpiritualNotMedical) missingFields.push('Entendimiento espiritual');
  if (!consent.acceptsTermsAndConditions) missingFields.push('Términos y condiciones');
  if (!consent.acceptsCancellationPolicy) missingFields.push('Política de cancelación');
  if (!consent.acceptsPrivacyPolicy) missingFields.push('Política de privacidad');
  if (!consent.acceptsSensitiveDataProcessing) missingFields.push('Tratamiento de datos');

  return {
    isValid: missingFields.length === 0,
    missingFields,
    errorMessage: missingFields.length > 0
      ? `Faltan ${missingFields.length} consentimiento(s) por aceptar`
      : undefined,
  };
}

// Main validation function - validates current step
export function validateStep(step: number, formData: Partial<ScreeningFormData>): ValidationResult {
  const data = formData as ScreeningFormData;

  switch (step) {
    case 1: return validateBasicInfo(data);
    case 2: return validateIntentions(data);
    case 3: return validateLifestyle(data);
    case 4: return validateMedicalHistory(data);
    case 5: return validateMedications(data);
    case 6: return validateMentalHealth(data);
    case 7: return validateConsent(data);
    default: return { isValid: true, missingFields: [] };
  }
}
