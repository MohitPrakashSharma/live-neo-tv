import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Channel } from '../types/channel';
import { PopularChannel } from '../types/popular-channel';
import { usePopularChannels } from './usePopularChannels';
import { generateSlug } from '../utils/slug';

export const useSelectedChannel = () => {
  const [selectedChannel, setSelectedChannel] = useState<Channel | PopularChannel | null>(null);
  const { channels: popularChannels, loading } = usePopularChannels();
  const navigate = useNavigate();

  // Auto-select first popular channel on load
  useEffect(() => {
    if (!loading && popularChannels.length > 0 && !selectedChannel) {
      const firstChannel = popularChannels[0];
      setSelectedChannel(firstChannel);
      navigate(`/${generateSlug(firstChannel.channel_name)}`);
    }
  }, [popularChannels, loading, selectedChannel, navigate]);

  const handleChannelSelect = useCallback((channelId: string, channelName: string) => {
    // Find channel in popular channels first
    const channel = popularChannels.find(c => c.id === channelId);
    if (channel) {
      setSelectedChannel(channel);
      navigate(`/${generateSlug(channelName)}`);
      return;
    }

    // If not found, it might be from category channels
    setSelectedChannel(null);
  }, [popularChannels, navigate]);

  return {
    selectedChannel,
    setSelectedChannel,
    handleChannelSelect
  };
};