import React, { useState, useEffect } from 'react';
import useCharacter from '../customHooks/useCharacter'
import spellSlingerImage from '../../images/spellSlinger.jpg';

import { useNavigate } from 'react-router-dom';

export default function SpellSlinger({ setBackend, hunterType, name}) {
  const navigate = useNavigate();
  const myGenders = ["Woman", "Man", "Androgynous"]
  const [current, setCurrent] = useCharacter(spellSlingerImage);

  useEffect(() => {
    setCurrent((prevState) => ({
      ...prevState,
      ['hunterType']: hunterType,
      ['name']: name,
    }));
  }, [name, hunterType]);

  useEffect(() => {
    setSelectedMove({[magicMoves[0].name]: magicMoves[0]});
  }, []);

  const [selectedMagic, setSelectedMagic] = useState(new Set());
  const [selectedBaseMagic, setSelectedBaseMagic] = useState(new Set());

  const [selectedMove, setSelectedMove] = useState(new Set());
  const [hoverMagic, setHoverMagic] = useState('Hover over items for description');
  
  const hunterLook = ["Rumpled clothes", "Stylish clothes", "Goth clothes", "Old Fashioned clothes"]
  const hunterFeatures = ["Shadowed eyes", "Fierce eyes", "Weary eyes", "Sparkling eyes"]
  const hunterGear = [
    {name:"Old Revolver",harm:2,distance:'close',subtle:"reload",sounds:'loud'}, 
    {name:"Ritual Knife",harm:1,distance:'hand',subtle:"",sounds:''}, 
    {name:"Heirloom Sword",harm:2,distance:'hand',subtle:"messy",sounds:''}
  ]
  const magicalElements = [
    {base:true, 
      name: 'Blast', 
      type:'magic', 
      harm:2, 
      distance:'close',
      armor:0, 
      subtle:'obvious', 
      sounds:'loud'
    },
    {base:true, 
      name: 'Ball', 
      type:'magic', 
      harm:1, 
      distance:'area close',
      armor:0, 
      subtle:'obvious', 
      sounds:'loud'
    },
    {base:true, 
      name: 'Missile', 
      type:'magic',
      harm:1,
      distance:'far',
      armor:0,
      subtle:'obvious',
      sounds:'loud'
    },
    {base:true,
      name: 'Wall',
      type:'magic',
      harm:1,
      distance:'barrier',
      armor:1,
      subtle:'obvious',
      sounds:'loud'},
    {base:false,
      name: 'Fire',
      type:'effect',
      harm:2,
      armor:0,
      effects:'If you get a 10+ on a combat magic roll, the fire won’t spread'
    },
    {base:false,
      name: 'Force or Wind',
      type:'effect',
      harm:1,
      armor:1,
      effects:'Add “+1 harm forceful” to a base, or “+1 armour” to a wall'
    },
    {base:false,
      name: 'Lightning or Entropy',
      type:'effect',
      harm:1,
      armor:0,
      effects:'Add “+1 harm messy” to a base'},
    {base:false,
      name: 'Frost or Ice',
      type:'effect',
      harm:1,
      armor:2,
      effects:'Adds “-1 harm +2 armour” to a wall, or “+1 harm restraining” to other bases'
    },
    {base:false,
      name: 'Earth',
      type:'effect',
      harm:0,
      armor:0,
      effects:'Add “forceful restraining” to a base'
    },
    {base:false,
      name: 'Necromantic',
      type:'effect',
      harm:0,
      armor:0,
      effects:'Add “life-drain” to a base'
    },
  ]
  const myIntroductionGuidence = `Introduce your
  Spell-slinger by name and look, and tell the group what
  they know about you.`
  const myHistoryGuidence = `Pick one for
  each of the other hunters:
  • They act as your conscience when the power goes
  to your head. Ask them about the last time this happened.
  • Blood relation, though you were out of contact for
  years. Ask them how they reconnected with you.
  • Mentor from another life. Ask them what they
  taught you.
  • Your magic-fueled rescue of them introduced them
  to the supernatural. Tell them what creature was
  after them.
  • An old rivalry has turned into a tight friendship. Tell
  them what you once fought over.
  • You thought they were dead, and now they’re back.
  What “killed” them?
  • They’re an on-again/off-again love interest. Ask
  them what keeps you apart. Tell them what keeps
  you together.
  • A comrade-in-arms. You’ve faced the biggest threats
  together.`
  const magicMoves = [
    {name:'Tools and Techniques', description:`To use your combat magic effectively, you rely on a collection of tools and techniques. Cross off one; you’ll need the rest.',\n'Consumables: You need certain supplies— powders, oils, etc—on hand, some will be used up each cast. If you don’t have them, take 1-harm ignore-armour when you cast',\n'Foci: You need wands, staves, and other obvious props to focus. If you don’t have what you need, your combat magic does 1 less harm.',\n'Gestures: You need to wave your hands around to use combat magic. If you’re restrained, take -1 ongoing for combat magic.',\n'Incantations: You must speak in an arcane language to control your magic. If you use combat magic without speaking, act under pressure to avoid scrambling your thoughts.`},
    {name:'Advanced Arcane Training', description:'If you have two of your three Tools and Techniques at the ready, you may ignore the third one.'},
    {name:'Arcane Reputation', description:'Pick three big organizations or groups in the supernatural community, which can include some of the more sociable types of monsters. They’ve heard of you and respect your power. With affected humans, take +1 forward when you manipulate them. You may manipulate affected monsters as if they were human, with no bonus.'},
    {name:'Could have been worse', description:'When you miss a use magic roll you can choose one of the following options instead of losing control of the magic.  Fizzle: The preparations and materials for the spell are ruined. You’ll have to start over from scratch with the prep time doubled.  This Is Gonna Suck: The effect happens, but you trigger all of the listed glitches but one. You pick the one you avoid.'},
    {name:'Enchated Clothing', description:'Pick an article of every-day clothing–it’s enchanted without any change in appearance. Take -1 harm from any source that tries to get at you through the garment.'},
    {name:'Forensic Divination', description:'When you successfully investigate a mystery, you may ask “What magic was done here?” as a free extra question.'},
    {name:'Go Big or Go Home',description:'When you must use magic as a requirement for Big Magic, take +1 ongoing to those use magic rolls.'},
    {name:'Noy my fault',description:'+1 to act under pressure when you are dealing with the consequences of your own spellcasting.'},
    {name:'Practitioner',description:'Choose two effects available to you under use magic. Take +1 to use magic whenever you choose one of those effects.'},
    {name:'Shield Spell',description:'When you protect someone, gain 2-armour against any harm that is transferred to you. This doesn’t stack with your other armour, if any'},
    {name:'Third Eye',description:'When you read a bad situation, you can open up your third eye for a moment to take in extra information. Take +1 hold on any result of 7 or more, plus you can see invisible things. On a miss, you may still get 1 hold, but you’re exposed to supernatural danger. Unfiltered hidden reality is rough on the mind!'}]

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
            const value = typeof option === 'object' ? option : option;
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
  const specialGearDropdown = (label, myGear) => {
    const handleSelectChange = (event) => {
      handleGearChange(event.target.value, myGear);
    };
    
    return (
      <div>
        <select defaultValue="" onChange={handleSelectChange}>
          <option value="" disabled>Select {label}</option>
          {myGear.map((option, index) => {
            // Use index as the value for the option
            return (
              <option key={index} value={index}>
                {`${option.name}: Harm${option.harm}, ${option.distance}, ${option.subtle} ${option.sounds}`}
              </option>
            );
          })}
        </select>
      </div>
    );
  };
  
  const handleGearChange = (selectedIndex, gearArray) => {
    // Parse selectedIndex to an integer since values from the DOM are strings
    const index = parseInt(selectedIndex, 10);
    // Use the index to get the object from gearArray
    const selectedGear = gearArray[index];
  
    setCurrent((prevState) => ({
      ...prevState,
      gear: {
        ...prevState.gear, // Preserve existing content of 'gear', if necessary
        [selectedGear.name]: selectedGear
      }
    }));
  };
  
  

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
    console.log(selectedMagic);
    console.log(current)
    setBackend(previous => [...previous, current]);
    navigate(`/selectCharacter`);
  }

  const handleCheckboxChange = (event, myObject, mySetter, myKey) => {
    const name = event.target.value;
    let description = '';
    
    // Determine description based on the 'myKey' value
    if (myKey === 'magic') {
      description = magicalElements.find(element => element.name === name);
    } else {
      description = magicMoves.find(magicMove => magicMove.name === name);
    }
    
    // Do not allow unchecking if it is the first item of magicMoves
    if (myKey !== 'magic' && name === magicMoves[0].name && !event.target.checked) {
      return;
    }
  
    // Update selection based on the checkbox state
    let updatedSelection = { ...myObject };
    if (event.target.checked) {
      updatedSelection[name] = description;
    } else {
      delete updatedSelection[name];
    }
    mySetter(updatedSelection);
    setCurrent((prevState) => ({
      ...prevState,
      [myKey]: updatedSelection
    }));
  };
  
  

  const handleMagicHover = (magicObject) => {
    let hoverText = '';
    
    if (magicObject.harm !== 0) {
      hoverText += `Harm: ${magicObject.harm}, `;
    }
    if (magicObject.armor !== 0) {
      hoverText += `Armor: ${magicObject.armor}, `;
    }
    if (magicObject.base) {
      hoverText += `${magicObject.type} `;
      hoverText += `${magicObject.distance} `;
      hoverText += `${magicObject.subtle} `;
      hoverText += `${magicObject.sounds} `;
    } else {
      hoverText += `${magicObject.effects} `;
    }
    
    setHoverMagic(hoverText.trimEnd());
  }
  
  const spellSlingerMoves = () => {
    return <>
      {magicMoves.map((move, index) => (
        <div
          className='flex-2'
          key={index}
          onMouseEnter={() => setHoverMagic(move.description)}
          onMouseLeave={() => setHoverMagic('Hover over items for description')}
        >
          <div className='flex' >
            <input
              type="checkbox"
              id={`spell-move-${index}`}
              name={move.name}
              value={move.name}
              onChange={(e) => handleCheckboxChange(e, selectedMove, setSelectedMove, 'move')}
              checked={move.name in selectedMove} 
              disabled={!((move.name in selectedMove) || Object.keys(selectedMove).length < 4)}
            />
            <label htmlFor={`spell-move-${index}`} className={`no-wrap flex${move.name in selectedMove ? ' text-bold' : ''}`}> 
              {move.name && <span className='margin-right'>{`${move.name}`}</span>}
            </label>
            </div>
        </div>
      ))}
    </>
  }

  const magicEffects = () => {
    return <>
      {magicalElements.filter(magicObject => !magicObject.base).map((magicObject, index) => (
        <div key={index} className='flex-2'>
          <div 
            className={`margin-right-small no-wrap flex `}
            onMouseEnter={() => handleMagicHover(magicObject)}
            onMouseLeave={() => setHoverMagic(`Hover over items for description`)}
          >   
            <input
              className='flex margin-right-small'
              type="checkbox"
              id={`effect-magic-${index}`}
              name={magicObject.name}
              value={magicObject.name}
              onChange={(e) => handleCheckboxChange(e, selectedMagic, setSelectedMagic, 'magic')}
              checked={magicObject.name in selectedMagic} 
              disabled={!((magicObject.name in selectedMagic) || Object.keys(selectedMagic).length >= 1 && Object.keys(selectedMagic).length < 3) } 
            />
            <label htmlFor={`effect-magic-${index}`} className={`no-wrap flex${magicObject.name in selectedMagic ? ' text-bold' : ''}`}> 
              {!magicObject.base && <span className='margin-right'>{`${magicObject.name}`}</span>}
            </label>
          </div>
        </div>
      ))}
    </>
  }

  const magicBases = () => {
    return <>
      {magicalElements.filter(magicObject => magicObject.base).map((magicObject, index) => (
        <div key={index} className='flex-2'>
          <div 
            className={`margin-right-small no-wrap flex `}
            onMouseEnter={() => handleMagicHover(magicObject)}
            onMouseLeave={() => setHoverMagic(`Hover over items for description`)}
          >   
            <input
              className='flex margin-right-small'
              type="checkbox"
              id={`base-magic-${index}`}
              name={magicObject.name}
              value={magicObject.name}
              onChange={(e) => {
                handleCheckboxChange(e, selectedMagic, setSelectedMagic, 'magic');
                handleCheckboxChange(e, selectedBaseMagic, setSelectedBaseMagic, 'magic');
              }}
              checked={magicObject.name in selectedMagic} 
              disabled={!((magicObject.name in selectedMagic) || Object.keys(selectedMagic).length < 3)} 
            />
            <label htmlFor={`base-magic-${index}`} className={`no-wrap flex${magicObject.name in selectedMagic ? ' text-bold' : ''}`}> 
              {magicObject.base && <span className='margin-right'>{`${magicObject.name}`}</span>}
            </label>
          </div>
        </div>
      ))}
    </>
  }

  const historyIntro = () => {
    return <>
      <div>
        <div className='container-intro margin-top'>Introduction</div>
        <textarea
          placeholder='Click here to add an intoduction.'
          className='input-intro'
          onChange={(e) => handleDropDownChange(e, 'introduction')}
          onMouseEnter={() => setHoverMagic(myIntroductionGuidence)}
          onMouseLeave={() => setHoverMagic(`Hover over Moves for descriptions`)}
        ></textarea>
      </div>
      <div>
        <div className='container-intro margin-top'>History</div>
        <textarea 
          placeholder='Click here to add your history.'
          className='input-intro'
          onChange={(e) => handleDropDownChange(e, 'history')}
          onMouseEnter={() => setHoverMagic(myHistoryGuidence)}
          onMouseLeave={() => setHoverMagic(`Hover over Moves for descriptions`)}
        ></textarea>
      </div>
    </>
  }

  return (
    <div className='margin-all'>
      
      {basicDropDown("Gender", "gender", myGenders, handleDropDownChange)}
      {basicDropDown("Look", "look", hunterLook, handleDropDownChange)}
      {basicDropDown("Features", "feature", hunterFeatures, handleDropDownChange)}
      {specialGearDropdown("Backup weapon", hunterGear)}
      {handleRatingDropdown()}

      <div className='flex'>
        <div className='flex-2 collumn'>
          <h3 className='flex-centered'>Combat magic (pick three)</h3>
          <div className='flex margin-left text-bold'>Base Magic (at least one):</div>
          <div>{magicBases()}</div>
          <div className='flex margin-left text-bold'>Effects:</div>
          <div>{magicEffects()}</div>
        </div>
        <div className='flex-2 collumn'>
          <h3 className='flex-centered'>Spell-slinger moves (pick 3 more)</h3>
          <div className='flex margin-left text-bold'>Pick three more...</div>
          <div>{spellSlingerMoves()}</div>
        </div>
        <div className='flex-2 collumn'>
          <h3 className='flex-centered'>Create your History</h3>
          <div className=''>{historyIntro()}</div>
        </div>
      </div>
      <div><button onClick={handleButtonClicked}>{`Create Character`}</button></div>
      <div className='flex-4 container-description'>{hoverMagic}</div>
    </div>
  )
}
