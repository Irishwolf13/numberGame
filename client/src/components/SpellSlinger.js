import React, { useState } from 'react';

export default function SpellSlinger() {
  const [myLook, setMyLook] = useState('');
  const [myFeature, setMyFeature] = useState('');
  const [myGear, setMyGear] = useState('');
  const [myMagic1, setMyMagic1] = useState('');
  const [myMagic2, setMyMagic2] = useState('');
  const [myMagic3, setMyMagic3] = useState('');
  const [myMagicMove1, setMyMagicMove1] = useState('');
  const [myMagicMove2, setMyMagicMove2] = useState('');
  const [myMagicMove3, setMyMagicMove3] = useState('');
  const hunterLook = ["Rumpled clothes", "Stylish clothes", "Goth clothes", "Old Fashioned clothes"]
  const hunterFeatures = ["Shadowed eyes", "Fierce eyes", "Weary eyes", "Sparkling eyes"]
  const hunterGear = ["Old Revolver", "Ritual Knife", "Heirloom Sword"]
  const hunterGearDescriptions = ['1','2','3']
  const baseMagic = ['Blast','Ball','Missile','Wall','Fire','Force or Wind','Lightning or Entropy','Frost or Ice','Earth','Necromantic']
  const baseMagicDescriptions = [
    '2-harm magic close obvious loud',
    '1-harm magic area close obvious loud',
    '1-harm magic far obvious loud',
    '1-harm magic barrier close 1-armour obvious loud',
    'Add “+2 harm fire” to a base. If you get a 10+ on a combat magic roll, the fire won’t spread',
    'Add “+1 harm forceful” to a base, or “+1 armour” to a wall',
    'Add “+1 harm messy” to a base',
    'Adds “-1 harm +2 armour” to a wall, or “+1 harm restraining” to other bases',
    'Add “forceful restraining” to a base',
    'Add “life-drain” to a base'
  ]
  const magicMoves = ['Advanced Arcane Training','Arcane Reputation','Could have been worse','Enchated Clothing',
                      'Forensic Divination','Go Big or Go Home','Noy my fault','Practitioner','Shield Spell',
                      'Third Eye']
  const magicMovesDescriptions = ['1','2','3','4','5','6','7','8','9','10']
  const selectedMagic1 = baseMagic.indexOf(myMagic1);
  const selectedMagic2 = baseMagic.indexOf(myMagic2);
  const selectedMagic3 = baseMagic.indexOf(myMagic3);

  const handleDropDownChange = (event, mySetter) => {
    mySetter(event.target.value);
    console.log(event.target.selectedIndex);
  };

  const dropdown = (id, value, options, onChangeHandler, second = '') => {
    let allOptions = [...options];
  
    if (second === 'effects') {
      allOptions.splice(4, 0, 'effects'); // Insert 'effects' after first four options
    } else {
      allOptions = allOptions.slice(0, 4); // Only use the first four options
    }
  
    return (
      <div>
        <label htmlFor={id}>{id}: </label>
        <select id={id} value={value} onChange={(e) => onChangeHandler(e)}>
          <option value="" disabled>Select {id}</option>
          {allOptions.map((option, index) => {
            // Check if the current option is 'effects' and make it non-selectable
            if (option === 'effects') {
              return (
                <option key={index} value={option} disabled>
                  ── effects ──
                </option>
              );
            } else {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            }
          })}
        </select>
      </div>
    );
  };
  
  return (
    <div>
      {dropdown("Look",myLook,hunterLook, (e) => handleDropDownChange(e, setMyLook))}
      {dropdown("Features",myFeature,hunterFeatures, (e) => handleDropDownChange(e, setMyFeature))}
      {dropdown("Gear",myGear,hunterGear, (e) => handleDropDownChange(e, setMyGear))}
      {dropdown("Base Magic",myMagic1,baseMagic, (e) => handleDropDownChange(e, setMyMagic1))}
      {selectedMagic1 >= 0 &&<div>{baseMagicDescriptions[selectedMagic1]}</div>}
      {dropdown("Base or Effect",myMagic2,baseMagic, (e) => handleDropDownChange(e, setMyMagic2), 'effects')}
      {selectedMagic2 >= 0 &&<div>{baseMagicDescriptions[selectedMagic2]}</div>}
      {dropdown("Base or Effect",myMagic3,baseMagic, (e) => handleDropDownChange(e, setMyMagic3), 'effects')}
      {selectedMagic3 >= 0 &&<div>{baseMagicDescriptions[selectedMagic3]}</div>}
      <div>
        <h3>Moves You get all the basic moves and four Spell-slinger moves. You have this one:</h3>
        <p>
        Tools and Techniques: To use your combat magic effectively, you rely on a collection of tools and techniques. Cross off one; you’ll need the rest.
        </p>
      </div>
      {dropdown("Magic Move",myMagicMove1,magicMoves, (e) => handleDropDownChange(e, setMyMagicMove1))}
      {dropdown("Magic Move",myMagicMove2,magicMoves, (e) => handleDropDownChange(e, setMyMagicMove2))}
      {dropdown("Magic Move",myMagicMove3,magicMoves, (e) => handleDropDownChange(e, setMyMagicMove3))}
    </div>
  )
}
