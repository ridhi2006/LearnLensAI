import React, { useState } from 'react';
import { Copy, Check, Globe, Shield, Sparkles } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';
import { learningService } from '../../services/learningService';

export const ShareModal = ({ isOpen, onClose, videoId = 'demo-binary-search', videoTitle = 'Binary Search Complete Tutorial' }) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const shareUrl = learningService.generateShareLink(videoId);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
      setCopied(true);
      showToast({
        title: 'Share link copied!',
        message: 'Anyone with this link can view this LearnLens session in read-only mode.',
        type: 'success'
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      showToast({
        title: 'Copied to clipboard',
        message: shareUrl,
        type: 'info'
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Learning Session"
      subtitle="Anyone with this link can view this LearnLens session in view-only mode."
      maxWidth="max-w-lg"
    >
      <div className="space-y-6">
        {/* Session info preview */}
        <div className="p-3.5 rounded-xl bg-dark-700/80 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-indigo/15 border border-brand-indigo/30 flex items-center justify-center text-brand-lightViolet shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-text-muted">Target Session</div>
            <div className="text-sm font-semibold text-text-primary truncate">{videoTitle}</div>
          </div>
        </div>

        {/* Link box */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-text-secondary">Shareable Session URL</label>
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-dark-900 border border-slate-800 focus-within:border-brand-indigo/50 transition-colors">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent text-xs text-text-secondary px-3 py-2 outline-none font-mono selection:bg-brand-indigo/30"
            />
            <Button
              variant={copied ? 'secondary' : 'primary'}
              size="sm"
              leftIcon={copied ? <Check className="w-3.5 h-3.5 text-accent-success" /> : <Copy className="w-3.5 h-3.5" />}
              onClick={handleCopy}
            >
              {copied ? 'Copied' : 'Copy Link'}
            </Button>
          </div>
        </div>

        {/* Access controls */}
        <div className="p-4 rounded-xl bg-dark-700/40 border border-slate-800/80 flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-dark-600 border border-slate-700 text-brand-cyan shrink-0 mt-0.5">
            <Globe className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">Anyone with the link can view</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                View-only access
              </span>
            </div>
            <p className="text-xs text-text-muted mt-1 leading-relaxed">
              Recipients can explore the video summary, interact with the knowledge graph, and read cheat notes without making changes.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" size="md" onClick={onClose}>
            Done
          </Button>
          <Button
            variant="primary"
            size="md"
            leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            onClick={handleCopy}
          >
            {copied ? 'Link Copied!' : 'Copy Share Link'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
