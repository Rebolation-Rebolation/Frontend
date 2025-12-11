import { useRef, useState } from "react";
import "./style.css";
import { TourneyInfoCard } from "../TourneyInfoCard";
import type { Tourney } from "../../interfaces/Tourney";
export const TourneysInfoSlider = ({ tourneys }: { tourneys: Tourney[] }) => {

  const sliderContentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1);


  const handleNext = () => {
    if (sliderContentRef.current) {
      sliderContentRef.current.scrollLeft += 385;
      setCurrentIndex(currentIndex + 1);
    }
  }
  const handlePrev = () => {
    if (sliderContentRef.current) {
      sliderContentRef.current.scrollLeft -= 385;
      setCurrentIndex(currentIndex - 1);
    }
  }

  return (
    <div className="tourneys-info-slider">
      <div className="tourneys-info-slider-content" ref={sliderContentRef}>
      {
        tourneys.map((tourney) => (
          <TourneyInfoCard key={tourney.id} tourneyName={tourney.name} tourneyImage={tourney.image} tourneyColor={tourney.color} tourneyType={tourney.type} challengers={tourney.challengers} />
        ))
      }
      </div>
        <button className="tourneys-info-slider-navigation-button tourneys-info-slider-next" onClick={handleNext} disabled={currentIndex >= tourneys.length}>
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
        <button className="tourneys-info-slider-navigation-button tourneys-info-slider-prev" onClick={handlePrev} disabled={currentIndex <= 1}>
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
  );
};