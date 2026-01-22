// components/screening/steps/MentalHealthStep.tsx
"use client";

import { useScreeningStore } from "@/lib/screening-store";
import type { MentalHealthData } from "@/lib/screening-types";

export function MentalHealthStep() {
  const { formData, updateMentalHealth } = useScreeningStore();
  const mentalHealth = (formData.mentalHealth || {}) as Partial<MentalHealthData>;

  const handleBooleanChange = (e: React.MouseEvent, name: string, value: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    updateMentalHealth({ [name]: value });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateMentalHealth({ [name]: value });
  };

  const BooleanQuestion = ({
    id,
    label,
    helpText,
    value,
    warning,
    sensitive,
  }: {
    id: string;
    label: string;
    helpText?: string;
    value: boolean | undefined;
    warning?: boolean;
    sensitive?: boolean;
  }) => (
    <div className="py-4 border-b border-[var(--warm-gray-100)] last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1">
          <span className="font-medium text-[var(--warm-gray-800)]">{label}</span>
          {helpText && (
            <p className="text-sm text-[var(--burgundy-dark)] mt-2 bg-[var(--coral-light)]/30 px-3 py-2 rounded-lg border-l-4 border-[var(--coral)]">
              <span className="opacity-80">💡</span> {helpText}
            </p>
          )}
          {warning && value === true && (
            <p className="text-sm text-red-600 mt-1 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Esta condición requiere evaluación especial
            </p>
          )}
          {sensitive && (
            <span className="inline-block mt-1 px-2 py-0.5 bg-[var(--warm-gray-100)] text-[var(--burgundy-dark)] text-xs rounded">
              Información sensible protegida
            </span>
          )}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={(e) => handleBooleanChange(e, id, true)}
            className={`px-6 py-2 rounded-lg font-medium transition-all min-w-[80px] ${
              value === true
                ? warning ? "bg-red-600 text-white" : "bg-[var(--burgundy)] text-white"
                : "bg-[var(--warm-gray-100)] text-[var(--warm-gray-600)] hover:bg-[var(--warm-gray-200)]"
            }`}
          >
            Sí
          </button>
          <button
            type="button"
            onClick={(e) => handleBooleanChange(e, id, false)}
            className={`px-6 py-2 rounded-lg font-medium transition-all min-w-[80px] ${
              value === false
                ? "bg-[var(--burgundy)] text-white"
                : "bg-[var(--warm-gray-100)] text-[var(--warm-gray-600)] hover:bg-[var(--warm-gray-200)]"
            }`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-2">
      <div className="bg-[var(--warm-gray-50)] border border-[var(--coral-light)] rounded-lg p-4 mb-6">
        <p className="text-sm text-[var(--burgundy)]">
          <strong>Tu bienestar es nuestra prioridad.</strong> Esta información nos ayuda a
          asegurar que la experiencia sea segura y beneficiosa para ti. Toda la información
          es estrictamente confidencial.
        </p>
      </div>

      <BooleanQuestion
        id="hasPsychoticDisorder"
        label="¿Tienes o has tenido algún trastorno psicótico?"
        helpText="La medicina abre puertas de la percepción que requieren una base sólida; esto nos ayuda a determinar si es el momento más seguro para ti. (Ej: Psicosis, delirios, alucinaciones persistentes)"
        value={mentalHealth.hasPsychoticDisorder}
        warning={true}
        sensitive={true}
      />

      <BooleanQuestion
        id="hasSchizophrenia"
        label="¿Tienes diagnóstico de esquizofrenia?"
        helpText="Ciertas sensibilidades mentales requieren un cuidado especial; nuestra prioridad es que tu mente se mantenga en un lugar seguro y estable."
        value={mentalHealth.hasSchizophrenia}
        warning={true}
        sensitive={true}
      />

      <BooleanQuestion
        id="hasBipolar"
        label="¿Tienes diagnóstico de trastorno bipolar?"
        helpText="Queremos evitar desequilibrios emocionales intensos y asegurarnos de que tengas la estabilidad necesaria para integrar bien la experiencia."
        value={mentalHealth.hasBipolar}
        sensitive={true}
      />

      <BooleanQuestion
        id="hasCurrentDepression"
        label="¿Experimentas depresión actualmente?"
        helpText="Tristeza persistente, falta de energía, pérdida de interés"
        value={mentalHealth.hasCurrentDepression}
        sensitive={true}
      />

      <BooleanQuestion
        id="hasCurrentAnxiety"
        label="¿Experimentas ansiedad actualmente?"
        helpText="Preocupación excesiva, ataques de pánico, nerviosismo constante"
        value={mentalHealth.hasCurrentAnxiety}
        sensitive={true}
      />

      <BooleanQuestion
        id="isInPsychiatricTreatment"
        label="¿Estás actualmente en tratamiento psiquiátrico o psicológico?"
        helpText="Saber esto nos permite apoyarte mejor, asegurando que tu proceso terapéutico actual se complemente con la ceremonia, y no que choque."
        value={mentalHealth.isInPsychiatricTreatment}
        sensitive={true}
      />

      {mentalHealth.isInPsychiatricTreatment && (
        <div className="pl-4 pb-4">
          <label htmlFor="treatmentDetails" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
            Por favor describe tu tratamiento actual:
          </label>
          <textarea
            id="treatmentDetails"
            name="treatmentDetails"
            value={mentalHealth.treatmentDetails || ""}
            onChange={handleTextChange}
            rows={2}
            className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
            placeholder="Tipo de terapia, frecuencia, profesional que te atiende..."
          />
        </div>
      )}

      <BooleanQuestion
        id="hasHistoryOfCrisis"
        label="¿Has tenido crisis emocionales severas u hospitalizaciones psiquiátricas?"
        value={mentalHealth.hasHistoryOfCrisis}
        sensitive={true}
      />

      <div className="py-4 border-b border-[var(--warm-gray-100)] bg-red-50 -mx-6 px-6 rounded-lg my-4">
        <BooleanQuestion
          id="hasSuicidalIdeation"
          label="¿Has tenido pensamientos suicidas en los últimos 6 meses?"
          helpText="Tu bienestar emocional es nuestra prioridad; esta información nos ayuda a brindarte la contención y el apoyo humano que necesitas."
          value={mentalHealth.hasSuicidalIdeation}
          warning={true}
          sensitive={true}
        />
        {mentalHealth.hasSuicidalIdeation && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-red-200">
            <p className="text-sm text-red-800">
              <strong>Gracias por tu honestidad.</strong> Tu bienestar es lo más importante.
              Te recomendamos buscar apoyo profesional antes de considerar este tipo de experiencia.
            </p>
            <p className="text-sm text-red-600 mt-2">
              Línea de la Vida: <strong>800 911 2000</strong> (24 horas, gratuita)
            </p>
          </div>
        )}
      </div>

      <BooleanQuestion
        id="hasEatingDisorder"
        label="¿Tienes o has tenido un trastorno alimenticio?"
        helpText="Anorexia, bulimia, trastorno por atracón"
        value={mentalHealth.hasEatingDisorder}
        sensitive={true}
      />

      <BooleanQuestion
        id="hasActiveAddiction"
        label="¿Tienes una adicción activa actualmente?"
        helpText="Para que la medicina trabaje profundamente, es ideal saber cómo está tu cuerpo y así guiarte hacia la mejor preparación posible. (Ej: Alcohol, drogas, comportamiento compulsivo)"
        value={mentalHealth.hasActiveAddiction}
        warning={true}
        sensitive={true}
      />

      {mentalHealth.hasActiveAddiction && (
        <div className="pl-4 pb-4">
          <label htmlFor="addictionDetails" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
            Por favor describe brevemente:
          </label>
          <textarea
            id="addictionDetails"
            name="addictionDetails"
            value={mentalHealth.addictionDetails || ""}
            onChange={handleTextChange}
            rows={2}
            className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
            placeholder="Tipo de sustancia o comportamiento, tiempo, si estás en tratamiento..."
          />
        </div>
      )}
    </div>
  );
}
