import type { Match, Tournament, TournamentUpdate, ChampionshipSection, MyTeam } from '../types';

export const myTeam: MyTeam = {
  name: 'Sinista',
  logo: 'premier-league',
  championshipsWon: 25,
  championshipsInProgress: 25,
};

export const liveMatches: Match[] = [
  {
    id: '1',
    sport: 'Futebol',
    round: 'Partida 8',
    status: 'live',
    team1: { name: 'Corrosiva', logo: 'corrosiva', score: 0 },
    team2: { name: 'Sinistra', logo: 'sinistra', score: 20 },
    location: 'Arena Fonte Nova',
  },
  {
    id: '2',
    sport: 'Vôlei',
    round: 'Semifinal',
    status: 'live',
    team1: { name: 'Sinistra', logo: 'sinistra', score: 3 },
    team2: { name: 'Corrosiva', logo: 'corrosiva', score: 0 },
    location: 'Arena VCA Beach',
  },
  {
    id: '3',
    sport: 'CS:GO 2',
    round: 'Final',
    status: 'upcoming',
    team1: { name: 'Corrosiva', logo: 'corrosiva', score: 0 },
    team2: { name: 'Sinistra', logo: 'sinistra', score: 0 },
    location: 'Arena Fonte Nova',
    date: 'Hoje',
    time: '07:30 PM',
  },
  {
    id: '4',
    sport: 'CS:GO 2',
    round: 'Disputa Pelo Segundo Lugar',
    status: 'finished',
    team1: { name: 'Corrosiva 1', logo: 'corrosiva', score: 1 },
    team2: { name: 'Corrosiva 0', logo: 'corrosiva', score: 0 },
    location: 'Arena Fonte Nova',
    winner: 'Corrosiva',
  },
];

export const tournamentsToFollow: Tournament[] = [
  { id: '1', name: 'TAG', logo: 'tag', category: 'Futebol', color: '#4A90E2', startDate: '2023-01-01', endDate: '2023-12-31' },
  { id: '2', name: 'Australia Tour', logo: 'atp-tour', category: 'Tênis', color: '#FFFFFF', startDate: '2023-01-01', endDate: '2023-12-31' },
  { id: '3', name: 'LaLiga 2023', logo: 'laliga', category: 'Futebol', color: '#8B5CF6', startDate: '2023-01-01', endDate: '2023-12-31' },
  { id: '4', name: 'ISL 2023', logo: 'isl', category: 'Futebol', color: '#1E3A8A', startDate: '2023-01-01', endDate: '2023-12-31' },
  { id: '5', name: 'Bundesliga 2023', logo: 'bundesliga', category: 'Futebol', color: '#DC2626', startDate: '2023-01-01', endDate: '2023-12-31' },
  { id: '6', name: 'US Open', logo: 'us-open', category: 'Tênis', color: '#1E40AF', startDate: '2023-01-01', endDate: '2023-12-31' },
];

export const favoriteChampionships: Array<{
  id: string;
  name: string;
  logo: string;
  category: string;
  color: string;
  updates: TournamentUpdate[];
}> = [
  {
    id: '1',
    name: 'Tag',
    logo: 'tag',
    category: 'Futebol',
    color: '#8B5CF6',
    updates: [
      { id: '1', teamName: 'Sinistra', position: 'primeiro', image: 'team1' },
      { id: '2', teamName: 'Sinistra', position: 'segundo', image: 'team2' },
      { id: '3', teamName: 'Sinistra', position: 'terceiro', image: 'team3' },
      { id: '4', teamName: 'Sinistra', position: 'quarto', image: 'team4' },
    ],
  },
  {
    id: '2',
    name: 'Bundesliga',
    logo: 'bundesliga',
    category: 'Football',
    color: '#DC2626',
    updates: [
      { id: '1', teamName: 'Sinistra', position: 'primeiro', image: 'team1' },
      { id: '2', teamName: 'Sinistra', position: 'segundo', image: 'team2' },
      { id: '3', teamName: 'Sinistra', position: 'terceiro', image: 'team3' },
      { id: '4', teamName: 'Sinistra', position: 'quarto', image: 'team4' },
    ],
  },
  {
    id: '3',
    name: 'India vs Australia',
    logo: 'australia',
    category: 'Cricket',
    color: '#1E40AF',
    updates: [
      { id: '1', teamName: 'Sinistra', position: 'primeiro', image: 'team1' },
      { id: '2', teamName: 'Sinistra', position: 'segundo', image: 'team2' },
      { id: '3', teamName: 'Sinistra', position: 'terceiro', image: 'team3' },
      { id: '4', teamName: 'Sinistra', position: 'quarto', image: 'team4' },
    ],
  },
];

