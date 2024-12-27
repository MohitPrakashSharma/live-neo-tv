import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { HomePage } from './pages/HomePage';
import { ChannelPage } from './pages/ChannelPage';
import { MetaTags } from './components/SEO/MetaTags';
import { ErrorBoundary } from './components/ErrorBoundary';
import { fetchChannelByName } from './services/api'; // Ensure this API function is implemented
import { reverseSlug } from './utils/slug';

export const App = () => {
	const [metaData, setMetaData] = useState({
		title: "Watch Live TV on NeoTV+",
		description: "Watch 100+ live streaming of Fast channels on NeoTV+.",
		canonicalUrl: window.location.origin,
	});

	const channelSlug = window.location.href.split("/")[3];;
	useEffect(() => {
		const updateMetaData = async () => {
			if (channelSlug) {
				try {
					const channelName = reverseSlug(channelSlug);
					setMetaData({
						title: `${channelName} | NeoTV+`,
						description: `Watch live streaming of ${channelName} on NeoTV+.`,
						canonicalUrl: `${window.location.href}/${channelSlug}`,
					}); 
				} catch (error) {
					setMetaData({
						title: "Watch Live TV on NeoTV+",
						description: "Watch 100+ live streaming of Fast channels on NeoTV+.",
						canonicalUrl: window.location.href,
					});
				}
			} else {
				// Default meta values
				setMetaData({
					title: "Watch Live TV on NeoTV+",
					description: "Watch 100+ live streaming of Fast channels on NeoTV+.",
					canonicalUrl: window.location.origin,
				});
			}
		};

		updateMetaData();
	}, [channelSlug]);
	
	return (
		<ErrorBoundary>
			<Router>
				<div className="min-h-screen bg-[#1a1a1a] text-white">
					<MetaTags
						title={metaData.title}
						description={metaData.description}
						canonicalUrl={metaData.canonicalUrl}
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
