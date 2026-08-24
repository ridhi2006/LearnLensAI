import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/90 backdrop-blur-2xl border-b border-brand-indigo/20 shadow-xl shadow-black/60'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-cyan p-0.5 shadow-lg shadow-brand-indigo/35 transition-transform group-hover:scale-110">
            <div className="w-full h-full bg-dark-900 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-lightViolet group-hover:text-brand-cyan transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              LearnLens <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-indigo/30 text-brand-lightViolet font-mono border border-brand-indigo/50 font-bold">AI</span>
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-text-secondary">
          <a href="#features" className="hover:text-white hover:text-brand-lightViolet transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white hover:text-brand-lightViolet transition-colors">How It Works</a>
          <a href="#knowledge-graph" className="hover:text-white hover:text-brand-lightViolet transition-colors">Knowledge Graph</a>
          <a href="#personalized" className="hover:text-white hover:text-brand-lightViolet transition-colors">Learning Modes</a>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-text-secondary hover:text-white transition-colors px-3 py-2">
            Sign In
          </Link>
          <Button
            variant="primary"
            size="md"
            className="font-bold shadow-lg shadow-brand-indigo/30"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => navigate('/signup')}
          >
            Get Started Free
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-white rounded-xl hover:bg-dark-800 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-850/98 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-3 text-base font-semibold text-text-secondary">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-2"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-2"
            >
              How It Works
            </a>
            <a
              href="#knowledge-graph"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-2"
            >
              Knowledge Graph
            </a>
            <a
              href="#personalized"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-2"
            >
              Learning Modes
            </a>
          </nav>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <Button variant="secondary" size="md" className="w-full font-bold" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button variant="primary" size="md" className="w-full font-bold" onClick={() => navigate('/signup')}>
              Get Started Free
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
