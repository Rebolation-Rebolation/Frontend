export interface Match {
    id: number;
    type: string;
    title: string;
    date: string;
    startTime: string;
    endTime?: string;
    homeTeam: Team;
    awayTeam: Team;
    local: string;
}

export interface Team {
    name: string;
    logo: string;
    score: number;
}