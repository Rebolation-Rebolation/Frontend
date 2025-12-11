import { useState, useEffect, useCallback } from 'react';
import { trophiesService } from '../services/trophies.service';
import type { Trophy } from '../types/api';
import type { ApiError } from '../services/api';

interface UseTrophiesReturn {
  trophies: Trophy[];
  isLoading: boolean;
  error: string | null;
  refetch: (teamId?: string, championshipId?: string) => Promise<void>;
  clearError: () => void;
}

export const useTrophies = (teamId?: string, championshipId?: string): UseTrophiesReturn => {
  const [trophies, setTrophies] = useState<Trophy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrophies = useCallback(async (tId?: string, cId?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await trophiesService.getAll(tId || teamId, cId || championshipId);
      setTrophies(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao carregar troféus');
    } finally {
      setIsLoading(false);
    }
  }, [teamId, championshipId]);

  useEffect(() => {
    fetchTrophies();
  }, [fetchTrophies]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    trophies,
    isLoading,
    error,
    refetch: fetchTrophies,
    clearError,
  };
};



