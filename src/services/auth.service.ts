import { api } from './api';
import type { LoginDto, RegisterDto, AuthResponse, User } from '../types/api';

export const authService = {
  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);
    }
    return response;
  },

  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);
    }
    return response;
  },

  async getMe(): Promise<User> {
    return api.get<User>('/auth/me');
  },

  logout(): void {
    localStorage.removeItem('access_token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },
};



