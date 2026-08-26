import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  RotateCcw,
  Briefcase,
  Loader2,
  Check,
  FileText,
  Clock,
  Search,
  AlertCircle,
  RefreshCw,
  Video,
  ListFilter,
  Globe
} from 'lucide-react';
import { YoutubeIcon } from '../components/common/BrandIcons';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useLearning } from '../context/LearningContext';
import { useToast } from '../context/ToastContext';
import { extractVideoId } from '../utils/youtube';
import { videoService } from '../services/videoService';

const SUPPORTED_LANGUAGES = {
  en: 'English',
  hi: 'Hindi',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  pt: 'Portuguese',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese',
  auto: 'Auto Detect'
};

export const AnalyzeVideo = () => {
  const [searchParams] = useSearchParams();
  const initialUrl = searchParams.get('url') || 'https://www.youtube.com/watch?v=MFhxShGxHWc';
  
  const [url, setUrl] = useState(initialUrl);
  const [selectedMode, setSelectedMode] = useState('College');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState('Validating YouTube URL...');
  const [errorMsg, setErrorMsg] = useState(null);
  const [resultData, setResultData] = useState(null);

  // Transcript viewing state
  const [activeViewTab, setActiveViewTab] = useState('segments'); // 'segments' | 'fullText'
  const [searchTerm, setSearchTerm] = useState('');

  const { setLearningMode, setActiveVideoId, setActiveMember1Output } = useLearning();
  const { showToast } = useToast();

  const learningModes = [
    {
      id: 'Beginner',
      title: 'Beginner Mode',
      subtitle: 'Intuitive analogies & zero jargon',
      description: 'Ideal if you are encountering the topic for the very first time.',
      icon: BookOpen,
      color: 'border-emerald-500/40 text-emerald-400'
    },
    {
      id: 'College',
      title: 'College Mode',
      subtitle: 'Rigorous proofs & mathematical invariants',
      description: 'Academic depth with recurrence relations and formal definitions.',
      icon: GraduationCap,
      color: 'border-brand-indigo/50 text-brand-lightViolet'
    },
    {
      id: 'Revision',
      title: 'Revision Mode',
      subtitle: 'High-yield cheat sheet formulas',
      description: 'Ultra-condensed bullet points for fast 5-minute pre-exam refreshers.',
      icon: RotateCcw,
      color: 'border-amber-500/40 text-amber-400'
    },
    {
      id: 'Interview',
      title: 'Interview Mode',
      subtitle: 'Edge cases, trade-offs & rubric grading',
      description: 'Technical interview practice with mock answer assessment.',
      icon: Briefcase,
      color: 'border-cyan-500/50 text-brand-cyan'
    }
  ];

  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  // Live 1-second countdown for rate-limit cooldown (Req 10)
  React.useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  // Format seconds into MM:SS timestamp display
  const formatTimestamp = (seconds) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const parseErrorMessage = (err) => {
    const detailObj = err?.response?.data?.detail;
    if (err?.response?.status === 429 || detailObj?.code === 'YOUTUBE_RATE_LIMITED' || err?.response?.data?.code === 'YOUTUBE_RATE_LIMITED') {
      const retryAfter = detailObj?.retryAfter || err?.response?.data?.retryAfter || 30;
      setCooldownSeconds(retryAfter);
      return detailObj?.message || `YouTube is temporarily rate-limiting transcript requests. Please try again later.`;
    }
    if (err?.response?.status === 400) {
      return detailObj?.message || (typeof detailObj === 'string' ? detailObj : 'Please enter a valid YouTube URL.');
    }
    if (err?.response?.status === 404) {
      return detailObj?.message || (typeof detailObj === 'string' ? detailObj : 'No transcript is available for this video.');
    }
    if (err?.response?.status === 502) {
      return 'Unable to reach YouTube.';
    }
    if (err?.response?.status === 504 || err?.response?.status === 408 || err?.code === 'ECONNABORTED' || err?.message?.includes('timeout')) {
      return 'Transcript retrieval timed out.';
    }
    if (detailObj) {
      if (typeof detailObj === 'string') {
        return detailObj;
      }
      if (detailObj?.message) {
        return detailObj.message;
      }
    }
    if (!err?.response && (err?.message?.includes('Network Error') || err?.code === 'ERR_NETWORK')) {
      return 'Unable to connect to LearnLens server. Please make sure the backend server is running.';
    }
    return err?.message || 'Unable to process this video right now.';
  };

  const handleStartAnalysis = async (e) => {
    if (e) e.preventDefault();
    if (isAnalyzing || cooldownSeconds > 0) return;
    setErrorMsg(null);

    const videoId = extractVideoId(url);
    if (!videoId) {
      const err = 'Please enter a valid YouTube URL (e.g. https://www.youtube.com/watch?v=...).';
      setErrorMsg(err);
      showToast({ title: 'Invalid URL', message: err, type: 'error' });
      return;
    }

    setIsAnalyzing(true);
    setLearningMode(selectedMode);
    setResultData(null);

    let videoInfo = null;
    let activeLang = selectedLanguage;

    try {
      // Step 1: Real Video Information
      setLoadingStep('Retrieving video metadata from YouTube...');
      videoInfo = await videoService.getVideoInfo(url);

      // Preserve metadata immediately so it is not lost if transcript fails
      const partialOutput = {
        video: videoInfo,
        transcript: null
      };
      setResultData(partialOutput);

      // Fetch available languages
      try {
        const langRes = await videoService.getAvailableLanguages(videoInfo.videoId);
        if (langRes?.languages) {
          const avail = langRes.languages.filter((l) => l.available);
          setAvailableLanguages(avail);

          // Requirement 7: Default to English ONLY if English is actually available!
          if (selectedLanguage === 'en' && avail.length > 0 && !avail.some((l) => l.code === 'en')) {
            activeLang = avail[0].code;
            setSelectedLanguage(activeLang);
          }
        }
      } catch (lErr) {
        console.warn('Languages fetch warning:', lErr);
      }

      // Step 2: Real Transcript Retrieval with selected language
      const targetLangName = SUPPORTED_LANGUAGES[activeLang] || activeLang || 'transcript';
      setLoadingStep(`Retrieving ${targetLangName} transcript & timestamps from YouTube...`);
      try {
        const transcriptData = await videoService.getTranscript(url, activeLang);
        const completeOutput = {
          video: videoInfo,
          transcript: transcriptData
        };
        setActiveMember1Output(completeOutput);
        setActiveVideoId(videoInfo.videoId);
        setResultData(completeOutput);

        if (transcriptData.languageCode || transcriptData.language) {
          setSelectedLanguage(transcriptData.languageCode || transcriptData.language);
        }

        showToast({
          title: 'Analysis Complete!',
          message: `Successfully loaded ${transcriptData.languageName || 'transcript'} for "${videoInfo.title}".`,
          type: 'success'
        });
      } catch (transcriptErr) {
        console.error('Transcript Retrieval Error:', transcriptErr);
        setResultData({ video: videoInfo, transcript: null });
        const message = parseErrorMessage(transcriptErr);
        setErrorMsg(message);
        showToast({ title: 'Transcript Unavailable', message, type: 'warning' });
      }
    } catch (videoErr) {
      console.error('Video Info Error:', videoErr);
      const message = parseErrorMessage(videoErr);
      setErrorMsg(message);
      showToast({ title: 'Analysis Failed', message, type: 'error' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFetchLanguage = async (newLang) => {
    if (!resultData?.video || isAnalyzing || cooldownSeconds > 0) return;
    setSelectedLanguage(newLang);

    // CRITICAL BUG FIX: Clear transcript immediately when changing language so stale transcript is NEVER displayed underneath!
    setResultData((prev) => (prev ? { video: prev.video, transcript: null } : null));

    setIsAnalyzing(true);
    setErrorMsg(null);
    const targetLangName = SUPPORTED_LANGUAGES[newLang] || newLang;
    setLoadingStep(`Retrieving ${targetLangName} transcript...`);

    try {
      const transcriptData = await videoService.getTranscript(resultData.video.videoId, newLang);
      const completeOutput = {
        video: resultData.video,
        transcript: transcriptData
      };
      setActiveMember1Output(completeOutput);
      setActiveVideoId(resultData.video.videoId);
      setResultData(completeOutput);

      if (transcriptData.languageCode || transcriptData.language) {
        setSelectedLanguage(transcriptData.languageCode || transcriptData.language);
      }

      showToast({
        title: 'Language Updated!',
        message: `Loaded ${transcriptData.languageName} transcript.`,
        type: 'success'
      });
    } catch (err) {
      console.error('Language Fetch Error:', err);
      setResultData((prev) => (prev ? { video: prev.video, transcript: null } : null));
      const message = parseErrorMessage(err);
      setErrorMsg(message);
      showToast({ title: 'Transcript Language Error', message, type: 'error' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRetryTranscript = async () => {
    if (!resultData?.video || isAnalyzing || cooldownSeconds > 0) return;
    handleFetchLanguage(selectedLanguage);
  };

  const filteredSegments = resultData?.transcript?.segments?.filter((seg) =>
    seg.text.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <AppLayout title="Analyze Video" subtitle="Transform any YouTube lecture into an interactive workspace.">
      <div className="max-w-4xl mx-auto space-y-8 py-4">
        {/* Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Analyze a YouTube Video
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary">
            Retrieve real video metadata and timestamped transcripts directly from YouTube.
          </p>
        </div>

        {/* Error Notification Banner */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3 shadow-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span className="font-medium">{errorMsg}</span>
          </motion.div>
        )}

        {!isAnalyzing && !resultData && (
          <form onSubmit={handleStartAnalysis} className="space-y-8">
            {/* Main URL Input Card */}
            <Card padding="lg" className="space-y-4 border-slate-800 bg-dark-800/90 shadow-2xl">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Educational Video URL
                </label>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-dark-900 border border-slate-700 focus-within:border-brand-indigo transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                    <YoutubeIcon className="w-5 h-5" />
                  </div>
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setErrorMsg(null);
                    }}
                    placeholder="Paste YouTube URL (e.g. https://www.youtube.com/watch?v=...)"
                    className="w-full bg-transparent text-sm sm:text-base text-text-primary outline-none placeholder:text-text-muted font-medium"
                  />
                </div>
              </div>

              {/* Language Selector */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  <Globe className="w-4 h-4 text-brand-indigo" />
                  <span>Transcript Language</span>
                </div>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  disabled={isAnalyzing}
                  className="px-3 py-1.5 rounded-xl bg-dark-900 border border-slate-700 text-xs font-medium text-text-primary focus:border-brand-indigo outline-none cursor-pointer disabled:opacity-50"
                >
                  <option value="en">English (Default)</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="pt">Portuguese</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                  <option value="zh">Chinese</option>
                  <option value="auto">Auto Detect</option>
                </select>
              </div>

              {/* Sample pre-fill links */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-text-muted">
                <span className="font-semibold text-text-secondary">Try sample videos:</span>
                <button
                  type="button"
                  onClick={() => setUrl('https://www.youtube.com/watch?v=MFhxShGxHWc')}
                  className="text-brand-lightViolet hover:underline font-mono"
                >
                  Binary Search (100s)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setUrl('https://www.youtube.com/watch?v=TNhaISOUy6Q')}
                  className="text-brand-lightViolet hover:underline font-mono"
                >
                  10 React Hooks
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setUrl('https://www.youtube.com/watch?v=pcKY4hjDrxk')}
                  className="text-brand-lightViolet hover:underline font-mono"
                >
                  BFS & DFS Graphs
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center text-base font-bold py-4 shadow-xl"
                leftIcon={<Sparkles className="w-5 h-5" />}
              >
                Analyze Video & Fetch Transcript
              </Button>
            </Card>

            {/* Mode selection grid */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider px-1">
                Select Target Learning Depth
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {learningModes.map((mode) => {
                  const Icon = mode.icon;
                  const isSelected = selectedMode === mode.id;
                  return (
                    <Card
                      key={mode.id}
                      hoverable
                      onClick={() => setSelectedMode(mode.id)}
                      className={`cursor-pointer transition-all duration-200 border-2 ${
                        isSelected
                          ? `${mode.color} bg-dark-800 shadow-xl`
                          : 'border-slate-800/80 bg-dark-900/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              isSelected ? 'bg-brand-indigo/20 text-white' : 'bg-dark-800 text-text-muted'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white font-heading">
                              {mode.title}
                            </h4>
                            <p className="text-xs text-text-muted">{mode.subtitle}</p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-brand-indigo flex items-center justify-center text-white">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary pt-3 leading-relaxed border-t border-slate-800/50 mt-3">
                        {mode.description}
                      </p>
                    </Card>
                  );
                })}
              </div>
            </div>
          </form>
        )}

        {/* Real Loading State */}
        {isAnalyzing && (
          <Card padding="lg" className="border-brand-indigo/40 bg-dark-800/90 shadow-2xl space-y-8 py-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-indigo/20 border border-brand-indigo/40 flex items-center justify-center text-brand-cyan animate-spin">
              <Loader2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-heading text-white">
                Video Processing Pipeline
              </h3>
              <p className="text-sm text-brand-lightViolet font-medium animate-pulse">
                {loadingStep}
              </p>
              <p className="text-xs text-text-muted font-mono pt-2">
                {url}
              </p>
            </div>
          </Card>
        )}

        {/* Real Result Display */}
        {resultData && !isAnalyzing && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Real Video Metadata Header */}
            <Card padding="lg" className="border-slate-800 bg-dark-800/90 shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img
                  src={resultData.video.thumbnail}
                  alt={resultData.video.title}
                  className="w-full md:w-64 h-36 object-cover rounded-xl border border-slate-700 shadow-md shrink-0"
                />
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="cyan" size="sm">
                      Real Video Metadata
                    </Badge>
                    <Badge variant="indigo" size="sm">
                      ID: {resultData.video.videoId}
                    </Badge>
                    <Badge variant="outline" size="sm">
                      Transcript Language: {resultData.transcript?.languageName || 'N/A'}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-extrabold font-heading text-white leading-tight">
                    {resultData.video.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                    <span className="font-semibold text-brand-lightViolet flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-brand-indigo" />
                      Channel: {resultData.video.channel || 'Unknown Channel'}
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      {resultData.transcript ? `${resultData.transcript.segments.length} Timestamped Segments` : 'Transcript Unavailable'}
                    </span>
                    <span className="flex items-center gap-1.5 text-text-muted font-mono">
                      <Clock className="w-4 h-4 text-text-muted" />
                      {resultData.transcript ? `${resultData.transcript.fullText.split(/\s+/).length} Words Total` : '0 Words'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setResultData(null);
                    setErrorMsg(null);
                  }}
                  leftIcon={<RefreshCw className="w-4 h-4" />}
                >
                  Analyze Another Video
                </Button>
              </div>
            </Card>

            {/* Real Transcript Display Box */}
            {resultData.transcript ? (
              <Card padding="lg" className="border-slate-800 bg-dark-800/90 shadow-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center text-brand-lightViolet">
                      <ListFilter className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-heading text-white flex items-center gap-2">
                        <span>Retrieved Video Transcript</span>
                        <Badge variant="indigo" size="sm">
                          {resultData.transcript?.languageName || 'English'}
                        </Badge>
                      </h4>
                      <p className="text-xs text-text-muted">
                        Transcript Language: {resultData.transcript?.languageName || 'English'} • Preserved timestamps `[start]` & `duration`
                      </p>
                    </div>
                  </div>

                  {/* View Switcher & Language Change */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-dark-900 px-2.5 py-1 rounded-xl border border-slate-800 text-xs">
                      <Globe className="w-3.5 h-3.5 text-brand-indigo shrink-0" />
                      <select
                        value={selectedLanguage}
                        onChange={(e) => handleFetchLanguage(e.target.value)}
                        disabled={isAnalyzing}
                        className="bg-transparent text-xs font-semibold text-brand-lightViolet outline-none cursor-pointer disabled:opacity-50"
                      >
                        <option value="auto">Auto Detect</option>
                        {availableLanguages.length > 0 ? (
                          availableLanguages.map((l) => (
                            <option key={l.code} value={l.code}>
                              {l.name}
                            </option>
                          ))
                        ) : (
                          Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
                            code !== 'auto' && (
                              <option key={code} value={code}>
                                {name}
                              </option>
                            )
                          ))
                        )}
                      </select>
                    </div>

                    <div className="flex items-center bg-dark-900 p-1 rounded-xl border border-slate-800">
                      <button
                        onClick={() => setActiveViewTab('segments')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          activeViewTab === 'segments'
                            ? 'bg-brand-indigo text-white shadow-md'
                            : 'text-text-muted hover:text-white'
                        }`}
                      >
                        Timestamped Segments ({resultData.transcript.segments.length})
                      </button>
                      <button
                        onClick={() => setActiveViewTab('fullText')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          activeViewTab === 'fullText'
                            ? 'bg-brand-indigo text-white shadow-md'
                            : 'text-text-muted hover:text-white'
                        }`}
                      >
                        Full Text
                      </button>
                    </div>
                  </div>
                </div>

                {activeViewTab === 'segments' ? (
                  <div className="space-y-3">
                    {/* Search input */}
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-900 border border-slate-800 focus-within:border-brand-indigo transition-colors">
                      <Search className="w-4 h-4 text-text-muted shrink-0" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search within transcript segments..."
                        className="w-full bg-transparent text-xs text-text-primary outline-none placeholder:text-text-muted"
                      />
                    </div>

                    <div className="max-h-96 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
                      {filteredSegments.length > 0 ? (
                        filteredSegments.map((seg, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-dark-900/80 border border-slate-800/80 hover:border-slate-700 flex items-start gap-3 transition-colors text-xs"
                          >
                            <span className="px-2 py-1 rounded bg-brand-indigo/15 text-brand-lightViolet border border-brand-indigo/30 font-mono font-bold shrink-0">
                              {formatTimestamp(seg.start)}
                            </span>
                            <div className="flex-1 text-text-secondary leading-relaxed pt-0.5">
                              {seg.text}
                            </div>
                            <span className="text-[10px] text-text-muted font-mono shrink-0 pt-1">
                              +{seg.duration}s
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-xs text-text-muted">
                          No segments matched your search term.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto p-4 rounded-xl bg-dark-900/90 border border-slate-800 text-xs text-text-secondary leading-relaxed font-sans whitespace-pre-wrap">
                    {resultData.transcript.fullText}
                  </div>
                )}
              </Card>
            ) : (
              <Card padding="lg" className="border-amber-500/30 bg-amber-500/5 text-amber-300 space-y-3 text-center">
                <p className="text-sm font-semibold">
                  Transcript could not be loaded for the requested language.
                </p>
                <div className="flex items-center justify-center gap-3 pt-1">
                  <div className="flex items-center gap-1.5 bg-dark-900 px-3 py-1.5 rounded-xl border border-amber-500/40 text-xs">
                    <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      disabled={isAnalyzing}
                      className="bg-transparent text-xs font-semibold text-amber-300 outline-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="auto">Auto Detect</option>
                      {availableLanguages.length > 0 ? (
                        availableLanguages.map((l) => (
                          <option key={l.code} value={l.code}>
                            {l.name}
                          </option>
                        ))
                      ) : (
                        Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
                          code !== 'auto' && (
                            <option key={code} value={code}>
                              {name}
                            </option>
                          )
                        ))
                      )}
                    </select>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetryTranscript}
                    disabled={isAnalyzing || cooldownSeconds > 0}
                    leftIcon={<RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />}
                    className="border-amber-500/40 text-amber-300 hover:bg-amber-500/10 disabled:opacity-50"
                  >
                    {cooldownSeconds > 0 ? `Try again in ${cooldownSeconds}s` : 'Retrieve Transcript'}
                  </Button>
                </div>
              </Card>
            )}
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

