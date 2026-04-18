import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function EngineeringPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-32">
            <div className="inline-block glass px-4 py-2 rounded-full text-[9px] uppercase tracking-[0.4em] font-bold mb-10 text-[#81D8D0] border-[#81D8D0]/20">
                Inside the Lab
            </div>
            <h1 className="text-7xl md:text-[9rem] font-serif italic font-light leading-[0.85] mb-8">
                The Science <br /> <span className="not-italic font-sans font-black tracking-tighter text-glow uppercase">of Joy</span>
            </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-40">
            <div className="glass aspect-[4/5] rounded-[60px] overflow-hidden flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#81D8D0]/20 to-transparent"></div>
                <div className="w-1/2 h-1/2 bg-white/5 rounded-full blur-[100px] animate-pulse"></div>
                <p className="relative z-10 text-[10px] uppercase font-black tracking-[1em] text-white/10 rotate-90">GEN-4 CORE</p>
            </div>
            <div className="space-y-12">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter">Haptic Precision.</h2>
                <p className="text-white/40 text-xl font-light leading-relaxed tracking-wide">
                    At ZENEIO, we don't build toys. We engineer high-frequency bio-resonance devices. Our team consists of former consumer electronics designers and anatomical researchers who believe intimacy deserves the same level of innovation as your smartphone.
                </p>
                <div className="space-y-8">
                    <div className="border-l-2 border-[#81D8D0] pl-8">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#81D8D0] mb-2">Sonic Dynamics</h4>
                        <p className="text-sm font-bold text-white/60 uppercase tracking-widest leading-relaxed">Our Gen-4 motors operate at frequencies designed to stimulate deep neural tissue while maintaining a noise level below 18 decibels.</p>
                    </div>
                    <div className="border-l-2 border-white/10 pl-8">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Satin-Touch™ Bio-Silicone</h4>
                        <p className="text-sm font-bold text-white/60 uppercase tracking-widest leading-relaxed">Medical-grade, non-porous material treated with a proprietary vacuum-coating for a friction-less glide.</p>
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
