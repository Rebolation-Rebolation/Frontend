export const PromoBanner = () => {
  const teams = ['SINISTRA', 'DOMINANT', 'DEVASTADORA', 'COMBATENTE', 'SUPERIOR', 'FURIOSA'];

  return (
    <div className="promo-banner">
      <div className="promo-content">
        <h1 className="promo-title">CALOURADA PRIME</h1>
        <div className="promo-teams">
          {teams.map((team, index) => (
            <div key={index} className="promo-team-logo">
              {team}
            </div>
          ))}
        </div>
        <div className="promo-event">
          <div className="promo-reg">REG Vento PRIME</div>
          <div className="promo-date">6 DE SETEMBRO</div>
        </div>
        <button className="promo-button">COMPRE SEU INGRESSO AQUI</button>
      </div>
    </div>
  );
};

