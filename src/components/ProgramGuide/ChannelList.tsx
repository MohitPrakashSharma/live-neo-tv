import React from 'react';
import { useChannels } from '../../hooks/useChannels';
import { ChannelItem } from './ChannelItem';
import { LoadingSpinner } from '../LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage';

interface ChannelListProps {
  selectedCategory: string;
  selectedChannel?: string;
  onChannelSelect: (id: string, name: string) => void;
  isExpanded: boolean;
  categoryName: string;
}

export const ChannelList = ({
  selectedCategory,
  selectedChannel,
  onChannelSelect,
  isExpanded,
  categoryName
}: ChannelListProps) => {
  const { channels, loading, error, refetch } = useChannels(categoryName);

  if (loading) {
    return (
      <div className="flex-1 p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  if (channels.length === 0) {
    return (
      <div className="flex-1 p-4 text-center text-gray-400">
        No channels found for this category
      </div>
    );
  }

  return (
    <div className={`flex-1 transition-all duration-300 ${
      isExpanded ? 'max-h-[calc(100vh-100px)]' : 'max-h-[calc(100vh-500px)]'
    } overflow-y-auto scrollbar-hide`}>
      <div className="space-y-3 pb-8">
        {channels.map((channel) => (
          <ChannelItem
            key={channel.id}
            channel={channel}
            isSelected={channel.id === selectedChannel}
            onSelect={() => onChannelSelect(channel.id, channel.channel_name)}
          />
        ))}
      </div>
    </div>
  );
};