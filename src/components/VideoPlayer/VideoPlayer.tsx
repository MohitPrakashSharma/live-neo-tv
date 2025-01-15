import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-ads';
import 'videojs-ima';
import 'videojs-ima/dist/videojs.ima.css';
import type { Channel } from '../../types/channel';
import type { PopularChannel } from '../../types/popular-channel';
import { VideoPlayerSkeleton } from '../Skeletons/VideoPlayerSkeleton';

const NowPlaying = ({ channel }: { channel: Channel | PopularChannel }) => (
  <div className="bg-[#262626] py-1.5 px-2">
    <div className="container mx-auto px-4">
      <h2 className="text-sm md:text-base font-semibold truncate">
        <span className="text-[#e40876]">Now Playing: </span>
        {channel.channel_name}
      </h2>
      <p className="text-xs text-gray-400">{channel.add_language}</p>
    </div>
  </div>
);

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
      videoRef.current.innerHTML = '';
      videoRef.current.appendChild(videoElement);

      const aspectRatio = window.innerWidth >= 768 ? '32:9' : '16:9';

      const player = videojs(videoElement, {
        controls: true,
        fluid: true,
        aspectRatio: aspectRatio,
        autoplay: true,
        playsinline: true,
        muted: true, // Start muted to comply with autoplay policies
        preload: 'auto',
        html5: {
          hls: {
            enableLowInitialPlaylist: true,
            smoothQualityChange: true,
            overrideNative: true,
          },
        },
      });

      // Wait until the player is ready and then unmute forcefully after a short delay
      player.ready(() => {
        setTimeout(() => {
          player.muted(false); // Unmute the video
          player.play(); // Force play after unmuting
        }, 1600); // Delay to bypass some autoplay restrictions
      });

      // Configure IMA ads
      const imaOptions = {
        adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
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
    <div className="left-0 right-0 w-full z-20">
      <div className="bg-black">
        <div
          ref={containerRef}
          className="relative w-full"
        >
          <div ref={videoRef} className="relative inset-0 video-js"></div>
        </div>
      </div>

      {channel && <NowPlaying channel={channel} />}
    </div>
  );
};
