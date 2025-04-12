
import React from 'react';
import PetCreation from './PetCreation';
import PetDisplay from './PetDisplay';
import StatsDisplay from './StatsDisplay';
import ControlPanel from './ControlPanel';

const App = () => (
  <div>
    <h1>Virtual Pet Game</h1>
    <PetCreation />
    <PetDisplay />
    <StatsDisplay />
    <ControlPanel />
  </div>
);

export default App;
