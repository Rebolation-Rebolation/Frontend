import { NavLink } from 'react-router-dom';
import { Home, Calendar, Trophy, Clock, BarChart3, Settings } from 'lucide-react';

export const Sidebar = () => {
  const menuItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/datas', label: 'Datas', icon: Calendar },
    { path: '/campeonatos', label: 'Campeonatos', icon: Trophy },
    { path: '/meu-time', label: 'Meu Time', icon: Clock },
    { path: '/rankings', label: 'Rankings', icon: BarChart3 },
    { path: '/configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-circle">K</div>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

