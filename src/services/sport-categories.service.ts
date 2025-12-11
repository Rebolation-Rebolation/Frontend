import { api } from './api';
import type { SportCategory } from '../types/api';

export const sportCategoriesService = {
  async getAll(): Promise<SportCategory[]> {
    return api.get<SportCategory[]>('/sport-categories');
  },
};



