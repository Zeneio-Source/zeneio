import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Blog | ZENEIO - Wellness Insights',
  description: 'Expert articles on wellness technology, intimacy science, and bio-tech innovations.',
};

const blogPosts = [
  {
    slug: 'neural-sync-technology-explained',
    title: 'Neural-Sync Technology: How Your Body Controls the Experience',
    excerpt: 'Deep dive into the AI-powered haptic feedback system that adapts in real-time to your body\'s responses.',
    category: 'Technology',
    readTime: '8 min',
    date: 'Apr 15, 2026',
    image: '/blog/neural-sync.jpg',
  },
  {
    slug: 'guide-to-first-vibrator',
    title: 'The Complete Beginner\'s Guide to Choosing Your First Device',
    excerpt: 'Everything you need to know before your first purchase — from materials to motor types to finding what works for you.',
    category: 'Guide',
    readTime: '12 min',
    date: 'Apr 10, 2026',
    image: '/blog/beginner-guide.jpg',
  },
  {
    slug: 'science-of-intimate-wellness',
    title: 'The Science Behind Intimate Wellness: What Research Actually Says',
    excerpt: 'We analyzed 200+ peer-reviewed studies on sexual health and wellness. Here are the key findings that shaped our product design.',
    category: 'Science',
    readTime: '15 min',
    date: 'Apr 5, 2026',
    image: '/blog/science-wellness.jpg',
  },
  {
    slug: 'privacy-in-digital-age',
    title: 'Your Privacy Matters: How We Protect Every Purchase',
    excerpt: 'A transparent look at our data practices, shipping protocols, and why discretion is non-negotiable.',
    category: 'Privacy',
    readTime: '6 min',
    date: 'Mar 28, 2026',
    image: '/blog/privacy.jpg',
  },
  {
    slug: 'materials-matter-silicone-vs-tpe',
    title: 'Silicone vs TPE vs ABS: Why Material Choice Is Critical',
    excerpt: 'Not all materials are created equal. Learn why medical-grade silicone costs more — and why it\'s worth every penny.',
    category: 'Education',
    readTime: '10 min',
    date: 'Mar 20, 2026',
    image: '/blog/materials.jpg',
  },
  {
    slug: 'long-distance-connection',
    title: 'Staying Connected: App-Controlled Devices for Long-Distance Relationships',
    excerpt: 'How smart devices with partner sync features are transforming intimate connections across distances.',
    category: 'Lifestyle',
    readTime: '9 min',
    date: 'Mar 15, 2026',
    image: '/blog/long-distance.jpg',
  },
];

const categories = ['All', 'Technology', 'Guide', 'Science', 'Privacy', 'Education', 'Lifestyle'];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block glass px-4 py-2 rounded-full text-[9px] uppercase tracking-[0.4em] font-bold mb-8 text-[#81D8D0] border-[#81D8D0]/20">
            ZENEIO Journal
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic font-light leading-[0.9] mb-8">
            The Lab <span className="not-italic font-sans font-black text-glow uppercase">Notes</span>
          </h1>
          <p className="text-white/30 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Insights on wellness technology, intimacy science, and the future of human connection.
          </p>
        </div>

        {/* Categories */}
        <div className="max-w-3xl mx-auto mt-16 flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button key={cat} className={`px-8 py-3 rounded-full text-[9px] uppercase font-black tracking-[0.2em] border transition-all ${cat === 'All' ? 'bg-[#81D8D0] text-black border-[#81D8D0]' : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} 
              className="glass rounded-[40px] border border-white/5 overflow-hidden group hover:border-[#81D8D0]/20 transition-all duration-500">
              
              {/* Image placeholder */}
              <div className="aspect-[16/10] bg-gradient-to-br from-[#81D8D0]/10 to-white/5 flex items-center justify-center relative overflow-hidden">
                <span className="text-4xl font-serif italic text-[#81D8D0]/20 group-hover:text-[#81D8D0]/40 transition">Z</span>
                <div className="absolute top-4 left-4">
                  <span className="glass px-3 py-1 rounded-full text-[8px] uppercase font-black tracking-widest text-[#81D8D0]">{post.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4 text-[8px] uppercase tracking-widest text-white/20 font-bold">
                  <time>{post.date}</time>
                  <span>•</span>
                  <span>{post.readTime} read</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white/90 group-hover:text-[#81D8D0] transition mb-4 leading-tight">
                  {post.title}
                </h2>
                <p className="text-sm text-white/30 leading-relaxed line-clamp-3">{post.excerpt}</p>
                
                <div className="mt-6 flex items-center text-[9px] uppercase font-black tracking-[0.3em] text-[#81D8D0] group-hover:text-white transition">
                  Read Article <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-24 glass rounded-[50px] p-12 md:p-20 border border-white/5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[#81D8D0]/5 blur-[100px]"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic mb-4">
              Stay In The Loop<span className="text-[#81D8D0]">.</span>
            </h2>
            <p className="text-white/40 text-sm mb-10 leading-relaxed">
              Get weekly insights on wellness tech, exclusive early access to new products, and member-only discounts.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Your email address"
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#81D8D0]/50 focus:outline-none transition" />
              <button type="submit" className="btn-zeneio text-black px-10 py-4 text-xs whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-[8px] text-white/20 uppercase tracking-widest">
              No spam ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
