import { useState, useCallback } from 'react';
import { championshipsService } from '../services/championships.service';
import type {
  Championship,
  CreateChampionshipDto,
  UpdateChampionshipDto,
  FilterChampionshipDto,
  PaginatedResponse,
} from '../types/api';
import type { ApiError } from '../services/api';

interface UseChampionshipsReturn {
  championships: Championship[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
  isLoading: boolean;
  error: string | null;
  fetchChampionships: (filters?: FilterChampionshipDto) => Promise<void>;
  fetchAvailable: () => Promise<Championship[]>;
  getById: (id: string) => Promise<Championship>;
  createChampionship: (data: CreateChampionshipDto) => Promise<Championship>;
  updateChampionship: (id: string, data: UpdateChampionshipDto) => Promise<Championship>;
  deleteChampionship: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useChampionships = (): UseChampionshipsReturn => {
  const [championships, setChampionships] = useState<Championship[]>([]);
  const [pagination, setPagination] = useState<UseChampionshipsReturn['pagination']>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChampionships = useCallback(async (filters?: FilterChampionshipDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await championshipsService.getAll(filters);
      setChampionships(response.data);
      setPagination({
        total: response.total,
        page: response.page,
        limit: response.limit,
        totalPages: response.totalPages,
      });
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao carregar campeonatos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAvailable = useCallback(async (): Promise<Championship[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await championshipsService.getAvailable();
      return data;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao carregar campeonatos disponíveis');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getById = useCallback(async (id: string): Promise<Championship> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await championshipsService.getById(id);
      return data;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao carregar campeonato');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createChampionship = useCallback(async (data: CreateChampionshipDto): Promise<Championship> => {
    setIsLoading(true);
    setError(null);
    try {
      const newChampionship = await championshipsService.create(data);
      setChampionships((prev) => [newChampionship, ...prev]);
      return newChampionship;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao criar campeonato');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateChampionship = useCallback(async (id: string, data: UpdateChampionshipDto): Promise<Championship> => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedChampionship = await championshipsService.update(id, data);
      setChampionships((prev) =>
        prev.map((champ) => (champ.id === id ? updatedChampionship : champ))
      );
      return updatedChampionship;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao atualizar campeonato');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteChampionship = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await championshipsService.delete(id);
      setChampionships((prev) => prev.filter((champ) => champ.id !== id));
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao excluir campeonato');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    championships,
    pagination,
    isLoading,
    error,
    fetchChampionships,
    fetchAvailable,
    getById,
    createChampionship,
    updateChampionship,
    deleteChampionship,
    clearError,
  };
};



