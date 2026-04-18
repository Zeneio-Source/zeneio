'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-24 px-8 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-16">
        
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-block mb-6">
            <img src="/logo-brand.png" className="h-10 w-auto" alt="ZENEIO Logo" />
          </Link>
          <p className="max-w-xs text-white/30 text-sm font-light leading-relaxed mb-8 uppercase tracking-widest">
            The intersection of biology and electronics. Crafted for the future of human sensation.
          </p>
          
          {/* Social Links */}
          <div className="flex gap-4">
            {[
              { icon: '𝕏', label: 'Twitter / X' },
              { icon: '📷', label: 'Instagram' },
              { icon: '▶', label: 'YouTube' },
              { icon: '💼', label: 'LinkedIn' },
            ].map((social) => (
              <a key={social.label} href="#" 
                className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/30 hover:text-[#81D8D0] hover:border-[#81D8D0]/30 transition border border-transparent hover:border"
                aria-label={social.label}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-[9px] uppercase font-black tracking-[0.3em] mb-10 text-[#81D8D0]">Products</h4>
          <ul className="space-y-5 text-[10px] uppercase font-bold tracking-widest text-white/40">
            <li><Link href="/products" className="hover:text-white transition">All Devices</Link></li>
            <li><Link href="/products/pro" className="hover:text-white transition">ZENEIO PRO</Link></li>
            <li><Link href="/products/neo" className="hover:text-white transition">ZENEIO NEO</Link></li>
            <li><Link href="/products/wand" className="hover:text-white transition">ZENEIO WAND</Link></li>
            <li><Link href="/quiz" className="hover:text-white transition">Product Quiz</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-[9px] uppercase font-black tracking-[0.3em] mb-10 text-[#81D8D0]">Company</h4>
          <ul className="space-y-5 text-[10px] uppercase font-bold tracking-widest text-white/40">
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-white transition">Journal</Link></li>
            <li><Link href="/news" className="hover:text-white transition">News</Link></li>
            <li><Link href="/engineering" className="hover:text-white transition">Engineering</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-[9px] uppercase font-black tracking-[0.3em] mb-10 text-[#81D8D0]">Support</h4>
          <ul className="space-y-5 text-[10px] uppercase font-bold tracking-widest text-white/40">
            <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:text-white transition">Shipping Info</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            <li><Link href="/search" className="hover:text-white transition">Search</Link></li>
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto mt-20 pt-12 border-t border-white/5">
        <div className="glass rounded-[40px] p-8 md:p-12 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-lg font-bold text-white mb-2">Join The Lab</h4>
            <p className="text-xs text-white/30 max-w-md">Get exclusive access to new products, member-only discounts, and wellness insights. No spam, ever.</p>
          </div>
          <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address"
              className="flex-1 md:w-64 glass bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition min-w-0" />
            <button type="submit" className="btn-zeneio text-black px-8 py-4 rounded-full whitespace-nowrap text-xs">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[8px] font-black uppercase tracking-[0.5em] text-white/10 gap-4">
        <span>&copy; 2026 ZENEIO LABS. All rights reserved.</span>
        
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
          <Link href="/sitemap.xml" className="hover:text-white transition">Sitemap</Link>
          <span>18+ Verified</span>
        </div>

        {/* Payment Icons */}
        <div className="flex gap-2 hidden md:flex">
          {['Visa', 'MC', 'Amex', 'PayPal'].map((card) => (
            <span key={card} className="glass px-2 py-1 rounded text-[6px] text-white/15 border border-white/5">{card}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
