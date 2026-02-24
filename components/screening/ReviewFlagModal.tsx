// components/screening/ReviewFlagModal.tsx
"use client";

import { useEffect, useRef } from "react";

interface ReviewFlagModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewFlagModal({ isOpen, onClose }: ReviewFlagModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 animate-in fade-in zoom-in-95"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-title"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <h2
          id="review-title"
          className="text-xl font-bold text-[var(--warm-gray-800)] text-center mb-4"
        >
          Solicitud Recibida
        </h2>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-yellow-800 text-sm">
            Tu solicitud requiere revisión adicional por parte de nuestro equipo.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-[var(--coral-light)]/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-[var(--coral)] font-bold text-sm">1</span>
            </div>
            <div>
              <h4 className="font-medium text-[var(--warm-gray-800)]">Revisión del equipo</h4>
              <p className="text-sm text-[var(--warm-gray-500)]">
                Karla o Ramón revisarán tu información en las próximas 24-48 horas.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-[var(--coral-light)]/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-[var(--coral)] font-bold text-sm">2</span>
            </div>
            <div>
              <h4 className="font-medium text-[var(--warm-gray-800)]">Te contactaremos</h4>
              <p className="text-sm text-[var(--warm-gray-500)]">
                Recibirás un mensaje por WhatsApp o email con el resultado.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-[var(--coral-light)]/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-[var(--coral)] font-bold text-sm">3</span>
            </div>
            <div>
              <h4 className="font-medium text-[var(--warm-gray-800)]">Siguiente paso</h4>
              <p className="text-sm text-[var(--warm-gray-500)]">
                Si tu solicitud es aprobada, te enviaremos el enlace de pago.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-[var(--warm-gray-500)] text-sm mb-6">
          Gracias por tu paciencia. Queremos asegurarnos de que esta experiencia sea segura y transformadora para ti.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <a
            href="/"
            className="w-full py-3 bg-[var(--coral)] text-white font-medium rounded-lg hover:bg-[var(--burgundy)] transition-colors text-center"
          >
            Volver al inicio
          </a>

          <a
            href="https://api.whatsapp.com/send?phone=+526182301481&text=Hola,%20acabo%20de%20enviar%20mi%20solicitud%20para%20el%20retiro%20y%20tengo%20preguntas."
            className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            ¿Tienes preguntas?
          </a>
        </div>
      </div>
    </div>
  );
}
