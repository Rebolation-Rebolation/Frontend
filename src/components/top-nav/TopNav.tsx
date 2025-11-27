import { useState } from 'react';
import { Search } from 'lucide-react';
import { categories } from '../../data/mockData';

interface TopNavProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export const TopNav = ({ activeCategory = 'All', onCategoryChange }: TopNavProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="top-nav">
      <div className="top-nav-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange?.(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Busque por: vôlei, basquete, futebol..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

