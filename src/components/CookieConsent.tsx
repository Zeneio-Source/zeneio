'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Settings, X, Cookie } from 'lucide-react';

type CookieConsent = 'accepted' | 'rejected' | null;

const COOKIE_NAME = 'zeneio_cookie_consent';

function getConsent(): CookieConsent {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'));
  if (!match) return null;
  return match[2] as CookieConsent;
}

function setConsent(value: 'accepted' | 'rejected') {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `${COOKIE_NAME}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

export default function CookieConsentBanner() {
  const [show, setShow] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === null) {
      // Small delay so it doesn't flash on page load
      const t = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const acceptAll = () => {
    setConsent('accepted');
    setShow(false);
  };

  const rejectAll = () => {
    setConsent('rejected');
    setShow(false);
  };

  const savePrefs = () => {
    setConsent('rejected'); // Default to rejected unless they accept
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      {/* Backdrop for preferences panel */}
      {showPrefs && (
        <div
          className="fixed inset-0 z-[200] bg-black/60"
          onClick={() => setShowPrefs(false)}
        />
      )}

      <div className="fixed bottom-0 left-0 right-0 z-[210] p-4 lg:p-6 animate-slide-up">
        {!showPrefs ? (
          // Main Banner
          <div className="max-w-5xl mx-auto bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5 p-6 lg:py-5 lg:px-8">
              {/* Icon + Text */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-zeneio-accent/10 border border-zeneio-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Cookie size={18} className="text-zeneio-accent" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white mb-1">We value your privacy</h3>
                  <p className="text-xs text-white/40 leading-relaxed">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.{' '}
                    <Link href="/privacy" className="underline hover:text-white/60">Privacy Policy</Link>
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 flex-shrink-0 w-full lg:w-auto">
                <button
                  onClick={rejectAll}
                  className="flex-1 lg:flex-none px-5 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-white/60 hover:text-white hover:border-white/20 transition-all"
                >
                  Reject All
                </button>
                <button
                  onClick={() => setShowPrefs(true)}
                  className="flex-1 lg:flex-none px-5 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-white/60 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <Settings size={12} /> Customize
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 lg:flex-none px-5 py-2.5 rounded-xl bg-zeneio-accent hover:bg-zeneio-accent/90 text-black text-xs font-bold transition-all"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Preferences Panel
          <div className="max-w-2xl mx-auto bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <Settings size={16} className="text-zeneio-accent" />
                <h3 className="text-sm font-bold text-white">Cookie Preferences</h3>
              </div>
              <button onClick={() => setShowPrefs(false)} className="text-white/30 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Essential */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Essential Cookies</p>
                  <p className="text-xs text-white/35 mt-1 leading-relaxed">Required for the site to function. Cannot be disabled.</p>
                </div>
                <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/40">Always Active</span>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Analytics</p>
                  <p className="text-xs text-white/35 mt-1 leading-relaxed">Help us understand how visitors interact with our site to improve your experience.</p>
                </div>
                <button
                  onClick={rejectAll}
                  className="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition-all"
                >
                  Enable
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Marketing</p>
                  <p className="text-xs text-white/35 mt-1 leading-relaxed">Used to deliver relevant ads and track ad campaign performance. We do not run third-party ads.</p>
                </div>
                <button
                  onClick={rejectAll}
                  className="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition-all"
                >
                  Enable
                </button>
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button onClick={rejectAll} className="flex-1 py-3 rounded-xl border border-white/10 text-xs font-semibold text-white/60 hover:text-white hover:border-white/20 transition-all">
                Save & Reject Non-Essential
              </button>
              <button onClick={acceptAll} className="flex-1 py-3 rounded-xl bg-zeneio-accent hover:bg-zeneio-accent/90 text-black text-xs font-bold transition-all">
                Accept All
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
