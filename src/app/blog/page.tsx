'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';


const blogPosts = [
  { slug: 'guide-to-first-vibrator', title: 'Your First Vibrator: A Complete Buyer\'s Guide for 2026', excerpt: 'Confused by the endless options? We break down everything you need to know to choose your first vibe with confidence.', category: 'Guides', readTime: '8 min', date: 'Apr 15, 2026', image: '' },
  { slug: 'couples-toys-that-actually-work', title: '10 Couples\' Toys That Actually Improve Your Intimate Life (Tested & Reviewed)', excerpt: 'We spent 3 months testing the most popular couples toys. Here are the ones worth your money — and which to skip.', category: 'Reviews', readTime: '12 min', date: 'Apr 10, 2026', image: '' },
  { slug: 'kegel-exercises-guide', title: 'Kegel Exercises: The Complete Science-Backed Guide', excerpt: 'Everything you need to know about pelvic floor exercises — benefits, techniques, and how to use Kegel balls safely.', category: 'Wellness', readTime: '6 min', date: 'Apr 5, 2026', image: '' },
  { slug: 'lingerie-confidence-guide', title: 'How Lingerie Can Transform Your Body Confidence', excerpt: 'It\'s not about looking good for someone else. It\'s about feeling good in your own skin. Here\'s how.', category: 'Lifestyle', readTime: '5 min', date: 'Mar 28, 2026', image: '' },
  { slug: 'sex-tech-innovation-2026', title: 'The State of Sex Tech in 2026: What\'s New & What\'s Coming', excerpt: 'From AI-powered devices to app-controlled experiences — here\'s what the future of intimate wellness looks like.', category: 'Tech', readTime: '10 min', date: 'Mar 20, 2026', image: '' },
  { slug: 'discreet-shipping-explained', title: 'Discreet Shipping: How It Works & Why It Matters', excerpt: 'A complete guide to discreet packaging, billing privacy, and keeping your purchases completely private.', category: 'Info', readTime: '4 min', date: 'Mar 15, 2026', image: '' },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><div className="page-header">
      <h1>The ZENEIO Blog</h1><p>Intimate wellness guides, product reviews, and industry insights</p></div>

      <div className="section-container pb-24">
        {/* Featured Post */}
        <Link href={`/blog/${blogPosts[0].slug}`} className="group block mb-12">
          <div className="glass rounded-3xl overflow-hidden lg:flex" style={{ minHeight: '400px' }}>
            <div className="lg:w-[55%] aspect-[16/10] lg:aspect-auto bg-gradient-to-br from-zeneio-accent/10 to-zeneio-purple/5 flex items-center justify-center text-white/5 text-7xl font-black">IMG</div>
            <div className="lg:w-[45%] p-8 lg:p-10 flex flex-col justify-center space-y-4">
              <span className="badge badge-new w-fit">{blogPosts[0].category}</span>
              <h2 className="text-heading-2 sm:text-heading-1 font-bold leading-tight group-hover:text-zeneio-accent transition-colors">{blogPosts[0].title}</h2>
              <p className="text-body text-white/45 leading-relaxed">{blogPosts[0].excerpt}</p>
              <p className="text-sm text-white/30">{blogPosts[0].date} · {blogPosts[0].readTime}</p>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{blogPosts.slice(1).map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="glass rounded-2xl overflow-hidden group hover:border-white/15 transition-all">
            <div className="aspect-video bg-gradient-to-br from-zeneio-gray/50 to-zeneio-darker flex items-center justify-center text-white/5 text-4xl font-black group-hover:text-white/10 transition-colors">IMG</div>
            <div className="p-5 space-y-2.5">
              <span className="text-[11px] font-bold tracking-wider uppercase text-zeneio-accent/70">{post.category}</span>
              <h3 className="font-bold text-base leading-snug line-clamp-2 group-hover:text-zeneio-accent transition-colors">{post.title}</h3>
              <p className="text-sm text-white/35 line-clamp-2">{post.excerpt}</p>
              <p className="text-xs text-white/25 pt-1">{post.date} · {post.readTime}</p>
            </div>
          </Link>
        ))}</div>

        {/* Load More */}
        <div className="text-center mt-12"><button className="btn-outline">Load More Articles</button></div>
      </div>
    </div>
  );
}
