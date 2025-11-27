# Frontend - Plataforma de Campeonatos Esportivos

Interface completa desenvolvida em React + Vite, replicando fielmente três páginas principais: Home, Campeonatos e Meu Time.

## 🚀 Tecnologias

- **React 19** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática
- **React Router DOM** - Roteamento
- **Lucide React** - Ícones modernos

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── sidebar/
│   ├── top-nav/
│   ├── match-card/
│   ├── tournament-card-small/
│   ├── tournament-card-large/
│   ├── my-team-card/
│   ├── carousel-horizontal/
│   ├── updates-list/
│   ├── promo-banner/
│   ├── bracket-placeholder/
│   └── tournament-list/
├── pages/              # Páginas principais
│   ├── Home.tsx
│   ├── Campeonatos.tsx
│   └── MeuTime.tsx
├── data/               # Dados mockados
│   └── mockData.ts
├── types/              # Definições TypeScript
│   └── index.ts
├── App.tsx            # Componente principal com rotas
└── main.tsx           # Entry point
```

## 🎨 Funcionalidades

### Página Home
- Cards de jogos ao vivo com status (Live, Vai Começar Logo, Finalizado)
- Carrossel de campeonatos para acompanhar
- Seção "Fique Por Dentro" com atualizações de campeonatos favoritos
- Banner promocional lateral
- Lista de novos campeonatos
- Diagrama de classificação (bracket)

### Página Campeonatos
- Navegação por categorias (All, E-sports, Futebol, Basquete, etc.)
- Barra de busca
- Seções de campeonatos com carrosséis horizontais
- Banner promocional lateral

### Página Meu Time
- Card principal com informações do time
- Campeonatos abertos para inscrição
- Campeonatos já inscritos
- Banner promocional lateral

## 🛠️ Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📱 Responsividade

- **Desktop**: Layout completo com sidebar fixa
- **Tablet**: Sidebar colapsável, grids adaptáveis
- **Mobile**: Menu hambúrguer, carrosséis scrolláveis

## 🎯 Componentes Principais

### Sidebar
Navegação lateral fixa com:
- Logo
- Menu de navegação (Home, Datas, Campeonatos, Meu Time, Rankins)
- Estados ativos e hover

### TopNav
Barra superior com:
- Tabs de categorias
- Barra de busca

### CarouselHorizontal
Carrossel horizontal com:
- Scroll suave
- Setas de navegação
- Título e subtítulo opcionais
- Botão "Ver todos"

### MatchCard
Card de partida com:
- Status (Live, Upcoming, Finished)
- Times e placar
- Localização
- Informações adicionais

### TournamentCard
Cards de campeonatos em dois tamanhos:
- Small: Para carrosséis
- Large: Para seções principais

## 🎨 Paleta de Cores

- **Sidebar**: `#001B26` (azul escuro)
- **Background**: `#F5F5F5` (cinza claro)
- **Accent Yellow**: `#FCD34D`
- **Accent Blue**: `#3B82F6`
- **Cards**: `#FFFFFF` (branco)

## 📝 Dados Mockados

Todos os dados estão em `src/data/mockData.ts` e podem ser facilmente substituídos por chamadas de API quando o backend estiver disponível.

## 🔄 Próximos Passos

- [ ] Integração com API backend
- [ ] Autenticação de usuários
- [ ] Sistema de notificações
- [ ] Filtros avançados
- [ ] Páginas de detalhes de campeonatos
- [ ] Sistema de inscrição em campeonatos
