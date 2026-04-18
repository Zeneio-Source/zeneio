import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'News | ZENEIO - Latest Updates',
  description: 'Stay updated with the latest news, product launches, and company updates from ZENEIO.',
};

const newsArticles = [
  {
    slug: 'zeneio-pro-launch-2026',
    title: 'ZENEIO PRO Launches Worldwide — Our Most Advanced Device Yet',
    excerpt: 'The flagship PRO device featuring Gen-5 Quad motor technology is now available in 48 countries.',
    category: 'Product Launch',
    date: 'Apr 18, 2026',
    isFeatured: true,
  },
  {
    slug: 'ces-2026-innovation-award',
    title: 'ZENEIO Wins CES 2026 Innovation Award for Neural-Sync Technology',
    excerpt: 'Our bio-responsive haptic system recognized as a breakthrough in consumer health technology.',
    category: 'Award',
    date: 'Apr 12, 2026',
  },
  {
    slug: 'partnership-eu-distribution',
    title: 'New EU Distribution Partnership Expands European Presence',
    excerpt: 'ZENEIO partners with leading wellness retailer to accelerate European market expansion.',
    category: 'Business',
    date: 'Apr 8, 2026',
  },
  {
    slug: 'sustainability-report-2026',
    title: '2026 Sustainability Report: Carbon Neutral by 2027',
    excerpt: 'We commit to achieving carbon neutrality across our entire supply chain within 18 months.',
    category: 'Sustainability',
    date: 'Apr 1, 2026',
  },
  {
    slug: 'app-update-v3',
    title: 'ZENEIO App v3.0 — Complete Redesign with New Features',
    excerpt: 'Partner sync, custom pattern builder, and AI-powered recommendations now available.',
    category: 'Software',
    date: 'Mar 25, 2026',
  },
  {
    slug: 'research-collaboration-stanford',
    title: 'Stanford Biodesign Collaboration Announced',
    excerpt: 'Joint research initiative to study the physiological benefits of wellness technology.',
    category: 'Research',
    date: 'Mar 18, 2026',
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block glass px-4 py-2 rounded-full text-[9px] uppercase tracking-[0.4em] font-bold mb-8 text-[#81D8D0] border-[#81D8D0]/20">
            Press Room
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic font-light leading-[0.9] mb-8">
            Latest <span className="not-italic font-sans font-black text-glow uppercase">News</span>
          </h1>
          <p className="text-white/30 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Product launches, awards, partnerships, and company updates.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          {(() => {
            const featured = newsArticles.find(n => n.isFeatured);
            if (!featured) return null;
            return (
              <Link href={`/news/${featured.slug}`} 
                className="block glass rounded-[50px] overflow-hidden border border-white/5 group hover:border-[#81D8D0]/20 transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-[#81D8D0]/15 to-transparent flex items-center justify-center relative min-h-[300px]">
                    <span className="text-7xl font-serif italic text-[#81D8D0]/20 group-hover:text-[#81D8D0]/40 transition">Z</span>
                    <div className="absolute top-6 left-6 flex gap-3">
                      <span className="bg-[#81D8D0] text-black px-4 py-2 rounded-full text-[8px] uppercase font-black tracking-widest">Featured</span>
                      <span className="glass px-4 py-2 rounded-full text-[8px] uppercase tracking-widest text-white/60">{featured.category}</span>
                    </div>
                  </div>
                  <div className="p-10 lg:p-16 flex flex-col justify-center">
                    <time className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-4">{featured.date}</time>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-[#81D8D8D0] transition mb-6 leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-base text-white/40 leading-relaxed mb-8">{featured.excerpt}</p>
                    <span className="inline-flex items-center text-sm font-bold text-[#81D8D0] group-hover:text-white transition uppercase tracking-wider">
                      Read Full Story <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })()}
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 px-6 pb-32">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black tracking-tighter uppercase italic text-[#81D8D0]/80 mb-10">All News</h2>
          <div className="space-y-4">
            {newsArticles.filter(n => !n.isFeatured).map((article) => (
              <Link href={`/news/${article.slug}`} key={article.slug}
                className="glass rounded-2xl p-6 md:p-8 border border-white/5 group hover:border-white/10 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center">
                
                {/* Date badge */}
                <div className="flex-shrink-0 w-20 h-20 bg-white/[0.03] rounded-xl flex flex-col items-center justify-center border border-white/5 group-hover:border-[#81D8D0]/20 transition">
                  <span className="text-lg font-black text-[#81D8D0]">{article.date.split(' ')[1].padStart(2, '0')}</span>
                  <span className="text-[8px] uppercase text-white/30">{article.date.split(' ')[0]}</span>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="glass px-3 py-1 rounded-full text-[8px] uppercase font-black tracking-widest text-white/40">{article.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white/80 group-hover:text-[#81D8D0] transition mb-2">{article.title}</h3>
                  <p className="text-sm text-white/30 line-clamp-2">{article.excerpt}</p>
                </div>

                {/* Arrow */}
                <span className="flex-shrink-0 text-[#81D8D0]/30 group-hover:text-[#81D8D0] transition transform group-hover:translate-x-1 text-lg">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
