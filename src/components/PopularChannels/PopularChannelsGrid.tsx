import React, { useState } from 'react';
import { Flame } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { PopularChannelCard } from './PopularChannelCard';
import { usePopularChannels } from '../../hooks/usePopularChannels';
import { PopularChannelsSkeleton } from '../Skeletons/PopularChannelsSkeleton';
import { ErrorMessage } from '../ErrorMessage';

interface PopularChannelsGridProps {
  onChannelSelect: (channelId: string, channelName: string) => void;
}

export const PopularChannelsGrid = ({ onChannelSelect }: PopularChannelsGridProps) => {
  const { channels, loading, error, refetch } = usePopularChannels();

  if (loading) {
    return (
      <div className="px-4 py-4">
        <PopularChannelsSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Flame className="w-5 h-5 md:w-6 md:h-6 text-[#e40876]" />
          <h2 className="text-lg md:text-xl font-bold">Popular Now</h2>
        </div>
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="relative px-4 py-4">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Flame className="w-5 h-5 md:w-6 md:h-6 text-[#e40876]" />
        <h2 className="text-lg md:text-xl font-bold">Popular Now</h2>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        breakpoints={{
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1440: { slidesPerView: 5, spaceBetween: 25 },
        }}
        className="overflow-hidden"
      >
        {channels.map((channel) => (
          <SwiperSlide key={channel.id}>
            <PopularChannelCard
              channel={channel}
              onPlay={() => onChannelSelect(channel.id, channel.channel_name)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
