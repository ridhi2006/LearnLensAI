import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { YoutubeIcon, GithubIcon, TwitterIcon } from '../common/BrandIcons';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-dark-950/80 text-text-secondary relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-brand-indigo/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-violet p-0.5 shadow-md shadow-brand-indigo/20">
                <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-brand-lightViolet" />
                </div>
              </div>
              <span className="font-heading font-bold text-xl text-white">LearnLens AI</span>
            </Link>
            <p className="text-sm text-text-muted max-w-sm leading-relaxed">
              Turn YouTube Videos Into Personalized Learning Experiences. Structured notes, interactive graphs, AI tutoring, assessments and intelligent roadmaps.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-dark-800 border border-slate-800 flex items-center justify-center text-text-muted hover:text-white hover:border-slate-700 transition-colors">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-dark-800 border border-slate-800 flex items-center justify-center text-text-muted hover:text-white hover:border-slate-700 transition-colors">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-dark-800 border border-slate-800 flex items-center justify-center text-text-muted hover:text-white hover:border-slate-700 transition-colors">
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Col */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-text-primary tracking-wider uppercase">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors flex items-center gap-1">Dashboard <ArrowUpRight className="w-3.5 h-3.5" /></Link></li>
              <li><Link to="/analyze" className="hover:text-white transition-colors">Video Analyzer</Link></li>
              <li><Link to="/learn/demo-binary-search" className="hover:text-white transition-colors">Demo Workspace</Link></li>
            </ul>
          </div>

          {/* Learning Col */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-text-primary tracking-wider uppercase">Learning Intelligence</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/learn/demo-binary-search" className="hover:text-white transition-colors">AI Tutor</Link></li>
              <li><Link to="/learn/demo-binary-search" className="hover:text-white transition-colors">Knowledge Graph</Link></li>
              <li><Link to="/learn/demo-binary-search" className="hover:text-white transition-colors">Learning Path</Link></li>
              <li><Link to="/my-learning" className="hover:text-white transition-colors">Mastery Stats</Link></li>
              <li><Link to="/library" className="hover:text-white transition-colors">Saved Library</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div>
            © {new Date().getFullYear()} LearnLens AI. Built for smarter learning.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>System Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
