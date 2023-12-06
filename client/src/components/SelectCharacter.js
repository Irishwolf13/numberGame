import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SelectCharacter({ backend, setCurrentCharacter}) {
  const navigate = useNavigate();
  const handleNavigate = (characterName) => {
    const character = backend.find(c => c.name === characterName);
    if (character) {
      setCurrentCharacter(character);
      navigate(`/characterSheet`);
    }
  };

  useEffect(() => {
    // Your existing useEffect code goes here
    frank()
    return () => {
      // Cleanup code
    };
  }, [backend]);

  const frank = () => {
    console.log(backend)
    if (Array.isArray(backend)) {
      return backend.map((object) => (
        <div key={object.name}>
          {/* Pass object.name to handleNavigate when button is clicked */}
          <button onClick={() => handleNavigate(object.name)}>{object.name}</button>
          <div>{`Charm: ${object.charm}`}</div>
          <div>{`Cool: ${object.cool}`}</div>
          <div>{`Sharp: ${object.sharp}`}</div>
          <div>{`Tough: ${object.tough}`}</div>
          <div>{`Weird: ${object.weird}`}</div>
        </div>
      ));
    }
    return null;
  };

  return (
    <div>
      {frank()}
    </div>
  );
}
