import { useState } from 'react';
import { Heart } from 'lucide-react';
import type { Tournament } from '../../types';

interface TournamentListProps {
  tournaments: Tournament[];
  title?: string;
}

export const TournamentList = ({ tournaments, title }: TournamentListProps) => {
  const [activeTab, setActiveTab] = useState<'new' | 'popular'>('new');

  return (
    <div className="tournament-list">
      {title && <h3 className="tournament-list-title">{title}</h3>}
      <div className="tournament-list-tabs">
        <button
          className={`tab-button ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => setActiveTab('new')}
        >
          Novos Campeonatos
        </button>
        <button
          className={`tab-button ${activeTab === 'popular' ? 'active' : ''}`}
          onClick={() => setActiveTab('popular')}
        >
          Campeonatos Populares
        </button>
      </div>
      <div className="tournament-list-items">
        {tournaments.map((tournament) => (
          <div key={tournament.id} className="tournament-list-item" style={{ backgroundColor: tournament.color }}>
            <div className="tournament-list-logo">{tournament.logo.charAt(0).toUpperCase()}</div>
            <div className="tournament-list-name">{tournament.name}</div>
            <Heart size={18} className="tournament-list-heart" />
          </div>
        ))}
      </div>
    </div>
  );
};

