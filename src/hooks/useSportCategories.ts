import { useState, useEffect, useCallback } from 'react';
import { sportCategoriesService } from '../services/sport-categories.service';
import type { SportCategory } from '../types/api';
import type { ApiError } from '../services/api';

interface UseSportCategoriesReturn {
  categories: SportCategory[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearError: () => void;
}

export const useSportCategories = (): UseSportCategoriesReturn => {
  const [categories, setCategories] = useState<SportCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await sportCategoriesService.getAll();
      setCategories(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao carregar categorias');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    categories,
    isLoading,
    error,
    refetch: fetchCategories,
    clearError,
  };
};



