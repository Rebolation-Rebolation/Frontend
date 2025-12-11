import { api } from './api';
import type { Team, CreateTeamDto, UpdateTeamDto } from '../types/api';

export const teamsService = {
  async getAll(): Promise<Team[]> {
    return api.get<Team[]>('/teams');
  },

  async getById(id: string): Promise<Team> {
    return api.get<Team>(`/teams/${id}`);
  },

  async create(data: CreateTeamDto): Promise<Team> {
    return api.post<Team>('/teams', data);
  },

  async update(id: string, data: UpdateTeamDto): Promise<Team> {
    return api.patch<Team>(`/teams/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return api.delete<void>(`/teams/${id}`);
  },
};



