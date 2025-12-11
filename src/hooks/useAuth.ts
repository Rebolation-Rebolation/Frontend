import { useState, useCallback } from 'react';
import { authService } from '../services/auth.service';
import type { LoginDto, RegisterDto, User } from '../types/api';
import type { ApiError } from '../services/api';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (data: LoginDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);
      setUser(response.user);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao fazer login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(data);
      setUser(response.user);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erro ao criar conta');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const checkAuth = useCallback(async () => {
    if (!authService.isAuthenticated()) {
      return;
    }
    
    setIsLoading(true);
    try {
      const userData = await authService.getMe();
      setUser(userData);
    } catch (err) {
      authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    checkAuth,
    clearError,
  };
};



