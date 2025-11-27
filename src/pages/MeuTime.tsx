import { useState } from 'react';
import { Sidebar } from '../components/sidebar/Sidebar';
import { TopNav } from '../components/top-nav/TopNav';
import { MyTeamCard } from '../components/my-team-card/MyTeamCard';
import { CarouselHorizontal } from '../components/carousel-horizontal/CarouselHorizontal';
import { TournamentCardLarge } from '../components/tournament-card-large/TournamentCardLarge';
import { PromoBanner } from '../components/promo-banner/PromoBanner';
import { myTeam, openChampionships, registeredChampionships } from '../data/mockData';

export const MeuTime = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <TopNav activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <div className="content-wrapper">
          <div className="content-main">
            <MyTeamCard team={myTeam} />

            <CarouselHorizontal title="Campeonatos Abertos">
              {openChampionships.map((tournament) => (
                <TournamentCardLarge key={tournament.id} tournament={tournament} showRegisterButton />
              ))}
            </CarouselHorizontal>

            <CarouselHorizontal title="Campeonatos Inscritos">
              {registeredChampionships.map((tournament) => (
                <TournamentCardLarge key={tournament.id} tournament={tournament} showRegisterButton />
              ))}
            </CarouselHorizontal>
          </div>

          <div className="content-sidebar">
            <PromoBanner />
          </div>
        </div>
      </div>
    </div>
  );
};

