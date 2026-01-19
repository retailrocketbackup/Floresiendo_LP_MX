// app/api/payments/create-intent/route.ts
import { NextResponse } from 'next/server';
import { createPaymentIntent, PAYMENT_PRODUCTS, PaymentProductId } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      productId,
      customerEmail,
      customerName,
      customerPhone,
      applicationId
    } = body;

    // Validate required fields
    if (!productId || !customerEmail || !customerName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get product configuration
    const product = PAYMENT_PRODUCTS[productId as PaymentProductId];

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Invalid product' },
        { status: 400 }
      );
    }

    // Log payment intent creation
    console.log('=== PAYMENT INTENT CREATION ===');
    console.log('Product:', product.name);
    console.log('Amount:', product.amount / 100, 'MXN');
    console.log('Customer:', customerName, customerEmail);
    console.log('Application ID:', applicationId || 'N/A');
    console.log('===============================');

    // Create Payment Intent via Stripe
    const result = await createPaymentIntent({
      productId: productId as PaymentProductId,
      customerEmail,
      customerName,
      customerPhone,
      applicationId,
    });

    if (result.success) {
      console.log('=== PAYMENT INTENT CREATED ===');
      console.log('Payment Intent ID:', result.paymentIntentId);
      console.log('==============================');

      return NextResponse.json({
        success: true,
        clientSecret: result.clientSecret,
        paymentIntentId: result.paymentIntentId,
      });
    } else {
      console.log('=== PAYMENT INTENT FAILED ===');
      console.log('Error:', result.error);
      console.log('=============================');

      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('[API Payment Intent Error]', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred creating payment intent' },
      { status: 500 }
    );
  }
}
