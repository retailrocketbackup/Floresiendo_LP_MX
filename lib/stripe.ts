// lib/stripe.ts
// Stripe API client for server-side use

import Stripe from 'stripe';

// Initialize Stripe with secret key (server-side only)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

/**
 * Payment product configurations
 * Amounts are in MXN cents (multiply by 100)
 */
export const PAYMENT_PRODUCTS = {
  // Test product - minimum $10 MXN for testing live payments
  TEST: {
    id: 'test',
    name: 'Prueba de Pago - $10 MXN',
    amount: 1000, // $10 MXN in cents (minimum allowed by Stripe)
    description: 'Pago de prueba - se reembolsará inmediatamente'
  },
  DEPOSIT: {
    id: 'deposit',
    name: 'Anticipo - Encuentro Marzo 2026',
    amount: 300000, // $3,000 MXN in cents
    description: 'Anticipo para reservar tu lugar en el Encuentro de Marzo 2026'
  },
  TWO_NIGHTS_EARLY: {
    id: '2nights_early',
    name: 'Retiro 2 Noches - Precio Especial',
    amount: 710000, // $7,100 MXN
    description: 'Paquete completo de 2 noches - Encuentro Marzo 2026 (Precio especial)'
  },
  TWO_NIGHTS_REGULAR: {
    id: '2nights_regular',
    name: 'Retiro 2 Noches',
    amount: 800000, // $8,000 MXN
    description: 'Paquete completo de 2 noches - Encuentro Marzo 2026'
  },
  THREE_NIGHTS_EARLY: {
    id: '3nights_early',
    name: 'Retiro 3 Noches - Precio Especial',
    amount: 1020000, // $10,200 MXN
    description: 'Paquete completo de 3 noches - Encuentro Marzo 2026 (Precio especial)'
  },
  THREE_NIGHTS_REGULAR: {
    id: '3nights_regular',
    name: 'Retiro 3 Noches',
    amount: 1150000, // $11,500 MXN
    description: 'Paquete completo de 3 noches - Encuentro Marzo 2026'
  }
} as const;

export type PaymentProductId = keyof typeof PAYMENT_PRODUCTS;

/**
 * Create a Payment Intent for the given product
 */
export async function createPaymentIntent(params: {
  productId: PaymentProductId;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  applicationId?: string;
}): Promise<{
  success: boolean;
  clientSecret?: string;
  paymentIntentId?: string;
  error?: string;
}> {
  const product = PAYMENT_PRODUCTS[params.productId];

  if (!product) {
    return {
      success: false,
      error: `Invalid product ID: ${params.productId}`
    };
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.amount,
      currency: 'mxn',
      automatic_payment_methods: {
        enabled: true,
      },
      description: product.description,
      metadata: {
        productId: product.id,
        productName: product.name,
        customerEmail: params.customerEmail,
        customerName: params.customerName,
        customerPhone: params.customerPhone || '',
        applicationId: params.applicationId || '',
        source: 'floresiendo_landing',
        createdAt: new Date().toISOString(),
      },
      receipt_email: params.customerEmail,
      statement_descriptor_suffix: 'FLORESIENDO',
    });

    return {
      success: true,
      clientSecret: paymentIntent.client_secret!,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error('Stripe Payment Intent creation failed:', error);

    if (error instanceof Stripe.errors.StripeError) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment processing failed',
    };
  }
}

/**
 * Retrieve a Payment Intent by ID
 */
export async function getPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent | null> {
  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error('Failed to retrieve Payment Intent:', error);
    return null;
  }
}

/**
 * Verify Stripe webhook signature
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event | null {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.warn('Stripe webhook secret not configured - skipping verification in development');
    // In development, parse the event without verification
    try {
      return JSON.parse(typeof payload === 'string' ? payload : payload.toString()) as Stripe.Event;
    } catch {
      return null;
    }
  }

  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return null;
  }
}
