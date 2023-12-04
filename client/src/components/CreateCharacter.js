import React, { useState } from 'react';
import { auth } from '../config/firebase.js'
import { useNavigate } from 'react-router-dom';
import SpellSlinger from './SpellSlinger.js';

export default function CreateCharacter() {
  const [myHunterType, setMyHunterType] = useState('');
  const [myName, setMyName] = useState('');
  const [myGender, setMyGender] = useState('');

  // This is going to be arrays for now, but I think we want to get this information from the backend later
  const allGenders = ["Woman", "Man", "Androgynous", "Other"]
  const allHunters = [
    "The Chosen","The Crooked","The Divine","The Expert","The Flake","The Initiate","The Monstrous",
    "The Mundane","The Professional","The Spell-Slinger","The Spooky","The Wronged"];
  // End temp information

  const handleDropDownChange = (event, mySetter) => {
    console.log(myHunterType)
    mySetter(event.target.value);
  };
  const handleCharacterNameChange = (event) => {
    setMyName(event.target.value);
  };

  return (
    <div>
      <div>
        <label>Character Name:  </label>
        <input id='characterName' value={myName} onChange={handleCharacterNameChange}></input>
      </div>
      <div>
        <label>Gender:  </label>
        <select id="gender" value={myGender} onChange={(e) => handleDropDownChange(e, setMyGender)}>
          <option value="" disabled>Gender</option>
            {allGenders.map((type, index) => (
              <option key={index + 1} value={index + 1}>{type}</option>
            ))}
        </select>
      </div>
      <div>
        <label htmlFor="dropdown">Select an option:  </label>
        <select id="dropdown" value={myHunterType} onChange={(e) => handleDropDownChange(e, setMyHunterType)}>
          <option value="" disabled>Hunter Type</option>
          {allHunters.map((type, index) => (
            <option key={index + 1} value={index + 1}>{type}</option>
          ))}
        </select>
      </div>
      {myHunterType === '10' && (<SpellSlinger />)}
    </div>
  )
}