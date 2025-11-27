import { Heart, ExternalLink } from 'lucide-react';
import type { TournamentUpdate } from '../../types';

interface UpdatesListProps {
  championshipName: string;
  category: string;
  color: string;
  updates: TournamentUpdate[];
}

export const UpdatesList = ({ championshipName, category, color, updates }: UpdatesListProps) => {
  const getTrophyIcon = (position: string) => {
    const trophyColors: Record<string, string> = {
      primeiro: '#FFD700',
      segundo: '#C0C0C0',
      terceiro: '#CD7F32',
      quarto: '#6B7280',
    };
    return trophyColors[position] || '#6B7280';
  };

  const getPositionLabel = (position: string) => {
    const labels: Record<string, string> = {
      primeiro: 'Primeiro Lugar',
      segundo: 'Segundo Lugar',
      terceiro: 'Terceiro Lugar',
      quarto: 'Quarto Lugar',
    };
    return labels[position] || position;
  };

  return (
    <div className="updates-list">
      <div className="updates-header" style={{ backgroundColor: color }}>
        <div className="updates-logo">{championshipName}</div>
        <div className="updates-category">{category}</div>
        <Heart size={20} className="updates-heart" />
      </div>
      <div className="updates-content">
        <h3 className="updates-title">Atualizações</h3>
        <div className="updates-items">
          {updates.map((update) => (
            <div key={update.id} className="update-item">
              <div className="update-image">
                <div className="update-image-placeholder"></div>
              </div>
              <div className="update-info">
                <span className="update-team">{update.teamName}</span>
                <div className="update-trophy" style={{ color: getTrophyIcon(update.position) }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <span>{getPositionLabel(update.position)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="updates-view-all">
          Ver todos
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
};

