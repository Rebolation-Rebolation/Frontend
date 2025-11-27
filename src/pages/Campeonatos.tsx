import { useState } from 'react';
import { Sidebar } from '../components/sidebar/Sidebar';
import { TopNav } from '../components/top-nav/TopNav';
import { CarouselHorizontal } from '../components/carousel-horizontal/CarouselHorizontal';
import { TournamentCardSmall } from '../components/tournament-card-small/TournamentCardSmall';
import { PromoBanner } from '../components/promo-banner/PromoBanner';
import { championshipSections } from '../data/mockData';

export const Campeonatos = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <TopNav activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <div className="content-wrapper">
          <div className="content-main">
            {championshipSections.map((section) => (
              <CarouselHorizontal key={section.id} title={section.title}>
                {section.tournaments.map((tournament) => (
                  <TournamentCardSmall key={tournament.id} tournament={tournament} />
                ))}
              </CarouselHorizontal>
            ))}
            {championshipSections.map((section) => (
              <CarouselHorizontal key={`${section.id}-2`} title={section.title}>
                {section.tournaments.map((tournament) => (
                  <TournamentCardSmall key={tournament.id} tournament={tournament} />
                ))}
              </CarouselHorizontal>
            ))}
            {championshipSections.map((section) => (
              <CarouselHorizontal key={`${section.id}-3`} title={section.title}>
                {section.tournaments.map((tournament) => (
                  <TournamentCardSmall key={tournament.id} tournament={tournament} />
                ))}
              </CarouselHorizontal>
            ))}
          </div>

          <div className="content-sidebar">
            <PromoBanner />
          </div>
        </div>
      </div>
    </div>
  );
};

