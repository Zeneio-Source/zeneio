import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  // Static mock data for demo
  const product = {
    name: params.slug.toUpperCase().replace('-', ' '),
    price: "$199.00",
    tag: "Flagship Engineering",
    desc: "The pinnacle of intimate electronics. Precision-tuned dual motors delivering unparalleled resonance and bio-feedback responsiveness.",
    specs: {
      "Motor": "Dual-Pulse Gen-4",
      "Material": "Satin-Finish Bio-Silicone",
      "Battery": "240 Minutes Ultra-Efficiency",
      "Waterproof": "IPX8 (Deep Sea Protocol)",
      "Charging": "Wireless Induction",
      "Noise": "< 18dB Stealth Mode"
    },
    img: "https://sc02.alicdn.com/kf/A1dabe5d4edc840148a73a3f6496a1328S.png"
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Product Image Stage */}
            <div className="relative aspect-square rounded-[60px] overflow-hidden glass flex items-center justify-center p-20 group">
              <div className="absolute inset-0 bg-[#81D8D0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <img src={product.img} className="relative z-10 w-full h-full object-contain mix-blend-screen opacity-90 group-hover:scale-110 transition-transform duration-1000" alt={product.name} />
              <div className="absolute bottom-10 left-10 text-[9px] font-black uppercase tracking-[0.5em] text-white/10">Rendering ID: {params.slug}-ALPHA</div>
            </div>

            {/* Product Engineering Specs */}
            <div>
              <div className="inline-block glass px-4 py-2 rounded-full text-[9px] uppercase tracking-[0.4em] font-bold mb-8 text-[#81D8D0] border-[#81D8D0]/20">
                {product.tag}
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6">{product.name}</h1>
              <p className="text-2xl font-light text-[#81D8D0] mb-10 tracking-widest">{product.price}</p>
              
              <p className="text-white/30 text-lg font-light leading-relaxed mb-12 tracking-wide border-l border-white/10 pl-8">
                {product.desc}
              </p>

              <div className="grid grid-cols-2 gap-x-12 gap-y-8 mb-16">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="border-b border-white/5 pb-4">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#81D8D0] font-black mb-2">{key}</p>
                    <p className="text-sm font-bold text-white/80">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-6">
                <button className="btn-zeneio flex-1">Add to Collection</button>
                <button className="glass px-10 py-5 rounded-full text-[10px] uppercase font-black tracking-widest text-white/60 hover:text-white transition-all">Specs PDF</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Tech Deep-Dive */}
      <section className="py-40 bg-black/40 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-black mb-10 uppercase italic tracking-tighter text-glow">The Gen-4 Engine</h2>
            <p className="text-white/20 text-xl leading-relaxed font-light uppercase tracking-widest">
                Developed in collaboration with haptic engineers, our motor technology focuses on low-frequency resonance that bypasses skin-level irritation to reach deep neural pathways.
            </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
