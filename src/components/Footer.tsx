'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/types';

export default function Footer() {
  const year = new Date().getFullYear();

  const categoryIcons: Record<string, string> = { male: '♂', female: '♀', lingerie: '✦' };

  return (
    <footer className="bg-zeneio-darker border-t border-white/5">
      {/* Newsletter Section */}
      <div className="border-b border-white/5">
        <div className="section-container py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-bold mb-2">Join the ZENEIO Community</h3>
              <p className="text-sm text-white/50">Exclusive offers, new arrivals & wellness tips. No spam, ever.</p>
            </div>
            <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="input-field flex-1 rounded-xl"
                required
              />
              <button type="submit" className="btn-accent whitespace-nowrap px-6">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-block text-2xl font-black tracking-tighter mb-4">
              ZENEIO<span className="text-zeneio-accent">.</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-5 max-w-xs">
              Bio-Tech &amp; Sensual Wellness. Precision-engineered products designed for your most private moments.
            </p>
            {/* Trust Badges */}
            <div className="flex items-center gap-3 text-[11px] text-white/30 font-medium">
              <span className="flex items-center gap-1">🔒 Secure SSL</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span className="flex items-center gap-1">📦 Discreet Shipping</span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Shop</p>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/products?category=${cat.slug}`} className="text-sm text-white/60 hover:text-zeneio-accent transition-colors flex items-center gap-2">
                    <span className="text-xs opacity-40">{categoryIcons[cat.slug]}</span> {cat.name}
                  </Link>
                </li>
              ))}
              <li><Link href="/products" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors">All Products</Link></li>
              <li><Link href="/products?sort=new" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors">New Arrivals</Link></li>
              <li><Link href="/products?sale=true" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors text-pink-400">Sale 🔥</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Company</p>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors">About Us</Link></li>
              <li><Link href="/engineering" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors">Our Technology</Link></li>
              <li><Link href="/blog" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors">Blog</Link></li>
              <li><Link href="/news" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors">Press & News</Link></li>
              <li><Link href="/contact" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Support</p>
            <ul className="space-y-2.5">
              <li><Link href="/faq" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors">Shipping Info</Link></li>
              <li><Link href="/privacy" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors">Terms of Service</Link></li>
              <li><Link href="/quiz" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors">Product Quiz</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Account</p>
            <ul className="space-y-2.5">
              <li><Link href="/login" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors">Sign In</Link></li>
              <li><Link href="/register" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors">Create Account</Link></li>
              <li><Link href="/account/orders" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors">Track Order</Link></li>
              <li><Link href="/account/wishlist" className="text-sm text-white/60 hover:text-zeneio-accent transition-colors">Wishlist</Link></li>
            </ul>
          </div>
        </div>

        {/* Payment Icons */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-lg opacity-25">
              💳 🏦 🔒
            </div>
            <p className="text-xs text-white/20">
              © {year} ZENEIO. All rights reserved. 18+ Only. Discreet billing.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/30 hover:text-white/70 transition-colors text-sm">𝕏</a>
              <a href="#" className="text-white/30 hover:text-white/70 transition-colors text-sm">in</a>
              <a href="#" className="text-white/30 hover:text-white/70 transition-colors text-sm">📷</a>
              <a href="#" className="text-white/30 hover:text-white/70 transition-colors text-sm">▶️</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
