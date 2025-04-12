import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPet } from '../store/petSlice';

const PetCreation = () => {
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState('dog');
  const [color, setColor] = useState('#6a5acd');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!petName.trim()) {
      alert('Please enter a name for your pet');
      return;
    }

    dispatch(createPet({
      name: petName,
      species,
      appearance: {
        baseColor: color,
        accessories: []
      }
    }));
  };

  return (
    <div className="pet-creation">
      <h2>Create Your New Pet</h2>
      <form className="pet-creation-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pet-name">Name:</label>
          <input 
            id="pet-name" 
            type="text" 
            value={petName} 
            onChange={(e) => setPetName(e.target.value)}
            placeholder="Enter a name"
            required
          />
        </div>

        <div>
          <label htmlFor="pet-species">Species:</label>
          <select 
            id="pet-species" 
            value={species} 
            onChange={(e) => setSpecies(e.target.value)}
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="dragon">Dragon</option>
            <option value="rabbit">Rabbit</option>
          </select>
        </div>

        <div>
          <label htmlFor="pet-color">Color:</label>
          <input 
            id="pet-color" 
            type="color" 
            value={color} 
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <button type="submit">Create Pet</button>
      </form>
    </div>
  );
};

export default PetCreation;