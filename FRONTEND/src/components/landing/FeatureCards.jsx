import React from 'react';
import { motion } from 'framer-motion';
import {
  PlaySquare,
  FileSpreadsheet,
  Network,
  GitPullRequest,
  Bot,
  History,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  Zap,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const FeatureCards = () => {
  const features = [
    {
      id: 'f1',
      title: 'Video Intelligence',
      tagline: 'Transcript + AI Summary',
      description: 'Timestamp-synchronized interactive transcripts with instant AI conceptual breakdowns and search capabilities.',
      icon: PlaySquare,
      accent: 'border-brand-indigo/40 hover:border-brand-indigo',
      iconColor: 'text-brand-lightViolet',
      bgGlow: 'bg-brand-indigo/10',
      shadowGlow: 'hover:shadow-brand-indigo/20',
      preview: (
        <div className="space-y-1.5 p-3 rounded-xl bg-dark-950/80 border border-slate-800 text-[11px] font-mono shadow-inner">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-brand-lightViolet font-semibold">08:20</span>
            <span className="text-[10px] text-slate-400">Left & Right Pointers</span>
          </div>
          <div className="flex items-center justify-between text-text-primary bg-brand-indigo/15 p-1.5 rounded border border-brand-indigo/30">
            <span className="text-brand-cyan font-bold">17:32</span>
            <span className="text-white font-medium">Avoiding Integer Overflow</span>
          </div>
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-brand-lightViolet font-semibold">27:18</span>
            <span className="text-[10px] text-slate-400">Lower Bound Invariant</span>
          </div>
        </div>
      )
    },
    {
      id: 'f2',
      title: 'Smart Study Kit',
      tagline: 'Cheat Notes + Interactive Quiz',
      description: 'Distilled formulas, definitions, common traps, revision notes, and multi-difficulty quizzes with PDF export.',
      icon: FileSpreadsheet,
      accent: 'border-brand-violet/40 hover:border-brand-violet',
      iconColor: 'text-brand-violet',
      bgGlow: 'bg-brand-violet/10',
      shadowGlow: 'hover:shadow-brand-violet/20',
      preview: (
        <div className="p-3 rounded-xl bg-dark-950/80 border border-slate-800 space-y-2 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-primary">Safe Midpoint Formula</span>
            <Badge variant="primary" size="sm">O(log n)</Badge>
          </div>
          <div className="text-[11px] font-mono text-brand-cyan bg-dark-900 p-2 rounded-lg border border-brand-indigo/30 font-bold">
            mid = left + (right - left) // 2
          </div>
        </div>
      )
    },
    {
      id: 'f3',
      title: 'Interactive Knowledge Graph',
      tagline: 'Connect Ideas & Timestamp Q&A',
      description: 'Visual React Flow map of core concepts, subtopics, and prerequisite dependencies with deep timestamp links.',
      icon: Network,
      accent: 'border-brand-cyan/40 hover:border-brand-cyan',
      iconColor: 'text-brand-cyan',
      bgGlow: 'bg-brand-cyan/10',
      shadowGlow: 'hover:shadow-brand-cyan/20',
      preview: (
        <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-dark-950/80 border border-slate-800 text-[11px] shadow-inner">
          <span className="px-2.5 py-1.5 rounded-lg bg-brand-indigo/25 text-white border border-brand-indigo/50 font-bold shadow-sm">
            Binary Search
          </span>
          <span className="text-brand-cyan font-bold">→</span>
          <span className="px-2.5 py-1.5 rounded-lg bg-amber-500/25 text-amber-300 border border-amber-500/50 font-semibold shadow-sm">
            Lower Bound
          </span>
        </div>
      )
    },
    {
      id: 'f4',
      title: 'Knowledge Gap & Roadmap',
      tagline: 'Discover Weak Topics & Next Steps',
      description: 'Automated gap detector highlights what you covered, what is weak, and generates a personalized study roadmap.',
      icon: GitPullRequest,
      accent: 'border-accent-warning/40 hover:border-accent-warning',
      iconColor: 'text-accent-warning',
      bgGlow: 'bg-amber-500/10',
      shadowGlow: 'hover:shadow-amber-500/20',
      preview: (
        <div className="space-y-1.5 p-3 rounded-xl bg-dark-950/80 border border-slate-800 text-xs shadow-inner">
          <div className="flex items-center justify-between text-emerald-400 font-medium">
            <span className="flex items-center gap-1.5">✓ Search Space</span>
            <span className="text-[10px] font-mono font-bold bg-emerald-500/15 px-1.5 py-0.5 rounded">95%</span>
          </div>
          <div className="flex items-center justify-between text-amber-300 font-medium">
            <span className="flex items-center gap-1.5">⚠ Lower Bound</span>
            <span className="text-[10px] font-mono font-bold bg-amber-500/15 px-1.5 py-0.5 rounded">Revise</span>
          </div>
          <div className="flex items-center justify-between text-brand-cyan font-medium">
            <span className="flex items-center gap-1.5">○ Rotated Array</span>
            <span className="text-[10px] font-mono font-bold bg-cyan-500/15 px-1.5 py-0.5 rounded">Next Up</span>
          </div>
        </div>
      )
    },
    {
      id: 'f5',
      title: 'AI Tutor & Assessment',
      tagline: '4 Learning Modes + Interview Mode',
      description: 'Switch seamlessly between Beginner, College, Revision, and Interview modes with AI rubric evaluations.',
      icon: Bot,
      accent: 'border-brand-indigo/40 hover:border-brand-indigo',
      iconColor: 'text-brand-lightViolet',
      bgGlow: 'bg-brand-indigo/10',
      shadowGlow: 'hover:shadow-brand-indigo/20',
      preview: (
        <div className="p-3 rounded-xl bg-dark-950/80 border border-slate-800 space-y-2 text-xs shadow-inner">
          <div className="text-[10px] text-text-muted flex items-center justify-between font-semibold">
            <span>Rubric Assessment</span>
            <span className="font-bold text-brand-lightViolet font-mono bg-brand-indigo/20 px-2 py-0.5 rounded">
              7.0 / 10
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono text-text-secondary">
            <div className="bg-dark-900 p-1.5 rounded border border-slate-800/80 text-emerald-400">Concept: 8/10</div>
            <div className="bg-dark-900 p-1.5 rounded border border-slate-800/80 text-brand-lightViolet">Complexity: 7/10</div>
          </div>
        </div>
      )
    },
    {
      id: 'f6',
      title: 'Learning History & Sharing',
      tagline: 'Track Progress & Share Sessions',
      description: 'Persistent history of analyzed videos, quiz performance, revision lists, and view-only shared sessions.',
      icon: History,
      accent: 'border-slate-700 hover:border-slate-500',
      iconColor: 'text-slate-200',
      bgGlow: 'bg-slate-800/20',
      shadowGlow: 'hover:shadow-slate-700/20',
      preview: (
        <div className="p-3 rounded-xl bg-dark-950/80 border border-slate-800 flex items-center justify-between text-xs shadow-inner">
          <div>
            <div className="font-bold text-text-primary flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              14 Day Streak
            </div>
            <div className="text-[10px] text-text-muted">12 Videos Analyzed</div>
          </div>
          <span className="text-[11px] px-2.5 py-1 rounded-lg bg-brand-indigo/20 text-brand-lightViolet border border-brand-indigo/30 font-bold">
            Shareable
          </span>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-brand-lightViolet uppercase tracking-widest px-3 py-1 rounded-full bg-brand-indigo/15 border border-brand-indigo/30">
            Engineered For Active Retention
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight pt-2">
            Six V1 Intelligent Pillars
          </h2>
          <p className="text-sm sm:text-base text-text-secondary">
            Everything you need to transform passive video lectures into active mastery.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <div
                  className={`h-full flex flex-col justify-between rounded-3xl bg-dark-850/90 border ${item.accent} p-6 sm:p-7 relative overflow-hidden backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-xl ${item.shadowGlow} group`}
                >
                  <div className="space-y-4">
                    {/* Top Icon & Tagline */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl ${item.bgGlow} border border-white/10 flex items-center justify-center ${item.iconColor} group-hover:scale-110 transition-transform shadow-inner`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono text-text-muted font-semibold px-2.5 py-1 rounded-full bg-dark-900 border border-slate-800">
                        {item.tagline}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-white group-hover:text-brand-lightViolet transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Mini Preview Visualization */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80">
                    {item.preview}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
