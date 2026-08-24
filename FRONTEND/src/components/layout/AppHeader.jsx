import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, Sparkles, Flame } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';

export const AppHeader = ({ onMenuClick, title, subtitle }) => {
  const { user } = useAuth();
  const { learningMode, setLearningMode } = useLearning();
  const navigate = useNavigate();

  const modes = ['Beginner', 'College', 'Revision', 'Interview'];

  return (
    <header className="sticky top-0 z-20 h-16 bg-dark-900/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile menu toggle + page heading */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-dark-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          {title && <h1 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">{title}</h1>}
          {subtitle && <p className="text-xs text-text-muted hidden sm:block">{subtitle}</p>}
        </div>
      </div>

      {/* Right: Quick actions & user controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Streak badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>14 Day Streak</span>
        </div>

        {/* Global Learning Mode Switcher */}
        <div className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-dark-800 border border-slate-800">
          <span className="text-[11px] text-text-muted px-2 font-medium">Mode:</span>
          {modes.map((mode) => (
            <button
              key={mode}
              onClick={() => setLearningMode(mode)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                learningMode === mode
                  ? 'bg-brand-indigo text-white shadow-sm shadow-brand-indigo/30'
                  : 'text-text-secondary hover:text-white hover:bg-dark-700'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Notifications icon */}
        <button
          className="relative p-2 rounded-xl text-text-secondary hover:text-white hover:bg-dark-800 border border-slate-800 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-indigo animate-pulse" />
        </button>

        {/* User avatar */}
        <div
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-dark-800 transition-colors"
        >
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'}
            alt={user?.name || 'Alex'}
            className="w-8 h-8 rounded-xl object-cover border border-slate-700"
          />
        </div>
      </div>
    </header>
  );
};
