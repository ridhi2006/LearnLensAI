import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  GraduationCap,
  Plus,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  LogOut,
  Layers,
  Search
} from 'lucide-react';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Learning', path: '/my-learning', icon: GraduationCap },
    { label: 'Library', path: '/library', icon: BookOpen },
  ];

  const recentSessions = [
    { title: 'Binary Search Mastery', id: 'demo-binary-search', progress: 72 },
    { title: 'Graph BFS & DFS', id: 'graph-bfs-dfs', progress: 45 },
    { title: 'React Hooks Deep Dive', id: 'react-hooks', progress: 88 },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-30 bg-dark-900 border-r border-slate-800/80 flex flex-col justify-between transition-all duration-300 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header & Logo */}
      <div className="p-4 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2.5 overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-cyan p-0.5 shrink-0 shadow-md shadow-brand-indigo/20">
              <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-lightViolet group-hover:text-brand-cyan transition-colors" />
              </div>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg tracking-tight text-white flex items-center gap-1.5 whitespace-nowrap">
                  LearnLens <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-indigo/20 text-brand-lightViolet font-mono border border-brand-indigo/30">AI</span>
                </span>
                <span className="text-[10px] text-text-muted font-medium">Video Intelligence</span>
              </div>
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-dark-800 border border-transparent hover:border-slate-700 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Primary Action Button */}
        <div>
          {isCollapsed ? (
            <button
              onClick={() => navigate('/analyze')}
              className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet flex items-center justify-center text-white shadow-lg shadow-brand-indigo/25 hover:brightness-110 transition-all"
              title="Analyze New Video"
            >
              <Plus className="w-5 h-5" />
            </button>
          ) : (
            <Button
              variant="primary"
              size="md"
              leftIcon={<Plus className="w-4 h-4" />}
              className="w-full justify-start text-xs font-semibold uppercase tracking-wider"
              onClick={() => navigate('/analyze')}
            >
              Analyze New Video
            </Button>
          )}
        </div>

        {/* Navigation links */}
        <nav className="space-y-1.5 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-brand-indigo/15 text-brand-lightViolet border border-brand-indigo/30 font-semibold shadow-sm'
                      : 'text-text-secondary hover:text-white hover:bg-dark-800/80 border border-transparent'
                  }`
                }
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-lightViolet' : 'text-text-muted group-hover:text-white'}`} />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* RECENT section */}
        {!isCollapsed && (
          <div className="pt-4 border-t border-slate-800/80">
            <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
              <span>Recent Sessions</span>
              <Layers className="w-3 h-3 text-text-muted" />
            </div>
            <div className="space-y-1">
              {recentSessions.map((session) => {
                const isSessionActive = location.pathname.includes(session.id);
                return (
                  <Link
                    key={session.id}
                    to={`/learn/${session.id}`}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors group ${
                      isSessionActive
                        ? 'bg-dark-700 text-white font-medium border border-slate-700'
                        : 'text-text-secondary hover:text-white hover:bg-dark-800/60'
                    }`}
                  >
                    <span className="truncate pr-2">{session.title}</span>
                    <span className="text-[10px] text-text-muted font-mono bg-dark-900 px-1.5 py-0.5 rounded border border-slate-800 shrink-0">
                      {session.progress}%
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Profile / Settings */}
      <div className="p-4 border-t border-slate-800/80 space-y-2">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              isActive ? 'bg-dark-700 text-white' : 'text-text-secondary hover:text-white hover:bg-dark-800'
            }`
          }
        >
          <Settings className="w-4 h-4 shrink-0 text-text-muted" />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>

        {/* User Card */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'}
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0"
            />
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-text-primary truncate">{user?.name || 'Alex Chen'}</span>
                <span className="text-[10px] text-brand-lightViolet font-mono">{user?.tier || 'Student Pro'}</span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              title="Sign Out"
              className="p-1.5 text-text-muted hover:text-accent-error rounded-lg hover:bg-dark-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
