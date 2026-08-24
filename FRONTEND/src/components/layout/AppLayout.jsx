import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { AppHeader } from './AppHeader';
import { MobileNav } from './MobileNav';
import { ShareModal } from './ShareModal';
import { useLearning } from '../../context/LearningContext';

export const AppLayout = ({ children, title, subtitle, hideHeader = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { isShareModalOpen, setIsShareModalOpen, activeVideoId } = useLearning();

  return (
    <div className="min-h-screen bg-dark-900 text-text-primary flex">
      {/* Desktop App Sidebar */}
      <div className="hidden md:block">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Mobile Drawer */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      {/* Share Session Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        videoId={activeVideoId}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        {!hideHeader && (
          <AppHeader
            title={title}
            subtitle={subtitle}
            onMenuClick={() => setIsMobileNavOpen(true)}
          />
        )}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
