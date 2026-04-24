import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const PADDLE_WEBHOOK_SECRET = process.env.PADDLE_WEBHOOK_SECRET || '';

function verifyWebhookSignature(body: string, signature: string): boolean {
  if (!PADDLE_WEBHOOK_SECRET) {
    console.warn('PADDLE_WEBHOOK_SECRET not set — skipping signature verification');
    return true;
  }
  const expected = crypto
    .createHmac('sha256', PADDLE_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');
  return signature === expected;
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('paddle-signature') || '';

    if (!verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventType = payload.event_type || payload.alert_name;

    console.log(`[Paddle Webhook] Event: ${eventType}`, JSON.stringify(payload, null, 2));

    switch (eventType) {
      case 'transaction.completed':
      case 'subscription.activated': {
        const transactionId = payload.data?.id || payload.transaction_id;
        const customerEmail = payload.data?.customer?.email || payload.customer?.email;
        const amount = payload.data?.amount || payload.amount;

        // TODO: Update order status in database
        // const order = await prisma.order.findFirst({ where: { paymentId: transactionId } });
        // if (order) {
        //   await prisma.order.update({
        //     where: { id: order.id },
        //     data: { status: 'PAID', paymentStatus: 'completed' }
        //   });
        // }

        console.log(`[Paddle] Payment completed: ${transactionId}, ${customerEmail}, $${amount}`);
        break;
      }

      case 'transaction.past_due':
      case 'subscription.past_due': {
        const transactionId = payload.data?.id;
        console.log(`[Paddle] Payment failed/past due: ${transactionId}`);
        // TODO: Handle failed payment
        break;
      }

      case 'subscription.cancelled':
      case 'subscription.past_due': {
        const subscriptionId = payload.data?.id;
        console.log(`[Paddle] Subscription cancelled: ${subscriptionId}`);
        // TODO: Update subscription status
        break;
      }

      default:
        console.log(`[Paddle] Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('[Paddle Webhook] Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}