import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PetDisplay = ({ pet }) => {
  const petRef = useRef(null);

  useEffect(() => {
    if (petRef.current) {
      // Animation based on mood
      gsap.killTweensOf(petRef.current);

      if (pet.mood.primary === 'happy') {
        gsap.to(petRef.current, {
          y: -10,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      } else if (pet.mood.primary === 'hungry') {
        gsap.to(petRef.current, {
          rotation: 5,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      } else if (pet.mood.primary === 'sleepy') {
        gsap.to(petRef.current, {
          scaleY: 0.9,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      } else {
        gsap.to(petRef.current, {
          y: 0,
          rotation: 0,
          scaleY: 1,
          duration: 0.5
        });
      }
    }

    return () => {
      if (petRef.current) {
        gsap.killTweensOf(petRef.current);
      }
    };
  }, [pet.mood.primary]);

  // Helper function to get pet emoji based on species
  const getPetSprite = () => {
    const sprites = {
      dog: '🐕',
      cat: '🐈',
      dragon: '🐉',
      rabbit: '🐇'
    };

    return sprites[pet.species] || '🐕';
  };

  return (
    <div className="pet-display" style={{ backgroundColor: '#f0f8ff' }}>
      <div className="level-badge">{pet.level}</div>
      <div 
        className={`mood-indicator ${pet.mood.primary}`}
      >
        {pet.mood.primary.charAt(0).toUpperCase() + pet.mood.primary.slice(1)}
        {pet.mood.intensity > 7 ? ' !!!' : pet.mood.intensity > 5 ? ' !!' : ''}
      </div>

      <div 
        ref={petRef}
        className={`pet-sprite ${pet.mood.primary}`}
        style={{ color: pet.appearance.baseColor }}
      >
        {getPetSprite()}
      </div>

      <div className="pet-name">{pet.name}</div>
    </div>
  );
};

export default PetDisplay;