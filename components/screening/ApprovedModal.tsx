// components/screening/ApprovedModal.tsx
"use client";

interface ApprovedModalProps {
  isOpen: boolean;
  applicationId: string;
  userName: string;
  onProceedToPayment: () => void;
}

export function ApprovedModal({
  isOpen,
  applicationId,
  userName,
  onProceedToPayment,
}: ApprovedModalProps) {
  if (!isOpen) return null;

  const firstName = userName.split(" ")[0] || "participante";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-300">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[var(--burgundy)] mb-2">
          ¡Felicidades, {firstName}!
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-700 mb-4">
          Tu solicitud ha sido aprobada
        </p>

        {/* Application ID */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-700 mb-1">ID de solicitud:</p>
          <p className="font-mono font-bold text-green-800">{applicationId}</p>
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-8">
          Estás a un paso de asegurar tu lugar en el retiro Floresiendo.
          Procede al pago para confirmar tu participación.
        </p>

        {/* CTA Button */}
        <button
          onClick={onProceedToPayment}
          className="w-full py-4 bg-gradient-to-r from-[var(--coral)] to-[var(--coral-dark)] hover:from-[var(--coral-light)] hover:to-[var(--coral)] text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--coral)]/30"
        >
          Proceder al Pago
        </button>

        {/* Note */}
        <p className="text-xs text-gray-500 mt-4">
          Tu lugar se reservará una vez completado el pago
        </p>
      </div>
    </div>
  );
}
