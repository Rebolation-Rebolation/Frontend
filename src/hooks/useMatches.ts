import { useState, useCallback } from 'react';
import { matchesService } from '../services/matches.service';
import type { CreateMatchDto, UpdateMatchDto } from '../services/matches.service';
import type { Match } from '../types/api';
import type { ApiError } from '../services/api';

interface UseMatchesReturn {
  matches: Match[];
  isLoading: boolean;
  error: string | null;
  fetchMatches: (championshipId?: string) => Promise<void>;
  getById: (id: string) => Promise<Match>;
  create: (data: CreateMatchDto) => Promise<Match>;
  update: (id: string, data: UpdateMatchDto) => Promise<Match>;
  updateScore: (id: string, homeScore: number, awayScore: number) => Promise<Match>;
  delete: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useMatches = (): UseMatchesReturn => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = useCallback(async (championshipId?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await matchesService.getAll(championshipId);
      setMatches(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao carregar partidas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getById = useCallback(async (id: string): Promise<Match> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await matchesService.getById(id);
      return data;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao carregar partida');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const create = useCallback(async (data: CreateMatchDto): Promise<Match> => {
    setIsLoading(true);
    setError(null);
    try {
      const newMatch = await matchesService.create(data);
      setMatches((prev) => [newMatch, ...prev]);
      return newMatch;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao criar partida');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, data: UpdateMatchDto): Promise<Match> => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedMatch = await matchesService.update(id, data);
      setMatches((prev) =>
        prev.map((match) => (match.id === id ? updatedMatch : match))
      );
      return updatedMatch;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao atualizar partida');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateScore = useCallback(async (id: string, homeScore: number, awayScore: number): Promise<Match> => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedMatch = await matchesService.updateScore(id, homeScore, awayScore);
      setMatches((prev) =>
        prev.map((match) => (match.id === id ? updatedMatch : match))
      );
      return updatedMatch;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao atualizar placar');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteMatch = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await matchesService.delete(id);
      setMatches((prev) => prev.filter((match) => match.id !== id));
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao excluir partida');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    matches,
    isLoading,
    error,
    fetchMatches,
    getById,
    create,
    update,
    updateScore,
    delete: deleteMatch,
    clearError,
  };
};

