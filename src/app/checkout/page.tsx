'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/types';
import {
  ChevronRight, ChevronLeft, Lock, Truck, ShieldCheck,
  CreditCard, CheckCircle2, Package, ArrowLeft
} from 'lucide-react';

type CheckoutStep = 1 | 2 | 3;

export default function CheckoutPage() {
  const router = useRouter();
  const { state: cartState } = useCart();
  const [step, setStep] = useState<CheckoutStep>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '', lastName: '',
    address1: '', address2: '',
    city: '', state: '', postalCode: '', country: 'United States',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [sameAsShipping, setSameAsShipping] = useState(true);

  // Redirect if cart empty
  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-zeneio-black">
        <Navbar />
        <div className="section-container pt-32 pb-20 text-center">
          <Package size={64} className="mx-auto text-white/10 mb-6" />
          <h1 className="text-heading-2 font-bold mb-3">Your Cart is Empty</h1>
          <p className="text-white/40 mb-8">Add some products before checking out.</p>
          <Link href="/products" className="btn-accent btn-lg">Shop Now</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const steps: { num: CheckoutStep; label: string; icon: typeof Truck }[] = [
    { num: 1, label: 'Contact', icon: Package },
    { num: 2, label: 'Shipping', icon: Truck },
    { num: 3, label: 'Payment', icon: CreditCard },
  ];

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push('/order-success');
  };

  return (
    <div className="min-h-screen bg-zeneio-black">
      <Navbar />

      {/* Secure Header */}
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/5 border-b border-green-500/10 py-2.5">
        <div className="section-container flex items-center justify-center gap-2 text-xs font-semibold text-green-400/80">
          <Lock size={14} /> 256-Bit SSL Encrypted • Discreet Billing • Secure Payment
        </div>
      </div>

      {/* Page Header */}
      <div className="page-header !pt-24 lg:!pt-28 !pb-6">
        <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors mb-4">
          <ArrowLeft size={14} /> Back to Cart
        </Link>
        <h1>Checkout</h1>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-0 mt-8 max-w-md mx-auto w-full">
          {steps.map((s, i) => (
            <React.Fragment key={s.num}>
              <button
                onClick={() => s.num <= step && setStep(s.num)}
                className={`flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 group ${
                  s.num === step ? '' : 'cursor-pointer'
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step > s.num
                    ? 'bg-green-500 text-black'
                    : step === s.num
                      ? 'bg-zeneio-accent text-black'
                      : 'bg-white/5 text-white/30'
                }`}>
                  {step > s.num ? <CheckCircle2 size={16} /> : s.num}
                </div>
                <span className={`text-[11px] sm:text-xs font-medium hidden sm:inline ${
                  step >= s.num ? 'text-white' : 'text-white/25'
                }`}>
                  {s.label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-2 sm:mx-4 ${step > s.num ? 'bg-green-500' : 'bg-white/10'} hidden sm:block`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="section-container pb-24">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Main Content */}
          <main className="space-y-6">
            {/* Step 1: Contact Information */}
            {step === 1 && (
              <div className="glass rounded-2xl p-6 sm:p-8 animate-fade-in space-y-6">
                <h2 className="text-lg font-bold">Contact Information</h2>
                <p className="text-sm text-white/40">We&apos;ll use this for your order confirmation and shipping updates.</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Email Address *</label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">Phone Number *</label>
                    <input
                      type="tel"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 (555) 000-0000"
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button onClick={() => setStep(2)} className="btn-accent px-8">
                    Continue to Shipping <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Shipping Address */}
            {step === 2 && (
              <div className="glass rounded-2xl p-6 sm:p-8 animate-fade-in space-y-6">
                <h2 className="text-lg font-bold">Shipping Address</h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">First Name *</label>
                    <input value={shippingAddress.firstName}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="John" className="input-field" required />
                  </div>
                  <div>
                    <label className="input-label">Last Name *</label>
                    <input value={shippingAddress.lastName}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Doe" className="input-field" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="input-label">Street Address *</label>
                    <input value={shippingAddress.address1}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, address1: e.target.value }))}
                      placeholder="123 Main Street, Apt 4B" className="input-field" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="input-label">Apartment / Suite (optional)</label>
                    <input value={shippingAddress.address2}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, address2: e.target.value }))}
                      placeholder="Apt, suite, unit, etc." className="input-field" />
                  </div>
                  <div>
                    <label className="input-label">City *</label>
                    <input value={shippingAddress.city}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="New York" className="input-field" required />
                  </div>
                  <div>
                    <label className="input-label">State / Province *</label>
                    <input value={shippingAddress.state}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="NY" className="input-field" required />
                  </div>
                  <div>
                    <label className="input-label">ZIP / Postal Code *</label>
                    <input value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                      placeholder="10001" className="input-field" required />
                  </div>
                  <div>
                    <label className="input-label">Country *</label>
                    <select
                      value={shippingAddress.country}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, country: e.target.value }))}
                      className="input-field cursor-pointer"
                    >
                      <option value="United States">🇺🇸 United States</option>
                      <option value="Canada">🇨🇦 Canada</option>
                      <option value="United Kingdom">🇬🇧 United Kingdom</option>
                      <option value="Australia">🇦🇺 Australia</option>
                      <option value="Germany">🇩🇪 Germany</option>
                      <option value="France">🇫🇷 France</option>
                      <option value="Japan">🇯🇵 Japan</option>
                    </select>
                  </div>
                </div>

                <div className="glass rounded-xl p-4 flex items-start gap-3 mt-4">
                  <ShieldCheck size={20} className="text-zeneio-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/50 leading-relaxed">
                    <strong>Discreet Packaging:</strong> All orders ship in plain, unmarked boxes.
                    The return address shows &quot;ZNE Logistics&quot; — no product names or branding visible.
                  </p>
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={() => setStep(1)} className="btn-outline">
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button onClick={() => setStep(3)} className="btn-accent px-8">
                    Continue to Payment <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                {/* Payment Method Selection */}
                <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
                  <h2 className="text-lg font-bold">Payment Method</h2>

                  <div className="space-y-3">
                    {[
                      { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex, Discover', icon: '💳' },
                      { id: 'paypal', label: 'PayPal', desc: 'Fast checkout via PayPal account', icon: '🅿️' },
                      { id: 'crypto', label: 'Cryptocurrency', desc: 'BTC, ETH, USDT accepted', icon: '₿' },
                    ].map(method => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                          paymentMethod === method.id
                            ? 'border-zeneio-accent bg-zeneio-accent/5'
                            : 'border-white/5 hover:border-white/15 hover:bg-white/[0.02]'
                        }`}
                      >
                        <span className="text-2xl">{method.icon}</span>
                        <div className="text-left">
                          <p className={`font-semibold text-sm ${paymentMethod === method.id ? 'text-white' : 'text-white/80'}`}>
                            {method.label}
                          </p>
                          <p className="text-xs text-white/35">{method.desc}</p>
                        </div>
                        <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === method.id ? 'border-zeneio-accent' : 'border-white/15'
                        }`}>
                          {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-zeneio-accent" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Card Details Form (shown when card selected) */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <div>
                        <label className="input-label">Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456" className="input-field font-mono tracking-wider" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="input-label">Expiry Date</label>
                          <input type="text" placeholder="MM / YY" className="input-field" maxLength={7} />
                        </div>
                        <div>
                          <label className="input-label">CVV</label>
                          <input type="text" placeholder="•••" className="input-field" maxLength={4} />
                        </div>
                      </div>
                      <div>
                        <label className="input-label">Name on Card</label>
                        <input type="text" placeholder="John Doe" className="input-field" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Review Summary */}
                <div className="glass rounded-2xl p-6 space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-white/40">Order Summary</h3>

                  {cartState.items.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img src={item.product.images[0]} alt={item.product.name}
                        className="w-14 h-14 rounded-lg object-cover bg-zeneio-gray"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.jpg'; }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-white/30">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  ))}

                  <div className="h-px bg-white/5" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-white/50">Subtotal</span><span>{formatPrice(cartState.subtotal)}</span></div>
                    <div className="flex justify-between"><span className="text-white/50">Shipping</span><span>{cartState.shippingCost === 0 ? 'Free' : formatPrice(cartState.shippingCost)}</span></div>
                    <div className="flex justify-between"><span className="text-white/50">Tax</span><span>{formatPrice(cartState.tax)}</span></div>
                    <div className="flex justify-between text-base font-bold pt-2 border-t border-white/5 mt-2">
                      <span>Total</span>
                      <span className="text-zeneio-accent">{formatPrice(cartState.total)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={() => setStep(2)} className="btn-outline">
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button onClick={handlePlaceOrder} disabled={isProcessing}
                    className="btn-accent px-12 py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" className="opacity-25"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75"/></svg>
                        Processing...
                      </span>
                    ) : (
                      <>Lock icon Place Order — {formatPrice(cartState.total)}</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </main>

          {/* Sidebar - Order Summary (sticky on desktop) */}
          <aside className="lg:sticky lg:top-28 h-fit space-y-4">
            <div className="glass rounded-2xl p-6 space-y-5">
              <h3 className="font-bold">Order Summary</h3>

              {/* Mini Cart Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto no-scrollbar pr-1">
                {cartState.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zeneio-gray flex-shrink-0">
                      <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-zeneio-accent text-black text-[10px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-white/30">{formatPrice(item.product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 text-sm border-t border-white/5 pt-4">
                <div className="flex justify-between"><span className="text-white/50">Subtotal</span><span>{formatPrice(cartState.subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Shipping</span>
                  <span className={cartState.shippingCost === 0 ? 'text-green-400' : ''}>{cartState.shippingCost === 0 ? 'FREE' : formatPrice(cartState.shippingCost)}</span>
                </div>
                <div className="flex justify-between"><span className="text-white/50">Tax (est.)</span><span>{formatPrice(cartState.tax)}</span></div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-zeneio-accent">{formatPrice(cartState.total)}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-xl p-3 text-center">
                <Lock size={18} className="mx-auto text-zeneio-accent/60 mb-1.5" />
                <p className="text-[11px] text-white/40 leading-tight">Secure<br/>256-bit SSL</p>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <ShieldCheck size={18} className="mx-auto text-zeneio-accent/60 mb-1.5" />
                <p className="text-[11px] text-white/40 leading-tight">Discreet<br/>Packaging</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
