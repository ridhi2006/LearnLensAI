import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_VIDEO_ID } from '../data/mockVideos';

const LearningContext = createContext(null);

export const LearningProvider = ({ children }) => {
  const [activeVideoId, setActiveVideoId] = useState(DEFAULT_VIDEO_ID);
  const [learningMode, setLearningMode] = useState('College'); // 'Beginner' | 'College' | 'Revision' | 'Interview'
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'transcript' | 'notes' | 'graph' | 'quiz' | 'tutor' | 'roadmap'
  const [currentTimestamp, setCurrentTimestamp] = useState('00:00');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedGraphNode, setSelectedGraphNode] = useState(null);

  // Jump to specific timestamp and optionally switch to transcript or tutor tab
  const jumpToTimestamp = (timestamp, targetTab = null) => {
    setCurrentTimestamp(timestamp);
    if (targetTab) {
      setActiveTab(targetTab);
    }
  };

  return (
    <LearningContext.Provider
      value={{
        activeVideoId,
        setActiveVideoId,
        learningMode,
        setLearningMode,
        activeTab,
        setActiveTab,
        currentTimestamp,
        setCurrentTimestamp,
        jumpToTimestamp,
        isShareModalOpen,
        setIsShareModalOpen,
        selectedGraphNode,
        setSelectedGraphNode,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
