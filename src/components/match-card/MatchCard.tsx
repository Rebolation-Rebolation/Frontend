import { Bell } from 'lucide-react';
import type { Match } from '../../types';

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const getStatusLabel = () => {
    if (match.status === 'live') return 'Live';
    if (match.status === 'upcoming') return 'Vai Começar Logo';
    if (match.status === 'finished') return `Partida Finalizada - ${match.winner} Venceu`;
    return '';
  };

  const getStatusColor = () => {
    if (match.status === 'live') return '#EF4444';
    if (match.status === 'upcoming') return '#F59E0B';
    return '#6B7280';
  };

  return (
    <div className="match-card">
      <div className="match-header">
        <span className="match-sport">{match.sport} | {match.round}</span>
        <div className="match-status" style={{ color: getStatusColor() }}>
          {match.status === 'live' && <span className="status-dot"></span>}
          {getStatusLabel()}
        </div>
      </div>
      <div className="match-teams">
        <div className="team">
          <div className="team-logo" style={{ backgroundColor: match.team1.logo === 'corrosiva' ? '#10B981' : '#EF4444' }}>
            {match.team1.logo.charAt(0).toUpperCase()}
          </div>
          <span className="team-name">{match.team1.name}</span>
          {match.status === 'live' || match.status === 'finished' ? (
            <span className="team-score">{match.team1.score}</span>
          ) : null}
        </div>
        <div className="match-score">
          {match.status === 'live' || match.status === 'finished' ? (
            <span>{match.team1.score}:{match.team2.score}</span>
          ) : (
            <span>VS</span>
          )}
        </div>
        <div className="team">
          <div className="team-logo" style={{ backgroundColor: match.team2.logo === 'corrosiva' ? '#10B981' : '#EF4444' }}>
            {match.team2.logo.charAt(0).toUpperCase()}
          </div>
          <span className="team-name">{match.team2.name}</span>
          {match.status === 'live' || match.status === 'finished' ? (
            <span className="team-score">{match.team2.score}</span>
          ) : null}
        </div>
      </div>
      <div className="match-footer">
        <span className="match-location">{match.location}</span>
        {match.time && (
          <div className="match-time">
            <Bell size={16} />
            <span>{match.date} {match.time}</span>
          </div>
        )}
      </div>
    </div>
  );
};

