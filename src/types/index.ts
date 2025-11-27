export interface Match {
  id: string;
  sport: string;
  round: string;
  status: 'live' | 'upcoming' | 'finished';
  team1: {
    name: string;
    logo: string;
    score: number;
  };
  team2: {
    name: string;
    logo: string;
    score: number;
  };
  location: string;
  date?: string;
  time?: string;
  winner?: string;
}

export interface Tournament {
  id: string;
  name: string;
  logo: string;
  category: string;
  color: string;
  startDate: string;
  endDate: string;
  isRegistered?: boolean;
}

export interface TournamentUpdate {
  id: string;
  teamName: string;
  position: 'primeiro' | 'segundo' | 'terceiro' | 'quarto';
  image: string;
}

export interface ChampionshipSection {
  id: string;
  title: string;
  tournaments: Tournament[];
}

export interface MyTeam {
  name: string;
  logo: string;
  championshipsWon: number;
  championshipsInProgress: number;
}

