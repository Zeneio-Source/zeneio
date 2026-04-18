'use client';

import { useState, useEffect } from 'react';

export default function AgeVerification() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('age-verified');
    if (!verified) {
      setShow(true);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem('age-verified', 'true');
    setShow(false);
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
      <div className="max-w-md w-full glass rounded-[40px] p-12 text-center shadow-2xl border border-white/10">
        <div className="mb-8 flex flex-col items-center gap-4">
            <img src="/logo.png" alt="Zeneio Logo" className="w-24 h-auto" />
            <span className="text-4xl font-black tracking-tighter italic uppercase text-white">
                ZENEIO<span className="text-[#81D8D0]">.</span>
            </span>
        </div>
        <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">Verification Required</h2>
        <p className="text-white/40 mb-10 leading-relaxed text-sm uppercase tracking-wider font-medium">
          This laboratory contains content engineered for adults. By entering, you confirm you are 18+ and adhere to our neural privacy protocols.
        </p>
        <div className="flex flex-col gap-4">
          <button 
            onClick={handleVerify}
            className="btn-zeneio w-full"
          >
            Enter Lab
          </button>
          <button 
            onClick={handleExit}
            className="w-full text-white/30 hover:text-white font-black text-[10px] uppercase tracking-[0.3em] py-4 transition-all"
          >
            Exit System
          </button>
        </div>
        <div className="mt-10 flex justify-center gap-4 opacity-20">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
