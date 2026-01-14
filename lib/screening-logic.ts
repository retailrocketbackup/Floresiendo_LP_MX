// lib/screening-logic.ts
// Risk evaluation engine for contraindication screening

import type {
  ScreeningFormData,
  RiskResult,
  RiskRule,
  RiskLevel
} from './screening-types';

// HARD BLOCK RULES (RED) - These absolutely prevent participation
const hardBlockRules: RiskRule[] = [
  {
    id: 'lithium',
    condition: (data) => data.medications?.hasLithium === true,
    severity: 'red',
    message: 'El litio es una contraindicación absoluta para esta experiencia.',
    recommendation: 'No descontinúes este medicamento sin supervisión médica. Esta experiencia no es segura en combinación con litio.'
  },
  {
    id: 'psychotic_disorder',
    condition: (data) => data.mentalHealth?.hasPsychoticDisorder === true,
    severity: 'red',
    message: 'Los trastornos psicóticos son una contraindicación para esta experiencia.',
    recommendation: 'Esta experiencia no es segura para tu condición. Te recomendamos otras prácticas de bienestar más adecuadas.'
  },
  {
    id: 'schizophrenia',
    condition: (data) => data.mentalHealth?.hasSchizophrenia === true,
    severity: 'red',
    message: 'La esquizofrenia es una contraindicación absoluta.',
    recommendation: 'Por tu bienestar, esta experiencia no es recomendable. Existen otras formas de trabajo espiritual que pueden ser más apropiadas para ti.'
  },
  {
    id: 'pregnancy',
    condition: (data) => data.medicalHistory?.isPregnant === true,
    severity: 'red',
    message: 'El embarazo es una contraindicación absoluta.',
    recommendation: 'Esta experiencia no es segura durante el embarazo. Te invitamos a participar después de tu periodo de lactancia.'
  },
  {
    id: 'severe_cardiac',
    condition: (data) =>
      data.medicalHistory?.hasCardiacCondition === true &&
      Boolean(
        data.medicalHistory?.cardiacDetails?.toLowerCase().includes('severo') ||
        data.medicalHistory?.cardiacDetails?.toLowerCase().includes('grave') ||
        data.medicalHistory?.cardiacDetails?.toLowerCase().includes('insuficiencia')
      ),
    severity: 'red',
    message: 'Condiciones cardíacas severas requieren evaluación médica.',
    recommendation: 'Por favor consulta con un cardiólogo y obtén autorización médica antes de considerar participar.'
  },
];

