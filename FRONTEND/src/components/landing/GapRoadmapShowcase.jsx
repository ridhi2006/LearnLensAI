import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, CircleDot, ArrowDown, Sparkles, ChevronRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

export const GapRoadmapShowcase = () => {
  const navigate = useNavigate();

  const roadmapSteps = [
    {
      title: 'Binary Search Basics',
      status: 'Completed',
      variant: 'success',
      icon: CheckCircle2,
      desc: 'Pointers, monotonic range, and while loop invariants.',
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
    },
    {
      title: 'Lower Bound & Upper Bound',
      status: 'Needs Revision',
      variant: 'warning',
      icon: AlertTriangle,
      desc: 'First occurrence searching with duplicate elements.',
      color: 'border-amber-500/50 text-amber-300 bg-amber-500/10'
    },
    {
      title: 'Rotated Sorted Array Search',
      status: 'Next Up',
      variant: 'cyan',
      icon: CircleDot,
      desc: 'Identifying strictly sorted partitions and discarding invalid halves.',
      color: 'border-cyan-500/50 text-cyan-300 bg-cyan-500/10'
    },
    {
      title: 'Peak Element in Unsorted Array',
      status: 'Upcoming',
      variant: 'default',
      icon: CircleDot,
      desc: 'Evaluating local slopes to converge on a local maximum in O(log n).',
      color: 'border-slate-700 text-slate-400 bg-dark-800'
    },
    {
      title: 'Binary Search on Answer Space',
      status: 'Milestone',
      variant: 'primary',
      icon: Sparkles,
      desc: 'Formulating monotonic boolean predicates for complex resource allocation.',
      color: 'border-brand-indigo/40 text-brand-lightViolet bg-brand-indigo/10'
    }
  ];

  return (
    <section className="py-20 bg-dark-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold text-accent-warning uppercase tracking-wider">
            Intelligent Gap Diagnosis
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            LearnLens Knows What You Should Study Next
          </h2>
          <p className="text-sm sm:text-base text-text-secondary">
            Stop guessing your next step. LearnLens evaluates what you mastered, highlights vulnerabilities, and automatically computes your optimal progression.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Gap Detector Diagnosis Box */}
          <div className="lg:col-span-5 space-y-4">
            <Card padding="lg" className="border-slate-800 bg-dark-800/90 shadow-xl space-y-6">
              <div>
                <h3 className="text-base font-bold text-text-primary font-heading flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-cyan" />
                  Knowledge Gap Diagnostic
                </h3>
                <p className="text-xs text-text-muted mt-1">
                  Derived from quiz questions and interactive assessment rubric.
                </p>
              </div>

              {/* Covered */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center justify-between">
                  <span>Covered & Mastered</span>
                  <span className="text-emerald-400 font-mono text-[11px]">2 Topics</span>
                </div>
                <div className="space-y-1.5">
                  <div className="p-2.5 rounded-xl bg-dark-900 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-400 font-medium">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      Binary Search Basics
                    </span>
                    <Badge variant="success" size="sm">95%</Badge>
                  </div>
                  <div className="p-2.5 rounded-xl bg-dark-900 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-400 font-medium">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      O(log n) Complexity Analysis
                    </span>
                    <Badge variant="success" size="sm">92%</Badge>
                  </div>
                </div>
              </div>

              {/* Weak */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center justify-between">
                  <span>Weak / Needs Revision</span>
                  <span className="text-amber-400 font-mono text-[11px]">1 Topic</span>
                </div>
                <div className="p-2.5 rounded-xl bg-dark-900 border border-amber-500/40 flex items-center justify-between text-xs text-amber-300 font-medium">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                    Lower Bound Invariants
                  </span>
                  <Badge variant="warning" size="sm">Revise</Badge>
                </div>
              </div>

              {/* Missing / Recommended */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center justify-between">
                  <span>Missing / Recommended</span>
                  <span className="text-cyan-400 font-mono text-[11px]">2 Topics</span>
                </div>
                <div className="space-y-1.5">
                  <div className="p-2.5 rounded-xl bg-dark-900 border border-cyan-500/30 flex items-center justify-between text-xs text-cyan-300 font-medium">
                    <span className="flex items-center gap-2">
                      <CircleDot className="w-4 h-4 shrink-0 text-cyan-400" />
                      Rotated Sorted Arrays
                    </span>
                    <Badge variant="cyan" size="sm">Next</Badge>
                  </div>
                  <div className="p-2.5 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between text-xs text-slate-300 font-medium">
                    <span className="flex items-center gap-2">
                      <CircleDot className="w-4 h-4 shrink-0 text-slate-500" />
                      Binary Search on Answer
                    </span>
                    <Badge variant="default" size="sm">Milestone</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Visual Vertical Roadmap */}
          <div className="lg:col-span-7">
            <Card padding="lg" className="border-slate-800 bg-dark-800/90 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-text-primary font-heading">
                    Generated Vertical Learning Roadmap
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Personalized study sequence based on your real-time knowledge gap analysis.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/learn/demo-binary-search')}
                >
                  Start Roadmap
                </Button>
              </div>

              {/* Connected Roadmap Steps */}
              <div className="space-y-3 relative before:absolute before:top-4 before:bottom-4 before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-amber-500 before:to-brand-indigo/30">
                {roadmapSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.08 }}
                      className="relative flex items-start gap-4 pl-1"
                    >
                      {/* Node Icon Circle */}
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 z-10 ${step.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Content Card */}
                      <div className="flex-1 p-3.5 rounded-xl bg-dark-900/90 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-text-primary truncate">
                              {step.title}
                            </h4>
                            <Badge variant={step.variant} size="sm">
                              {step.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-text-muted mt-0.5 truncate">
                            {step.desc}
                          </p>
                        </div>
                        <Button
                          variant={step.status === 'Next Up' ? 'cyan' : 'ghost'}
                          size="sm"
                          className="shrink-0 text-xs px-2.5 py-1"
                          onClick={() => navigate('/learn/demo-binary-search')}
                        >
                          Learn
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
