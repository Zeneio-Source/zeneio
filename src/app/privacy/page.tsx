import React from 'react';import Navbar from '@/components/Navbar';import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><div className="page-header"><h1>Privacy Policy</h1><p>Last updated: April 1, 2026</p></div>
      <div className="section-container pb-20 max-w-3xl mx-auto prose prose-invert">
        {[
          { title: '1. Information We Collect', content: ['Account information (name, email, shipping address)', 'Order history and preferences', 'Website usage data (pages visited, clicks)', 'Device information (browser type, IP address)'] },
          { title: '2. How We Use Your Data', content: ['Processing and fulfilling orders', 'Sending order updates and shipping notifications', 'Improving our products and website experience', 'Marketing communications (only with your consent)'] },
          { title: '3. Discreet Billing & Shipping', content: ['Credit card statements show "ZNE LLC" — no product names', 'All packages ship in plain unmarked boxes', 'Return address shows "ZNE Logistics"', 'We never share your purchase details with third parties'] },
          { title: '4. Data Protection', content: ['256-bit SSL encryption for all transactions', 'PCI DSS compliant payment processing', 'GDPR and CCPA compliant data practices', 'Data stored on secure US-based servers'] },
          { title: '5. Your Rights', content: ['Access your personal data at any time', 'Request correction or deletion of your data', 'Opt out of marketing emails (unsubscribe link in every email)', 'Export your data in a portable format'] },
        ].map((section, i) => (
          <section key={i} id={`section-${i + 1}`} className="mb-10 scroll-mt-28 not-prose">
            <h2 className="text-heading-3 font-bold mb-4">{section.title}</h2>
            <ul className="space-y-2 text-sm text-white/45 leading-relaxed list-none pl-0">
              {section.content.map((item, j) => (<li key={j} className="flex items-start gap-2"><span className="text-zeneio-accent mt-1.5">•</span>{item}</li>))}
            </ul>
          </section>
        ))}
      </div><Footer /></div>
  );
}
