import type { Tournament } from '../../types';

interface TournamentCardSmallProps {
  tournament: Tournament;
}

export const TournamentCardSmall = ({ tournament }: TournamentCardSmallProps) => {
  return (
    <div className="tournament-card-small" style={{ backgroundColor: tournament.color }}>
      <div className="tournament-logo-small">
        {tournament.logo.charAt(0).toUpperCase()}
      </div>
      <div className="tournament-name-small">{tournament.name}</div>
    </div>
  );
};

