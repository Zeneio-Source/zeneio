import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
    if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { status, trackingNumber, carrier, notes, customerName, shippingAddress, shippingCity, shippingCountry, shippingZip } = body;
    const order = await prisma.order.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(trackingNumber !== undefined && { trackingNumber }),
        ...(carrier !== undefined && { carrier }),
        ...(notes !== undefined && { notes }),
        ...(customerName !== undefined && { customerName }),
        ...(shippingAddress !== undefined && { shippingAddress }),
        ...(shippingCity !== undefined && { shippingCity }),
        ...(shippingCountry !== undefined && { shippingCountry }),
        ...(shippingZip !== undefined && { shippingZip }),
      },
      include: { items: { include: { product: true } } },
    });
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
