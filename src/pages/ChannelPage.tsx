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
      if (width >= 1440) {
        setPaddingTop('23rem');
      } else if (width >= 1024 && width < 1440) {
        setPaddingTop('20rem'); // Adjust the padding value as needed
      } else if (width >= 768 && width < 1024) {
        // Tablet
        setPaddingTop('18rem'); // Adjust the padding value as needed
      } else {
        // Mobile
        setPaddingTop('11rem');
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
      
      <div className="mt-[180px] md:mt-[200px] lg:mt-[220px]">
        <div className="mt-8 md:mt-12 pt-16 md:pt-20 mb-8" style={{ paddingTop }}>
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