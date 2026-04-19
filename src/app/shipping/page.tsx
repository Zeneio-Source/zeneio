import React from 'react';import Navbar from '@/components/Navbar';import { Truck, Shield, Clock, Globe } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><div className="page-header"><h1>Shipping & Delivery</h1><p>Everything you need to know about getting your order</p></div>

      <div className="section-container pb-20 max-w-3xl mx-auto space-y-8">
        {[
          { icon: Globe, title: 'Worldwide Shipping', items: ['We ship to 50+ countries worldwide', 'All orders ship from our discreet US warehouse', 'Customs duties may apply for international orders — customer responsibility'] },
          { icon: Truck, title: 'Shipping Options', items: ['Standard (5-10 business days): FREE on orders $99+', 'Express (2-4 business days): $12.99 flat rate', 'Overnight (next business day): $24.99 flat rate', 'Orders placed before 2PM EST ship same day'] },
          { icon: Shield, title: 'Discreet Packaging Promise', items: ['Plain cardboard boxes — no branding or logos visible', 'Return address: "ZNE Logistics"', 'No product names on outside packaging', 'Contents listed as "Wellness Products" on customs forms'] },
          { icon: Clock, title: 'Delivery Timeframes', items: ['USA: Standard 5-7 days, Express 2-3 days', 'Canada: Standard 7-10 days, Express 3-5 days', 'Europe: Standard 7-14 days, Express 4-7 days', 'Asia/Pacific: Standard 10-18 days, Express 5-10 days'] },
        ].map(section => (
          <section key={section.title} className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5"><section.icon size={24} className="text-zeneio-accent" /><h2 className="font-bold text-lg">{section.title}</h2></div>
            <ul className="space-y-3 text-sm text-white/50 leading-relaxed list-none pl-0">
              {section.items.map((item, i) => <li key={i} className="flex items-start gap-2"><span className="text-zeneio-accent mt-1.5">•</span>{item}</li>)}
            </ul>
          </section>
        ))}

        {/* FAQ */}
        <section className="glass rounded-2xl p-6 sm:p-8"><h2 className="font-bold text-lg mb-4">Common Questions</h2>
        {[{q: 'Can I change my shipping address after ordering?', a: 'Contact us within 1 hour of placing your order. After that window closes, we cannot guarantee changes.'}, {q: 'What if my package is lost?', a: 'Contact support immediately. We\'ll initiate a replacement or full refund after investigation.'}, {q: 'Do you deliver to PO boxes?', a: 'Yes for standard shipping. Express and overnight require a physical street address.'}].map((faq, i) => (<details key={i} className="group border-b border-white/5 py-4 first:pt-0 last:border-b-0"><summary className="cursor-pointer font-medium text-sm text-white/70 group-hover:text-white flex justify-between items-center pr-2 list-none">{faq.q}<span className="text-white/25 group-open:rotate-180 transition-transform">▼</span></summary><p className="mt-3 text-sm text-white/40 leading-relaxed">{faq.a}</p></details>))}</section>
      </div>

  );
}
