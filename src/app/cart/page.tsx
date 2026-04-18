import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function CartPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl font-black tracking-tighter uppercase italic mb-16">Collection<span className="text-[#81D8D0]">.</span></h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
              {/* Cart Item */}
              <div className="glass p-8 rounded-[40px] flex items-center gap-8 group">
                <div className="w-32 h-32 rounded-3xl bg-white/5 p-4 flex items-center justify-center shrink-0">
                  <img src="https://sc02.alicdn.com/kf/A1dabe5d4edc840148a73a3f6496a1328S.png" className="w-full h-full object-contain mix-blend-screen opacity-80" alt="Product" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-black uppercase tracking-tight">ZENEIO PRO</h3>
                    <button className="text-white/20 hover:text-rose-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>
                  <p className="text-[10px] uppercase font-black text-[#81D8D0] tracking-[0.3em] mb-4">Quantity: 1</p>
                  <p className="text-xl font-light">$199.00</p>
                </div>
              </div>

              <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[40px] hidden">
                 <p className="text-white/20 uppercase tracking-widest font-black text-[10px]">Your collection is empty.</p>
                 <Link href="/products" className="inline-block mt-6 text-[#81D8D0] font-black text-[9px] uppercase tracking-[0.4em] hover:underline">Return to Lineup</Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="glass p-10 rounded-[40px] sticky top-32">
                <h3 className="text-xl font-black uppercase tracking-widest mb-10 pb-6 border-b border-white/10">Summary</h3>
                <div className="space-y-6 mb-10 text-[10px] uppercase font-black tracking-widest text-white/40">
                  <div className="flex justify-between"><span>Subtotal</span> <span className="text-white">$199.00</span></div>
                  <div className="flex justify-between"><span>Shipping</span> <span className="text-white">FREE</span></div>
                  <div className="flex justify-between"><span>Tax</span> <span className="text-white">$0.00</span></div>
                </div>
                <div className="flex justify-between text-2xl font-black uppercase mb-12">
                  <span>Total</span>
                  <span className="text-[#81D8D0]">$199.00</span>
                </div>
                <Link href="/checkout" className="btn-zeneio w-full block text-center">
                  Proceed to Checkout
                </Link>
                <div className="mt-8 flex items-center justify-center gap-3 opacity-30">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-center">Encrypted Transaction Hub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
