// components/screening/ScreeningWizard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useScreeningStore, useCompletionPercentage } from "@/lib/screening-store";
import { STEPS } from "@/lib/screening-types";
import { getRiskColor, getRiskStatus } from "@/lib/screening-logic";
import { StepProgress } from "./StepProgress";
import { WelcomeScreen } from "./WelcomeScreen";
import { BasicInfoStep } from "./steps/BasicInfoStep";
import { MedicalHistoryStep } from "./steps/MedicalHistoryStep";
import { MedicationsStep } from "./steps/MedicationsStep";
import { MentalHealthStep } from "./steps/MentalHealthStep";
import { LifestyleStep } from "./steps/LifestyleStep";
import { IntentionsStep } from "./steps/IntentionsStep";
import { ConsentStep } from "./steps/ConsentStep";
import { KnockoutModal } from "./KnockoutModal";
import { ReviewFlagModal } from "./ReviewFlagModal";

export function ScreeningWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPackage = searchParams.get("package");

  const {
    currentStep,
    riskLevel,
    riskMessages,
    lastSavedAt,
    nextStep,
    prevStep,
    evaluateRisk,
    formData,
  } = useScreeningStore();

  const completionPercentage = useCompletionPercentage();

  const [showWelcome, setShowWelcome] = useState(true);
  const [showKnockout, setShowKnockout] = useState(false);
  const [showReviewFlag, setShowReviewFlag] = useState(false);
  const [knockoutData, setKnockoutData] = useState({ message: "", recommendation: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration mismatch with localStorage
  useEffect(() => {
    setIsHydrated(true);
    // Skip welcome if user already has progress
    if (currentStep > 1 || formData.basicInfo?.fullName) {
      setShowWelcome(false);
    }
  }, []);

  // Check for hard blocks - only show modal once per red condition
  const [lastShownRiskMessage, setLastShownRiskMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isHydrated) return;

    const result = evaluateRisk();
    // Only show knockout if it's a new red condition we haven't shown yet
    if (result.level === "red" && result.messages.length > 0) {
      const currentMessage = result.messages[0];
      if (currentMessage !== lastShownRiskMessage) {
        setKnockoutData({
          message: currentMessage,
          recommendation: result.recommendation || "",
        });
        setShowKnockout(true);
        setLastShownRiskMessage(currentMessage);
      }
    }
  }, [formData, evaluateRisk, isHydrated, lastShownRiskMessage]);

  const handleNext = () => {
    const result = evaluateRisk();
    if (result.level === "red") {
      setKnockoutData({
        message: result.messages[0],
        recommendation: result.recommendation || "",
      });
      setShowKnockout(true);
      return;
    }
    nextStep();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const result = evaluateRisk();

    try {
      const response = await fetch("/api/screening-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          riskLevel: result.level,
          riskMessages: result.messages,
          requiresReview: result.requiresReview,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (result.level === "green") {
          // Auto-approved: redirect to payment
          router.push(`/encuentros/febrero-2026-precios?applicationId=${data.applicationId}`);
        } else if (result.level === "yellow") {
          // Soft flag: show review modal
          setShowReviewFlag(true);
        }
      } else {
        console.error("Submission error:", data);
        alert("Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return <BasicInfoStep />;
      case 2: return <MedicalHistoryStep />;
      case 3: return <MedicationsStep />;
      case 4: return <MentalHealthStep />;
      case 5: return <LifestyleStep />;
      case 6: return <IntentionsStep />;
      case 7: return <ConsentStep />;
      default: return <BasicInfoStep />;
    }
  };

  const currentStepData = STEPS.find((s) => s.id === currentStep);

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--warm-white)]">
        <div className="animate-pulse text-[var(--burgundy)]">Cargando...</div>
      </div>
    );
  }

  // Show welcome screen first
  if (showWelcome) {
    return (
      <WelcomeScreen
        selectedPackage={selectedPackage}
        onStart={() => setShowWelcome(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--warm-gray-50)] to-[var(--warm-white)] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--burgundy)] mb-2">
            Solicitud de Participación
          </h1>
          <p className="text-[var(--warm-gray-600)]">
            Retiro Floresiendo · Febrero 2026
          </p>
        </div>

        {/* Progress Bar */}
        <StepProgress
          currentStep={currentStep}
          steps={STEPS}
          completionPercentage={completionPercentage}
        />

        {/* Auto-save indicator */}
        {lastSavedAt && (
          <div className="text-center mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Guardado automáticamente
            </span>
          </div>
        )}

        {/* Risk indicator (only show if yellow) */}
        {riskLevel === "yellow" && riskMessages.length > 0 && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${getRiskColor(riskLevel)} mr-2`} />
              <span className="text-yellow-700 font-medium">
                {getRiskStatus(riskLevel)}
              </span>
            </div>
            <p className="text-yellow-600 text-sm mt-1">
              Algunas respuestas requieren revisión de nuestro equipo.
            </p>
          </div>
        )}

        {/* Current Step Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Step Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--coral)] font-medium">
                Paso {currentStep} de 7
              </span>
              <span className="text-sm text-gray-500">
                {currentStepData?.questionCount} preguntas
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {currentStepData?.title}
            </h2>
            <p className="text-gray-500 text-sm">
              {currentStepData?.description}
            </p>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderCurrentStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t border-[var(--warm-gray-200)]">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 text-[var(--burgundy)] font-medium rounded-lg hover:bg-[var(--warm-gray-100)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>

            {currentStep < 7 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 bg-[var(--coral)] text-white font-medium rounded-lg hover:bg-[var(--coral-dark)] transition-colors"
              >
                Siguiente
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-[var(--coral)] text-white font-medium rounded-lg hover:bg-[var(--coral-dark)] disabled:bg-[var(--coral-light)] disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  "Enviar Solicitud"
                )}
              </button>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-[var(--warm-gray-500)] mt-6">
          Tu información está protegida y solo será usada para evaluar tu participación.
          <br />
          <a href="/politica-privacidad" className="text-[var(--coral)] hover:underline">
            Consulta nuestra Política de Privacidad
          </a>
        </p>
      </div>

      {/* Modals */}
      <KnockoutModal
        isOpen={showKnockout}
        onClose={() => setShowKnockout(false)}
        message={knockoutData.message}
        recommendation={knockoutData.recommendation}
      />

      <ReviewFlagModal
        isOpen={showReviewFlag}
        onClose={() => setShowReviewFlag(false)}
      />
    </div>
  );
}
