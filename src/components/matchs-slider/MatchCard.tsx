import './MatchCard.scss'

export type Team = {
  id: string
  name: string
  logo: string
  score: number
}

export type Match = {
  sport: string
  matchNumber: number
  isLive?: boolean
  team1: Team
  team2: Team
  location: string
}

export type MatchCardProps = Match & {
  className?: string
}

export function MatchCard({
  sport,
  matchNumber,
  isLive = false,
  team1,
  team2,
  location,
  className = '',
}: MatchCardProps) {
  const totalScore = `${team1.score} : ${team2.score}`

  return (
    <div className={`match-card ${className}`}>
      {/* Header */}
      <div className="match-card__header">
        <div className="match-card__header-info">
          <span className="match-card__sport">{sport}</span>
          <span className="match-card__separator">|</span>
          <span className="match-card__match-number">Partida {matchNumber}</span>
        </div>
        {isLive && (
          <div className="match-card__live">
            <span className="match-card__live-text">Live</span>
            <span className="match-card__live-dot" />
          </div>
        )}
      </div>

      {/* Teams and Score */}
      <div className="match-card__body">
        <div className="match-card__teams">
          {/* Team 1 */}
          <div className="match-card__team">
            <div className="match-card__team-logo">
              <img src={team1.logo} alt={team1.name} />
            </div>
            <div className="match-card__team-info">
              <span className="match-card__team-name">{team1.name}</span>
              <span className="match-card__team-score">{team1.score}</span>
            </div>
          </div>

          {/* Team 2 */}
          <div className="match-card__team">
            <div className="match-card__team-logo">
              <img src={team2.logo} alt={team2.name} />
            </div>
            <div className="match-card__team-info">
              <span className="match-card__team-name">{team2.name}</span>
              <span className="match-card__team-score">{team2.score}</span>
            </div>
          </div>
        </div>

        {/* Score Section */}
        <div className="match-card__score">
          <span className="match-card__score-label">Placar</span>
          <span className="match-card__score-value">{totalScore}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="match-card__footer">
        <span className="match-card__location">{location}</span>
      </div>
    </div>
  )
}

