import React, { useState, useEffect } from 'react';
import spellSlingerImage from '../../images/spellSlinger.jpg';

import { useNavigate } from 'react-router-dom';

export default function Flake({ setBackend, hunterType, name}) {
  const [gender, setGender] = useState('');
  const [current, setCurrent] = useState({
    hunterType: '',
    name: '',
    gender: '',
    look: '',
    feature: '',
    gear: '',
    moves: {},
    charm:0,
    cool:0,
    sharp:0,
    tough:0,
    weird:0,
    image: spellSlingerImage
  });
  useEffect(() => {
    // setSelectedMove(new Set([magicMoves[0].name]));
    setCurrent((prevState) => ({
      ...prevState,
      ['hunterType']: hunterType,
      ['name']: name,
      ['gender']: gender,
    }));
    return () => {
      // Cleanup code when the component unmounts or before the next effect runs
    };
  }, [name, hunterType, gender]);
  const [selectedMove, setSelectedMove] = useState(new Set());
  const [hoverMove, setHoverMove] = useState('Hover over for description');
  const [selectedGear, setSelectedGear] = useState(new Set());
  const [selectedGear2, setSelectedGear2] = useState(new Set());
  const [hoverGear, setHoverGear] = useState('Hover over for description');
  
  const myGenders = ["Woman", "Man", "Transgressive", "Concealed"]
  const hunterLook = ["Ratty Clothes", "Casual Clothes", "Rumpled Suit", "Neat Clothes", "Comfortable Clothes", "Army Surplus Gear"]
  const hunterFeatures = ["Wild eyes", "Moving eyes", "Focused eyes", "Searching eyes", "Suspicious eyes", "Wide eyes", "Guarded eyes"]
  const hunterGear = [
    {base:true, name:".38 revolver",harm:2,distance:'close',subtle:"reload",sounds:'loud'}, 
    {base:true, name:"9mm",harm:2,distance:'hand',subtle:"",sounds:'loud'}, 
    {base:true, name:"Hunting rifle",harm:2,distance:'hand',subtle:"messy",sounds:'loud'},
    {base:true, name:"Magnum",harm:3,distance:'hand',subtle:"reload",sounds:'loud'},
    {base:true, name:"Shotgun",harm:3,distance:'hand',subtle:"messy",sounds:'loud'},
    {base:true, name:"Big knife",harm:1,distance:'hand',subtle:"",sounds:'none'},

    {base:false, name:"Throwing Knives",harm:1,distance:'close',subtle:"many",sounds:'none'},
    {base:false, name:"Holdout Pistol",harm:2,distance:'close',subtle:"reload",sounds:'loud'},
    {base:false, name:"Garrote",harm:3,distance:'intimate',subtle:"",sounds:'none'},
    {base:false, name:"Watchman's Flashlight",harm:1,distance:'hand',subtle:"",sounds:'none'},
    {base:false, name:"Weighted Gloves/Brass Knuckles",harm:1,distance:'hand',subtle:"",sounds:'none'},
    {base:false, name:"Butterfly Knife/Folding Knife",harm:1,distance:'hand',subtle:"",sounds:'none'}
  ]
  
  const flakeMoves = [
    {name:'Connect the Dots', description:[`At the beginning of each mystery,
    if you look for the wider patterns that current
    events might be part of, roll +Sharp. On a 10+ hold
    3, and on a 7-9 hold 1. Spend your hold during the
    mystery to ask the Keeper any one of the following
    questions:
    • Is this person connected to current events more
    than they are saying?
    • When and where will the next critical event
    occur?
    • What does the monster want from this person?
    • Is this connected to previous mysteries we have
    investigated?
    • How does this mystery connect to the bigger
    picture?`]},
    {name:'Crazy Eyes', description:[`You get +1 Weird (max +3).`]},
    {name:'See, It All Fits Together', description:[`You can use Sharp instead of Charm when you manipulate someone.`]},,
    {name:'Suspicious Mind', description:[`If someone lies to you, you know it.`]},
    {name:'Often Overlooked', description:[`When you act all crazy to avoid
    something, roll +Weird. On a 10+ you’re regarded as
    unthreatening and unimportant. On a 7-9, pick one:
    unthreatening or unimportant. On a miss, you draw
    lots (but not all) of the attention`]},
    {name:'Contrary', description:[`When you seek out and receive someone’s honest advice on the best course of action for
    you and then do something else instead, mark experience. If you do exactly the opposite of their advice,
    you also take +1 ongoing on any moves you make
    pursuing that course.`]},
    {name:'Net Friends', description:[`You know a lot of people on the Internet. When you contact a net friend to help you with
    a mystery, roll +Charm. On a 10+, they’re available
    and helpful—they can fix something, break a code,
    hack a computer, or get you some special information. On a 7-9, they’re prepared to help, but it’s either
    going to take some time or you’re going to have to do
    part of it yourself. On a miss, you burn some bridges`]},
    {name:'Sneaky',description:[`When you attack from ambush, or from behind, inflict +2 harm.`]}
  ]

  const handleDropDownChange = (event, mySetterKey) => {
    setCurrent((prevState) => ({
      ...prevState,
      [mySetterKey]: event.target.value
    }));
  };

  const basicDropDown = (label, mySetterKey, options, handleChange) => {
    return (
      <div>
        {/* <label>{label}:</label> */}
        <select defaultValue="" onChange={(event) => handleChange(event, mySetterKey)}>
          <option value="" disabled>Select {label}</option>
          {options.map((option, index) => {
            // Handle different structure of options for 'hunterGear' and others.
            const value = typeof option === 'object' ? option.name : option;
            return (
              <option key={index} value={value}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  const handleGearHover = (flakeObject) => {
    let hoverText = '';
    
    if (flakeObject.harm !== 0) {
      hoverText += `Harm: ${flakeObject.harm}, `;
    }
    if (flakeObject.armor !== 0) {
      hoverText += `Armor: ${flakeObject.armor}, `;
    }
    if (flakeObject.base) {
      hoverText += `${flakeObject.type} `;
      hoverText += `${flakeObject.distance} `;
      hoverText += `${flakeObject.subtle} `;
      hoverText += `${flakeObject.sounds} `;
    } else {
      hoverText += `${flakeObject.effects} `;
    }
    
    setHoverGear(hoverText.trimEnd());
  }

  const handleRatingChange = (e) => {
    // Parse the selected option value back into an object
    const newAttributes = JSON.parse(e.target.value);
    
    // Update the current state with the new attributes
    setCurrent(prevState => ({
      ...prevState,
      ...newAttributes
    }));
  };
  
  const handleRatingDropdown = () => {
    return (
      <div>
        <select defaultValue="" onChange={handleRatingChange}>
          <option value="" disabled>Select Ratings</option>
          <option value='{"charm":-1,"cool":1,"sharp":1,"tough":0,"weird":2}'>Charm -1, Cool +1, Sharp +1, Tough 0, Weird +2</option>
          <option value='{"charm":0,"cool":-1,"sharp":1,"tough":1,"weird":2}'>Charm 0, Cool -1, Sharp +1, Tough +1, Weird +2</option>
          <option value='{"charm":-1,"cool":0,"sharp":2,"tough":-1,"weird":2}'>Charm -1, Cool 0, Sharp +2, Tough -1, Weird +2</option>
          <option value='{"charm":1,"cool":0,"sharp":1,"tough":-1,"weird":2}'>Charm +1, Cool 0, Sharp +1, Tough -1, Weird +2</option>
          <option value='{"charm":0,"cool":0,"sharp":1,"tough":0,"weird":2}'>Charm 0, Cool 0, Sharp +1, Tough 0, Weird +2</option>
        </select>
      </div>
    );
  };

  const handleButtonClicked = () => {
    console.log(selectedMove);
    console.log(current)
    // setBackend(previous => [...previous, current]);
    // navigate(`/selectCharacter`);
  }

  const handleCheckboxChange = (event, myObject, mySetter, myKey) => {
    const name = event.target.value;
    let updatedSelection = new Set(myObject);

    if (event.target.checked) {
      updatedSelection.add(name);
    } else {
      updatedSelection.delete(name);
    }

    mySetter(updatedSelection);
    setCurrent((prevState) => ({
        ...prevState,
        [myKey]: updatedSelection
      }));
  };

  const handleFlakeHover = (flakeObject) => {
    let hoverText = '';
    hoverText += `Harm: ${flakeObject.description}, `;
    setHoverMove(hoverText.trimEnd());
  }
  
  return (
    <div className='margin-all'>
      {basicDropDown("Gender", "gender", myGenders, handleDropDownChange)}
      {basicDropDown("Look", "look", hunterLook, handleDropDownChange)}
      {basicDropDown("Features", "feature", hunterFeatures, handleDropDownChange)}
      {handleRatingDropdown('test')}

      <h3>Combat Gear: You get one Normal and two Hidden.</h3>
      <div className='flex margin-left text-bold'>Normal Weapons:</div>
      <div className='flex'>
        <div className='flex-2'>
        {hunterGear.filter(flakeObject => flakeObject.base).map((flakeObject, index) => (
          <div key={index} className='flex-2'>
            <div 
              className={`margin-right-small no-wrap flex `}
              onMouseEnter={() => handleGearHover(flakeObject)}
              onMouseLeave={() => setHoverGear(``)}
            >   
              <input
                className='flex margin-right-small'
                type="checkbox"
                id={`base-gear-${index}`}
                name={flakeObject.name}
                value={flakeObject.name}
                onChange={(e) => handleCheckboxChange(e, selectedGear, setSelectedGear, 'gear')}
                checked={selectedGear.has(flakeObject.name)}
                disabled={!selectedGear.has(flakeObject.name) && selectedGear.size >= 1}
              />
              <label htmlFor={`base-gear-${index}`} className={`no-wrap flex${selectedGear.has(flakeObject.name) ? ' text-bold' : ''}`}> 
                {flakeObject.base && <span className='margin-right'>{`Normal: ${flakeObject.name}`}</span>}
                {!flakeObject.base && <span>{`Hidden: ${flakeObject.name}`}</span>}
              </label>
            </div>
          </div>
        ))}
        </div>
        <div className='flex-4'>{hoverGear}</div>
      </div>

      <div className='flex margin-left text-bold'>Hidden Weapons:</div>
      <div className='flex'>
        <div className='flex-2'>
        {hunterGear.filter(flakeObject => !flakeObject.base).map((flakeObject, index) => (
          <div key={index} className='flex-2'>
            <div 
              className={`margin-right-small no-wrap flex `}
              onMouseEnter={() => handleGearHover(flakeObject)}
              onMouseLeave={() => setHoverGear(``)}
            >   
              <input
                className='flex margin-right-small'
                type="checkbox"
                id={`hidden-gear-${index}`}
                name={flakeObject.name}
                value={flakeObject.name}
                onChange={(e) => handleCheckboxChange(e, selectedGear2, setSelectedGear2, 'gear')}
                checked={selectedGear2.has(flakeObject.name)}
                disabled={!selectedGear2.has(flakeObject.name) && selectedGear2.size >= 2}
              />
              <label htmlFor={`hidden-gear-${index}`} className={`no-wrap flex${selectedGear2.has(flakeObject.name) ? ' text-bold' : ''}`}> 
                {flakeObject.base && <span className='margin-right'>{`Normal: ${flakeObject.name}`}</span>}
                {!flakeObject.base && <span>{`Hidden: ${flakeObject.name}`}</span>}
              </label>
            </div>
          </div>
        ))}       

        </div>
      </div>
      


      <h3>Flake Moves, Pick three</h3>
      <div className='flex'>
        <div className='flex-2'>
        {flakeMoves.map((flakeObject, index) => (
          <div key={index} className='flex-2'>
            <div 
              className={`margin-right-small no-wrap flex `}
              onMouseEnter={() => handleFlakeHover(flakeObject)}
              onMouseLeave={() => setHoverMove(``)}
            >   
              <input
                className='flex margin-right-small'
                type="checkbox"
                id={`base-flake-${index}`}
                name={flakeObject.name}
                value={flakeObject.name}
                onChange={(e) => handleCheckboxChange(e, selectedMove, setSelectedMove, 'flake')}
                checked={selectedMove.has(flakeObject.name)}
                disabled={!selectedMove.has(flakeObject.name) && selectedMove.size >= 3}
              />
              <label htmlFor={`base-flake-${index}`} className={`no-wrap flex${selectedMove.has(flakeObject.name) ? ' text-bold' : ''}`}> 
                {flakeObject.name && <span className='margin-right'>{`${flakeObject.name}`}</span>}
              </label>
            </div>
          </div>
        ))}
        </div>
        <div className='flex-4'>{hoverMove}</div>
      </div>

      <div>
        <button onClick={handleButtonClicked}>{`Create Character`}</button>
      </div>
    </div>
  )
}
