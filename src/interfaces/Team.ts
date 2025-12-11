export interface Team {
  id: string;
  name: string;
  logo: string | null;
  description: string;
  category: SportCategory;
}

export interface SportCategory {
  id: string;
  name: string;
  icon: string;
}

export interface Championship {
  id: string;
  name: string;
  image: string;
  status: "em-andamento" | "inscrito" | "aguardando-inicio" | "disponivel";
  startDate: string;
  endDate: string;
  registrationDeadline?: string;
  rules?: string[];
  category: SportCategory;
}

export interface Trophy {
  id: string;
  championshipName: string;
  year: number;
  position: number;
  image?: string;
  statistics?: {
    wins: number;
    losses: number;
    draws?: number;
  };
}

