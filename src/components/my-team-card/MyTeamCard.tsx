import type { MyTeam } from '../../types';

interface MyTeamCardProps {
  team: MyTeam;
}

export const MyTeamCard = ({ team }: MyTeamCardProps) => {
  return (
    <div className="my-team-card">
      <div className="my-team-logo">
        <div className="premier-league-logo">PL</div>
      </div>
      <div className="my-team-info">
        <h2 className="my-team-name">{team.name}</h2>
        <div className="my-team-stats">
          <div className="stat-item">
            <span className="stat-label">Campeonatos ganhos:</span>
            <span className="stat-value">{team.championshipsWon}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Campeonatos Em andamento:</span>
            <span className="stat-value">{team.championshipsInProgress}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

