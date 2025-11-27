import { API_CONFIG } from './config'
import type { Match } from '../components/MatchCard'

/**
 * Tipo de resposta da API de partidas
 */
export type MatchesResponse = Match[]

/**
 * Service para gerenciar requisições relacionadas a partidas
 */
export const partidasService = {
  /**
   * Busca todas as partidas disponíveis
   * @returns Promise com array de partidas
   */
  async getMatches(): Promise<MatchesResponse> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/matches`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Erro ao buscar partidas: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro no partidasService.getMatches:', error)
      throw error
    }
  },
}

