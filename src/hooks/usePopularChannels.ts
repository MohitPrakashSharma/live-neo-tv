import { useState, useEffect } from 'react';
import { PopularChannel } from '../types/popular-channel';
import { fetchPopularChannels } from '../services/api';

export const usePopularChannels = () => {
  const [channels, setChannels] = useState<PopularChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPopularChannels = async () => {
      try {
        const data = await fetchPopularChannels();
        setChannels(data);
        setError(null);
      } catch (err) {
        setError('Failed to load popular channels');
      } finally {
        setLoading(false);
      }
    };

    loadPopularChannels();
  }, []);

  return { channels, loading, error };
};