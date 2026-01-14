// components/screening/steps/MedicalHistoryStep.tsx
"use client";

import { useScreeningStore } from "@/lib/screening-store";
import type { MedicalHistoryData } from "@/lib/screening-types";

export function MedicalHistoryStep() {
  const { formData, updateMedicalHistory } = useScreeningStore();
  const medicalHistory = (formData.medicalHistory || {}) as Partial<MedicalHistoryData>;

  const handleBooleanChange = (e: React.MouseEvent, name: string, value: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    updateMedicalHistory({ [name]: value });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateMedicalHistory({ [name]: value });
  };

  const BooleanQuestion = ({
    id,
    label,
    helpText,
    value,
  }: {
    id: string;
    label: string;
    helpText?: string;
    value: boolean | undefined;
  }) => (
    <div className="py-4 border-b border-[var(--warm-gray-100)] last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1">
          <label className="font-medium text-[var(--warm-gray-800)]">{label}</label>
          {helpText && <p className="text-sm text-[var(--warm-gray-500)] mt-1">{helpText}</p>}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={(e) => handleBooleanChange(e, id, true)}
            className={`px-6 py-2 rounded-lg font-medium transition-all min-w-[80px] ${
              value === true
                ? "bg-[var(--burgundy)] text-white"
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
      <p className="text-sm text-[var(--warm-gray-500)] mb-6">
        Esta información es confidencial y solo se usa para tu seguridad durante el retiro.
      </p>

      <BooleanQuestion
        id="hasCardiacCondition"
        label="¿Tienes alguna condición cardíaca?"
        helpText="Arritmia, soplo, enfermedad coronaria, etc."
        value={medicalHistory.hasCardiacCondition}
      />

      {medicalHistory.hasCardiacCondition && (
        <div className="pl-4 pb-4">
          <label htmlFor="cardiacDetails" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
            Por favor describe tu condición:
          </label>
          <textarea
            id="cardiacDetails"
            name="cardiacDetails"
            value={medicalHistory.cardiacDetails || ""}
            onChange={handleTextChange}
            rows={2}
            className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
            placeholder="Describe tu condición cardíaca..."
          />
        </div>
      )}

      <BooleanQuestion
        id="hasHypertension"
        label="¿Tienes hipertensión (presión alta)?"
        value={medicalHistory.hasHypertension}
      />

      {medicalHistory.hasHypertension && (
        <div className="pl-4 pb-4">
          <label className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
            ¿Tu hipertensión está controlada con medicamento?
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={(e) => handleBooleanChange(e, "hypertensionControlled", true)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                medicalHistory.hypertensionControlled === true
                  ? "bg-green-600 text-white"
                  : "bg-[var(--warm-gray-100)] text-[var(--warm-gray-600)] hover:bg-[var(--warm-gray-200)]"
              }`}
            >
              Sí, controlada
            </button>
            <button
              type="button"
              onClick={(e) => handleBooleanChange(e, "hypertensionControlled", false)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                medicalHistory.hypertensionControlled === false
                  ? "bg-yellow-600 text-white"
                  : "bg-[var(--warm-gray-100)] text-[var(--warm-gray-600)] hover:bg-[var(--warm-gray-200)]"
              }`}
            >
              No controlada
            </button>
          </div>
        </div>
      )}

      <BooleanQuestion
        id="hasDiabetes"
        label="¿Tienes diabetes?"
        value={medicalHistory.hasDiabetes}
      />

      {medicalHistory.hasDiabetes && (
        <div className="pl-4 pb-4">
          <label htmlFor="diabetesType" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
            ¿Qué tipo de diabetes?
          </label>
          <select
            id="diabetesType"
            name="diabetesType"
            value={medicalHistory.diabetesType || ""}
            onChange={handleTextChange}
            className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors bg-white"
          >
            <option value="">Selecciona</option>
            <option value="tipo1">Tipo 1</option>
            <option value="tipo2">Tipo 2</option>
          </select>
        </div>
      )}

      <BooleanQuestion
        id="hasEpilepsy"
        label="¿Tienes epilepsia o historial de convulsiones?"
        value={medicalHistory.hasEpilepsy}
      />

      <BooleanQuestion
        id="hasLiverProblems"
        label="¿Tienes problemas hepáticos (del hígado)?"
        value={medicalHistory.hasLiverProblems}
      />

      <BooleanQuestion
        id="hasKidneyProblems"
        label="¿Tienes problemas renales (de los riñones)?"
        value={medicalHistory.hasKidneyProblems}
      />

      <BooleanQuestion
        id="isPregnant"
        label="¿Estás embarazada o crees que podrías estarlo?"
        value={medicalHistory.isPregnant}
      />

      <BooleanQuestion
        id="isBreastfeeding"
        label="¿Estás en período de lactancia?"
        value={medicalHistory.isBreastfeeding}
      />

      <BooleanQuestion
        id="hadRecentSurgery"
        label="¿Has tenido alguna cirugía en los últimos 6 meses?"
        value={medicalHistory.hadRecentSurgery}
      />

      {medicalHistory.hadRecentSurgery && (
        <div className="pl-4 pb-4">
          <label htmlFor="surgeryDetails" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
            Por favor describe la cirugía y fecha:
          </label>
          <textarea
            id="surgeryDetails"
            name="surgeryDetails"
            value={medicalHistory.surgeryDetails || ""}
            onChange={handleTextChange}
            rows={2}
            className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
            placeholder="Tipo de cirugía, fecha aproximada..."
          />
        </div>
      )}
    </div>
  );
}
