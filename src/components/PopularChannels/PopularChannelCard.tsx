import React from 'react';
import { Play } from 'lucide-react';
import type { PopularChannel } from '../../types/popular-channel';

interface PopularChannelCardProps {
  channel: PopularChannel;
  onPlay: () => void;
}

export const PopularChannelCard = ({ channel, onPlay }: PopularChannelCardProps) => {
  return (
    <div className="relative group rounded-lg overflow-hidden">
      <img 
        src={channel.image} 
        alt={channel.channel_name}
        className="w-full h-24 sm:h-28 md:h-32 object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
        <h3 className="font-semibold text-sm md:text-base truncate">{channel.channel_name}</h3>
        <p className="text-xs text-gray-300">{parseInt(channel.count).toLocaleString()} watching</p>
      </div>
      <button
        onClick={onPlay}
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <div className="bg-[#e40876] rounded-full p-1.5 md:p-2">
          <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>
      </button>
    </div>
  );
};