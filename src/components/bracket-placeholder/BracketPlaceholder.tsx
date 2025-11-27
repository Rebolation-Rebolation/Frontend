export const BracketPlaceholder = () => {
  return (
    <div className="bracket-placeholder">
      <h2 className="bracket-title">Classificação</h2>
      <div className="bracket-diagram">
        <div className="bracket-side left">
          <div className="bracket-bar"></div>
          <div className="bracket-bar"></div>
          <div className="bracket-bar"></div>
          <div className="bracket-bar"></div>
        </div>
        <div className="bracket-center">
          <div className="bracket-box"></div>
          <div className="bracket-box"></div>
        </div>
        <div className="bracket-side right">
          <div className="bracket-bar"></div>
          <div className="bracket-bar"></div>
          <div className="bracket-bar"></div>
          <div className="bracket-bar"></div>
        </div>
      </div>
    </div>
  );
};

