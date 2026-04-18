'use client';

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 p-6 md:p-8">
      <nav className="max-w-7xl mx-auto glass rounded-full px-10 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/logo.png" className="h-10 w-auto" alt="ZENEIO Logo" />
          <div className="text-2xl font-black tracking-tighter italic uppercase text-white">
            ZENEIO<span className="text-[#81D8D0]">.</span>
          </div>
        </Link>
        <div className="hidden md:flex space-x-12 text-[9px] uppercase font-black tracking-[0.3em] text-white/40">
          <Link href="/products" className="hover:text-[#81D8D0] transition">Engineering</Link>
          <Link href="/quiz" className="hover:text-[#81D8D0] transition">The Quiz</Link>
          <Link href="/shipping" className="hover:text-[#81D8D0] transition">Protocol</Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/cart" className="relative cursor-pointer group">
            <svg className="w-5 h-5 text-white/60 group-hover:text-[#81D8D0] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <span className="absolute -top-1 -right-1 bg-[#81D8D0] text-black text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">0</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
