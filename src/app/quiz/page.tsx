'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PleasureQuiz() {
  const [step, setStep] = useState(1);

  const steps = [
    {
      q: "What is your primary focus?",
      options: ["Sensory Exploration", "Intense Climax", "Daily Wellness"]
    },
    {
      q: "Preferred stimulation type?",
      options: ["Air Pulse (Touchless)", "Deep Vibration", "Constant Heat"]
    },
    {
        q: "How experienced are you with Zeneio tech?",
        options: ["First Timer", "Regular User", "Tech Enthusiast"]
    }
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      alert("Algorithm Complete: We recommend ZENEIO PRO for your profile.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="min-h-screen flex items-center justify-center pt-32 pb-20 px-6">
        <div className="max-w-2xl w-full glass rounded-[60px] p-16 border-white/5 relative overflow-hidden">
          {/* Animated Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#81D8D0]/5 rounded-full blur-3xl"></div>

          <div className="flex justify-between items-center mb-16">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#81D8D0]">Zeneio Algorithm</span>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Step 0{step} / 03</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-12 tracking-tighter uppercase italic leading-tight">
            {steps[step - 1].q}
          </h2>

          <div className="flex flex-col gap-5">
            {steps[step - 1].options.map((option, i) => (
              <button 
                key={i}
                onClick={handleNext}
                className="w-full py-6 px-10 rounded-3xl bg-white/5 border border-white/5 text-left hover:bg-white/10 hover:border-[#81D8D0]/50 transition-all group flex justify-between items-center"
              >
                <span className="text-[11px] font-black text-white/40 group-hover:text-[#81D8D0] uppercase tracking-[0.2em] transition-colors">{option}</span>
                <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-1.5 h-1.5 bg-[#81D8D0] rounded-full"></div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-16 w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div 
                  className="h-full bg-gradient-to-r from-[#81D8D0] to-blue-500 transition-all duration-700" 
                  style={{ width: `${(step / steps.length) * 100}%` }}
              ></div>
          </div>
          <p className="mt-8 text-[8px] uppercase font-black text-white/10 tracking-[0.4em] text-center italic">Calculated Haptic Alignment</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
