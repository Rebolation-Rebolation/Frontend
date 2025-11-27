import { useState, useEffect } from 'react';
import { Sidebar } from '../components/sidebar/Sidebar';
import { CarouselHorizontal } from '../components/carousel-horizontal/CarouselHorizontal';
import { TournamentCardSmall } from '../components/tournament-card-small/TournamentCardSmall';
import { UpdatesList } from '../components/updates-list/UpdatesList';
import { PromoBanner } from '../components/promo-banner/PromoBanner';
import { TournamentList } from '../components/tournament-list/TournamentList';
import { BracketPlaceholder } from '../components/bracket-placeholder/BracketPlaceholder';
import { tournamentsToFollow, favoriteChampionships, newChampionships } from '../data/mockData';
import { MatchCardSlider } from '../components/matchs-slider/MatchCardSlider';
import { partidasService } from '../services/partidasService';
import type { Match } from '../components/matchs-slider/MatchCard';

export const Home = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await partidasService.getMatches();
        setMatches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar partidas');
        console.error('Erro ao buscar partidas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <div className="content-wrapper">
          <div className="content-main">
          {/* Slider horizontal de partidas */}
          {loading && <div>Carregando partidas...</div>}
          {error && <div>Erro: {error}</div>}
          {!loading && !error && <MatchCardSlider matches={matches} />}

            <CarouselHorizontal
              title="Campeonatos Para Acompanhar"
              subtitle="Some Content Goes Here..."
              showViewAll
            >
              {tournamentsToFollow.map((tournament) => (
                <TournamentCardSmall key={tournament.id} tournament={tournament} />
              ))}
            </CarouselHorizontal>

            <div className="favorite-championships-section">
              <div className="section-header">
                <div>
                  <h2 className="section-title">Fique Por Dentro Do Seu Campeonato Favorito</h2>
                  <p className="section-subtitle">Some Content Goes Here...</p>
                </div>
                <button className="view-all-button">
                  Ver todos
                </button>
              </div>
              <div className="updates-grid">
                {favoriteChampionships.map((championship) => (
                  <UpdatesList
                    key={championship.id}
                    championshipName={championship.name}
                    category={championship.category}
                    color={championship.color}
                    updates={championship.updates}
                  />
                ))}
              </div>
            </div>

            <BracketPlaceholder />
          </div>

          <div className="content-sidebar">
            <PromoBanner />
            <TournamentList tournaments={newChampionships} />
          </div>
        </div>
      </div>
    </div>
  );
};

