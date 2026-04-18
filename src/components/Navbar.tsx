'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 p-4 md:p-6">
      <nav className="max-w-7xl mx-auto glass rounded-full px-6 md:px-10 py-4 md:py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/logo.png" className="h-8 md:h-10 w-auto" alt="ZENEIO Logo" />
          <div className="text-xl md:text-2xl font-black tracking-tighter italic uppercase text-white">
            ZENEIO<span className="text-[#81D8D0]">.</span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-8 text-[9px] uppercase font-black tracking-[0.3em] text-white/40">
          <Link href="/products" className="hover:text-[#81D8D0] transition">Products</Link>
          <Link href="/about" className="hover:text-[#81D8D0] transition">About</Link>
          <Link href="/blog" className="hover:text-[#81D8D0] transition">Journal</Link>
          <Link href="/faq" className="hover:text-[#81D8D0] transition">FAQ</Link>
          <Link href="/contact" className="hover:text-[#81D8D0] transition">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <Link href="/search" className="hidden sm:block cursor-pointer group">
            <svg className="w-4 h-4 text-white/40 group-hover:text-[#81D8D0] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" strokeWidth="1.5"/>
              <path strokeWidth="1.5" d="M21 21l-4.35-4.35"/>
            </svg>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative cursor-pointer group">
            <svg className="w-5 h-5 text-white/60 group-hover:text-[#81D8D0] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <span className="absolute -top-1 -right-1 bg-[#81D8D0] text-black text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">2</span>
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden flex flex-col gap-1.5 cursor-pointer">
            <span className={`w-5 h-0.5 bg-white/60 transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-white/60 transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-white/60 transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-6 right-6 mt-2 glass rounded-3xl border border-white/10 overflow-hidden animate-in slide-in-from-top duration-200">
          <div className="p-8 space-y-6">
            {[
              { href: '/products', label: 'Products' },
              { href: '/about', label: 'About' },
              { href: '/blog', label: 'Journal' },
              { href: '/news', label: 'News' },
              { href: '/faq', label: 'FAQ' },
              { href: '/quiz', label: 'The Quiz' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="block text-lg font-bold text-white/70 hover:text-[#81D8D0] transition uppercase tracking-wider">
                {link.label}
              </Link>
            ))}
            
            <div className="pt-6 border-t border-white/5 space-y-4">
              <Link href="/search" className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition">
                🔍 Search
              </Link>
              <Link href="/cart" className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition">
                🛒 Cart (2)
              </Link>
            </div>

            <div className="pt-4 border-t border-white/5 text-[9px] text-white/20 uppercase tracking-widest">
              <p>© 2026 ZENEIO Labs</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
