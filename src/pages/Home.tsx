import { Sidebar } from '../components/sidebar/Sidebar';
import { MatchCard } from '../components/match-card/MatchCard';
import { CarouselHorizontal } from '../components/carousel-horizontal/CarouselHorizontal';
import { TournamentCardSmall } from '../components/tournament-card-small/TournamentCardSmall';
import { UpdatesList } from '../components/updates-list/UpdatesList';
import { PromoBanner } from '../components/promo-banner/PromoBanner';
import { TournamentList } from '../components/tournament-list/TournamentList';
import { BracketPlaceholder } from '../components/bracket-placeholder/BracketPlaceholder';
import { liveMatches, tournamentsToFollow, favoriteChampionships, newChampionships } from '../data/mockData';

export const Home = () => {
  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <div className="content-wrapper">
          <div className="content-main">
            <CarouselHorizontal>
              {liveMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </CarouselHorizontal>

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

