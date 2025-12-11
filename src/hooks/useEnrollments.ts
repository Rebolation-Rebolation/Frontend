import { useState, useCallback } from 'react';
import { enrollmentsService } from '../services/enrollments.service';
import type { ChampionshipEnrollment, EnrollmentStatus } from '../types/api';
import type { ApiError } from '../services/api';

interface UseEnrollmentsReturn {
  isLoading: boolean;
  error: string | null;
  enroll: (championshipId: string, teamId: string) => Promise<ChampionshipEnrollment>;
  cancel: (championshipId: string, teamId: string) => Promise<void>;
  updateStatus: (championshipId: string, teamId: string, status: EnrollmentStatus) => Promise<ChampionshipEnrollment>;
  getByChampionship: (championshipId: string) => Promise<ChampionshipEnrollment[]>;
  clearError: () => void;
}

export const useEnrollments = (): UseEnrollmentsReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enroll = useCallback(async (championshipId: string, teamId: string): Promise<ChampionshipEnrollment> => {
    setIsLoading(true);
    setError(null);
    try {
      const enrollment = await enrollmentsService.enroll(championshipId, teamId);
      return enrollment;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao inscrever time');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancel = useCallback(async (championshipId: string, teamId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await enrollmentsService.cancel(championshipId, teamId);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao cancelar inscrição');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStatus = useCallback(async (
    championshipId: string,
    teamId: string,
    status: EnrollmentStatus
  ): Promise<ChampionshipEnrollment> => {
    setIsLoading(true);
    setError(null);
    try {
      const enrollment = await enrollmentsService.updateStatus(championshipId, teamId, status);
      return enrollment;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao atualizar status da inscrição');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getByChampionship = useCallback(async (championshipId: string): Promise<ChampionshipEnrollment[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const enrollments = await enrollmentsService.getByChampionship(championshipId);
      return enrollments;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao carregar inscrições');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    enroll,
    cancel,
    updateStatus,
    getByChampionship,
    clearError,
  };
};



