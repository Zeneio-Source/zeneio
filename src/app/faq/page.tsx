'use client';
import React, { useState } from 'react';import Link from 'next/link';import Navbar from '@/components/Navbar';import Footer from '@/components/Footer';import { ChevronDown } from 'lucide-react';

const faqCategories = [
  { title: 'Shipping & Delivery', icon: '📦', items: [
    { q: 'How long does shipping take?', a: 'Standard shipping: 5-10 business days. Express: 2-4 business days. Orders placed before 2PM EST ship same day.' },
    { q: 'Is shipping discreet?', a: 'Absolutely. All packages ship in plain cardboard boxes with "ZNE Logistics" as the return address. No product names or branding visible.' },
    { q: 'Which countries do you ship to?', a: 'We ship to over 50 countries worldwide including USA, Canada, UK, EU, Australia, Japan, and many more.' },
    { q: 'Is there free shipping?', a: 'Yes! All orders over $99 qualify for free standard shipping to most countries. Express shipping is always available at checkout.' },
    { q: 'Can I track my order?', a: 'Yes! Once your order ships, you\'ll receive an email with tracking information. You can also track it in your account under "My Orders".' },
  ]},
  { title: 'Products & Quality', icon: '✨', items: [
    { q: 'Are your products body-safe?', a: 'Yes. All ZENEIO products are made from medical-grade silicone, ABS plastic, or other body-safe materials. They\'re free of phthalates and latex.' },
    { q: 'How do I clean my products?', a: 'Use warm water and mild soap, or a dedicated toy cleaner. For waterproof products, submerge fully. Air dry completely before storage.' },
    { q: 'Do products come with a warranty?', a: 'Yes! All products come with a 1-year manufacturer warranty against defects. Register within 30 days for extended coverage.' },
    { q: 'What if I don\'t like the product?', a: 'We offer a 30-day satisfaction guarantee on unopened products. Due to hygiene reasons, opened products cannot be returned unless defective.' },
  ]},
  { title: 'Orders & Payments', icon: '💳', items: [
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex, Discover), PayPal, and select cryptocurrencies (BTC, ETH, USDT).' },
    { q: 'Will this show up on my bank statement as something embarrassing?', a: 'No. Your statement will show "ZNE LLC" or similar — nothing indicating the nature of your purchase.' },
    { q: 'Can I modify or cancel my order?', a: 'You can cancel or modify within 1 hour of placing the order by contacting support. After that window begins processing, we may not be able to make changes.' },
    { q: 'Do you offer installment payments?', a: 'Yes! We offer Buy Now Pay Later options through trusted providers at checkout. Available for orders $50+.' },
  ]},
  { title: 'Account & Privacy', icon: '🔒', items: [
    { q: 'Is my data secure?', a: 'We use 256-bit SSL encryption, PCI DSS compliance, and never sell your data. Your privacy is our top priority.' },
    { q: 'Do I need to create an account to buy?', a: 'No, you can check out as a guest. However, creating an account gives you order tracking, wishlist access, and exclusive member offers.' },
    { q: 'How old do I need to be?', a: 'You must be 18 years or older (or the legal age of majority in your jurisdiction) to purchase from ZENEIO.' },
    { q: 'Can I delete my account and data?', a: 'Yes. Contact support with a deletion request and we will permanently remove your account and associated data within 30 days per GDPR/CCPA requirements.' },
  ]},
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string | null>('Shipping & Delivery');
  const [openQuestion, setOpenQuestion] = useState<Record<string, string | null>>({});

  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><div className="page-header"><h1>Frequently Asked Questions</h1><p>Everything you need to know about ZENEIO</p></div>

      <div className="section-container pb-20">
        <div className="max-w-3xl mx-auto space-y-4">{faqCategories.map(cat => (
          <div key={cat.title} className="glass rounded-2xl overflow-hidden">
            <button onClick={() => setOpenCategory(openCategory === cat.title ? null : cat.title)}
              className={`w-full flex items-center justify-between p-5 text-left transition-colors ${openCategory === cat.title ? 'bg-white/[0.03]' : ''}`}>
              <span className="flex items-center gap-3 font-bold text-sm sm:text-base"><span className="text-xl">{cat.icon}</span>{cat.title}</span>
              <ChevronDown size={20} className={`text-white/40 transition-transform duration-300 ${openCategory === cat.title ? 'rotate-180' : ''}`} />
            </button>
            
            {openCategory === cat.title && (
              <div className="px-5 pb-5 space-y-2 animate-fade-in">
                {cat.items.map((item) => {
                  const key = `${cat.title}-${item.q}`;
                  const isOpen = openQuestion[key] === item.q;
                  return (
                    <div key={key} className="border-t border-white/5 pt-3 first:pt-0 first:border-t-0">
                      <button onClick={() => setOpenQuestion(prev => ({ ...prev, [key]: isOpen ? null : item.q }))} className="w-full flex items-start gap-3 text-left py-2 group">
                        <span className={`mt-1.5 w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all ${isOpen ? 'bg-zeneio-accent border-zeneio-accent' : 'border-white/20'}`}>{isOpen && <span className="w-1.5 h-1.5 rounded-full bg-black" />}</span>
                        <span className={`text-sm font-medium leading-relaxed ${isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>{item.q}</span>
                      </button>
                      {isOpen && (
                        <div className="pl-7 pr-2 pb-2 animate-fade-in"><p className="text-sm text-white/45 leading-relaxed">{item.a}</p></div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        <div className="text-center mt-12 glass rounded-2xl p-8"><p className="text-sm text-white/40 mb-4">Still have questions?</p><Link href="/contact" className="btn-accent">Contact Our Team</Link></div>
      </div>

      <Footer /></div>
  );
}
