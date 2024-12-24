export interface Channel {
  id: string;
  channel_name: string;
  add_language: string;
  image: string;
  stream_url: string;
  youtube: boolean;
  sort_value: number;
  plan_id: string;
  plan_name: string;
  plan_price: string;
}

export interface ChannelResponse {
  success: boolean;
  data: Channel[];
}