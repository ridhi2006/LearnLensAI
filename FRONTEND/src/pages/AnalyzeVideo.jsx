import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  RotateCcw,
  Briefcase,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Check
} from 'lucide-react';
import { YoutubeIcon } from '../components/common/BrandIcons';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useLearning } from '../context/LearningContext';
import { useToast } from '../context/ToastContext';

export const AnalyzeVideo = () => {
  const [searchParams] = useSearchParams();
  const initialUrl = searchParams.get('url') || 'https://www.youtube.com/watch?v=MFhxShGxHWc';
  
  const [url, setUrl] = useState(initialUrl);
  const [selectedMode, setSelectedMode] = useState('College');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);

  const { setLearningMode, setActiveVideoId } = useLearning();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const learningModes = [
    {
      id: 'Beginner',
      title: 'Beginner Mode',
      subtitle: 'Intuitive analogies & zero jargon',
      description: 'Ideal if you are encountering the topic for the very first time.',
      icon: BookOpen,
      color: 'border-emerald-500/40 text-emerald-400'
    },
    {
      id: 'College',
      title: 'College Mode',
      subtitle: 'Rigorous proofs & mathematical invariants',
      description: 'Academic depth with recurrence relations and formal definitions.',
      icon: GraduationCap,
      color: 'border-brand-indigo/50 text-brand-lightViolet'
    },
    {
      id: 'Revision',
      title: 'Revision Mode',
      subtitle: 'High-yield cheat sheet formulas',
      description: 'Ultra-condensed bullet points for fast 5-minute pre-exam refreshers.',
      icon: RotateCcw,
      color: 'border-amber-500/40 text-amber-400'
    },
    {
      id: 'Interview',
      title: 'Interview Mode',
      subtitle: 'Edge cases, trade-offs & rubric grading',
      description: 'Technical interview practice with mock answer assessment.',
      icon: Briefcase,
      color: 'border-cyan-500/50 text-brand-cyan'
    }
  ];

  const analysisSteps = [
    { id: 1, label: 'Extracting Transcript & Timestamps' },
    { id: 2, label: 'Understanding Algorithmic Concepts' },
    { id: 3, label: 'Generating Summary & Cheat Formulas' },
    { id: 4, label: 'Creating Multi-level Quiz Material' },
    { id: 5, label: 'Building Interactive Knowledge Graph' },
    { id: 6, label: 'Preparing Your Personalized Learning Path' }
  ];

  const handleStartAnalysis = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsAnalyzing(true);
    setCurrentStepIndex(0);
    setLearningMode(selectedMode);
  };

  useEffect(() => {
    if (!isAnalyzing) return;

    if (currentStepIndex < analysisSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      // Completed all steps
      const completeTimer = setTimeout(() => {
        setIsAnalyzing(false);
        setActiveVideoId('demo-binary-search');
        showToast({
          title: 'Analysis complete!',
          message: 'Your interactive LearnLens workspace is ready.',
          type: 'success'
        });
        navigate('/learn/demo-binary-search');
      }, 600);
      return () => clearTimeout(completeTimer);
    }
  }, [isAnalyzing, currentStepIndex, navigate, setActiveVideoId, setLearningMode, selectedMode, showToast]);

  return (
    <AppLayout title="Analyze Video" subtitle="Transform any YouTube lecture into an interactive workspace.">
      <div className="max-w-4xl mx-auto space-y-8 py-4">
        {/* Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Analyze a YouTube Video
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary">
            Transform any educational video into an interactive learning workspace.
          </p>
        </div>

        {!isAnalyzing ? (
          <form onSubmit={handleStartAnalysis} className="space-y-8">
            {/* Main URL Input Card */}
            <Card padding="lg" className="space-y-4 border-slate-800 bg-dark-800/90 shadow-2xl">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Educational Video URL
                </label>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-dark-900 border border-slate-700 focus-within:border-brand-indigo transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                    <YoutubeIcon className="w-5 h-5" />
                  </div>
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste YouTube URL (e.g. https://www.youtube.com/watch?v=...)"
                    className="w-full bg-transparent text-sm sm:text-base text-text-primary outline-none placeholder:text-text-muted font-medium"
                  />
                </div>
              </div>

              {/* Sample pre-fill links */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-text-muted">
                <span className="font-semibold text-text-secondary">Try sample videos:</span>
                <button
                  type="button"
                  onClick={() => setUrl('https://www.youtube.com/watch?v=MFhxShGxHWc')}
                  className="px-2.5 py-1 rounded-lg bg-dark-900 border border-slate-800 text-brand-lightViolet hover:border-brand-indigo/40 transition-colors"
                >
                  Binary Search Tutorial
                </button>
                <button
                  type="button"
                  onClick={() => setUrl('https://www.youtube.com/watch?v=pcKY4hjDrxk')}
                  className="px-2.5 py-1 rounded-lg bg-dark-900 border border-slate-800 text-brand-cyan hover:border-brand-cyan/40 transition-colors"
                >
                  Graph BFS & DFS
                </button>
                <button
                  type="button"
                  onClick={() => setUrl('https://www.youtube.com/watch?v=TNhaISOUy6Q')}
                  className="px-2.5 py-1 rounded-lg bg-dark-900 border border-slate-800 text-emerald-400 hover:border-emerald-500/40 transition-colors"
                >
                  React 19 Hooks
                </button>
              </div>
            </Card>

            {/* Choose Learning Mode Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold font-heading text-white">
                    Choose Learning Mode
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    How should the AI explain concepts, generate notes, and assess your understanding?
                  </p>
                </div>
                <Badge variant="primary" size="sm">
                  {selectedMode} Selected
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {learningModes.map((mode) => {
                  const Icon = mode.icon;
                  const isSelected = selectedMode === mode.id;
                  return (
                    <div
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'bg-dark-800 border-brand-indigo/70 shadow-xl shadow-brand-indigo/15 ring-1 ring-brand-indigo/50'
                          : 'bg-dark-900/80 border-slate-800/80 hover:bg-dark-800/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-xl bg-dark-900 border flex items-center justify-center ${mode.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${isSelected ? 'bg-brand-indigo border-brand-indigo text-white' : 'border-slate-700 text-transparent'}`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div>
                        <h4 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-text-primary'}`}>
                          {mode.title}
                        </h4>
                        <div className="text-[11px] font-medium text-brand-lightViolet mt-0.5">
                          {mode.subtitle}
                        </div>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">
                          {mode.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Analyze CTA */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full font-bold text-base shadow-xl py-4"
                rightIcon={<Sparkles className="w-5 h-5" />}
              >
                Analyze Video & Build Workspace
              </Button>
            </div>
          </form>
        ) : (
          /* Multi-step Loading Animation Experience */
          <Card padding="lg" className="border-brand-indigo/40 bg-dark-800/90 shadow-2xl space-y-8 py-10">
            <div className="text-center space-y-2 max-w-md mx-auto">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-indigo/20 border border-brand-indigo/40 flex items-center justify-center text-brand-lightViolet animate-pulse">
                <Sparkles className="w-7 h-7 text-brand-cyan" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white">
                LearnLens Intelligence Processing
              </h3>
              <p className="text-xs text-text-muted font-mono">
                {url}
              </p>
            </div>

            {/* Steps List with animated checkmarks */}
            <div className="max-w-md mx-auto space-y-3.5">
              {analysisSteps.map((step, idx) => {
                const isCompleted = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-center gap-3.5 p-3 rounded-xl border text-xs font-medium transition-all ${
                      isCompleted
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : isCurrent
                        ? 'bg-brand-indigo/20 border-brand-indigo/50 text-brand-lightViolet font-semibold shadow-md'
                        : 'bg-dark-900/50 border-slate-800 text-text-muted opacity-40'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-brand-cyan animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                    )}
                    <span>{step.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};
