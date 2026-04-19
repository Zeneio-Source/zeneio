'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/products-data';
import {
  ShoppingBag, Minus, Plus, X, ArrowLeft,
  Truck, ShieldCheck, Tag, ChevronRight
} from 'lucide-react';

export default function CartPage() {
  const { state: cartState, removeItem, updateQuantity, clearCart } = useCart();

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-zeneio-black">
        <Navbar />
        <div className="section-container pt-32 pb-20 text-center">
          <ShoppingBag size={64} className="mx-auto text-white/10 mb-6" />
          <h1 className="text-heading-2 font-bold mb-3">Your Cart is Empty</h1>
          <p className="text-white/40 mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added anything to your cart yet.
            Explore our collection and find something perfect for you.
          </p>
          <Link href="/products" className="btn-accent btn-lg">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zeneio-black">
      <Navbar />

      {/* Page Header */}
      <div className="page-header">
        <h1>Shopping Cart ({cartState.itemCount})</h1>
        <p>{cartState.itemCount} item{cartState.itemCount !== 1 ? 's' : ''} in your cart</p>
      </div>

      <div className="section-container pb-24">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Cart Items */}
          <div className="space-y-4">
            {/* Header row - desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-bold tracking-wider uppercase text-white/30 px-4 pb-2 border-b border-white/5">
              <span className="col-span-5">Product</span>
              <span className="col-span-3 text-center">Quantity</span>
              <span className="col-span-2 text-right">Price</span>
              <span className="col-span-2 text-right">Total</span>
            </div>

            {cartState.items.map(item => (
              <div key={item.id} className="glass rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in group">
                {/* Product Image & Info */}
                <Link href={`/products/${item.product.slug}`} className="flex items-center gap-4 w-full sm:w-auto md:col-span-5">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-zeneio-gray flex-shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.jpg'; }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base text-white/90 hover:text-zeneio-accent transition-colors line-clamp-2">
                      {item.product.name}
                    </h3>
                    {item.variantName && (
                      <p className="text-xs text-white/35 mt-1">{item.variantName}</p>
                    )}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-white/25 hover:text-red-400 transition-colors mt-2 sm:hidden inline-flex items-center gap-1"
                    >
                      <X size={12} /> Remove
                    </button>
                  </div>
                </Link>

                {/* Quantity */}
                <div className="flex items-center justify-between w-full sm:w-auto sm:justify-center md:col-span-3">
                  <div className="quantity-selector mx-auto">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Mobile remove button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="hidden sm:block text-white/25 hover:text-red-400 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Price (desktop) */}
                <div className="hidden md:flex md:col-span-2 md:justify-end md:items-center">
                  <span className="font-medium text-sm">{formatPrice(item.product.price)}</span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between w-full sm:w-auto md:col-span-2 md:justify-end">
                  <span className="md:hidden text-xs text-white/30">Subtotal</span>
                  <span className="font-bold text-zeneio-accent">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              </div>
            ))}

            {/* Cart Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <Link href="/products" className="btn-ghost text-sm">
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
              <button onClick={clearCart} className="btn-ghost text-sm !text-red-400/60 hover:!text-red-400">
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="lg:sticky lg:top-28 h-fit space-y-4">
            <div className="glass rounded-2xl p-6 space-y-5">
              <h3 className="font-bold text-lg">Order Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">Subtotal ({cartState.itemCount})</span>
                  <span className="font-medium">{formatPrice(cartState.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Shipping</span>
                  <span className={`font-medium ${cartState.shippingCost === 0 ? 'text-green-400' : ''}`}>
                    {cartState.shippingCost === 0 ? 'Free' : formatPrice(cartState.shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Estimated Tax</span>
                  <span className="font-medium">{formatPrice(cartState.tax)}</span>
                </div>

                {cartState.discount > 0 && (
                  <div className="flex justify-between text-pink-400">
                    <span>Discount</span>
                    <span>-{formatPrice(cartState.discount)}</span>
                  </div>
                )}

                <div className="h-px bg-white/5" />

                <div className="flex justify-between text-base">
                  <span className="font-bold">Total</span>
                  <span className="font-black text-zeneio-accent">{formatPrice(cartState.total)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="flex gap-2">
                <input type="text" placeholder="Promo code" className="input-field rounded-xl text-sm py-2.5" />
                <button className="px-4 glass rounded-xl text-sm font-semibold text-white/70 hover:text-white transition-colors whitespace-nowrap">
                  Apply
                </button>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" className="btn-accent w-full justify-center py-4 text-base">
                Proceed to Checkout <ChevronRight size={16} />
              </Link>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-white/25">
                <span className="flex items-center gap-1"><ShieldCheck size={12} /> Secure SSL</span>
                <span className="flex items-center gap-1"><Truck size={12} /> Discreet Ship</span>
              </div>
            </div>

            {/* Free Shipping Progress */}
            {cartState.subtotal < 99 && (
              <div className="glass rounded-2xl p-5 text-center">
                <p className="text-sm text-white/60 mb-2">
                  Add <strong className="text-zeneio-accent">{formatPrice(99 - cartState.subtotal)}</strong> more for free shipping!
                </p>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-zeneio-accent to-zeneio-purple rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((cartState.subtotal / 99) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-white/30 mt-2">{formatPrice(cartState.subtotal)} of $99</p>
              </div>
            )}

            {/* Payment Methods */}
            <div className="text-center text-xs text-white/20 space-y-2">
              <p>We Accept</p>
              <div className="flex items-center justify-center gap-2 text-lg opacity-40">
                💳 🏦 🔒 💰
              </div>
            </div>
          </aside>
        </div>
      </div>

    </div>
  );
}
