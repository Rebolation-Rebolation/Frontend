import { useState } from "react";
import "./style.css";
import { SilverMedal } from "../../assets/constants/medals/SilverMedal";
import { GoldenMedal } from "../../assets/constants/medals/GoldenMedal";
import { BronzeMedal } from "../../assets/constants/medals/BronzeMedal";
interface TourneyCardProps {
  tourneyName: string;
  tourneyImage: string;
  tourneyColor: string;
  tourneyType?: string;
}

type Challenger = {
  image: string;
  name: string;
};

const challengers: Challenger[] = [
  {
    image: "https://picsum.photos/id/200/300?random=1",
    name: "Sinista",
  },
  {
    image: "https://picsum.photos/id/200/300?random=2",
    name: "Corrosiva",
  },
  {
    image: "https://picsum.photos/id/200/300?random=3",
    name: "Sinista",
  },
  {
    image: "https://picsum.photos/id/200/300?random=3",
    name: "Sinista",
  },
];

export const TourneyCard = ({
  tourneyName,
  tourneyImage,
  tourneyColor,
  tourneyType,
}: TourneyCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleOpenTourneyCard = () => {
    setIsOpen(true);
  };
  const handleCloseTourneyCard = () => {
    setIsOpen(false);
  };

  const RenderMedal = ({ index }: { index: number }) => {
    if (index === 1) {
      return <GoldenMedal />;
    } else if (index === 2) {
      return <SilverMedal />;
    } else if (index === 3) {
      return <BronzeMedal />;
    }
    return null;
  };

  const numberToOrdinal = (index: number) => {
    if (index === 1) {
      return "Primeiro lugar";
    } else if (index === 2) {
      return "Segundo lugar";
    } else if (index === 3) {
      return "Terceiro lugar";
    } else if (index === 4) {
      return "Quarto lugar";
    }
  };

  return (
    <>
      <div
        className="tourney-card"
        style={{ backgroundColor: tourneyColor }}
        onClick={handleOpenTourneyCard}
      >
        <img
          src={tourneyImage}
          alt={tourneyName}
          loading="lazy"
          fetchPriority="low"
          className="tourney-card-image"
        />
        <span className="tourney-card-name">{tourneyName}</span>
      </div>

      {isOpen && (
        <>
          <div className="tourney-card-expanded">
            <div
              className="tourney-card-expanded-head"
              style={{ backgroundColor: tourneyColor }}
            >
              <div className="tourney-card-expanded-head-content">
                <div className="tourney-card-expanded-head-content-image">
                  <img
                    src={tourneyImage}
                    alt={tourneyName}
                    loading="lazy"
                    fetchPriority="low"
                    className="tourney-card-image-expanded"
                  />
                  <div className="tourney-card-expanded-head-content-image-text">
                    <span className="tourney-card-expanded-head-content-image-text-name">
                      {tourneyName}
                    </span>
                    <span className="tourney-card-expanded-head-content-image-text-type">
                      {tourneyType}
                    </span>
                  </div>
                </div>
                <button className="favorite-button" onClick={() => setIsFavorite(!isFavorite)}>
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
              <p className="tourney-card-expanded-head-content-title">
                Atualizações
              </p>
            </div>
            <div className="tourney-card-expanded-content">
              {challengers.map((challenger, index) => (
                <div className="tourney-card-expanded-content-item">
                  <img
                    src={challenger.image}
                    alt={challenger.name}
                    loading="lazy"
                    fetchPriority="low"
                    className="tourney-card-expanded-content-item-image"
                  />
                  <div>
                    <p className="tourney-card-expanded-content-item-title">
                      {challenger.name}
                    </p>
                    <p className="tourney-card-expanded-content-item-position">
                      {numberToOrdinal(index + 1)}
                    </p>
                  </div>
                  <div className="tourney-card-expanded-content-item-medal">
                    <RenderMedal index={index + 1} />
                  </div>
                </div>
              ))}
            </div>
            <a href="/championships" className="tourney-card-expanded-footer">
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
           <div className="tourney-card-overlay" onClick={handleCloseTourneyCard}></div> 
        </>
      )}
    </>
  );
};
