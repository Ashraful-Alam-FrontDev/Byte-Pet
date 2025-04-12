
import React from 'react';
import { useSelector } from 'react-redux';

const StatsDisplay = () => {
  const stats = useSelector(state => state.pet.stats);
  return (
    <div>
      <h3>Stats</h3>
      <div>Happiness: {stats.happiness}</div>
      <div>Health: {stats.health}</div>
    </div>
  );
};

export default StatsDisplay;
