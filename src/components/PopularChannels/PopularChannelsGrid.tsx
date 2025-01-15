import React from 'react';
import { Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
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
      <div className="px-4 py-2">
        <PopularChannelsSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-2">
        <div className="flex items-center justify-center gap-1 mb-1">
          <Flame className="w-5 h-5 md:w-6 md:h-6 text-[#e40876]" />
          <h2 className="text-lg md:text-xl font-bold">Popular Now</h2>
        </div>
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="relative px-4 py-1 mb-2"> {/* Reduced bottom margin */}
      {/* Section Title */}
      <div className="flex items-center justify-center gap-1 mb-2 sm:mb-[5px]"> {/* Adjusted bottom margin */}
        <Flame className="w-5 h-5 md:w-6 md:h-6 text-[#e40876]" />
        <h2 className="text-lg md:text-xl font-bold">Popular Now</h2>
      </div>

      {/* Swiper Slider */}
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        breakpoints={{
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 7, spaceBetween: 20 },
          1440: { slidesPerView: 7, spaceBetween: 25 },
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Navigation]}
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
