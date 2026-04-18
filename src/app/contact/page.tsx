'use client';
import React from 'react';import Link from 'next/link';import Navbar from '@/components/Navbar';import Footer from '@/components/Footer';import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><div className="page-header"><h1>Contact Us</h1><p>We&apos;re here to help — discreetly and professionally</p></div>

      <div className="section-container pb-20">
        <div className="grid lg:grid-cols-[1fr_400px] gap-10">
          {/* Contact Form */}
          <div className="glass rounded-2xl p-6 sm:p-8 space-y-5 animate-fade-up">
            <h2 className="text-lg font-bold">Send Us a Message</h2>
            <p className="text-sm text-white/40">All inquiries are handled confidentially. We typically respond within 24 hours.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="input-label">Name</label><input placeholder="Your name" className="input-field" /></div>
                <div><label className="input-label">Email</label><input type="email" placeholder="your@email.com" className="input-field" /></div>
              </div>
              <div><label className="input-label">Subject</label><select className="input-field cursor-pointer"><option>General Inquiry</option><option>Order Support</option><option>Product Question</option><option>Partnership / Wholesale</option><option>Other</option></select></div>
              <div><label className="input-label">Message</label><textarea rows={5} placeholder="How can we help?" className="input-field resize-none" /></div>
              <button type="submit" className="btn-accent w-full justify-center py-3.5"><Send size={16} /> Send Message</button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <aside className="space-y-4">
            {[
              { icon: Mail, title: 'Email', value: 'support@zeneio.com', desc: 'Response within 24hrs' },
              { icon: MessageCircle, title: 'Live Chat', value: 'Available 24/7', desc: 'Bottom right corner →' },
              { icon: Clock, title: 'Business Hours', value: 'Mon-Fri 9AM-9PM EST', desc: 'Weekend: Limited support' },
            ].map(item => (
              <div key={item.title} className="glass rounded-2xl p-5 group hover:border-white/10 transition-all">
                <item.icon size={22} className="text-zeneio-accent mb-3" />
                <p className="font-bold text-sm">{item.title}</p>
                <p className="text-sm text-zeneio-accent mt-0.5">{item.value}</p>
                <p className="text-xs text-white/30 mt-1">{item.desc}</p>
              </div>
            ))}
          </aside>
        </div>
      </div>

      <Footer /></div>
  );
}
