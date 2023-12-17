import React, { useState } from 'react';
import Choosen from './characterTypes/Choosen.js';
import Crooked from './characterTypes/Crooked.js';
import Flake from './characterTypes/Flake.js';
import SpellSlinger from './characterTypes/SpellSlinger.js';

export default function CreateCharacter({ setBackend }) {
  const [hunterType, setHunterType] = useState('');
  const [name, setName] = useState('');

  // This is going to be arrays for now, but I think we want to get this information from the backend later
  const allHunters = [
    "The Chosen", "The Crooked", "The Divine", "The Expert", "The Flake", "The Initiate", "The Monstrous",
    "The Mundane", "The Professional", "The Spell-Slinger", "The Spooky", "The Wronged"
  ];
  // End temp information

  const handleDropDownChange = (event) => {
    setHunterType(event.target.value);
  };

  const handleCharacterNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <div>
        <label>Character Name: </label>
        <input id='characterName' value={name} onChange={handleCharacterNameChange}></input>
      </div>
      <div>
        <label htmlFor="dropdown">Select an option: </label>
        <select id="dropdown" value={hunterType} onChange={handleDropDownChange}>
          <option value="" disabled>Hunter Type</option>
          {allHunters.map((type, index) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      {hunterType === 'The Chosen' && (<Choosen setBackend={setBackend} hunterType={hunterType} name={name} />)}
      {hunterType === 'The Crooked' && (<Crooked setBackend={setBackend} hunterType={hunterType} name={name} />)}
      {hunterType === 'The Flake' && (<Flake setBackend={setBackend} hunterType={hunterType} name={name} />)}
      {hunterType === 'The Spell-Slinger' && (<SpellSlinger setBackend={setBackend} hunterType={hunterType} name={name} />)}
    </div>
  );
}
