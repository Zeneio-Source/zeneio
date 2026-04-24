import { NextResponse } from 'next/server';

// Returns a Paddle client token for the frontend to initialize Paddle Checkout
export async function POST() {
  const PADDLE_CLIENT_TOKEN = process.env.PADDLE_CLIENT_TOKEN;
  const PADDLE_ENV = process.env.PADDLE_ENV || 'sandbox';

  if (!PADDLE_CLIENT_TOKEN) {
    return NextResponse.json({
      token: null,
      env: PADDLE_ENV,
      configured: false,
      message: 'PADDLE_CLIENT_TOKEN not set in environment variables'
    });
  }

  return NextResponse.json({
    token: PADDLE_CLIENT_TOKEN,
    env: PADDLE_ENV,
    configured: true,
  });
}