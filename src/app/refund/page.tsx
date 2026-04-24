import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RefreshCw, Package, AlertCircle, CheckCircle } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-zeneio-black">
      <Navbar />
      <div className="section-container py-16 lg:py-24 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <RefreshCw size={20} className="text-zeneio-accent" />
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-zeneio-accent">Policy</p>
          </div>
          <h1 className="text-heading-1 font-black mb-4">Refund & Return Policy</h1>
          <p className="text-white/40 text-sm">Last updated: April 25, 2026</p>
        </div>

        <div className="space-y-8 text-white/60 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Overview</h2>
            <p className="text-sm">We want you to be completely satisfied with your ZENEIO purchase. Our refund and return policy is designed to be fair while maintaining the hygiene standards our customers expect.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle size={18} className="text-green-400" /> Eligible for Return
            </h2>
            <ul className="text-sm space-y-2 mt-3">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> Unopened, unused items in original packaging within <strong className="text-white/80">14 days</strong> of delivery</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> Damaged or defective products (with photo evidence) within <strong className="text-white/80">14 days</strong> of delivery</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> Incorrect item received (with photo evidence)</li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> Subscription cancellations before next billing cycle</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <AlertCircle size={18} className="text-zeneio-accent" /> Not Eligible for Return
            </h2>
            <ul className="text-sm space-y-2 mt-3">
              <li className="flex items-start gap-2"><span className="text-zeneio-accent mt-0.5">✗</span> Opened or used intimate products — <strong className="text-white/80">for hygiene and safety reasons</strong></li>
              <li className="flex items-start gap-2"><span className="text-zeneio-accent mt-0.5">✗</span> Items returned after 14 days from delivery</li>
              <li className="flex items-start gap-2"><span className="text-zeneio-accent mt-0.5">✗</span> Items damaged by misuse, improper care, or unauthorized modifications</li>
              <li className="flex items-start gap-2"><span className="text-zeneio-accent mt-0.5">✗</span> Free or promotional items</li>
              <li className="flex items-start gap-2"><span className="text-zeneio-accent mt-0.5">✗</span> Shipping fees (non-refundable unless the error was on our end)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">How to Request a Return</h2>
            <ol className="text-sm space-y-3 mt-3">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zeneio-accent/20 text-zeneio-accent text-xs font-bold flex items-center justify-center mt-0.5">1</span>
                <span>Email us at <a href="mailto:returns@zeneio.com" className="text-zeneio-accent hover:underline">returns@zeneio.com</a> with your order number and reason for return.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zeneio-accent/20 text-zeneio-accent text-xs font-bold flex items-center justify-center mt-0.5">2</span>
                <span>If approved, we will email you a prepaid return shipping label for unopened items or a replacement for defective items.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zeneio-accent/20 text-zeneio-accent text-xs font-bold flex items-center justify-center mt-0.5">3</span>
                <span>Refunds are processed within 5-7 business days after we receive and inspect the returned item.</span>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Refund Timeline</h2>
            <div className="glass rounded-xl p-5 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-white/60">Refund method</span><span className="text-white/80">Original payment method</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/60">Processing time</span><span className="text-white/80">5-7 business days</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/60">Bank/credit card processing</span><span className="text-white/80">Additional 5-10 business days</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/60">Total estimated time</span><span className="text-green-400 font-semibold">10-17 business days</span></div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Defective or Damaged Products</h2>
            <p className="text-sm mb-3">If your product arrives damaged or does not function as described, we will ship a replacement at no cost to you. Please provide photos of the damaged item and packaging within 14 days of delivery.</p>
            <p className="text-sm">If a replacement is not available, we will issue a full refund including original shipping costs.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Statutory Rights</h2>
            <p className="text-sm">This policy does not affect your statutory rights under consumer protection laws. If you are a consumer in the European Union or UK, you have the right to cancel most orders within 14 days under the Consumer Contracts Regulations. Contact us at <a href="mailto:eu@zeneio.com" className="text-zeneio-accent hover:underline">eu@zeneio.com</a> for EU/UK-specific support.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Contact</h2>
            <p className="text-sm">Returns Department: <a href="mailto:returns@zeneio.com" className="text-zeneio-accent hover:underline">returns@zeneio.com</a><br />General inquiries: <a href="mailto:hello@zeneio.com" className="text-zeneio-accent hover:underline">hello@zeneio.com</a></p>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
}
