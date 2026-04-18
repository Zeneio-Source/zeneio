import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: '[slug] | ZENEIO News',
  description: 'ZENEIO News Article',
};

const sampleArticle = {
  title: 'ZENEIO PRO Launches Worldwide — Our Most Advanced Device Yet',
  category: 'Product Launch',
  date: 'April 18, 2026',
  author: 'ZENEIO Communications Team',
  
  content: `
    <p class="lead">Today, ZENEIO announces the global launch of the PRO device — our most advanced product ever. Featuring Gen-5 Quad motor technology, AI-powered pattern learning, and a completely redesigned form factor based on 18 months of user research.</p>
    
    <h2>A New Standard</h2>
    <p>PRO represents everything we've learned since launching ZENEIO in 2024. Over 50,000 devices shipped, thousands of user interviews, and countless hours of R&D have culminated in what we believe is the most sophisticated personal wellness device ever created.</p>

    <h2>Key Innovations</h2>
    
    <ul>
      <li><strong>Gen-5 Quad Motor System</strong> — Four independently controlled motors deliver 256 unique vibration combinations</li>
      <li><strong>AI Pattern Engine</strong> — Learns your preferences across sessions and suggests optimal patterns</li>
      <li><strong>300-Minute Battery</strong> — Industry-leading battery life with USB-C PD fast charging</li>
      <li><strong>IPX8 Waterproof</strong> — Fully submersible up to 1.5 meters for 30 minutes</li>
      <li><strong>Platinum Silicone</strong> — Our softest, most durable material yet</li>
      <li><strong>Heating Function</strong> — Gradual warmth up to 42°C for enhanced comfort</li>
    </ul>

    <blockquote>"We didn't just want to make another vibrator. We wanted to create something that fundamentally changes how people think about personal wellness technology." <cite>— Yuki Tanaka, CEO & Chief Engineer</cite></blockquote>

    <h2>Pricing & Availability</h2>
    <p>ZENEIO PRO is now available worldwide at $49.99 USD (regional pricing varies). Orders ship within 24 hours with free discreet shipping on all orders over $75.</p>

    <p>The device comes with a premium storage case, USB-C cable, quick-start guide, and 2-year warranty registration card.</p>

    <h2>What's Next</h2>
    <p>Following PRO's launch, we're already working on three new products planned for Q3 2026, including our first wearable line and a couples-focused dual-device system. Stay tuned.</p>
  `,
};

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen">
      <Navbar />

      <article className="pt-40 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/news" className="inline-flex items-center text-[9px] uppercase font-black tracking-[0.3em] text-white/30 hover:text-[#81D8D0] transition mb-12">
            ← Back to News
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <span className="glass px-4 py-2 rounded-full text-[9px] uppercase font-black tracking-widest text-[#81D8D0] border-[#81D8D0]/20">
              {sampleArticle.category}
            </span>
            <time className="text-[9px] uppercase tracking-widest text-white/30 font-bold">{sampleArticle.date}</time>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif italic font-light leading-[0.95] mb-10 text-white">
            {sampleArticle.title}
          </h1>

          <div className="flex items-center gap-4 pb-12 border-b border-white/5 mb-12">
            <div className="w-12 h-12 rounded-full bg-[#81D8D0]/10 flex items-center justify-center text-[#81D8D0] font-bold text-sm">Z</div>
            <div>
              <p className="text-sm font-bold text-white/80">{sampleArticle.author}</p>
              <p className="text-[9px] text-white/30 uppercase tracking-wider">Press Release</p>
            </div>
          </div>

          <div 
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:text-white prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
              prose-p:text-white/50 prose-p:leading-relaxed
              prose-a:text-[#81D8D0]
              prose-strong:text-white
              prose-li:text-white/50
              prose-blockquote:border-l-[#81D8D0]/30 prose-blockquote:bg-white/[0.02]"
            dangerouslySetInnerHTML={{ __html: sampleArticle.content }}
          />
        </div>
      </article>

      {/* CTA */}
      <section className="py-20 px-6 bg-black/40">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Experience ZENEIO PRO</h2>
          <p className="text-white/40 text-sm mb-8">See why customers are calling it "the future of wellness technology."</p>
          <a href="/products" className="btn-zeneio text-black inline-block px-14 py-5">Shop Now</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
