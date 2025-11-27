import { Sidebar } from '../components/sidebar/Sidebar';
import { ChampionshipList } from '../components/championship-list/ChampionshipList';

export const Configuracoes = () => {
  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <div className="content-wrapper">
          <div className="content-main" style={{ width: '100%' }}>
            <ChampionshipList />
          </div>
        </div>
      </div>
    </div>
  );
};

