'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

import { useAuth, RegisterData } from '@/lib/auth-context';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterData>({
    email: '', password: '', name: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();

  if (typeof window !== 'undefined' && isAuthenticated) {
    router.push('/account');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password || !form.name) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const result = await register(form);

    if (result.success) {
      router.push('/account');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zeneio-black">
      <Navbar />

      <div className="section-container pt-28 pb-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block text-2xl font-black tracking-tighter mb-8">
              ZENEIO<span className="text-zeneio-accent">.</span>
            </Link>
            <h1 className="text-heading-2 font-bold mb-2">Create Account</h1>
            <p className="text-sm text-white/40">Join the ZENEIO community</p>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400 text-center">{error}</div>
            )}

            <div>
              <label className="input-label">Full Name *</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="input-label">Email Address *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="input-label">Password *</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Min. 6 characters"
                  className="input-field pl-11 pr-11"
                  required
                  minLength={6}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="input-label">Confirm Password *</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            {/* Age Verification */}
            <div className="glass rounded-xl p-4 flex items-start gap-3 bg-yellow-500/5 border-yellow-500/10">
              <span className="text-lg">⚠️</span>
              <p className="text-xs text-white/50 leading-relaxed">
                By creating an account, you confirm that you are <strong>18 years or older</strong>.
                All products on this site are intended for adult use only.
              </p>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" required className="rounded accent-zeneio-accent mt-0.5" />
              <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                I agree to the{' '}
                <Link href="/terms" className="text-zeneio-accent hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-zeneio-accent hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button type="submit" disabled={loading}
              className="btn-accent w-full justify-center py-3.5 text-base disabled:opacity-60">
              {loading ? 'Creating Account...' : <>Create Account <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-zeneio-accent hover:underline font-medium">Sign In</Link>
          </p>
        </div>
      </div>

    </div>
  );
}
