import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  FileText,
  Layers,
  Network,
  HelpCircle,
  MessageSquare,
  Compass,
  Share2,
  Bookmark,
  Sparkles,
  ExternalLink,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { OverviewView } from '../components/video/OverviewView';
import { TranscriptView } from '../components/transcript/TranscriptView';
import { NotesView } from '../components/notes/NotesView';
import { GraphView } from '../components/graph/GraphView';
import { QuizView } from '../components/quiz/QuizView';
import { TutorView } from '../components/tutor/TutorView';
import { LearningPathView } from '../components/learning/LearningPathView';
import { useLearning } from '../context/LearningContext';
import { videoService } from '../../src/services/videoService';
import { useToast } from '../context/ToastContext';

export const LearningWorkspace = () => {
  const { videoId = 'demo-binary-search' } = useParams();
  const [video, setVideo] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const { activeTab, setActiveTab, learningMode, setIsShareModalOpen } = useLearning();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      const v = await videoService.getVideoById(videoId);
      setVideo(v);
    };
    fetchVideo();
  }, [videoId]);

  const handleSave = () => {
    setIsSaved(!isSaved);
    showToast({
      title: isSaved ? 'Removed from Bookmarks' : 'Saved to Library!',
      message: isSaved ? 'Session removed from your pinned list.' : 'Learning session saved with all progress and notes.',
      type: 'success'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Play },
    { id: 'transcript', label: 'Transcript', icon: FileText },
    { id: 'notes', label: 'Notes & Cheat Sheet', icon: Layers },
    { id: 'graph', label: 'Knowledge Graph', icon: Network },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle, badge: '8/10' },
    { id: 'tutor', label: 'AI Tutor', icon: MessageSquare },
    { id: 'roadmap', label: 'Learning Path', icon: Compass },
  ];

  if (!video) {
    return (
      <AppLayout title="Loading Workspace..." hideHeader>
        <div className="flex items-center justify-center min-h-[400px]">
          <span className="text-sm text-text-muted">Loading learning workspace...</span>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout hideHeader>
      <div className="max-w-7xl mx-auto space-y-6 pb-12">
        {/* Workspace Top Header */}
        <div className="p-4 sm:p-5 rounded-2xl bg-dark-800/90 border border-slate-800/80 shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-xl text-text-muted hover:text-white hover:bg-dark-700 transition-colors shrink-0"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-14 h-10 rounded-lg object-cover border border-slate-700 shrink-0 hidden sm:block"
            />

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="primary" size="sm">
                  {learningMode} Mode
                </Badge>
                <span className="text-xs text-text-muted font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {video.duration}
                </span>
                <span className="text-xs text-text-muted hidden sm:inline">•</span>
                <span className="text-xs text-text-muted hidden sm:inline">{video.channel}</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-text-primary font-heading truncate mt-0.5">
                {video.title}
              </h1>
            </div>
          </div>

          {/* Top Actions: Save, Share */}
          <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0">
            <Button
              variant={isSaved ? 'primary' : 'secondary'}
              size="sm"
              leftIcon={<Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />}
              onClick={handleSave}
            >
              {isSaved ? 'Saved' : 'Save'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Share2 className="w-3.5 h-3.5 text-brand-cyan" />}
              onClick={() => setIsShareModalOpen(true)}
            >
              Share Session
            </Button>
          </div>
        </div>

        {/* Secondary Navigation Workspace Tabs (Horizontally scrollable on mobile) */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-dark-800/80 border border-slate-800/80 overflow-x-auto no-scrollbar shadow-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-brand-indigo text-white shadow-lg shadow-brand-indigo/30 font-semibold'
                    : 'text-text-secondary hover:text-white hover:bg-dark-700/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-dark-900 text-emerald-400 border border-slate-800'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tab View */}
        <div className="pt-2">
          {activeTab === 'overview' && (
            <OverviewView video={video} onTabChange={setActiveTab} />
          )}
          {activeTab === 'transcript' && (
            <TranscriptView videoId={video.id} />
          )}
          {activeTab === 'notes' && (
            <NotesView video={video} />
          )}
          {activeTab === 'graph' && (
            <GraphView videoId={video.id} onTabChange={setActiveTab} />
          )}
          {activeTab === 'quiz' && (
            <QuizView videoId={video.id} onTabChange={setActiveTab} />
          )}
          {activeTab === 'tutor' && (
            <TutorView onTabChange={setActiveTab} />
          )}
          {activeTab === 'roadmap' && (
            <LearningPathView videoId={video.id} onTabChange={setActiveTab} />
          )}
        </div>
      </div>
    </AppLayout>
  );
};
