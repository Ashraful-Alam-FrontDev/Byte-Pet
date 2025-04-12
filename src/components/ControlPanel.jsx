import React from 'react';
import { useDispatch } from 'react-redux';
import { feedPet, playWithPet, cleanPet, sleepPet } from '../store/petSlice';

const ControlPanel = ({ pet }) => {
  const dispatch = useDispatch();

  const handleFeed = () => {
    dispatch(feedPet({ id: pet.id, foodType: 'regular' }));
  };

  const handleTreat = () => {
    dispatch(feedPet({ id: pet.id, foodType: 'treat' }));
  };

  const handlePlay = () => {
    dispatch(playWithPet({ id: pet.id, game: 'fetch' }));
  };

  const handleClean = () => {
    dispatch(cleanPet(pet.id));
  };

  const handleSleep = () => {
    dispatch(sleepPet(pet.id));
  };

  return (
    <div className="control-panel">
      <button onClick={handleFeed}>Feed</button>
      <button onClick={handleTreat}>Treat</button>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handleClean}>Clean</button>
      <button onClick={handleSleep}>Sleep</button>
    </div>
  );
};

export default ControlPanel;