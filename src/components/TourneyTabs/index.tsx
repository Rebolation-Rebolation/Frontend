import { useEffect, useState } from "react";
import "./style.css";
import type { Tabs } from "../../interfaces/Tabs";
import { useChampionships } from "../../hooks/useChampionships";
import type { Championship } from "../../types/api";

const transformChampionshipToTabCard = (championship: Championship, type: string) => ({
  logo: championship.image || "https://via.placeholder.com/100",
  name: championship.name,
  type: type,
  color: getColorForChampionship(championship.id),
});

const getColorForChampionship = (id: string): string => {
  const colors = [
    '#021679',
    '#1AABE4',
    '#351151',
    '#000000',
    '#05344A',
    '#20C4BA',
    '#D84348',
    '#FF6B35',
  ];
  
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

export const TourneyTabs = () => {
  const { championships, fetchChampionships } = useChampionships();
  const [dataTabs, setDataTabs] = useState<Tabs[]>([]);
  const [activeTab, setActiveTab] = useState<string>("new");
  const [tabs, setTabs] = useState<Tabs | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadChampionships = async () => {
      await fetchChampionships({ limit: 20, page: 1 });
    };
    loadChampionships();
  }, [fetchChampionships]);

  useEffect(() => {
    if (championships.length > 0) {
      // Novos campeonatos (inscrições abertas ou aguardando início)
      const newChampionships = championships
        .filter((c) => c.status === 'inscricoes_abertas' || c.status === 'aguardando_inicio')
        .slice(0, 4)
        .map((c) => transformChampionshipToTabCard(c, "new"));

      // Campeonatos populares (ativos ou finalizados)
      const popularChampionships = championships
        .filter((c) => c.status === 'ativo' || c.status === 'finalizado')
        .slice(0, 4)
        .map((c) => transformChampionshipToTabCard(c, "popular"));

      const tabsData: Tabs[] = [];

      if (newChampionships.length > 0) {
        tabsData.push({
          logo: newChampionships[0]?.logo || "https://via.placeholder.com/100",
          name: "Novos campeonatos",
          key: "new",
          data: newChampionships,
        });
      }

      if (popularChampionships.length > 0) {
        tabsData.push({
          logo: popularChampionships[0]?.logo || "https://via.placeholder.com/100",
          name: "Campeonatos populares",
          key: "popular",
          data: popularChampionships,
        });
      }

      setDataTabs(tabsData);
      if (tabsData.length > 0) {
        setActiveTab(tabsData[0].key);
        setTabs(tabsData[0]);
      }
    }
  }, [championships]);

  const handleTabChange = (tab: Tabs) => {
    setActiveTab(tab.key);
    setTabs(tab);
  };

  if (!tabs || dataTabs.length === 0) {
    return (
      <div className="tourney-tabs">
        <p>Carregando campeonatos...</p>
      </div>
    );
  }

  return (
    <div className="tourney-tabs">
      <div className="tourney-tabs-buttons">
        {dataTabs.map((tab) => (
          <button
            key={tab.key}
            className={`tourney-tabs-button-item ${
              activeTab === tab.key ? "tourney-tabs-button-item-active" : ""
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="tourney-tabs-content">
        {tabs.data.map((tab, index) => (
          <div
            key={`${tab.name}-${index}`}
            className="tourney-tabs-content-item"
            style={{ backgroundColor: tab.color }}
          >
            <div className="tourney-tabs-content-item-info">
              <img
                src={tab.logo}
                alt={tab.name}
                className="tourney-tabs-content-item-info-image"
              />
              <div className="tourney-tabs-content-item-info-text">
                <p className="tourney-tabs-content-item-name">{tab.name}</p>
                <p className="tourney-tabs-content-item-type">{tab.type}</p>
              </div>
            </div>

            <button
              className="favorite-button"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? (
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.775 26.0125C15.35 26.1625 14.65 26.1625 14.225 26.0125C10.6 24.775 2.5 19.6125 2.5 10.8625C2.5 7 5.6125 3.875 9.45 3.875C11.725 3.875 13.7375 4.975 15 6.675C16.2625 4.975 18.2875 3.875 20.55 3.875C24.3875 3.875 27.5 7 27.5 10.8625C27.5 19.6125 19.4 24.775 15.775 26.0125Z"
                    fill="#D84348"
                    stroke="#D84348"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.775 26.0125C15.35 26.1625 14.65 26.1625 14.225 26.0125C10.6 24.775 2.5 19.6125 2.5 10.8625C2.5 7 5.6125 3.875 9.45 3.875C11.725 3.875 13.7375 4.975 15 6.675C16.2625 4.975 18.2875 3.875 20.55 3.875C24.3875 3.875 27.5 7 27.5 10.8625C27.5 19.6125 19.4 24.775 15.775 26.0125Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
