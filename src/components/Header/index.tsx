import "./style.css";
export const Header = ({ handleOpenMenu }: { handleOpenMenu: () => void }) => {

  return (
    <header className="header">
      <button className="header-menu-button" onClick={handleOpenMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#05344a"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M4 5h16" />
          <path d="M4 12h16" />
          <path d="M4 19h16" />
        </svg>
      </button>

      <div className="header-search">
        <input
          type="text"
          placeholder="Busque por: vôlei, basquete, futebol..."
          name="search"
        />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
        </button>
      </div>
    </header>
  );
};
