import "./style.css";
import type { Match } from "../../interfaces/Match";
import { MatchCard } from "../MatchCard";
import { useEffect, useRef, useState } from "react";
import { useMatches } from "../../hooks/useMatches";
import type { Match as ApiMatch } from "../../types/api";

// Função para transformar dados da API para o formato esperado pelo componente
const transformApiMatchToComponentMatch = (apiMatch: ApiMatch): Match => {
  // Prisma retorna date como string ISO (YYYY-MM-DD) ou Date object
  // startTime e endTime são retornados como string no formato HH:mm:ss ou Date object
  let dateStr = '';
  let startTimeStr = '';
  let endTimeStr: string | undefined = undefined;

  if (typeof apiMatch.date === 'string') {
    dateStr = apiMatch.date.split('T')[0]; // Remove hora se houver
  } else if (apiMatch.date instanceof Date) {
    dateStr = apiMatch.date.toISOString().split('T')[0];
  } else {
    dateStr = new Date(apiMatch.date).toISOString().split('T')[0];
  }

  if (typeof apiMatch.startTime === 'string') {
    // Formato pode ser HH:mm:ss ou ISO string
    if (apiMatch.startTime.includes('T')) {
      const timeObj = new Date(apiMatch.startTime);
      startTimeStr = `${String(timeObj.getHours()).padStart(2, '0')}:${String(timeObj.getMinutes()).padStart(2, '0')}`;
    } else {
      // Formato HH:mm:ss
      startTimeStr = apiMatch.startTime.substring(0, 5);
    }
  } else if (apiMatch.startTime instanceof Date) {
    startTimeStr = `${String(apiMatch.startTime.getHours()).padStart(2, '0')}:${String(apiMatch.startTime.getMinutes()).padStart(2, '0')}`;
  } else {
    const timeObj = new Date(apiMatch.startTime);
    startTimeStr = `${String(timeObj.getHours()).padStart(2, '0')}:${String(timeObj.getMinutes()).padStart(2, '0')}`;
  }

  if (apiMatch.endTime) {
    if (typeof apiMatch.endTime === 'string') {
      if (apiMatch.endTime.includes('T')) {
        const timeObj = new Date(apiMatch.endTime);
        endTimeStr = `${String(timeObj.getHours()).padStart(2, '0')}:${String(timeObj.getMinutes()).padStart(2, '0')}`;
      } else {
        endTimeStr = apiMatch.endTime.substring(0, 5);
      }
    } else if (apiMatch.endTime instanceof Date) {
      endTimeStr = `${String(apiMatch.endTime.getHours()).padStart(2, '0')}:${String(apiMatch.endTime.getMinutes()).padStart(2, '0')}`;
    } else {
      const timeObj = new Date(apiMatch.endTime);
      endTimeStr = `${String(timeObj.getHours()).padStart(2, '0')}:${String(timeObj.getMinutes()).padStart(2, '0')}`;
    }
  }

  return {
    id: parseInt(apiMatch.id) || 0,
    type: apiMatch.type,
    title: apiMatch.title,
    date: dateStr,
    startTime: startTimeStr,
    endTime: endTimeStr,
    homeTeam: {
      name: apiMatch.homeTeam?.name || "Time Casa",
      logo: apiMatch.homeTeam?.logo || "https://via.placeholder.com/100",
      score: apiMatch.homeScore || 0,
    },
    awayTeam: {
      name: apiMatch.awayTeam?.name || "Time Visitante",
      logo: apiMatch.awayTeam?.logo || "https://via.placeholder.com/100",
      score: apiMatch.awayScore || 0,
    },
    local: apiMatch.local || "Local não informado",
  };
};

export const MatchSlider = () => {
  const { matches: apiMatches, isLoading, fetchMatches } = useMatches();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [slidersToSee, setSlidersToSee] = useState(3);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setSlidersToSee(1);
    } else {
      setSlidersToSee(3);
    }
  }, []);

  const matches: Match[] = apiMatches.map(transformApiMatchToComponentMatch);
  const sliderContentRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (sliderContentRef.current) {
      sliderContentRef.current.scrollLeft += 362;
      setCurrentIndex(currentIndex + 1);
    }
  }
  const handlePrev = () => {
    if (sliderContentRef.current) {
      sliderContentRef.current.scrollLeft -= 362;
      setCurrentIndex(currentIndex - 1);
    }
  }

  if (isLoading) {
    return (
      <div className="match-slider">
        <div className="match-slider-content">
          <p>Carregando partidas...</p>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="match-slider">
        <div className="match-slider-content">
          <p>Nenhuma partida encontrada.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="match-slider">
      <div className="match-slider-content" ref={sliderContentRef}>
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
      <div className="match-slider-navigation">       
      <button className="match-slider-navigation-button match-slider-next" onClick={handleNext} disabled={currentIndex >= matches.length}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
      <button className="match-slider-navigation-button match-slider-prev" onClick={handlePrev} disabled={currentIndex <= 1}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
      </button>
      </div>
    </div>
  );
};
