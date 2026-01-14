// components/screening/steps/BasicInfoStep.tsx
"use client";

import { useScreeningStore } from "@/lib/screening-store";
import type { BasicInfoData } from "@/lib/screening-types";

export function BasicInfoStep() {
  const { formData, updateBasicInfo } = useScreeningStore();
  const basicInfo = (formData.basicInfo || {}) as Partial<BasicInfoData>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateBasicInfo({ [name]: value });
  };

  return (
    <div className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
          Nombre completo *
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          value={basicInfo.fullName || ""}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
          placeholder="Tu nombre completo"
        />
      </div>

      {/* Birth Date */}
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
          Fecha de nacimiento *
        </label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          required
          value={basicInfo.birthDate || ""}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
        />
        <p className="text-xs text-[var(--warm-gray-500)] mt-1">
          Debes ser mayor de 18 años para participar
        </p>
      </div>

      {/* Gender */}
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
          Género *
        </label>
        <select
          id="gender"
          name="gender"
          required
          value={basicInfo.gender || ""}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors bg-white"
        >
          <option value="">Selecciona una opción</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
          <option value="prefiero_no_decir">Prefiero no decir</option>
        </select>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
          Correo electrónico *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={basicInfo.email || ""}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
          placeholder="tu@email.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
          Teléfono (WhatsApp) *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={basicInfo.phone || ""}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
          placeholder="+52 618 123 4567"
        />
        <p className="text-xs text-[var(--warm-gray-500)] mt-1">
          Este número se usará para comunicación importante sobre el retiro
        </p>
      </div>

      {/* Emergency Contact Section */}
      <div className="pt-4 border-t border-[var(--warm-gray-200)]">
        <h3 className="text-lg font-medium text-[var(--warm-gray-800)] mb-4">
          Contacto de emergencia
        </h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="emergencyContactName" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
              Nombre del contacto *
            </label>
            <input
              type="text"
              id="emergencyContactName"
              name="emergencyContactName"
              required
              value={basicInfo.emergencyContactName || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
              placeholder="Nombre de familiar o amigo cercano"
            />
          </div>

          <div>
            <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-[var(--warm-gray-700)] mb-2">
              Teléfono del contacto *
            </label>
            <input
              type="tel"
              id="emergencyContactPhone"
              name="emergencyContactPhone"
              required
              value={basicInfo.emergencyContactPhone || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[var(--warm-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--coral)] focus:border-transparent transition-colors"
              placeholder="+52 618 123 4567"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
