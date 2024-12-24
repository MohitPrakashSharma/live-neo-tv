export interface ChannelDetails {
  id: string;
  name: string;
  description: string;
  category: string;
  videoQualities: VideoQuality[];
  closedCaptions: boolean;
  regionalRestrictions: string[];
  deviceCompatibility: string[];
  interactiveFeatures: string[];
}

export interface VideoQuality {
  label: string;  // e.g., "1080p", "720p"
  bitrate: number;
  available: boolean;
}

export interface Program {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  rating: string;
  closedCaptions: boolean;
}

export interface Schedule {
  channelId: string;
  date: string;
  programs: Program[];
}