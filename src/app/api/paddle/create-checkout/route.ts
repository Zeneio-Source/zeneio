import { NextRequest, NextResponse } from 'next/server';

const PADDLE_VENDOR_ID = process.env.PADDLE_VENDOR_ID;
const PADDLE_API_KEY = process.env.PADDLE_API_KEY;
const PADDLE_ENV = process.env.PADDLE_ENV || 'sandbox';

const PADDLE_API_BASE = PADDLE_ENV === 'live'
  ? 'https://api.paddle.com'
  : 'https://sandbox-api.paddle.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerEmail, customerName, shippingAddress, shippingCity, shippingCountry, shippingZip } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    if (!PADDLE_VENDOR_ID || !PADDLE_API_KEY) {
      // Fallback: return a demo checkout token
      return NextResponse.json({
        checkoutToken: 'demo_mode',
        mode: 'demo',
        message: 'Paddle credentials not configured. Add PADDLE_VENDOR_ID and PADDLE_API_KEY to .env.local'
      });
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 99 ? 0 : 9.99;
    const total = subtotal + shipping;

    // Create a Paddle checkout (one-time payment)
    const response = await fetch(`${PADDLE_API_BASE}/checkout/recurring`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PADDLE_API_KEY}`,
        'Content-Type': 'application/json',
        'Paddle-Idempotency-Key': `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      },
      body: JSON.stringify({
        vendor_id: parseInt(PADDLE_VENDOR_ID),
        items: [
          ...items.map((item: any) => ({
            quantity: item.quantity,
            product_id: item.productId || item.id,
            price_id: item.priceId, // Use price_id if available
          })),
          // Add shipping as a one-time charge if applicable
          ...(shipping > 0 ? [{
            quantity: 1,
            description: 'Standard Shipping',
            price: Math.round(shipping * 100),
            tax_mode: 'account_setting',
          }] : []),
        ],
        customer: {
          email: customerEmail,
          name: customerName,
          address: {
            country: shippingCountry || 'US',
            postal_code: shippingZip || '',
            city: shippingCity || '',
          },
        },
        custom_data: {
          source: 'zeneio_website',
        },
        webhooks: [
          {
            notification_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://zeneio.com'}/api/paddle/webhook`,
          },
        ],
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://zeneio.com'}/order-success?checkout={checkout_id}`,
        expire_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min expiry
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Paddle API error:', error);
      return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json({
      checkoutToken: data.token || data.id,
      checkoutUrl: data.url,
      transactionId: data.transaction?.id,
      mode: 'live',
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
