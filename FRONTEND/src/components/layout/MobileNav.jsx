import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Plus,
  Settings,
  Sparkles,
  LogOut
} from 'lucide-react';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';

export const MobileNav = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Learning', path: '/my-learning', icon: GraduationCap },
    { label: 'Library', path: '/library', icon: BookOpen },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-4/5 max-w-xs h-full bg-dark-900 border-r border-slate-800 p-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <Link to="/dashboard" onClick={onClose} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-violet p-0.5">
                    <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-brand-lightViolet" />
                    </div>
                  </div>
                  <span className="font-heading font-bold text-lg text-white">LearnLens AI</span>
                </Link>
                <button onClick={onClose} className="p-1.5 text-text-muted hover:text-white rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action Button */}
              <Button
                variant="primary"
                size="md"
                className="w-full justify-start text-xs font-semibold uppercase"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => {
                  onClose();
                  navigate('/analyze');
                }}
              >
                Analyze New Video
              </Button>

              {/* Nav */}
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-brand-indigo/20 text-brand-lightViolet border border-brand-indigo/30'
                            : 'text-text-secondary hover:text-white hover:bg-dark-800'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* User */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'}
                  alt={user?.name || 'User'}
                  className="w-9 h-9 rounded-xl object-cover border border-slate-700"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">{user?.name || 'Alex Chen'}</span>
                  <span className="text-xs text-text-muted">{user?.tier || 'Student Pro'}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  onClose();
                  navigate('/login');
                }}
                className="p-2 text-text-muted hover:text-accent-error"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
