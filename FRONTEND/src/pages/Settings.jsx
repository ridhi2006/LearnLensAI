import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Settings as SettingsIcon,
  Bell,
  Sliders,
  Moon,
  Sparkles,
  Check,
  Save
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';
import { useLearning } from '../context/LearningContext';
import { useToast } from '../context/ToastContext';

export const Settings = () => {
  const { user } = useAuth();
  const { learningMode, setLearningMode } = useLearning();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || 'Alex Chen');
  const [email, setEmail] = useState(user?.email || 'alex.chen@learnlens.ai');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoPlayVideo, setAutoPlayVideo] = useState(false);

  const handleSavePreferences = (e) => {
    e.preventDefault();
    showToast({
      title: 'Settings Saved',
      message: 'Your profile and learning preferences have been updated.',
      type: 'success'
    });
  };

  return (
    <AppLayout title="Settings" subtitle="Manage your profile, learning modes, and platform preferences.">
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <form onSubmit={handleSavePreferences} className="space-y-6">
          {/* Profile Card */}
          <Card padding="lg" className="space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <User className="w-5 h-5 text-brand-lightViolet" />
              <h3 className="text-base font-bold text-text-primary font-heading">
                Profile Information
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt="Profile Avatar"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-indigo/40 shadow-lg"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-text-primary">{name}</span>
                  <Badge variant="primary" size="sm">{user?.tier || 'Student Pro'}</Badge>
                </div>
                <p className="text-xs text-text-muted">Pro tier active until Dec 2026</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-dark-900 border border-slate-700 text-xs text-text-primary outline-none focus:border-brand-indigo transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-dark-900 border border-slate-700 text-xs text-text-primary outline-none focus:border-brand-indigo transition-colors"
                />
              </div>
            </div>
          </Card>

          {/* Learning Preferences & Default Mode */}
          <Card padding="lg" className="space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <Sliders className="w-5 h-5 text-brand-cyan" />
              <div>
                <h3 className="text-base font-bold text-text-primary font-heading">
                  Learning Preferences
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Set default explanation depth across all analyzed videos.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
                Default Learning Mode
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Beginner', 'College', 'Revision', 'Interview'].map((mode) => {
                  const isSelected = learningMode === mode;
                  return (
                    <div
                      key={mode}
                      onClick={() => setLearningMode(mode)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none text-center ${
                        isSelected
                          ? 'bg-brand-indigo/20 border-brand-indigo text-brand-lightViolet font-semibold ring-1 ring-brand-indigo'
                          : 'bg-dark-900 border-slate-800 text-text-secondary hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{mode}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-dark-900 border border-slate-800">
                <div>
                  <span className="text-xs font-medium text-text-primary block">Auto-play video on timestamp jump</span>
                  <span className="text-[10px] text-text-muted">Automatically starts video playback when selecting transcript timestamps.</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoPlayVideo}
                  onChange={(e) => setAutoPlayVideo(e.target.checked)}
                  className="rounded border-slate-700 bg-dark-800 text-brand-indigo focus:ring-brand-indigo/40"
                />
              </div>
            </div>
          </Card>

          {/* Notifications & Appearance */}
          <Card padding="lg" className="space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <Bell className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-text-primary font-heading">
                Notifications & Appearance
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-dark-900 border border-slate-800">
                <div>
                  <span className="text-xs font-medium text-text-primary block">Weekly Knowledge Retention Digest</span>
                  <span className="text-[10px] text-text-muted">Receive a weekly summary of mastered vs weak topics.</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="rounded border-slate-700 bg-dark-800 text-brand-indigo focus:ring-brand-indigo/40"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-dark-900 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Moon className="w-4 h-4 text-brand-lightViolet" />
                  <div>
                    <span className="text-xs font-medium text-text-primary block">Dark Intelligence Theme</span>
                    <span className="text-[10px] text-text-muted">High-contrast dark-first design system active.</span>
                  </div>
                </div>
                <Badge variant="primary" size="sm">Active (Dark-First)</Badge>
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Preferences
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};
