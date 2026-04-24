import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Scale, AlertTriangle, Package, CreditCard } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-zeneio-black">
      <Navbar />
      <div className="section-container py-16 lg:py-24 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Scale size={20} className="text-zeneio-accent" />
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-zeneio-accent">Legal</p>
          </div>
          <h1 className="text-heading-1 font-black mb-4">Terms of Service</h1>
          <p className="text-white/40 text-sm">Last updated: April 25, 2026</p>
        </div>

        <div className="space-y-8 text-white/60 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm">By accessing or using the ZENEIO website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you must not use our website or services.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. Age Requirement & Eligibility</h2>
            <p className="text-sm mb-3">You must be at least <strong className="text-white/80">18 years of age</strong> (or the age of legal majority in your jurisdiction) to access or purchase from ZENEIO. By placing an order, you represent and warrant that you are at least 18 years old.</p>
            <div className="glass rounded-xl p-4 border border-zeneio-accent/20">
              <p className="text-xs text-zeneio-accent font-semibold">⚠️ Age Verification Notice</p>
              <p className="text-xs text-white/40 mt-1">Our products are intended for adults only. We reserve the right to verify age at any time and to refuse service to individuals who cannot verify their age of majority.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. Products & Intended Use</h2>
            <p className="text-sm mb-3">All ZENEIO products are designed for personal use by adults. They are not medical devices and are not intended to diagnose, treat, cure, or prevent any disease or medical condition.</p>
            <p className="text-sm mb-3">Do not use any ZENEIO product if you have a known allergy to silicone, ABS plastic, or any materials listed on the product page. Discontinue use immediately if you experience discomfort, pain, or an allergic reaction, and consult a medical professional.</p>
            <p className="text-sm">If you have a medical condition or are pregnant, consult your physician before using any ZENEIO product.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Orders & Payment</h2>
            <p className="text-sm mb-3">All prices are listed in USD unless otherwise specified. We reserve the right to refuse or cancel any order for any reason, including but not limited to: product availability, pricing errors, or suspected fraud.</p>
            <p className="text-sm mb-3">Payment is processed securely through Paddle. Your billing statement will show the charge as <strong className="text-white/80">"ZNE LLC"</strong>.</p>
            <p className="text-sm">We reserve the right to cancel orders if we are unable to verify shipping or billing information within 48 hours.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. Shipping & Delivery</h2>
            <p className="text-sm mb-3">Shipping times are estimates only and do not include processing time (1-2 business days). We are not responsible for delays caused by carriers, customs, or force majeure events.</p>
            <p className="text-sm mb-3">All shipments are sent in <strong className="text-white/80">plain, unmarked packaging</strong> with no external indication of the product contents. We ship to most countries worldwide; however, we are not responsible for orders seized or confiscated by local customs authorities.</p>
            <p className="text-sm">Customers are solely responsible for ensuring that the products they order are legal for import and use in their country of residence.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">6. Returns & Exchanges</h2>
            <p className="text-sm mb-3">Due to the intimate nature of our products, we <strong className="text-white/80">cannot accept returns or exchanges</strong> on opened or used items for hygiene and safety reasons. This does not affect your statutory rights.</p>
            <p className="text-sm mb-3">If you receive a <strong className="text-white/80">defective or damaged product</strong>, contact us within 14 days of delivery with photos, and we will ship a replacement at no cost.</p>
            <p className="text-sm">Unopened items may be returned within 14 days of delivery in original packaging for a full refund (excluding shipping costs). See our <a href="/refund" className="text-zeneio-accent hover:underline">Refund Policy</a> for full details.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">7. Intellectual Property</h2>
            <p className="text-sm">All content on this website, including text, graphics, logos, images, and software, is the property of ZENEIO and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">8. Disclaimer of Warranties</h2>
            <p className="text-sm">Our products are provided "as is" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose. We do not warrant that our products will meet your specific requirements or expectations.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">9. Limitation of Liability</h2>
            <p className="text-sm">To the maximum extent permitted by law, ZNE LLC and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of ZENEIO products or services. Our total liability shall not exceed the amount you paid for the product in question.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">10. Prohibited Uses</h2>
            <p className="text-sm mb-3">You agree not to use ZENEIO products for any unlawful purpose or in any way that could damage, disable, or impair our website. You may not resell ZENEIO products without our written authorization.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">11. Governing Law</h2>
            <p className="text-sm">These Terms are governed by the laws of the State of Delaware, USA, without regard to conflict of law principles. Any disputes shall be resolved in the courts of the State of Delaware.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">12. Changes to Terms</h2>
            <p className="text-sm">We reserve the right to modify these Terms at any time. Continued use of our website after changes constitutes acceptance of the new Terms. Material changes will be communicated via email to registered users.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">13. Contact</h2>
            <p className="text-sm">For questions about these Terms of Service, contact us at <a href="mailto:legal@zeneio.com" className="text-zeneio-accent hover:underline">legal@zeneio.com</a>.</p>
          </section>

          <div className="border-t border-white/10 pt-8">
            <p className="text-xs text-white/25">If any provision of these Terms is found unenforceable, the remaining provisions shall remain in full force and effect.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
