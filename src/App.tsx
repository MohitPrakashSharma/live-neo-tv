import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import ReactGA from 'react-ga4'; // Import Google Analytics library
import { Header } from './components/Layout/Header';
import { HomePage } from './pages/HomePage';
import { ChannelPage } from './pages/ChannelPage';
import { MetaTags } from './components/SEO/MetaTags';
import { ErrorBoundary } from './components/ErrorBoundary';
import { fetchChannelByName } from './services/api';
import { reverseSlug } from './utils/slug';
import loaderImage from './assets/loader.svg';

// Initialize Google Analytics with your tracking ID
const GA_TRACKING_ID = 'G-32WEG1HCMW'; // Replace with your actual tracking ID
ReactGA.initialize(GA_TRACKING_ID);

// Default metadata for the app
const DEFAULT_METADATA = {
  title: 'Watch Live TV on NeoTV+',
  description: 'Watch 100+ live streaming of Fast channels on NeoTV+.',
  canonicalUrl: window.location.origin,
  ogImage: 'https://neotvapp.com/wp-content/uploads/2024/09/neo-tv-banner.jpg',
};

export const App = () => {
  const [metaData, setMetaData] = useState(DEFAULT_METADATA);
  const [loading, setLoading] = useState(true);

  const channelSlug = window.location.pathname.split('/')[1]; // Get slug from URL

  useEffect(() => {
    const updateMetaData = async () => {
      setLoading(true); // Set loading before the API call
      try {
        if (channelSlug) {
          const channelName = reverseSlug(channelSlug);
          const response = await fetchChannelByName(channelName);

          if (response?.channel_name) {
            const { channel_name, image } = response;

            setMetaData({
              title: `${channel_name} | NeoTV+`,
              description: `Watch live streaming of ${channel_name} on NeoTV+.`,
              canonicalUrl: `${window.location.origin}/${channelSlug}`,
              ogImage: image,
            });
          } else {
            setMetaData(DEFAULT_METADATA); // Fallback to default metadata
          }
        } else {
          setMetaData(DEFAULT_METADATA); // Fallback to default metadata
        }
      } catch (error) {
        console.error('Error fetching metadata:', error);
        setMetaData(DEFAULT_METADATA); // Fallback to default metadata on error
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    };

    updateMetaData();
  }, [channelSlug]);

  // Tracks page views for Google Analytics
  const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
      ReactGA.send({ hitType: 'pageview', page: location.pathname });
    }, [location]);

    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center">
        <img src={loaderImage} alt="Loading" className="w-32 h-32" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <AnalyticsTracker /> {/* Tracks page views */}
        <div className="min-h-screen bg-[#1a1a1a] text-white">
          <MetaTags
            title={metaData.title}
            description={metaData.description}
            canonicalUrl={metaData.canonicalUrl}
            ogImage={metaData.ogImage}
          />
          <div className="max-w-[1920px] mx-auto px-4"> {/* Set max width and center content */}
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/:channelSlug" element={<ChannelPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
};
