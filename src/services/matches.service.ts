import { api } from './api';
import type { Match, MatchStatus } from '../types/api';

export type CreateMatchDto = {
  championshipId: string;
  homeTeamId: string;
  awayTeamId: string;
  type: string;
  title: string;
  date: string;
  startTime: string;
  endTime?: string;
  local: string;
  homeScore?: number;
  awayScore?: number;
  status?: MatchStatus;
};

export type UpdateMatchDto = Partial<CreateMatchDto>;

export const matchesService = {
  async create(data: CreateMatchDto): Promise<Match> {
    return api.post<Match>('/matches', data);
  },

  async getAll(championshipId?: string): Promise<Match[]> {
    const params = championshipId ? { championshipId } : {};
    return api.get<Match[]>('/matches', params as Record<string, string>);
  },

  async getById(id: string): Promise<Match> {
    return api.get<Match>(`/matches/${id}`);
  },

  async update(id: string, data: UpdateMatchDto): Promise<Match> {
    return api.patch<Match>(`/matches/${id}`, data);
  },

  async updateScore(id: string, homeScore: number, awayScore: number): Promise<Match> {
    return api.post<Match>(`/matches/${id}/score`, { homeScore, awayScore });
  },

  async delete(id: string): Promise<void> {
    return api.delete<void>(`/matches/${id}`);
  },
};

