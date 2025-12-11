// Tipos baseados no backend Prisma

export type ChampionshipStatus = 
  | 'ativo' 
  | 'finalizado' 
  | 'inscricoes_abertas' 
  | 'inscricoes_encerradas' 
  | 'aguardando_inicio';

export type DisputeType = 'pontos_corridos' | 'mata_mata' | 'grupos' | 'mista';

export type EnrollmentStatus = 'confirmado' | 'pendente' | 'cancelado';

export type MatchStatus = 'agendada' | 'em_andamento' | 'finalizada' | 'cancelada';

export interface SportCategory {
  id: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  name: string;
  logo: string | null;
  description: string | null;
  categoryId: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  category?: SportCategory;
}

export interface Championship {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  categoryId: string;
  status: ChampionshipStatus;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  registrationEndDate: string;
  teamLimit: number;
  rules: string | null;
  location: string | null;
  disputeType: DisputeType;
  createdAt: string;
  updatedAt: string;
  category?: SportCategory;
  enrollments?: ChampionshipEnrollment[];
  enrolledTeams?: number; // Contagem de times inscritos
}

export interface ChampionshipEnrollment {
  id: string;
  championshipId: string;
  teamId: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  createdAt: string;
  updatedAt: string;
  team?: Team;
  championship?: Championship;
}

export interface Match {
  id: string;
  championshipId: string;
  homeTeamId: string;
  awayTeamId: string;
  type: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string | null;
  local: string;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  createdAt: string;
  updatedAt: string;
  championship?: Championship;
  homeTeam?: Team;
  awayTeam?: Team;
}

export interface Trophy {
  id: string;
  championshipId: string;
  teamId: string;
  position: number;
  year: number;
  wins: number;
  losses: number;
  draws: number | null;
  createdAt: string;
  championship?: Championship;
  team?: Team;
}

// DTOs para criação/atualização
export interface CreateTeamDto {
  name: string;
  logo?: string | null;
  description?: string | null;
  categoryId: string;
}

export interface UpdateTeamDto extends Partial<CreateTeamDto> {}

export interface CreateChampionshipDto {
  name: string;
  description?: string | null;
  image?: string | null;
  categoryId: string;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  registrationEndDate: string;
  teamLimit: number;
  rules?: string | null;
  location?: string | null;
  disputeType: DisputeType;
}

export interface UpdateChampionshipDto extends Partial<CreateChampionshipDto> {}

export interface FilterChampionshipDto {
  search?: string;
  categoryId?: string;
  status?: ChampionshipStatus;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}



