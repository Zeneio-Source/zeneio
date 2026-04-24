import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CreditCard, Shield, Globe, Lock, FileText } from 'lucide-react';

export default function PaddleTermsPage() {
  return (
    <div className="min-h-screen bg-zeneio-black">
      <Navbar />
      <div className="section-container py-16 lg:py-24 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CreditCard size={20} className="text-zeneio-accent" />
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-zeneio-accent">Payment Information</p>
          </div>
          <h1 className="text-heading-1 font-black mb-4">How We Process Payments</h1>
          <p className="text-white/40 text-sm">Last updated: April 25, 2026</p>
        </div>

        <div className="space-y-8 text-white/60 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <CreditCard size={18} className="text-zeneio-accent" />
              Our Payment Processor: Paddle
            </h2>
            <p className="text-sm mb-3">
              ZENEIO uses <strong className="text-white/80">Paddle</strong> as our authorized payment service provider. Paddle is a trusted payment processor that handles all aspects of the payment process on our behalf, including collecting payment details, processing transactions, and managing refunds.
            </p>
            <p className="text-sm">
              We chose Paddle because they specialize in selling digital and physical goods globally, handling all the complex international compliance requirements — including VAT, GST, and sales tax collection in over 200 countries — so we can focus on making great products.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Shield size={18} className="text-zeneio-accent" />
              Why Your Payment is Safe
            </h2>
            <ul className="text-sm space-y-3">
              {[
                { title: 'PCI DSS Level 1 Certified', desc: 'Paddle holds the highest level of payment card industry security certification, meaning your card details never touch our servers.' },
                { title: 'End-to-End Encryption', desc: 'All payment data is encrypted from your browser to Paddle\'s servers using TLS 1.3 encryption.' },
                { title: '3D Secure Support', desc: 'Paddle supports 3D Secure (3DS) authentication, adding an extra layer of protection against fraud for eligible transactions.' },
                { title: 'Fraud Detection', desc: 'Paddle\'s ML-powered fraud detection system monitors every transaction in real-time to block suspicious activity.' },
              ].map(item => (
                <li key={item.title} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-zeneio-accent mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-white/70 font-semibold">{item.title}</strong>
                    <span className="text-white/40"> — {item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Lock size={18} className="text-zeneio-accent" />
              Discreet Billing
            </h2>
            <p className="text-sm mb-3">
              To protect your privacy, all charges on your credit card or bank statement appear as <strong className="text-white/80">"ZNE LLC"</strong> — not ZENEIO or any reference to the products you purchased.
            </p>
            <p className="text-sm">
              This is a standard practice for intimate wellness retailers and ensures complete discretion on your bank statement. If you have any questions about a charge, contact your bank first — they will recognize Paddle as our payment processor.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Globe size={18} className="text-zeneio-accent" />
              International Orders & Taxes
            </h2>
            <p className="text-sm mb-3">
              For orders outside the United States, Paddle automatically calculates and collects the applicable <strong className="text-white/80">VAT, GST, or sales tax</strong> based on your country of residence, in compliance with local tax laws.
            </p>
            <p className="text-sm">
              This means the price you see at checkout is the final price — no hidden fees or surprise charges at delivery. Paddle remits these taxes to the relevant tax authorities on our behalf.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <FileText size={18} className="text-zeneio-accent" />
              Refunds & Chargebacks
            </h2>
            <p className="text-sm mb-3">
              If you need a refund, contact us at <a href="mailto:returns@zeneio.com" className="text-zeneio-accent hover:underline">returns@zeneio.com</a>. Refunds are processed back to the original payment method within 5-10 business days, depending on your bank.
            </p>
            <p className="text-sm mb-3">
              <strong className="text-white/80">Do not dispute the charge with your bank or credit card company</strong> before contacting us first — most issues can be resolved directly and more quickly through our support team. Initiating a chargeback without prior contact may result in your account being suspended.
            </p>
            <p className="text-sm">
              For full refund policy details, see our <a href="/refund" className="text-zeneio-accent hover:underline">Refund Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Accepted Payment Methods</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'Visa', 'Mastercard', 'American Express',
                'Discover', 'PayPal', 'Apple Pay',
                'Google Pay', 'Crypto (USDT)', 'Bank Transfer (SEPA)',
              ].map(method => (
                <div key={method} className="glass rounded-xl p-3 text-center">
                  <p className="text-xs font-semibold text-white/60">{method}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Data & Privacy</h2>
            <p className="text-sm mb-3">
              Paddle collects and processes your payment information in accordance with their <a href="https://paddle.com/legal/#privacy" target="_blank" rel="noopener noreferrer" className="text-zeneio-accent hover:underline">Privacy Policy</a>. ZENEIO receives only limited transaction data (order ID, amount, customer email) necessary to fulfill your order.
            </p>
            <p className="text-sm">
              We do not receive, store, or have access to your credit card number, expiry date, or CVV at any point in the transaction process.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Contact</h2>
            <p className="text-sm">
              For payment-related questions, contact us at <a href="mailto:billing@zeneio.com" className="text-zeneio-accent hover:underline">billing@zeneio.com</a>.
            </p>
            <p className="text-sm mt-2">
              Paddle's official support: <a href="https://paddle.com/support" target="_blank" rel="noopener noreferrer" className="text-zeneio-accent hover:underline">paddle.com/support</a>
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
}
