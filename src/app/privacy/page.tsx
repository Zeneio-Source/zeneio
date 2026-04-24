import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-zeneio-black">
      <Navbar />
      <div className="section-container py-16 lg:py-24 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lock size={20} className="text-zeneio-accent" />
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-zeneio-accent">Legal</p>
          </div>
          <h1 className="text-heading-1 font-black mb-4">Privacy Policy</h1>
          <p className="text-white/40 text-sm">Last updated: April 25, 2026</p>
        </div>

        <div className="space-y-8 text-white/60 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Information We Collect</h2>
            <p className="text-sm mb-3">We collect information you provide directly, including: name, email address, shipping address, billing information, and order history. Payment data is processed securely by our PCI-compliant payment processor (Paddle) and is never stored on our servers.</p>
            <p className="text-sm">We also collect usage data including IP address, browser type, device information, and pages visited — solely for fraud prevention and site improvement purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. How We Use Your Information</h2>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Respond to your inquiries and customer support requests</li>
              <li>Prevent fraud and ensure account security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. Discreet Billing & Packaging</h2>
            <p className="text-sm mb-3">Your privacy is our priority. All credit card charges appear on your statement as <strong className="text-white/80">"ZNE LLC"</strong> — not ZENEIO or any reference to the products purchased.</p>
            <p className="text-sm">All shipments are sent in plain, unmarked brown boxes with no branding, logos, or product descriptions on the exterior. The return address lists only our warehouse facility, not our company name.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Cookies & Tracking</h2>
            <p className="text-sm mb-3">We use essential cookies for site functionality (shopping cart, login sessions) and optional analytics cookies to understand how visitors use our site. You can disable non-essential cookies in your browser settings.</p>
            <p className="text-sm">We do not use third-party advertising cookies or sell your data to data brokers.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. Data Sharing</h2>
            <p className="text-sm mb-3">We do not sell, rent, or trade your personal information. We share data only with:</p>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li><strong className="text-white/80">Payment processors</strong> (Paddle) — for secure payment handling</li>
              <li><strong className="text-white/80">Shipping carriers</strong> (DHL, FedEx, USPS) — to fulfill and track your orders</li>
              <li><strong className="text-white/80">Email service providers</strong> — to send order updates and newsletters you have opted into</li>
              <li><strong className="text-white/80">Legal authorities</strong> — when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">6. Data Retention</h2>
            <p className="text-sm">We retain account and order data for a minimum of 3 years to comply with financial record-keeping requirements. You may request deletion of your account data at any time by emailing <a href="mailto:privacy@zeneio.com" className="text-zeneio-accent hover:underline">privacy@zeneio.com</a>. Deletion requests are processed within 30 days.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">7. Your Rights</h2>
            <p className="text-sm mb-3">Depending on your location, you may have the right to:</p>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to certain processing activities</li>
              <li>Export your data in a portable format</li>
            </ul>
            <p className="text-sm mt-3">To exercise any of these rights, contact us at <a href="mailto:privacy@zeneio.com" className="text-zeneio-accent hover:underline">privacy@zeneio.com</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">8. Data Security</h2>
            <p className="text-sm">All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Our payment processor is PCI DSS Level 1 certified — the highest level of payment security certification available.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">9. International Transfers</h2>
            <p className="text-sm">If you are located outside the United States, your data may be transferred to and processed in the US. We ensure appropriate safeguards are in place for international data transfers, including Standard Contractual Clauses where applicable.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">10. Contact Us</h2>
            <p className="text-sm">ZNE LLC<br />Data Protection Officer<br /><a href="mailto:privacy@zeneio.com" className="text-zeneio-accent hover:underline">privacy@zeneio.com</a></p>
          </section>

          <div className="border-t border-white/10 pt-8">
            <p className="text-xs text-white/25">We reserve the right to update this Privacy Policy at any time. Material changes will be communicated via email to registered users.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
