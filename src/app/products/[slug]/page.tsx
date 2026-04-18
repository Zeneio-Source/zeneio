import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Product detail data (would come from DB in production)
const product = {
  name: 'ZENEIO PRO',
  tagline: 'Flagship Alpha',
  price: 49.99,
  originalPrice: 69.99,
  description: 'The most advanced device we\'ve ever created. Featuring Gen-5 Quad motor technology with AI-powered pattern learning. Four independently controlled motors deliver 256 unique vibration combinations.',
  specs: {
    Motor: 'Gen-5 Quad',
    Battery: '300 minutes',
    Waterproof: 'IPX8 (1.5m / 30min)',
    Material: 'Platinum Silicone',
    Noise: '<25dB (whisper quiet)',
    Charging: 'USB-C PD (90 min full)',
    Heating: 'Yes (up to 42°C)',
    Weight: '85g',
    Dimensions: '165 × 35 × 28mm',
    Warranty: '2 Years',
  },
  features: [
    '256 unique vibration patterns',
    'AI-powered preference learning',
    'App control with partner sync',
    'Heating function for comfort',
    'Travel lock for discretion',
    'Premium storage case included',
  ],
};

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-28 px-6 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/20 mb-8">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>→</span>
          <Link href="/products" className="hover:text-white transition">Products</Link>
          <span>→</span>
          <span className="text-[#81D8D0]">{product.name}</span>
        </nav>
      </div>

      <main className="px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Product Image */}
          <div className="space-y-6">
            <div className="aspect-square glass rounded-[50px] border border-white/5 flex items-center justify-center relative overflow-hidden group bg-gradient-to-br from-[#81D8D0]/5 to-transparent p-16">
              <img src="/products/pro.png" alt={product.name}
                className="w-full h-full object-contain mix-blend-screen opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700"
                onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; }}
              />
              {product.originalPrice > product.price && (
                <div className="absolute top-8 left-8 bg-red-500/90 text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4">
              {[1,2,3].map((i) => (
                <button key={i} className={`aspect-square w-24 glass rounded-xl border flex items-center justify-center ${i === 1 ? 'border-[#81D8D0]/30' : 'border-white/5 hover:border-white/10'} transition`}>
                  <span className="font-serif italic text-lg text-[#81D8D0]/30">Z</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:pt-8 space-y-8">
            <div>
              <p className="text-[9px] uppercase font-black tracking-[0.3em] text-[#81D8D0] mb-3">{product.tagline}</p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-white mb-4">{product.name}</h1>
              
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-light text-white">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-white/20 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
                {product.originalPrice && (
                  <span className="glass px-3 py-1 rounded-full text-[8px] uppercase font-black tracking-wider text-red-400/80">
                    -{Math.round((1 - product.price/product.originalPrice) * 100)}%
                  </span>
                )}
              </div>
            </div>

            <p className="text-base text-white/40 leading-relaxed">{product.description}</p>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                <div key={key} className="glass rounded-xl p-4 border border-white/5">
                  <p className="text-[8px] uppercase tracking-widest text-white/30 font-bold mb-1">{key}</p>
                  <p className="text-sm text-white/60">{value}</p>
                </div>
              ))}
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 pt-4">
              <div className="flex items-center glass rounded-full border border-white/10 overflow-hidden flex-shrink-0">
                <button className="px-5 py-4 text-white/40 hover:text-white transition text-lg">−</button>
                <span className="px-4 py-4 text-sm font-bold text-white">1</span>
                <button className="px-5 py-4 text-white/40 hover:text-white transition text-lg">+</button>
              </div>
              <button className="btn-zeneio flex-grow text-black py-5 text-xs uppercase font-bold tracking-[0.2em]">
                Add to Cart
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-6 border-t border-white/5">
              {['🔒 Secure Checkout', '📦 Discreet Shipping', '✓ 2-Year Warranty', '↩ 30-Day Return'].map((badge) => (
                <span key={badge} className="text-[9px] text-white/30 uppercase tracking-widest font-medium">{badge}</span>
              ))}
            </div>

            {/* Features List */}
            <div className="pt-6 border-t border-white/5">
              <h3 className="text-sm font-bold text-white/80 mb-4 uppercase tracking-wider">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-white/40">
                    <span className="text-[#81D8D0] mt-0.5">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Specs */}
            <details className="group pt-4">
              <summary className="cursor-pointer text-sm font-bold text-white/60 group-hover:text-[#81D8D0] transition list-none flex items-center gap-3">
                <span className="transform group-open:rotate-90 transition-transform text-xs">▸</span>
                Full Technical Specifications
              </summary>
              <div className="mt-6 glass rounded-2xl p-6 border border-white/5">
                <dl className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <dt className="text-[9px] uppercase tracking-widest text-white/25 font-bold">{key}</dt>
                      <dd className="text-sm text-white/50">{value}</dd>
                    </React.Fragment>
                  ))}
                </dl>
              </div>
            </details>
          </div>
        </div>

        {/* Reviews Section Placeholder */}
        <section className="max-w-7xl mx-auto mt-32 pt-10 border-t border-white/5">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic mb-12">
            Customer Reviews<span className="text-[#81D8D0]">.</span>
          </h2>

          {/* Rating Summary */}
          <div className="glass rounded-[40px] p-10 md:p-14 border border-white/5 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
              <div className="text-center md:border-r md:border-white/5 md:pr-10">
                <p className="text-6xl font-black text-[#81D8D0]">4.9</p>
                <div className="text-[#81D8D0] text-lg my-2">★★★★★</div>
                <p className="text-[9px] uppercase tracking-widest text-white/30">Based on 347 reviews</p>
              </div>
              <div className="md:col-span-2 space-y-3">
                {[5,5,5,5,4].map((stars, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-[9px] text-white/30 w-4">{stars}</span>
                    <span className="text-[#81D8D0] text-xs">{'★'.repeat(stars)}{'☆'.repeat(5-stars)}</span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#81D8D0]/50 rounded-full" style={{ width: `${[95,88,92,80,15][i]}%` }}></div>
                    </div>
                    <span className="text-[9px] text-white/20 w-8 text-right">{[95,88,92,80,15][i]}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'A.M.', rating: 5, date: 'Apr 2026', title: 'Worth every penny', body: 'The AI learning feature is genuinely impressive. After a few sessions it knew exactly what I wanted before I did.' },
              { name: 'S.K.', rating: 5, date: 'Mar 2026', title: 'Best I\'ve ever owned', body: 'Quiet enough to use with roommates home, powerful when you need it. The heating function is a game changer.' },
              { name: 'L.R.', rating: 5, date: 'Mar 2026', title: 'Finally, premium quality', body: 'I\'ve tried many brands and ZENEIO is on another level. The materials feel incredible.' },
              { name: 'J.T.', rating: 4, date: 'Feb 2026', title: 'Great but expensive', body: 'Amazing device, just wish it came with more accessories at this price point.' },
            ].map((review) => (
              <div key={review.name + review.date} className="glass rounded-3xl p-8 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#81D8D0]/10 flex items-center justify-center text-[#81D8D0] font-bold text-sm">{review.name}</div>
                  <div>
                    <p className="text-sm font-bold text-white/80">{review.name}</p>
                    <p className="text-[8px] text-white/30">{review.date}</p>
                  </div>
                </div>
                <div className="text-[#81D8D0] text-xs mb-3">{'★'.repeat(review.rating)}</div>
                <h4 className="font-bold text-white/70 mb-2">{review.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed">{review.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        <section className="max-w-7xl mx-auto mt-32 pt-10 border-t border-white/5">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic mb-12">
            You May Also Like<span className="text-[#81D8D0]">.</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { id: 'neo', name: 'NEO', price: '$29.99' },
              { id: 'wand', name: 'WAND', price: '$35.95' },
              { id: 'micro', name: 'MICRO', price: '$32.95' },
              { id: 'curve', name: 'CURVE', price: '$29.99' },
            ].map((p) => (
              <Link href={`/products/${p.id}`} key={p.id}
                className="glass rounded-3xl p-6 border border-white/5 group hover:border-[#81D8D0]/20 transition-all text-center">
                <div className="aspect-square rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                  <span className="font-serif italic text-3xl text-[#81D8D0]/20 group-hover:text-[#81D8D0]/40 transition">Z</span>
                </div>
                <p className="text-[8px] uppercase tracking-widest text-[#81D8D0]/60 mb-1">ZENEIO {p.name}</p>
                <p className="text-sm text-white/60">{p.price}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
