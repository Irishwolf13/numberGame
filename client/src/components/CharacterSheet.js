import React, { useState, useEffect } from 'react';

export default function CharacterSheet({ currentCharater }) {
  useEffect(() => {
    // Your existing useEffect code goes here
    console.log(currentCharater)
    return () => {
      // Cleanup code
    };
  }, [currentCharater]);
  return (
    <div>
      <div>{currentCharater.name}</div>
      <img src={currentCharater.image} alt={`${currentCharater.name || 'Character'}'s image`} />
    </div>
  )
}
