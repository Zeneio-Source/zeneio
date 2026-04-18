import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#81D8D0]/3 blur-[100px]"></div>

        <div className="relative z-10 text-center max-w-lg">
          <div className="text-[12rem] md:text-[15rem] font-serif italic font-light leading-none text-white/[0.03] select-none -mt-10">
            404
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-4 -mt-24 relative z-10">
            Page Not Found<span className="text-[#81D8D0]">.</span>
          </h1>
          
          <p className="text-white/30 text-base font-light leading-relaxed mb-12 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-zeneio text-black px-12 py-5 inline-block">
              Go Home
            </Link>
            <Link href="/products" className="px-12 py-5 rounded-full text-[10px] uppercase font-black tracking-[0.3em] text-white/40 border border-white/10 hover:border-white/30 hover:text-white transition inline-block">
              Browse Products
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
