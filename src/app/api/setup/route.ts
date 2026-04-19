import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { products } from '@/lib/products-data';

export async function GET() {
  try {
    // 1. Sync Categories
    const categorySlugs = ['male', 'female', 'lingerie'];
    const categories = await Promise.all(
      categorySlugs.map(slug => 
        prisma.category.upsert({
          where: { slug },
          update: {},
          create: { 
            slug, 
            name: slug.toUpperCase() 
          }
        })
      )
    );

    const categoryMap = Object.fromEntries(categories.map(c => [c.slug, c.id]));

    // 2. Sync Products
    const syncedProducts = await Promise.all(
      products.map(p => 
        prisma.product.upsert({
          where: { slug: p.slug },
          update: {
            name: p.name,
            description: p.shortDescription || p.description,
            price: p.price,
            image: p.image,
            categoryId: categoryMap[p.category],
            specs: p.specifications as any,
            inventory: 100,
            isFeatured: p.isFeatured || false
          },
          create: {
            slug: p.slug,
            name: p.name,
            description: p.shortDescription || p.description,
            price: p.price,
            image: p.image,
            categoryId: categoryMap[p.category],
            specs: p.specifications as any,
            inventory: 100,
            isFeatured: p.isFeatured || false
          }
        })
      )
    );

    return NextResponse.json({ 
      message: 'Database synced successfully', 
      categories: categories.length,
      products: syncedProducts.length 
    });
  } catch (error) {
    console.error('Setup Error:', error);
    return NextResponse.json({ error: 'Failed to sync database' }, { status: 500 });
  }
}
