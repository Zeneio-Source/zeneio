'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  const items = [
    { name: 'ZENEIO PRO', price: 49.99, qty: 1 },
    { name: 'ZENEIO WAND', price: 35.95, qty: 1 },
  ];
  const subtotal = 85.94;
  const shipping = 0;
  const total = 85.94;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-28 pb-32 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-white mb-6">Secure Checkout</h1>
            
            {/* Steps */}
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <span className={`flex items-center gap-2 ${step >= s ? 'text-[#81D8D0]' : 'text-white/20'}`}>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center border ${step >= s ? 'bg-[#81D8D0]/20 border-[#81D8D0]/50 text-[#81D8D0]' : 'border-white/10'}`}>
                      {step > s ? '✓' : s}
                    </span>
                    {s === 1 ? 'Information' : s === 2 ? 'Shipping' : 'Payment'}
                  </span>
                  {s < 3 && <span className="w-8 h-px bg-white/10"></span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Main Form */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* Contact Info */}
              <section className="glass rounded-3xl p-8 border border-white/5 space-y-6">
                <h2 className="text-lg font-bold text-white/80 uppercase tracking-wider">Contact Information</h2>
                
                <input type="email" placeholder="Email address *"
                  className="w-full glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition" />
                
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" className="mt-1 accent-[#81D8D0]" />
                  <span className="text-xs text-white/30 group-hover:text-white/50 transition">Email me with news and offers (optional)</span>
                </label>
              </section>

              {/* Shipping Address */}
              <section className="glass rounded-3xl p-8 border border-white/5 space-y-6">
                <h2 className="text-lg font-bold text-white/80 uppercase tracking-wider">Shipping Address</h2>

                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First name *" 
                    className="glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition" />
                  <input type="text" placeholder="Last name *"
                    className="glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition" />
                </div>

                <input type="text" placeholder="Address *"
                  className="w-full glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition" />
                <input type="text" placeholder="Apartment, suite, etc. (optional)"
                  className="w-full glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition" />
                
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City *"
                    className="glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition" />
                  <select className="glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white focus:border-[#81D8D0]/50 focus:outline-none transition appearance-none">
                    <option value="" className="bg-black">Country *</option>
                    <option value="us" className="bg-black">United States</option>
                    <option value="uk" className="bg-black">United Kingdom</option>
                    <option value="ca" className="bg-black">Canada</option>
                    <option value="au" className="bg-black">Australia</option>
                    <option value="de" className="bg-black">Germany</option>
                    <option value="jp" className="bg-black">Japan</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="State / Province"
                    className="glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition" />
                  <input type="text" placeholder="ZIP code *"
                    className="glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition" />
                </div>

                <input type="tel" placeholder="Phone (for delivery updates)"
                  className="w-full glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition" />
              </section>

              {/* Shipping Method */}
              <section className="glass rounded-3xl p-8 border border-white/5 space-y-4">
                <h2 className="text-lg font-bold text-white/80 uppercase tracking-wider">Shipping Method</h2>
                
                {[
                  { name: 'Standard Discreet Shipping (7-14 days)', price: 'FREE' },
                  { name: 'Express Discreet Shipping (3-5 days)', price: '$14.99' },
                ].map((method) => (
                  <label key={method.name} className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-[#81D8D0]/20 transition cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="shipping" defaultChecked={method.price === 'FREE'} className="accent-[#81D8D0]" />
                      <span className="text-sm text-white/60 group-hover:text-white transition">{method.name}</span>
                    </div>
                    <span className={`font-medium ${method.price === 'FREE' ? 'text-green-400' : 'text-white/70'}`}>{method.price}</span>
                  </label>
                ))}
              </section>

              {/* Payment */}
              <section className="glass rounded-3xl p-8 border border-white/5 space-y-6">
                <h2 className="text-lg font-bold text-white/80 uppercase tracking-wider">Payment</h2>
                <p className="text-[9px] text-white/25 uppercase tracking-widest">All transactions are secured with 256-bit SSL encryption</p>

                <input type="text" placeholder="Card number *"
                  className="w-full glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition font-mono tracking-wider" />

                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM / YY *"
                    className="glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition font-mono" />
                  <input type="text" placeholder="CVC *"
                    className="glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition font-mono" />
                </div>

                <input type="text" placeholder="Name on card *"
                  className="w-full glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition" />

                {/* Payment Icons */}
                <div className="flex gap-3 pt-2">
                  {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((card) => (
                    <span key={card} className="glass px-3 py-2 rounded-lg text-[8px] text-white/20 border border-white/5">{card}</span>
                  ))}
                </div>
              </section>

              {/* Pay Button */}
              <button onClick={() => setStep(3)}
                className="btn-zeneio w-full text-black py-6 text-sm uppercase font-black tracking-[0.2em] rounded-2xl">
                🔒 Place Order — ${total.toFixed(2)}
              </button>

              <p className="text-center text-[8px] text-white/15 uppercase tracking-widest">
                By placing this order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>

            {/* Sidebar - Order Summary */}
            <aside className="lg:col-span-2 space-y-6">
              
              <div className="glass rounded-3xl p-8 border border-white/5 sticky top-28">
                <h3 className="text-lg font-bold text-white/80 uppercase tracking-wider mb-6">Order Summary</h3>

                {/* Items */}
                <div className="space-y-4 mb-6 pb-6 border-b border-white/5">
                  {items.map((item) => (
                    <div key={item.name} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                        <span className="font-serif italic text-lg text-[#81D8D0]/20">Z</span>
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-sm text-white/70 truncate">{item.name}</p>
                        <p className="text-[9px] text-white/20 mt-0.5">Qty: {item.qty}</p>
                      </div>
                      <p className="text-sm text-white/50">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Shipping</span>
                    <span className="text-green-400">FREE</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-white/5">
                    <span className="font-bold text-white">Total</span>
                    <span className="font-bold text-xl text-[#81D8D0]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mt-6 pt-6 border-t border-white/5">
                  <div className="flex gap-2">
                    <input type="text" placeholder="Promo code"
                      className="flex-1 glass bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/15 focus:border-[#81D8D0]/50 focus:outline-none transition" />
                    <button className="px-6 py-3 rounded-xl border border-white/10 text-[9px] uppercase tracking-widest text-white/40 hover:text-white hover:border-white/30 transition">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                  {['🔒 Secure 256-bit SSL', '📦 100% Discreet Package', '↩ Easy Returns Policy', '✓ 2-Year Warranty'].map((g) => (
                    <p key={g} className="text-[8px] text-white/20">{g}</p>
                  ))}
                </div>
              </div>

              <Link href="/cart" className="block text-center text-[9px] uppercase tracking-widest text-white/20 hover:text-white/50 transition">
                ← Back to Cart
              </Link>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
