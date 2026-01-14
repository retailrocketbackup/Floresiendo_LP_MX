// components/screening/steps/MedicationsStep.tsx
"use client";

import { useScreeningStore } from "@/lib/screening-store";
import type { MedicationsData } from "@/lib/screening-types";

export function MedicationsStep() {
  const { formData, updateMedications } = useScreeningStore();
  const medications = (formData.medications || {}) as Partial<MedicationsData>;

  const handleBooleanChange = (e: React.MouseEvent, name: string, value: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    updateMedications({ [name]: value });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateMedications({ [name]: value });
  };

  const BooleanQuestion = ({
    id,
    label,
    helpText,
    value,
    warning,
  }: {
    id: string;
    label: string;
    helpText?: string;
    value: boolean | undefined;
    warning?: boolean;
  }) => (
    <div className="py-4 border-b border-[var(--warm-gray-100)] last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1">
          <label className="font-medium text-[var(--warm-gray-800)]">{label}</label>
          {helpText && <p className="text-sm text-[var(--warm-gray-500)] mt-1">{helpText}</p>}
          {warning && value === true && (
            <p className="text-sm text-red-600 mt-1 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Este medicamento requiere evaluación especial
            </p>
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
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-amber-800">
          <strong>Importante:</strong> Algunos medicamentos pueden tener interacciones serias.
          Por favor responde con honestidad para tu seguridad.
        </p>
      </div>

      <BooleanQuestion
        id="takingMedications"
        label="¿Estás tomando algún medicamento actualmente?"
        value={medications.takingMedications}
      />

      {medications.takingMedications && (
        <div className="space-y-2 pl-0 mt-4">
          <p className="text-sm font-medium text-[var(--warm-gray-700)] mb-4">
            Por favor indica si tomas alguno de los siguientes:
          </p>

          <BooleanQuestion
            id="hasMaoiInhibitors"
            label="Inhibidores de MAO (IMAOs)"
            helpText="Fenelzina, tranilcipromina, isocarboxazida, moclobemida"
            value={medications.hasMaoiInhibitors}
            warning={true}
          />

          <BooleanQuestion
            id="hasSsriAntidepressants"
            label="Antidepresivos ISRS"
            helpText="Fluoxetina (Prozac), sertralina (Zoloft), escitalopram, paroxetina, etc."
            value={medications.hasSsriAntidepressants}
            warning={true}
          />

          {medications.hasSsriAntidepressants && (
            <div className="pl-4 pb-4">
              <label htmlFor="ssriDetails" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
                ¿Cuál antidepresivo y qué dosis?
              </label>
              <textarea
                id="ssriDetails"
                name="ssriDetails"
                value={medications.ssriDetails || ""}
                onChange={handleTextChange}
                rows={2}
                className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
                placeholder="Nombre del medicamento, dosis, tiempo tomándolo..."
              />
            </div>
          )}

          <BooleanQuestion
            id="hasLithium"
            label="Litio"
            helpText="Usado para trastorno bipolar"
            value={medications.hasLithium}
            warning={true}
          />

          <BooleanQuestion
            id="hasAntipsychotics"
            label="Antipsicóticos"
            helpText="Risperidona, quetiapina, olanzapina, aripiprazol, etc."
            value={medications.hasAntipsychotics}
            warning={true}
          />

          <BooleanQuestion
            id="hasCardiacMedications"
            label="Medicamentos cardíacos"
            helpText="Para el corazón o presión arterial"
            value={medications.hasCardiacMedications}
          />

          <div className="py-4">
            <label htmlFor="otherMedications" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
              Otros medicamentos que tomes:
            </label>
            <textarea
              id="otherMedications"
              name="otherMedications"
              value={medications.otherMedications || ""}
              onChange={handleTextChange}
              rows={3}
              className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
              placeholder="Lista cualquier otro medicamento que tomes regularmente..."
            />
          </div>
        </div>
      )}

      <div className="pt-4">
        <label htmlFor="supplements" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
          ¿Tomas suplementos o hierbas? (opcional)
        </label>
        <textarea
          id="supplements"
          name="supplements"
          value={medications.supplements || ""}
          onChange={handleTextChange}
          rows={2}
          className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
          placeholder="Vitaminas, suplementos, tés medicinales, etc."
        />
      </div>
    </div>
  );
}
