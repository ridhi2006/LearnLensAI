import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Play,
  FileText,
  Network,
  HelpCircle,
  MessageSquare,
  Compass,
  CheckCircle2,
  TrendingUp,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Flame
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductPreview = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative mb-28">
      {/* Dynamic Ambient Backlight */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-indigo/30 via-brand-violet/25 to-brand-cyan/25 blur-3xl opacity-60 -z-10 rounded-3xl animate-pulse-subtle" />

      {/* Floating Badges outside the preview frame */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden lg:flex items-center gap-2.5 absolute -top-6 -left-6 z-20 px-4 py-2.5 rounded-2xl bg-dark-800/95 border border-brand-cyan/50 shadow-2xl shadow-brand-cyan/20 backdrop-blur-xl text-xs font-semibold text-white animate-float"
      >
        <div className="w-6 h-6 rounded-lg bg-brand-cyan/20 text-brand-cyan flex items-center justify-center">
          <Zap className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-[10px] text-brand-cyan font-mono">Real-time Concept Sync</div>
          <div>Monotonic Partition Invariant</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="hidden lg:flex items-center gap-2.5 absolute -top-6 -right-6 z-20 px-4 py-2.5 rounded-2xl bg-dark-800/95 border border-emerald-500/50 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl text-xs font-semibold text-white animate-float-reverse"
      >
        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <CheckCircle2 className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-[10px] text-emerald-400 font-mono">Quiz Evaluation</div>
          <div>8/10 Score • 72% Mastery</div>
        </div>
      </motion.div>

      {/* Main Floating Application Preview Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl border border-brand-indigo/30 bg-dark-900/95 shadow-2xl shadow-black/90 backdrop-blur-2xl overflow-hidden relative"
      >
        {/* Mock Browser Topbar */}
        <div className="h-11 bg-dark-800/90 border-b border-slate-800 px-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm shadow-rose-500/40" />
            <span className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm shadow-amber-500/40" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm shadow-emerald-500/40" />
          </div>
          <div className="text-[11px] font-mono text-text-secondary px-5 py-1.5 rounded-lg bg-dark-950/80 border border-slate-800 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>learnlens.ai/learn/demo-binary-search</span>
          </div>
          <div className="text-[11px] text-brand-lightViolet font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            <span className="hidden sm:inline">AI Workspace V1</span>
          </div>
        </div>

        {/* Mock Workspace Body */}
        <div className="grid grid-cols-12 min-h-[460px]">
          {/* Left Mini Workspace Nav Sidebar */}
          <div className="col-span-3 sm:col-span-3 bg-dark-850/70 border-r border-slate-800/80 p-3 sm:p-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider px-2">
                Workspace Views
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold bg-brand-indigo text-white shadow-lg shadow-brand-indigo/30">
                  <Play className="w-3.5 h-3.5 text-white" />
                  <span className="truncate">Overview</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-text-secondary hover:bg-dark-750 transition-colors">
                  <FileText className="w-3.5 h-3.5 text-text-muted" />
                  <span className="truncate">Transcript</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-text-secondary hover:bg-dark-750 transition-colors">
                  <Layers className="w-3.5 h-3.5 text-text-muted" />
                  <span className="truncate">Notes & Cheat Sheet</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-text-secondary hover:bg-dark-750 transition-colors">
                  <Network className="w-3.5 h-3.5 text-text-muted" />
                  <span className="truncate">Knowledge Graph</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-text-secondary hover:bg-dark-750 transition-colors">
                  <HelpCircle className="w-3.5 h-3.5 text-text-muted" />
                  <span className="truncate">Quiz</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold ml-auto">
                    8/10
                  </span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-text-secondary hover:bg-dark-750 transition-colors">
                  <MessageSquare className="w-3.5 h-3.5 text-text-muted" />
                  <span className="truncate">AI Tutor</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-text-secondary hover:bg-dark-750 transition-colors">
                  <Compass className="w-3.5 h-3.5 text-text-muted" />
                  <span className="truncate">Learning Path</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-[11px] text-text-muted flex items-center justify-between">
              <span className="text-text-primary font-medium">Mode:</span>
              <span className="text-brand-cyan font-bold font-mono">College</span>
            </div>
          </div>

          {/* Center Video Player & Synthesis */}
          <div className="col-span-9 sm:col-span-6 p-4 sm:p-6 space-y-4">
            {/* Video preview banner */}
            <div className="relative rounded-2xl overflow-hidden border border-brand-indigo/30 aspect-video bg-dark-950 flex items-center justify-center group shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1516116211227-bbc13c6314f4?w=800&auto=format&fit=crop&q=80"
                alt="Binary Search Tutorial"
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-brand-indigo text-white flex items-center justify-center shadow-2xl shadow-brand-indigo/60 group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-bold drop-shadow">Binary Search Complete Tutorial</span>
                <span className="px-2.5 py-1 rounded-md bg-black/80 font-mono text-[11px] border border-white/10">
                  17:32 / 46:00
                </span>
              </div>
            </div>

            {/* AI Summary Card */}
            <div className="p-4 rounded-2xl bg-dark-800/90 border border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-lightViolet">
                  <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>AI-Generated Intelligence Summary</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">O(log n) Time</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Binary Search operates on monotonic search spaces with O(log n) efficiency. Safe midpoint arithmetic (<code className="text-brand-cyan font-bold">left + (right-left)/2</code>) avoids 32-bit overflow. Lower Bound finds first occurrence (<code className="text-brand-lightViolet font-bold">arr[i] &gt;= target</code>).
              </p>
            </div>
          </div>

          {/* Right Mini Progress & Gap Diagnosis Panel */}
          <div className="hidden sm:col-span-3 sm:flex flex-col justify-between p-4 bg-dark-850/50 border-l border-slate-800/80 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-text-primary">Mastery Progress</span>
                <span className="text-xs font-bold text-brand-lightViolet font-mono">72%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-dark-700 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div className="bg-gradient-to-r from-brand-indigo to-brand-violet h-full w-[72%] rounded-full shadow-sm" />
              </div>

              {/* Quick Knowledge Gap list */}
              <div className="space-y-2 pt-2">
                <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                  Gap Diagnostic
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded-lg bg-dark-900 border border-emerald-500/30 flex items-center justify-between text-emerald-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      Search Space
                    </span>
                    <span className="font-mono text-[10px]">95%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-dark-900 border border-emerald-500/30 flex items-center justify-between text-emerald-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      Midpoint Overflow
                    </span>
                    <span className="font-mono text-[10px]">90%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-dark-900 border border-amber-500/40 flex items-center justify-between text-amber-300 font-medium">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                      Lower Bound
                    </span>
                    <span className="font-mono text-[10px]">Revise</span>
                  </div>
                  <div className="p-2 rounded-lg bg-dark-900 border border-cyan-500/30 flex items-center justify-between text-cyan-300 font-medium">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-brand-cyan shrink-0" />
                      Rotated Array
                    </span>
                    <span className="font-mono text-[10px]">Next</span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/learn/demo-binary-search"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet hover:brightness-110 text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-brand-indigo/30 transition-all"
            >
              <span>Open Live Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
