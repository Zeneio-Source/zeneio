import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About ZENEIO | Our Mission',
  description: 'Learn about ZENEIO - pioneering bio-tech wellness engineering since 2024.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block glass px-4 py-2 rounded-full text-[9px] uppercase tracking-[0.4em] font-bold mb-8 text-[#81D8D0] border-[#81D8D0]/20">
            Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic font-light leading-[0.9] mb-8">
            Engineering <span className="not-italic font-sans font-black text-glow uppercase">Intimacy</span>
          </h1>
          <p className="text-white/30 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            We are a collective of engineers, designers, and human behavior researchers 
            united by one belief: technology should enhance every dimension of the human experience.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6 bg-black/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-black tracking-tight uppercase italic mb-6">The Mission<span className="text-[#81D8D0]">.</span></h2>
            <div className="space-y-6 text-white/40 text-sm leading-relaxed">
              <p>Founded in 2024 in Tokyo, ZENEIO emerged from a simple observation: the wellness industry had been ignoring an entire category of human needs.</p>
              <p>We set out to apply the same precision engineering principles used in medical devices and consumer electronics to products that matter deeply to personal well-being.</p>
              <p>Every ZENEIO device is the result of 200+ hours of research, testing with real users across 12 countries, and iterative design based on feedback from thousands of individuals.</p>
            </div>
          </div>
          <div className="glass rounded-[40px] p-10 border border-white/5 space-y-6">
            {[
              { label: 'Founded', value: '2024' },
              { label: 'Headquarters', value: 'Tokyo, Japan' },
              { label: 'Products Shipped', value: '50,000+' },
              { label: 'Countries', value: '48' },
              { label: 'Team Size', value: '23 Engineers' },
              { label: 'R&D Investment', value: '$2.4M' },
            ].map((stat) => (
              <div key={stat.label} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                <span className="text-[9px] uppercase font-black tracking-[0.3em] text-white/30">{stat.label}</span>
                <span className="text-sm font-light text-[#81D8D0]">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-center mb-20">
            Our Principles<span className="text-[#81D8D0]">.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Precision First',
                desc: 'Every millimeter, every vibration pattern, every material choice is calculated. No guesswork, only data-driven design.',
              },
              {
                num: '02', 
                title: 'Privacy Sacred',
                desc: 'Your data is yours. Discreet shipping, no tracking, encrypted communications. What happens at ZENEIO stays private.',
              },
              {
                num: '03',
                title: 'Inclusive Design',
                desc: 'Products tested on diverse bodies, preferences, and abilities. Wellness is universal, so is our approach.',
              },
            ].map((value) => (
              <div key={value.num} className="glass rounded-[40px] p-10 border border-white/5 group hover:border-[#81D8D0]/20 transition-all duration-500">
                <div className="text-5xl font-black text-[#81D8D0]/20 mb-6 group-hover:text-[#81D8D0]/40 transition">{value.num}</div>
                <h3 className="text-xl font-black tracking-tight uppercase mb-4">{value.title}</h3>
                <p className="text-white/30 text-sm leading-relaxed font-light">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 bg-black/40">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic mb-6">Behind The Lab</h2>
          <p className="text-white/30 text-sm leading-relaxed max-w-xl mx-auto mb-12">
            Our team combines expertise from Sony R&D, Apple Human Interface, and Stanford Biodesign.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Dr. Yuki Tanaka', role: 'Chief Engineer', init: 'YT' },
              { name: 'Sarah Chen', role: 'Human Research Lead', init: 'SC' },
              { name: 'Marcus Webb', role: 'Product Design Director', init: 'MW' },
              { name: 'Elena Rossi', role: 'Materials Scientist', init: 'ER' },
            ].map((person) => (
              <div key={person.init} className="glass rounded-3xl p-6 border border-white/5">
                <div className="w-16 h-16 rounded-full bg-[#81D8D0]/10 flex items-center justify-center text-[#81D8D0] font-black text-lg mx-auto mb-4">
                  {person.init}
                </div>
                <h4 className="text-sm font-bold text-white/80">{person.name}</h4>
                <p className="text-[8px] uppercase tracking-widest text-white/30 mt-1">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-8">
          Ready to Explore?<span className="text-[#81D8D0]">.</span>
        </h2>
        <a href="/products" className="btn-zeneio text-black inline-block px-16 py-6 text-sm">
          View Collection
        </a>
      </section>

      <Footer />
    </div>
  );
}
