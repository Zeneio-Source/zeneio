'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const allProducts = [
  { id: 'pro', name: 'ZENEIO PRO', price: '$49.99', tag: 'Flagship Alpha' },
  { id: 'neo', name: 'ZENEIO NEO', price: '$29.99', tag: 'AI-Sync Smart' },
  { id: 'wand', name: 'ZENEIO WAND', price: '$35.95', tag: 'Therapeutic Pro' },
  { id: 'micro', name: 'ZENEIO MICRO', price: '$32.95', tag: 'Travel Precision' },
  { id: 'curve', name: 'ZENEIO CURVE', price: '$29.99', tag: 'Bio-Mimetic' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const filtered = query.length > 0 
    ? allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.tag.toLowerCase().includes(query.toLowerCase()))
    : allProducts;

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif italic font-light mb-8 text-white">
            Search<span className="text-[#81D8D0]">.</span>
          </h1>
          
          <div className="relative mb-12">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              autoFocus
              className="w-full glass bg-white/5 border border-white/10 rounded-full px-10 py-6 text-lg text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition"
            />
            <span className="absolute right-8 top-1/2 -translate-y-1/2 text-white/20 text-lg">
              ⌘K
            </span>
          </div>

          {/* Results */}
          <div className="space-y-3">
            {filtered.map((product) => (
              <a href={`/products/${product.id}`}
                key={product.id}
                className="flex items-center justify-between glass rounded-2xl p-6 border border-white/5 group hover:border-[#81D8D0]/20 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#81D8D0]/10 transition">
                    <span className="text-xl font-serif italic text-[#81D8D0]/40">{product.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white/80 group-hover:text-[#81D8D0] transition">{product.name}</h3>
                    <p className="text-xs text-white/30 mt-1">{product.tag}</p>
                  </div>
                </div>
                <span className="text-sm font-light text-white/50">{product.price}</span>
              </a>
            ))}
            
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-white/30 text-lg font-light">No results for &ldquo;{query}&rdquo;</p>
                <p className="text-white/20 text-sm mt-2">Try searching for a product name or category</p>
              </div>
            )}
          </div>

          {/* Quick links */}
          {!query && (
            <div className="mt-16 pt-10 border-t border-white/5">
              <p className="text-[9px] uppercase tracking-widest text-white/20 font-bold mb-6">Popular</p>
              <div className="flex flex-wrap gap-3">
                {['ZENEIO PRO', 'Wand', 'Vibrator', 'Smart', 'Waterproof'].map((term) => (
                  <button key={term} onClick={() => setQuery(term)}
                    className="glass px-4 py-2 rounded-full text-[9px] uppercase tracking-widest text-white/30 hover:text-[#81D8D0] hover:border-[#81D8D0]/20 transition cursor-pointer border border-transparent">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
