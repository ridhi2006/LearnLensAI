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
  ListFilter
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

export const AnalyzeVideo = () => {
  const [searchParams] = useSearchParams();
  const initialUrl = searchParams.get('url') || 'https://www.youtube.com/watch?v=MFhxShGxHWc';
  
  const [url, setUrl] = useState(initialUrl);
  const [selectedMode, setSelectedMode] = useState('College');
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

  // Format seconds into MM:SS timestamp display
  const formatTimestamp = (seconds) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const parseErrorMessage = (err) => {
    if (err?.code === 'ECONNABORTED' || err?.message?.includes('timeout')) {
      return 'Request timed out while contacting YouTube. Please try again or check your network connection.';
    }
    if (err?.response?.data?.detail) {
      return err.response.data.detail;
    }
    if (err?.response?.status === 504 || err?.response?.status === 408) {
      return 'YouTube request timed out while fetching video data. Please try again.';
    }
    if (err?.response?.status === 502) {
      return 'Unable to reach YouTube services. Please check your network connection.';
    }
    if (!err?.response && (err?.message?.includes('Network Error') || err?.code === 'ERR_NETWORK')) {
      return 'Unable to connect to LearnLens server. Please make sure the backend server is running.';
    }
    return err?.message || 'Unable to process this video right now.';
  };

  const handleStartAnalysis = async (e) => {
    if (e) e.preventDefault();
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

      // Step 2: Real Transcript Retrieval
      setLoadingStep('Retrieving full transcript & timestamps from YouTube (longer videos may take a few extra seconds)...');
      try {
        const transcriptData = await videoService.getTranscript(url);
        const completeOutput = {
          video: videoInfo,
          transcript: transcriptData
        };
        setActiveMember1Output(completeOutput);
        setActiveVideoId(videoInfo.videoId);
        setResultData(completeOutput);

        showToast({
          title: 'Analysis Complete!',
          message: `Successfully loaded metadata & transcript for "${videoInfo.title}".`,
          type: 'success'
        });
      } catch (transcriptErr) {
        console.error('Transcript Retrieval Error:', transcriptErr);
        const message = parseErrorMessage(transcriptErr);
        setErrorMsg(`Video metadata loaded successfully, but transcript retrieval failed: ${message}`);
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

  const handleRetryTranscript = async () => {
    if (!resultData?.video) return;
    setIsAnalyzing(true);
    setErrorMsg(null);
    setLoadingStep('Retrying transcript retrieval from YouTube...');

    try {
      const transcriptData = await videoService.getTranscript(resultData.video.videoId);
      const completeOutput = {
        video: resultData.video,
        transcript: transcriptData
      };
      setActiveMember1Output(completeOutput);
      setActiveVideoId(resultData.video.videoId);
      setResultData(completeOutput);

      showToast({
        title: 'Transcript Retrieved!',
        message: `Loaded transcript for "${resultData.video.title}".`,
        type: 'success'
      });
    } catch (err) {
      console.error('Retry Transcript Error:', err);
      const message = parseErrorMessage(err);
      setErrorMsg(`Transcript retrieval retry failed: ${message}`);
      showToast({ title: 'Transcript Retry Failed', message, type: 'error' });
    } finally {
      setIsAnalyzing(false);
    }
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
                      Lang: {resultData.transcript?.language || 'N/A'}
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
                      <h4 className="text-base font-bold font-heading text-white">
                        Retrieved Video Transcript
                      </h4>
                      <p className="text-xs text-text-muted">
                        Preserved timestamps `[start]` & `duration` ready for interactive learning
                      </p>
                    </div>
                  </div>

                  {/* View Switcher Tabs */}
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
                  Transcript could not be loaded automatically.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetryTranscript}
                  leftIcon={<RefreshCw className="w-4 h-4" />}
                  className="mx-auto border-amber-500/40 text-amber-300 hover:bg-amber-500/10"
                >
                  Retry Transcript Retrieval
                </Button>
              </Card>
            )}
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};
