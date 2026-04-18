import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black tracking-tighter uppercase italic mb-16">Shipping Protocol<span className="text-[#81D8D0]">.</span></h1>
        
        <div className="space-y-16">
          <section className="glass p-12 rounded-[40px] border-white/5">
            <h2 className="text-[#81D8D0] text-[10px] font-black uppercase tracking-[0.5em] mb-8">01 / Absolute Discretion</h2>
            <p className="text-white/40 text-lg font-light leading-relaxed mb-8">
                Your privacy is our baseline. Every Zeneio order is shipped in **100% unmarked, plain brown or white packaging**. No company logos, no product descriptions, and no mentions of adult content on the exterior.
            </p>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <p className="text-[10px] uppercase font-black tracking-widest text-white/60 mb-2">Billing Descriptor</p>
                <p className="text-xl font-bold italic">ZENEIO SERVICES</p>
            </div>
          </section>

          <section className="glass p-12 rounded-[40px] border-white/5">
            <h2 className="text-[#81D8D0] text-[10px] font-black uppercase tracking-[0.5em] mb-8">02 / Global Logistics</h2>
            <p className="text-white/40 text-lg font-light leading-relaxed">
                We utilize a decentralized network of logistics nodes in North America, Europe, and East Asia to ensure fast, local-style delivery. 
            </p>
            <ul className="mt-8 space-y-4 text-[10px] uppercase font-bold tracking-widest text-white/60">
                <li>• USA / Canada: 3-5 Business Days</li>
                <li>• Europe: 4-6 Business Days</li>
                <li>• Asia-Pacific: 5-7 Business Days</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
