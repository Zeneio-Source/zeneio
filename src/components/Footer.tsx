'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-24 px-8 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <img src="/logo.png" className="h-10 w-auto" alt="ZENEIO Logo" />
            <div className="text-3xl font-black tracking-tighter italic uppercase text-white">
                ZENEIO<span className="text-[#81D8D0]">.</span>
            </div>
          </div>
          <p className="max-w-sm text-white/30 text-sm font-light leading-relaxed mb-10 uppercase tracking-widest">
            The intersection of biology and electronics. <br /> 
            Crafted for the future of human sensation.
          </p>
          <p className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase">All devices shipped in 100% unmarked biodegradable tech-packaging.</p>
        </div>
        <div>
          <h4 className="text-[9px] uppercase font-black tracking-[0.3em] mb-10 text-[#81D8D0]">System</h4>
          <ul className="space-y-6 text-[10px] uppercase font-bold tracking-widest text-white/40">
            <li><Link href="/products" className="hover:text-white transition">Bio-Tech Specs</Link></li>
            <li><Link href="/quiz" className="hover:text-white transition">Haptic Guide</Link></li>
            <li><Link href="/engineering" className="hover:text-white transition">Engineering</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[9px] uppercase font-black tracking-[0.3em] mb-10 text-[#81D8D0]">Logistics</h4>
          <ul className="space-y-6 text-[10px] uppercase font-bold tracking-widest text-white/40">
            <li><Link href="/shipping" className="hover:text-white transition">Discreet Protocol</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Guard</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center text-[8px] font-black uppercase tracking-[0.5em] text-white/10 gap-4">
        <span>&copy; 2026 ZENEIO LABS. NEURAL COMPLIANT.</span>
        <div className="flex gap-10">
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
          <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          <span className="text-white/20">18+ Verified</span>
        </div>
      </div>
    </footer>
  );
}
