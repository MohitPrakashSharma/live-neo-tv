import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import type { Channel } from '../../types/channel';
import type { PopularChannel } from '../../types/popular-channel';
import { LoadingSpinner } from '../LoadingSpinner';

interface VideoPlayerProps {
  channel: Channel | PopularChannel | null;
}

export const VideoPlayer = ({ channel }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = videojs(videoElement, {
        controls: true,
        fluid: true,
        aspectRatio: '16:9',
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

      playerRef.current = player;
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
          playerRef.current = null;
        } catch (e) {
          console.error('Error disposing video player:', e);
        }
      }
    };
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    if (channel?.stream_url) {
      try {
        player.src({
          src: channel.stream_url,
          type: 'application/x-mpegURL'
        });
        player.play().catch(error => {
          console.warn('Autoplay prevented:', error);
        });
      } catch (e) {
        console.error('Error updating video source:', e);
      }
    } else {
      player.src('');
    }
  }, [channel]);

  if (!channel) {
    return (
      <div className="fixed top-16 left-0 right-0 w-full z-30 bg-black">
        <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-16 left-0 right-0 w-full z-30">
      <div className="bg-black">
        <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px]">
          <div ref={videoRef} className="w-full h-full" />
        </div>
      </div>
      
      <div className="bg-[#262626] py-3 md:py-4 px-2">
        <div className="container mx-auto px-4">
          <h2 className="text-lg md:text-xl font-semibold truncate">
            <span className="text-[#e40876]">Now Watching: </span>
            {channel.channel_name}
          </h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            {channel.add_language} • {channel.plan_name}
          </p>
        </div>
      </div>
    </div>
  );
};