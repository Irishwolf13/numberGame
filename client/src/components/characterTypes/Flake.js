import React, { useState, useEffect } from 'react';
import flake1 from '../../images/flake1.jpg';
import { useNavigate } from 'react-router-dom';

export default function Flake({ setBackend, hunterType, name}) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState({
    hunterType: '',
    name: '',
    gender: '',
    look: '',
    feature: '',
    gear: {},
    magic: {},
    moves: {},
    charm:0,
    cool:0,
    sharp:0,
    tough:0,
    weird:0,
    introduction: '',
    history: '',
    image: flake1
  });
  useEffect(() => {
    setCurrent((prevState) => ({
      ...prevState,
      ['hunterType']: hunterType,
      ['name']: name,
    }));
  }, [name, hunterType]);

  const [selectedMove, setSelectedMove] = useState(new Set());
  const [hoverMove, setHoverMove] = useState('Hover over Moves for descriptions');
  const [hoverGear, setHoverGear] = useState('Hover over Weapons for descriptions');
  
  const [selectedGear, setSelectedGear] = useState(new Set());
  const [selectedGear2, setSelectedGear2] = useState(new Set());
  useEffect(() => {
    const combinedGearSelection = {
      ...selectedGear,
      ...selectedGear2
    };
    setCurrent(previous => ({ ...previous, gear: combinedGearSelection }));
  }, [selectedGear, selectedGear2]);
  
  const myGenders = ["Woman", "Man", "Transgressive", "Concealed"]
  const hunterLook = ["Ratty Clothes", "Casual Clothes", "Rumpled Suit", "Neat Clothes", "Comfortable Clothes", "Army Surplus Gear"]
  const hunterFeatures = ["Wild eyes", "Moving eyes", "Focused eyes", "Searching eyes", "Suspicious eyes", "Wide eyes", "Guarded eyes"]
  const hunterGear = [
    {base:true, name:".38 revolver",harm:2,distance:'close',subtle:"reload",sounds:'loud',description:''}, 
    {base:true, name:"9mm",harm:2,distance:'hand',subtle:"",sounds:'loud',description:''}, 
    {base:true, name:"Hunting rifle",harm:2,distance:'hand',subtle:"messy",sounds:'loud',description:''},
    {base:true, name:"Magnum",harm:3,distance:'hand',subtle:"reload",sounds:'loud',description:''},
    {base:true, name:"Shotgun",harm:3,distance:'hand',subtle:"messy",sounds:'loud',description:''},
    {base:true, name:"Big knife",harm:1,distance:'hand',subtle:"",sounds:'',description:''},

    {base:false, name:"Throwing Knives",harm:1,distance:'close',subtle:"many",sounds:'',description:''},
    {base:false, name:"Holdout Pistol",harm:2,distance:'close',subtle:"reload",sounds:'loud',description:''},
    {base:false, name:"Garrote",harm:3,distance:'intimate',subtle:"",sounds:'',description:''},
    {base:false, name:"Watchman's Flashlight",harm:1,distance:'hand',subtle:"",sounds:'',description:''},
    {base:false, name:"Weighted Gloves/Brass Knuckles",harm:1,distance:'hand',subtle:"",sounds:'',description:''},
    {base:false, name:"Butterfly Knife/Folding Knife",harm:1,distance:'hand',subtle:"",sounds:'',description:''}
  ]
  const myIntroductionGuidence = `Introduce your
  Flake by name and look, and tell the group what they
  know about you.`
  const myHistoryGuidence = `Pick one of
  these for each other hunter:
  • They’re somehow tied into it all. You’ve been keeping
  an eye on them.
  • They’re a close relative. Ask them to decide exactly
  what.
  • Old friends, who originally met through a long chain
  of coincidences.
  • You went through hell together: maybe a monster,
  maybe military service, maybe time in an institution.
  Whatever it was, it bound you together, and you
  have total trust in each other.
  • Members of the same support group.
  • Fellow freaks.
  • The signs all pointed to working together. So you
  found them and now you work together.
  • You know each other through cryptozoology and
  conspiracy theory websites.`
  
  const myMoves = [
    {name:'Connect the Dots', description:`At the beginning of each mystery,
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
    picture?`},
    {name:'Crazy Eyes', description:`You get +1 Weird (max +3).`},
    {name:'See, It All Fits Together', description:`You can use Sharp instead of Charm when you manipulate someone.`},
    {name:'Suspicious Mind', description:`If someone lies to you, you know it.`},
    {name:'Often Overlooked', description:`When you act all crazy to avoid
    something, roll +Weird. On a 10+ you’re regarded as
    unthreatening and unimportant. On a 7-9, pick one:
    unthreatening or unimportant. On a miss, you draw
    lots (but not all) of the attention`},
    {name:'Contrary', description:`When you seek out and receive someone’s honest advice on the best course of action for
    you and then do something else instead, mark experience. If you do exactly the opposite of their advice,
    you also take +1 ongoing on any moves you make
    pursuing that course.`},
    {name:'Net Friends', description:`You know a lot of people on the Internet. When you contact a net friend to help you with
    a mystery, roll +Charm. On a 10+, they’re available
    and helpful—they can fix something, break a code,
    hack a computer, or get you some special information. On a 7-9, they’re prepared to help, but it’s either
    going to take some time or you’re going to have to do
    part of it yourself. On a miss, you burn some bridges`},
    {name:'Sneaky',description:`When you attack from ambush, or from behind, inflict +2 harm.`}
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
        <select defaultValue="" onChange={(event) => handleChange(event, mySetterKey)}>
          <option value="" disabled>Select {label}</option>
          {options.map((option, index) => {
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

  const handleGearHover = (gearObject) => {
    let hoverText = '';
    
    if (gearObject.harm !== 0) {
      hoverText += `Harm: ${gearObject.harm}, `;
    }
    if (gearObject.armor) {
      hoverText += `Armor: ${gearObject.armor}, `;
    }
    if (gearObject) {
      hoverText += `${gearObject.distance} `;
      hoverText += `${gearObject.subtle} `;
      hoverText += `${gearObject.sounds} `;
    } else {
      hoverText += `${gearObject.effects} `;
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
          <option value='{"charm":1,"cool":1,"sharp":2,"tough":-1,"weird":0}'>Charm +1, Cool +1, Sharp +2, Tough -1, Weird 0</option>
          <option value='{"charm":0,"cool":1,"sharp":2,"tough":-1,"weird":1}'>Charm 0, Cool +1, Sharp +2, Tough -1, Weird +1</option>
          <option value='{"charm":1,"cool":-1,"sharp":2,"tough":1,"weird":0}'>Charm +1, Cool -1, Sharp +2, Tough +1, Weird 0</option>
          <option value='{"charm":1,"cool":-1,"sharp":2,"tough":0,"weird":1}'>Charm +1, Cool -1, Sharp +2, Tough 0, Weird +1</option>
          <option value='{"charm":-1,"cool":-1,"sharp":2,"tough":0,"weird":2}'>Charm -1, Cool -1, Sharp +2, Tough 0, Weird +2</option>
        </select>
      </div>
    );
  };

  const handleButtonClicked = () => {
    setBackend(previous => [...previous, current]);
    console.log(current);
    navigate(`/selectCharacter`);
  }

  const handleCheckboxChange = (event, myObject, mySetter, myKey) => {
    const name = event.target.value;
    let description = '';
    if (myKey === 'moves') {
        description = myMoves.find(move => move.name === name);
    } else {
        description = hunterGear.find(gear => gear.name === name);
    }

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

  const handleFlakeHover = (flakeObject) => {
    let hoverText = '';
    hoverText += `${flakeObject.description}, `;
    setHoverGear(hoverText.trimEnd());
  }

  const gearStandard = () => {
    return <>
      {hunterGear.filter(flakeObject => flakeObject.base).map((flakeObject, index) => (
        <div key={index} className='flex-2'>
          <div 
            className={`margin-right-small no-wrap flex `}
            onMouseEnter={() => handleGearHover(flakeObject)}
            onMouseLeave={() => setHoverGear(`Hover over weapon for descriptions`)}
          >   
            <input
              className='flex margin-right-small'
              type="checkbox"
              id={`base-gear-${index}`}
              name={flakeObject.name}
              value={flakeObject.name}
              onChange={(e) => handleCheckboxChange(e, selectedGear, setSelectedGear, 'gear')}
              checked={flakeObject.name in selectedGear} 
              disabled={!((flakeObject.name in selectedGear) || Object.keys(selectedGear).length < 1)} 
            />
            <label htmlFor={`base-gear-${index}`} className={`no-wrap flex${flakeObject.name in selectedGear ? ' text-bold' : ''}`}> 
              {flakeObject.base && <span className='margin-right'>{`Normal: ${flakeObject.name}`}</span>}
              {!flakeObject.base && <span>{`Hidden: ${flakeObject.name}`}</span>}
            </label>
          </div>
        </div>
      ))}
    </>
  }

  const gearHidden = () => {
    return <>
      {hunterGear.filter(flakeObject => !flakeObject.base).map((flakeObject, index) => (
        <div key={index} className='flex-2'>
          <div 
            className={`margin-right-small no-wrap flex `}
            onMouseEnter={() => handleGearHover(flakeObject)}
            onMouseLeave={() => setHoverGear(`'Hover over Weapons for descriptions'`)}
          >   
            <input
              className='flex margin-right-small'
              type="checkbox"
              id={`hidden-gear-${index}`}
              name={flakeObject.name}
              value={flakeObject.name}
              onChange={(e) => handleCheckboxChange(e, selectedGear2, setSelectedGear2, 'gear')}
              checked={flakeObject.name in selectedGear2} 
              disabled={!((flakeObject.name in selectedGear2) || Object.keys(selectedGear2).length < 2)} 
            />
            <label htmlFor={`hidden-gear-${index}`} className={`no-wrap flex${flakeObject.name in selectedGear2 ? ' text-bold' : ''}`}> 
              {flakeObject.base && <span className='margin-right'>{`Normal: ${flakeObject.name}`}</span>}
              {!flakeObject.base && <span>{`Hidden: ${flakeObject.name}`}</span>}
            </label>
          </div>
        </div>
      ))}
    </>
  }

  const flakeMoves = () => {
    return <>
      {myMoves.map((myObject, index) => (
        <div key={index} className='flex-2'>
          <div 
            className={`margin-right-small no-wrap flex `}
            onMouseEnter={() => handleFlakeHover(myObject)}
            onMouseLeave={() => setHoverGear(`Hover over Moves for descriptions`)}
          >   
            <input
              className='flex margin-right-small'
              type="checkbox"
              id={`base-flake-${index}`}
              name={myObject.name}
              value={myObject.name}
              onChange={(e) => handleCheckboxChange(e, selectedMove, setSelectedMove, 'moves')}
              checked={myObject.name in selectedMove} 
              disabled={!((myObject.name in selectedMove) || Object.keys(selectedMove).length < 3)}
            />
            <label htmlFor={`base-flake-${index}`} className={`no-wrap flex${myObject.name in selectedMove ? ' text-bold' : ''}`}> 
              {myObject.name && <span className='margin-right'>{`${myObject.name}`}</span>}
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
          onMouseEnter={() => setHoverGear(myIntroductionGuidence)}
          onMouseLeave={() => setHoverGear(`Hover over Moves for descriptions`)}
        ></textarea>
      </div>
      <div>
        <div className='container-intro margin-top'>History</div>
        <textarea 
          placeholder='Click here to add your history.'
          className='input-intro'
          onChange={(e) => handleDropDownChange(e, 'history')}
          onMouseEnter={() => setHoverGear(myHistoryGuidence)}
          onMouseLeave={() => setHoverGear(`Hover over Moves for descriptions`)}
        ></textarea>
      </div>
    </>
  }
  
  return (
    <div className='margin-all'>
      {basicDropDown("Gender", "gender", myGenders, handleDropDownChange)}
      {basicDropDown("Look", "look", hunterLook, handleDropDownChange)}
      {basicDropDown("Features", "feature", hunterFeatures, handleDropDownChange)}
      {handleRatingDropdown('test')}

      <div className='flex'>
        <div className='flex-2 collumn'>
          <h3 className='flex-centered'>Pick one Normal Weapon and two Hidden Weapons.</h3>
          <div className='flex margin-left text-bold'>Normal Weapons:</div>
          <div>{gearStandard()}</div>
          <div className='flex margin-left text-bold'>Hidden Weapons:</div>
          <div>{gearHidden()}</div>
        </div>
        <div className='flex-2 collumn'>
          <h3 className='flex-centered'>Pick Three Flake Moves</h3>
          <div>{flakeMoves()}</div>
        </div>
      <div className='flex-2 collumn'>
          <h3 className='flex-centered'>Create your History</h3>
          <div className=''>{historyIntro()}</div>
        </div>
      </div>
      <div><button onClick={handleButtonClicked}>{`Create Character`}</button></div>
      <div className='flex-4 container-description'>{hoverGear}</div> {/* This bit is where the description will go */}
    </div>
  )
}
