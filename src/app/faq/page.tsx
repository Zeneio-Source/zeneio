import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'FAQ | ZENEIO - Frequently Asked Questions',
  description: 'Find answers to common questions about ZENEIO products, shipping, privacy, and more.',
};

const faqs = [
  {
    category: 'Products',
    questions: [
      { q: 'Are your products safe?', a: 'Yes. All ZENEIO products are made from medical-grade silicone (platinum cure), tested for biocompatibility, and certified by international safety standards including CE, RoHS, and FCC. Every device undergoes rigorous quality testing.' },
      { q: 'How do I clean my device?', a: 'Use warm water and mild unscented soap, or a dedicated toy cleaner. All our devices are IPX5+ waterproof for easy cleaning. Never use alcohol-based cleaners as they can damage the silicone over time.' },
      { q: 'What is the battery life?', a: 'Battery life varies by model: NEO (240 min), WAND (180 min), MICRO (90 min), CURVE (150 min), PRO (300 min). All devices feature USB-C fast charging — a full charge takes just 90 minutes.' },
      { q: 'Do you have a warranty?', a: 'Every ZENEIO device comes with a 2-year manufacturer warranty covering defects in materials and workmanship. Register your product online within 30 days of purchase to activate extended coverage.' },
      { q: 'Can I use these with lubricant?', a: 'Absolutely! We recommend water-based lubricants only. Avoid silicone-based lubes as they can degrade medical-grade silicone over time.' },
    ],
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      { q: 'How is shipping handled?', a: 'All orders ship in 100% discreet, unmarked packaging. The return address shows "ZL Logistics" with no indication of contents. No branding or logos on the exterior.' },
      { q: 'How long does delivery take?', a: 'Standard shipping: 7-14 business days worldwide. Express shipping: 3-5 business days. Orders placed before 2PM JST ship same day. You\'ll receive a tracking number via email once shipped.' },
      { q: 'Which countries do you ship to?', a: 'We ship to 48 countries across North America, Europe, Asia-Pacific, and select regions in South America & Africa. Check the full list at checkout — if your country appears, we deliver there.' },
      { q: 'Is customs/duties included?', a: 'Prices include duties and taxes for most destinations. For countries not covered by DDP (Delivered Duty Paid), any applicable import fees are the buyer\'s responsibility. This is clearly shown at checkout.' },
      { q: 'Can I track my order?', a: 'Yes! Once shipped, you\'ll receive an email with tracking information. Track your order anytime through our website using your order number.' },
    ],
  },
  {
    category: 'Privacy & Security',
    questions: [
      { q: 'Is my purchase completely private?', a: '100%. Your data is encrypted end-to-end. We don\'t sell or share any personal information. Billing statements show "ZL Commerce" — nothing about products purchased.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and cryptocurrency (BTC, ETH). All transactions are secured with 256-bit SSL encryption.' },
      { q: 'Will I receive marketing emails?', a: 'Only if you opt-in during checkout. Unsubscribe anytime with one click. We never spam — ever.' },
      { q: 'How long do you keep my data?', a: 'We retain order data for 3 years (required for warranty support). You can request complete deletion at any time by contacting support@zeneio.com.' },
    ],
  },
  {
    category: 'Returns & Support',
    questions: [
      { q: 'Can I return a product?', a: 'Due to hygiene reasons, unopened items can be returned within 30 days. Opened items are eligible for exchange only if defective. Contact us first before returning anything.' },
      { q: 'My device isn\'t working. What do I do?', a: 'First, try charging it fully for 2 hours. If issues persist, email support@zeneio.com with your order number and a description of the problem. Our team typically responds within 12 hours.' },
      { q: 'Do you offer refunds?', a: 'Refunds are available for unopened items returned within 30 days. Refunds process in 5-10 business days back to the original payment method. Defective items receive free replacement.' },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  
  return (
    <div className="border border-white/5 rounded-2xl overflow-hidden group hover:border-white/10 transition-all">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-6 text-left"
      >
        <span className="text-sm font-medium text-white/80 pr-8 group-hover:text-[#81D8D0] transition">{q}</span>
        <span className={`text-[#81D8D0] flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-6 text-sm text-white/40 leading-relaxed">{a}</div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block glass px-4 py-2 rounded-full text-[9px] uppercase tracking-[0.4em] font-bold mb-8 text-[#81D8D0] border-[#81D8D0]/20">
            Help Center
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic font-light leading-[0.9] mb-8">
            Questions<span className="not-italic font-sans font-black text-glow uppercase">?</span>
          </h1>
          <p className="text-white/30 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about ZENEIO products, shipping, privacy, and support.
          </p>

          {/* Quick search */}
          <div className="mt-12 max-w-xl mx-auto">
            <input type="search" placeholder="Search frequently asked questions..."
              className="w-full glass bg-white/5 border border-white/10 rounded-full px-8 py-5 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition" />
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 px-6 pb-32">
        <div className="max-w-3xl mx-auto space-y-16">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-2xl font-black tracking-tight uppercase italic text-[#81D8D0]/80 mb-8 sticky top-28 bg-black/90 py-4 backdrop-blur-md z-10">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.questions.map((item) => (
                  <FAQItem key={item.q} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still need help */}
      <section className="py-24 px-6 bg-black/40">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic mb-6">
            Still Have Questions?<span className="text-[#81D8D0]">.</span>
          </h2>
          <p className="text-white/30 text-sm mb-10">Our support team is ready to help.</p>
          <a href="/contact" className="btn-zeneio text-black inline-block px-16 py-5">
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
