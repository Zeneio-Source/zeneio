import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function OrderSuccess() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-40 pb-32 px-6">
        <div className="max-w-lg mx-auto text-center">
          {/* Success Icon */}
          <div className="w-28 h-28 rounded-full bg-[#81D8D0]/10 border-2 border-[#81D8D0]/30 flex items-center justify-center mx-auto mb-10 animate-pulse">
            <svg className="w-14 h-14 text-[#81D8D8D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-4">
            Order Confirmed<span className="text-[#81D8D0]">!</span>
          </h1>
          
          <p className="text-white/40 text-base font-light leading-relaxed mb-4">
            Thank you for your purchase! Your order has been received and is being processed.
          </p>

          {/* Order details */}
          <div className="glass rounded-[40px] p-8 md:p-10 border border-white/5 space-y-6 my-12 text-left">
            <div className="flex justify-between items-center pb-6 border-b border-white/5">
              <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Order Number</span>
              <span className="text-sm font-mono text-[#81D8D0]">#ZL-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center pb-6 border-b border-white/5">
              <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Status</span>
              <span className="text-sm text-green-400 font-medium">● Processing</span>
            </div>
            <div className="flex justify-between items-center pb-6 border-b border-white/5">
              <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Shipping</span>
              <span className="text-sm text-white/60">Discreet packaging • 7-14 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Confirmation Email</span>
              <span className="text-sm text-white/60">Sent to your email ✓</span>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/products" className="btn-zeneio text-black px-16 py-5 inline-block w-full sm:w-auto">
              Continue Shopping
            </Link>
            <br className="hidden sm:block" />
            <Link href="/" className="inline-block px-8 py-5 text-[10px] uppercase font-black tracking-[0.3em] text-white/30 hover:text-white transition ml-0 sm:ml-6">
              Back to Home
            </Link>
          </div>

          {/* Info */}
          <div className="mt-16 glass rounded-2xl p-6 border border-white/5 text-left">
            <h3 className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-4">What Happens Next?</h3>
            <ul className="space-y-3 text-sm text-white/40">
              <li className="flex gap-3"><span className="text-[#81D8D0]">①</span> You'll receive a shipping confirmation email within 24 hours</li>
              <li className="flex gap-3"><span className="text-[#81D8D0]">②</span> Your order ships in discreet unmarked packaging</li>
              <li className="flex gap-3"><span className="text-[#81D8D0]">③</span> Track your package with the provided tracking number</li>
              <li className="flex gap-3"><span className="text-[#81D8D0]">④</span> Questions? Contact us at support@zeneio.com</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
