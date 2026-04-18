'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const initialItems = [
  {
    id: 'pro',
    name: 'ZENEIO PRO',
    tagline: 'Flagship Alpha',
    price: 49.99,
    image: '/products/pro.png',
    quantity: 1,
  },
  {
    id: 'wand',
    name: 'ZENEIO WAND',
    tagline: 'Therapeutic Pro',
    price: 35.95,
    quantity: 1,
  },
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 75 ? 0 : 9.99;
  const total = subtotal + shipping;

  const updateQty = (id: string, delta: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, Math.min(10, item.quantity + delta)) } : item
    ).filter(item => item.quantity > 0));
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl md:text-5xl font-serif italic font-light tracking-tight text-white">
              Your Cart<span className="text-[#81D8D0]">.</span>
            </h1>
            <span className="text-sm text-white/30">{items.length} item{items.length !== 1 ? 's' : ''}</span>
          </div>

          {items.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-24 glass rounded-[50px] border border-white/5">
              <div className="text-6xl mb-6 opacity-30">🛒</div>
              <h2 className="text-2xl font-bold text-white/60 mb-4">Your cart is empty</h2>
              <p className="text-white/30 mb-10">Looks like you haven't added anything yet.</p>
              <Link href="/products" className="btn-zeneio text-black px-14 py-5 inline-block">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="glass rounded-3xl p-6 md:p-8 border border-white/5 flex flex-col md:flex-row gap-6 items-start md:items-center group">
                    
                    {/* Image */}
                    <Link href={`/products/${item.id}`} className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <span className="font-serif italic text-3xl text-[#81D8D0]/30">Z</span>
                    </Link>

                    {/* Info */}
                    <div className="flex-grow min-w-0">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-bold text-white/80 hover:text-[#81D8D0] transition text-lg">{item.name}</h3>
                      </Link>
                      <p className="text-xs text-white/30 mt-1 uppercase tracking-wider">{item.tagline}</p>
                      
                      {/* Quantity - Mobile friendly */}
                      <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center glass rounded-full border border-white/10 overflow-hidden">
                          <button onClick={() => updateQty(item.id, -1)} className="px-4 py-2 text-white/40 hover:text-white transition">−</button>
                          <span className="px-4 py-2 text-sm font-bold text-white">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="px-4 py-2 text-white/40 hover:text-white transition">+</button>
                        </div>
                        
                        <button onClick={() => updateQty(item.id, -item.quantity)} className="text-[9px] uppercase tracking-widest text-red-400/60 hover:text-red-400 transition ml-auto">
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex-shrink-0 text-right mt-4 md:mt-0">
                      <p className="text-xl font-light text-white">${(item.price * item.quantity).toFixed(2)}</p>
                      {item.quantity > 1 && <p className="text-[9px] text-white/20 mt-1">${item.price.toFixed(2)} each</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="glass rounded-[40px] p-8 md:p-10 border border-white/5 sticky top-32 space-y-6">
                  <h3 className="text-xl font-black tracking-tight uppercase text-white mb-2">Order Summary</h3>
                  
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/30">Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})</span>
                      <span className="text-white/70">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/30">Shipping</span>
                      <span className={shipping === 0 ? "text-green-400" : "text-white/70"}>
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {subtotal < 75 && (
                      <p className="text-[8px] text-[#81D8D0]/60 uppercase tracking-widest">
                        Add ${(75 - subtotal).toFixed(2)} more for free shipping!
                      </p>
                    )}
                    <div className="flex justify-between pt-4 border-t border-white/5">
                      <span className="font-black text-white">Total</span>
                      <span className="font-black text-xl text-[#81D8D0]">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link href="/checkout" className="btn-zeneio w-full text-black py-5 block text-center text-xs uppercase font-black tracking-[0.2em]">
                    Proceed to Checkout
                  </Link>

                  {/* Trust */}
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 text-[8px] text-white/25 uppercase tracking-widest">
                      <span>🔒 Secure SSL Encryption</span>
                    </div>
                    <div className="flex items-center gap-3 text-[8px] text-white/25 uppercase tracking-widest">
                      <span>📦 100% Discreet Shipping</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      {['Visa', 'MC', 'Amex', 'PayPal'].map((card) => (
                        <span key={card} className="glass px-3 py-1 rounded text-[7px] text-white/20 border border-white/5">{card}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Continue Shopping */}
                <Link href="/products" className="block text-center mt-6 text-[9px] uppercase tracking-widest text-white/30 hover:text-white transition">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
