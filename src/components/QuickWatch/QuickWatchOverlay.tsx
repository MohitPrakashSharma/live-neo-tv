import React from 'react';
import { Play, Radio } from 'lucide-react';

interface QuickWatchOverlayProps {
  channelName: string;
  isActive?: boolean;
  onPlay: () => void;
}

export const QuickWatchOverlay = ({ 
  channelName, 
  isActive,
  onPlay 
}: QuickWatchOverlayProps) => {
  return (
    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
      <button
        onClick={onPlay}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label={`${isActive ? 'Now playing:' : 'Play'} ${channelName}`}
      >
        {isActive ? (
          <Radio className="w-6 h-6 text-[#e40876]" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};