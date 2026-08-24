import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Sparkles, Compass, ArrowRight } from 'lucide-react';
import { YoutubeIcon } from '../common/BrandIcons';

export const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'Paste a Video',
      subtitle: 'Drop any educational YouTube URL into the input field.',
      icon: YoutubeIcon,
      color: 'from-red-500/20 to-orange-500/20',
      borderColor: 'border-red-500/30',
      iconColor: 'text-red-400'
    },
    {
      step: '02',
      title: 'AI Understands the Content',
      subtitle: 'Transcripts, algorithmic steps, formulas, and time references are processed automatically.',
      icon: BrainCircuit,
      color: 'from-brand-indigo/20 to-brand-violet/20',
      borderColor: 'border-brand-indigo/30',
      iconColor: 'text-brand-lightViolet'
    },
    {
      step: '03',
      title: 'Learn Interactively',
      subtitle: 'Explore cheat sheets, navigate the interactive knowledge graph, and practice tailored quizzes.',
      icon: Sparkles,
      color: 'from-brand-violet/20 to-brand-cyan/20',
      borderColor: 'border-brand-violet/30',
      iconColor: 'text-brand-cyan'
    },
    {
      step: '04',
      title: 'Discover What to Learn Next',
      subtitle: 'AI detects gaps from your quiz and assessment, crafting a personalized vertical roadmap.',
      icon: Compass,
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            How LearnLens AI Works
          </h2>
          <p className="text-sm sm:text-base text-text-secondary">
            From passive video watching to active retention and personalized mastery in seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-2xl bg-dark-800/80 border ${item.borderColor} p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200 group`}
              >
                <div>
                  {/* Top row with step number and icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-text-muted px-2.5 py-1 rounded-lg bg-dark-900 border border-slate-800">
                      Step {item.step}
                    </span>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.color} border ${item.borderColor} flex items-center justify-center ${item.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-text-primary mb-2 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                {/* Subtitle bottom indicator */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs text-text-muted font-mono">
                  <span>Phase {idx + 1} / 4</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
