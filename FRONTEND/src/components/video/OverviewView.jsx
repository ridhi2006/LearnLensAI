import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Sparkles,
  Clock,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Zap
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';

export const OverviewView = ({ video, onTabChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-8">
      {/* Top Video Player & Core Meta */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Video Player Card */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-3xl overflow-hidden aspect-video bg-dark-950 border border-brand-indigo/30 shadow-2xl shadow-black/90 group">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <div className="relative w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-brand-indigo text-white flex items-center justify-center shadow-2xl shadow-brand-indigo/60 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-bold drop-shadow-md text-sm">{video.channel}</span>
                  <span className="px-3 py-1 rounded-lg bg-black/80 font-mono text-xs border border-white/10 shadow-md">
                    {video.duration}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-3.5 rounded-2xl bg-dark-850 border border-slate-800 flex items-center gap-3 shadow-sm hover:border-brand-indigo/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-brand-indigo/15 text-brand-lightViolet flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white font-heading">{video.conceptsCount} Concepts</div>
                <div className="text-[10px] text-text-muted font-medium">Extracted</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-dark-850 border border-slate-800 flex items-center gap-3 shadow-sm hover:border-emerald-500/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white font-heading">{video.duration}</div>
                <div className="text-[10px] text-text-muted font-medium">Video Length</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-dark-850 border border-slate-800 flex items-center gap-3 shadow-sm hover:border-amber-500/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white font-heading">10 Questions</div>
                <div className="text-[10px] text-text-muted font-medium">Quiz Bank</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-dark-850 border border-slate-800 flex items-center gap-3 shadow-sm hover:border-brand-cyan/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-brand-cyan/15 text-brand-cyan flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white font-heading">{video.progress}% Score</div>
                <div className="text-[10px] text-text-muted font-medium">Mastery</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Quick Summary & Continue Panel */}
        <div className="lg:col-span-4 space-y-4">
          <Card padding="lg" className="border-brand-indigo/30 space-y-5 bg-dark-850/95 shadow-2xl">
            <div className="space-y-2">
              <Badge variant="gradient" size="md">
                AI Synthesis
              </Badge>
              <h3 className="text-base font-bold text-white font-heading mt-1">
                Executive Synthesis
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                {video.summary?.headline}
              </p>
            </div>

            {/* Core Formulas */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                Core Formulations
              </span>
              <div className="space-y-2">
                {video.summary?.coreFormulas?.map((f, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-dark-950 border border-slate-800 text-xs font-mono flex items-center justify-between">
                    <span className="text-text-muted">{f.label}:</span>
                    <span className="text-brand-cyan font-bold">{f.formula}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 space-y-2.5">
              <Button
                variant="primary"
                size="md"
                className="w-full justify-between font-bold"
                onClick={() => onTabChange('quiz')}
              >
                <span>Take Knowledge Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-between font-bold"
                onClick={() => onTabChange('graph')}
              >
                <span>Explore Knowledge Graph</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Key Concepts Breakdown & Key Takeaways */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Key Takeaways */}
        <div className="lg:col-span-7">
          <Card padding="lg" className="space-y-4 bg-dark-850/90 border-slate-800">
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-lightViolet" />
              Key Conceptual Takeaways
            </h3>

            <div className="space-y-3">
              {video.summary?.keyTakeaways?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-dark-900 border border-slate-800 flex items-start gap-3.5 text-xs sm:text-sm text-text-secondary leading-relaxed hover:border-slate-700 transition-colors"
                >
                  <span className="w-6 h-6 rounded-lg bg-brand-indigo/20 text-brand-lightViolet flex items-center justify-center font-mono text-xs shrink-0 mt-0.5 font-extrabold border border-brand-indigo/30">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Extracted Concepts & Mastery */}
        <div className="lg:col-span-5">
          <Card padding="lg" className="space-y-4 bg-dark-850/90 border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-heading">
                Concepts & Mastery
              </h3>
              <span className="text-xs font-mono text-text-muted">7 Topics</span>
            </div>

            <div className="space-y-3.5">
              {video.keyConcepts?.map((concept) => (
                <div key={concept.id} className="space-y-1.5 p-2 rounded-xl bg-dark-900/60 border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-text-primary">{concept.name}</span>
                    <Badge
                      variant={
                        concept.status === 'Mastered'
                          ? 'success'
                          : concept.status === 'Needs Revision'
                          ? 'warning'
                          : 'default'
                      }
                      size="sm"
                    >
                      {concept.status}
                    </Badge>
                  </div>
                  <ProgressBar
                    value={concept.mastery}
                    size="sm"
                    variant={concept.mastery >= 75 ? 'success' : concept.mastery >= 50 ? 'warning' : 'brand'}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
