// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature, stripe } from '@/lib/stripe';
import Stripe from 'stripe';

// Disable body parsing - Stripe requires raw body for signature verification
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('stripe-signature') || '';

    // Verify webhook signature
    const event = verifyWebhookSignature(payload, signature);

    if (!event) {
      console.warn('Invalid Stripe webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    console.log('=== STRIPE WEBHOOK ===');
    console.log('Event Type:', event.type);
    console.log('Event ID:', event.id);
    console.log('======================');

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.processing':
        await handlePaymentIntentProcessing(event.data.object as Stripe.PaymentIntent);
        break;

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;

      case 'charge.dispute.created':
        await handleDisputeCreated(event.data.object as Stripe.Dispute);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('[Stripe Webhook Error]', error);
    // Still return 200 to prevent Stripe from retrying
    return NextResponse.json({ received: true, error: 'Processing error' });
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('=== PAYMENT SUCCEEDED ===');
  console.log('Payment Intent ID:', paymentIntent.id);
  console.log('Amount:', paymentIntent.amount / 100, paymentIntent.currency.toUpperCase());
  console.log('Customer Email:', paymentIntent.metadata.customerEmail);
  console.log('Customer Name:', paymentIntent.metadata.customerName);
  console.log('Product:', paymentIntent.metadata.productName);
  console.log('Application ID:', paymentIntent.metadata.applicationId || 'N/A');
  console.log('=========================');

  // TODO: Send confirmation email
  // TODO: Update database if implemented
  // TODO: Trigger any post-payment actions
  // TODO: Update application status to "paid"
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log('=== PAYMENT FAILED ===');
  console.log('Payment Intent ID:', paymentIntent.id);
  console.log('Customer Email:', paymentIntent.metadata.customerEmail);
  console.log('Product:', paymentIntent.metadata.productName);
  console.log('Last Error:', paymentIntent.last_payment_error?.message || 'Unknown');
  console.log('======================');

  // TODO: Send failure notification email
  // TODO: Update booking status
}

async function handlePaymentIntentProcessing(paymentIntent: Stripe.PaymentIntent) {
  console.log('=== PAYMENT PROCESSING ===');
  console.log('Payment Intent ID:', paymentIntent.id);
  console.log('Customer:', paymentIntent.metadata.customerEmail);
  console.log('==========================');

  // This can happen with OXXO or bank transfers
  // Payment is pending external confirmation
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  console.log('=== CHARGE REFUNDED ===');
  console.log('Charge ID:', charge.id);
  console.log('Refund Amount:', charge.amount_refunded / 100, charge.currency.toUpperCase());
  console.log('Payment Intent:', charge.payment_intent);
  console.log('=======================');

  // TODO: Update booking status to refunded
  // TODO: Send refund confirmation email
}

async function handleDisputeCreated(dispute: Stripe.Dispute) {
  console.log('=== DISPUTE CREATED ===');
  console.log('Dispute ID:', dispute.id);
  console.log('Charge ID:', dispute.charge);
  console.log('Amount:', dispute.amount / 100);
  console.log('Reason:', dispute.reason);
  console.log('=======================');

  // TODO: Alert team about dispute
  // TODO: Log for tracking
}
