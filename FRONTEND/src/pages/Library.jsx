import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  LayoutGrid,
  List,
  Play,
  Clock,
  BookOpen,
  Award,
  ArrowRight,
  Filter,
  Plus
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { videoService } from '../services/videoService';
import { useLearning } from '../context/LearningContext';

export const Library = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'in-progress' | 'completed' | 'recent'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const { setActiveVideoId } = useLearning();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      const list = await videoService.getAllVideos();
      setVideos(list);
    };
    fetchVideos();
  }, []);

  const handleContinue = (id) => {
    setActiveVideoId(id);
    navigate(`/learn/${id}`);
  };

  const filteredVideos = videos.filter((v) => {
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.channel.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'in-progress') return v.progress > 0 && v.progress < 100;
    if (activeFilter === 'completed') return v.progress === 100;
    return true;
  });

  return (
    <AppLayout title="My Library" subtitle="Your collection of analyzed video lectures, notes and quizzes.">
      <div className="max-w-7xl mx-auto space-y-6 pb-12">
        {/* Search, Filters, and View Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="p-2 rounded-2xl bg-dark-800 border border-slate-800 flex items-center gap-2.5 px-3.5 flex-1 max-w-md focus-within:border-brand-indigo transition-colors">
            <Search className="w-4 h-4 text-text-muted shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search library by video title or channel..."
              className="w-full bg-transparent text-xs sm:text-sm text-text-primary outline-none placeholder:text-text-muted"
            />
          </div>

          {/* Filters and Grid/List Toggles */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-dark-800 border border-slate-800 text-xs">
              {['all', 'in-progress', 'completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                    activeFilter === f
                      ? 'bg-brand-indigo text-white shadow-sm font-semibold'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {f.replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Grid / List toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-dark-800 border border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-dark-700 text-white' : 'text-text-muted hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-dark-700 text-white' : 'text-text-muted hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => navigate('/analyze')}
            >
              Analyze New
            </Button>
          </div>
        </div>

        {/* Video Cards Grid / List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card
                key={video.id}
                hover
                padding="none"
                className="overflow-hidden border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div
                    className="relative aspect-video bg-dark-950 cursor-pointer group"
                    onClick={() => handleContinue(video.id)}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-dark-950/20 group-hover:bg-dark-950/40 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-brand-indigo/90 text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-4 h-4 ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[11px] text-white">
                      {video.duration}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="primary" size="sm">
                        {video.difficulty}
                      </Badge>
                      <span className="text-[10px] text-text-muted">{video.publishedDate}</span>
                    </div>

                    <h3 className="text-sm font-bold text-text-primary font-heading line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-xs text-text-muted line-clamp-2">
                      {video.summary?.headline}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs text-text-secondary font-medium">
                        <span>Mastery Progress</span>
                        <span className="font-mono text-brand-lightViolet">{video.progress}%</span>
                      </div>
                      <ProgressBar value={video.progress} size="sm" />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-2">
                  <div className="text-[11px] text-text-muted font-mono">
                    Quiz: <strong className="text-emerald-400">{video.quizScore}/10</strong>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    onClick={() => handleContinue(video.id)}
                  >
                    Continue
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            {filteredVideos.map((video) => (
              <Card
                key={video.id}
                hover
                padding="default"
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-slate-800"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-24 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="primary" size="sm">{video.difficulty}</Badge>
                      <span className="text-xs text-text-muted font-mono">{video.duration}</span>
                      <span className="text-xs text-text-muted">• {video.channel}</span>
                    </div>
                    <h3 className="text-sm font-bold text-text-primary font-heading truncate">
                      {video.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-end sm:self-auto shrink-0">
                  <div className="w-32 hidden md:block">
                    <div className="text-[11px] text-text-muted mb-1 text-right">{video.progress}% Mastered</div>
                    <ProgressBar value={video.progress} size="sm" />
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    onClick={() => handleContinue(video.id)}
                  >
                    Continue
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};
