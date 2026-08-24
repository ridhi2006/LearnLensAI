import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, User, Mail, Lock, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast({
        title: 'Passwords do not match',
        message: 'Please verify that both passwords are identical.',
        type: 'error'
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      signup(name, email, password);
      setIsLoading(false);
      showToast({
        title: 'Account created!',
        message: 'Welcome to LearnLens AI! Let us start analyzing your first educational video.',
        type: 'success'
      });
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-violet/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand-cyan/15 blur-3xl pointer-events-none rounded-full" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-dark-800/80 border border-slate-800/80 shadow-2xl backdrop-blur-xl overflow-hidden relative z-10">
        {/* Left Info Panel */}
        <div className="lg:col-span-5 p-8 sm:p-12 bg-gradient-to-br from-brand-violet/10 via-dark-800 to-dark-900 border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between">
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
              Start retaining 10x more from video lectures.
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
              Create your account to unlock interactive knowledge graphs, timestamp Q&A, and personalized learning roadmaps.
            </p>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-800/80 space-y-2.5">
            <div className="flex items-center gap-2.5 text-xs text-text-secondary">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <span>Timestamp-synchronized interactive transcripts</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-text-secondary">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <span>Knowledge gap diagnostic from quiz results</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-text-secondary">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <span>Personalized AI Tutor in 4 learning modes</span>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-5">
            <div>
              <h3 className="text-2xl font-bold font-heading text-white">Create Account</h3>
              <p className="text-xs text-text-muted mt-1">
                Get started with your personalized learning workspace.
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-3.5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">Full Name</label>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-700/80 focus-within:border-brand-indigo transition-colors">
                  <User className="w-4 h-4 text-text-muted shrink-0" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Chen"
                    className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                  />
                </div>
              </div>

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
                    placeholder="alex@university.edu"
                    className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">Password</label>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-700/80 focus-within:border-brand-indigo transition-colors">
                  <Lock className="w-4 h-4 text-text-muted shrink-0" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">Confirm Password</label>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-dark-900 border border-slate-700/80 focus-within:border-brand-indigo transition-colors">
                  <Lock className="w-4 h-4 text-text-muted shrink-0" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full font-semibold mt-2"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Create Account
              </Button>
            </form>

            {/* Link to Login */}
            <div className="text-center pt-3 text-xs text-text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-lightViolet font-semibold hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
