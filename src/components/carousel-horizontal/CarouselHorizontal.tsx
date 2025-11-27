import { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface CarouselHorizontalProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
}

export const CarouselHorizontal = ({ children, title, subtitle, showViewAll = false }: CarouselHorizontalProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="carousel-section">
      {(title || showViewAll) && (
        <div className="carousel-header">
          <div>
            {title && <h2 className="carousel-title">{title}</h2>}
            {subtitle && <p className="carousel-subtitle">{subtitle}</p>}
          </div>
          {showViewAll && (
            <button className="view-all-button">
              Ver todos
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      )}
      <div className="carousel-container">
        <button className="carousel-arrow left" onClick={() => scroll('left')}>
          <ChevronLeft size={24} />
        </button>
        <div className="carousel-content" ref={scrollRef}>
          {children}
        </div>
        <button className="carousel-arrow right" onClick={() => scroll('right')}>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

