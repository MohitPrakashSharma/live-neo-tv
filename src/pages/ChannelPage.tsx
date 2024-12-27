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
				setPaddingTop('23rem'); // Desktop screens
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
		<main>
			<VideoPlayer channel={selectedChannel} />

			<div className="mt-[180px] md:mt-[200px] lg:mt-[220px] responsive-container" >
				<div className="">
					<PopularChannelsGrid onChannelSelect={handleChannelSelect} />
				</div>

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
