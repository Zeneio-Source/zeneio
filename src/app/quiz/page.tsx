'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, Heart, Zap } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "What's your primary interest?",
    options: [
      { text: "Solo pleasure & self-discovery", category: "solo" },
      { text: "Couples play & shared experiences", category: "couples" },
      { text: "Both! I want versatility", category: "both" },
    ],
  },
  {
    id: 2,
    question: "What matters most to you in a product?",
    options: [
      { text: "Discretion & quietness (shhh...)", value: "quiet" },
      { text: "Power & intensity (go big!)", value: "power" },
      { text: "Smart features & app control", value: "tech" },
      { text: "Simple & easy to use", value: "simple" },
    ],
  },
  {
    id: 3,
    question: "Where would you primarily use this?",
    options: [
      { text: "In bed / bedroom only", location: "bedroom" },
      { text: "Bathroom / shower too 🚿", location: "waterproof" },
      { text: "Traveling / on the go ✈️", location: "travel" },
      { text: "Anywhere & everywhere!", location: "anywhere" },
    ],
  },
  {
    id: 4,
    question: "What's your budget range?",
    options: [
      { text: "$20-$50 — Getting started", budget: "entry" },
      { text: "$50-$100 — Quality matters", budget: "mid" },
      { text: "$100+ — Premium experience", budget: "premium" },
      { text: "Money is no object 😎", budget: "luxury" },
    ],
  },
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => { setStep(0); setAnswers({}); setCompleted(false); };

  return (
    <div className="min-h-screen bg-zeneio-black"><Navbar />

      {!completed ? (
        <section className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="w-full max-w-xl mx-auto animate-fade-up">
            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-zeneio-accent to-zeneio-purple rounded-full transition-all duration-500"
                  style={{ width: `${((step) / questions.length) * 100}%` }} />
              </div>
              <span className="text-xs font-medium text-white/40">{step + 1}/{questions.length}</span>
            </div>

            {/* Question Card */}
            <div className="glass rounded-3xl p-8 sm:p-10 text-center space-y-8">
              <Sparkles size={28} className="mx-auto text-zeneio-accent/50" />
              
              <h2 className="text-heading-3 font-bold leading-tight">{questions[step].question}</h2>

              <div className="space-y-3">
                {questions[step].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option.text)}
                    className={`w-full text-left px-6 py-4 rounded-xl border font-medium text-sm transition-all hover:border-zeneio-accent/30 hover:bg-zeneio-accent/[0.03] group ${
                      answers[questions[step].id] === option.text
                        ? 'border-zeneio-accent bg-zeneio-accent/10 text-white'
                        : 'border-white/5 text-white/70'
                    }`}
                  >
                    <span className={`mr-2 opacity-40 ${answers[questions[step].id] === option.text ? '!opacity-100' : ''}`}>{['A', 'B', 'C', 'D'][i]}</span>
                    {option.text}
                  </button>
                ))}
              </div>

              {/* Back button */}
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="btn-ghost mx-auto">← Back</button>
              )}
            </div>
          </div>
        </section>

      ) : (
        /* Results */
        <section className="min-h-[80vh] flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-lg mx-auto text-center space-y-8 animate-fade-up">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-pink-400/15 to-purple-400/15 flex items-center justify-center">
              <Heart size={40} className="text-pink-400" />
            </div>

            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-zeneio-accent mb-2">Your Perfect Match</p>
              <h1 className="text-heading-1 font-bold leading-tight">We Found Products<br/>Made For You ✨</h1>
            </div>

            {/* Results Preview */}
            <div className="grid grid-cols-2 gap-4">
              {[{ name: 'NEO Vibrating Ring Pro', price: '$49.99' }, { name: 'AURA Wand Vibrator', price: '$69.99' }, { name: 'SUCTION Rose Toy Pro', price: '$44.99' }, { name: 'Lace Babydoll Set', price: '$34.99' }].map(p => (
                <Link key={p.name} href="/products" className="glass rounded-xl p-4 group hover:border-pink-400/20 transition-all block">
                  <p className="font-semibold text-sm truncate group-hover:text-pink-400 transition-colors">{p.name}</p>
                  <p className="text-xs text-zeneio-accent mt-1">{p.price}</p>
                </Link>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/products" className="btn-accent btn-lg flex-1"><Zap size={16} /> Shop My Recommendations</Link>
              <button onClick={resetQuiz} className="btn-outline btn-lg"><RotateCcw size={16} /> Retake Quiz</button>
            </div>
          </div>
        </section>
      )}

      <Footer /></div>
  );
}
