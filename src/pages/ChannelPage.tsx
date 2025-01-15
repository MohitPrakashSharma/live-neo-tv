import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VideoPlayer } from '../components/VideoPlayer/VideoPlayer';
import { PopularChannelsGrid } from '../components/PopularChannels/PopularChannelsGrid';
import { ProgramGuide } from '../components/ProgramGuide/ProgramGuide';
import { useSelectedChannel } from '../hooks/useSelectedChannel';
import { fetchChannelByName } from '../services/api';
import { reverseSlug, generateSlug } from '../utils/slug';

export const ChannelPage = () => {
	const { channelSlug } = useParams();
	const navigate = useNavigate();
	const { selectedChannel, setSelectedChannel } = useSelectedChannel();
	const [selectedCategory, setSelectedCategory] = useState<string>('');


	useEffect(() => {
		const loadChannel = async () => {
			if (channelSlug) {
				const channelName = reverseSlug(channelSlug);
				try {
					const channel = await fetchChannelByName(channelName);
					if (channel) {
						setSelectedChannel(channel);
						if (channel.add_language) {
							setSelectedCategory(channel.add_language);
						}
					} else {
						throw new Error('Channel not found');
					}
				} catch (error) {
					console.error('Failed to load channel:', error);
					navigate('/');
				}
			}
		};

		loadChannel();
	}, [channelSlug, setSelectedChannel, navigate]);

	const handleChannelSelect = (id: string, channelName: string) => {
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
