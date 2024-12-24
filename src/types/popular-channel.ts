export interface PopularChannel {
  id: string;
  channel_name: string;
  add_language: string;
  image: string;
  stream_url: string;
  youtube: boolean;
  sort_value: number;
  plan_id: string;
  count: string;
  plan_name: string;
}

export interface PopularChannelResponse {
  success: boolean;
  data: PopularChannel[];
}