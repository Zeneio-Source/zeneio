'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, Shield, Truck, Globe } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zeneio-black">
      <Navbar />

      <div className="page-header">
        <h1>Contact Us</h1>
        <p>We&apos;re here to help — discreetly and professionally</p>
      </div>

      <div className="section-container pb-20">
        {/* Quick Promise Bar */}
        <div className="glass rounded-2xl p-5 mb-10 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-center animate-fade-up">
          {[
            { icon: Shield, text: '100% Confidential' },
            { icon: Clock, text: '24hr Response Time' },
            { icon: Globe, text: 'English / 中文 Support' },
            { icon: Truck, text: 'Order Tracking Available' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-white/50">
              <item.icon size={16} className="text-zeneio-accent" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-10">
          {/* Contact Form */}
          <div className="glass rounded-2xl p-6 sm:p-8 space-y-5 animate-fade-up">
            <h2 className="text-lg font-bold">Send Us a Message</h2>
            <p className="text-sm text-white/40">All inquiries are handled confidentially. We typically respond within 24 hours.</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              const name = formData.get('name');
              const email = formData.get('email');
              const subject = formData.get('subject');
              // Open email client
              window.location.href = `mailto:support@zeneio.com?subject=ZENEIO Inquiry: ${subject} - ${name}&body=${formData.get('message')}`;
            }} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="input-label">Name</label><input name="name" placeholder="Your name" className="input-field" /></div>
                <div><label className="input-label">Email</label><input type="email" name="email" placeholder="your@email.com" className="input-field" required /></div>
              </div>
              <div><label className="input-label">Subject</label><select name="subject" className="input-field cursor-pointer"><option>General Inquiry</option><option>Order Support</option><option>Product Question</option><option>Returns & Refunds</option><option>Partnership / Wholesale</option><option>Other</option></select></div>
              <div><label className="input-label">Message</label><textarea name="message" rows={5} placeholder="How can we help?" className="input-field resize-none" required /></div>
              <button type="submit" className="btn-accent w-full justify-center py-3.5"><Send size={16} /> Send Message</button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <aside className="space-y-4">
            {/* Email - Clickable */}
            <a href="mailto:support@zeneio.com" className="block glass rounded-2xl p-5 group hover:border-zeneio-accent/20 transition-all">
              <Mail size={22} className="text-zeneio-accent mb-3" />
              <p className="font-bold text-sm">Email Us</p>
              <p className="text-sm text-zeneio-accent mt-0.5 group-hover:underline">support@zeneio.com</p>
              <p className="text-xs text-white/30 mt-1">Response within 24 hours</p>
            </a>

            {/* Live Chat Info */}
            <div className="glass rounded-2xl p-5 group hover:border-white/10 transition-all">
              <MessageCircle size={22} className="text-zeneio-accent mb-3" />
              <p className="font-bold text-sm">Live Chat</p>
              <p className="text-sm text-white/60 mt-0.5">Coming Soon</p>
              <p className="text-xs text-white/30 mt-1">Chat widget will be available here</p>
            </div>

            {/* Business Hours */}
            <div className="glass rounded-2xl p-5 group hover:border-white/10 transition-all">
              <Clock size={22} className="text-zeneio-accent mb-3" />
              <p className="font-bold text-sm">Business Hours</p>
              <p className="text-sm text-white/60 mt-0.5">Mon – Fri: 9AM – 9PM EST</p>
              <p className="text-xs text-white/30 mt-1">Sat – Sun: Email support only</p>
            </div>

            {/* Quick Links */}
            <div className="glass rounded-2xl p-5">
              <p className="font-bold text-sm mb-3">Quick Help</p>
              <div className="space-y-2">
                <Link href="/faq" className="flex items-center justify-between text-sm text-white/50 hover:text-zeneio-accent transition-colors py-1.5 border-b border-white/[0.03]">
                  <span>Frequently Asked Questions</span>
                  <span>→</span>
                </Link>
                <Link href="/shipping" className="flex items-center justify-between text-sm text-white/50 hover:text-zeneio-accent transition-colors py-1.5 border-b border-white/[0.03]">
                  <span>Shipping Information</span>
                  <span>→</span>
                </Link>
                <Link href="/account/orders" className="flex items-center justify-between text-sm text-white/50 hover:text-zeneio-accent transition-colors py-1.5">
                  <span>Track Your Order</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
