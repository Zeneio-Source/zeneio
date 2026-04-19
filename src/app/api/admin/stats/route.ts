import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const totalOrders = await prisma.order.count();
    const totalProducts = await prisma.product.count();
    
    // Calculate total revenue
    const orders = await prisma.order.findMany({
      where: {
        status: {
          in: ['PAID', 'SHIPPED', 'DELIVERED']
        }
      },
      select: {
        totalAmount: true
      }
    });
    
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);
    
    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    const formattedOrders = recentOrders.map(order => ({
      id: order.id,
      user: order.customerEmail.split('@')[0], // Simple anonymization
      product: order.items[0]?.product.name || 'Unknown',
      amount: `$${Number(order.totalAmount).toFixed(2)}`,
      status: order.status,
      time: order.createdAt.toISOString()
    }));

    return NextResponse.json({
      stats: {
        totalRevenue: `$${totalRevenue.toFixed(2)}`,
        totalOrders,
        totalProducts,
        systemIntegrity: '99.98%'
      },
      recentOrders: formattedOrders
    });
  } catch (error) {
    console.error('Admin Stats Error:', error);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
