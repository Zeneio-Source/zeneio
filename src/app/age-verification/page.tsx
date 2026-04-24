'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, X } from 'lucide-react';

export default function AgeVerificationPage() {
  const router = useRouter();
  const [denied, setDenied] = useState(false);

  const handleEnter = () => {
    // Set a cookie/session to remember verification
    if (typeof window !== 'undefined') {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 1);
      document.cookie = `zeneio_age_verified=1; expires=${expiry.toUTCString()}; path=/; SameSite=Strict`;
    }
    router.push('/');
  };

  const handleDeny = () => {
    setDenied(true);
  };

  return (
    <div className="fixed inset-0 bg-zeneio-black z-[9999] flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zeneio-purple/[0.08] via-transparent to-zeneio-accent/[0.06]" />

      {!denied ? (
        <div className="relative z-10 max-w-sm w-full text-center">
          {/* Logo */}
          <div className="text-3xl font-black tracking-tighter mb-2">
            ZENEIO<span className="text-zeneio-accent">.</span>
          </div>

          {/* Warning Icon */}
          <div className="w-16 h-16 rounded-full bg-zeneio-accent/10 border border-zeneio-accent/20 flex items-center justify-center mx-auto my-8">
            <AlertTriangle size={28} className="text-zeneio-accent" />
          </div>

          {/* Age Gate Content */}
          <h1 className="text-2xl font-bold mb-3">Are you 18 or older?</h1>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            This website contains products intended for adults only. By entering, you confirm that you are at least 18 years of age and that you are legally permitted to view such content in your jurisdiction.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleEnter}
              className="w-full py-4 rounded-xl bg-zeneio-accent hover:bg-zeneio-accent/90 text-black font-bold text-sm tracking-wide transition-all active:scale-[0.98]"
            >
              YES, I AM 18+
            </button>
            <button
              onClick={handleDeny}
              className="w-full py-4 rounded-xl border border-white/10 hover:border-white/20 text-white/40 hover:text-white/60 font-medium text-sm tracking-wide transition-all"
            >
              No, I am under 18
            </button>
          </div>

          {/* Footer note */}
          <p className="text-[10px] text-white/20 mt-8 leading-relaxed">
            By entering this site, you agree to our{' '}
            <a href="/terms" className="underline hover:text-white/30">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="underline hover:text-white/30">Privacy Policy</a>.
            <br />
            This site uses discreet billing — charges appear as "ZNE LLC".
          </p>
        </div>
      ) : (
        <div className="relative z-10 max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
            <X size={28} className="text-red-400" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Access Denied</h1>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            This website is intended for adults only. We cannot allow access to individuals under the age of 18.
          </p>
          <p className="text-white/25 text-xs">
            You are being redirected...
          </p>
          <script dangerouslySetInnerHTML={{ __html: `setTimeout(() => { window.location.href = 'https://www.google.com'; }, 3000);` }} />
        </div>
      )}
    </div>
  );
}
