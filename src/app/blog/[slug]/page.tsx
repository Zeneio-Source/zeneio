import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: '[slug] | ZENEIO Blog',
  description: 'ZENEIO Blog Article',
};

// This would be dynamic in a real app - using params for now
const article = {
  title: 'Neural-Sync Technology: How Your Body Controls the Experience',
  category: 'Technology',
  date: 'April 15, 2026',
  readTime: '8 min read',
  author: 'Dr. Yuki Tanaka',
  authorRole: 'Chief Engineer, ZENEIO Labs',
  
  content: `
    <p class="lead">For decades, personal wellness devices have operated on one simple principle: you press a button, it vibrates. That was enough — until we asked ourselves: <em>what if your body could control the experience?</em></p>
    
    <h2>The Problem with Static Vibration</h2>
    <p>Traditional devices deliver the same pattern regardless of how your body responds. It's like listening to music at the same volume whether you're relaxed or excited. The result? A significant percentage of users report that "it doesn't quite work for me."</p>
    
    <p>Our research team spent 18 months studying physiological responses during intimate moments. We measured heart rate variability, skin conductance, muscle tension patterns, and respiratory rhythm across 2,400 participants.</p>

    <blockquote>"The human body is constantly communicating its state. Neural-Sync is simply the first technology to listen." <cite>— Dr. Yuki Tanaka, Chief Engineer</cite></blockquote>

    <h2>How Neural-Sync Works</h2>
    <p>Neural-Sync uses a proprietary array of bio-sensors integrated into our device casing:</p>
    
    <ul>
      <li><strong>Micro-strain sensors</strong> detect muscle engagement levels in real-time</li>
      <li><strong>Temperature differential mapping</strong> identifies arousal patterns</li>
      <li><strong>Pressure-sensitive zones</strong> adapt intensity based on contact pressure</li>
      <li><strong>Rhythmic sync algorithm</strong> matches vibration patterns to breathing rate</li>
    </ul>

    <h2>The Four Modes</h2>
    
    <h3>1. Adaptive Mode (Default)</h3>
    <p>The device continuously monitors and adjusts. Start gentle, build naturally, peak when your body signals readiness. No buttons needed after initial activation.</p>

    <h3>2. Learning Mode</h3>
    <p>Over 5 sessions, Neural-Sync learns your unique response profile. By session 6, it anticipates what you want before you know it yourself.</p>

    <h3>3. Partner Sync Mode</h3>
    <p>Connect via the ZENEIO app to sync with a partner's device. Their responses influence your experience, creating a shared feedback loop across any distance.</p>

    <h3>4. Manual Override</h3>
    <p>Full control via app or onboard button. Neural-Sync data still collects for learning purposes but doesn't drive output directly.</p>

    <h2>Privacy by Design</h2>
    <p>All bio-data is processed locally on the device. Nothing leaves your possession unless you explicitly choose to share anonymized data for research (opt-in only).</p>
    <p>The sensor array is designed to be indistinguishable from standard device texture — no visible components or unusual features.</p>

    <h2>What's Next</h2>
    <p>Our Gen-5 roadmap includes predictive AI models trained on aggregated anonymous data, EEG integration for neural-pattern matching, and cross-device ecosystems that extend beyond intimate wellness into full-body health monitoring.</p>

    <p>Neural-Sync isn't just a feature. It's the beginning of a new category: <strong>bio-responsive wellness technology</strong>.</p>
  `,
  
  relatedPosts: [
    { slug: 'guide-to-first-vibrator', title: 'The Complete Beginner\'s Guide' },
    { slug: 'science-of-intimate-wellness', title: 'The Science Behind Intimate Wellness' },
  ],
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Article Header */}
      <article className="pt-40 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link href="/blog" className="inline-flex items-center text-[9px] uppercase font-black tracking-[0.3em] text-white/30 hover:text-[#81D8D0] transition mb-12">
            ← Back to Journal
          </Link>

          {/* Category & Date */}
          <div className="flex items-center gap-4 mb-8">
            <span className="glass px-4 py-2 rounded-full text-[9px] uppercase font-black tracking-widest text-[#81D8D0] border-[#81D8D0]/20">
              {article.category}
            </span>
            <time className="text-[9px] uppercase tracking-widest text-white/30 font-bold">{article.date}</time>
            <span className="text-[9px] text-white/20">{article.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-serif italic font-light leading-[0.95] mb-10 text-white">
            {article.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-4 pb-12 border-b border-white/5 mb-12">
            <div className="w-12 h-12 rounded-full bg-[#81D8D0]/10 flex items-center justify-center text-[#81D8D0] font-bold">YT</div>
            <div>
              <p className="text-sm font-bold text-white/80">{article.author}</p>
              <p className="text-[9px] text-white/30 uppercase tracking-wider">{article.authorRole}</p>
            </div>
          </div>

          {/* Content */}
          <div 
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:text-white prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
              prose-p:text-white/50 prose-p:leading-relaxed
              prose-a:text-[#81D8D0] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-li:text-white/50
              prose-blockquote:border-l-[#81D8D0]/30 prose-blockquote:bg-white/[0.02] prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:pl-8 prose-blockquote:not-italic
              [&_.lead]:text-lg [&_.lead]:text-white/70"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="mt-16 pt-10 border-t border-white/5 flex flex-wrap gap-3">
            {['Technology', 'Innovation', 'Wellness', 'Research', 'AI'].map((tag) => (
              <span key={tag} className="glass px-4 py-2 rounded-full text-[9px] uppercase tracking-widest text-white/30 border border-white/5">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-24 px-6 bg-black/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black tracking-tight uppercase italic text-[#81D8D0]/80 mb-10">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {article.relatedPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}
                className="glass rounded-3xl p-8 border border-white/5 group hover:border-[#81D8D0]/20 transition-all">
                <h3 className="text-lg font-bold text-white/80 group-hover:text-[#81D8D0] transition">{post.title}</h3>
                <p className="text-sm text-white/30 mt-2 group-hover:text-white/50 transition">Read more →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
