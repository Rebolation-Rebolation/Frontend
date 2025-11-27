import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { MatchCardSlider } from './components/MatchCardSlider'

function App() {
  const [openMobile, setOpenMobile] = useState(false)

  return (
    <div className="app">
      {/* Sidebar fixa no desktop */}
      <Sidebar activeKey="dashboard" />

      {/* Topbar */}
      <div className="topbar with-sidebar">
        <button className="topbar__menu-btn" onClick={() => setOpenMobile(true)}>
          Menu
        </button>
        <div style={{ marginLeft: 12, fontSize: 14, fontWeight: 600 }}>Dashboard</div>
      </div>

      {/* Drawer Mobile */}
      {openMobile && (
        <div className="drawer">
          <div className="drawer__panel">
            <div className="drawer__panel-header">
              <span>Minha App</span>
            </div>
            <div style={{ padding: 8 }}>
              <ul className="sidebar__menu">
                {['Dashboard', 'Projetos', 'Tarefas', 'Relatórios', 'Configurações'].map((label) => (
                  <li className="sidebar__item" key={label}>
                    <a href="#" className="sidebar__link">
                      <span className="dot" />
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="drawer__backdrop" />
        </div>
      )}

      {/* Área de conteúdo */}
      <main className="content with-sidebar">
        <div className="container">

          {/* Slider horizontal de partidas */}
          <MatchCardSlider
            matches={[
              {
                sport: 'Futebol',
                matchNumber: 8,
                isLive: true,
                team1: {
                  id: '1',
                  name: 'Corrosiva',
                  logo: 'https://via.placeholder.com/48/22c55e/ffffff?text=C',
                  score: 0,
                },
                team2: {
                  id: '2',
                  name: 'Sinistra',
                  logo: 'https://via.placeholder.com/48/dc2626/ffffff?text=S',
                  score: 20,
                },
                location: 'Arena Fonte Nova',
              },
              {
                sport: 'Basquete',
                matchNumber: 5,
                isLive: true,
                team1: {
                  id: '3',
                  name: 'Tigres',
                  logo: 'https://via.placeholder.com/48/3b82f6/ffffff?text=T',
                  score: 45,
                },
                team2: {
                  id: '4',
                  name: 'Leões',
                  logo: 'https://via.placeholder.com/48/f59e0b/ffffff?text=L',
                  score: 38,
                },
                location: 'Ginásio Municipal',
              },
              {
                sport: 'Vôlei',
                matchNumber: 12,
                isLive: false,
                team1: {
                  id: '5',
                  name: 'Raios',
                  logo: 'https://via.placeholder.com/48/8b5cf6/ffffff?text=R',
                  score: 2,
                },
                team2: {
                  id: '6',
                  name: 'Tempestade',
                  logo: 'https://via.placeholder.com/48/6366f1/ffffff?text=T',
                  score: 1,
                },
                location: 'Centro Esportivo',
              },
              {
                sport: 'Futebol',
                matchNumber: 15,
                isLive: true,
                team1: {
                  id: '7',
                  name: 'Dragões',
                  logo: 'https://via.placeholder.com/48/ec4899/ffffff?text=D',
                  score: 3,
                },
                team2: {
                  id: '8',
                  name: 'Águias',
                  logo: 'https://via.placeholder.com/48/14b8a6/ffffff?text=A',
                  score: 1,
                },
                location: 'Estádio Central',
              },
              {
                sport: 'Basquete',
                matchNumber: 9,
                isLive: false,
                team1: {
                  id: '9',
                  name: 'Lobos',
                  logo: 'https://via.placeholder.com/48/6b7280/ffffff?text=L',
                  score: 52,
                },
                team2: {
                  id: '10',
                  name: 'Ursos',
                  logo: 'https://via.placeholder.com/48/92400e/ffffff?text=U',
                  score: 48,
                },
                location: 'Arena Esportiva',
              },
            ]}
          />
        </div>
      </main>
    </div>
  )
}

export default App
