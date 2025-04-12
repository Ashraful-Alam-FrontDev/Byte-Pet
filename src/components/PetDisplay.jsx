
import React from 'react';
import { useSelector } from 'react-redux';

const PetDisplay = () => {
  const pet = useSelector(state => state.pet);
  return (
    <div>
      <h2>{pet.name}</h2>
    </div>
  );
};

export default PetDisplay;
