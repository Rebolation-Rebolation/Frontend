import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Tournament } from '../types';

interface ChampionshipsContextType {
  championships: Tournament[];
  addChampionship: (championship: Tournament) => void;
  updateChampionship: (id: string, championship: Partial<Tournament>) => void;
  deleteChampionship: (id: string) => void;
  getChampionshipById: (id: string) => Tournament | undefined;
}

const ChampionshipsContext = createContext<ChampionshipsContextType | undefined>(undefined);

interface ChampionshipsProviderProps {
  children: ReactNode;
  initialChampionships?: Tournament[];
}

export const ChampionshipsProvider = ({ children, initialChampionships = [] }: ChampionshipsProviderProps) => {
  const [championships, setChampionships] = useState<Tournament[]>(initialChampionships);

  const addChampionship = (championship: Tournament) => {
    setChampionships((prev) => [...prev, championship]);
  };

  const updateChampionship = (id: string, updates: Partial<Tournament>) => {
    setChampionships((prev) =>
      prev.map((championship) =>
        championship.id === id ? { ...championship, ...updates } : championship
      )
    );
  };

  const deleteChampionship = (id: string) => {
    setChampionships((prev) => prev.filter((championship) => championship.id !== id));
  };

  const getChampionshipById = (id: string) => {
    return championships.find((championship) => championship.id === id);
  };

  return (
    <ChampionshipsContext.Provider
      value={{
        championships,
        addChampionship,
        updateChampionship,
        deleteChampionship,
        getChampionshipById,
      }}
    >
      {children}
    </ChampionshipsContext.Provider>
  );
};

export const useChampionships = () => {
  const context = useContext(ChampionshipsContext);
  if (context === undefined) {
    throw new Error('useChampionships must be used within a ChampionshipsProvider');
  }
  return context;
};

