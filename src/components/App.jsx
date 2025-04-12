import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PetCreation from './PetCreation';
import PetDisplay from './PetDisplay';
import StatsDisplay from './StatsDisplay';
import ControlPanel from './ControlPanel';
import { updatePetStats, resetPet } from '../store/petSlice';

const App = () => {
  const { currentPet, hasPet, isLoading, error } = useSelector(state => state.pet);
  const dispatch = useDispatch();

  useEffect(() => {
    // Connect to Socket.io for real-time updates
    if (hasPet) {
      const socket = io();
      socket.on('petUpdate', (updatedPet) => {
        if (updatedPet.id === currentPet.id) {
          dispatch(updatePetStats(updatedPet));
        }
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [hasPet, currentPet, dispatch]);

  const handleBackToHome = () => {
    dispatch(resetPet());
  };

  if (isLoading) {
    return <div className="loading">Loading your pet...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Virtual Pet Companion</h1>
        {hasPet && (
          <button className="back-button" onClick={handleBackToHome}>
            Create New Pet
          </button>
        )}
      </header>

      {!hasPet ? (
        <PetCreation />
      ) : (
        <>
          <PetDisplay pet={currentPet} />
          <StatsDisplay stats={currentPet.stats} />
          <ControlPanel pet={currentPet} />
        </>
      )}
    </div>
  );
};

export default App;