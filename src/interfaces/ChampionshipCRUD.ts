import type { SportCategory } from "./Team";

export interface ChampionshipFormData {
  id?: string;
  name: string;
  description: string;
  category: SportCategory;
  image: string | null;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  registrationEndDate: string;
  teamLimit: number;
  rules: string;
  location?: string;
  disputeType: DisputeType;
}

export type DisputeType = "pontos-corridos" | "mata-mata" | "grupos" | "mista";

export type ChampionshipStatus = 
  | "ativo" 
  | "finalizado" 
  | "inscricoes-abertas" 
  | "inscricoes-encerradas" 
  | "aguardando-inicio";

export interface ChampionshipListItem {
  id: string;
  name: string;
  category: SportCategory;
  status: ChampionshipStatus;
  startDate: string;
  endDate: string;
  registrationEndDate: string;
  enrolledTeams: number;
  teamLimit: number;
  image: string;
}

export interface EnrolledTeam {
  id: string;
  name: string;
  logo: string | null;
  status: "confirmado" | "pendente" | "cancelado";
}

export interface ChampionshipDetails extends ChampionshipFormData {
  status: ChampionshipStatus;
  enrolledTeams: EnrolledTeam[];
  createdAt: string;
  updatedAt: string;
}

