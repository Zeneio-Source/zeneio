import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Seed data for ZENEIO products
const seedCategories = [
  { name: 'Vibrators', slug: 'vibrators' },
  { name: 'Wands', slug: 'wands' },
  { name: 'Accessories', slug: 'accessories' },
];

const seedProducts = [
  {
    name: 'ZENEIO NEO',
    slug: 'zeneio-neo',
    description: 'AI-Sync Smart Technology with app-controlled bio-feedback system. Featuring Neural-Sync Gen-4 architecture, medical-grade silicone, and 10 customizable vibration patterns synced to your body\'s responses.',
    price: 29.99,
    image: '/products/neo.png',
    categorySlug: 'vibrators',
    specs: JSON.stringify({ battery: '240min', motor: 'Gen-4 Dual', waterproof: 'IPX7', material: 'Medical-Grade Silicone', noise: '<35dB' }),
    inventory: 100,
    isFeatured: false,
  },
  {
    name: 'ZENEIO WAND',
    slug: 'zeneio-wand',
    description: 'Therapeutic Pro Wand with 8-speed deep resonance engine. Designed for precision muscle relief and intimate wellness. Flexible neck with 20 vibration modes and whisper-quiet operation.',
    price: 35.95,
    image: '/products/wand.png',
    categorySlug: 'wands',
    specs: JSON.stringify({ battery: '180min', motor: 'Gen-3 Rumbly', waterproof: 'IPX6', material: 'Silicone + ABS', noise: '<40dB' }),
    inventory: 80,
    isFeatured: true,
  },
  {
    name: 'ZENEIO MICRO',
    slug: 'zeneio-micro',
    description: 'Travel Precision device with compact sonic engine. Pocket-sized power with travel-lock feature. Perfect for on-the-go pleasure with USB-C fast charging.',
    price: 32.95,
    image: '/products/micro.png',
    categorySlug: 'vibrators',
    specs: JSON.stringify({ battery: '90min', motor: 'Sonic Mini', waterproof: 'IPX5', material: 'Soft-Touch Silicone', noise: '<30dB' }),
    inventory: 120,
    isFeatured: false,
  },
  {
    name: 'ZENEIO CURVE',
    slug: 'zeneio-curve',
    description: 'Bio-Mimetic S-Shaped device with neural guidance technology. Ergonomically designed to target 128 anatomical stress points. Features heating function and smart memory.',
    price: 29.99,
    image: '/products/curve.png',
    categorySlug: 'vibrators',
    specs: JSON.stringify({ battery: '150min', motor: 'Gen-4 Dual Heat', waterproof: 'IPX7', material: 'Liquid Silicone', noise: '<32dB' }),
    inventory: 90,
    isFeatured: false,
  },
  {
    name: 'ZENEIO PRO',
    slug: 'zeneio-pro',
    description: 'Flagship Professional-grade device with full spectrum haptic intelligence. App-enabled with partner sync, custom pattern creation, and premium storage case included.',
    price: 49.99,
    image: '/products/pro.png',
    categorySlug: 'vibrators',
    specs: JSON.stringify({ battery: '300min', motor: 'Gen-5 Quad', waterproof: 'IPX8', material: 'Platinum Silicone', noise: '<25dB' }),
    inventory: 50,
    isFeatured: true,
  },
];

export async function POST() {
  try {
    // Create categories first
    const categories: Record<string, string> = {};
    
    for (const cat of seedCategories) {
      const created = await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: cat,
      });
      categories[cat.slug] = created.id;
    }

    // Create products
    const createdProducts = [];
    for (const product of seedProducts) {
      const categoryId = categories[product.categorySlug];
      if (!categoryId) continue;

      const { categorySlug, ...productData } = product;
      
      const created = await prisma.product.upsert({
        where: { slug: productData.slug },
        update: {},
        create: {
          ...productData,
          categoryId,
          price: productData.price,
          specs: product.specs ? JSON.parse(product.specs) : null,
        },
      });
      createdProducts.push(created);
    }

    return NextResponse.json({ 
      success: true, 
      message: `Database initialized with ${createdProducts.length} products`,
      products: createdProducts.length,
      categories: Object.keys(categories).length,
    });
  } catch (error: any) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Setup failed', details: error.message }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Check current state
    const productCount = await prisma.product.count();
    const categoryCount = await prisma.category.count();
    
    return NextResponse.json({
      ready: true,
      products: productCount,
      categories: categoryCount,
      message: productCount > 0 
        ? 'Database is ready' 
        : 'Run POST /api/setup to initialize database',
    });
  } catch (error: any) {
    return NextResponse.json({
      ready: false,
      error: 'Cannot connect to database',
      details: error.message,
    }, { status: 500 });
  }
}
