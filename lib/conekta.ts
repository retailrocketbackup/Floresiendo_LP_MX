// lib/conekta.ts
// Conekta API client for server-side use

import crypto from 'crypto';

const CONEKTA_API_URL = 'https://api.conekta.io';

/**
 * Get Conekta Public Key for client-side tokenization
 * Safe to expose to frontend
 */
export const getConektaPublicKey = (): string => {
  const key = process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY;

  if (!key) {
    throw new Error('Conekta public key not configured');
  }

  return key;
};

/**
 * Create a charge via Conekta REST API
 */
export async function createCharge(params: {
  amount: number; // In cents (e.g., 300000 = $3,000 MXN)
  currency?: string;
  description: string;
  tokenId: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  orderId?: string;
  metadata?: Record<string, string>;
}): Promise<{
  success: boolean;
  charge?: {
    id: string;
    status: string;
    amount: number;
    orderId: string;
  };
  error?: string;
}> {
  const apiKey = process.env.CONEKTA_API_KEY;

  if (!apiKey) {
    throw new Error('Conekta API key not configured');
  }

  const orderId = params.orderId || `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  try {
    const response = await fetch(`${CONEKTA_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.conekta-v2.1.0+json',
        'Accept-Language': 'es'
      },
      body: JSON.stringify({
        currency: params.currency || 'MXN',
        customer_info: {
          name: params.customerName,
          email: params.customerEmail,
          phone: params.customerPhone || '+521234567890'
        },
        line_items: [{
          name: params.description,
          unit_price: params.amount,
          quantity: 1
        }],
        charges: [{
          payment_method: {
            type: 'card',
            token_id: params.tokenId
          }
        }],
        metadata: {
          ...params.metadata,
          order_id: orderId,
          source: 'floresiendo_landing'
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Conekta API Error:', data);
      return {
        success: false,
        error: data.details?.[0]?.message || data.message || 'Payment processing failed'
      };
    }

    const charge = data.charges?.data?.[0];

    return {
      success: charge?.status === 'paid',
      charge: {
        id: charge?.id || data.id,
        status: charge?.status || 'pending',
        amount: data.amount,
        orderId: orderId
      }
    };

  } catch (error) {
    console.error('Conekta request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}

/**
 * Verify Conekta webhook signature using SHA256
 */
export const verifyConektaSignature = (
  payload: string,
  signature: string
): boolean => {
  const secret = process.env.CONEKTA_WEBHOOK_SECRET;

  if (!secret) {
    console.warn('Conekta webhook secret not configured - skipping verification');
    return true; // Skip verification if no secret (development)
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return signature === expectedSignature;
};

/**
 * Payment product configurations
 */
export const PAYMENT_PRODUCTS = {
  DEPOSIT: {
    id: 'deposit',
    name: 'Anticipo - Encuentro Febrero 2026',
    amount: 300000, // $3,000 MXN in cents
    description: 'Anticipo para reservar tu lugar en el Encuentro de Febrero 2026'
  },
  TWO_NIGHTS_EARLY: {
    id: '2nights_early',
    name: 'Retiro 2 Noches - Precio Especial',
    amount: 710000, // $7,100 MXN
    description: 'Paquete completo de 2 noches - Encuentro Febrero 2026 (Precio especial)'
  },
  TWO_NIGHTS_REGULAR: {
    id: '2nights_regular',
    name: 'Retiro 2 Noches',
    amount: 800000, // $8,000 MXN
    description: 'Paquete completo de 2 noches - Encuentro Febrero 2026'
  },
  THREE_NIGHTS_EARLY: {
    id: '3nights_early',
    name: 'Retiro 3 Noches - Precio Especial',
    amount: 1020000, // $10,200 MXN
    description: 'Paquete completo de 3 noches - Encuentro Febrero 2026 (Precio especial)'
  },
  THREE_NIGHTS_REGULAR: {
    id: '3nights_regular',
    name: 'Retiro 3 Noches',
    amount: 1150000, // $11,500 MXN
    description: 'Paquete completo de 3 noches - Encuentro Febrero 2026'
  }
} as const;

export type PaymentProductId = keyof typeof PAYMENT_PRODUCTS;
