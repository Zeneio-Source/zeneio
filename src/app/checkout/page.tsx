'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl font-black tracking-tighter uppercase italic mb-16">Finalize<span className="text-[#81D8D0]">.</span></h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Form Section */}
            <div className="space-y-12">
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#81D8D0] mb-8">01 / Shipping Protocol</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="First Name" className="glass bg-transparent p-5 rounded-2xl border-white/5 focus:border-[#81D8D0] transition-colors uppercase text-[10px] font-bold tracking-widest text-white outline-none" />
                  <input type="text" placeholder="Last Name" className="glass bg-transparent p-5 rounded-2xl border-white/5 focus:border-[#81D8D0] transition-colors uppercase text-[10px] font-bold tracking-widest text-white outline-none" />
                  <input type="email" placeholder="Email" className="md:col-span-2 glass bg-transparent p-5 rounded-2xl border-white/5 focus:border-[#81D8D0] transition-colors uppercase text-[10px] font-bold tracking-widest text-white outline-none" />
                  <input type="text" placeholder="Address" className="md:col-span-2 glass bg-transparent p-5 rounded-2xl border-white/5 focus:border-[#81D8D0] transition-colors uppercase text-[10px] font-bold tracking-widest text-white outline-none" />
                  <input type="text" placeholder="City" className="glass bg-transparent p-5 rounded-2xl border-white/5 focus:border-[#81D8D0] transition-colors uppercase text-[10px] font-bold tracking-widest text-white outline-none" />
                  <input type="text" placeholder="Country" className="glass bg-transparent p-5 rounded-2xl border-white/5 focus:border-[#81D8D0] transition-colors uppercase text-[10px] font-bold tracking-widest text-white outline-none" />
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#81D8D0] mb-8">02 / Payment Gateway</h3>
                <div className="glass p-10 rounded-[40px] border-[#81D8D0]/20 bg-[#81D8D0]/5">
                   <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.3em] leading-relaxed mb-8">
                     Your transaction will be processed through our encrypted private gateway. Discreet billing is active. <br />
                     Charges will appear as <span className="text-white">"ZENEIO SERVICES"</span>.
                   </p>
                   <div className="flex items-center justify-between p-6 border border-white/10 rounded-2xl bg-black/40">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 rounded-full border-2 border-[#81D8D0] bg-[#81D8D0] shadow-[0_0_10px_#81D8D0]"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Secure Credit Card</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-5 bg-white/10 rounded"></div>
                        <div className="w-8 h-5 bg-white/10 rounded"></div>
                      </div>
                   </div>
                </div>
              </section>

              <button className="btn-zeneio w-full">Initialize Payment</button>
            </div>

            {/* Order Review */}
            <div className="hidden lg:block">
              <div className="sticky top-32 glass p-12 rounded-[60px] border-white/5">
                <h4 className="text-[9px] uppercase font-black tracking-[0.4em] text-white/20 mb-10">Neural Collection Review</h4>
                <div className="flex gap-6 items-center mb-10 pb-10 border-b border-white/5">
                  <img src="https://sc02.alicdn.com/kf/A1dabe5d4edc840148a73a3f6496a1328S.png" className="w-20 h-20 object-contain mix-blend-screen opacity-60" alt="Review" />
                  <div>
                    <h5 className="text-lg font-black uppercase tracking-tight">ZENEIO PRO</h5>
                    <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Qty: 1 · Alpha Series</p>
                  </div>
                  <div className="ml-auto font-light">$199.00</div>
                </div>
                <div className="space-y-4 mb-10">
                   <div className="flex justify-between text-[10px] uppercase font-bold text-white/30 tracking-widest"><span>Shipping</span> <span className="text-[#81D8D0]">Discreet / Free</span></div>
                   <div className="flex justify-between text-2xl font-black uppercase mt-6"><span>Final Total</span> <span className="text-white">$199.00</span></div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 text-[9px] uppercase font-black tracking-widest text-center text-white/20">
                   End-to-end Encrypted
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
