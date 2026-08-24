import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Clock,
  MessageSquare,
  Sparkles,
  Play,
  ArrowRight,
  Send,
  Loader2,
  Bookmark
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useLearning } from '../../context/LearningContext';
import { videoService } from '../../services/videoService';
import { useToast } from '../../context/ToastContext';

export const TranscriptView = ({ videoId = 'demo-binary-search' }) => {
  const [transcripts, setTranscripts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimestamp, setSelectedTimestamp] = useState('17:32');
  const [qaData, setQaData] = useState(null);
  const [userQuestion, setUserQuestion] = useState('Why did the instructor calculate mid this way?');
  const [activeAnswer, setActiveAnswer] = useState(null);
  const [isAsking, setIsAsking] = useState(false);

  const { jumpToTimestamp } = useLearning();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchTranscript = async () => {
      const data = await videoService.getTranscript(videoId);
      setTranscripts(data);
    };
    fetchTranscript();
  }, [videoId]);

  useEffect(() => {
    const fetchQA = async () => {
      const qa = await videoService.getTimestampQA(selectedTimestamp, videoId);
      setQaData(qa);
      if (qa?.answers && qa.answers['Why did the instructor calculate mid this way?']) {
        setActiveAnswer(qa.answers['Why did the instructor calculate mid this way?']);
      } else if (qa?.answers?.default) {
        setActiveAnswer(qa.answers.default);
      }
    };
    fetchQA();
  }, [selectedTimestamp, videoId]);

  const handleTimestampClick = (ts) => {
    setSelectedTimestamp(ts);
    jumpToTimestamp(ts);
    showToast({
      title: `Jumped to ${ts}`,
      message: 'Video position and contextual Q&A updated.',
      type: 'info'
    });
  };

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    setIsAsking(true);
    setTimeout(() => {
      setIsAsking(false);
      setActiveAnswer({
        answer: `At ${selectedTimestamp}, the instructor explains why \`left + (right - left) / 2\` is safer than \`(left + right) / 2\` because it avoids integer overflow in languages with fixed integer types (like C++ and Java).`,
        referenceRange: '16:58 – 18:15',
        keyFormula: 'mid = left + (right - left) / 2'
      });
    }, 600);
  };

  const filteredTranscripts = transcripts.filter((t) =>
    t.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.timestamp.includes(searchQuery)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Column: Search & Timestamped Rows */}
      <div className="lg:col-span-7 space-y-4">
        {/* Search Bar */}
        <div className="p-2 rounded-2xl bg-dark-800 border border-slate-800 flex items-center gap-2.5 px-3.5 focus-within:border-brand-indigo transition-colors shadow-sm">
          <Search className="w-4 h-4 text-text-muted shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transcript by keywords (e.g. overflow, lower bound)..."
            className="w-full bg-transparent text-xs sm:text-sm text-text-primary outline-none placeholder:text-text-muted"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-text-muted hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Transcript List Container */}
        <Card padding="none" className="divide-y divide-slate-800/80 max-h-[640px] overflow-y-auto">
          {filteredTranscripts.length > 0 ? (
            filteredTranscripts.map((row) => {
              const isSelected = selectedTimestamp === row.timestamp;
              return (
                <motion.div
                  key={row.id}
                  onClick={() => handleTimestampClick(row.timestamp)}
                  className={`p-4 transition-colors cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-brand-indigo/15 border-l-4 border-l-brand-indigo'
                      : 'hover:bg-dark-700/50'
                  }`}
                >
                  <button
                    type="button"
                    className={`font-mono text-xs px-2 py-1 rounded-lg flex items-center gap-1 shrink-0 font-semibold transition-colors ${
                      isSelected
                        ? 'bg-brand-indigo text-white shadow-sm'
                        : 'bg-dark-900 text-brand-lightViolet border border-slate-800 hover:border-brand-indigo/40'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>{row.timestamp}</span>
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs sm:text-sm leading-relaxed ${isSelected ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>
                      {row.text}
                    </p>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-text-muted">
              No transcript matches found for "{searchQuery}".
            </div>
          )}
        </Card>
      </div>

      {/* Right Column: Interactive Timestamp Q&A Drawer */}
      <div className="lg:col-span-5 space-y-4">
        <Card padding="lg" className="border-brand-indigo/30 bg-dark-800/95 shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              <h3 className="text-sm font-bold text-text-primary font-heading">
                Ask About Timestamp {selectedTimestamp}
              </h3>
            </div>
            <Badge variant="cyan" size="sm">
              Ref: {qaData?.range || `${selectedTimestamp} section`}
            </Badge>
          </div>

          {/* Preset Suggested Questions for this timestamp */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
              Sample Inquiries
            </span>
            <div className="flex flex-col gap-1.5">
              {(qaData?.sampleQuestions || [
                'Why did the instructor calculate mid this way?',
                'Can you explain the mathematical edge case here?'
              ]).map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setUserQuestion(q)}
                  className="text-left text-xs p-2 rounded-lg bg-dark-900 border border-slate-800/80 text-text-secondary hover:text-brand-lightViolet hover:border-brand-indigo/40 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Ask Input Form */}
          <form onSubmit={handleAskQuestion} className="space-y-2 pt-1">
            <label className="text-[11px] font-medium text-text-secondary">
              Ask LearnLens about this specific moment
            </label>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-dark-900 border border-slate-700/80 focus-within:border-brand-indigo transition-colors">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="What would you like to understand?"
                className="w-full bg-transparent text-xs text-text-primary outline-none placeholder:text-text-muted"
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isAsking}
                className="shrink-0"
              >
                Ask
              </Button>
            </div>
          </form>

          {/* AI Response Display */}
          {activeAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-dark-900 border border-brand-indigo/30 space-y-3 shadow-inner"
            >
              <div className="flex items-center justify-between text-[11px] text-brand-lightViolet font-semibold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                  AI Contextual Explanation
                </span>
                <span className="font-mono text-text-muted">
                  Sec: {activeAnswer.referenceRange}
                </span>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-line">
                {activeAnswer.answer}
              </p>

              {activeAnswer.keyFormula && (
                <div className="p-2 rounded bg-dark-800 border border-slate-800 text-[11px] font-mono text-brand-cyan">
                  {activeAnswer.keyFormula}
                </div>
              )}
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
};
