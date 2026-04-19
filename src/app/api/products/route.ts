import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    
    const products = await prisma.product.findMany({
      where: category && category !== 'all' ? {
        category: {
          slug: category
        }
      } : {},
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Map database fields to the frontend expected format
    const formattedProducts = products.map(p => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      description: p.description,
      shortDescription: p.description,
      price: Number(p.price),
      image: p.image,
      category: p.category.slug,
      specifications: p.specs,
      inventory: p.inventory,
      isFeatured: p.isFeatured,
      rating: 5.0,
      reviewCount: 0
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
