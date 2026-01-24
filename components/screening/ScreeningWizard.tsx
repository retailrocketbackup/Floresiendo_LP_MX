// components/screening/ScreeningWizard.tsx
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useScreeningStore, useCompletionPercentage } from "@/lib/screening-store";
import { STEPS } from "@/lib/screening-types";
import { getRiskColor, getRiskStatus } from "@/lib/screening-logic";
import { validateStep } from "@/lib/screening-validation";
import { trackEvent } from "@/lib/meta-tracking";
import { useAnalyticsStore, useStepAnalytics } from "@/lib/analytics";
import { useExitTracking } from "@/lib/analytics/beacon";
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
import { ApprovedModal } from "./ApprovedModal";

export function ScreeningWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPackage = searchParams.get("package");

  const {
    currentStep,
    riskLevel,
    riskMessages,
    nextStep,
    prevStep,
    evaluateRisk,
    formData,
  } = useScreeningStore();

  const completionPercentage = useCompletionPercentage();

  // Field-level analytics
  const { initSession, onStepComplete, markSessionComplete } = useStepAnalytics();
  const { setCurrentStep: setAnalyticsStep } = useAnalyticsStore();
  useExitTracking(); // Enable exit/pause tracking

  const [showWelcome, setShowWelcome] = useState(true);
  const [showKnockout, setShowKnockout] = useState(false);
  const [showReviewFlag, setShowReviewFlag] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [approvedData, setApprovedData] = useState({ applicationId: "", userName: "" });
  const [knockoutData, setKnockoutData] = useState({ message: "", recommendation: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [validationAttempts, setValidationAttempts] = useState(0);
  const hasTrackedPageView = useRef(false);
  const hasInitializedAnalytics = useRef(false);

  // Handle hydration mismatch with localStorage
  useEffect(() => {
    setIsHydrated(true);
    // Skip welcome if user already has progress
    if (currentStep > 1 || formData.basicInfo?.fullName) {
      setShowWelcome(false);
    }
  }, []);

  // Initialize analytics session when form starts (not welcome screen)
  useEffect(() => {
    if (isHydrated && !showWelcome && !hasInitializedAnalytics.current) {
      hasInitializedAnalytics.current = true;
      initSession();
      setAnalyticsStep(currentStep);
    }
  }, [isHydrated, showWelcome, initSession, setAnalyticsStep, currentStep]);

  // Track ViewContent when user starts the screening form (only once)
  useEffect(() => {
    if (isHydrated && !showWelcome && !hasTrackedPageView.current) {
      hasTrackedPageView.current = true;
      trackEvent(
        "ViewContent_Aplicar",
        {
          funnel: "aplicar",
          content_type: "application_form",
          content_name: "screening_application_form",
          content_category: "retreat_application",
          value: 15000,
          currency: "MXN",
        },
        { enableCAPI: true }
      );
      console.log("📋 SCREENING: ViewContent_Aplicar tracked - form started");
    }
  }, [isHydrated, showWelcome]);

  // Check for hard blocks - memoized to prevent unnecessary calls
  const checkForHardBlocks = useCallback(() => {
    const result = evaluateRisk();
    if (result.level === "red" && result.messages.length > 0) {
      setKnockoutData({
        message: result.messages[0],
        recommendation: result.recommendation || "",
      });
      setShowKnockout(true);
      return true;
    }
    return false;
  }, [evaluateRisk]);

  const handleNext = () => {
    // First validate current step is complete
    const validation = validateStep(currentStep, formData);
    if (!validation.isValid) {
      setValidationError(validation.errorMessage || 'Por favor completa todos los campos requeridos');
      setValidationAttempts((prev) => prev + 1);
      return;
    }

    // Clear any previous validation error
    setValidationError(null);

    // Then check for risk/knockout conditions
    const result = evaluateRisk();
    if (result.level === "red") {
      setKnockoutData({
        message: result.messages[0],
        recommendation: result.recommendation || "",
      });
      setShowKnockout(true);
      return;
    }

    // Track step completion for analytics
    const stepData = STEPS.find((s) => s.id === currentStep);
    onStepComplete(currentStep, stepData?.shortTitle || `step${currentStep}`, validationAttempts);
    setValidationAttempts(0); // Reset for next step

    nextStep();
  };

  const handleSubmit = async () => {
    // Validate consent step before submitting
    const validation = validateStep(7, formData);
    if (!validation.isValid) {
      setValidationError(validation.errorMessage || 'Por favor acepta todos los consentimientos');
      setValidationAttempts((prev) => prev + 1);
      return;
    }

    setValidationError(null);
    setIsSubmitting(true);
    const result = evaluateRisk();

    // Track final step completion
    onStepComplete(7, 'consent', validationAttempts);
    markSessionComplete();

    // Track Lead event on form submission (before API call)
    const userData = {
      email: formData.basicInfo?.email,
      phone: formData.basicInfo?.phone,
      first_name: formData.basicInfo?.fullName?.split(" ")[0],
      last_name: formData.basicInfo?.fullName?.split(" ").slice(1).join(" "),
    };

    await trackEvent(
      "Lead_Retreat_Application",
      {
        funnel: "screening_application",
        content_type: "retreat_application",
        content_name: `screening_submission_${result.level}`,
        value: 15000,
        currency: "MXN",
        ...userData,
      },
      { enableCAPI: true }
    );
    console.log("📋 SCREENING: Lead_Retreat_Application event tracked - form submitted");

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
          // Auto-approved: show congratulations modal
          setApprovedData({
            applicationId: data.applicationId,
            userName: formData.basicInfo?.fullName || "",
          });
          setShowApproved(true);

          // Track CompleteRegistration_Retreat for approved applications
          await trackEvent(
            "CompleteRegistration_Retreat",
            {
              funnel: "screening_application",
              content_type: "retreat_application",
              content_name: "screening_approved",
              value: 15000,
              currency: "MXN",
              ...userData,
            },
            { enableCAPI: true }
          );
          console.log("📋 SCREENING: CompleteRegistration_Retreat tracked - application approved");
        } else if (result.level === "yellow") {
          // Soft flag: show review modal
          setShowReviewFlag(true);

          // Track CompleteRegistration_Retreat for pending review applications
          await trackEvent(
            "CompleteRegistration_Retreat",
            {
              funnel: "screening_application",
              content_type: "retreat_application",
              content_name: "screening_pending_review",
              value: 15000,
              currency: "MXN",
              ...userData,
            },
            { enableCAPI: true }
          );
          console.log("📋 SCREENING: CompleteRegistration_Retreat tracked - pending review");
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

  // OPTIMIZED ORDER: Easy questions first → Sensitive questions last
  // Step 1: Basic Info (easy - personal data)
  // Step 2: Intentions (easy - qualitative goals, builds emotional connection)
  // Step 3: Lifestyle (medium - habits, non-threatening)
  // Step 4: Medical History (medium - factual health data)
  // Step 5: Medications (medium - medication list)
  // Step 6: Mental Health (sensitive - moved LAST before consent for trust building)
  // Step 7: Consent (closure)
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return <BasicInfoStep />;
      case 2: return <IntentionsStep />;
      case 3: return <LifestyleStep />;
      case 4: return <MedicalHistoryStep />;
      case 5: return <MedicationsStep />;
      case 6: return <MentalHealthStep />;
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
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 text-sm flex items-center flex-wrap gap-1">
          <Link href="/encuentros" className="text-[var(--coral)] hover:underline">
            Encuentros
          </Link>
          <ChevronRight size={14} className="text-[var(--warm-gray-400)]" />
          <Link href="/encuentros/marzo-2026" className="text-[var(--coral)] hover:underline">
            Marzo 2026
          </Link>
          <ChevronRight size={14} className="text-[var(--warm-gray-400)]" />
          <span className="text-[var(--warm-gray-600)]">Tu Evaluación</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--burgundy)] mb-2">
            Tu Evaluación Personalizada de Seguridad
          </h1>
          <p className="text-[var(--warm-gray-600)]">
            Creemos un plan que sea perfecto y seguro para ti
          </p>
          <p className="text-[var(--warm-gray-500)] text-sm mt-1">
            Retiro Floresiendo · Marzo 2026
          </p>
        </div>

        {/* Progress Bar */}
        <StepProgress completionPercentage={completionPercentage} />

        {/* Risk indicator - fixed height container to prevent layout shift */}
        <div className={`mb-4 overflow-hidden transition-all duration-300 ${
          riskLevel === "yellow" && riskMessages.length > 0 ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
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
        </div>

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

          {/* Validation Error */}
          {validationError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 text-sm">{validationError}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t border-[var(--warm-gray-200)]">
            <button
              type="button"
              onClick={() => { setValidationError(null); prevStep(); }}
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

      <ApprovedModal
        isOpen={showApproved}
        applicationId={approvedData.applicationId}
        userName={approvedData.userName}
        onProceedToPayment={() => {
          const packageParam = selectedPackage ? `&package=${selectedPackage}` : '';
          router.push(`/encuentros/marzo-2026-precios?applicationId=${approvedData.applicationId}${packageParam}&autoOpenPayment=true`);
        }}
      />
    </div>
  );
}
