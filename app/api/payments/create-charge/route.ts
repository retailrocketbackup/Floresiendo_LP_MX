// app/api/payments/create-charge/route.ts
import { NextResponse } from 'next/server';
import { createCharge, PAYMENT_PRODUCTS, PaymentProductId } from '@/lib/conekta';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      tokenId,
      productId,
      customerEmail,
      customerName,
      customerPhone
    } = body;

    // Validate required fields
    if (!tokenId || !productId || !customerEmail || !customerName) {
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

    // Log payment attempt
    console.log('=== PAYMENT ATTEMPT ===');
    console.log('Product:', product.name);
    console.log('Amount:', product.amount / 100, 'MXN');
    console.log('Customer:', customerName, customerEmail);
    console.log('========================');

    // Create charge via Conekta
    const result = await createCharge({
      amount: product.amount,
      description: product.description,
      tokenId,
      customerEmail,
      customerName,
      customerPhone,
      metadata: {
        product_id: productId,
        product_name: product.name
      }
    });

    if (result.success) {
      // Log successful payment
      console.log('=== PAYMENT SUCCESS ===');
      console.log('Charge ID:', result.charge?.id);
      console.log('Order ID:', result.charge?.orderId);
      console.log('Status:', result.charge?.status);
      console.log('========================');

      return NextResponse.json({
        success: true,
        charge: result.charge
      });
    } else {
      // Log failed payment
      console.log('=== PAYMENT FAILED ===');
      console.log('Error:', result.error);
      console.log('========================');

      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('[API Payment Error]', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred processing your payment' },
      { status: 500 }
    );
  }
}
