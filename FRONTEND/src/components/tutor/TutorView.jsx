import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  User,
  Sparkles,
  Send,
  Loader2,
  Briefcase,
  BookOpen,
  HelpCircle,
  Award,
  AlertTriangle,
  Compass,
  ArrowRight,
  RotateCcw,
  Zap,
  Code2
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useLearning } from '../../context/LearningContext';
import { chatService } from '../../services/chatService';
import { useToast } from '../../context/ToastContext';

export const TutorView = ({ onTabChange }) => {
  const { learningMode, setLearningMode } = useLearning();
  const [tutorSubMode, setTutorSubMode] = useState('learn'); // 'learn' | 'doubts' | 'interview'
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hello! I'm your LearnLens AI Tutor configured in **${learningMode} Mode**.\n\nAsk me anything about the algorithm, request intuitive analogies, or test your comprehension with edge-case questions.`,
      timestamp: 'Just now'
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'Why does Binary Search need sorted data?',
      timestamp: '1 min ago'
    },
    {
      id: 'm3',
      sender: 'ai',
      text: 'Binary Search decides which half of the array can be discarded on every single comparison.\n\nWithout ordering or monotonicity, that decision cannot be made reliably, and we would risk discarding the partition containing the target element.',
      timestamp: '1 min ago'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Interview Mode States
  const [interviewAnswer, setInterviewAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState(null);

  const messagesEndRef = useRef(null);
  const { showToast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const reply = await chatService.sendTutorMessage({
        message: query,
        mode: learningMode,
        videoContext: 'Binary Search Mastery'
      });

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: reply,
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleInterviewSubmit = async (e) => {
    e.preventDefault();
    if (!interviewAnswer.trim()) return;

    setIsEvaluating(true);
    const result = await chatService.evaluateInterviewAnswer({
      questionId: 'int-1',
      questionText: 'Explain Binary Search in your own words.',
      userAnswer: interviewAnswer
    });
    setIsEvaluating(false);
    setAssessmentResult(result);
    showToast({
      title: 'Assessment Evaluated',
      message: 'AI rubric feedback and 4-metric score generated.',
      type: 'success'
    });
  };

  const handleUpdateLearningPath = () => {
    showToast({
      title: 'Learning Path Updated!',
      message: 'Weak topics from your interview have been added to your revision roadmap.',
      type: 'success'
    });
    if (onTabChange) {
      onTabChange('roadmap');
    }
  };

  const suggestions = [
    { label: 'Explain Simply', icon: Sparkles },
    { label: 'Give an Example', icon: Code2 },
    { label: 'Show Complexity', icon: Zap },
    { label: 'Ask me a Question', icon: HelpCircle }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Controls Header */}
      <Card padding="default" className="border-brand-indigo/30 bg-dark-850/95 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-brand-indigo/20 border border-brand-indigo/40 flex items-center justify-center text-brand-lightViolet shadow-lg shadow-brand-indigo/20">
            <Bot className="w-6 h-6 text-brand-lightViolet" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-heading">
                LearnLens Tutor
              </h3>
              <Badge variant="cyan" size="sm">
                {learningMode} Mode
              </Badge>
            </div>
            <p className="text-xs text-text-muted">
              Intelligent socratic tutor with adaptive explanation depth.
            </p>
          </div>
        </div>

        {/* Sub-mode Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-dark-900 border border-slate-800">
          <button
            onClick={() => setTutorSubMode('learn')}
            className={`text-xs px-3.5 py-2 rounded-xl font-bold transition-all ${
              tutorSubMode === 'learn'
                ? 'bg-brand-indigo text-white shadow-md shadow-brand-indigo/30'
                : 'text-text-secondary hover:text-white'
            }`}
          >
            Learn
          </button>
          <button
            onClick={() => setTutorSubMode('doubts')}
            className={`text-xs px-3.5 py-2 rounded-xl font-bold transition-all ${
              tutorSubMode === 'doubts'
                ? 'bg-brand-indigo text-white shadow-md shadow-brand-indigo/30'
                : 'text-text-secondary hover:text-white'
            }`}
          >
            Ask Doubts
          </button>
          <button
            onClick={() => setTutorSubMode('interview')}
            className={`text-xs px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              tutorSubMode === 'interview'
                ? 'bg-brand-indigo text-white shadow-md shadow-brand-indigo/30'
                : 'text-text-secondary hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Interview Assessment
          </button>
        </div>
      </Card>

      {/* Main Mode View */}
      {tutorSubMode !== 'interview' ? (
        /* Chat Conversation View */
        <Card padding="none" className="border-slate-800 bg-dark-850/95 shadow-2xl overflow-hidden flex flex-col h-[600px]">
          {/* Messages scroll area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-9 h-9 rounded-xl bg-brand-indigo/20 border border-brand-indigo/40 flex items-center justify-center text-brand-lightViolet shrink-0 mt-0.5 shadow-sm">
                      <Sparkles className="w-4 h-4 text-brand-cyan" />
                    </div>
                  )}

                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-xl whitespace-pre-line shadow-md ${
                      isUser
                        ? 'bg-brand-indigo text-white rounded-tr-sm font-medium'
                        : 'bg-dark-900/90 border border-slate-800 text-text-secondary rounded-tl-sm font-normal'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {isUser && (
                    <div className="w-9 h-9 rounded-xl bg-dark-700 border border-slate-700 flex items-center justify-center text-text-secondary shrink-0 mt-0.5 shadow-sm">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              );
            })}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3.5"
              >
                <div className="w-9 h-9 rounded-xl bg-brand-indigo/20 border border-brand-indigo/40 flex items-center justify-center text-brand-lightViolet shrink-0">
                  <Sparkles className="w-4 h-4 text-brand-cyan" />
                </div>
                <div className="p-3.5 rounded-2xl rounded-tl-sm bg-dark-900 border border-slate-800 text-xs text-text-muted flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-indigo animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-brand-violet animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-brand-cyan animate-bounce [animation-delay:0.4s]" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions pills */}
          <div className="px-6 py-2.5 bg-dark-900/80 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px] no-scrollbar">
            <span className="text-text-muted font-bold shrink-0">Suggested:</span>
            {suggestions.map((sug, i) => {
              const Icon = sug.icon;
              return (
                <button
                  key={i}
                  onClick={() => handleSendMessage(sug.label)}
                  className="px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 border border-slate-800 hover:border-brand-indigo/50 text-brand-lightViolet font-medium shrink-0 transition-all hover:scale-105 flex items-center gap-1.5 shadow-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>{sug.label}</span>
                </button>
              );
            })}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-dark-900 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask anything about this video (e.g. why is left + (right-left)/2 safer)..."
                className="flex-1 bg-dark-800 border border-slate-700/80 rounded-2xl px-5 py-3.5 text-xs sm:text-sm text-text-primary outline-none focus:border-brand-indigo transition-colors shadow-inner"
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={!inputText.trim()}
                rightIcon={<Send className="w-4 h-4" />}
                className="font-bold shadow-lg shadow-brand-indigo/30"
              >
                Send
              </Button>
            </form>
          </div>
        </Card>
      ) : (
        /* Interview Assessment Mode */
        <Card padding="lg" className="border-brand-indigo/40 bg-dark-850/95 shadow-2xl space-y-6">
          <div className="space-y-2 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <Badge variant="cyan" size="md">
                Technical Interview Assessment
              </Badge>
              <span className="text-xs font-mono text-text-muted">Question 1 of 5</span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading pt-1">
              Explain Binary Search in your own words.
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Include the divide-and-conquer strategy, search space invariants, time complexity recurrence, and potential edge-case traps.
            </p>
          </div>

          {/* Answer Form */}
          <form onSubmit={handleInterviewSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Your Technical Response</label>
              <textarea
                rows={5}
                required
                value={interviewAnswer}
                onChange={(e) => setInterviewAnswer(e.target.value)}
                placeholder="Binary search works by maintaining left and right pointers on a sorted range..."
                className="w-full p-4 rounded-2xl bg-dark-900 border border-slate-700 text-xs sm:text-sm text-text-primary outline-none focus:border-brand-indigo transition-colors font-mono leading-relaxed shadow-inner"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isEvaluating}
              className="w-full sm:w-auto font-bold shadow-lg shadow-brand-indigo/30"
              rightIcon={<Award className="w-4 h-4" />}
            >
              Submit Answer for AI Evaluation
            </Button>
          </form>

          {/* Assessment Rubric Feedback */}
          {assessmentResult && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-6 border-t border-slate-800"
            >
              {/* Top Rubric Scores Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest">
                  AI Rubric Evaluation Breakdown
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-dark-900 border border-emerald-500/30 text-center shadow-md">
                    <div className="text-xs text-text-muted font-medium">Concept Understanding</div>
                    <div className="text-2xl font-extrabold text-emerald-400 font-heading mt-1">
                      {assessmentResult.scores.conceptUnderstanding} / 10
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-dark-900 border border-brand-indigo/40 text-center shadow-md">
                    <div className="text-xs text-text-muted font-medium">Complexity Analysis</div>
                    <div className="text-2xl font-extrabold text-brand-lightViolet font-heading mt-1">
                      {assessmentResult.scores.complexityAnalysis} / 10
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-dark-900 border border-amber-500/30 text-center shadow-md">
                    <div className="text-xs text-text-muted font-medium">Implementation</div>
                    <div className="text-2xl font-extrabold text-amber-400 font-heading mt-1">
                      {assessmentResult.scores.implementationDetails} / 10
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-dark-900 border border-cyan-500/30 text-center shadow-md">
                    <div className="text-xs text-text-muted font-medium">Problem Solving</div>
                    <div className="text-2xl font-extrabold text-brand-cyan font-heading mt-1">
                      {assessmentResult.scores.problemSolving} / 10
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback text */}
              <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-white text-sm">Detailed Qualitative Feedback:</span>
                <p className="text-text-secondary leading-relaxed text-xs sm:text-sm">
                  {assessmentResult.feedback}
                </p>
              </div>

              {/* Identified Weak Topics */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Weak Topics Identified for Revision
                </span>
                <div className="flex flex-wrap gap-2">
                  {assessmentResult.weakTopics.map((topic, i) => (
                    <Badge key={i} variant="warning" size="md" dot>
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Update Learning Path CTA Button */}
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-between font-bold shadow-xl shadow-brand-indigo/30 py-3.5"
                  rightIcon={<Compass className="w-4 h-4" />}
                  onClick={handleUpdateLearningPath}
                >
                  <span>Update My Learning Path with Identified Gaps</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </Card>
      )}
    </div>
  );
};
