'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Declare Conekta global type
declare global {
  interface Window {
    Conekta: {
      setPublicKey: (key: string) => void;
      Token: {
        create: (
          data: { card: CardData },
          success: (token: { id: string }) => void,
          error: (error: { message: string }) => void
        ) => void;
      };
    };
  }
}

interface CardData {
  number: string;
  name: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
}

interface ConektaPaymentFormProps {
  productId: string;
  productName: string;
  amount: number; // In cents
  onSuccess?: (chargeId: string) => void;
  onCancel?: () => void;
}

export default function ConektaPaymentForm({
  productId,
  productName,
  amount,
  onSuccess,
  onCancel
}: ConektaPaymentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [conektaReady, setConektaReady] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardMonth: '',
    cardYear: '',
    cardCvc: ''
  });

  // Initialize Conekta.js
  useEffect(() => {
    const initConekta = () => {
      if (typeof window !== 'undefined' && window.Conekta) {
        const publicKey = process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY;
        if (publicKey) {
          window.Conekta.setPublicKey(publicKey);
          setConektaReady(true);
        } else {
          setError('Payment system not configured');
        }
      }
    };

    // Check if Conekta is already loaded
    if (window.Conekta) {
      initConekta();
    } else {
      // Wait for script to load
      const checkConekta = setInterval(() => {
        if (window.Conekta) {
          initConekta();
          clearInterval(checkConekta);
        }
      }, 100);

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkConekta);
        if (!conektaReady) {
          setError('Payment system failed to load. Please refresh the page.');
        }
      }, 10000);

      return () => clearInterval(checkConekta);
    }
  }, [conektaReady]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(' ') : value;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate form
    if (!formData.name || !formData.email || !formData.cardNumber) {
      setError('Por favor completa todos los campos requeridos');
      setLoading(false);
      return;
    }

    if (!conektaReady || !window.Conekta) {
      setError('Sistema de pago no disponible. Por favor recarga la página.');
      setLoading(false);
      return;
    }

    try {
      // Step 1: Tokenize card with Conekta.js
      const token = await new Promise<{ id: string }>((resolve, reject) => {
        window.Conekta.Token.create(
          {
            card: {
              number: formData.cardNumber.replace(/\s/g, ''),
              name: formData.name,
              exp_month: formData.cardMonth,
              exp_year: formData.cardYear.length === 2 ? `20${formData.cardYear}` : formData.cardYear,
              cvc: formData.cardCvc
            }
          },
          resolve,
          reject
        );
      });

      // Step 2: Send token to backend
      const response = await fetch('/api/payments/create-charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenId: token.id,
          productId,
          customerEmail: formData.email,
          customerName: formData.name,
          customerPhone: formData.phone || undefined
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);

        if (onSuccess) {
          onSuccess(data.charge.id);
        }

        // Redirect to success page
        setTimeout(() => {
          router.push(`/pago-exitoso?charge_id=${data.charge.id}&product=${productId}`);
        }, 1500);
      } else {
        setError(data.error || 'El pago fue rechazado. Por favor verifica tus datos.');
      }

    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Error al procesar el pago. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const displayAmount = (amount / 100).toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN'
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-2">{productName}</h3>
          <p className="text-3xl font-bold text-coral-light">{displayAmount}</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-400/50 rounded-xl p-4 text-red-200 text-sm">
            {error}
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

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Número de Tarjeta *
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    setFormData(prev => ({ ...prev, cardNumber: formatted }));
                  }}
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                  disabled={loading}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/50 disabled:opacity-50 font-mono"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Mes *
                  </label>
                  <input
                    type="text"
                    name="cardMonth"
                    value={formData.cardMonth}
                    onChange={handleChange}
                    placeholder="12"
                    maxLength={2}
                    disabled={loading}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/50 disabled:opacity-50 text-center font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Año *
                  </label>
                  <input
                    type="text"
                    name="cardYear"
                    value={formData.cardYear}
                    onChange={handleChange}
                    placeholder="26"
                    maxLength={4}
                    disabled={loading}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/50 disabled:opacity-50 text-center font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    CVC *
                  </label>
                  <input
                    type="text"
                    name="cardCvc"
                    value={formData.cardCvc}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength={4}
                    disabled={loading}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/50 disabled:opacity-50 text-center font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !conektaReady}
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
              <p>Procesado por Conekta</p>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
