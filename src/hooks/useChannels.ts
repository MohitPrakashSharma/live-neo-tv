import { useState, useEffect, useCallback } from 'react';
import { Channel } from '../types/channel';
import { fetchChannels } from '../services/api';

export const useChannels = (language: string) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadChannels = useCallback(async () => {
    if (!language) {
      setChannels([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchChannels(language);
      setChannels(data);
    } catch (err) {
      setError('Failed to load channels');
      setChannels([]);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    loadChannels();
  }, [loadChannels]);

  const refetch = () => {
    loadChannels();
  };

  return { channels, loading, error, refetch };
};