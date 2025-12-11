import { api } from './api';
import type { ChampionshipEnrollment, EnrollmentStatus } from '../types/api';

export const enrollmentsService = {
  async enroll(championshipId: string, teamId: string): Promise<ChampionshipEnrollment> {
    return api.post<ChampionshipEnrollment>(
      `/championships/${championshipId}/enroll/${teamId}`
    );
  },

  async cancel(championshipId: string, teamId: string): Promise<void> {
    return api.delete<void>(`/championships/${championshipId}/enroll/${teamId}`);
  },

  async updateStatus(
    championshipId: string,
    teamId: string,
    status: EnrollmentStatus
  ): Promise<ChampionshipEnrollment> {
    return api.patch<ChampionshipEnrollment>(
      `/championships/${championshipId}/enroll/${teamId}/status`,
      { status }
    );
  },

  async getByChampionship(championshipId: string): Promise<ChampionshipEnrollment[]> {
    return api.get<ChampionshipEnrollment[]>(`/championships/${championshipId}/teams`);
  },
};



