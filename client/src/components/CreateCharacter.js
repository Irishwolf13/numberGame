import React, { useState } from 'react';
import SpellSlinger from './characterTypes/SpellSlinger.js';

export default function CreateCharacter({setBackend}) {
  const [hunterType, setHunterType] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');

  // This is going to be arrays for now, but I think we want to get this information from the backend later
  const allGenders = ["Woman", "Man", "Androgynous", "Other"]
  const allHunters = [
    "The Chosen","The Crooked","The Divine","The Expert","The Flake","The Initiate","The Monstrous",
    "The Mundane","The Professional","The Spell-Slinger","The Spooky","The Wronged"];
  // End temp information

  const handleDropDownChange = (event, mySetter) => {
    // console.log(hunterType)
    mySetter(event.target.value);
  };
  const handleCharacterNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <div>
        <label>Character Name:  </label>
        <input id='characterName' value={name} onChange={handleCharacterNameChange}></input>
      </div>
      <div>
        <label>Gender:  </label>
        <select id="gender" value={gender} onChange={(e) => handleDropDownChange(e, setGender)}>
          <option value="" disabled>Gender</option>
            {allGenders.map((type, index) => (
              <option key={index + 1} value={index + 1}>{type}</option>
            ))}
        </select>
      </div>
      <div>
        <label htmlFor="dropdown">Select an option:  </label>
        <select id="dropdown" value={hunterType} onChange={(e) => handleDropDownChange(e, setHunterType)}>
          <option value="" disabled>Hunter Type</option>
          {allHunters.map((type, index) => (
            <option key={index + 1} value={index + 1}>{type}</option>
          ))}
        </select>
      </div>
      {hunterType === '10' && (<SpellSlinger setBackend={setBackend} hunterType={hunterType} name={name} gender={gender}/>)}
    </div>
  )
}