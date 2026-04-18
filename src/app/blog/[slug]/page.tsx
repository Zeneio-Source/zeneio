'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Clock, Tag, Share2 } from 'lucide-react';

export default function BlogPostPage() {
  // This is a dynamic page - in production it would fetch by slug
  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><div className="section-container pt-28 pb-20">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white mb-8"><ArrowLeft size={14} /> Back to Blog</Link>

      <article className="max-w-3xl mx-auto">
        <span className="badge badge-new">Guides</span>
        <h1 className="text-heading-1 font-bold mt-4 mb-4 leading-tight">Your First Vibrator: A Complete Buyer&apos;s Guide for 2026</h1>
        <div className="flex items-center gap-4 text-sm text-white/35 mb-8">
          <span>By ZENEIO Team</span><span>·</span><span>Apr 15, 2026</span><span>·</span><span className="flex items-center gap-1"><Clock size={13} /> 8 min read</span>
        </div>

        <img src="" alt="Blog post cover" onError={(e) => {(e.target as HTMLStyleDeclaration).cssText = 'display:none'}} />

        <div className="prose prose-invert max-w-none mt-8 space-y-6">
          <p className="text-body-lg text-white/50 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-zeneio-accent first-letter:float-left first-letter:mr-3">
            Buying your first vibrator can feel overwhelming. With thousands of options, varying prices, and confusing terminology — where do you even start? This guide breaks down everything you need to know.
          </p>

          <h2 className="text-heading-3 font-bold text-white !mt-10 !mb-4">Understanding the Basics</h2>
          <p className="text-white/45 leading-relaxed">Vibrators come in several main categories: external (clitoral), internal (G-spot), dual (rabbit-style), and wand (all-over). Each serves a different purpose, and many people end up owning multiple types over time.</p>

          <h2 className="text-heading-3 font-bold text-white !mt-10 !mb-4">What to Look For</h2>
          <ul className="space-y-3 text-white/45 leading-relaxed list-none pl-0">
            {['Body-safe materials (medical-grade silicone is gold standard)', 'Waterproof rating (IPX6 or higher for bath/shower use)', 'Noise level (under 40dB = whisper quiet)', 'Battery life & charging type', 'Size that fits your anatomy'].map((item, i) => (
              <li key={i} className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-zeneio-accent/15 flex items-center justify-center flex-shrink-0 mt-1"><span className="text-zeneio-accent text-[11px] font-bold">{i + 1}</span></span>{item}</li>
            ))}
          </ul>

          <h2 className="text-heading-3 font-bold text-white !mt-10 !mb-4">Price Ranges Explained</h2>
          <p className="text-white/45 leading-relaxed">Budget ($15-$40): Good for beginners. Basic vibration, may lack features.<br/>Mid-range ($40-$100): Sweet spot. Better materials, more patterns, waterproof.<br/>Premium ($100+): Premium motors, app control, heating functions, luxury design.</p>

          <div className="glass rounded-2xl p-6 my-8 border-l-2 border-zeneio-accent">
            <p className="font-bold text-zeneio-accent mb-1">💡 Pro Tip</p>
            <p className="text-sm text-white/50 leading-relaxed">Start with something in the mid-range ($30-$70). It&apos;s affordable enough to not feel like a huge investment if you don&apos;t love it, but high enough quality to actually enjoy the experience.</p>
          </div>

          <h2 className="text-heading-3 font-bold text-white !mt-10 !mb-4">Common Mistakes to Avoid</h2>
          <ol className="space-y-3 text-white/45 leading-relaxed list-decimal pl-5 marker:text-zeneio-accent marker:font-bold">
            <li>Buying the cheapest option — it often disappoints and turns people off entirely.</li>
            <li>Skipping lubricant — water-based lube makes everything better and safer.</li>
            <li>Not cleaning properly — invest in a toy cleaner or use mild soap + water.</li>
            <li>Choosing based on looks alone — read reviews from real users.</li>
          </ol>

          <div className="border-t border-white/5 pt-8 mt-12">
            <p className="text-sm text-white/30 mb-4">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {['Vibrators', 'Beginners Guide', 'Product Selection', 'Sex Ed', 'Wellness'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full glass text-xs text-white/60 cursor-pointer hover:bg-white/5 transition-colors">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <div className="max-w-3xl mx-auto mt-16 border-t border-white/5 pt-10">
        <h3 className="font-bold mb-6">Related Articles</h3>
        <div className="grid sm:grid-cols-2 gap-5">
          {[{ title: 'Kegel Exercises: The Complete Science-Backed Guide', cat: 'Wellness' }, { title: 'The State of Sex Tech in 2026', cat: 'Tech' }].map(post => (
            <Link href="/blog" key={post.title} className="glass rounded-xl p-4 group hover:border-white/10 transition-all">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zeneio-accent/70">{post.cat}</span>
              <h4 className="text-sm font-medium mt-1 group-hover:text-zeneio-accent transition-colors line-clamp-2">{post.title}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>

    <Footer /></div>
  );
}
