import { api } from './api';
import type { Trophy } from '../types/api';

export const trophiesService = {
  async getAll(teamId?: string, championshipId?: string): Promise<Trophy[]> {
    const params: Record<string, string> = {};
    if (teamId) params.teamId = teamId;
    if (championshipId) params.championshipId = championshipId;
    
    return api.get<Trophy[]>('/trophies', params);
  },
};



