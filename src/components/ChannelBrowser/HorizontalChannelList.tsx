import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '../../data/channels';

interface HorizontalChannelListProps {
  onChannelSelect: (channelId: string) => void;
}

export const HorizontalChannelList = ({ onChannelSelect }: HorizontalChannelListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 p-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {categories.flatMap(category => 
          category.channels.map(channel => (
            <div
              key={channel.id}
              className="flex-shrink-0 w-80 h-60 relative rounded-lg overflow-hidden"
              style={{ scrollSnapAlign: 'start' }}
            >
              <img
                src={channel.thumbnail}
                alt={channel.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold">{channel.name}</h3>
                <p className="text-sm text-gray-300">Now Playing</p>
              </div>
              <button
                onClick={() => onChannelSelect(channel.id)}
                className="absolute inset-0"
                aria-label={`Watch ${channel.name}`}
              />
            </div>
          ))
        )}
      </div>
      
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};