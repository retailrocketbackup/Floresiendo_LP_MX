'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { trackEvent } from "@/lib/meta-tracking";

interface StripePaymentFormProps {
  productId: string;
  productName: string;
  amount: number; // In cents
  applicationId?: string;
  onSuccess?: (paymentIntentId: string) => void;
  onCancel?: () => void;
}

export default function StripePaymentForm({
  productId,
  productName,
  amount,
  applicationId,
  onSuccess,
  onCancel
}: StripePaymentFormProps) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Track InitiateCheckout when payment form is shown
  useEffect(() => {
    trackEvent("InitiateCheckout", {
      funnel: "pricing",
      content_type: "retreat_package",
      content_name: productName,
      value: amount / 100,
      currency: "MXN",
    }, { enableCAPI: true });
  }, [productName, amount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleCardChange = (event: StripeCardElementChangeEvent) => {
    setCardComplete(event.complete);
    setCardError(event.error ? event.error.message : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate form
    if (!formData.name || !formData.email) {
      setError('Por favor completa todos los campos requeridos');
      setLoading(false);
      return;
    }

    if (!stripe || !elements) {
      setError('Sistema de pago no disponible. Por favor recarga la página.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Error al cargar el formulario de tarjeta');
      setLoading(false);
      return;
    }

    try {
      // Step 1: Create Payment Intent on backend
      const intentResponse = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          customerEmail: formData.email,
          customerName: formData.name,
          customerPhone: formData.phone || undefined,
          applicationId,
        })
      });

      const intentData = await intentResponse.json();

      if (!intentData.success) {
        setError(intentData.error || 'Error al crear el pago');
        setLoading(false);
        return;
      }

      // Step 2: Confirm payment with card element
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        intentData.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone || undefined,
            },
          },
        }
      );

      if (confirmError) {
        // Handle specific error types
        if (confirmError.type === 'card_error' || confirmError.type === 'validation_error') {
          setError(confirmError.message || 'Error con la tarjeta');
        } else {
          setError('Error al procesar el pago. Por favor intenta de nuevo.');
        }
        setLoading(false);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        // Track Purchase event
        await trackEvent("Purchase", {
          funnel: "pricing",
          content_type: "retreat_booking",
          content_name: productName,
          value: amount / 100,
          currency: "MXN",
          email: formData.email,
          first_name: formData.name.split(' ')[0],
          phone: formData.phone,
        }, { enableCAPI: true });

        setSuccess(true);

        if (onSuccess) {
          onSuccess(paymentIntent.id);
        }

        // Redirect to success page
        setTimeout(() => {
          router.push(`/pago-exitoso?payment_intent=${paymentIntent.id}&product=${productId}`);
        }, 1500);

      } else if (paymentIntent?.status === 'requires_action') {
        // 3D Secure or other authentication required
        // Stripe.js handles this automatically with confirmCardPayment
        setError('Se requiere verificación adicional. Por favor completa la autenticación.');
        setLoading(false);
      } else {
        setError('El pago está pendiente de confirmación.');
        setLoading(false);
      }

    } catch (err: unknown) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Error al procesar el pago. Por favor intenta de nuevo.');
      setLoading(false);
    }
  };

  const displayAmount = (amount / 100).toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN'
  });

  // Stripe CardElement styling to match brand
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        '::placeholder': {
          color: 'rgba(255, 255, 255, 0.4)',
        },
        iconColor: '#ffffff',
      },
      invalid: {
        color: '#ff6b6b',
        iconColor: '#ff6b6b',
      },
      complete: {
        color: '#4ade80',
        iconColor: '#4ade80',
      },
    },
    hidePostalCode: true, // Mexico doesn't require postal code
  };

  const isFormValid = stripe && cardComplete && formData.name && formData.email;

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-2">{productName}</h3>
          <p className="text-3xl font-bold text-coral-light">{displayAmount}</p>
        </div>

        {/* Error Message */}
        {(error || cardError) && (
          <div className="bg-red-500/20 border border-red-400/50 rounded-xl p-4 text-red-200 text-sm">
            {error || cardError}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/20 border border-green-400/50 rounded-xl p-4 text-green-200 text-center">
            <p className="font-semibold text-lg">Pago Exitoso</p>
            <p className="text-sm mt-1">Redirigiendo...</p>
          </div>
        )}

        {!success && (
          <>
            {/* Customer Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Juan Pérez"
                  disabled={loading}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/50 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="juan@ejemplo.com"
                  disabled={loading}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/50 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+52 618 123 4567"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/50 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Card Info */}
            <div className="space-y-4 pt-4 border-t border-white/20">
              <p className="text-sm font-medium text-white/80">Datos de Tarjeta</p>

              <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl">
                <CardElement
                  options={cardElementOptions}
                  onChange={handleCardChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="w-full py-4 bg-coral hover:bg-coral-dark text-white font-bold text-lg rounded-full transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Procesando...
                </span>
              ) : (
                `Invertir ${displayAmount}`
              )}
            </button>

            {/* Cancel Button */}
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="w-full py-3 text-white/70 hover:text-white transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
            )}

            {/* Security Badge */}
            <div className="text-center text-xs text-white/50 space-y-1">
              <p>Pago seguro con encriptación SSL</p>
              <p>Procesado por Stripe</p>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
