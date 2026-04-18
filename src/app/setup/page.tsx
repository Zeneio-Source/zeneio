'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page auto-triggers database initialization on first visit
export default function SetupPage() {
  const router = useRouter();

  useEffect(() => {
    async function initDB() {
      try {
        await fetch('/api/setup', { method: 'POST' });
      } catch {
        // Silently fail
      }
      router.push('/');
    }
    initDB();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#81D8D0] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/40 text-sm uppercase tracking-widest">Initializing...</p>
      </div>
    </div>
  );
}
