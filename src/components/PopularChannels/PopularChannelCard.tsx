import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import type { PopularChannel } from '../../types/popular-channel';

interface PopularChannelCardProps {
  channel: PopularChannel;
  onPlay: () => void;
}

export const PopularChannelCard = ({ channel, onPlay }: PopularChannelCardProps) => {
  const [aspectHeight, setAspectHeight] = useState<string>('5rem');

  useEffect(() => {
    // Adjust the aspect height based on the window width
    const updateAspectHeight = () => {
      if (window.innerWidth >= 768) {
        setAspectHeight('8rem');
      } else {
        setAspectHeight('5rem');
      }
    };

    // Set the initial height
    updateAspectHeight();

    // Add an event listener for window resize
    window.addEventListener('resize', updateAspectHeight);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateAspectHeight);
    };
  }, []);

  return (
    <a 
      href={channel.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="relative group rounded-lg overflow-hidden block"
    >
      <img 
        src={channel.image} 
        alt={channel.channel_name}
        className="w-full h-18 sm:h-18 md:h-18 object-cover"
        style={{ height: aspectHeight }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
        {/* You can add channel details here if needed */}
      </div>
      <button
        onClick={(e) => {
          e.preventDefault(); // Prevent navigation if button is clicked
          onPlay();
        }}
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <div className="bg-[#e40876] rounded-full p-1.5 md:p-2">
          <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>
      </button>
    </a>
  );
};
