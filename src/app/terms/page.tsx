import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service | ZENEIO',
  description: 'Terms and conditions for ZENEIO bio-tech wellness products.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-6">
            Terms<span className="text-[#81D8D0]">.</span>
          </h1>
          
          <div className="glass rounded-3xl p-10 md:p-16 border border-white/5 space-y-8 text-white/50 text-sm leading-relaxed">
            
            <section>
              <h2 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">1. Acceptance of Terms</h2>
              <p>By accessing and using ZENEIO products and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">2. Age Requirement</h2>
              <p>All users must be 18 years of age or older to purchase or use ZENEIO products. By using this site, you confirm you meet this requirement.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">3. Products & Pricing</h2>
              <p>Prices are listed in USD and are subject to change without notice. All product specifications are accurate to the best of our knowledge at time of publication.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">4. Shipping & Returns</h2>
              <p>All orders ship in 100% discreet, unmarked packaging. Due to the nature of our products, we cannot accept returns on opened items for hygiene reasons. Defective products may be exchanged within 30 days.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">5. Privacy</h2>
              <p>Your privacy is paramount. We never share your data with third parties. See our Privacy Policy for full details.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">6. Disclaimer</h2>
              <p>ZENEIO products are intended for personal wellness use only. They are not medical devices and should not replace professional medical advice.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">7. Contact</h2>
              <p>For any questions regarding these terms: support@zeneio.com</p>
              <p className="mt-4 text-white/30 text-xs">Last updated: April 2026</p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
