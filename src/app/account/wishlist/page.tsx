'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '@/lib/auth-context';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { ALL_PRODUCTS, formatPrice } from '@/lib/products-data';

export default function WishlistPage() {
  const { isAuthenticated } = useAuth();
  // Show some mock wishlist items (products with IDs matching a "wishlist")
  const wishlistProducts = ALL_PRODUCTS.slice(0, 4);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zeneio-black"><Navbar />
        <div className="section-container pt-32 pb-20 text-center">
          <Heart size={64} className="mx-auto text-white/10 mb-6" />
          <h1 className="text-heading-2 font-bold mb-3">Sign In Required</h1>
          <p className="text-white/40 mb-8">Please sign in to view your wishlist.</p>
          <Link href="/login" className="btn-accent btn-lg">Sign In</Link></div>
        <Footer /></div>
    );
  }

  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><div className="page-header">
      <div className="section-container flex items-center justify-between"><div>
        <Link href="/account" className="text-sm text-white/40 hover:text-white mb-3 inline-flex items-center gap-1"><ArrowLeft size={14} /> Back to Account</Link><h1>My Wishlist</h1><p>{wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved</p></div>
      </div></div>

      <div className="section-container pb-24">
        {wishlistProducts.length > 0 ? (
          <>
            {/* Wishlist Actions */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-white/40">
                Total: <span className="text-white font-semibold">${wishlistProducts.reduce((sum, p) => sum + p.price, 0).toFixed(2)}</span>
              </p>
              <button className="btn-accent !py-2.5"><ShoppingBag size={16} /> Add All to Cart</button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {wishlistProducts.map(product => (
                <div key={product.id} className="relative group">
                  <ProductCard product={product} />
                  {/* Remove button overlay */}
                  <button
                    className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/10 border-red-500/30"
                    title="Remove from wishlist"
                  >
                    <Heart size={16} className="text-red-400 fill-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="glass rounded-2xl p-12 text-center">
            <Heart size={48} className="mx-auto text-white/10 mb-4" />
            <h3 className="font-bold text-lg mb-2">Your Wishlist is Empty</h3>
            <p className="text-sm text-white/40 mb-6">Save products you love for later.</p>
            <Link href="/products" className="btn-accent">Browse Products</Link>
          </div>
        )}
      </div>

      <Footer /></div>
  );
}