export const openChampionships: Tournament[] = [
  {
    id: '1',
    name: 'The Ashes 2023',
    logo: 'ashes',
    category: 'Cricket',
    color: '#1E40AF',
    startDate: '16 Jun',
    endDate: '31 Jul',
  },
  {
    id: '2',
    name: 'The Ashes 2023',
    logo: 'ashes',
    category: 'Cricket',
    color: '#1E40AF',
    startDate: '16 Jun',
    endDate: '31 Jul',
  },
  {
    id: '3',
    name: 'The Ashes 2023',
    logo: 'ashes',
    category: 'Cricket',
    color: '#1E40AF',
    startDate: '16 Jun',
    endDate: '31 Jul',
  },
];

export const registeredChampionships: Tournament[] = [
  {
    id: '1',
    name: 'The Ashes 2023',
    logo: 'ashes',
    category: 'Cricket',
    color: '#1E40AF',
    startDate: '16 Jun',
    endDate: '31 Jul',
    isRegistered: true,
  },
  {
    id: '2',
    name: 'The Ashes 2023',
    logo: 'ashes',
    category: 'Cricket',
    color: '#1E40AF',
    startDate: '16 Jun',
    endDate: '31 Jul',
    isRegistered: true,
  },
  {
    id: '3',
    name: 'The Ashes 2023',
    logo: 'ashes',
    category: 'Cricket',
    color: '#1E40AF',
    startDate: '16 Jun',
    endDate: '31 Jul',
    isRegistered: true,
  },
];

export const championshipSections: ChampionshipSection[] = [
  {
    id: '1',
    title: 'Campeonatos Baianos',
    tournaments: [
      { id: '1', name: 'India vs West Indies', logo: 'india-west-indies', category: 'Cricket', color: '#1E3A8A', startDate: '2023-01-01', endDate: '2023-12-31' },
      { id: '2', name: 'Australia Tour', logo: 'atp-tour', category: 'Tênis', color: '#4A90E2', startDate: '2023-01-01', endDate: '2023-12-31' },
      { id: '3', name: 'LaLiga 2023', logo: 'laliga', category: 'Futebol', color: '#8B5CF6', startDate: '2023-01-01', endDate: '2023-12-31' },
      { id: '4', name: 'ISL 2023', logo: 'isl', category: 'Futebol', color: '#1E3A8A', startDate: '2023-01-01', endDate: '2023-12-31' },
      { id: '5', name: 'Bundesliga 2023', logo: 'bundesliga', category: 'Futebol', color: '#DC2626', startDate: '2023-01-01', endDate: '2023-12-31' },
      { id: '6', name: 'US Open', logo: 'us-open', category: 'Tênis', color: '#1E40AF', startDate: '2023-01-01', endDate: '2023-12-31' },
    ],
  },
];

export const newChampionships: Tournament[] = [
  { id: '1', name: 'Bundesliga Football', logo: 'bundesliga', category: 'Football', color: '#DC2626', startDate: '2023-01-01', endDate: '2023-12-31' },
  { id: '2', name: 'Bundesliga Football', logo: 'bundesliga', category: 'Football', color: '#10B981', startDate: '2023-01-01', endDate: '2023-12-31' },
  { id: '3', name: 'Bundesliga Football', logo: 'bundesliga', category: 'Football', color: '#1E40AF', startDate: '2023-01-01', endDate: '2023-12-31' },
  { id: '4', name: 'Bundesliga Football', logo: 'bundesliga', category: 'Football', color: '#EC4899', startDate: '2023-01-01', endDate: '2023-12-31' },
  { id: '5', name: 'Bundesliga Football', logo: 'bundesliga', category: 'Football', color: '#DC2626', startDate: '2023-01-01', endDate: '2023-12-31' },
];

export const categories = ['All', 'E-sports', 'Futebol', 'Basquete', 'Vôlei', 'Handebol', 'Xadrez', 'Dama', 'Outros'];

