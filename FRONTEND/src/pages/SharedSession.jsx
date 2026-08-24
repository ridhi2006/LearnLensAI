import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Eye,
  Play,
  FileText,
  Network,
  Bot,
  Compass,
  ArrowRight,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { videoService } from '../services/videoService';

export const SharedSession = () => {
  const { shareId = 'demo-binary-search' } = useParams();
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      const v = await videoService.getVideoById(shareId);
      setVideo(v);
    };
    fetchVideo();
  }, [shareId]);

  if (!video) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center text-text-muted">
        Loading shared learning session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-text-primary flex flex-col selection:bg-brand-indigo/30 selection:text-brand-lightViolet">
      {/* Shared Public Top Navbar */}
      <header className="sticky top-0 z-30 h-16 bg-dark-900/90 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-indigo to-brand-violet p-0.5 shadow-md">
              <div className="w-full h-full bg-dark-900 rounded-[6px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-brand-lightViolet" />
              </div>
            </div>
            <span className="font-heading font-bold text-base text-white">LearnLens AI</span>
          </Link>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <span className="text-xs text-text-muted hidden sm:inline font-medium">Shared Learning Session</span>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="cyan" size="sm" icon={<Eye className="w-3 h-3" />}>
            View Only Access
          </Badge>
          <Button
            variant="primary"
            size="sm"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={() => navigate('/signup')}
          >
            Try LearnLens Free
          </Button>
        </div>
      </header>

      {/* Main Shared Content Container */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Shared Session Hero Header */}
        <div className="p-6 rounded-2xl bg-dark-800/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">
              Analyzed with College Mode
            </Badge>
            <span className="text-xs text-text-muted font-mono flex items-center gap-1">
              <Clock className="w-3 h-3" /> {video.duration}
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold font-heading text-white">
                {video.title}
              </h1>
              <p className="text-xs text-text-muted">
                Created by {video.channel} • Shared via LearnLens AI
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/signup')}
            >
              Clone to My Workspace
            </Button>
          </div>
        </div>

        {/* Video Overview & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card padding="lg" className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-lightViolet uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              Executive AI Summary
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              {video.summary?.headline}
            </p>
            <div className="space-y-2 pt-2 border-t border-slate-800">
              {video.summary?.keyTakeaways?.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-text-muted">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Cheat Notes Snapshot */}
          <Card padding="lg" className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-cyan uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              High-Yield Formulations
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-dark-900 border border-slate-800 font-mono">
                <span className="text-text-muted text-[10px] block">Midpoint Formula:</span>
                <span className="text-brand-cyan">mid = left + (right - left) // 2</span>
              </div>
              <div className="p-2.5 rounded-xl bg-dark-900 border border-slate-800 font-mono">
                <span className="text-text-muted text-[10px] block">Lower Bound Definition:</span>
                <span className="text-brand-lightViolet">min {'{ i | arr[i] >= target }'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-dark-900 border border-slate-800 font-mono">
                <span className="text-text-muted text-[10px] block">Time Complexity:</span>
                <span className="text-emerald-400">O(log n) worst case</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Selected AI Tutor Interaction Preview */}
        <Card padding="lg" className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-text-primary uppercase tracking-wider">
              <Bot className="w-4 h-4 text-brand-lightViolet" />
              AI Tutor Discussion Snippet
            </div>
            <Badge variant="primary" size="sm">Socratic Evaluation</Badge>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-brand-indigo/15 border border-brand-indigo/30 text-brand-lightViolet font-medium max-w-lg">
              Q: Why does Binary Search require sorted data?
            </div>
            <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 text-text-secondary leading-relaxed max-w-xl">
              Binary Search decides which half of the search space can be discarded reliably on every comparison. Without monotonicity, we cannot rule out the existence of the target in the eliminated partition.
            </div>
          </div>
        </Card>

        {/* Bottom CTA Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-brand-indigo/20 via-brand-violet/20 to-brand-cyan/20 border border-brand-indigo/40 text-center space-y-4 shadow-xl">
          <h3 className="text-xl font-bold font-heading text-white">
            Want to transform your own YouTube learning videos?
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto">
            Extract transcripts, generate custom study kits, explore interactive knowledge graphs, and detect your learning gaps with LearnLens AI.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="font-bold"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => navigate('/signup')}
          >
            Get Started with LearnLens Free
          </Button>
        </div>
      </main>
    </div>
  );
};
