import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const TutorShowcase = () => {
  const [selectedMode, setSelectedMode] = useState('College');

  const modeDescriptions = {
    Beginner: {
      tagline: 'Simple analogies & intuition',
      userQuestion: 'Why does Binary Search need sorted data?',
      aiResponse: "Think of finding a word in a dictionary where the words are completely scrambled. You'd have to read page by page from start to finish! But because it's sorted alphabetically, opening to 'M' tells you immediately whether to throw away the left half or the right half. That's why sorting is required.",
      detail: 'Uses real-world analogies and zero jargon.'
    },
    College: {
      tagline: 'Formal proofs & invariants',
      userQuestion: 'Why is Binary Search O(log n)?',
      aiResponse: 'Let the array size be n. At step 1, size = n/2. At step 2, n/4. At step k, size = n/(2^k). When n/(2^k) = 1, we solve 2^k = n, giving k = log2(n). The recurrence relation T(n) = T(n/2) + O(1) evaluates to O(log n) via the Master Theorem.',
      detail: 'Rigorous mathematics, recurrence relations, and algorithmic proof.'
    },
    Revision: {
      tagline: 'High-yield cheat bullets',
      userQuestion: 'Summarize Binary Search pointers & bounds',
      aiResponse: '• Invariant: Monotonic search space.\n• Mid Formula: mid = left + (right - left) // 2 (overflow safe).\n• Lower Bound: First index arr[i] >= target.\n• Upper Bound: First index arr[i] > target.\n• Count of X: UpperBound(X) - LowerBound(X).',
      detail: 'Ultra-condensed notes designed for 5-minute pre-exam reviews.'
    },
    Interview: {
      tagline: 'Edge cases & trade-offs',
      userQuestion: 'What are the classic Binary Search traps in technical interviews?',
      aiResponse: '1. 32-bit Integer Overflow in (left + right) / 2.\n2. Infinite loop when bounds are not adjusted (e.g. left = mid vs left = mid + 1).\n3. Degraded O(N) worst case in Rotated Arrays when duplicates exist (arr[l] == arr[mid] == arr[r]).\n4. Monotonic Predicate Logic: Binary Search on Answer space.',
      detail: 'Focuses on edge cases, boundary invariants, and system limits.'
    }
  };

  const current = modeDescriptions[selectedMode];

  return (
    <section id="personalized" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold text-brand-lightViolet uppercase tracking-wider">
            Adaptive Pedagogy
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            One Video, Four Tailored Learning Modes
          </h2>
          <p className="text-sm sm:text-base text-text-secondary">
            Whether you're starting from scratch or preparing for a Big Tech technical screen, LearnLens adapts the depth and style of explanation instantly.
          </p>
        </div>

        {/* Split screen selector & chat preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Mode Cards */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-center">
            {['Beginner', 'College', 'Revision', 'Interview'].map((mode) => {
              const isSelected = selectedMode === mode;
              const info = modeDescriptions[mode];
              return (
                <div
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-center justify-between ${
                    isSelected
                      ? 'bg-dark-800 border-brand-indigo/60 shadow-lg shadow-brand-indigo/15'
                      : 'bg-dark-900/60 border-slate-800/80 hover:bg-dark-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm ${isSelected ? 'text-brand-lightViolet' : 'text-text-primary'}`}>
                        {mode} Mode
                      </span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-text-muted">{info.tagline}</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-brand-indigo border-brand-indigo text-white'
                        : 'border-slate-700 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right AI Conversation Preview */}
          <div className="lg:col-span-7">
            <Card padding="lg" className="h-full border-slate-800 bg-dark-800/90 shadow-2xl flex flex-col justify-between">
              <div>
                {/* Chat Top header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-indigo/20 border border-brand-indigo/30 flex items-center justify-center text-brand-lightViolet">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-primary">LearnLens AI Tutor</div>
                      <div className="text-[10px] text-text-muted">{current.detail}</div>
                    </div>
                  </div>
                  <Badge variant="primary" size="sm">
                    {selectedMode} Mode Active
                  </Badge>
                </div>

                {/* Messages Body */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {/* User Question */}
                    <div className="flex items-start gap-3 justify-end">
                      <div className="p-3.5 rounded-2xl rounded-tr-sm bg-brand-indigo text-white text-xs max-w-md shadow-md">
                        {current.userQuestion}
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-dark-700 border border-slate-700 flex items-center justify-center text-text-secondary shrink-0">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-brand-indigo/20 border border-brand-indigo/40 flex items-center justify-center text-brand-lightViolet shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                      </div>
                      <div className="p-4 rounded-2xl rounded-tl-sm bg-dark-900 border border-slate-800 text-xs text-text-secondary max-w-lg leading-relaxed whitespace-pre-line shadow-inner">
                        {current.aiResponse}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Chat footer suggestions */}
              <div className="pt-5 mt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-[11px] text-text-muted">
                <span className="font-semibold text-text-secondary">Try asking:</span>
                <span className="px-2.5 py-1 rounded-lg bg-dark-900 border border-slate-800 text-brand-lightViolet font-mono">
                  "Explain Simply"
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-dark-900 border border-slate-800 text-brand-cyan font-mono">
                  "Show Complexity"
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-dark-900 border border-slate-800 text-emerald-400 font-mono">
                  "Interview Assessment"
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
