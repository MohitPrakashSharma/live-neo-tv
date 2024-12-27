import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { HomePage } from './pages/HomePage';
import { ChannelPage } from './pages/ChannelPage';
import { MetaTags } from './components/SEO/MetaTags';
import { ErrorBoundary } from './components/ErrorBoundary';
import { fetchChannelByName } from './services/api';
import { reverseSlug } from './utils/slug';
import Sitemap from './pages/Sitemap';

export const App = () => {
  const [metaData, setMetaData] = useState({
    title: "Watch Live TV on NeoTV+",
    description: "Watch 100+ live streaming of Fast channels on NeoTV+.",
    canonicalUrl: window.location.origin,
    ogImage: "https://neotvapp.com/wp-content/uploads/2024/09/neo-tv-banner.jpg",
  });

  const [loading, setLoading] = useState(true);
  const channelSlug = window.location.pathname.split('/')[1]; // Get slug from URL

  useEffect(() => {
    const updateMetaData = async () => {
      setLoading(true); // Set loading before the API call
      try {
        if (channelSlug) {
          const channelName = reverseSlug(channelSlug);
          const response = await fetchChannelByName(channelName);

          if (response.channel_name && response.channel_name) {
            const { channel_name, image } = response;

            setMetaData({
              title: `${channel_name} | NeoTV+`,
              description: `Watch live streaming of ${channel_name} on NeoTV+.`,
              canonicalUrl: `${window.location.origin}/${channelSlug}`,
              ogImage: image,
            });
          }
        } else {
          // Fallback to default metadata
          setMetaData({
            title: "Watch Live TV on NeoTV+",
            description: "Watch 100+ live streaming of Fast channels on NeoTV+.",
            canonicalUrl: window.location.origin,
            ogImage: "https://neotvapp.com/wp-content/uploads/2024/09/neo-tv-banner.jpg",
          });
        }
      } catch (error) {
        console.error("Error fetching metadata:", error);
        // Fallback to default metadata on error
        setMetaData({
          title: "Watch Live TV on NeoTV+",
          description: "Watch 100+ live streaming of Fast channels on NeoTV+.",
          canonicalUrl: window.location.origin,
          ogImage: "https://neotvapp.com/wp-content/uploads/2024/09/neo-tv-banner.jpg",
        });
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    };

    updateMetaData();
  }, [channelSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  } 

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-[#1a1a1a] text-white">
          <MetaTags
            title={metaData.title}
            description={metaData.description}
            canonicalUrl={metaData.canonicalUrl}
            ogImage={metaData.ogImage}
          />
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
