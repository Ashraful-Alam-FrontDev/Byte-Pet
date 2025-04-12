import React from "react";

const StatsDisplay = ({ stats }) => {
  const { hunger, happiness, energy, hygiene } = stats;

  return (
    <div className="stats-display">
      <h3>Pet Stats</h3>
      <div className="stats-container">
        <div className="stat hunger">
          <label>Hunger:</label>
          <div className="stat-bar">
            <div className="stat-fill" style={{ width: `${hunger}%` }}></div>
          </div>
        </div>

        <div className="stat happiness">
          <label>Happiness:</label>
          <div className="stat-bar">
            <div className="stat-fill" style={{ width: `${happiness}%` }}></div>
          </div>
        </div>

        <div className="stat energy">
          <label>Energy:</label>
          <div className="stat-bar">
            <div className="stat-fill" style={{ width: `${energy}%` }}></div>
          </div>
        </div>

        <div className="stat hygiene">
          <label>Hygiene:</label>
          <div className="stat-bar">
            <div className="stat-fill" style={{ width: `${hygiene}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;
