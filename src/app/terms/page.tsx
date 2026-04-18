import React from 'react';import Navbar from '@/components/Navbar';import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><div className="page-header"><h1>Terms of Service</h1><p>Last updated: April 1, 2026</p></div>

      <div className="section-container pb-20 max-w-3xl mx-auto space-y-8">
        {[
          { title: 'Age Requirement', content: 'By using this website or purchasing any products, you confirm that you are at least 18 years old (or the legal age of majority in your jurisdiction). All products on ZENEIO are intended for adult use only.' },
          { title: 'Products & Pricing', content: 'All prices are listed in USD unless otherwise noted. We reserve the right to modify prices at any time without notice, but the price applicable to your order will be the price displayed at checkout. Product images are for illustration purposes — actual products may vary slightly.' },
          { title: 'Orders & Payment', content: 'All orders require payment before shipment. We accept credit cards, PayPal, and cryptocurrency (BTC, ETH, USDT). By placing an order, you agree to pay the total amount including product costs, shipping, and applicable taxes.' },
          { title: 'Shipping & Returns', content: ['Standard shipping is free on orders $99+ to most countries.', 'All shipping is discreet — plain packaging with "ZNE Logistics" return address.', 'Unopened products can be returned within 30 days for a full refund.', 'Opened products cannot be returned due to hygiene reasons unless defective.', 'Defective products are covered under our 1-year warranty.'].join('\n') },
          { title: 'Discreet Billing', content: 'Credit card statements will show "ZNE LLC" as the merchant name. No product names, categories, or descriptive terms will appear on your statement. This is our commitment to your privacy.' },
          { title: 'Intellectual Property', content: 'All content on this website — including text, images, logos, designs, and code — is the property of ZENEIO and protected by copyright law. Reproduction without written permission is prohibited.' },
          { title: 'Limitation of Liability', content: 'ZENEIO provides products for personal use only. We are not responsible for misuse of products, allergic reactions to materials, or any claims arising from improper use. Use products responsibly and according to included instructions.' },
        ].map((section) => (
          <section key={section.title} className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-bold text-base sm:text-lg mb-3">{section.title}</h2>
            <p className="text-sm text-white/45 leading-relaxed whitespace-pre-line">{section.content}</p>
          </section>
        ))}

        <p className="text-xs text-white/20 text-center pt-4">By using zeneio-platform.vercel.app, you agree to these Terms of Service. Questions? <a href="/contact" className="text-zeneio-accent hover:underline">Contact us</a>.</p>
      </div><Footer /></div>
  );
}
