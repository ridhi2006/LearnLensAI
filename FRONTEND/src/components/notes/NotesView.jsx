import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Bookmark,
  Check
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useToast } from '../../context/ToastContext';

export const NotesView = ({ video }) => {
  const [activeTab, setActiveTab] = useState('cheatsheet'); // 'summary' | 'cheatsheet' | 'revision'
  const [isExporting, setIsExporting] = useState(false);
  const { showToast } = useToast();

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast({
        title: 'Study PDF Exported!',
        message: 'Study PDF prepared successfully. Download started.',
        type: 'success'
      });
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        {/* Sub-tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-dark-800 border border-slate-800">
          <button
            onClick={() => setActiveTab('summary')}
            className={`text-xs px-3.5 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'summary'
                ? 'bg-brand-indigo text-white shadow-sm font-semibold'
                : 'text-text-secondary hover:text-white hover:bg-dark-700'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`text-xs px-3.5 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'cheatsheet'
                ? 'bg-brand-indigo text-white shadow-sm font-semibold'
                : 'text-text-secondary hover:text-white hover:bg-dark-700'
            }`}
          >
            Cheat Sheet
          </button>
          <button
            onClick={() => setActiveTab('revision')}
            className={`text-xs px-3.5 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'revision'
                ? 'bg-brand-indigo text-white shadow-sm font-semibold'
                : 'text-text-secondary hover:text-white hover:bg-dark-700'
            }`}
          >
            Revision Notes
          </button>
        </div>

        {/* Export PDF Button */}
        <Button
          variant="primary"
          size="sm"
          isLoading={isExporting}
          leftIcon={<Download className="w-4 h-4" />}
          onClick={handleExportPDF}
        >
          Export Study PDF
        </Button>
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {activeTab === 'cheatsheet' && (
          <motion.div
            key="cheatsheet"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            {/* Core Definitions & Complexities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Definitions */}
              <Card padding="lg" className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-text-primary font-heading">
                  <FileText className="w-4 h-4 text-brand-lightViolet" />
                  Key Definitions
                </div>
                <div className="space-y-3 text-xs text-text-secondary">
                  <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 space-y-1">
                    <strong className="text-brand-lightViolet font-semibold">Monotonic Search Space:</strong>
                    <p className="leading-relaxed">A sequence where elements satisfy non-decreasing or non-increasing ordering, enabling binary partition testing.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 space-y-1">
                    <strong className="text-brand-cyan font-semibold">Lower Bound:</strong>
                    <p className="leading-relaxed">Smallest index <code className="text-brand-cyan">i</code> such that <code className="text-brand-cyan">arr[i] &gt;= target</code>.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 space-y-1">
                    <strong className="text-emerald-400 font-semibold">Upper Bound:</strong>
                    <p className="leading-relaxed">First index <code className="text-emerald-400">i</code> such that <code className="text-emerald-400">arr[i] &gt; target</code> (strictly greater).</p>
                  </div>
                </div>
              </Card>

              {/* Formulas & Complexities */}
              <Card padding="lg" className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-text-primary font-heading">
                  <Code2 className="w-4 h-4 text-brand-cyan" />
                  Formulas & Complexities
                </div>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between font-mono">
                    <span className="text-text-muted">Safe Midpoint:</span>
                    <span className="text-brand-cyan font-bold">mid = left + (right - left) // 2</span>
                  </div>
                  <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between font-mono">
                    <span className="text-text-muted">Worst Case Time:</span>
                    <span className="text-emerald-400 font-bold">O(log n)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between font-mono">
                    <span className="text-text-muted">Auxiliary Space:</span>
                    <span className="text-text-primary font-bold">O(1) Iterative / O(log n) Recursive</span>
                  </div>
                  <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between font-mono">
                    <span className="text-text-muted">Total Occurrences of X:</span>
                    <span className="text-brand-lightViolet font-bold">UpperBound(X) - LowerBound(X)</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Common Mistakes & Implementation Traps */}
            <Card padding="lg" className="space-y-4 border-amber-500/30">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-300 font-heading">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Common Mistakes & Gotchas
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-dark-900 border border-amber-500/20 space-y-1">
                  <span className="font-bold text-amber-300">1. Arithmetic Overflow</span>
                  <p className="text-text-secondary leading-relaxed">
                    Avoid <code className="text-rose-400">(left + right) / 2</code> in Java/C++. Always use <code className="text-emerald-400">left + (right - left) / 2</code>.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-dark-900 border border-amber-500/20 space-y-1">
                  <span className="font-bold text-amber-300">2. Loop Invariant Off-By-One</span>
                  <p className="text-text-secondary leading-relaxed">
                    With inclusive bounds <code className="text-text-primary">[left, right]</code>, use <code className="text-emerald-400">while (left &lt;= right)</code> and update <code className="text-emerald-400">left = mid + 1</code>.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-dark-900 border border-amber-500/20 space-y-1">
                  <span className="font-bold text-amber-300">3. Lower Bound Duplicate Trap</span>
                  <p className="text-text-secondary leading-relaxed">
                    Do not return on first match! Record <code className="text-emerald-400">ans = mid</code> and shift <code className="text-emerald-400">right = mid - 1</code> to find earliest duplicate.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-dark-900 border border-amber-500/20 space-y-1">
                  <span className="font-bold text-amber-300">4. Rotated Array Duplicates</span>
                  <p className="text-text-secondary leading-relaxed">
                    When <code className="text-text-primary">arr[left] == arr[mid] == arr[right]</code>, worst-case complexity degrades to O(N).
                  </p>
                </div>
              </div>
            </Card>

            {/* Standard Python Implementation Snippet */}
            <Card padding="lg" className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-text-primary uppercase tracking-wider font-mono">
                  Standard Template (Python 3)
                </span>
                <Badge variant="primary" size="sm">O(log n) Time • O(1) Space</Badge>
              </div>
              <pre className="p-4 rounded-xl bg-dark-950 border border-slate-800 text-xs font-mono text-text-primary overflow-x-auto leading-relaxed">
{`def binary_search(arr: list[int], target: int) -> int:
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1  # Target not found in monotonic search space`}
              </pre>
            </Card>
          </motion.div>
        )}

        {activeTab === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <Card padding="lg" className="space-y-4">
              <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-cyan" />
                Comprehensive Video Summary
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {video.summary?.headline}
              </p>

              <div className="space-y-3 pt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                  Fundamental Principles
                </h4>
                {video.summary?.keyTakeaways?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'revision' && (
          <motion.div
            key="revision"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <Card padding="lg" className="space-y-4 bg-gradient-to-br from-brand-indigo/10 via-dark-800 to-dark-900 border-brand-indigo/30">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-heading text-white">
                  5-Minute High-Yield Exam Refreshers
                </h3>
                <Badge variant="warning" size="sm">Pre-Exam Mode</Badge>
              </div>

              <ul className="space-y-2.5 text-xs text-text-secondary list-disc pl-5 leading-relaxed">
                <li>Binary search requires a <strong>monotonic predicate</strong>, not necessarily a sorted array.</li>
                <li>Mid calculation formula: <code className="text-brand-cyan">left + (right - left) // 2</code>.</li>
                <li>Time Complexity is strictly <strong>O(log n)</strong> because search space halves at every iteration.</li>
                <li>To find frequency of duplicates: compute <code className="text-brand-lightViolet">upper_bound - lower_bound</code> in O(log n).</li>
                <li>In Rotated Arrays, at least <strong>one half is always sorted</strong>. Compare <code className="text-emerald-400">arr[left] &lt;= arr[mid]</code> to decide.</li>
              </ul>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
