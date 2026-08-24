import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Flame,
  Award,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  CircleDot,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { MOCK_USER } from '../data/mockUserData';

export const MyLearning = () => {
  const navigate = useNavigate();

  return (
    <AppLayout title="My Learning" subtitle="A complete view of what you're learning and where to improve.">
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card padding="default" className="space-y-2">
            <div className="flex items-center justify-between text-text-muted">
              <span className="text-xs font-semibold uppercase tracking-wider">Overall Mastery</span>
              <Award className="w-4 h-4 text-brand-lightViolet" />
            </div>
            <div className="text-3xl font-extrabold font-heading text-white">
              74%
            </div>
            <ProgressBar value={74} size="sm" variant="brand" />
          </Card>

          <Card padding="default" className="space-y-2">
            <div className="flex items-center justify-between text-text-muted">
              <span className="text-xs font-semibold uppercase tracking-wider">Learning Streak</span>
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <div className="text-3xl font-extrabold font-heading text-white">
              {MOCK_USER.learningStreakDays} Days
            </div>
            <p className="text-[11px] text-amber-400 font-medium">
              Personal best streak!
            </p>
          </Card>

          <Card padding="default" className="space-y-2">
            <div className="flex items-center justify-between text-text-muted">
              <span className="text-xs font-semibold uppercase tracking-wider">Concepts Learned</span>
              <Sparkles className="w-4 h-4 text-brand-cyan" />
            </div>
            <div className="text-3xl font-extrabold font-heading text-white">
              {MOCK_USER.stats.conceptsLearned}
            </div>
            <p className="text-[11px] text-brand-cyan font-medium">
              Across 4 core domains
            </p>
          </Card>

          <Card padding="default" className="space-y-2">
            <div className="flex items-center justify-between text-text-muted">
              <span className="text-xs font-semibold uppercase tracking-wider">Topics to Revise</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold font-heading text-white">
              {MOCK_USER.stats.topicsToRevise}
            </div>
            <p className="text-[11px] text-amber-400 font-medium">
              Pending in roadmap
            </p>
          </Card>
        </div>

        {/* DSA Category Mastery Breakdown */}
        <Card padding="lg" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-text-primary font-heading flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-brand-lightViolet" />
                Data Structures & Algorithms Mastery Map
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Calculated from quizzes, AI assessments, and topic problem counts.
              </p>
            </div>
            <Badge variant="primary" size="md">
              Computer Science Track
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_USER.dsaCategories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => navigate('/learn/demo-binary-search')}
                className="p-4 rounded-2xl bg-dark-900 border border-slate-800 hover:border-brand-indigo/40 transition-all cursor-pointer space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-primary group-hover:text-brand-lightViolet transition-colors">
                    {cat.name}
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {cat.mastery}%
                  </span>
                </div>
                <ProgressBar
                  value={cat.mastery}
                  size="sm"
                  variant={cat.mastery >= 80 ? 'success' : cat.mastery >= 60 ? 'brand' : cat.mastery >= 40 ? 'warning' : 'danger'}
                />
                <div className="flex items-center justify-between text-[10px] text-text-muted">
                  <span>{cat.count} Concepts</span>
                  <Badge variant={cat.mastery >= 80 ? 'success' : cat.mastery >= 60 ? 'primary' : 'warning'} size="sm">
                    {cat.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Diagnostic Action Queues: Needs Revision vs Recently Mastered */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Needs Revision */}
          <Card padding="lg" className="space-y-4 border-amber-500/30">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Needs Revision Queue
              </span>
              <Badge variant="warning" size="sm">5 Topics</Badge>
            </div>

            <div className="space-y-2.5">
              {MOCK_USER.weakTopicsSummary.map((item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between gap-3 hover:border-amber-500/30 transition-colors"
                >
                  <div>
                    <div className="text-xs font-bold text-text-primary">{item.topic}</div>
                    <div className="text-[10px] text-text-muted mt-0.5">{item.category} • {item.sourceVideo}</div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs px-3 py-1"
                    onClick={() => navigate('/learn/demo-binary-search')}
                  >
                    Revise
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Recently Mastered */}
          <Card padding="lg" className="space-y-4 border-emerald-500/30">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Recently Mastered Concepts
              </span>
              <Badge variant="success" size="sm">Verified</Badge>
            </div>

            <div className="space-y-2.5">
              {[
                { title: 'Search Space Monotonicity', category: 'Binary Search', date: 'Yesterday' },
                { title: 'Safe Midpoint Arithmetic', category: 'Binary Search', date: 'Yesterday' },
                { title: 'Adjacency List Traversal', category: 'Graphs', date: '3 days ago' },
                { title: 'React 19 Fiber Linked List', category: 'Frontend', date: '5 days ago' },
                { title: 'Preemptive Round Robin', category: 'Operating Systems', date: 'Last week' }
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-semibold text-text-primary">{item.title}</span>
                      <span className="text-[10px] text-text-muted block">{item.category}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted">{item.date}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};