// SOFT FLAG RULES (YELLOW) - Require manual review but don't auto-block
const softFlagRules: RiskRule[] = [
  {
    id: 'maoi_current',
    condition: (data) => data.medications?.hasMaoiInhibitors === true,
    severity: 'yellow',
    message: 'El uso de IMAOs requiere evaluación especial.',
    followUp: 'Te contactaremos para discutir tu medicación y opciones de preparación segura (mínimo 1 semana de descontinuación requerida).'
  },
  {
    id: 'suicidal_ideation',
    condition: (data) => data.mentalHealth?.hasSuicidalIdeation === true,
    severity: 'yellow',
    message: 'La ideación suicida reciente requiere evaluación adicional.',
    followUp: 'Nuestro equipo te contactará para conocer más sobre tu situación actual y asegurar que esta experiencia sea apropiada para ti.'
  },
  {
    id: 'active_addiction',
    condition: (data) => data.mentalHealth?.hasActiveAddiction === true,
    severity: 'yellow',
    message: 'Las adicciones activas requieren evaluación especial.',
    followUp: 'Te contactaremos para entender mejor tu situación y determinar si este es el momento adecuado para participar.'
  },
  {
    id: 'ssri_current',
    condition: (data) => data.medications?.hasSsriAntidepressants === true,
    severity: 'yellow',
    message: 'El uso de antidepresivos ISRS requiere evaluación adicional.',
    followUp: 'Karla te contactará para discutir tu medicación y opciones de preparación segura.'
  },
  {
    id: 'antipsychotics',
    condition: (data) => data.medications?.hasAntipsychotics === true,
    severity: 'yellow',
    message: 'El uso de antipsicóticos requiere revisión médica.',
    followUp: 'Necesitamos más información sobre tu tratamiento actual.'
  },
  {
    id: 'psychiatric_treatment',
    condition: (data) => data.mentalHealth?.isInPsychiatricTreatment === true,
    severity: 'yellow',
    message: 'Tu tratamiento psiquiátrico actual será revisado por nuestro equipo.',
    followUp: 'Te contactaremos dentro de 24-48 horas para conocer más detalles.'
  },
  {
    id: 'bipolar',
    condition: (data) => data.mentalHealth?.hasBipolar === true,
    severity: 'yellow',
    message: 'El trastorno bipolar requiere evaluación cuidadosa.',
    followUp: 'Nuestro equipo revisará tu caso individualmente.'
  },
  {
    id: 'hypertension_controlled',
    condition: (data) =>
      data.medicalHistory?.hasHypertension === true &&
      data.medicalHistory?.hypertensionControlled === true,
    severity: 'yellow',
    message: 'Hipertensión controlada - necesitamos verificación.',
    followUp: 'Por favor envía tu último registro de presión arterial a nuestro equipo.'
  },
  {
    id: 'hypertension_uncontrolled',
    condition: (data) =>
      data.medicalHistory?.hasHypertension === true &&
      data.medicalHistory?.hypertensionControlled === false,
    severity: 'yellow',
    message: 'Hipertensión no controlada requiere atención especial.',
    followUp: 'Necesitamos que consultes con tu médico antes de confirmar participación.'
  },
  {
    id: 'cardiac_mild',
    condition: (data) =>
      data.medicalHistory?.hasCardiacCondition === true &&
      !(data.medicalHistory?.cardiacDetails?.toLowerCase().includes('severo') ||
        data.medicalHistory?.cardiacDetails?.toLowerCase().includes('grave')),
    severity: 'yellow',
    message: 'Tu condición cardíaca será revisada por nuestro equipo.',
    followUp: 'Podríamos necesitar autorización de tu médico.'
  },
  {
    id: 'epilepsy',
    condition: (data) => data.medicalHistory?.hasEpilepsy === true,
    severity: 'yellow',
    message: 'La epilepsia requiere evaluación especial.',
    followUp: 'Necesitamos conocer más detalles sobre tu condición y medicación.'
  },
  {
    id: 'recent_surgery',
    condition: (data) => data.medicalHistory?.hadRecentSurgery === true,
    severity: 'yellow',
    message: 'Cirugía reciente - revisaremos tu estado de recuperación.',
    followUp: 'Por favor comparte detalles sobre tu cirugía y estado actual.'
  },
  {
    id: 'eating_disorder',
    condition: (data) => data.mentalHealth?.hasEatingDisorder === true,
    severity: 'yellow',
    message: 'Los trastornos alimenticios requieren evaluación adicional.',
    followUp: 'Queremos asegurarnos de que la preparación dietética sea segura para ti.'
  },
  {
    id: 'crisis_history',
    condition: (data) => data.mentalHealth?.hasHistoryOfCrisis === true,
    severity: 'yellow',
    message: 'Tu historial de crisis emocionales será considerado.',
    followUp: 'Nuestro equipo te contactará para conocer más sobre tu historia.'
  },
  {
    id: 'breastfeeding',
    condition: (data) => data.medicalHistory?.isBreastfeeding === true,
    severity: 'yellow',
    message: 'La lactancia requiere consideración especial.',
    followUp: 'Contacta con nuestro equipo para discutir opciones seguras.'
  },
  {
    id: 'diabetes',
    condition: (data) => data.medicalHistory?.hasDiabetes === true,
    severity: 'yellow',
    message: 'La diabetes requiere planeación especial para la dieta preparatoria.',
    followUp: 'Te daremos indicaciones específicas para la preparación.'
  },
  {
    id: 'cardiac_medications',
    condition: (data) => data.medications?.hasCardiacMedications === true,
    severity: 'yellow',
    message: 'El uso de medicamentos cardíacos será evaluado.',
    followUp: 'Necesitamos conocer qué medicamentos tomas.'
  },
];

/**
 * Evaluate the risk level based on form data
 * Returns GREEN (auto-approve), YELLOW (manual review), or RED (hard block)
 */
export function evaluateRiskLevel(formData: Partial<ScreeningFormData>): RiskResult {
  const triggeredMessages: string[] = [];
  const followUps: string[] = [];

  // Check hard blocks first (RED) - any single one blocks
  for (const rule of hardBlockRules) {
    if (rule.condition(formData)) {
      return {
        level: 'red',
        messages: [rule.message],
        recommendation: rule.recommendation,
        canProceed: false,
        requiresReview: false
      };
    }
  }

  // Check soft flags (YELLOW) - accumulate all triggered
  for (const rule of softFlagRules) {
    if (rule.condition(formData)) {
      triggeredMessages.push(rule.message);
      if (rule.followUp) {
        followUps.push(rule.followUp);
      }
    }
  }

  // If any soft flags triggered, require manual review
  if (triggeredMessages.length > 0) {
    return {
      level: 'yellow',
      messages: triggeredMessages,
      recommendation: followUps.length > 0
        ? followUps[0] // Show first follow-up action
        : 'Nuestro equipo revisará tu solicitud y te contactará pronto.',
      canProceed: true, // Can submit, but won't auto-approve
      requiresReview: true
    };
  }

  // No flags - GREEN light
  return {
    level: 'green',
    messages: [],
    canProceed: true,
    requiresReview: false
  };
}

/**
 * Get the color class for the risk level
 */
export function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case 'green': return 'bg-green-500';
    case 'yellow': return 'bg-yellow-500';
    case 'red': return 'bg-red-500';
  }
}

/**
 * Get the text color class for the risk level
 */
export function getRiskTextColor(level: RiskLevel): string {
  switch (level) {
    case 'green': return 'text-green-600';
    case 'yellow': return 'text-yellow-600';
    case 'red': return 'text-red-600';
  }
}

/**
 * Get human-readable status for the risk level
 */
export function getRiskStatus(level: RiskLevel): string {
  switch (level) {
    case 'green': return 'Aprobación automática';
    case 'yellow': return 'Revisión manual requerida';
    case 'red': return 'No elegible';
  }
}
