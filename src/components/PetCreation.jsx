
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPet } from '../store/petSlice';

const PetCreation = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => dispatch(createPet(name))}>Create Pet</button>
    </div>
  );
};

export default PetCreation;
