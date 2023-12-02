import React, { useState } from 'react';
import { auth } from '../config/firebase.js'
import { useNavigate } from 'react-router-dom';

export default function CreateCharacter() {
  const [myType, setMyType] = useState('');
  const [myName, setMyName] = useState('');
  const [myGender, setMyGender] = useState('');
  const [myGear, setMyGear] = useState('');
  const [myFeature, setMyFeature] = useState('');

  // This is going to be arrays for now, but I think we want to get this information from the backend later
  const allCharacters = [
    "The Chosen",
    "The Crooked",
    "The Divine",
    "The Expert",
    "The Flake",
    "The Initiate",
    "The Monstrous",
    "The Mundane",
    "The Professional",
    "The Spell-Slinger",
    "The Spooky",
    "The Wronged"
  ];
  const allGear = ["Rumpled clothes", "Stylish clothes", "Goth clothes", "Old Fashioned clothes"]
  const allFeatures = ["Shadowed eyes", "Fierce eyes", "Weary eyes", "Sparkling eyes"]
  const allGenders = ["Woman", "Man", "Androgynous", "Other"]
  // End temp information

  const handleDropDownChange = (event, mySetter) => {
    mySetter(event.target.value);
  };
  const handleCharacterNameChange = (event) => {
    setMyName(event.target.value);
  };
  const handleGearChange = (event) => {
    setMyGear(event.target.value);
  };

  const handleFeatureChange = (event) => {
    setMyFeature(event.target.value);
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
        <select id="dropdown" value={myType} onChange={(e) => handleDropDownChange(e, setMyType)}>
          <option value="" disabled>Character Type</option>
          {allCharacters.map((type, index) => (
            <option key={index + 1} value={index + 1}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Gear:  </label>
        <select id="gear" value={myGear} onChange={(e) => handleDropDownChange(e, setMyGear)}>
          <option value="" disabled>Select Gear</option>
          {allGear.map((gear, index) => (
            <option key={index} value={gear}>{gear}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Features:  </label>
        <select id="features" value={myFeature} onChange={(e) => handleDropDownChange(e, setMyFeature)}>
          <option value="" disabled>Select Feature</option>
          {allFeatures.map((feature, index) => (
            <option key={index} value={feature}>{feature}</option>
          ))}
        </select>
      </div>
    </div>
  )
}