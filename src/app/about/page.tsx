import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Target, Users, Globe, Award, Zap, Heart } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Privacy First', desc: 'Every order ships in plain, unmarked packaging. Your privacy is non-negotiable.' },
  { icon: Target, title: 'Precision Engineering', desc: 'Medical-grade materials, whisper-quiet motors, and intuitive design in every product.' },
  { icon: Users, title: 'Inclusive Design', desc: 'Products for all bodies, all orientations, all experience levels. No judgment, ever.' },
  { icon: Globe, title: 'Global Discreet Shipping', desc: 'Fast, discreet delivery to 50+ countries. What happens at home stays at home.' },
];

const team = [
  { name: 'Dr. Elena Chen', role: 'Chief Product Engineer', bio: 'Former biomedical engineer at a leading medical device company. Holds 12 patents in intimate wellness technology.' },
  { name: 'Marcus Webb', role: 'Head of UX & Design', bio: '10+ years designing products that feel as good as they look. Minimalist by philosophy.' },
  { name: 'Dr. Aisha Patel', role: 'Chief Wellness Officer', desc: 'Certified sex therapist and advocate for sexual health education worldwide.' },
  { name: 'James Liu', role: 'CTO', bio: 'Ex-Apple engineer building the tech infrastructure behind ZENEIO\'s smart products.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zeneio-black">
      <Navbar />
      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zeneio-accent/[0.04] via-transparent to-zeneio-purple/[0.03]" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-zeneio-accent mb-4">About ZENEIO</p>
          <h1 className="text-display sm:text-heading-1 font-black leading-tight mb-6">
            We Believe Intimacy Deserves<br/><span className="text-gradient">Better Technology</span>
          </h1>
          <p className="text-body-lg text-white/45 leading-relaxed mx-auto">
            Founded in 2024, ZENEIO was born from a simple observation: most adult products are either cheap junk or embarrassingly overpriced. We set out to build something different — precision-engineered products that respect your body, your privacy, and your intelligence.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-container py-16 lg:py-24 border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <p className="text-xs font-bold tracking-widest uppercase text-zeneio-accent">Our Mission</p>
            <h2 className="text-heading-2 font-bold">Redefining Intimate Wellness Through Bio-Tech</h2>
            <div className="space-y-4 text-body text-white/45 leading-relaxed">
              <p>We combine cutting-edge bio-engineering with deep understanding of human anatomy and pleasure science. Every ZENEIO product undergoes rigorous testing — not just for safety, but for satisfaction.</p>
              <p>Our team of engineers, designers, and wellness experts work together to create products that feel like they belong in the 21st century. Because your most private moments deserve nothing less than excellence.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{ value: '2024', label: 'Founded' }, { value: '50K+', label: 'Customers' }, { value: '30+', label: 'Products' }, { value: '50+', label: 'Countries' }].map(s => (
              <div key={s.label} className="glass rounded-2xl p-6 text-center"><p className="text-3xl font-black text-gradient">{s.value}</p><p className="text-sm text-white/40 mt-1">{s.label}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-white/5"><div className="section-container py-16 lg:py-24">
        <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-2 text-center">What We Stand For</p>
        <h2 className="text-heading-2 font-bold text-center mb-10">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{values.map(v => (
          <div key={v.title} className="glass rounded-2xl p-6 group hover:border-white/15 transition-all">
            <v.icon size={28} className="text-zeneio-accent mb-4" />
            <h3 className="font-bold text-sm mb-2">{v.title}</h3>
            <p className="text-sm text-white/40 leading-relaxed">{v.desc}</p>
          </div>
        ))}</div>
      </div></section>

      {/* Team */}
      <section className="bg-zeneio-darker border-y border-white/5"><div className="section-container py-16 lg:py-24">
        <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-2 text-center">The People Behind It</p>
        <h2 className="text-heading-2 font-bold text-center mb-10">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{team.map(m => (
          <div key={m.name} className="text-center group">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-zeneio-accent/20 to-zeneio-purple/20 flex items-center justify-center text-2xl font-bold text-zeneio-accent mb-4 group-hover:scale-105 transition-transform">{m.name.charAt(0)}</div>
            <h3 className="font-bold text-sm">{m.name}</h3>
            <p className="text-xs text-zeneio-accent mt-0.5">{m.role}</p>
            <p className="text-xs text-white/35 mt-2 leading-relaxed line-clamp-3">{m.bio || m.desc || ''}</p>
          </div>
        ))}</div>
      </div></section>

      {/* CTA */}
      <section className="section-container py-20 text-center">
        <Heart size={48} className="mx-auto text-pink-400/20 mb-6" />
        <h2 className="text-heading-3 font-bold mb-3">Ready to Experience the Difference?</h2>
        <p className="text-white/40 mb-8 max-w-md mx-auto">Join 50,000+ customers who have upgraded their intimate moments.</p>
        <Link href="/products" className="btn-accent btn-lg">Shop Now →</Link>
      </section>

      <Footer />
    </div>
  );
}
