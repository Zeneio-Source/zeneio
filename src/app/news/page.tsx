'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const newsArticles = [
  { slug: 'zeneio-launches-ai-vibrator', title: 'ZENEIO Unveils AI-Powered Vibrator with Personalized Learning Technology', excerpt: 'The new APEX Elite learns user preferences over time and syncs with a companion app for long-distance partner control.', date: 'Apr 18, 2026', source: 'TechCrunch' },
  { slug: 'adult-wellness-market-2026', title: 'Global Intimate Wellness Market Projected to Reach $45B by 2028', excerpt: 'New industry report highlights growing demand for premium, tech-enabled intimate products among Gen Z and Millennial consumers.', date: 'Apr 12, 2026', source: 'Bloomberg' },
  { slug: 'discreet-shipping-trends', title: 'The Rise of Discreet E-Commerce: How Privacy is Reshaping Online Shopping', excerpt: 'A deep dive into why discreet shipping has become a non-negotiable expectation for adult product consumers worldwide.', date: 'Apr 5, 2026', source: 'Forbes' },
  { slug: 'sustainable-sex-toys', title: 'Can Sex Toys Be Eco-Friendly? The Brands Leading the Green Movement', excerpt: 'From biodegradable materials to solar-powered chargers — how ZENEIO and competitors are addressing environmental concerns in the adult industry.', date: 'Mar 28, 2026', source: 'Wired' },
  { slug: 'body-safe-materials-guide', title: 'Why Medical-Grade Silicone Matters (And What to Avoid)', excerpt: 'Consumer safety advocates call for stricter regulations on body-safe materials in adult products after recent recalls.', date: 'Mar 20, 2026', source: 'Reuters' },
  { slug: 'valentines-day-sales-record', title: "ZENEIO Reports Record Valentine's Day Sales, Up 340% YoY", excerpt: 'The bio-tech wellness brand attributes growth to its focus on quality over quantity and strong word-of-mouth referrals.', date: 'Feb 20, 2026', source: 'Business Insider' },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><div className="page-header">
      <h1>Press & News</h1><p>Latest updates from ZENEIO and the industry</p></div>

      <div className="section-container pb-24 max-w-3xl mx-auto space-y-6">
        {newsArticles.map(article => (
          <Link key={article.slug} href={`/news/${article.slug}`} className="group glass rounded-2xl p-6 sm:p-8 block hover:border-white/10 transition-all">
            <div className="flex items-center gap-2 mb-3"><span className="text-[11px] font-bold tracking-wider uppercase text-zeneio-purple/80">{article.source}</span><span className="w-1 h-1 rounded-full bg-white/15" /><span className="text-xs text-white/30">{article.date}</span></div>
            <h2 className="font-bold text-lg sm:text-xl leading-snug group-hover:text-zeneio-accent transition-colors mb-3">{article.title}</h2>
            <p className="text-sm text-white/40 leading-relaxed line-clamp-2">{article.excerpt}</p>
          </Link>
        ))}
      </div>

      <Footer /></div>
  );
}
