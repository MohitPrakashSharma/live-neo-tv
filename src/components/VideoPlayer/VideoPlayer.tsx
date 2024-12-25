import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import type { Channel } from '../../types/channel';
import type { PopularChannel } from '../../types/popular-channel';
import { LoaderOverlay } from './LoaderOverlay';

interface VideoPlayerProps {
  channel: Channel | PopularChannel | null;
}

export const VideoPlayer = ({ channel }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate and set container height based on aspect ratio
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // Even more reduced height ratio for a more compact player
        const height = width * (9/32); // Further reduced ratio for shorter height
        containerRef.current.style.height = `${height}px`;
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Player initialization and cleanup
  useEffect(() => {
    const cleanup = () => {
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
          playerRef.current = null;
        } catch (e) {
          console.error('Error disposing video player:', e);
        }
      }
    };

    if (channel?.stream_url && videoRef.current) {
      cleanup();

      const videoElement = document.createElement("video-js");
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.innerHTML = '';
      videoRef.current.appendChild(videoElement);

      const player = videojs(videoElement, {
        controls: true,
        fluid: false,
        aspectRatio: '32:9',
        autoplay: true,
        preload: 'auto',
        html5: {
          hls: {
            enableLowInitialPlaylist: true,
            smoothQualityChange: true,
            overrideNative: true,
          }
        }
      });

      player.src({
        src: channel.stream_url,
        type: 'application/x-mpegURL'
      });

      player.play().catch(error => {
        console.warn('Autoplay prevented:', error);
      });

      playerRef.current = player;
    }

    return cleanup;
  }, [channel?.stream_url]);

  return (
    <div className="fixed top-16 left-0 right-0 w-full z-30">
      <div className="bg-black">
        <div 
          ref={containerRef}
          className="relative w-full"
          style={{ aspectRatio: '32/9' }}
        >
          <div ref={videoRef} className="absolute inset-0">
            {(!channel || !channel.stream_url) && <LoaderOverlay />}
          </div>
        </div>
      </div>
      
      {channel && (
        <div className="bg-[#262626] py-1.5 px-2">
          <div className="container mx-auto px-4">
            <h2 className="text-sm md:text-base font-semibold truncate">
              <span className="text-[#e40876]">Now Watching: </span>
              {channel.channel_name}
            </h2>
            <p className="text-xs text-gray-400">
              {channel.add_language} • {channel.plan_name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};