import React from 'react';
import { QuickWatchOverlay } from '../QuickWatch/QuickWatchOverlay';
import type { Channel } from '../../types/channel';

interface ChannelItemProps {
  channel: Channel;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const ChannelItem = ({ channel, isSelected, onSelect }: ChannelItemProps) => {
  return (
    <div className={`group duration-200 transform ${
      // isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'
      isSelected ? '' : 'hover:scale-[1.01]'
    }`}>
      <div className={`flex items-center gap-4 p-4 bg-[#262626] rounded-lg transition-colors ${
        isSelected ? 'border-2 border-[#e40876]' : ''
      }`}>
        <div className="relative w-24 h-16 overflow-hidden rounded">
          <img 
            src={channel.image}
            alt={channel.channel_name}
            className="w-full h-full object-cover"
          />
          <QuickWatchOverlay
            channelName={channel.channel_name}
            isActive={isSelected}
            onPlay={() => onSelect(channel.id)}
          />
        </div>
        <div>
          <h3 className={`font-semibold transition-colors ${
            isSelected ? 'text-[#e40876]' : 'group-hover:text-[#e40876]/80'
          }`}>
            {channel.channel_name}
          </h3>
          <p className="text-sm text-gray-400">
            {channel.add_language}
          </p>
        </div>
      </div>
    </div>
  );
};