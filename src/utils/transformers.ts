import type { Championship } from '../types/api';
import type { Tourney, Challenger } from '../interfaces/Tourney';
import type { Trophy } from '../types/api';

/**
 * Transforma um Championship da API para o formato Tourney esperado pelos componentes
 */
export const transformChampionshipToTourney = (championship: Championship, trophies?: Trophy[]): Tourney => {
  // Ordenar troféus por posição para criar a lista de challengers
  const sortedTrophies = trophies?.sort((a, b) => a.position - b.position) || [];
  
  const challengers: Challenger[] = sortedTrophies.map((trophy) => ({
    name: trophy.team?.name || 'Time',
    image: trophy.team?.logo || 'https://via.placeholder.com/100',
  }));

  return {
    id: parseInt(championship.id) || 0,
    name: championship.name,
    image: championship.image || 'https://via.placeholder.com/300',
    color: getColorForChampionship(championship.id), // Gera cor baseada no ID
    type: championship.category?.name || championship.disputeType || 'Campeonato',
    challengers: challengers.length > 0 ? challengers : [],
  };
};

/**
 * Gera uma cor hexadecimal baseada no ID do campeonato
 */
const getColorForChampionship = (id: string): string => {
  // Cores predefinidas para garantir consistência
  const colors = [
    '#021679',
    '#1AABE4',
    '#351151',
    '#000000',
    '#05344A',
    '#20C4BA',
    '#D84348',
    '#FF6B35',
  ];
  
  // Usa o hash do ID para escolher uma cor
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Transforma múltiplos Championships em Tourneys
 */
export const transformChampionshipsToTourneys = (championships: Championship[], trophiesMap?: Map<string, Trophy[]>): Tourney[] => {
  return championships.map((championship) => {
    const trophies = trophiesMap?.get(championship.id);
    return transformChampionshipToTourney(championship, trophies);
  });
};

