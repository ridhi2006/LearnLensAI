import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play, CheckCircle2, Flame, Zap, Compass, BrainCircuit } from 'lucide-react';
import { YoutubeIcon } from '../common/BrandIcons';
import { Button } from '../common/Button';

export const Hero = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (url.trim()) {
      navigate(`/analyze?url=${encodeURIComponent(url.trim())}`);
    } else {
      navigate('/analyze');
    }
  };

  const handleSelectSample = (sampleUrl) => {
    setUrl(sampleUrl);
    navigate(`/analyze?url=${encodeURIComponent(sampleUrl)}`);
  };

  return (
    <section className="relative pt-12 pb-20 sm:pt-24 sm:pb-32 overflow-hidden">
      {/* Background Matrix Grid Lines + Ambient Glow Lights */}
      <div className="absolute inset-0 bg-grid-lines opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-brand-indigo/25 via-brand-violet/15 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-brand-cyan/15 blur-[100px] pointer-events-none rounded-full animate-float" />
      <div className="absolute top-1/3 right-1/6 w-80 h-80 bg-brand-violet/20 blur-[100px] pointer-events-none rounded-full animate-float-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* Floating Top Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800/90 border border-brand-indigo/40 text-brand-lightViolet text-xs font-semibold uppercase tracking-wider mb-8 shadow-xl shadow-brand-indigo/20 backdrop-blur-xl"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
          </span>
          <span className="bg-gradient-to-r from-white to-brand-lightViolet bg-clip-text text-transparent">
            AI-powered learning intelligence
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-indigo/30 text-white font-mono ml-1">V1</span>
        </motion.div>

        {/* Main Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white max-w-5xl leading-[1.1] sm:leading-[1.12]"
        >
          Turn YouTube Videos Into{' '}
          <span className="bg-gradient-to-r from-brand-indigo via-brand-lightViolet to-brand-cyan bg-clip-text text-transparent drop-shadow-sm">
            Personalized Learning Experiences
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-7 text-base sm:text-xl text-text-secondary max-w-3xl leading-relaxed font-normal"
        >
          LearnLens transforms educational YouTube videos into structured notes, interactive knowledge graphs, AI tutoring, assessments and personalized learning paths.
        </motion.p>

        {/* High-Impact Video URL Analyzer Box */}
        <motion.form
          onSubmit={handleAnalyze}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-2xl mt-10 p-2 sm:p-2.5 rounded-2xl bg-dark-800/95 border border-brand-indigo/40 backdrop-blur-2xl shadow-2xl shadow-brand-indigo/25 flex flex-col sm:flex-row items-center gap-2.5 focus-within:border-brand-cyan focus-within:ring-2 focus-within:ring-brand-cyan/20 transition-all group"
        >
          <div className="flex items-center gap-3 flex-1 w-full px-3 py-1.5">
            <div className="w-11 h-11 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0 shadow-inner group-focus-within:scale-105 transition-transform">
              <YoutubeIcon className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste a YouTube educational video URL..."
              className="w-full bg-transparent text-sm sm:text-base text-text-primary placeholder:text-text-muted outline-none font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full sm:w-auto font-bold px-7 py-3 shadow-lg shadow-brand-indigo/40"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Analyze Video
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="hidden sm:inline-flex border-slate-700 hover:border-brand-indigo/50"
              onClick={() => navigate('/learn/demo-binary-search')}
            >
              Explore Demo
            </Button>
          </div>
        </motion.form>

        {/* Quick Sample Clickers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-text-muted"
        >
          <span className="text-text-secondary font-medium">Try instantly:</span>
          <button
            type="button"
            onClick={() => handleSelectSample('https://www.youtube.com/watch?v=MFhxShGxHWc')}
            className="px-3 py-1 rounded-full bg-dark-800/80 hover:bg-dark-700 border border-slate-800 hover:border-brand-indigo/50 text-brand-lightViolet font-mono transition-all hover:scale-105 flex items-center gap-1.5"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Binary Search Mastery (46m)</span>
          </button>
          <button
            type="button"
            onClick={() => handleSelectSample('https://www.youtube.com/watch?v=pcKY4hjDrxk')}
            className="px-3 py-1 rounded-full bg-dark-800/80 hover:bg-dark-700 border border-slate-800 hover:border-brand-cyan/50 text-brand-cyan font-mono transition-all hover:scale-105 flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Graph BFS & DFS (52m)</span>
          </button>
        </motion.div>

        {/* Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-text-secondary font-medium"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
            Transcript & Timestamps
          </span>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-indigo" />
            AI Cheat Notes & Quiz
          </span>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-violet" />
            Knowledge Graph
          </span>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-success" />
            Adaptive AI Tutor
          </span>
        </motion.div>

      </div>
    </section>
  );
};
