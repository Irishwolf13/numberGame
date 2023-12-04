import React, { useState } from 'react';

export default function SpellSlinger() {
  const [myLook, setMyLook] = useState('');
  const [myFeature, setMyFeature] = useState('');
  const [myGear, setMyGear] = useState('');
  const [myMagic1, setMyMagic1] = useState('');
  const [myMagic2, setMyMagic2] = useState('');
  const [myMagic3, setMyMagic3] = useState('');

  const hunterLook = ["Rumpled clothes", "Stylish clothes", "Goth clothes", "Old Fashioned clothes"]
  const hunterFeatures = ["Shadowed eyes", "Fierce eyes", "Weary eyes", "Sparkling eyes"]
  const hunterGear = ["Old Revolver", "Ritual Knife", "Heirloom Sword"]
  const baseMagic = ['Blast','Ball','Missile','Wall']
  const effects = ['Fire','Force or Wind','Lightning or Entropy','Frost or Ice','Earth','Necromantic']
  const effectDescritions = ['']

  const handleDropDownChange = (event, mySetter) => {
    mySetter(event.target.value);
  };

  const dropdown = (id, value, options, onChangeHandler, second = '') => {
    // Create a new options list with "Frank" inserted in between if 'second' is not an empty string.
    let allOptions = options;
    if (second !== '') {
      allOptions = [...allOptions, { label: 'Effects: ', disabled: true }, ...second];
    }
  
    return (
      <div>
        <label htmlFor={id}>{id}: </label>
        <select id={id} value={value} onChange={(e) => onChangeHandler(e)}>
          <option value="" disabled>Select {id}</option>
          {allOptions.map((option, index) => (
            typeof option === 'object' ? (
              <option key={index} value={option.label} disabled={option.disabled}>
                {option.label}
              </option>
            ) : (
              <option key={index} value={option}>
                {option}
              </option>
            )
          ))}
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
      {dropdown("Base or Effect",myMagic1,baseMagic, (e) => handleDropDownChange(e, setMyMagic1), effects)}
      {dropdown("Base or Effect",myMagic1,baseMagic, (e) => handleDropDownChange(e, setMyMagic1), effects)}
    </div>
  )
}
