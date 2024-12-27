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
      if (window.innerWidth >= 768) {
        setPaddingTop('23rem'); // Tablet and desktop
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
    <main>
      <VideoPlayer channel={selectedChannel} />
      
      <div className="mt-[180px] md:mt-[200px] lg:mt-[220px]">
        <div className="mt-8 md:mt-12 pt-16 md:pt-20 mb-8"  style={{ paddingTop }}>
          <PopularChannelsGrid onChannelSelect={handleChannelSelect}/>
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