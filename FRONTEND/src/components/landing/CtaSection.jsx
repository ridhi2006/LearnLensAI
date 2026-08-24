import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { YoutubeIcon } from '../common/BrandIcons';
import { Button } from '../common/Button';

export const CtaSection = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      navigate(`/analyze?url=${encodeURIComponent(url.trim())}`);
    } else {
      navigate('/analyze');
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-brand-indigo/25 via-brand-violet/20 to-brand-cyan/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-b from-dark-800/95 to-dark-900/95 border border-brand-indigo/30 p-8 sm:p-14 text-center shadow-2xl shadow-brand-indigo/10 backdrop-blur-2xl space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-indigo/20 border border-brand-indigo/40 text-brand-lightViolet text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Ready for Smarter Retention?</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Stop Just Watching.{' '}
            <span className="bg-gradient-to-r from-brand-indigo via-brand-lightViolet to-brand-cyan bg-clip-text text-transparent">
              Start Learning Intelligently.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-text-secondary max-w-lg mx-auto">
            Turn your next educational video into an interactive workspace with structured notes, knowledge graphs, and adaptive tutoring.
          </p>

          {/* URL Input Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl mx-auto p-2 rounded-2xl bg-dark-900/90 border border-slate-700/80 shadow-xl flex flex-col sm:flex-row items-center gap-2 focus-within:border-brand-indigo/60 transition-colors"
          >
            <div className="flex items-center gap-2.5 flex-1 w-full px-3 py-1.5">
              <YoutubeIcon className="w-5 h-5 text-red-500 shrink-0" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube educational video URL..."
                className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full sm:w-auto font-semibold px-6 shadow-md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start Learning
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
