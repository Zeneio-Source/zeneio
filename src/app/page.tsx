'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES } from '@/lib/types';
import { ALL_PRODUCTS, getFeaturedProducts, getHotProducts, getNewProducts, formatPrice } from '@/lib/products-data';
import {
  Shield, Truck, Lock, Award, ArrowRight,
  ChevronRight, Sparkles, Star, Zap, Heart,
  ChevronLeft, Play
} from 'lucide-react';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 4);
  const hotProducts = getHotProducts().slice(0, 8);
  const newProducts = getNewProducts().slice(0, 4);

  return (
    <div className="min-h-screen bg-zeneio-black">
      <Navbar />

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-zeneio-black" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="scanline" />
        <div className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(129,216,208,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(155,135,245,0.08) 0%, transparent 50%)',
          }}
        />

        <div className="section-container relative z-10 pt-28 pb-16 lg:pt-32 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[10px] font-bold tracking-[0.2em] uppercase text-zeneio-accent">
                <div className="w-1.5 h-1.5 rounded-full bg-zeneio-accent animate-pulse" />
                Neural Privacy Protocol Enabled
              </div>

              <h1 className="text-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter text-white">
                Intimacy{' '}
                <span className="font-serif italic text-zeneio-accent font-normal tracking-normal lowercase opacity-90">evolved</span>
                <br />
                <span className="text-white/40">via</span> Pure Engineering
              </h1>

              <p className="text-body-lg text-white/40 max-w-lg leading-relaxed font-medium">
                Precision-engineered biological wellness for your most private moments.
                Where cutting-edge material science meets sentient intimacy.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/products" className="btn-zeneio btn-lg">
                  Shop Collection <ArrowRight size={14} />
                </Link>
                <Link href="/quiz" className="btn-outline">
                  Take the Quiz <Play size={14} />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4 border-t border-white/5 mt-8">
                {[
                  { icon: Shield, label: 'Discreet Shipping' },
                  { icon: Lock, label: 'Secure Checkout' },
                  { icon: Award, label: '18+ Verified' },
                  { icon: Zap, label: 'Fast Delivery' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-white/35 text-xs font-medium">
                    <item.icon size={14} />
                    <span className="hidden sm:inline">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual - Category Preview Cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4 h-[500px]">
              {CATEGORIES.map((cat, i) => (
                <Link
                  key={cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className={`relative group rounded-3xl overflow-hidden ${i === 0 ? 'row-span-2' : ''}`}
                  style={{ background: `linear-gradient(135deg, ${cat.color}10, ${cat.color}03)` }}
                >
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-10">
                    <div className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center text-2xl"
                      style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}25` }}
                    >
                      {cat.slug === 'male' ? '♂' : cat.slug === 'female' ? '♀' : '✦'}
                    </div>
                    <h3 className="font-bold text-lg text-white group-hover:text-zeneio-accent transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-white/40 mt-1">{cat.nameZh}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-zeneio-accent mt-3 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ChevronRight size={12} />
                    </span>
                  </div>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 transition-all duration-500" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CATEGORY SHOWCASE (Mobile)
          ============================================ */}
      <section className="lg:hidden section-container py-12 space-y-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products?category=${cat.slug}`}
            className="category-card block"
          >
            <div className="absolute inset-0 z-10" style={{ background: `linear-gradient(to top, ${cat.color}20, transparent)` }} />
            <div className="category-info">
              <h3 className="text-xl font-bold">{cat.name}</h3>
              <p className="text-sm text-white/50 mt-1">{cat.nameZh} · {cat.description.slice(0, 50)}...</p>
              <span className="inline-flex items-center gap-1 text-sm text-zeneio-accent mt-3 font-semibold">
                Shop Now <ChevronRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* ============================================
          TRUST BANNER
          ============================================ */}
      <section className="border-y border-white/5 py-8">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 text-center">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders $99+' },
              { icon: Lock, title: 'Secure Payment', desc: '256-bit encryption' },
              { icon: Shield, title: 'Discreet Packaging', desc: 'Plain unmarked boxes' },
              { icon: Award, title: 'Premium Quality', desc: 'Medical-grade materials' },
            ].map((item) => (
              <div key={item.title} className="group">
                <div className="w-11 h-11 mx-auto rounded-xl glass flex items-center justify-center mb-3 group-hover:bg-zeneio-accent/10 transition-colors">
                  <item.icon size={20} className="text-zeneio-accent" />
                </div>
                <p className="text-sm font-bold text-white/90">{item.title}</p>
                <p className="text-xs text-white/35 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURED PRODUCTS
          ============================================ */}
      <section className="section-container py-16 lg:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-zeneio-accent mb-2">Curated Selection</p>
            <h2 className="text-heading-2 font-bold">Featured Products</h2>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-white/50 hover:text-zeneio-accent transition-colors">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="sm:hidden mt-8 text-center">
          <Link href="/products" className="btn-outline w-full sm:w-auto inline-block">
            View All Products <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ============================================
          BRAND PROMO BANNER
          ============================================ */}
      <section className="section-container pb-16 lg:pb-24">
        <div className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(129,216,208,0.08), rgba(155,135,245,0.06))',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-16 items-center">
            <div className="space-y-5">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-zeneio-purple">Our Philosophy</p>
              <h2 className="text-heading-1 font-bold leading-tight">
                Designed for<br/>
                <span className="text-gradient">Your Pleasure</span><br/>
                & Your Privacy
              </h2>
              <p className="text-body text-white/45 leading-relaxed max-w-md">
                Every ZENEIO product is engineered with medical-grade materials, 
                whisper-quiet motors, and intuitive controls. Because your intimate 
                moments deserve nothing less than perfection — delivered in 
                packaging that tells no secrets.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/about" className="btn-outline">Our Story</Link>
                <Link href="/engineering" className="btn-ghost">Technology →</Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '50K+', label: 'Happy Customers', color: '#81D8D0' },
                { value: '100%', label: 'Body-Safe Materials', color: '#9B87F5' },
                { value: '<48hr', label: 'Global Delivery', color: '#F472B6' },
                { value: '4.9★', label: 'Average Rating', color: '#FBBF24' },
              ].map(stat => (
                <div key={stat.label} className="glass rounded-2xl p-5 text-center hover:border-white/15 transition-colors">
                  <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          HOT SELLING PRODUCTS
          ============================================ */}
      <section className="section-container py-16 lg:py-24 border-t border-white/5">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-pink-400 mb-2">Trending Now</p>
            <h2 className="text-heading-2 font-bold">Best Sellers 🔥</h2>
          </div>
          <Link href="/products?sort=hot" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-white/50 hover:text-pink-400 transition-colors">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Horizontal scroll on mobile */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible snap-x snap-mandatory">
          {hotProducts.map(product => (
            <div key={product.id} className="min-w-[220px] sm:min-w-[250px] lg:min-w-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          NEW ARRIVALS
          ============================================ */}
      <section className="section-container py-16 lg:py-24 border-t border-white/5">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-zeneio-accent mb-2">Just Landed</p>
            <h2 className="text-heading-2 font-bold">New Arrivals ✨</h2>
          </div>
          <Link href="/products?sort=new" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-white/50 hover:text-zeneio-accent transition-colors">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ============================================
          TRUST BADGES SECTION
          ============================================ */}
      <section className="py-16 lg:py-20 border-y border-white/[0.04]">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: Shield, title: '30-Day Returns', desc: 'Full refund if not satisfied. No questions.' },
              { icon: Truck, title: 'Discreet Shipping', desc: 'Plain packaging. "ZNE Logistics" return address.' },
              { icon: Lock, title: 'Secure Checkout', desc: '256-bit SSL encryption. PCI DSS compliant.' },
              { icon: Award, title: '1-Year Warranty', desc: 'All products covered against defects.' },
            ].map((item) => (
              <div key={item.title} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-zeneio-accent/10 border border-zeneio-accent/15 flex items-center justify-center group-hover:bg-zeneio-accent/20 transition-all">
                  <item.icon size={24} className="text-zeneio-accent" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-white/35 leading-relaxed max-w-[180px] mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust Seals Bar */}
          <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-25">
            <span className="text-xs font-semibold tracking-widest uppercase text-white/50">SSL SECURED</span>
            <span className="text-white/15">|</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-white/50">PCI COMPLIANT</span>
            <span className="text-white/15">|</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-white/50">GDPR READY</span>
            <span className="text-white/15">|</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-white/50">18+ VERIFIED</span>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA / NEWSLETTER SECTION
          ============================================ */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zeneio-accent/[0.02] to-transparent" />
        <div className="section-container relative z-10 text-center">
          <Heart size={40} className="mx-auto text-pink-400/40 mb-6" />
          <h2 className="text-heading-1 font-bold mb-4">
            Ready to Explore?
          </h2>
          <p className="text-body text-white/40 max-w-md mx-auto mb-8">
            Join thousands who have discovered a new dimension of intimacy 
            with ZENEIO&apos;s bio-tech collection.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="btn-zeneio btn-lg">
              Start Shopping <ArrowRight size={14} />
            </Link>
            <Link href="/quiz" className="btn-outline btn-lg">
              Find Your Match
            </Link>
          </div>

          {/* Mini Newsletter */}
          <form onSubmit={(e) => {
            e.preventDefault();
            const email = (e.target as HTMLFormElement).querySelector('input')?.value;
            if (email) window.location.href = `mailto:hello@zeneio.com?subject=ZENEIO Newsletter Subscription&body=Please add ${email} to the mailing list.`;
          }} className="mt-12 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input type="email" placeholder="Get exclusive offers via email..." className="input-field flex-1 rounded-xl text-center sm:text-left" />
            <button type="submit" className="btn-accent whitespace-nowrap px-8 rounded-xl">Join</button>
          </form>
        </div>
      </section>

    </div>
  );
}
