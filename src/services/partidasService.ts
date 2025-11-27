import { API_CONFIG } from './config'
import type { Match } from '../components/matchs-slider/MatchCard'

/**
 * Tipo de resposta da API
 */
type ApiMatchResponse = {
  id_partida: number
  id_primeira_atletica: number
  id_segunda_atletica: number
  dt_ocorrencia: string
  mvp: string | null
  id_campeonato: number
  id_placar: number
  campeonato: {
    id_campeonato: number
    logo: { [key: string]: number }
    nome: string
    dt_criacao: string
    dt_fim: string
    id_modalidade: number
  }
  placar: {
    id_placar: number
    placar_primeiro_time: number
    placar_segundo_time: number
    tp_placar: number
  }
  atletica_partida_id_primeira_atleticaToatletica: {
    id_atletica: number
    nome: string
    logo: { [key: string]: number }
    id_instituicao: number
  }
  atletica_partida_id_segunda_atleticaToatletica: {
    id_atletica: number
    nome: string
    logo: { [key: string]: number }
    id_instituicao: number
  }
}

/**
 * Tipo de resposta da API de partidas
 */
type ApiMatchesResponse = ApiMatchResponse[]

/**
 * Mapeia o tipo de placar para determinar se a partida está ao vivo
 * tp_placar: 1 = ao vivo, outros valores = finalizada/agendada
 */
const isLive = (tpPlacar: number, dtOcorrencia: string): boolean => {
  if (tpPlacar === 1) {
    const ocorrencia = new Date(dtOcorrencia)
    const agora = new Date()
    // Considera ao vivo se a data de ocorrência é hoje ou no futuro
    return ocorrencia <= agora && ocorrencia >= new Date(agora.getTime() - 24 * 60 * 60 * 1000)
  }
  return false
}

/**
 * Converte o logo do formato Buffer para URL de imagem
 * Por enquanto, usa um placeholder baseado no ID da atlética
 */
const getLogoUrl = (_logo: { [key: string]: number } | undefined, id: number, name: string): string => {
  // Se houver logo, você pode implementar a conversão do buffer para URL
  // Por enquanto, usa um placeholder baseado no nome
  const colors = [
    '#22c55e', '#dc2626', '#3b82f6', '#f59e0b', '#8b5cf6',
    '#6366f1', '#ec4899', '#14b8a6', '#6b7280', '#92400e'
  ]
  const colorIndex = id % colors.length
  const initial = name.charAt(0).toUpperCase()
  return `https://via.placeholder.com/48/${colors[colorIndex].replace('#', '')}/ffffff?text=${initial}`
}

/**
 * Mapeia o ID da modalidade para o nome do esporte
 */
const getSportName = (idModalidade: number): string => {
  const sports: { [key: number]: string } = {
    1: 'Futebol',
    2: 'Basquete',
    3: 'Vôlei',
    4: 'Handebol',
    5: 'Futsal',
  }
  return sports[idModalidade] || 'Esporte'
}

/**
 * Transforma a resposta da API para o formato esperado pelo componente
 */
const transformApiMatchToMatch = (apiMatch: ApiMatchResponse): Match => {
  const { placar, campeonato, atletica_partida_id_primeira_atleticaToatletica, atletica_partida_id_segunda_atleticaToatletica, dt_ocorrencia, id_partida } = apiMatch

  return {
    sport: getSportName(campeonato.id_modalidade),
    matchNumber: id_partida,
    isLive: isLive(placar.tp_placar, dt_ocorrencia),
    team1: {
      id: String(atletica_partida_id_primeira_atleticaToatletica.id_atletica),
      name: atletica_partida_id_primeira_atleticaToatletica.nome,
      logo: getLogoUrl(atletica_partida_id_primeira_atleticaToatletica.logo, atletica_partida_id_primeira_atleticaToatletica.id_atletica, atletica_partida_id_primeira_atleticaToatletica.nome),
      score: placar.placar_primeiro_time,
    },
    team2: {
      id: String(atletica_partida_id_segunda_atleticaToatletica.id_atletica),
      name: atletica_partida_id_segunda_atleticaToatletica.nome,
      logo: getLogoUrl(atletica_partida_id_segunda_atleticaToatletica.logo, atletica_partida_id_segunda_atleticaToatletica.id_atletica, atletica_partida_id_segunda_atleticaToatletica.nome),
      score: placar.placar_segundo_time,
    },
    location: campeonato.nome || 'Local não informado',
  }
}

/**
 * Service para gerenciar requisições relacionadas a partidas
 */
export const partidasService = {
  /**
   * Busca todas as partidas disponíveis
   * @returns Promise com array de partidas transformadas
   */
  async getMatches(): Promise<Match[]> {
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

      const apiData: ApiMatchesResponse = await response.json()
      
      // Transforma os dados da API para o formato esperado pelo componente
      const transformedData = apiData.map(transformApiMatchToMatch)
      
      return transformedData
    } catch (error) {
      console.error('Erro no partidasService.getMatches:', error)
      throw error
    }
  },
}
