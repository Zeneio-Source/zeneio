import React from 'react';import Navbar from '@/components/Navbar';import { Cpu, Battery, Waves, Thermometer } from 'lucide-react';

const technologies = [
  { icon: Cpu, title: 'AI Learning Engine', desc: 'Our proprietary algorithms learn user preferences over time to deliver personalized experiences that get better with every use.' },
  { icon: Waves, title: 'Rumbly Motor Tech', desc: 'Unlike cheap buzzy motors, our custom-designed rumbly motors deliver deep, resonant vibrations that feel natural — not mechanical.' },
  { icon: Battery, title: 'Long-Life Power', desc: 'High-density Li-ion batteries with intelligent power management. Up to 180 minutes of continuous use on a single charge.' },
  { icon: Thermometer, title: 'Active Heating', desc: 'Precision temperature control (38°C–42°C) with medical-grade thermal sensors for realistic body-warmth sensation.' },
];

export default function EngineeringPage() {
  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar /><section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zeneio-purple/[0.05] via-transparent to-zeneio-accent/[0.03]" />
      <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
        <p className="text-xs font-bold tracking-[0.25em] uppercase text-zeneio-purple mb-4">Our Technology</p>
        <h1 className="text-display sm:text-heading-1 font-black leading-tight mb-6">Engineering<br/><span className="text-gradient">That Feels Right</span></h1>
        <p className="text-body-lg text-white/45 leading-relaxed">Every ZENEIO product is built on a foundation of bio-engineering research, premium materials science, and obsessive attention to detail.</p>
      </div></section>

      <div className="section-container pb-24">
        {/* Technologies Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">{technologies.map(tech => (
          <div key={tech.title} className="glass rounded-2xl p-6 sm:p-8 group hover:border-white/10 transition-all">
            <tech.icon size={28} className="text-zeneio-accent mb-4" />
            <h3 className="font-bold text-lg mb-2">{tech.title}</h3>
            <p className="text-sm text-white/40 leading-relaxed">{tech.desc}</p>
          </div>))}</div>

        {/* Materials Section */}
        <section className="glass rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-zeneio-accent mb-3">Materials Science</p>
          <h2 className="text-heading-2 font-bold mb-6">Only The Best For Your Body</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[{ name: 'Medical Silicone', grade: 'Platinum-Cured', icon: '🧪' }, { name: 'ABS Plastic', grade: 'Food-Safe Grade', icon: '⚙️' }, { name: 'Premium TPE', grade: 'Phthalate-Free', icon: '💎' }, { name: 'Stainless Steel', grade: '#316 Medical', icon: '🔩' }].map(mat => (
              <div key={mat.name} className="glass rounded-xl p-4 group hover:bg-white/5 transition-all"><span className="text-2xl block mb-2">{mat.icon}</span><p className="font-semibold text-sm">{mat.name}</p><p className="text-xs text-white/30 mt-0.5">{mat.grade}</p></div>
            ))}
          </div>
        </section>

        {/* Quality Standards */}
        <section className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-heading-3 font-bold">Quality You Can Trust</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[{ label: 'ISO 13485', sub: 'Certified' }, { label: 'CE Marked', sub: 'EU Compliant' }, { label: 'FDA Registered', sub: 'Facility' }].map(cert => (
              <div key={cert.label} className="glass rounded-xl p-5"><p className="font-black text-xl text-gradient">{cert.label}</p><p className="text-xs text-white/35 mt-1">{cert.sub}</p></div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
