import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { PopularChannelCard } from './PopularChannelCard';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import { usePopularChannels } from '../../hooks/usePopularChannels';
import { LoadingSpinner } from '../LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage';

interface PopularChannelsGridProps {
  onChannelSelect: (channelId: string, channelName: string) => void;
}

export const PopularChannelsGrid = ({ onChannelSelect }: PopularChannelsGridProps) => {
  const { scrollRef, scrollLeft, scrollRight, canScrollLeft, canScrollRight } = useHorizontalScroll();
  const [isHovering, setIsHovering] = useState(false);
  const { channels, loading, error, refetch } = usePopularChannels();

  if (loading) {
    return (
      <div className="px-4 py-4">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 md:w-6 md:h-6 text-[#e40876]" />
          <h2 className="text-lg md:text-xl font-bold">Popular Now</h2>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-4">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 md:w-6 md:h-6 text-[#e40876]" />
          <h2 className="text-lg md:text-xl font-bold">Popular Now</h2>
        </div>
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <>
      <div
        className="relative flex px-4 py-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 md:w-6 md:h-6 text-[#e40876]" />
          <h2 className="text-lg md:text-xl font-bold">Popular Now</h2>
        </div>
        <div
          ref={scrollRef}
          className="items-center grid grid-flow-col auto-cols-[80px] sm:auto-cols-[100px] md:auto-cols-[140px] lg:auto-cols-[160px] gap-2 md:gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-1"
        >
          {channels.map((channel) => (
            <div key={channel.id}>
              <PopularChannelCard
                channel={channel}
                onPlay={() => onChannelSelect(channel.id, channel.channel_name)}
              />
            </div>
          ))}
        </div>

        {/* Scroll buttons - Only show on desktop */}
        <div className="hidden md:block">
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className={`absolute left-0 top-1/2 translate-y-2 p-2 bg-black/50 rounded-r-lg transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'
                }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={scrollRight}
              className={`absolute right-0 top-1/2 translate-y-2 p-2 bg-black/50 rounded-l-lg transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'
                }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};