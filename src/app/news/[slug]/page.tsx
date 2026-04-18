'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function NewsArticlePage() {
  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><div className="section-container pt-28 pb-20">
      <Link href="/news" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white mb-8"><ArrowLeft size={14} /> Back to News</Link>
      
      <article className="max-w-3xl mx-auto">
        <span className="text-xs font-bold tracking-widest uppercase text-zeneio-purple/80">TechCrunch · Apr 18, 2026</span>
        <h1 className="text-heading-1 font-bold mt-3 mb-6 leading-tight">ZENEIO Unveils AI-Powered Vibrator with Personalized Learning Technology</h1>

        <div className="space-y-6 text-body text-white/45 leading-relaxed">
          <p className="text-body-lg first-letter:text-5xl first-letter:font-bold first-letter:text-zeneio-purple first-letter:float-left first-letter:mr-3">
            SAN FRANCISCO — ZENEIO, the bio-tech intimate wellness brand, today announced the launch of its flagship APEX Auto Stroker Elite — what it calls &quot;the world&apos;s first AI-powered personal pleasure device.&quot;
          </p>
          <p>The device features proprietary stroke-learning technology that adapts to user preferences over time, a 360-degree rotating textured sleeve, and companion app support for long-distance partner control.</p>
          <p>&quot;We spent three years developing this technology,&quot; said Dr. Elena Chen, ZENEIO&apos;s Chief Product Engineer. &quot;The goal wasn&apos;t just to make something vibrate — it was to create a device that genuinely learns what you like and gets better at it every time you use it.&quot;</p>

          <blockquote className="glass rounded-xl p-6 border-l-2 border-zeneio-purple my-8 not-italic">
            <p className="font-medium text-white/70 !mb-0">&ldquo;This represents a fundamental shift in how we think about personal wellness technology. It&apos;s not just about intensity anymore — it&apos;s about intelligence.&rdquo;</p>
            <cite className="text-sm text-white/30 mt-2 block not-italic">— Industry Analyst, TechCrunch</cite>
          </blockquote>

          <p>Key features of the APEX Elite include:</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-zeneio-purple">
            <li>AI-driven stroke analysis with personalized pattern learning</li>
            <li>7 rotation modes with adjustable speed</li>
            <li>Heated core (38°C–42°C) for realistic sensation</li>
            <li>App connectivity for solo or partner control</li>
            <li>Real-time performance analytics dashboard</li>
          </ul>

          <p>The APEX Elite launches globally on April 25, 2026, with an MSRP of $189.99. Pre-orders are available now through ZENEIO&apos;s website.</p>
        </div>
      </article>
    </div><Footer /></div>
  );
}
