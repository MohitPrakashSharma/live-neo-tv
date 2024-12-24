import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Maximize2, Settings, Play, Pause } from 'lucide-react';
import { IconButton } from '../ui/IconButton';

interface VideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const VideoControls = ({ videoRef }: VideoControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const volumeBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [videoRef]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (volumeBarRef.current) {
      const rect = volumeBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const newVolume = Math.max(0, Math.min(1, x / width));
      
      if (videoRef.current) {
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
      }
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          <IconButton 
            icon={isPlaying ? Pause : Play} 
            onClick={togglePlay}
            label={isPlaying ? "Pause" : "Play"}
          />
          <div className="flex items-center gap-2">
            <IconButton 
              icon={isMuted ? VolumeX : Volume2} 
              onClick={toggleMute}
              label={isMuted ? "Unmute" : "Mute"}
            />
            <div 
              ref={volumeBarRef}
              className="w-24 h-1 bg-white/30 rounded-full cursor-pointer"
              onClick={handleVolumeChange}
            >
              <div 
                className="h-full bg-white rounded-full"
                style={{ width: `${isMuted ? 0 : volume * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <IconButton icon={Settings} label="Settings" />
          <IconButton 
            icon={Maximize2} 
            onClick={handleFullscreen}
            label="Toggle fullscreen"
          />
        </div>
      </div>
    </div>
  );
};