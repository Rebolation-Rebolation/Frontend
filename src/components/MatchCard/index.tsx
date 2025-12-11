import "./style.css";
import type { Match, Team } from "../../interfaces/Match";
import { useEffect, useState } from "react";
export const MatchCard = ({ match }: { match: Match }) => {
  type Status = "finalizado" | "live" | "vai_comecar_logo" | "nao_iniciado";
  const [status, setStatus] = useState<Status>("nao_iniciado");
  const [winner, setWinner] = useState<string>("");

  useEffect(() => {
    const now = new Date();

    const startTime = new Date(`${match.date}T${match.startTime}`);
    const endTime = match.endTime
      ? new Date(`${match.date}T${match.endTime}`)
      : null;

    if (endTime && now >= endTime) {
      setStatus("finalizado");
      if (match.homeTeam.score > match.awayTeam.score) {
        setWinner(`${match.homeTeam.name} 🏆`);
      } else if (match.homeTeam.score < match.awayTeam.score) {
        setWinner(`${match.awayTeam.name} 🏆`);
      } else {
        setWinner("Empate");
      }
      return;
    }

    if (now >= startTime && (!endTime || now < endTime)) {
      setStatus("live");
      return;
    }

    const diffMs = startTime.getTime() - now.getTime();
    const diffMinutes = diffMs / 1000 / 60;

    if (diffMinutes > 0 && diffMinutes <= 30) {
      setStatus("vai_comecar_logo");
      return;
    }

    setStatus("nao_iniciado");
  }, [match]);

  const ScoreCard = () => {
    let titleScore = "";
    let contentScore = "";

    const matchDate = new Date(`${match.date}T${match.startTime}`);
    const now = new Date();

    if (status === "finalizado") {
      titleScore = winner;
      contentScore = `${match.homeTeam.score} : ${match.awayTeam.score}`;
    } else if (status === "live") {
      titleScore = "Placar";
      contentScore = `${match.homeTeam.score} : ${match.awayTeam.score}`;
    } else {
      titleScore =
        matchDate.toDateString() === now.toDateString()
          ? "Hoje"
          : `${matchDate.getDate()}/${matchDate.getMonth() + 1}`;

      contentScore = `${matchDate.getHours()}:${String(
        matchDate.getMinutes()
      ).padStart(2, "0")}`;
    }

    return (
      <div className="match-card-content-score">
        <span className="match-card-content-score-title">{titleScore}</span>
        <div className="match-card-content-scores">
          <span>{contentScore}</span>
        </div>
      </div>
    );
  };

  const FooterCard = () => {
    let content = "";
    if (status === "finalizado") {
      content = `Partida finalizada - ${winner}`;
    } else {
      content = match.local;
    }

    return (
      <div className="match-card-footer">
        <span className="match-card-footer-content">{content}</span>
      </div>
    );
  };

  const TeamContent = ({ team }: { team: Team }) => {
    let content = "";
    if (status === "finalizado") {
      content = `${team.name} ${team.score} ${
        winner.includes(team.name) ? "🏆" : ""
      }`;
    } else if (status === "live") {
      content = `${team.name} ${team.score}`;
    } else {
      content = `${team.name}`;
    }

    return (
      <div className="match-card-content-team">
        <img
          src={team.logo}
          alt={team.name}
          className="match-card-content-team-logo"
          loading="lazy"
          fetchPriority="low"
        />
        <span className="match-card-content-team-name">{content}</span>
      </div>
    );
  };

  function formatStatus(status: string) {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ");
  }

  function getStatusLabel() {
    let label = null;
    if (status.toLowerCase() === "live") {
      label = (
        <span className="status-live-text">
          AO VIVO
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8.2" cy="8.20001" r="5" fill="#FF000F" />
            <circle
              cx="8.2"
              cy="8.20001"
              r="7.6"
              stroke="#FF000F"
              stroke-opacity="0.4"
              stroke-width="1.2"
            />
          </svg>
        </span>
      );
    } else if (status == "vai_comecar_logo") {
      label = <span className="status-text">{formatStatus(status)}</span>;
    }
    return label;
  }

  return (
    <div className="match-card">
      <div className="match-card-header">
        <h3 className="match-card-header-title">
          {match.type} | {match.title}
        </h3>
        <div className="status">{getStatusLabel()}</div>
      </div>
      <div className="match-card-content">
        <div className="match-card-content-teams">
          <TeamContent team={match.homeTeam} />
          <TeamContent team={match.awayTeam} />
        </div>
        <ScoreCard />
      </div>
      <FooterCard />
    </div>
  );
};
