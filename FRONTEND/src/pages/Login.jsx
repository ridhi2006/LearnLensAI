import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { GithubIcon } from '../components/common/BrandIcons';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Login = () => {
  const [email, setEmail] = useState('alex.chen@learnlens.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      showToast({
        title: 'Welcome back, Alex!',
        message: 'Successfully signed in to your LearnLens AI workspace.',
        type: 'success'
      });
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-indigo/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-violet/15 blur-3xl pointer-events-none rounded-full" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-dark-800/80 border border-slate-800/80 shadow-2xl backdrop-blur-xl overflow-hidden relative z-10">
        {/* Left Branding Showcase */}
        <div className="lg:col-span-5 p-8 sm:p-12 bg-gradient-to-br from-brand-indigo/10 via-dark-800 to-dark-900 border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-cyan p-0.5 shadow-md">
                <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-brand-lightViolet" />
                </div>
              </div>
              <span className="font-heading font-bold text-xl text-white">LearnLens AI</span>
            </Link>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-tight">
              Welcome back to smarter learning.
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
              Resume your structured video notes, review identified knowledge gaps, and practice your adaptive AI roadmap.
            </p>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-800/80 space-y-3">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Recent Session
            </div>
            <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800 text-xs flex items-center justify-between">
              <span className="font-medium text-text-primary">Binary Search Mastery</span>
              <span className="text-[10px] font-mono text-brand-lightViolet bg-brand-indigo/20 px-2 py-0.5 rounded">
                72% Done
              </span>
            </div>
          </div>
        </div>

        {/* Right Sign In Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div>
              <h3 className="text-2xl font-bold font-heading text-white">Sign In</h3>
              <p className="text-xs text-text-muted mt-1">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">Email Address</label>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-700/80 focus-within:border-brand-indigo transition-colors">
                  <Mail className="w-4 h-4 text-text-muted shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@learnlens.ai"
                    className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-text-secondary">Password</label>
                  <a href="#forgot" className="text-xs text-brand-lightViolet hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-700/80 focus-within:border-brand-indigo transition-colors">
                  <Lock className="w-4 h-4 text-text-muted shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-text-muted hover:text-text-primary"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-dark-900 text-brand-indigo focus:ring-brand-indigo/40"
                />
                <label htmlFor="remember" className="text-xs text-text-secondary select-none cursor-pointer">
                  Remember this device for 30 days
                </label>
              </div>

              {/* Sign In CTA */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full font-semibold"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In
              </Button>
            </form>

            {/* Social Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-dark-800 px-3 text-xs text-text-muted absolute">Or continue with</span>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleLogin}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-dark-900 border border-slate-800 text-xs font-medium text-text-secondary hover:text-white hover:border-slate-700 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.7 0 3 .6 4 1.5l3-3C17.2 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                  <path fill="#FBBC05" d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8 0-1 .2-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"/>
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={handleLogin}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-dark-900 border border-slate-800 text-xs font-medium text-text-secondary hover:text-white hover:border-slate-700 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </button>
            </div>

            {/* Link to Signup */}
            <div className="text-center pt-2 text-xs text-text-muted">
              Don't have an account?{' '}
              <Link to="/signup" className="text-brand-lightViolet font-semibold hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
