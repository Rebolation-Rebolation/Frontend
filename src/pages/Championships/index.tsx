import { TourneysSlider } from "../../components/TourneysSlider";
import { TourneyTabs } from "../../components/TourneyTabs";
import { useEffect, useState } from "react";
import { useChampionships } from "../../hooks/useChampionships";
import { transformChampionshipsToTourneys } from "../../utils/transformers";
import type { Tourney } from "../../interfaces/Tourney";
import "./style.css";

export const Championships = () => {
  const { championships, fetchChampionships, isLoading } = useChampionships();
  const [tourneys, setTourneys] = useState<Tourney[]>([]);

  useEffect(() => {
    const loadChampionships = async () => {
      await fetchChampionships({ limit: 20, page: 1 });
    };
    loadChampionships();
  }, [fetchChampionships]);

  useEffect(() => {
    if (championships.length > 0) {
      const transformedTourneys = transformChampionshipsToTourneys(championships);
      setTourneys(transformedTourneys);
    }
  }, [championships]);

  return (
    <>
      <div className="grid-container">
        <div className="grid-container-item">
          {isLoading ? (
            <div className="empty-state">
              <p>Carregando campeonatos...</p>
            </div>
          ) : tourneys.length > 0 ? (
            <>
              <div className="grid-container-item-description">
                <p className="grid-container-item-description-text">
                  Todos os Campeonatos
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
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 10.3275V2.625H5.2975"
                      stroke="#A6A9B8"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
              <TourneysSlider tourneys={tourneys} />
            </>
          ) : (
            <div className="empty-state">
              <p>Nenhum campeonato encontrado</p>
            </div>
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
