import { useState, useEffect, useCallback } from 'react';
import { teamsService } from '../services/teams.service';
import type { Team, CreateTeamDto, UpdateTeamDto } from '../types/api';
import type { ApiError } from '../services/api';

interface UseTeamsReturn {
  teams: Team[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createTeam: (data: CreateTeamDto) => Promise<Team>;
  updateTeam: (id: string, data: UpdateTeamDto) => Promise<Team>;
  deleteTeam: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useTeams = (): UseTeamsReturn => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await teamsService.getAll();
      setTeams(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao carregar times');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const createTeam = useCallback(async (data: CreateTeamDto): Promise<Team> => {
    setIsLoading(true);
    setError(null);
    try {
      const newTeam = await teamsService.create(data);
      setTeams((prev) => [...prev, newTeam]);
      return newTeam;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao criar time');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTeam = useCallback(async (id: string, data: UpdateTeamDto): Promise<Team> => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTeam = await teamsService.update(id, data);
      setTeams((prev) => prev.map((team) => (team.id === id ? updatedTeam : team)));
      return updatedTeam;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao atualizar time');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteTeam = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await teamsService.delete(id);
      setTeams((prev) => prev.filter((team) => team.id !== id));
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao excluir time');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    teams,
    isLoading,
    error,
    refetch: fetchTeams,
    createTeam,
    updateTeam,
    deleteTeam,
    clearError,
  };
};



