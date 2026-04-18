import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black tracking-tighter uppercase italic mb-16 italic">Neural Privacy<span className="text-[#81D8D0]">.</span></h1>
        
        <div className="space-y-16">
          <section className="glass p-12 rounded-[40px] border-white/5">
            <h2 className="text-[#81D8D0] text-[10px] font-black uppercase tracking-[0.5em] mb-8">Data Protocol</h2>
            <p className="text-white/40 text-lg font-light leading-relaxed mb-8">
                Your data is encrypted using 256-bit SSL protocols. We do not sell, share, or monetize your intimate preferences. Every transaction is processed through a private, non-descript gateway.
            </p>
          </section>

          <section className="glass p-12 rounded-[40px] border-white/5">
            <h2 className="text-[#81D8D0] text-[10px] font-black uppercase tracking-[0.5em] mb-8">Compliance</h2>
            <p className="text-white/40 text-lg font-light leading-relaxed mb-8">
                Zeneio is fully compliant with GDPR and CCPA regulations. We provide end-to-end encryption for our app-controlled devices.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
