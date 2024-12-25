import React, { useState } from 'react';
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
    <main>
      <VideoPlayer channel={selectedChannel} />
      
      <div className="mt-[240px] md:mt-[280px] lg:mt-[320px]">
        <div className="mt-8 md:mt-12 pt-16 md:pt-20 mb-8">
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