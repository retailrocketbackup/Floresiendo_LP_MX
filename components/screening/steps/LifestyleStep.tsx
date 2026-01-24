// components/screening/steps/LifestyleStep.tsx
"use client";

import { useScreeningStore } from "@/lib/screening-store";
import type { LifestyleData } from "@/lib/screening-types";

export function LifestyleStep() {
  const { formData, updateLifestyle } = useScreeningStore();
  const lifestyle = (formData.lifestyle || {}) as Partial<LifestyleData>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateLifestyle({ [name]: value });
  };

  const handleBooleanChange = (e: React.MouseEvent, name: string, value: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    // Remove focus to prevent browser auto-scroll on state change
    (e.target as HTMLButtonElement).blur();
    updateLifestyle({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--warm-gray-500)] mb-6">
        Esta información nos ayuda a personalizar tu experiencia y preparación.
      </p>

      {/* Alcohol consumption */}
      <div>
        <label htmlFor="alcoholConsumption" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
          ¿Con qué frecuencia consumes alcohol?
        </label>
        <select
          id="alcoholConsumption"
          name="alcoholConsumption"
          value={lifestyle.alcoholConsumption || ""}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors bg-white"
        >
          <option value="">Selecciona una opción</option>
          <option value="nunca">Nunca</option>
          <option value="ocasional">Ocasionalmente (1-2 veces al mes)</option>
          <option value="frecuente">Frecuentemente (1-2 veces por semana)</option>
          <option value="diario">Diariamente</option>
        </select>
        {lifestyle.alcoholConsumption === "diario" && (
          <p className="text-sm text-amber-600 mt-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Te contactaremos para hablar sobre la preparación
          </p>
        )}
      </div>

      {/* Recreational substances */}
      <div className="py-4 border-b border-[var(--warm-gray-100)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1">
            <label className="font-medium text-[var(--warm-gray-800)]">
              ¿Usas sustancias recreativas actualmente?
            </label>
            <p className="text-sm text-[var(--warm-gray-500)] mt-1">
              Cannabis, hongos, MDMA, cocaína, etc.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={(e) => handleBooleanChange(e, "recreationalSubstances", true)}
              className={`px-6 py-2 rounded-lg font-medium transition-all min-w-[80px] ${
                lifestyle.recreationalSubstances === true
                  ? "bg-[var(--burgundy)] text-white"
                  : "bg-[var(--warm-gray-100)] text-[var(--warm-gray-600)] hover:bg-[var(--warm-gray-200)]"
              }`}
            >
              Sí
            </button>
            <button
              type="button"
              onClick={(e) => handleBooleanChange(e, "recreationalSubstances", false)}
              className={`px-6 py-2 rounded-lg font-medium transition-all min-w-[80px] ${
                lifestyle.recreationalSubstances === false
                  ? "bg-[var(--burgundy)] text-white"
                  : "bg-[var(--warm-gray-100)] text-[var(--warm-gray-600)] hover:bg-[var(--warm-gray-200)]"
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>

      {lifestyle.recreationalSubstances && (
        <div className="pl-4">
          <label htmlFor="substanceDetails" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
            ¿Cuáles y con qué frecuencia?
          </label>
          <textarea
            id="substanceDetails"
            name="substanceDetails"
            value={lifestyle.substanceDetails || ""}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
            placeholder="Esta información es confidencial y nos ayuda con tu preparación..."
          />
        </div>
      )}

      {/* Dietary restrictions */}
      <div>
        <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
          ¿Tienes restricciones dietéticas?
        </label>
        <textarea
          id="dietaryRestrictions"
          name="dietaryRestrictions"
          value={lifestyle.dietaryRestrictions || ""}
          onChange={handleChange}
          rows={2}
          className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
          placeholder="Vegetariano, vegano, sin gluten, etc. (escribe 'ninguna' si no tienes)"
        />
      </div>

      {/* Food allergies */}
      <div>
        <label htmlFor="foodAllergies" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
          ¿Tienes alergias alimentarias?
        </label>
        <textarea
          id="foodAllergies"
          name="foodAllergies"
          value={lifestyle.foodAllergies || ""}
          onChange={handleChange}
          rows={2}
          className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
          placeholder="Maní, mariscos, lácteos, etc. (escribe 'ninguna' si no tienes)"
        />
      </div>

      {/* Physical limitations */}
      <div>
        <label htmlFor="physicalLimitations" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
          ¿Tienes limitaciones físicas o de movilidad?
        </label>
        <textarea
          id="physicalLimitations"
          name="physicalLimitations"
          value={lifestyle.physicalLimitations || ""}
          onChange={handleChange}
          rows={2}
          className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
          placeholder="Problemas de rodillas, espalda, dificultad para caminar, etc. (escribe 'ninguna' si no tienes)"
        />
      </div>

      {/* Previous experience */}
      <div className="py-4 border-t border-[var(--warm-gray-100)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1">
            <label className="font-medium text-[var(--warm-gray-800)]">
              ¿Has tenido experiencia previa con prácticas ancestrales o enteógenos?
            </label>
            <p className="text-sm text-[var(--warm-gray-500)] mt-1">
              Ayahuasca, peyote, hongos sagrados, etc.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={(e) => handleBooleanChange(e, "hasPreviousExperience", true)}
              className={`px-6 py-2 rounded-lg font-medium transition-all min-w-[80px] ${
                lifestyle.hasPreviousExperience === true
                  ? "bg-[var(--burgundy)] text-white"
                  : "bg-[var(--warm-gray-100)] text-[var(--warm-gray-600)] hover:bg-[var(--warm-gray-200)]"
              }`}
            >
              Sí
            </button>
            <button
              type="button"
              onClick={(e) => handleBooleanChange(e, "hasPreviousExperience", false)}
              className={`px-6 py-2 rounded-lg font-medium transition-all min-w-[80px] ${
                lifestyle.hasPreviousExperience === false
                  ? "bg-[var(--burgundy)] text-white"
                  : "bg-[var(--warm-gray-100)] text-[var(--warm-gray-600)] hover:bg-[var(--warm-gray-200)]"
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>

      {lifestyle.hasPreviousExperience && (
        <div className="pl-4">
          <label htmlFor="previousExperienceDetails" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
            Cuéntanos sobre tu experiencia:
          </label>
          <textarea
            id="previousExperienceDetails"
            name="previousExperienceDetails"
            value={lifestyle.previousExperienceDetails || ""}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
            placeholder="¿Qué prácticas? ¿Cuántas veces? ¿Cómo fue tu experiencia?"
          />
        </div>
      )}
    </div>
  );
}
