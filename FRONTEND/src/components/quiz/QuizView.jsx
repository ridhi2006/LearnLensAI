import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  Award,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Compass,
  Check,
  X
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import { quizService } from '../../services/quizService';
import { useToast } from '../../context/ToastContext';

export const QuizView = ({ videoId = 'demo-binary-search', onTabChange }) => {
  const [difficulty, setDifficulty] = useState('medium');
  const [quizState, setQuizState] = useState('start'); // 'start' | 'in-progress' | 'results'
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [showExplanations, setShowExplanations] = useState(false);

  const { showToast } = useToast();

  const handleStartQuiz = async () => {
    const qList = await quizService.getQuiz(videoId, difficulty);
    setQuestions(qList);
    setCurrentIndex(0);
    setUserAnswers({});
    setQuizState('in-progress');
    setShowExplanations(false);
  };

  const handleSelectOption = (optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    const evalResults = quizService.evaluateQuiz(questions, userAnswers);
    setResults(evalResults);
    setQuizState('results');

    if (evalResults.percentage >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
      showToast({
        title: 'Quiz Completed!',
        message: `Outstanding! You scored ${evalResults.score}/${evalResults.total} (${evalResults.percentage}%).`,
        type: 'success'
      });
    } else {
      showToast({
        title: 'Quiz Finished',
        message: `You scored ${evalResults.score}/${evalResults.total}. Review identified weak topics.`,
        type: 'warning'
      });
    }
  };

  const currentQ = questions[currentIndex];
  const progressPercent = questions.length > 0 ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 1. Start Screen */}
      {quizState === 'start' && (
        <Card padding="lg" className="border-brand-indigo/30 bg-dark-800/90 shadow-2xl space-y-8 py-10 text-center max-w-2xl mx-auto">
          <div className="space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-indigo/20 border border-brand-indigo/40 flex items-center justify-center text-brand-lightViolet">
              <Award className="w-7 h-7 text-brand-cyan" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Test Your Understanding
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto">
              Evaluate your comprehension of Binary Search algorithms, edge conditions, and time complexities.
            </p>
          </div>

          {/* Difficulty Selector */}
          <div className="space-y-3 max-w-md mx-auto">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
              Select Assessment Difficulty
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'easy', label: 'Easy', count: '5 Qs', color: 'border-emerald-500/40 text-emerald-400' },
                { id: 'medium', label: 'Medium', count: '10 Qs', color: 'border-brand-indigo/50 text-brand-lightViolet' },
                { id: 'hard', label: 'Hard', count: '5 Qs', color: 'border-amber-500/40 text-amber-400' }
              ].map((diff) => (
                <div
                  key={diff.id}
                  onClick={() => setDifficulty(diff.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none text-center ${
                    difficulty === diff.id
                      ? 'bg-dark-700 border-brand-indigo ring-1 ring-brand-indigo shadow-lg'
                      : 'bg-dark-900 border-slate-800 hover:bg-dark-800'
                  }`}
                >
                  <div className="text-xs font-bold text-text-primary capitalize">{diff.label}</div>
                  <div className="text-[10px] text-text-muted mt-0.5">{diff.count}</div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full max-w-md mx-auto font-bold"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={handleStartQuiz}
          >
            Start Quiz
          </Button>
        </Card>
      )}

      {/* 2. In-Progress Quiz Screen */}
      {quizState === 'in-progress' && currentQ && (
        <Card padding="lg" className="border-slate-800 bg-dark-800/95 shadow-2xl space-y-6">
          {/* Top Progress & Index Header */}
          <div className="space-y-2 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-brand-lightViolet font-semibold">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <Badge variant="primary" size="sm">
                Topic: {currentQ.topic}
              </Badge>
            </div>
            <ProgressBar value={progressPercent} size="sm" variant="brand" />
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-text-primary font-heading leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentIndex] === optIdx;
                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-brand-indigo/20 border-brand-indigo text-white ring-1 ring-brand-indigo/50 shadow-md'
                        : 'bg-dark-900 border-slate-800/80 hover:bg-dark-800 text-text-secondary hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-xs sm:text-sm">
                      <span className={`w-6 h-6 rounded-lg border flex items-center justify-center font-mono text-xs shrink-0 ${
                        isSelected ? 'bg-brand-indigo border-brand-indigo text-white font-bold' : 'border-slate-700 text-text-muted'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-brand-cyan shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <Button
              variant="secondary"
              size="md"
              disabled={currentIndex === 0}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
            >
              Previous
            </Button>

            {currentIndex < questions.length - 1 ? (
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => setCurrentIndex((prev) => prev + 1)}
              >
                Next Question
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/20"
                rightIcon={<CheckCircle2 className="w-4 h-4" />}
                onClick={handleSubmitQuiz}
              >
                Submit Quiz
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* 3. Quiz Results Screen */}
      {quizState === 'results' && results && (
        <Card padding="lg" className="border-brand-indigo/30 bg-dark-800/90 shadow-2xl space-y-8">
          {/* Header Score Banner */}
          <div className="text-center space-y-3 pb-6 border-b border-slate-800">
            <Badge variant="primary" size="md">
              Assessment Results
            </Badge>
            <div className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              {results.score} <span className="text-text-muted text-2xl sm:text-3xl">/ {results.total}</span>
            </div>
            <p className="text-xs text-text-muted font-mono">
              Score: {results.percentage}% • Difficulty: {difficulty.toUpperCase()}
            </p>
          </div>

          {/* Topic Performance Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Strong Topics */}
            <div className="space-y-3 p-4 rounded-2xl bg-dark-900 border border-emerald-500/30">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                Strong Conceptual Areas
              </div>
              <div className="space-y-1.5">
                {results.strongTopics.map((topic, i) => (
                  <div key={i} className="text-xs text-text-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Topics */}
            <div className="space-y-3 p-4 rounded-2xl bg-dark-900 border border-amber-500/40">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Weak Areas Requiring Focus
              </div>
              <div className="space-y-1.5">
                {results.weakTopics.map((topic, i) => (
                  <div key={i} className="text-xs text-text-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <Button
              variant="secondary"
              size="md"
              leftIcon={<RotateCcw className="w-4 h-4" />}
              onClick={handleStartQuiz}
            >
              Retake Quiz
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowExplanations(!showExplanations)}
            >
              {showExplanations ? 'Hide Explanations' : 'Review Answers'}
            </Button>
            <Button
              variant="primary"
              size="md"
              rightIcon={<Compass className="w-4 h-4" />}
              onClick={() => onTabChange && onTabChange('roadmap')}
            >
              Improve Weak Topics
            </Button>
          </div>

          {/* Detailed Question Explanations */}
          {showExplanations && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4 pt-6 border-t border-slate-800"
            >
              <h4 className="text-sm font-bold text-text-primary font-heading">
                Detailed Question Review & Explanations
              </h4>
              <div className="space-y-3">
                {results.detailedResults.map((item, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border space-y-2 text-xs ${
                      item.isCorrect
                        ? 'bg-emerald-500/5 border-emerald-500/20'
                        : 'bg-rose-500/5 border-rose-500/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-text-primary">Q{i + 1}: {item.question}</span>
                      <Badge variant={item.isCorrect ? 'success' : 'danger'} size="sm">
                        {item.isCorrect ? 'Correct' : 'Incorrect'}
                      </Badge>
                    </div>
                    <div className="text-text-secondary">
                      <strong>Correct Answer:</strong> <span className="text-emerald-400">{item.correctOption}</span>
                    </div>
                    <p className="text-text-muted text-[11px] leading-relaxed pt-1">
                      <em>Explanation:</em> {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </Card>
      )}
    </div>
  );
};
