import type { Tournament } from '../../types';
import { BarChart3 } from 'lucide-react';

interface TournamentCardLargeProps {
  tournament: Tournament;
  showRegisterButton?: boolean;
}

export const TournamentCardLarge = ({ tournament, showRegisterButton = true }: TournamentCardLargeProps) => {
  return (
    <div className="tournament-card-large">
      <div className="tournament-logo-large">
        {tournament.logo.charAt(0).toUpperCase()}
      </div>
      <div className="tournament-info-large">
        <h3 className="tournament-title-large">{tournament.name}</h3>
        <div className="tournament-dates">
          {tournament.startDate} - {tournament.endDate}
        </div>
        <div className="tournament-stats">
          <BarChart3 size={16} />
          <span>Series Stats</span>
        </div>
        {showRegisterButton && (
          <button className={`tournament-button ${tournament.isRegistered ? 'registered' : 'register'}`}>
            {tournament.isRegistered ? 'Inscrito' : 'Inscrever-se'}
          </button>
        )}
      </div>
    </div>
  );
};

