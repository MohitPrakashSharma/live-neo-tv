import React from 'react';
import { Volume2, Maximize2, Settings, Pause } from 'lucide-react';

export const VideoPlayer = ({ channel }: { channel?: string }) => {
  return (
    <div className="fixed top-16 left-0 right-0 w-full z-50 bg-black">
      <div className="relative w-full aspect-video max-h-[calc(100vh-64px)]">
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
            alt="Current Channel"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <button className="hover:bg-white/20 p-2 rounded-full transition">
                <Pause className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                <div className="w-24 h-1 bg-white/30 rounded-full">
                  <div className="w-3/4 h-full bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="hover:bg-white/20 p-2 rounded-full transition">
                <Settings className="w-5 h-5" />
              </button>
              <button className="hover:bg-white/20 p-2 rounded-full transition">
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}