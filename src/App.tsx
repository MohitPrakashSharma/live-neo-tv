import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { HomePage } from './pages/HomePage';
import { ChannelPage } from './pages/ChannelPage';
import { MetaTags } from './components/SEO/MetaTags';
import { ErrorBoundary } from './components/ErrorBoundary';

export const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-[#1a1a1a] text-white">
          <MetaTags />
          <Header />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:channelSlug" element={<ChannelPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
};