import React from 'react';
import { ThumbsUp, Share2, Flag } from 'lucide-react';

export const ChannelInfo = () => {
  return (
    <div className="bg-[#1e1e1e] text-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Pluto TV Action</h1>
          <p className="text-sm text-gray-400">Now Playing: The Expendables</p>
          <p className="text-xs text-gray-500 mt-1">
            Action stars unite in this explosive thriller about mercenaries on a dangerous mission.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button className="flex flex-col items-center text-gray-400 hover:text-white transition">
            <ThumbsUp className="w-5 h-5" />
            <span className="text-xs mt-1">Like</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 hover:text-white transition">
            <Share2 className="w-5 h-5" />
            <span className="text-xs mt-1">Share</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 hover:text-white transition">
            <Flag className="w-5 h-5" />
            <span className="text-xs mt-1">Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}