'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-serif italic font-light leading-[0.9] mb-8">
            Get In <span className="not-italic font-sans font-black text-glow uppercase">Touch</span>
          </h1>
          <p className="text-white/30 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Have questions about our products, need support, or want to collaborate? 
            We&apos;re here to help — discreetly and professionally.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Contact Form */}
          <div>
            {submitted ? (
              <div className="glass rounded-[40px] p-12 border border-[#81D8D0]/30 text-center">
                <div className="text-[#81D8D0] text-5xl mb-6">✓</div>
                <h3 className="text-2xl font-bold text-white mb-4">Message Sent</h3>
                <p className="text-white/40 text-sm">We&apos;ll get back to you within 24 hours. All communications are encrypted and private.</p>
              </div>
            ) : (
              <form 
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="glass rounded-[40px] p-10 md:p-14 border border-white/5 space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[9px] uppercase font-black tracking-[0.3em] text-white/30 mb-3">Name *</label>
                    <input type="text" required placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-black tracking-[0.3em] text-white/30 mb-3">Email *</label>
                    <input type="email" required placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition" />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-black tracking-[0.3em] text-white/30 mb-3">Subject</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-[#81D8D0]/50 focus:outline-none transition appearance-none">
                    <option value="" className="bg-black">Select a topic</option>
                    <option value="order" className="bg-black">Order Inquiry</option>
                    <option value="product" className="bg-black">Product Question</option>
                    <option value="support" className="bg-black">Technical Support</option>
                    <option value="wholesale" className="bg-black">Wholesale / B2B</option>
                    <option value="other" className="bg-black">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-black tracking-[0.3em] text-white/30 mb-3">Message *</label>
                  <textarea rows={5} required placeholder="How can we help?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition resize-none"></textarea>
                </div>

                <button type="submit" className="btn-zeneio w-full text-black py-5 text-sm">
                  Send Message
                </button>

                <p className="text-[8px] text-white/20 text-center uppercase tracking-widest">
                  🔒 Your message is encrypted. We never share your data.
                </p>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="glass rounded-[40px] p-10 border border-white/5 space-y-8">
              <h3 className="text-xl font-black tracking-tight uppercase text-[#81D8D0]">Contact Channels</h3>
              
              {[
                {
                  icon: '✉',
                  label: 'Email',
                  value: 'support@zeneio.com',
                  desc: 'Response within 24 hours'
                },
                {
                  icon: '⏱',
                  label: 'Response Time',
                  value: '< 24 Hours',
                  desc: 'Mon-Fri business days'
                },
                {
                  icon: '🌐',
                  label: 'Languages',
                  value: 'EN / JP / ZH / DE',
                  desc: 'Multi-language support'
                },
                {
                  icon: '🔒',
                  label: 'Privacy',
                  value: 'End-to-End Encrypted',
                  desc: 'All data protected'
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p className="text-[9px] uppercase font-black tracking-[0.3em] text-white/30">{item.label}</p>
                    <p className="text-white/70 text-sm mt-1">{item.value}</p>
                    <p className="text-white/20 text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass rounded-[40px] p-10 border border-white/5">
              <h3 className="text-xl font-black tracking-tight uppercase text-[#81D8D0] mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {[
                  { label: 'Order Tracking', href: '#' },
                  { label: 'Returns & Exchanges', href: '/shipping' },
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms of Service', href: '/terms' },
                  { label: 'FAQ', href: '/faq' },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0 group">
                      <span className="text-sm text-white/60 group-hover:text-white transition">{link.label}</span>
                      <span className="text-[#81D8D0]/30 group-hover:text-[#81D8D0] transition text-xs">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
