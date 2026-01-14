// components/screening/steps/IntentionsStep.tsx
"use client";

import { useScreeningStore } from "@/lib/screening-store";
import type { IntentionsData } from "@/lib/screening-types";

export function IntentionsStep() {
  const { formData, updateIntentions } = useScreeningStore();
  const intentions = (formData.intentions || {}) as Partial<IntentionsData>;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateIntentions({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-[var(--warm-gray-50)] border border-[var(--coral-light)] rounded-lg p-4 mb-6">
        <p className="text-sm text-[var(--burgundy)]">
          <strong>Tu intención es importante.</strong> Estas preguntas nos ayudan a entender
          tus motivaciones y cómo podemos acompañarte mejor en este proceso de transformación.
        </p>
      </div>

      {/* Why participate */}
      <div>
        <label htmlFor="whyParticipate" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
          ¿Por qué deseas participar en este retiro? *
        </label>
        <textarea
          id="whyParticipate"
          name="whyParticipate"
          required
          value={intentions.whyParticipate || ""}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
          placeholder="Cuéntanos qué te motiva a buscar esta experiencia..."
        />
        <p className="text-xs text-[var(--warm-gray-500)] mt-1">
          No hay respuestas correctas o incorrectas - sé honesto/a contigo mismo/a
        </p>
      </div>

      {/* What to heal/transform */}
      <div>
        <label htmlFor="whatToHeal" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
          ¿Qué esperas sanar, resolver o transformar? *
        </label>
        <textarea
          id="whatToHeal"
          name="whatToHeal"
          required
          value={intentions.whatToHeal || ""}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
          placeholder="Patrones que quieres soltar, heridas que quieres sanar, claridad que buscas..."
        />
      </div>

      {/* How found us */}
      <div>
        <label htmlFor="howFoundUs" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
          ¿Cómo supiste de Floresiendo? *
        </label>
        <select
          id="howFoundUs"
          name="howFoundUs"
          required
          value={intentions.howFoundUs || ""}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors bg-white"
        >
          <option value="">Selecciona una opción</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="google">Búsqueda en Google</option>
          <option value="amigo">Recomendación de un amigo/a</option>
          <option value="familiar">Recomendación de un familiar</option>
          <option value="terapeuta">Mi terapeuta o coach</option>
          <option value="podcast">Podcast o YouTube</option>
          <option value="evento">Evento o taller presencial</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      {/* Questions for us */}
      <div>
        <label htmlFor="questions" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
          ¿Tienes preguntas para nosotros? (opcional)
        </label>
        <textarea
          id="questions"
          name="questions"
          value={intentions.questions || ""}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
          placeholder="Cualquier duda, inquietud o cosa que quieras saber sobre el retiro..."
        />
      </div>

      {/* Inspirational note */}
      <div className="bg-gradient-to-r from-[var(--warm-[var(--warm-gray-100)])] to-pink-100 rounded-lg p-6 mt-8">
        <blockquote className="text-[var(--burgundy-dark)] italic">
          "El primer paso hacia la transformación es la intención clara.
          Al escribir estas palabras, ya estás sembrando las semillas de tu proceso."
        </blockquote>
        <p className="text-sm text-[var(--burgundy-dark)] mt-2 text-right">— Equipo Floresiendo</p>
      </div>
    </div>
  );
}
