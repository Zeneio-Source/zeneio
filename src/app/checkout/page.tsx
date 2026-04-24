'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Shield, Lock, Truck, Award, Check, ChevronRight,
  CreditCard, Package, ArrowLeft, AlertCircle, Loader2, Zap
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useSearchParams } from 'next/navigation';

export default function CheckoutPage() {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [paddleReady, setPaddleReady] = useState(false);
  const [paddleConfigured, setPaddleConfigured] = useState(false);
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  // Free shipping threshold
  const subtotal = getTotalPrice();
  const shipping = subtotal >= 99 ? 0 : 9.99;
  const tax = subtotal * 0; // Tax calculated at payment
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Initialize Paddle.js
  useEffect(() => {
    const initPaddle = async () => {
      try {
        const res = await fetch('/api/paddle/initialize', { method: 'POST' });
        const data = await res.json();

        if (!data.configured) {
          setPaddleConfigured(false);
          return;
        }

        // Dynamically load Paddle JS
        const paddleScript = document.createElement('script');
        paddleScript.src = data.env === 'live'
          ? 'https://cdn.paddle.com/paddle/v2/paddle.js'
          : 'https://cdn.paddle.com/paddle/v2/sandbox/paddle.js';
        paddleScript.async = true;
        paddleScript.onload = () => {
          (window as any).Paddle.Environment.set(data.env === 'live' ? 'live' : 'sandbox');
          (window as any).Paddle.Initialize({ token: data.token, complete: () => {
            setPaddleReady(true);
            setPaddleConfigured(true);
          }});
        };
        document.body.appendChild(paddleScript);
        setPaddleConfigured(true);
      } catch (err) {
        console.error('Paddle init error:', err);
        setPaddleConfigured(false);
      }
    };
    initPaddle();
  }, []);

  const handlePlaceOrder = async () => {
    if (!ageConfirmed) return;
    setIsCreatingCheckout(true);
    setCheckoutError('');

    try {
      const res = await fetch('/api/paddle/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            id: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`.trim(),
          shippingAddress: formData.address,
          shippingCity: formData.city,
          shippingCountry: formData.country,
          shippingZip: formData.zip,
        }),
      });

      const data = await res.json();

      if (data.mode === 'demo') {
        // Demo mode — no real Paddle credentials configured
        clearCart();
        window.location.href = '/order-success?demo=true';
        return;
      }

      if (data.checkoutUrl) {
        // Open Paddle hosted checkout
        window.location.href = data.checkoutUrl;
        return;
      }

      // Fallback: use Paddle overlay checkout with token
      if ((window as any).Paddle && data.checkoutToken) {
        (window as any).Paddle.Checkout.open({
          token: data.checkoutToken,
          settings: {
            displayMode: 'overlay',
            theme: 'dark',
            locale: 'en',
          },
        });
        // Cart will be cleared when webhook confirms payment
      } else {
        setCheckoutError('Unable to open payment. Please try again.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setCheckoutError('Something went wrong. Please try again.');
    } finally {
      setIsCreatingCheckout(false);
    }
  };

  if (getTotalItems() === 0) {
    return (
      <div className="min-h-screen bg-zeneio-black flex items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <Package size={56} className="mx-auto text-white/15" />
          <h1 className="text-2xl font-bold text-white">Your Cart is Empty</h1>
          <p className="text-white/40 max-w-sm mx-auto">Looks like you haven&apos;t added anything to your cart yet.</p>
          <Link href="/products" className="btn-zeneio">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zeneio-black">
      {/* Page Header */}
      <div className="page-header !pt-28">
        <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-zeneio-accent transition-colors mb-4">
          <ArrowLeft size={14} /> Back to Cart
        </Link>
        <h1>Secure Checkout</h1>
        <p className="mt-2 text-white/35 flex items-center justify-center gap-2">
          <Lock size={13} className="text-emerald-400" />
          256-bit SSL Encrypted · PCI DSS Compliant · GDPR Ready
        </p>
      </div>

      <div className="section-container pb-20">
        <div className="grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-16">
          {/* Left: Form */}
          <div className="space-y-8">
            {/* Progress Steps */}
            <div className="flex items-center justify-between max-w-md mx-auto lg:mx-0">
              {[
                { num: 1, label: 'Information' },
                { num: 2, label: 'Shipping' },
                { num: 3, label: 'Payment' },
              ].map((s, i) => (
                <React.Fragment key={s.num}>
                  <button
                    onClick={() => setStep(s.num)}
                    className={`flex flex-col items-center gap-1.5 ${step >= s.num ? 'cursor-pointer' : ''}`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step > s.num
                        ? 'bg-emerald-500 text-black'
                        : step === s.num
                          ? 'bg-zeneio-accent text-black'
                          : 'bg-white/5 text-white/30'
                    }`}>
                      {step > s.num ? <Check size={14} /> : s.num}
                    </div>
                    <span className={`text-[11px] font-medium hidden sm:block ${
                      step === s.num ? 'text-white' : step > s.num ? 'text-emerald-400' : 'text-white/25'
                    }`}>
                      {s.label}
                    </span>
                  </button>
                  {i < 2 && <div className={`flex-1 h-px mx-3 ${step > s.num + 1 ? 'bg-emerald-500' : 'bg-white/10'} hidden sm:block`} />}
                </React.Fragment>
              ))}
            </div>

            {/* Step 1: Information */}
            {step <= 1 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-lg font-bold text-white">Contact Information</h2>
                
                <div>
                  <label className="input-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="input-field"
                  />
                  <p className="text-[11px] text-white/25 mt-1.5 flex items-center gap-1">
                    <Shield size={10} className="text-emerald-400/50" />
                    Your email is only for order updates. We never spam.
                  </p>
                </div>

                <h2 className="text-lg font-bold text-white pt-2">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="input-field" />
                  </div>
                  <div>
                    <label className="input-label">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="input-label">Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="input-field" placeholder="Street address" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="input-label">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="input-field" />
                  </div>
                  <div>
                    <label className="input-label">State / Province</label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="input-field" />
                  </div>
                  <div>
                    <label className="input-label">ZIP Code</label>
                    <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="input-label">Country</label>
                  <select name="country" value={formData.country} onChange={(e) => handleInputChange(e as any)} className="input-field bg-zeneio-gray">
                    <option value="" className="bg-zeneio-dark">Select country...</option>
                    <option value="US" className="bg-zeneio-dark">United States</option>
                    <option value="GB" className="bg-zeneio-dark">United Kingdom</option>
                    <option value="CA" className="bg-zeneio-dark">Canada</option>
                    <option value="AU" className="bg-zeneio-dark">Australia</option>
                    <option value="DE" className="bg-zeneio-dark">Germany</option>
                    <option value="FR" className="bg-zeneio-dark">France</option>
                    <option value="NL" className="bg-zeneio-dark">Netherlands</option>
                    <option value="JP" className="bg-zeneio-dark">Japan</option>
                    <option value="OTHER" className="bg-zeneio-dark">Other</option>
                  </select>
                </div>

                <button onClick={() => setStep(2)} className="btn-zeneio w-full mt-4">
                  Continue to Shipping <ChevronRight size={14} />
                </button>
              </div>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <button onClick={() => setStep(1)} className="text-sm text-white/40 hover:text-zeneio-accent transition-colors flex items-center gap-1 mb-2">
                  <ArrowLeft size={13} /> Back to Information
                </button>

                <h2 className="text-lg font-bold text-white">Shipping Method</h2>

                <div className="space-y-3">
                  <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                    true ? 'border-zeneio-accent bg-zeneio-accent/[0.04]' : 'border-white/8 hover:border-white/20'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Truck size={18} className="text-zeneio-accent" />
                        <div>
                          <p className="font-semibold text-sm text-white">Standard Shipping (Discreet)</p>
                          <p className="text-xs text-white/35">Plain unmarked package · 5-7 business days</p>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-white">
                        {shipping === 0 ? <span className="text-emerald-400">FREE</span> : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                  </label>

                  <label className={`block p-4 rounded-xl border border-white/8 cursor-pointer transition-all hover:border-white/20`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Zap size={18} className="text-purple-400" />
                        <div>
                          <p className="font-semibold text-sm text-white">Express Shipping (Discreet)</p>
                          <p className="text-xs text-white/35">Priority plain packaging · 2-3 business days</p>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-white">$19.99</span>
                    </div>
                  </label>
                </div>

                {/* Discreet shipping reminder */}
                <div className="rounded-xl p-4 bg-emerald-500/5 border border-emerald-500/10">
                  <div className="flex items-start gap-3">
                    <Shield size={17} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-1.5">
                      <p className="text-xs font-bold text-emerald-400">100% Discreet Delivery Guaranteed 🔒</p>
                      <ul className="space-y-1">
                        {['No ZENEIO branding on the outside', 'Neutral return address: "ZNE Logistics"', 'Plain brown box, no product descriptions', 'Only you know what\'s inside'].map(item => (
                          <li key={item} className="flex items-start gap-2 text-[11px] text-white/45">
                            <Check size={10} className="text-emerald-400/60 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <button onClick={() => setStep(3)} className="btn-zeneio w-full mt-4">
                  Continue to Payment <ChevronRight size={14} />
                </button>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <button onClick={() => setStep(2)} className="text-sm text-white/40 hover:text-zeneio-accent transition-colors flex items-center gap-1 mb-2">
                  <ArrowLeft size={13} /> Back to Shipping
                </button>

                <h2 className="text-lg font-bold text-white">Payment</h2>

                {/* Paddle Payment Panel */}
                <div className="rounded-2xl overflow-hidden border border-zeneio-accent/20">
                  {/* Paddle Branding Header */}
                  <div className="bg-gradient-to-r from-zeneio-accent/10 to-purple-500/5 px-6 py-4 border-b border-zeneio-accent/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zeneio-accent/10 border border-zeneio-accent/20 flex items-center justify-center">
                        <Lock size={14} className="text-zeneio-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Secure Payment via Paddle</p>
                        <p className="text-[11px] text-white/35">Powered by Paddle — PCI DSS Level 1</p>
                      </div>
                    </div>
                    {!paddleConfigured ? (
                      <span className="text-[10px] font-mono text-amber-400/70 bg-amber-400/10 px-2 py-1 rounded-md">DEMO MODE</span>
                    ) : paddleReady ? (
                      <span className="text-[10px] font-mono text-green-400/70 bg-green-400/10 px-2 py-1 rounded-md flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> READY
                      </span>
                    ) : (
                      <Loader2 size={12} className="text-white/30 animate-spin" />
                    )}
                  </div>

                  <div className="p-6 space-y-5 bg-[#0a0a0a]/50">
                    {/* Payment Methods Visual */}
                    <div className="flex items-center justify-center gap-4 py-3 border-y border-white/5">
                      {['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay'].map(method => (
                        <span key={method} className="text-[10px] font-bold tracking-wider text-white/25 px-2 py-1 rounded bg-white/[0.03] border border-white/5">
                          {method}
                        </span>
                      ))}
                    </div>

                    {/* Paddle 合规说明 */}
                    <div className="rounded-xl p-4 bg-white/[0.02] border border-white/8 text-xs text-white/35 leading-relaxed space-y-2">
                      <p className="font-bold text-white/50 text-[11px] uppercase tracking-wider">Paddle Payment Information</p>
                      <p>Your payment is processed securely by <strong className="text-white/50">Paddle</strong>, our authorized payment service provider. ZENEIO never sees or stores your credit card details.</p>
                      <p>Charges appear on your statement as <strong className="text-white/50">"ZNE LLC"</strong> — completely discreet. Paddle handles all VAT/GST collection for international orders.</p>
                      <Link href="/paddle-terms" className="inline-block text-zeneio-accent hover:underline mt-1">
                        Learn how Paddle processes your payment →
                      </Link>
                    </div>

                    {/* Age Confirmation */}
                    <label className="flex items-start gap-3 p-4 rounded-xl bg-white/3 border border-white/10 cursor-pointer hover:bg-white/5 transition-colors">
                      <input
                        type="checkbox"
                        checked={ageConfirmed}
                        onChange={(e) => setAgeConfirmed(e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-zeneio-accent flex-shrink-0 cursor-pointer"
                      />
                      <span className="text-xs text-white/50 leading-relaxed">
                        I confirm that I am at least <strong className="text-white/70">18 years of age</strong> and legally permitted to purchase these products. I agree to the{' '}
                        <Link href="/terms" className="underline hover:text-white/60">Terms of Service</Link>.
                      </span>
                    </label>

                    {/* Error */}
                    {checkoutError && (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                        <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                        <p className="text-xs text-red-400">{checkoutError}</p>
                      </div>
                    )}

                    {/* Place Order Button */}
                    <button
                      onClick={handlePlaceOrder}
                      disabled={!ageConfirmed || isCreatingCheckout}
                      className="btn-zeneio w-full py-4 text-base flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isCreatingCheckout ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Connecting to Paddle...
                        </>
                      ) : (
                        <>
                          <Lock size={16} />
                          Pay ${total.toFixed(2)} Securely
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-4 text-[10px] text-white/20">
                      <span className="flex items-center gap-1"><Lock size={10} /> 256-bit SSL</span>
                      <span>•</span>
                      <span>PCI DSS Level 1</span>
                      <span>•</span>
                      <span>Discreet Billing</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-white/20 text-center">
                  By placing this order, you agree to our{' '}
                  <Link href="/terms" className="underline hover:text-white/50">Terms of Service</Link> and{' '}
                  <Link href="/privacy" className="underline hover:text-white/50">Privacy Policy</Link>.
                </p>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="glass rounded-2xl p-6 space-y-5">
              <h3 className="font-bold text-white flex items-center justify-between">
                Order Summary
                <span className="text-xs font-normal text-white/30">{getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''}</span>
              </h3>

              {/* Items */}
              <div className="divide-y divide-white/5 max-h-[300px] overflow-y-auto no-scrollbar">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="py-3 flex gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-zeneio-gray shrink-0">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10">✦</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{product.name}</p>
                      <p className="text-xs text-white/30">Qty: {quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-white/70">${(product.price * quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-3 border-t border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/45">Subtotal</span>
                  <span className="text-white/70">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/45">Shipping</span>
                  <span className={shipping === 0 ? 'text-emerald-400' : 'text-white/70'}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {subtotal < 99 && (
                  <div className="rounded-lg p-2 bg-zeneio-accent/5 text-[11px] text-zeneio-accent text-center">
                    Add ${(99 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}
                <div className="flex justify-between text-base font-bold pt-2 border-t border-white/5">
                  <span className="text-white">Total</span>
                  <span className="text-zeneio-accent">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Signals in Sidebar — NEW! */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-white/25 text-center">Safe & Secure</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { icon: Lock, label: 'SSL Secure' },
                    { icon: Shield, label: 'Discreet' },
                    { icon: Award, label: 'Warranty' },
                  ].map(ts => (
                    <div key={ts.label} className="p-2 rounded-lg bg-white/[0.02]">
                      <ts.icon size={14} className="mx-auto mb-1 text-zeneio-accent/60" />
                      <p className="text-[9px] text-white/35">{ts.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Guarantee Box — NEW! */}
            <div className="glass rounded-2xl p-5 mt-4 border-emerald-500/10">
              <div className="flex items-start gap-3">
                <Award size={20} className="text-emerald-400 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-emerald-400 mb-1">30-Day Satisfaction Guarantee</p>
                  <p className="text-[11px] text-white/35 leading-relaxed">
                    Not happy? Return within 30 days for a full refund. No questions asked.
                  </p>
                </div>
              </div>
            </div>

            {/* Help Link */}
            <p className="text-center text-[11px] text-white/25 mt-4">
              Need help? <Link href="/contact" className="underline hover:text-white/50">Contact us</Link> or check our <Link href="/faq" className="underline hover:text-white/50">FAQ</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
