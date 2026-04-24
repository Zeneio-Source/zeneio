import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(coupons);
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, type, value, minAmount, maxUses, expiresAt } = body;
    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        type: type || 'PERCENTAGE',
        value: Number(value) || 0,
        minAmount: minAmount ? Number(minAmount) : null,
        maxUses: maxUses ? Number(maxUses) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });
    return NextResponse.json(coupon);
  } catch {
    return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...data } = body;
    const coupon = await prisma.coupon.update({
      where: { id },
      data: { ...data, value: data.value ? Number(data.value) : undefined, minAmount: data.minAmount ? Number(data.minAmount) : undefined, maxUses: data.maxUses ? Number(data.maxUses) : undefined },
    });
    return NextResponse.json(coupon);
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    await prisma.coupon.delete({ where: { id: searchParams.get('id')! } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
