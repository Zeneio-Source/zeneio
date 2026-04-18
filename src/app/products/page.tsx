import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Static fallback products for when DB is not available
const fallbackProducts = [
  { id: 'neo', name: 'ZENEIO NEO', price: '$29.99', tag: 'AI-Sync Smart', img: 'https://m.media-amazon.com/images/I/31+tpXb5njL.jpg', category: 'Smart' },
  { id: 'wand', name: 'ZENEIO WAND', price: '$35.95', tag: 'Therapeutic Pro', img: 'https://m.media-amazon.com/images/I/315e2bzqOqL.jpg', category: 'Wand' },
  { id: 'micro', name: 'ZENEIO MICRO', price: '$32.95', tag: 'Travel Precision', img: 'https://m.media-amazon.com/images/I/414i2cPg7yL.jpg', category: 'Sonic' },
  { id: 'curve', name: 'ZENEIO CURVE', price: '$29.99', tag: 'Bio-Mimetic', img: 'https://m.media-amazon.com/images/I/41378dve9gL.jpg', category: 'Internal' },
  { id: 'pro', name: 'ZENEIO PRO', price: '$49.99', tag: 'Flagship Alpha', img: 'https://sc02.alicdn.com/kf/A1dabe5d4edc840148a73a3f6496a1328S.png', category: 'Flagship' },
];

async function getProducts() {
  try {
    const res = await fetch(`${process.env.VERCEL_URL || ''}/api/products`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((p: any) => ({
          id: p.slug,
          name: p.name,
          price: `$${Number(p.price).toFixed(2)}`,
          tag: p.specs?.motor || 'Premium',
          img: p.image || '/products/' + p.slug + '.png',
          slug: p.slug,
        }));
      }
    }
  } catch {
    // API not available, use fallback
  }
  return null;
}

export default async function ProductsPage() {
  const dbProducts = await getProducts();
  const products = dbProducts || fallbackProducts;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic mb-6">Lineup<span className="text-[#81D8D0]">.</span></h1>
            <p className="max-w-xl text-white/30 text-lg font-light leading-relaxed uppercase tracking-widest">
              Every device is a result of meticulous engineering and anatomical research. Explore the full range of haptic excellence.
            </p>
            {!dbProducts && (
              <p className="mt-4 text-xs text-[#81D8D0]/50 uppercase tracking-widest">
                ⚡ Initializing database... Products will sync shortly.
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mb-16">
            {['All', 'Vibrators', 'Wands', 'Accessories'].map((cat) => (
              <button key={cat} className={`px-8 py-3 rounded-full text-[9px] uppercase font-black tracking-[0.2em] border transition-all ${cat === 'All' ? 'bg-[#81D8D0] text-black border-[#81D8D0]' : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p: any) => (
              <Link href={p.slug ? `/products/${p.slug}` : `/products/${p.id}`} key={p.id || p.slug} className="product-card p-10 rounded-[40px] group">
                <div className="relative aspect-square mb-10 overflow-hidden rounded-3xl bg-white/5 flex items-center justify-center p-12">
                  <img src={p.img} className="w-full h-full object-contain mix-blend-screen opacity-70 group-hover:opacity-100 transition duration-700 group-hover:scale-105" alt={p.name} loading="lazy" />
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-[8px] uppercase font-black tracking-[0.3em] text-[#81D8D0] mb-3">{p.tag}</div>
                        <h3 className="text-3xl font-black tracking-tight uppercase">{p.name}</h3>
                    </div>
                    <div className="text-xl font-light tracking-widest text-white/60">{p.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Auto-setup trigger - initializes database on first visit */}
      {!dbProducts && (
        <div className="hidden">
          <form action="/api/setup" method="POST">
            <button type="submit">Initialize</button>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
}
