'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';


export default function SetupPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSetup = async () => {
    setStatus('loading');
    
    try {
      const res = await fetch('/api/setup', { method: 'POST' });
      
      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        console.error('Setup failed:', data.error || res.statusText);
      }
    } catch (err) {
      console.error('Network error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-zeneio-black flex items-center justify-center px-4">
      <Navbar />
      
      <div className="max-w-md w-full glass rounded-2xl p-8 text-center animate-fade-up space-y-6 mt-20 mb-20">
        {/* Icon */}
        <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-colors ${
          status === 'success' ? 'bg-green-500/15' : 
          status === 'error' ? 'bg-red-500/15' : 
          'bg-zeneio-accent/10'
        }`}>
          <span className="text-3xl">
            {status === 'success' ? '✅' : status === 'error' ? '❌' : '⚙️'}
          </span>
        </div>

        <div>
          <h1 className="text-heading-3 font-bold mb-2">Database Setup</h1>
          <p className="text-sm text-white/40 leading-relaxed">
            {status === 'idle' && "Click below to initialize the database with product data, categories, and seed content."}
            {status === 'loading' && "Setting up your database tables and importing products..."}
            {status === 'success' && "Database setup completed successfully! Your store is ready."}
            {status === 'error' && "Something went wrong. Please try again or contact support."}
          </p>
        </div>

        {status === 'idle' && (
          <button onClick={handleSetup} className="btn-accent w-full justify-center py-4 text-base">
            Initialize Database
          </button>
        )}

        {status === 'loading' && (
          <div className="flex justify-center">
            <svg className="animate-spin h-8 w-8 text-zeneio-accent" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
            </svg>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <p className="text-sm text-green-400 font-medium">✓ All tables created</p>
            <p className="text-sm text-green-400 font-medium">✓ 15 products imported</p>
            <p className="text-sm text-green-400 font-medium">✓ Categories configured</p>
            <a href="/products" className="btn-accent w-full justify-center block">
              Go to Store →
            </a>
          </div>
        )}

        {status === 'error' && (
          <button onClick={handleSetup} className="btn-outline w-full justify-center py-3">
            Try Again
          </button>
        )}
      </div>

    </div>
  );
}
