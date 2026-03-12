"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/meta-tracking";
import { Loader2, ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";

interface ConferenceRegistrationFormProps {
  funnelName: string;
  eventNamePrefix: string; // e.g., "Conferencia_VidaPerfecta"
  redirectPath: string; // e.g., "/f/conferencia-vida-perfecta/gracias"
  painPointOptions?: string[]; // Custom pain points per funnel
  requirePhoneVerification?: boolean; // When true, sends SMS OTP before allowing submit
}

const DEFAULT_PAIN_POINTS = [
  "Mi vida se ve bien pero me siento vacío/a",
  "Siento que construí la vida equivocada",
  "Estoy agotado/a y desconectado/a de mí mismo/a",
  "Logré todo lo que 'debía' lograr pero no me hace feliz",
  "Otro",
];

export function ConferenceRegistrationForm({
  funnelName,
  eventNamePrefix,
  redirectPath,
  painPointOptions,
  requirePhoneVerification = false,
}: ConferenceRegistrationFormProps) {
  const PAIN_POINTS = painPointOptions || DEFAULT_PAIN_POINTS;
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    countryCode: "+52",
    phoneNumber: "",
    painPoint: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Phone verification state
  const [verificationStep, setVerificationStep] = useState<
    "idle" | "sending" | "code_sent" | "verifying" | "verified"
  >("idle");
  const [otpCode, setOtpCode] = useState("");
  const [verifyError, setVerifyError] = useState<string | null>(null);

  // Expected digit counts per country code
  const PHONE_LENGTHS: Record<string, number> = {
    "+52": 10, // Mexico
    "+1": 10,  // US/Canada
    "+34": 9,  // Spain
    "+54": 10, // Argentina
    "+57": 10, // Colombia
    "+51": 9,  // Peru
    "+56": 9,  // Chile
  };

  const validatePhone = (digits: string, countryCode: string): string | null => {
    if (!digits) return null;
    const expected = PHONE_LENGTHS[countryCode] || 10;
    if (digits.length < expected) {
      return `Ingresa ${expected} dígitos (faltan ${expected - digits.length})`;
    }
    if (digits.length > expected) {
      return `Máximo ${expected} dígitos`;
    }
    return null;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const digitsOnly = value.replace(/\D/g, "");
      const expected = PHONE_LENGTHS[formData.countryCode] || 10;
      const capped = digitsOnly.slice(0, expected);
      setFormData((prev) => ({ ...prev, phoneNumber: capped }));
      setPhoneError(validatePhone(capped, formData.countryCode));
      setError(null);
      // Reset verification if phone changes
      if (verificationStep === "code_sent" || verificationStep === "verified") {
        setVerificationStep("idle");
        setOtpCode("");
        setVerifyError(null);
      }
      return;
    }

    if (name === "countryCode") {
      setFormData((prev) => ({ ...prev, countryCode: value }));
      setPhoneError(validatePhone(formData.phoneNumber, value));
      setError(null);
      // Reset verification if country changes
      if (verificationStep !== "idle") {
        setVerificationStep("idle");
        setOtpCode("");
        setVerifyError(null);
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  // Send OTP code
  const handleSendOTP = async () => {
    const phoneValidation = validatePhone(formData.phoneNumber, formData.countryCode);
    if (phoneValidation) {
      setPhoneError(phoneValidation);
      return;
    }

    setVerificationStep("sending");
    setVerifyError(null);

    try {
      const fullPhone = `${formData.countryCode}${formData.phoneNumber}`;
      const res = await fetch("/api/twilio-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone, action: "send" }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Error al enviar código");
      }

      setVerificationStep("code_sent");
    } catch (err) {
      setVerifyError(
        err instanceof Error ? err.message : "Error al enviar código. Intenta de nuevo."
      );
      setVerificationStep("idle");
    }
  };

  // Verify OTP code
  const handleVerifyOTP = async () => {
    if (otpCode.length !== 6) {
      setVerifyError("Ingresa el código de 6 dígitos");
      return;
    }

    setVerificationStep("verifying");
    setVerifyError(null);

    try {
      const fullPhone = `${formData.countryCode}${formData.phoneNumber}`;
      const res = await fetch("/api/twilio-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone, action: "verify", code: otpCode }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Código incorrecto. Intenta de nuevo.");
      }

      setVerificationStep("verified");
      setVerifyError(null);
    } catch (err) {
      setVerifyError(
        err instanceof Error ? err.message : "Error al verificar. Intenta de nuevo."
      );
      setVerificationStep("code_sent");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone before submit
    const phoneValidation = validatePhone(formData.phoneNumber, formData.countryCode);
    if (phoneValidation) {
      setPhoneError(phoneValidation);
      return;
    }

    // Block submit if phone verification required but not completed
    if (requirePhoneVerification && verificationStep !== "verified") {
      setError("Por favor verifica tu número de teléfono antes de continuar.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const fullPhoneNumber = `${formData.countryCode}${formData.phoneNumber}`;
    // Generate synthetic email from phone for HubSpot deduplication
    const syntheticEmail = `${formData.phoneNumber}@wa.floresiendo.mx`;

    try {
      // 1. Track Lead event (form interaction)
      await trackEvent(
        `Lead_${eventNamePrefix}`,
        {
          funnel: funnelName,
          content_type: "conference_registration",
          content_name: `conference_${funnelName}`,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: fullPhoneNumber,
        },
        { enableCAPI: true }
      );

      // 2. Extract tracking parameters for attribution
      const urlParams = new URLSearchParams(window.location.search);

      // 3. Submit to registration API
      const response = await fetch("/api/conference-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: syntheticEmail,
          phone: fullPhoneNumber,
          painPoint: formData.painPoint,
          funnelSource: funnelName,
          landingPage: window.location.href,
          phoneVerified: requirePhoneVerification ? verificationStep === "verified" : undefined,
          utm_source: urlParams.get("utm_source") || undefined,
          utm_medium: urlParams.get("utm_medium") || undefined,
          utm_campaign: urlParams.get("utm_campaign") || undefined,
          fbclid: urlParams.get("fbclid") || undefined,
          gclid: urlParams.get("gclid") || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al registrar");
      }

      // 4. Track CompleteRegistration event
      await trackEvent(
        `CompleteRegistration_${eventNamePrefix}`,
        {
          funnel: funnelName,
          content_type: "conference_registration",
          content_name: `conference_${funnelName}`,
          value: 0,
          currency: "MXN",
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: fullPhoneNumber,
        },
        { enableCAPI: true }
      );

      // 5. Redirect to thank you page
      router.push(redirectPath);
    } catch (err) {
      console.error("[ConferenceForm] Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Hubo un error. Por favor intenta de nuevo."
      );
      setIsSubmitting(false);
    }
  };

  const isPhoneComplete =
    formData.phoneNumber.length === (PHONE_LENGTHS[formData.countryCode] || 10);

  return (
    <div className="w-full max-w-lg mx-auto">
      <form id="floresiendo-conference-registration" name="floresiendo-conference-registration" onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-xs sm:text-sm font-medium text-warm-gray-700 mb-1 sm:mb-1.5"
            >
              Nombre *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-warm-gray-200 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent transition-all bg-white text-warm-gray-800 placeholder:text-warm-gray-400 text-sm sm:text-base"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-xs sm:text-sm font-medium text-warm-gray-700 mb-1 sm:mb-1.5"
            >
              Apellido *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-warm-gray-200 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent transition-all bg-white text-warm-gray-800 placeholder:text-warm-gray-400 text-sm sm:text-base"
              placeholder="Tu apellido"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-xs sm:text-sm font-medium text-warm-gray-700 mb-1 sm:mb-1.5"
          >
            WhatsApp *
          </label>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <select
              name="countryCode"
              id="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              disabled={verificationStep === "verified"}
              className="flex-shrink-0 w-16 sm:w-auto px-1.5 sm:px-3 py-2.5 sm:py-3 border border-warm-gray-200 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent transition-all bg-white text-warm-gray-800 text-xs sm:text-sm disabled:bg-warm-gray-100 disabled:cursor-not-allowed"
            >
              <option value="+52">+52</option>
              <option value="+1">+1</option>
              <option value="+34">+34</option>
              <option value="+54">+54</option>
              <option value="+57">+57</option>
              <option value="+51">+51</option>
              <option value="+56">+56</option>
            </select>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              inputMode="numeric"
              pattern="[0-9]*"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              disabled={verificationStep === "verified"}
              className={`flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent transition-all bg-white text-warm-gray-800 placeholder:text-warm-gray-400 text-sm sm:text-base disabled:bg-warm-gray-100 disabled:cursor-not-allowed ${phoneError ? "border-red-400" : verificationStep === "verified" ? "border-green-400" : "border-warm-gray-200"}`}
              placeholder={`${PHONE_LENGTHS[formData.countryCode] || 10} dígitos`}
            />
          </div>
          {phoneError ? (
            <p className="text-[10px] sm:text-xs text-red-500 mt-1">
              {phoneError}
            </p>
          ) : verificationStep === "verified" ? (
            <p className="text-[10px] sm:text-xs text-green-600 mt-1 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Número verificado
            </p>
          ) : (
            <p className="text-[10px] sm:text-xs text-warm-gray-500 mt-1">
              Te enviaremos recordatorios por WhatsApp
            </p>
          )}
        </div>

        {/* Phone Verification Flow */}
        {requirePhoneVerification && verificationStep !== "verified" && (
          <div className="bg-warm-gray-50 rounded-xl p-3 sm:p-4 border border-warm-gray-200">
            {verificationStep === "idle" || verificationStep === "sending" ? (
              <>
                <p className="text-xs sm:text-sm text-warm-gray-600 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-coral" />
                  Verifica tu número para completar el registro
                </p>
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={!isPhoneComplete || verificationStep === "sending"}
                  className="w-full bg-warm-gray-800 hover:bg-warm-gray-900 disabled:bg-warm-gray-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-all text-sm disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {verificationStep === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enviando código...
                    </>
                  ) : (
                    "Enviar código por SMS"
                  )}
                </button>
              </>
            ) : (
              <>
                <p className="text-xs sm:text-sm text-warm-gray-600 mb-2">
                  Ingresa el código de 6 dígitos que recibiste por SMS:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setOtpCode(val);
                      setVerifyError(null);
                    }}
                    className="flex-1 px-3 py-2.5 border border-warm-gray-200 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent text-center text-lg tracking-[0.3em] font-mono"
                    placeholder="000000"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={otpCode.length !== 6 || verificationStep === "verifying"}
                    className="bg-coral hover:bg-coral-dark disabled:bg-coral/50 text-white font-semibold py-2.5 px-4 rounded-lg transition-all text-sm disabled:cursor-not-allowed flex items-center gap-1.5"
                  >
                    {verificationStep === "verifying" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Verificar"
                    )}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleSendOTP}
                  className="text-xs text-warm-gray-500 hover:text-coral mt-2 transition-colors"
                >
                  Reenviar código
                </button>
              </>
            )}
            {verifyError && (
              <p className="text-xs text-red-500 mt-2">{verifyError}</p>
            )}
          </div>
        )}

        {/* Pain Point (Optional) */}
        <div>
          <label
            htmlFor="painPoint"
            className="block text-xs sm:text-sm font-medium text-warm-gray-700 mb-1 sm:mb-1.5"
          >
            ¿Qué te trae aquí? (opcional)
          </label>
          <select
            name="painPoint"
            id="painPoint"
            value={formData.painPoint}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-warm-gray-200 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent transition-all bg-white text-warm-gray-800 text-sm"
          >
            <option value="" className="text-warm-gray-400">Selecciona una opción...</option>
            {PAIN_POINTS.map((point) => (
              <option key={point} value={point} className="text-warm-gray-800">
                {point}
              </option>
            ))}
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl text-red-700 text-xs sm:text-sm">
            {error}
          </div>
        )}

        {/* Submit Button - Coral primary style */}
        <button
          type="submit"
          disabled={isSubmitting || (requirePhoneVerification && verificationStep !== "verified")}
          className="w-full bg-coral hover:bg-coral-dark disabled:bg-coral/50 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:hover:scale-100 text-base group text-shadow-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Registrando...</span>
            </>
          ) : (
            <>
              <span>Reservar mi lugar gratis</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Trust Indicators */}
        <p className="text-center text-[10px] sm:text-xs text-warm-gray-500">
          Sin costo. Sin compromiso. Recibirás confirmación por correo y
          WhatsApp.
        </p>
      </form>
    </div>
  );
}
