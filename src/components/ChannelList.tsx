import React from 'react';
import { categories } from '../data/channels';
import { ChannelPreview } from './QuickWatch/ChannelPreview';

interface ChannelListProps {
  onChannelSelect: (id: string) => void;
  selectedCategory: string;
  selectedChannel?: string;
}

export const ChannelList = ({ onChannelSelect, selectedCategory, selectedChannel }: ChannelListProps) => {
  const category = categories.find(c => c.id === selectedCategory);
  
  if (!category) return null;

  return (
    <div className="space-y-4 pb-8">
      {category.channels.map((channel) => (
        <ChannelPreview
          key={channel.id}
          channel={channel}
          onChannelSelect={onChannelSelect}
          isActive={channel.id === selectedChannel}
        />
      ))}
    </div>
  );
};