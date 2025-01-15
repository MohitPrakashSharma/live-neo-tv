import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoPlayer } from '../components/VideoPlayer/VideoPlayer';
import { PopularChannelsGrid } from '../components/PopularChannels/PopularChannelsGrid';
import { ProgramGuide } from '../components/ProgramGuide/ProgramGuide';
import { useSelectedChannel } from '../hooks/useSelectedChannel';
import { generateSlug } from '../utils/slug';

export const HomePage = () => {
	const navigate = useNavigate();
	const { selectedChannel, setSelectedChannel } = useSelectedChannel();
	const [selectedCategory, setSelectedCategory] = useState('');
	const [paddingTop, setPaddingTop] = useState('11rem');


	useEffect(() => {
		const updatePadding = () => {
			const width = window.innerWidth;
			if (width >= 3440) {
				setPaddingTop('30rem'); // Ultra-wide screens
			} else if (width >= 2560 && width < 3440) {
				setPaddingTop('28rem'); // Large screens (2K monitors)
			} else if (width >= 1997 && width < 2560) {
				setPaddingTop('25rem'); // Wide screens
			} else if (width >= 1440 && width < 1997) {
				setPaddingTop('25rem'); // Desktop screens
			} else if (width >= 1024 && width < 1440) {
				setPaddingTop('20rem'); // Small desktop or tablets
			} else if (width >= 768 && width < 1024) {
				setPaddingTop('18rem'); // Tablets
			} else {
				setPaddingTop('11rem'); // Mobile
			}

		};

		updatePadding(); // Set initial value
		window.addEventListener('resize', updatePadding);

		return () => window.removeEventListener('resize', updatePadding);
	}, []);

	const handleChannelSelect = (id: string, channelName: string) => {
		setSelectedChannel(prevChannel => {
			if (prevChannel?.id === id) return prevChannel;
			return null;
		});

		navigate(`/${generateSlug(channelName)}`);
	};

	const handleCategorySelect = (categoryId: string) => {
		setSelectedCategory(categoryId);
	};

	return (
		<main className="flex flex-col">
  {/* Sticky Video Player */}
  <div className="sticky top-16 w-full z-10 bg-black">
    <VideoPlayer channel={selectedChannel} />
  </div>

 {/* Popular Channels Grid */}
<div className="mt-16 p-2 flex-1">
  <PopularChannelsGrid onChannelSelect={handleChannelSelect} />
</div>

  {/* Program Guide */}
 <div className="mt-1 sm:mt-2 p-1 sm:p-2 md:p-2">
    <ProgramGuide
      selectedCategory={selectedCategory}
      selectedChannel={selectedChannel?.id}
      onCategorySelect={handleCategorySelect}
      onChannelSelect={handleChannelSelect}
    />
  </div>
</main>

);
};