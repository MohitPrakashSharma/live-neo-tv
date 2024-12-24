import React from 'react';
import { QuickWatchOverlay } from './QuickWatchOverlay';
import type { Channel } from '../../types/channel';

interface ChannelPreviewProps {
  channel: Channel;
  onChannelSelect: (id: string) => void;
  isActive?: boolean;
}

export const ChannelPreview = ({ channel, onChannelSelect, isActive }: ChannelPreviewProps) => {
  const handlePlay = () => {
    onChannelSelect(channel.id);
  };

  return (
    <div className="relative group">
      <div className={`flex items-center gap-4 p-4 bg-[#262626] rounded-lg transition-colors ${
        isActive ? 'border-2 border-[#e40876]' : ''
      }`}>
        <div className="relative w-24 h-16 overflow-hidden rounded">
          <img 
            src={channel.thumbnail}
            alt={channel.name}
            className="w-full h-full object-cover"
          />
          <QuickWatchOverlay
            channelName={channel.name}
            isActive={isActive}
            onPlay={handlePlay}
          />
        </div>
        <div>
          <h3 className={`font-semibold ${isActive ? 'text-[#e40876]' : ''}`}>
            {channel.name}
          </h3>
          <p className="text-sm text-gray-400">Now Playing</p>
        </div>
      </div>
    </div>
  );
};