import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-ads';
import 'videojs-ima';
import 'videojs-ima/dist/videojs.ima.css';
import '@videojs/themes/dist/fantasy/index.css';
import type { Channel } from '../../types/channel';
import type { PopularChannel } from '../../types/popular-channel';  
import { VideoPlayerSkeleton } from '../Skeletons/VideoPlayerSkeleton';

interface VideoPlayerProps {
  channel: Channel | PopularChannel | null;
}

export const VideoPlayer = ({ channel }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load the IMA SDK dynamically
  useEffect(() => {
    if (!window.google || !window.google.ima) {
      const script = document.createElement('script');
      script.src = 'https://imasdk.googleapis.com/js/sdkloader/ima3.js';
      script.async = true;
      script.onload = () => console.log('IMA SDK loaded');
      script.onerror = () => console.error('Failed to load IMA SDK');
      document.head.appendChild(script);
    } 
  }, []);

  // Calculate and set container height based on aspect ratio
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;

        let aspectRatioValue;
        if (window.innerWidth >= 768) {
          aspectRatioValue = '32:9'; // Tablet and desktop
        } else {
          aspectRatioValue = '16:9'; // Mobile
        }
        const [widthRatio, heightRatio] = aspectRatioValue.split(':').map(Number);
        const height = width * (heightRatio / widthRatio);
 
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
      let aspectRatio;
      if (window.innerWidth >= 768) {
        aspectRatio = '32:9'; // Tablet and desktop
      } else {
        aspectRatio = '16:9'; // Mobile
      }


      const player = videojs(videoElement, {
        controls: true,
        fluid: false,
        aspectRatio: aspectRatio,
        autoplay: true,
        playsinline: true,
        muted: true,
        preload: 'auto',
        html5: {
          hls: {
            enableLowInitialPlaylist: true,
            smoothQualityChange: true,
            overrideNative: true,
          },
        },
      });

      // Configure IMA ads
      const imaOptions = {
        adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/106213651,121324381/NeoTv_App_Khabriya_Vast_Video&description_url=https%3A%2F%2Fneotvapp.com&tfcd=0&npa=0&sz=1x1%7C400x300%7C640x480&gdfp_req=1&unviewed_position_start=1&output=vast&env=vp&impl=s&idtype=adid&an=Neo%20TV&msid=com.playerhd.hdvideodownloader',
        debug: false,
      };
      player.ima(imaOptions);

      // Initialize and request ads
      try {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
      } catch (error) {
        player.src({ src: channel.stream_url, type: 'application/x-mpegURL' });
        player.play();
      }

      // Handle ad errors
      player.on('adserror', () => {
        console.warn('Ad failed to load. Playing live stream.');
        player.src({ src: channel.stream_url, type: 'application/x-mpegURL' });
        player.play();
      });

      // Play the main video after ads
      player.on('ads-ad-ended', () => {
        console.log('Ad ended. Playing live stream.');
        player.src({ src: channel.stream_url, type: 'application/x-mpegURL' });
        player.play();
      });

      playerRef.current = player;
    }

    return cleanup;
  }, [channel?.stream_url]);

  if (!channel || !channel.stream_url) {
    return <VideoPlayerSkeleton />;
  }

  return (
    <div className="fixed top-16 left-0 right-0 w-full z-30">
      <div className="bg-black">
        <div
          ref={containerRef}
          className="relative w-full"
          style={{ aspectRatio: '32/9' }}
        >
          <div ref={videoRef} className="absolute inset-0 video-js vjs-theme-fantasy"></div>
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
              {channel.add_language}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
