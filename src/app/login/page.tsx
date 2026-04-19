'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

import { useAuth } from '@/lib/auth-context';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already logged in
  if (typeof window !== 'undefined' && isAuthenticated) {
    if (typeof window !== 'undefined') router.push('/account');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    const result = await login(email, password);

    if (result.success) {
      router.push('/account');
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zeneio-black">
      <Navbar />
      
      <div className="section-container pt-28 pb-20">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block text-2xl font-black tracking-tighter mb-8">
              ZENEIO<span className="text-zeneio-accent">.</span>
            </Link>
            <h1 className="text-heading-2 font-bold mb-2">Welcome Back</h1>
            <p className="text-sm text-white/40">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400 text-center">
                {error}
              </div>
            )}

            <div>
              <label className="input-label">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-field pl-11"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="input-label !mb-0">Password</label>
                <a href="#" className="text-xs text-zeneio-accent hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-11 pr-11"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" defaultChecked className="rounded accent-zeneio-accent" />
              <label htmlFor="remember" className="text-sm text-white/50 cursor-pointer">Remember me</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-accent w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.75"/></svg>
                  Signing In...
                </span>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
              <p className="relative bg-transparent px-4 text-xs text-white/30 mx-auto w-fit">or</p>
            </div>

            {/* Social Login Options (visual only) */}
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="btn-outline !justify-center py-3 text-xs font-semibold">
                🅿️ PayPal
              </button>
              <button type="button" className="btn-outline !justify-center py-3 text-xs font-semibold">
                ✉️ Email OTP
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-zeneio-accent hover:underline font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
