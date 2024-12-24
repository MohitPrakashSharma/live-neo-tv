import React, { useEffect } from 'react';
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

  useEffect(() => {
    const loadChannel = async () => {
      if (channelSlug) {
        const channelName = reverseSlug(channelSlug);
        if (!selectedChannel || generateSlug(selectedChannel.channel_name) !== channelSlug) {
          try {
            const channel = await fetchChannelByName(channelName);
            setSelectedChannel(channel);
          } catch (error) {
            console.error('Failed to load channel:', error);
            navigate('/');
          }
        }
      }
    };

    loadChannel();
  }, [channelSlug, selectedChannel, setSelectedChannel, navigate]);

  const handleChannelSelect = (id: string, channelName: string) => {
    navigate(`/${generateSlug(channelName)}`);
  };

  return (
    <main>
      <VideoPlayer channel={selectedChannel} />
      
      <div className="mt-[440px]">
        <div className="mt-12 pt-20 mb-8">
          <PopularChannelsGrid onChannelSelect={handleChannelSelect} />
        </div>
        
        <ProgramGuide
          selectedCategory={selectedChannel?.add_language || ''}
          selectedChannel={selectedChannel?.id}
          onCategorySelect={() => {}}
          onChannelSelect={(id, name) => handleChannelSelect(id, name)}
        />
      </div>
    </main>
  );
};