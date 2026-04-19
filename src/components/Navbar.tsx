'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CATEGORIES, CategorySlug } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import {
  Menu, X, ShoppingBag, User, Search, ChevronDown,
  Heart, Package, Settings, LogOut, Grid3X3
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state: cartState } = useCart();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Category icons mapping
  const categoryIcons: Record<string, string> = {
    male: '♂',
    female: '♀',
    lingerie: '✦',
  };

  return (
    <>
      {/* Top Banner - Desktop Only */}
      <div className="hidden lg:block bg-zeneio-accent text-black text-center py-1.5 text-xs font-semibold tracking-widest uppercase">
        Free Shipping on Orders $99+ • Discreet Packaging • Secure Checkout
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-zeneio-black/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-lg shadow-black/20'
            : 'bg-black/40 backdrop-blur-xl border-b border-white/[0.06]'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white hover:text-zeneio-accent transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img src="/logo.png" className="h-8 lg:h-9 w-auto opacity-90 group-hover:opacity-100 transition-all" alt="ZENEIO" />
              <div className="flex flex-col -space-y-1">
                <span className="text-xl lg:text-2xl font-black tracking-tighter italic uppercase text-white leading-none">
                  ZENEIO<span className="relative inline-block w-1.5 h-1.5 ml-0.5 bg-zeneio-accent rounded-full animate-dot" />
                </span>
                <span className="hidden sm:block text-[8px] font-bold tracking-[0.4em] uppercase text-white/30 text-center">
                  Laboratory
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Categories Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setCategoryDropdown('categories')}
                onMouseLeave={() => setCategoryDropdown(null)}
              >
                <button className="flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white transition-colors py-5">
                  <Grid3X3 size={16} />
                  Shop
                  <ChevronDown size={14} className={`transition-transform duration-300 ${categoryDropdown === 'categories' ? 'rotate-180' : ''}`} />
                </button>

                {/* Mega Menu Dropdown */}
                {categoryDropdown === 'categories' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-100 animate-fade-in">
                    <div className="glass-strong rounded-2xl p-6 min-w-[520px] grid grid-cols-3 gap-6 shadow-card-hover">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/products?category=${cat.slug}`}
                          className="group/cat flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
                          onClick={() => setCategoryDropdown(null)}
                        >
                          <div
                            className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover/cat:scale-110"
                            style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                          >
                            {categoryIcons[cat.slug]}
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-bold text-white">{cat.name}</p>
                            <p className="text-xs text-white/40 mt-0.5">{cat.nameZh}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/products" className="text-sm font-semibold text-white/80 hover:text-white transition-colors">All Products</Link>
              <Link href="/blog" className="text-sm font-semibold text-white/80 hover:text-white transition-colors">Blog</Link>
              <Link href="/about" className="text-sm font-semibold text-white/80 hover:text-white transition-colors">About</Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-all hidden sm:flex"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* User Account */}
              <Link
                href={isAuthenticated ? "/account" : "/login"}
                className="p-2.5 text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                aria-label="Account"
              >
                {isAuthenticated ? (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-zeneio-accent to-zeneio-purple flex items-center justify-center text-xs font-bold text-black">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                ) : (
                  <User size={18} />
                )}
              </Link>

              {/* Wishlist */}
              <Link href="/account/wishlist" className="p-2.5 text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-all hidden sm:flex" aria-label="Wishlist">
                <Heart size={18} />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2.5 text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                {cartState.itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-zeneio-accent text-black text-[10px] font-bold rounded-full flex items-center justify-center animate-fade-in">
                    {cartState.itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar (Expandable) */}
        <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="section-container pb-4">
            <form action={`/search`} method="get" className="relative max-w-2xl mx-auto">
              <input
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="input-field pl-12 pr-4 py-3 rounded-xl text-base"
                autoFocus
              />
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
            </form>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div className={`fixed inset-0 z-[60] bg-zeneio-black transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/5">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-black tracking-tighter">
              ZENEIO<span className="text-zeneio-accent">.</span>
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white/70">
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-1">
            {/* Categories Section */}
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/30 mb-3">Categories</p>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-semibold text-white/90 hover:bg-white/5 transition-colors"
              >
                <span className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${cat.color}15` }}>
                  {categoryIcons[cat.slug]}
                </span>
                <div>
                  <span>{cat.name}</span>
                  <span className="text-sm text-white/40 ml-2">{cat.nameZh}</span>
                </div>
              </Link>
            ))}

            <div className="h-px bg-white/5 my-4"></div>

            {/* Other Links */}
            <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-lg font-semibold text-white/80 hover:text-white transition-colors">All Products</Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-lg font-semibold text-white/80 hover:text-white transition-colors">Blog</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-lg font-semibold text-white/80 hover:text-white transition-colors">About Us</Link>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-lg font-semibold text-white/80 hover:text-white transition-colors">FAQ</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-lg font-semibold text-white/80 hover:text-white transition-colors">Contact</Link>

            <div className="h-px bg-white/5 my-4"></div>

            {/* Account Link */}
            {isAuthenticated ? (
              <>
                <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-lg font-semibold text-white/80">
                  <Package size={20} /> My Account
                </Link>
                <Link href="/account/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-lg font-semibold text-white/80">
                  <Package size={20} /> My Orders
                </Link>
                <Link href="/account/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-lg font-semibold text-white/80">
                  <Heart size={20} /> Wishlist
                </Link>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-lg font-semibold text-white/80">
                <User size={20} /> Sign In / Register
              </Link>
            )}

            <div className="mt-8">
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="btn-accent w-full justify-center text-base py-4">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
