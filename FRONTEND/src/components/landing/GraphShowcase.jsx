import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Sparkles, Play, MessageSquare, ArrowRight, CheckCircle2, AlertTriangle, CircleDot, Zap } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

export const GraphShowcase = () => {
  const navigate = useNavigate();

  const [selectedNode, setSelectedNode] = useState({
    name: 'Lower Bound',
    status: 'Needs Revision',
    timestamp: '27:18',
    definition: 'The smallest index i in a sorted array such that array[i] >= target.',
    example: 'arr = [1, 2, 4, 4, 4, 6], target = 4\nLower bound index = 2 (first element >= 4)'
  });

  return (
    <section id="knowledge-graph" className="py-24 bg-dark-950/80 relative overflow-hidden border-y border-slate-800/80">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-indigo/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-brand-cyan/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-brand-cyan uppercase tracking-widest px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30">
            Interactive Visual Knowledge
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight pt-1">
            See How Ideas Connect
          </h2>
          <p className="text-sm sm:text-base text-text-secondary">
            Concepts aren't isolated points in a video. LearnLens maps prerequisites, highlights weak nodes, and allows instant timestamp jumping.
          </p>
        </div>

        {/* Showcase Canvas Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center Graph Mockup Canvas */}
          <div className="lg:col-span-7 rounded-3xl bg-dark-900/90 border border-brand-indigo/30 p-6 relative min-h-[420px] flex items-center justify-center overflow-hidden shadow-2xl shadow-black/80">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-60" />

            {/* SVG Connecting Lines with glowing strokes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-brand-indigo/40 stroke-2">
              <line x1="50%" y1="50%" x2="22%" y2="25%" strokeDasharray="5" />
              <line x1="50%" y1="50%" x2="78%" y2="22%" strokeDasharray="5" />
              <line x1="50%" y1="50%" x2="25%" y2="78%" className="stroke-amber-400/80 stroke-[2.5]" />
              <line x1="50%" y1="50%" x2="75%" y2="78%" />
              <line x1="50%" y1="50%" x2="85%" y2="50%" className="stroke-brand-cyan/80 stroke-[2.5]" />
            </svg>

            {/* Center Node (Binary Search) */}
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div
                onClick={() => setSelectedNode({
                  name: 'Binary Search',
                  status: 'Core Concept',
                  timestamp: '00:00',
                  definition: 'Divide-and-conquer algorithm eliminating half the monotonic search space per iteration.',
                  example: 'T(n) = T(n/2) + O(1) -> O(log n)'
                })}
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-lightViolet text-white shadow-2xl shadow-brand-indigo/50 border-2 border-brand-lightViolet/60 text-center cursor-pointer hover:scale-105 transition-transform"
              >
                <span className="text-[10px] uppercase font-mono tracking-widest block opacity-90 font-bold">Root Concept</span>
                <span className="font-extrabold text-sm sm:text-base">Binary Search</span>
              </div>
            </motion.div>

            {/* Sub Nodes */}
            <div
              onClick={() => setSelectedNode({
                name: 'Monotonic Search Space',
                status: 'Mastered',
                timestamp: '02:14',
                definition: 'A monotonic range where decision boundaries divide search space predictably.',
                example: 'f(x): [False, False, True, True]'
              })}
              className="absolute top-[18%] left-[8%] px-4 py-2.5 rounded-2xl bg-dark-800 border border-emerald-500/50 text-xs font-bold text-emerald-400 cursor-pointer shadow-lg shadow-emerald-500/10 hover:scale-105 transition-transform flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Search Space</span>
            </div>

            <div
              onClick={() => setSelectedNode({
                name: 'Mid Calculation',
                status: 'Mastered',
                timestamp: '17:32',
                definition: 'Calculating mid as left + (right-left)/2 to eliminate integer overflow risk.',
                example: 'mid = left + (right - left) // 2'
              })}
              className="absolute top-[15%] right-[8%] px-4 py-2.5 rounded-2xl bg-dark-800 border border-emerald-500/50 text-xs font-bold text-emerald-400 cursor-pointer shadow-lg shadow-emerald-500/10 hover:scale-105 transition-transform flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Midpoint Safe</span>
            </div>

            {/* Selected Node: Lower Bound */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-[14%] left-[12%] px-4 py-3 rounded-2xl bg-dark-800 border-2 border-amber-400 text-xs font-bold text-amber-300 shadow-2xl shadow-amber-500/30 cursor-pointer hover:scale-105 transition-transform flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Lower Bound</span>
            </motion.div>

            <div
              onClick={() => setSelectedNode({
                name: 'Upper Bound',
                status: 'Mastered',
                timestamp: '36:45',
                definition: 'The first index where arr[i] > target.',
                example: 'upper_bound - lower_bound = total occurrences'
              })}
              className="absolute bottom-[14%] right-[14%] px-4 py-2.5 rounded-2xl bg-dark-800 border border-emerald-500/50 text-xs font-bold text-emerald-400 cursor-pointer shadow-lg hover:scale-105 transition-transform flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Upper Bound</span>
            </div>

            <div
              onClick={() => setSelectedNode({
                name: 'Rotated Array',
                status: 'Next Up',
                timestamp: '41:10',
                definition: 'Binary search with one half guaranteed strictly monotonic.',
                example: 'arr = [4, 5, 6, 7, 0, 1, 2]'
              })}
              className="absolute top-[45%] right-[4%] px-4 py-2.5 rounded-2xl bg-dark-800 border border-cyan-500/60 text-xs font-bold text-cyan-300 cursor-pointer shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Rotated Array</span>
            </div>
          </div>

          {/* Right Selected Node Details Panel */}
          <div className="lg:col-span-5">
            <Card padding="lg" className="border-amber-500/40 shadow-2xl bg-dark-800/95 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-text-muted uppercase font-bold">Selected Node</span>
                  <h3 className="text-xl font-bold text-white font-heading mt-0.5">
                    {selectedNode.name}
                  </h3>
                </div>
                <Badge
                  variant={selectedNode.status === 'Needs Revision' ? 'warning' : selectedNode.status === 'Core Concept' ? 'primary' : 'success'}
                  size="md"
                  dot
                >
                  {selectedNode.status}
                </Badge>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="font-bold text-text-muted uppercase tracking-wider text-[10px]">Definition</span>
                  <p className="text-text-secondary mt-1 leading-relaxed text-xs sm:text-sm">
                    {selectedNode.definition}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-text-muted uppercase tracking-wider text-[10px]">Code Trace / Logic</span>
                  <pre className="bg-dark-950 p-3 rounded-xl text-brand-cyan font-mono text-[11px] mt-1 border border-slate-800 overflow-x-auto leading-relaxed shadow-inner">
                    {selectedNode.example}
                  </pre>
                </div>

                <div className="p-2.5 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between text-xs text-text-muted">
                  <span>Video Location:</span>
                  <span className="font-mono font-bold text-brand-lightViolet">{selectedNode.timestamp}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<MessageSquare className="w-4 h-4" />}
                  onClick={() => navigate('/learn/demo-binary-search')}
                >
                  Ask AI
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  leftIcon={<Play className="w-4 h-4 text-red-400" />}
                  onClick={() => navigate('/learn/demo-binary-search')}
                >
                  Jump to Video
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
