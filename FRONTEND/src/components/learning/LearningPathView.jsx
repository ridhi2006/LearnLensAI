import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  CircleDot,
  Compass,
  ArrowDown,
  Sparkles,
  BookOpen,
  ArrowRight,
  Clock,
  Award
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import { MOCK_LEARNING_PATH } from '../../data/mockLearningPath';
import { useToast } from '../../context/ToastContext';

export const LearningPathView = ({ videoId = 'demo-binary-search', onTabChange }) => {
  const pathData = MOCK_LEARNING_PATH[videoId] || MOCK_LEARNING_PATH['demo-binary-search'];
  const { showToast } = useToast();

  const handleLearnAction = (step) => {
    showToast({
      title: `Starting Module: ${step.title}`,
      message: `Loading conceptual notes and interactive video reference for ${step.title}.`,
      type: 'info'
    });
    if (onTabChange) {
      if (step.status === 'needs-revision') {
        onTabChange('notes');
      } else {
        onTabChange('overview');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* 1. Top Knowledge Gap Analysis Summary Cards */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-brand-cyan" />
            Your Learning Analysis & Gap Diagnostic
          </h2>
          <p className="text-xs text-text-muted mt-0.5">
            Real-time synthesis of your video analysis, quiz performance, and rubric assessments.
          </p>
        </div>

        {/* 3 Overview Stat Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card padding="default" className="border-emerald-500/30 bg-dark-800/90 flex items-center justify-between">
            <div>
              <div className="text-xs text-text-muted font-medium">Covered Topics</div>
              <div className="text-2xl font-extrabold text-emerald-400 font-heading mt-0.5">
                {pathData.stats.coveredCount} Topics
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </Card>

          <Card padding="default" className="border-amber-500/40 bg-dark-800/90 flex items-center justify-between">
            <div>
              <div className="text-xs text-text-muted font-medium">Weak Topics</div>
              <div className="text-2xl font-extrabold text-amber-400 font-heading mt-0.5">
                {pathData.stats.weakCount} Topics
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </Card>

          <Card padding="default" className="border-brand-cyan/30 bg-dark-800/90 flex items-center justify-between">
            <div>
              <div className="text-xs text-text-muted font-medium">Missing / Recommended</div>
              <div className="text-2xl font-extrabold text-cyan-400 font-heading mt-0.5">
                {pathData.stats.missingCount} Topics
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 text-brand-cyan flex items-center justify-center">
              <CircleDot className="w-5 h-5" />
            </div>
          </Card>
        </div>
      </div>

      {/* 2. Detailed 3-Column Diagnostic Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Covered Topics */}
        <Card padding="lg" className="space-y-4 border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Covered Topics
            </span>
            <Badge variant="success" size="sm">Mastered</Badge>
          </div>

          <div className="space-y-2.5">
            {pathData.coveredTopics.map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-xs space-y-1">
                <div className="font-semibold text-text-primary flex items-center justify-between">
                  <span>✓ {item.title}</span>
                  <span className="text-emerald-400 font-mono text-[10px]">{item.mastery}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Weak Topics */}
        <Card padding="lg" className="space-y-4 border-amber-500/30">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Weak Topics
            </span>
            <Badge variant="warning" size="sm">Action Req</Badge>
          </div>

          <div className="space-y-2.5">
            {pathData.weakTopics.map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-dark-900 border border-amber-500/20 text-xs space-y-1">
                <div className="font-semibold text-amber-300 flex items-center justify-between">
                  <span>⚠ {item.title}</span>
                  <span className="text-amber-400 font-mono text-[10px]">{item.mastery}%</span>
                </div>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Missing / Recommended Topics */}
        <Card padding="lg" className="space-y-4 border-brand-cyan/30">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <CircleDot className="w-4 h-4 text-brand-cyan" />
              Recommended
            </span>
            <Badge variant="cyan" size="sm">Next Horizon</Badge>
          </div>

          <div className="space-y-2.5">
            {pathData.recommendedTopics.map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-dark-900 border border-cyan-500/20 text-xs space-y-1">
                <div className="font-semibold text-cyan-300 flex items-center justify-between">
                  <span>○ {item.title}</span>
                  <Badge variant="cyan" size="sm">{item.tag}</Badge>
                </div>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 3. Visual Vertical Connected Personalized Roadmap */}
      <Card padding="lg" className="space-y-6 border-slate-800 bg-dark-800/90 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-text-primary font-heading flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-lightViolet" />
              Personalized Vertical Study Roadmap
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              Follow this optimal sequence to reinforce weak areas and progress to advanced variations.
            </p>
          </div>
          <Badge variant="gradient" size="md">
            Adaptive Sequence
          </Badge>
        </div>

        {/* Vertical Timeline */}
        <div className="space-y-4 relative before:absolute before:top-6 before:bottom-6 before:left-6 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-amber-500 before:to-brand-indigo/30 pl-2">
          {pathData.roadmap.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isRevision = step.status === 'needs-revision';
            const isNext = step.status === 'next';

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="relative flex items-start gap-5"
              >
                {/* Status Dot / Icon */}
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 z-10 ${
                    isCompleted
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-md shadow-emerald-500/10'
                      : isRevision
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-md shadow-amber-500/20 animate-pulse'
                      : isNext
                      ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 shadow-md shadow-cyan-500/20'
                      : 'bg-dark-900 border-slate-700 text-slate-500'
                  }`}
                >
                  {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                  {isRevision && <AlertTriangle className="w-4 h-4" />}
                  {isNext && <CircleDot className="w-4 h-4" />}
                  {!isCompleted && !isRevision && !isNext && <span className="font-mono text-xs">{idx + 1}</span>}
                </div>

                {/* Node Card */}
                <div
                  className={`flex-1 p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isRevision
                      ? 'bg-dark-900/90 border-amber-500/40 shadow-lg shadow-amber-500/5'
                      : isNext
                      ? 'bg-dark-900/90 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                      : 'bg-dark-900/80 border-slate-800'
                  }`}
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-text-primary font-heading">
                        {step.title}
                      </h4>
                      <Badge
                        variant={isCompleted ? 'success' : isRevision ? 'warning' : isNext ? 'cyan' : 'default'}
                        size="sm"
                      >
                        {step.statusLabel}
                      </Badge>
                      <span className="text-[10px] text-text-muted font-mono">
                        {step.difficulty} • {step.estimatedTime}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {step.description}
                    </p>
                    <div className="w-48 pt-1">
                      <ProgressBar
                        value={step.progress}
                        size="sm"
                        variant={isCompleted ? 'success' : isRevision ? 'warning' : isNext ? 'cyan' : 'brand'}
                      />
                    </div>
                  </div>

                  <Button
                    variant={isNext ? 'cyan' : isRevision ? 'primary' : 'secondary'}
                    size="sm"
                    className="shrink-0 text-xs px-4"
                    onClick={() => handleLearnAction(step)}
                  >
                    {step.actionLabel}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
