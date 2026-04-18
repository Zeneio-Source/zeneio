'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle2, Package, Mail, Truck, ArrowRight, Home } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><div className="section-container pt-28 pb-24">
      <div className="max-w-lg mx-auto text-center animate-fade-up space-y-8">
        {/* Success Icon */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
            <CheckCircle2 size={48} className="text-green-400" />
          </div>
          {/* Pulse ring */}
          <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-green-400/30 animate-ping-slow" />
        </div>

        <div>
          <h1 className="text-heading-1 font-bold mb-2">Order Confirmed!</h1>
          <p className="text-white/40">Thank you for your purchase. Here&apos;s what happens next:</p>
        </div>

        {/* Order Number */}
        <div className="glass rounded-2xl p-5 inline-block">
          <p className="text-[11px] font-bold tracking-widest uppercase text-white/30 mb-1">Order Number</p>
          <p className="font-mono text-xl font-bold text-zeneio-accent">ZNE-20260419-{Math.floor(Math.random() * 9999).toString().padStart(4, '0')}</p>
        </div>

        {/* Timeline */}
        <div className="space-y-4 text-left max-w-sm mx-auto">{[
          { icon: CheckCircle2, label: 'Order Confirmed', desc: 'Your payment was processed successfully', done: true },
          { icon: Package, label: 'Preparing Order', desc: 'We\'re carefully packaging your items (discreetly!)', done: false, active: true },
          { icon: Truck, label: 'Shipping', desc: 'You\'ll receive a tracking number via email soon', done: false },
          { icon: CheckCircle2, label: 'Delivered', desc: 'Enjoy! Your package will arrive in plain box', done: false },
        ].map((step, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${step.done ? 'bg-green-500/15' : step.active ? 'bg-zeneio-accent/15' : 'bg-white/5'}`}>
              <step.icon size={16} className={step.done ? 'text-green-400' : step.active ? 'text-zeneio-accent' : 'text-white/25'} />
            </div>
            <div><p className={`text-sm font-semibold ${step.active ? 'text-zeneio-accent' : step.done ? 'text-white/80' : 'text-white/50'}`}>{step.label}</p><p className="text-xs text-white/30 mt-0.5">{step.desc}</p></div>
          </div>
        ))}</div>

        {/* Email Notice */}
        <div className="glass rounded-xl p-4 inline-flex items-start gap-3 text-left bg-blue-500/5 border-blue-500/10">
          <Mail size={18} className="text-blue-400/70 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-white/50 leading-relaxed">A confirmation email has been sent to your registered email address with full order details.</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link href="/account/orders" className="btn-outline w-full sm:w-auto justify-center"><Package size={16} /> Track Order</Link>
          <Link href="/products" className="btn-accent w-full sm:w-auto justify-center"><ArrowRight size={16} /> Continue Shopping</Link>
        </div>

        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors"><Home size={13} /> Back to Home</Link>
      </div>
    </div>

    <Footer /></div>
  );
}
