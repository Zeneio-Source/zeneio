'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { searchProducts, ALL_PRODUCTS } from '@/lib/products-data';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zeneio-black"><Navbar /><div className="flex items-center justify-center h-[60vh]"><div className="animate-spin w-8 h-8 border-2 border-zeneio-accent border-t-transparent rounded-full" /></div></div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const results = query.trim().length > 0 ? searchProducts(query) : [];

  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><div className="page-header">
      <h1>Search Results</h1>
      <p>{results.length > 0 ? `${results.length} product${results.length !== 1 ? 's' : ''} found for "${query}"` : query ? `No results for "${query}"` : 'Search for products'}</p></div>

      <div className="section-container pb-24">
        {/* Search Bar */}
        <form className="max-w-2xl mx-auto mb-10" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text" value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, categories..."
              className="input-field pl-12 pr-12 py-4 rounded-xl text-base"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"><X size={18} /></button>
            )}
          </div>
        </form>

        {/* Results */}
        {!query || query.trim().length === 0 ? (
          /* Empty State / Suggestions */
          <div className="max-w-xl mx-auto text-center space-y-8">
            <p className="text-white/35">Try searching for:</p>
            <div className="flex flex-wrap justify-center gap-2">{['vibrator', 'lingerie', 'men', 'couples', 'new arrivals', 'sale'].map(s => (
              <button key={s} onClick={() => setQuery(s)} className="px-4 py-2 rounded-full glass text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">{s}</button>
            ))}</div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {results.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="text-center glass rounded-2xl p-16 max-w-lg mx-auto">
            <SearchIcon size={48} className="mx-auto text-white/10 mb-4" />
            <h3 className="font-bold text-lg mb-2">No Results Found</h3>
            <p className="text-sm text-white/40 mb-6">We couldn't find any products matching "{query}"</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['vibrator', 'ring', 'lingerie', 'wand'].map(s => (
                <button key={s} onClick={() => setQuery(s)} className="px-4 py-2 rounded-full glass text-sm hover:bg-white/5 transition-all">{s}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer /></div>
  );
}
