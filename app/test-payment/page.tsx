'use client';

import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from "@/lib/stripe-client"
import StripePaymentForm from "@/components/StripePaymentForm"

// Test page for verifying live Stripe payments
// DELETE THIS FILE after testing
export default function TestPaymentPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-burgundy to-burgundy-dark flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-md w-full border border-white/20">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Test de Pago - $10 MXN</h1>
          <p className="text-white/70 text-sm">
            Prueba de integración Stripe en modo LIVE.<br/>
            Este cargo es REAL. Reembolsar después del test.
          </p>
        </div>

        <Elements stripe={getStripe()}>
          <StripePaymentForm
            productId="TEST"
            productName="Prueba de Pago - $10 MXN"
            amount={1000}
            onCancel={() => window.history.back()}
          />
        </Elements>
      </div>
    </main>
  )
}
