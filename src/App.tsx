import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChampionshipsProvider } from './context/ChampionshipsContext';
import { Home } from './pages/Home';
import { Campeonatos } from './pages/Campeonatos';
import { MeuTime } from './pages/MeuTime';
import { Configuracoes } from './pages/Configuracoes';
import { tournamentsToFollow, openChampionships, registeredChampionships, championshipSections } from './data/mockData';
import type { Tournament } from './types';

const getAllChampionships = (): Tournament[] => {
  const allChampionships: Tournament[] = [];
  const seenIds = new Set<string>();

  const addIfNotExists = (championship: Tournament) => {
    if (!seenIds.has(championship.id)) {
      seenIds.add(championship.id);
      allChampionships.push(championship);
    }
  };

  tournamentsToFollow.forEach(addIfNotExists);
  openChampionships.forEach(addIfNotExists);
  registeredChampionships.forEach(addIfNotExists);
  championshipSections.forEach((section) => {
    section.tournaments.forEach(addIfNotExists);
  });

  return allChampionships;
};

const initialChampionships = getAllChampionships();

function App() {
  return (
    <ChampionshipsProvider initialChampionships={initialChampionships}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campeonatos" element={<Campeonatos />} />
          <Route path="/meu-time" element={<MeuTime />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Routes>
      </BrowserRouter>
    </ChampionshipsProvider>
  );
}

export default App;
