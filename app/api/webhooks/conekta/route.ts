// app/api/webhooks/conekta/route.ts
import { NextResponse } from 'next/server';
import { verifyConektaSignature } from '@/lib/conekta';

export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('x-conekta-webhook-signature') || '';

    // Verify webhook signature
    if (!verifyConektaSignature(payload, signature)) {
      console.warn('Invalid Conekta webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const event = JSON.parse(payload);
    const { type, data } = event;

    console.log('=== CONEKTA WEBHOOK ===');
    console.log('Event Type:', type);
    console.log('Data ID:', data?.object?.id);
    console.log('========================');

    switch (type) {
      case 'order.paid':
        await handleOrderPaid(data.object);
        break;

      case 'order.pending_payment':
        await handleOrderPending(data.object);
        break;

      case 'charge.paid':
        await handleChargePaid(data.object);
        break;

      case 'charge.declined':
        await handleChargeDeclined(data.object);
        break;

      case 'charge.refunded':
        await handleChargeRefunded(data.object);
        break;

      default:
        console.log(`Unhandled event type: ${type}`);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('[Webhook Error]', error);
    // Still return 200 to prevent Conekta from retrying
    return NextResponse.json({ received: true, error: 'Processing error' });
  }
}

async function handleOrderPaid(order: any) {
  console.log('=== ORDER PAID ===');
  console.log('Order ID:', order.id);
  console.log('Amount:', order.amount / 100, order.currency);
  console.log('Customer:', order.customer_info?.name, order.customer_info?.email);
  console.log('Metadata:', order.metadata);
  console.log('==================');

  // TODO: Send confirmation email
  // TODO: Update database if implemented
  // TODO: Trigger any post-payment actions
}

async function handleOrderPending(order: any) {
  console.log('=== ORDER PENDING ===');
  console.log('Order ID:', order.id);
  console.log('Customer:', order.customer_info?.email);
  console.log('=====================');
}

async function handleChargePaid(charge: any) {
  console.log('=== CHARGE PAID ===');
  console.log('Charge ID:', charge.id);
  console.log('Amount:', charge.amount / 100, charge.currency);
  console.log('Payment Method:', charge.payment_method?.type);
  console.log('===================');
}

async function handleChargeDeclined(charge: any) {
  console.log('=== CHARGE DECLINED ===');
  console.log('Charge ID:', charge.id);
  console.log('Reason:', charge.failure_message);
  console.log('=======================');
}

async function handleChargeRefunded(charge: any) {
  console.log('=== CHARGE REFUNDED ===');
  console.log('Charge ID:', charge.id);
  console.log('Refund Amount:', charge.refunds?.[0]?.amount / 100);
  console.log('=======================');
}
