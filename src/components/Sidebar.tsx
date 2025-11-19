import { useMemo } from 'react'

type MenuItem = {
  key: string
  label: string
  href?: string
}

type SidebarProps = {
  items?: MenuItem[]
  header?: string
  activeKey?: string
}

export function Sidebar({ items, header, activeKey = 'dashboard' }: SidebarProps) {
  const menuItems = useMemo<MenuItem[]>(
    () =>
      items ?? [
        { key: 'dashboard', label: 'Dashboard', href: '#' },
        { key: 'projects', label: 'Projetos', href: '#' },
        { key: 'tasks', label: 'Tarefas', href: '#' },
        { key: 'reports', label: 'Relatórios', href: '#' },
        { key: 'settings', label: 'Configurações', href: '#' },
      ],
    [items],
  )

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <span>{header ?? 'Minha App'}</span>
      </div>
      <nav className="sidebar__nav">
        <ul className="sidebar__menu">
          {menuItems.map((item) => (
            <li className="sidebar__item" key={item.key}>
              <a href={item.href ?? '#'} className={`sidebar__link${activeKey === item.key ? ' is-active' : ''}`} aria-current={activeKey === item.key ? 'page' : undefined}>
                <span className="dot" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar__footer" style={{ borderTop: '1px solid #e5e7eb', padding: '12px', fontSize: 12, color: '#64748b' }}>© {new Date().getFullYear()}</div>
    </aside>
  )
}


