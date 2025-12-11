import { api } from './api';
import type {
  Championship,
  CreateChampionshipDto,
  UpdateChampionshipDto,
  FilterChampionshipDto,
  PaginatedResponse,
} from '../types/api';

export const championshipsService = {
  async getAll(filters?: FilterChampionshipDto): Promise<PaginatedResponse<Championship>> {
    return api.get<PaginatedResponse<Championship>>('/championships', filters as Record<string, string | number>);
  },

  async getAvailable(): Promise<Championship[]> {
    return api.get<Championship[]>('/championships/available');
  },

  async getById(id: string): Promise<Championship> {
    return api.get<Championship>(`/championships/${id}`);
  },

  async create(data: CreateChampionshipDto): Promise<Championship> {
    return api.post<Championship>('/championships', data);
  },

  async update(id: string, data: UpdateChampionshipDto): Promise<Championship> {
    return api.patch<Championship>(`/championships/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return api.delete<void>(`/championships/${id}`);
  },

  async getEnrolledTeams(championshipId: string): Promise<any[]> {
    return api.get<any[]>(`/championships/${championshipId}/teams`);
  },
};



