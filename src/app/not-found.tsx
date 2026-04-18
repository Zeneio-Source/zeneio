import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zeneio-black flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto animate-fade-up">
        <div className="text-8xl sm:text-9xl font-black text-gradient leading-none mb-4">404</div>
        <h1 className="text-heading-2 font-bold mb-3">Page Not Found</h1>
        <p className="text-white/40 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Maybe it&apos;s in a better place now.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link href="/" className="btn-accent"><Home size={16} /> Go Home</Link>
          <Link href="/products" className="btn-outline"><Search size={16} /> Browse Products</Link>
          <Link href="/contact" className="btn-ghost">Contact Us</Link>
        </div>

        <p className="text-xs text-white/20">
          Error code: 404 · Page missing · Need help? <Link href="/contact" className="underline hover:text-white transition-colors">Contact support</Link>
        </p>
      </div>
    </div>
  );
}
