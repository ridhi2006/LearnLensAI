import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LearningProvider } from './context/LearningContext';
import { ToastProvider } from './context/ToastContext';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { AnalyzeVideo } from './pages/AnalyzeVideo';
import { LearningWorkspace } from './pages/LearningWorkspace';
import { MyLearning } from './pages/MyLearning';
import { Library } from './pages/Library';
import { SharedSession } from './pages/SharedSession';
import { Settings } from './pages/Settings';

export const App = () => {
  return (
    <AuthProvider>
      <LearningProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* Public Landing & Marketing */}
              <Route path="/" element={<Landing />} />

              {/* Authentication */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Logged In App Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analyze" element={<AnalyzeVideo />} />
              <Route path="/learn/:videoId" element={<LearningWorkspace />} />
              <Route path="/my-learning" element={<MyLearning />} />
              <Route path="/library" element={<Library />} />
              <Route path="/settings" element={<Settings />} />

              {/* Public Shared Session */}
              <Route path="/share/:shareId" element={<SharedSession />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ToastProvider>
      </LearningProvider>
    </AuthProvider>
  );
};

export default App;
