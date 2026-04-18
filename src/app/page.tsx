import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const products = [
  {
    id: 'neo',
    name: 'ZENEIO NEO',
    price: '$29.99',
    tag: 'AI-Sync Smart',
    desc: 'App-Controlled Bio-Feedback',
    img: 'https://m.media-amazon.com/images/I/31+tpXb5njL.jpg'
  },
  {
    id: 'wand',
    name: 'ZENEIO WAND',
    price: '$35.95',
    tag: 'Therapeutic Pro',
    desc: '8-Speed Deep Resonance',
    img: 'https://m.media-amazon.com/images/I/315e2bzqOqL.jpg',
    featured: true
  },
  {
    id: 'micro',
    name: 'ZENEIO MICRO',
    price: '$32.95',
    tag: 'Travel Precision',
    desc: 'Compact Sonic Engine',
    img: 'https://m.media-amazon.com/images/I/414i2cPg7yL.jpg'
  },
  {
    id: 'curve',
    name: 'ZENEIO CURVE',
    price: '$29.99',
    tag: 'Bio-Mimetic',
    desc: 'S-Shaped Neural Guidance',
    img: 'https://m.media-amazon.com/images/I/41378dve9gL.jpg'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* 2. Immersive Hero */}
        <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
            <div className="z-10 text-center lg:text-left">
              <div className="inline-block glass px-4 py-2 rounded-full text-[9px] uppercase tracking-[0.4em] font-bold mb-10 text-[#81D8D0] border-[#81D8D0]/20">
                Precision Engineered Wellness
              </div>
              <h1 className="text-7xl md:text-[9rem] font-serif italic font-light leading-[0.85] mb-8">
                Beyond <br /> <span className="not-italic font-sans font-black tracking-tighter text-glow uppercase">TOUCH</span>
              </h1>
              <p className="max-w-lg mx-auto lg:mx-0 text-white/30 text-lg font-light leading-relaxed mb-14 tracking-wide">
                Introducing **Neural-Sync** architecture. Medical-grade materials meeting 2026 haptic intelligence. Experience intimacy evolved through pure engineering.
              </p>
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
                <button className="btn-zeneio text-black">Explore Engineering</button>
                <button className="px-8 py-4 text-[10px] uppercase font-black tracking-[0.3em] text-white/40 hover:text-white transition">Watch Film</button>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-[#81D8D0]/5 rounded-full blur-[100px] group-hover:bg-[#81D8D0]/10 transition duration-1000"></div>
              <img src="https://sc02.alicdn.com/kf/A1dabe5d4edc840148a73a3f6496a1328S.png" className="relative z-10 w-full h-auto object-cover rounded-3xl opacity-80 group-hover:opacity-100 transition duration-1000" alt="ZENEIO PRO" />
              
              {/* Real-time Data Overlays */}
              <div className="absolute top-10 right-0 glass p-5 rounded-2xl animate-pulse hidden md:block border border-white/10">
                <p className="text-[8px] uppercase font-black text-white/30 tracking-widest mb-1">Haptic Engine</p>
                <p className="text-xl font-black text-[#81D8D0]">Gen-4 Dual</p>
              </div>
              <div className="absolute bottom-20 left-0 glass p-5 rounded-2xl hidden md:block border border-white/10">
                <p className="text-[8px] uppercase font-black text-white/30 tracking-widest mb-1">Silence Rating</p>
                <p className="text-xl font-black italic"> &lt; 20dB</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Curated Engineering */}
        <section className="py-32 px-6 bg-black/40">
          <div className="max-w-7xl mx-auto mb-24">
            <div className="flex flex-col md:flex-row justify-between items-end">
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic">The Lineup<span className="text-[#81D8D0]">.</span></h2>
              <p className="max-w-xs text-white/30 text-sm font-light mt-6 md:mt-0 leading-relaxed uppercase tracking-widest text-right">Verified precision tools. Tested for 128 anatomical stress points.</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p.id} className={`product-card p-8 rounded-[40px] flex flex-col items-center text-center ${p.featured ? 'border-[#81D8D0]/30' : ''}`}>
                <div className="relative w-full aspect-square mb-10 overflow-hidden rounded-3xl bg-white/5 flex items-center justify-center p-12">
                  <img src={p.img} className="w-full h-full object-contain mix-blend-screen opacity-70 group-hover:opacity-100 transition duration-500" alt={p.name} />
                </div>
                <div className="text-[8px] uppercase font-black tracking-[0.3em] text-[#81D8D0] mb-4">{p.tag}</div>
                <h3 className="text-2xl font-black tracking-tight mb-2 uppercase">{p.name}</h3>
                <p className="text-white/30 text-xs mb-8 font-light italic">{p.desc}</p>
                <div className="mt-auto text-xl font-light tracking-widest">{p.price}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
