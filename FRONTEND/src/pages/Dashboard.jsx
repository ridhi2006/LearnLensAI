import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  Sparkles,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  Flame,
  CheckCircle2,
  ChevronRight,
  Zap
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { useLearning } from '../context/LearningContext';
import { MOCK_USER } from '../data/mockUserData';
import { MOCK_VIDEOS } from '../data/mockVideos';

export const Dashboard = () => {
  const { user } = useAuth();
  const { setActiveVideoId } = useLearning();
  const navigate = useNavigate();

  const handleResumeVideo = (id) => {
    setActiveVideoId(id);
    navigate(`/learn/${id}`);
  };

  return (
    <AppLayout title={`Good evening, ${user?.name?.split(' ')[0] || 'Alex'}`} subtitle="Continue your personalized learning journey.">
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        {/* Top Hero Banner — Continue Learning & Quick Analyze Action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Primary Continue Learning Card */}
          <div className="lg:col-span-8">
            <Card
              padding="lg"
              className="h-full bg-gradient-to-r from-dark-850/95 via-dark-800/90 to-brand-indigo/15 border-brand-indigo/40 shadow-2xl relative overflow-hidden flex flex-col justify-between"
            >
              {/* Background ambient light */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-indigo/20 blur-[100px] pointer-events-none rounded-full" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="md" dot>
                    In Progress • Active Session
                  </Badge>
                  <span className="text-xs font-mono text-brand-lightViolet font-semibold bg-dark-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                    Module 2 of 4
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center pt-2">
                  <div className="sm:col-span-4 relative rounded-2xl overflow-hidden aspect-video border border-brand-indigo/40 group cursor-pointer shadow-xl" onClick={() => handleResumeVideo('demo-binary-search')}>
                    <img
                      src="https://images.unsplash.com/photo-1516116211227-bbc13c6314f4?w=600&auto=format&fit=crop&q=80"
                      alt="Binary Search Mastery"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-dark-950/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-brand-indigo text-white flex items-center justify-center shadow-xl shadow-brand-indigo/60 group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-8 space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                      Binary Search Complete Tutorial
                    </h2>
                    <p className="text-xs sm:text-sm text-text-secondary line-clamp-2">
                      Master divide-and-conquer search space elimination, safe midpoint calculations, and lower/upper bounds.
                    </p>

                    <div className="flex items-center gap-4 pt-1 text-xs text-text-muted font-mono">
                      <span>Quiz Score: <strong className="text-emerald-400">8/10</strong></span>
                      <span>•</span>
                      <span>Mastery: <strong className="text-brand-lightViolet">72%</strong></span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="pt-2">
                  <ProgressBar value={72} showLabel label="Workspace Completion" variant="brand" />
                </div>
              </div>

              {/* Action row */}
              <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-text-muted">Resumes at timestamp <strong className="text-brand-cyan font-mono">17:32</strong></span>
                <Button
                  variant="primary"
                  size="md"
                  className="font-bold shadow-lg shadow-brand-indigo/30"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => handleResumeVideo('demo-binary-search')}
                >
                  Continue Learning
                </Button>
              </div>
            </Card>
          </div>

          {/* Quick Action: Analyze New Video Card */}
          <div className="lg:col-span-4">
            <Card
              padding="lg"
              className="h-full bg-dark-850/90 border-slate-800 flex flex-col justify-between space-y-5 shadow-xl"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-indigo/15 border border-brand-indigo/30 flex items-center justify-center text-brand-lightViolet shadow-md">
                  <Sparkles className="w-6 h-6 text-brand-cyan" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-white">
                    Analyze New Video
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed font-normal">
                    Paste any educational YouTube lecture to extract transcripts, build knowledge graphs, and detect gaps.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <Button
                  variant="cyan"
                  size="md"
                  className="w-full justify-center font-bold"
                  leftIcon={<Plus className="w-4 h-4" />}
                  onClick={() => navigate('/analyze')}
                >
                  Analyze YouTube URL
                </Button>
                <p className="text-[11px] text-center text-text-muted font-mono">
                  Supports CS, Math, AI/ML & Engineering
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Learning Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card padding="default" className="space-y-2 bg-dark-850/90 border-slate-800 hover:border-brand-indigo/40 transition-colors">
            <div className="flex items-center justify-between text-text-muted">
              <span className="text-xs font-bold uppercase tracking-wider">Videos Analyzed</span>
              <BookOpen className="w-4 h-4 text-brand-lightViolet" />
            </div>
            <div className="text-3xl font-extrabold font-heading text-white">
              {MOCK_USER.stats.videosAnalyzed}
            </div>
            <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <span>+3 this week</span>
            </p>
          </Card>

          <Card padding="default" className="space-y-2 bg-dark-850/90 border-slate-800 hover:border-brand-cyan/40 transition-colors">
            <div className="flex items-center justify-between text-text-muted">
              <span className="text-xs font-bold uppercase tracking-wider">Concepts Learned</span>
              <Sparkles className="w-4 h-4 text-brand-cyan" />
            </div>
            <div className="text-3xl font-extrabold font-heading text-white">
              {MOCK_USER.stats.conceptsLearned}
            </div>
            <p className="text-[11px] text-brand-cyan font-semibold">
              85% Retention rate
            </p>
          </Card>

          <Card padding="default" className="space-y-2 bg-dark-850/90 border-slate-800 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between text-text-muted">
              <span className="text-xs font-bold uppercase tracking-wider">Quiz Average</span>
              <HelpCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold font-heading text-white">
              {MOCK_USER.stats.quizAverage}%
            </div>
            <p className="text-[11px] text-emerald-400 font-semibold">
              Top 15% in cohort
            </p>
          </Card>

          <Card padding="default" className="space-y-2 bg-dark-850/90 border-slate-800 hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between text-text-muted">
              <span className="text-xs font-bold uppercase tracking-wider">Topics to Revise</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold font-heading text-white">
              {MOCK_USER.stats.topicsToRevise}
            </div>
            <p className="text-[11px] text-amber-400 font-semibold">
              Action recommended
            </p>
          </Card>
        </div>

        {/* Middle Row: Weekly Study Trend Chart + Weak Topics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Study Activity Chart */}
          <div className="lg:col-span-7">
            <Card padding="lg" className="h-full space-y-4 bg-dark-850/90 border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    Weekly Study & Retention Trend
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Minutes spent & quiz accuracy over the last 7 days
                  </p>
                </div>
                <Badge variant="cyan" size="sm">Active Week</Badge>
              </div>

              <div className="h-56 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_USER.recentActivityChart}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748B" fontSize={11} tickLine={false} domain={[40, 100]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                      itemStyle={{ color: '#A78BFA' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" name="Quiz Score %" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Weak Topics Diagnostic */}
          <div className="lg:col-span-5">
            <Card padding="lg" className="h-full space-y-4 flex flex-col justify-between bg-dark-850/90 border-slate-800">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <h3 className="text-base font-bold text-white font-heading">
                      Identified Weak Topics
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-amber-400 font-bold">Priority Queue</span>
                </div>
                <p className="text-xs text-text-muted">
                  These concepts had the lowest quiz scores and need targeted revision.
                </p>

                <div className="space-y-2 pt-1">
                  {MOCK_USER.weakTopicsSummary.slice(0, 3).map((item) => (
                    <div
                      key={item.topic}
                      onClick={() => handleResumeVideo('demo-binary-search')}
                      className="p-3.5 rounded-2xl bg-dark-900 border border-slate-800 hover:border-amber-500/50 cursor-pointer flex items-center justify-between transition-all group hover:scale-[1.01]"
                    >
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                          {item.topic}
                        </div>
                        <div className="text-[10px] text-text-muted mt-0.5 font-medium">
                          {item.category} • {item.sourceVideo}
                        </div>
                      </div>
                      <Badge variant="warning" size="sm">
                        Revise
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-between mt-2 font-bold"
                onClick={() => navigate('/my-learning')}
              >
                <span>View Full Knowledge Gap Analysis</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Card>
          </div>
        </div>

        {/* Bottom Row: Recommended Next & Recent Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Recommended Next Topics */}
          <div className="lg:col-span-5 space-y-4">
            <Card padding="lg" className="space-y-4 bg-dark-850/90 border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-cyan" />
                  Recommended Next
                </h3>
                <span className="text-xs text-text-muted font-mono">AI Computed</span>
              </div>

              <div className="space-y-2.5">
                {MOCK_USER.recommendedNext.map((rec) => (
                  <div
                    key={rec.title}
                    className="p-3.5 rounded-2xl bg-dark-900 border border-slate-800 flex items-center justify-between gap-3 hover:border-brand-cyan/40 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{rec.title}</div>
                      <div className="text-[10px] text-text-muted mt-0.5">{rec.category} • {rec.difficulty} • ETA {rec.eta}</div>
                    </div>
                    <Button
                      variant="cyan"
                      size="sm"
                      className="shrink-0 text-xs px-3 py-1 font-bold"
                      onClick={() => navigate('/learn/demo-binary-search')}
                    >
                      Start
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Learning Sessions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-heading">
                Recent Learning Sessions
              </h3>
              <button
                onClick={() => navigate('/library')}
                className="text-xs text-brand-lightViolet hover:underline font-bold"
              >
                View all library
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.values(MOCK_VIDEOS).slice(0, 2).map((vid) => (
                <Card
                  key={vid.id}
                  hover
                  padding="none"
                  onClick={() => handleResumeVideo(vid.id)}
                  className="overflow-hidden border-slate-800 bg-dark-850/90 flex flex-col justify-between shadow-xl"
                >
                  <div className="relative aspect-video bg-dark-950">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono text-white border border-white/10">
                      {vid.duration}
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {vid.title}
                    </h4>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] text-text-muted">
                        <span>Progress</span>
                        <span className="font-bold text-white">{vid.progress}%</span>
                      </div>
                      <ProgressBar value={vid.progress} size="sm" />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-text-muted">{vid.channel}</span>
                      <span className="text-xs font-bold text-brand-lightViolet flex items-center gap-1">
                        Resume <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
