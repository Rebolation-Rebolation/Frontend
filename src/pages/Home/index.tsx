import "./style.css";
import { MatchSlider } from "../../components/MatchSlider";
import { TourneysSlider } from "../../components/TourneysSlider";
import { TourneysInfoSlider } from "../../components/TourneysInfoSlider";
import { TourneyTabs } from "../../components/TourneyTabs";
import { useChampionships } from "../../hooks/useChampionships";
import { useEffect, useState } from "react";
import { transformChampionshipsToTourneys } from "../../utils/transformers";
import type { Tourney } from "../../interfaces/Tourney";
import { trophiesService } from "../../services/trophies.service";
import type { Trophy } from "../../types/api";

export const Home = () => {
  const { championships, fetchChampionships } = useChampionships();
  const [tourneys, setTourneys] = useState<Tourney[]>([]);
  const [tourneysWithTrophies, setTourneysWithTrophies] = useState<Tourney[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Buscar campeonatos disponíveis
        await fetchChampionships({ limit: 10, page: 1 });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [fetchChampionships]);

  useEffect(() => {
    // Transformar campeonatos em tourneys
    const transformedTourneys = transformChampionshipsToTourneys(championships);
    setTourneys(transformedTourneys);

    // Buscar troféus para campeonatos ativos/finalizados
    const loadTrophies = async () => {
      const trophiesMap = new Map<string, Trophy[]>();
      
      for (const championship of championships) {
        if (championship.status === 'ativo' || championship.status === 'finalizado') {
          try {
            const trophies = await trophiesService.getAll(undefined, championship.id);
            trophiesMap.set(championship.id, trophies);
          } catch (error) {
            console.error(`Erro ao carregar troféus do campeonato ${championship.id}:`, error);
          }
        }
      }

      const tourneysWithTrophiesData = transformChampionshipsToTourneys(championships, trophiesMap);
      setTourneysWithTrophies(tourneysWithTrophiesData);
    };

    if (championships.length > 0) {
      loadTrophies();
    }
  }, [championships]);

  return (
    <>
      <MatchSlider />
      <div className="grid-container">
        <div className="grid-container-item">
          <h2 className="grid-container-item-title">
            Campeonatos para acompanhar
          </h2>
          <div className="grid-container-item-description">
            <p className="grid-container-item-description-text">
              Acompanhe os campeonatos que você mais gosta de assistir
            </p>
            <a
              href="/championships"
              className="grid-container-item-description-link"
            >
              Ver todos
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 2.625L2.5 13.125"
                  stroke="#A6A9B8"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13 10.3275V2.625H5.2975"
                  stroke="#A6A9B8"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
          {isLoading ? (
            <p>Carregando campeonatos...</p>
          ) : (
            <TourneysSlider tourneys={tourneys} />
          )}
          <h2 className="grid-container-item-title">
            Fique por dentro do seu campeonato favorito
          </h2>
          <div className="grid-container-item-description">
            <p className="grid-container-item-description-text">
              Acompanhe as atualizações do seu campeonato favorito
            </p>
            <a
              href="/championships"
              className="grid-container-item-description-link"
            >
              Ver todos
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 2.625L2.5 13.125"
                  stroke="#A6A9B8"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13 10.3275V2.625H5.2975"
                  stroke="#A6A9B8"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
          {isLoading ? (
            <p>Carregando atualizações...</p>
          ) : (
            <TourneysInfoSlider tourneys={tourneysWithTrophies.length > 0 ? tourneysWithTrophies : tourneys} />
          )}
        </div>
        <div className="grid-container-item">
          <img
            src="https://picsum.photos/id/200/300?random=1"
            alt="Banner"
            className="advertising-banner"
          />
          <TourneyTabs />
        </div>
      </div>
    </>
  );
};
