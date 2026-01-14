// components/screening/steps/ConsentStep.tsx
"use client";

import { useScreeningStore } from "@/lib/screening-store";
import type { ConsentData } from "@/lib/screening-types";

export function ConsentStep() {
  const { formData, updateConsent } = useScreeningStore();
  const consent = (formData.consent || {}) as Partial<ConsentData>;

  const handleCheckboxChange = (name: string, checked: boolean) => {
    updateConsent({ [name]: checked });
  };

  const ConsentCheckbox = ({
    id,
    label,
    description,
    link,
    linkText,
    checked,
    required,
  }: {
    id: string;
    label: string;
    description?: string;
    link?: string;
    linkText?: string;
    checked: boolean | undefined;
    required?: boolean;
  }) => (
    <div className="py-4 border-b border-[var(--warm-gray-100)] last:border-0">
      <label className="flex items-start cursor-pointer group">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            id={id}
            checked={checked || false}
            onChange={(e) => handleCheckboxChange(id, e.target.checked)}
            className="peer sr-only"
            required={required}
          />
          <div className="w-6 h-6 border-2 border-[var(--warm-gray-300)] rounded-md peer-checked:border-[var(--burgundy)] peer-checked:bg-[var(--burgundy)] transition-all group-hover:border-purple-400">
            <svg
              className={`w-4 h-4 text-white absolute top-1 left-1 ${checked ? "opacity-100" : "opacity-0"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <div className="ml-3 flex-1">
          <span className="font-medium text-[var(--warm-gray-800)]">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
          {description && (
            <p className="text-sm text-[var(--warm-gray-500)] mt-1">{description}</p>
          )}
          {link && linkText && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--burgundy)] hover:underline mt-1 inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              {linkText} →
            </a>
          )}
        </div>
      </label>
    </div>
  );

  const allRequired = consent.accepts7DayPreparation &&
                      consent.understandsSpiritualNotMedical &&
                      consent.acceptsTermsAndConditions &&
                      consent.acceptsPrivacyPolicy &&
                      consent.acceptsSensitiveDataProcessing;

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-amber-800">
          <strong>Lee cuidadosamente.</strong> Estos consentimientos son necesarios para
          tu participación en el retiro. Al marcar cada casilla, confirmas que entiendes
          y aceptas los términos.
        </p>
      </div>

      <ConsentCheckbox
        id="accepts7DayPreparation"
        label="Acepto seguir la dieta preparatoria de 7 días"
        description="Me comprometo a seguir las indicaciones de alimentación y abstinencia antes del retiro (sin alcohol, sin sustancias, dieta específica)."
        checked={consent.accepts7DayPreparation}
        required
      />

      <ConsentCheckbox
        id="understandsSpiritualNotMedical"
        label="Entiendo que esto es una experiencia espiritual, no un tratamiento médico"
        description="Comprendo que Floresiendo ofrece experiencias de bienestar y crecimiento personal, no servicios médicos ni terapéuticos. No sustituye tratamiento profesional de salud física o mental."
        checked={consent.understandsSpiritualNotMedical}
        required
      />

      <ConsentCheckbox
        id="acceptsTermsAndConditions"
        label="Acepto los Términos y Condiciones"
        description="He leído y acepto los términos de servicio, incluyendo la política de cancelación y las normas de convivencia del retiro."
        link="/terminos-condiciones"
        linkText="Leer Términos y Condiciones"
        checked={consent.acceptsTermsAndConditions}
        required
      />

      <ConsentCheckbox
        id="acceptsPrivacyPolicy"
        label="Acepto la Política de Privacidad"
        description="He leído y acepto cómo se manejarán mis datos personales de acuerdo con la Ley Federal de Protección de Datos Personales (LFPDPPP)."
        link="/politica-privacidad"
        linkText="Leer Política de Privacidad"
        checked={consent.acceptsPrivacyPolicy}
        required
      />

      <div className="bg-[var(--warm-gray-50)] border border-[var(--coral-light)] rounded-lg p-4 mt-6">
        <h3 className="font-medium text-[var(--burgundy-dark)] mb-2">
          Consentimiento para datos sensibles
        </h3>
        <p className="text-sm text-[var(--burgundy-dark)] mb-4">
          De acuerdo con la LFPDPPP, la información de salud que has proporcionado se
          considera "datos personales sensibles". Tu consentimiento expreso es requerido
          para su procesamiento.
        </p>

        <ConsentCheckbox
          id="acceptsSensitiveDataProcessing"
          label="Autorizo el tratamiento de mis datos personales sensibles"
          description="Otorgo mi consentimiento expreso para que Floresiendo procese la información de salud que he proporcionado en este cuestionario, con la única finalidad de evaluar mi elegibilidad y garantizar mi seguridad durante el retiro."
          checked={consent.acceptsSensitiveDataProcessing}
          required
        />
      </div>

      {/* Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--warm-gray-600)]">
            Consentimientos aceptados:
          </span>
          <span className={`font-medium ${allRequired ? "text-green-600" : "text-gray-400"}`}>
            {[
              consent.accepts7DayPreparation,
              consent.understandsSpiritualNotMedical,
              consent.acceptsTermsAndConditions,
              consent.acceptsPrivacyPolicy,
              consent.acceptsSensitiveDataProcessing,
            ].filter(Boolean).length} / 5
          </span>
        </div>

        {!allRequired && (
          <p className="text-sm text-amber-600 mt-2">
            Debes aceptar todos los consentimientos para enviar tu solicitud.
          </p>
        )}

        {allRequired && (
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Todo listo. Puedes enviar tu solicitud.
          </p>
        )}
      </div>
    </div>
  );
}
