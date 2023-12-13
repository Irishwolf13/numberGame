import React, { useState, useEffect } from 'react';
import choosen1 from '../../images/choosen1.jpg';
import { useNavigate } from 'react-router-dom';

export default function Choosen({ setBackend, hunterType, name}) {
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
    fate: {},
    charm:0,
    cool:0,
    sharp:0,
    tough:0,
    weird:0,
    introduction: '',
    history: '',
    image: choosen1
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
  const [selectedGear3, setSelectedGear3] = useState(new Set());
  const [selectedFate, setSelectedFate] = useState(new Set());
  useEffect(() => {
    const combinedGearSelection = {
      ...selectedGear,
      ...selectedGear2,
      ...selectedGear3
    };
    setCurrent(previous => ({ ...previous, gear: combinedGearSelection }));
  }, [selectedGear, selectedGear2, selectedGear3]);
  
  const myGenders = ["Woman", "Man", "Girl", "Boy", "Androgynous"]
  const hunterLook = ["Fresh Face", "Haggard Face", "Young Face", "Haunted Face", "Hopeful Face", "Controlled Face", ]
  const hunterFeatures = ["Nightmares and Visions", "Some weirdo told you", "An ancient cult found you", "Sought out by your nemesis", "Attacked by monsters", "Trained from birth", "You found the prophecy", ]
  const hunterGear = [
    {base:true, name:"Staff", harm: 1 ,distance:'hand/close', subtle:"", sounds:'', description:''},
    {base:true, name:"Haft", harm: 2 ,distance:'hand', subtle:"heavy", sounds:'', description:''},
    {base:true, name:"Handle", harm: 1 ,distance:'hand', subtle:"balanced", sounds:'', description:''},
    {base:true, name:"Chain", harm: 1 ,distance:'hand', subtle:"area", sounds:'', description:''},

    {base:false, name:"Artifact",harm: 0 ,distance:'',subtle:"magic",sounds:'',description:''},
    {base:false, name:"Spikes",harm: 1 ,distance:'',subtle:"messy",sounds:'',description:''},
    {base:false, name:"Blade",harm: 1 ,distance:'close',subtle:"",sounds:'',description:''},
    {base:false, name:"Heavy",harm: 1 ,distance:'',subtle:"",sounds:'',description:''},
    {base:false, name:"Long",harm: 0 ,distance:'close',subtle:"",sounds:'',description:''},
    {base:false, name:"Throwable",harm: 0 ,distance:'close',subtle:"",sounds:'',description:''},
    {base:false, name:"Chain",harm: 0 ,distance:'',subtle:"area",sounds:'',description:''},
  ]
  const myFate = [
    {heroic:true, name:"Sacrifice",description:'Sacrifice'},
    {heroic:true, name:"You are the Champion",description:'You are the Champion'},
    {heroic:true, name:"Vision",description:'Vision'},
    {heroic:true, name:"Secret training",description:'Secret training'},
    {heroic:true, name:"Magical powers",description:'Magical powers'},
    {heroic:true, name:"Mystical inheritance",description:'Mystical inheritance'},
    {heroic:true, name:"A normal life",description:'A normal life'},
    {heroic:true, name:"True Love",description:'True Love'},
    {heroic:true, name:"You can save the world",description:'You can save the world'},
    {heroic:true, name:"Hidden allies",description:'Hidden allies'},
    {heroic:true, name:"The end of monsters",description:'The end of monsters'},
    {heroic:true, name:"Divine help",description:'Divine help'},

    {heroic:false, name:"Death",description:``},
    {heroic:false, name:"You can't save everyone",description:`You can't save everyone`},
    {heroic:false, name:"Impossible love",description:`Impossible love`},
    {heroic:false, name:"Failure",description:`Failure`},
    {heroic:false, name:"A nemesis",description:`A nemesis`},
    {heroic:false, name:"No normal life",description:`No normal life`},
    {heroic:false, name:"Loss of loved ones",description:`Loss of loved ones`},
    {heroic:false, name:"Treachery",description:`Treachery`},
    {heroic:false, name:"Doubt",description:`Doubt`},
    {heroic:false, name:"Sympathy with the enemy",description:`Sympathy with the enemy`},
    {heroic:false, name:"Damnation",description:`Damnation`},
    {heroic:false, name:"Hosts of monsters",description:`Hosts of monsters`},
    {heroic:false, name:"The end of days",description:`The end of days`},
    {heroic:false, name:"The source of Evil",description:`The source of Evil`},
  ]
  const hunterGearMaterial = [{name:"Steel"},{name:"Cold Iron"},{name:"Silver"},{name:"Wood"},{name:"Stone"},{name:"Bone"},{name:"Teeth"},{name:"Obsidian"},{name:"Other"},]
  const myIntroductionGuidence = `Introduce your
  Choosen by name and look, and tell the group what they
  know about you.`
  const myHistoryGuidence = `Pick  one of
  these for each other hunter:
  • You are close blood relations. Ask them exactly how
  close.
  • They are destined to be your mentor. Tell them how
  this was revealed.
  • Your best friend in the world, who you trust totally.
  • A rival at first, but you came to a working arrangement.
  • Romantic entanglement, or fated to be romantically
  entangled.
  • Just friends, from school or work or something. Ask
  them what.
  • They could have been the Chosen One instead of you,
  but they failed some trial. Tell them how they failed.
  • You saved their life, back when they didn’t know monsters were real. Tell them what you saved them from.`
  
  const myMoves = [
    {name:'Destiny’s Plaything', description:`At the beginning of each mystery, roll +Weird to see what is revealed about your immediate future. On a 10+, the Keeper will reveal a useful detail about the coming mystery. On a 7-9 you get a vague hint about it. On a miss, something bad is going to happen to you.`},
    {name:'I’m Here For A Reason', description:`I’m Here For A Reason: There’s something you are destined to do. Work out the details with the Keeper, based on your fate. You cannot die until it comes to pass. If you die in play, then you must spend a Luck point. You will then, somehow, recover or be returned to life. Once your task is done (or you use up all your Luck), all bets are off.`},
    {name:'The Big Entrance', description:`When you make a showy entrance into a dangerous situation, roll +Cool. On 10+ everyone stops to watch and listen until you finish your opening speech. On a 7-9, you pick one person or monster to stop, watch and listen until you finish talking. On a miss, you’re marked as the biggest threat by all enemies who are present.`},
    {name:'Devastating', description:`When you inflict harm, you may inflict +1 harm.`},
    {name:'Dutiful', description:`When your fate rears its ugly head, and you act in accordance with any of your fate tags (either heroic or doom) then mark experience. If it’s a heroic tag, take +1 forward.`},
    {name:'Invincible', description:`You always count as having 2-armour. This doesn’t stack with other protection.`},
    {name:'Resilience', description:`You heal faster than normal people. Any time your harm gets healed, heal an extra point. Additionally, your wounds count as 1-harm less for the purpose of the Keeper’s harm moves.`}
  ]

  const fateNote = `Pick two heroic and then two doom tags for your fate from the lists below. This is how your fate will unfold. It’s okay to pick contradictory tags: that means your fate is pulling you both ways. Whenever you mark off a point of Luck, the Keeper will throw something from your fate at you.`

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
          <option value='{"charm":2,"cool":-1,"sharp":1,"tough":2,"weird":-1}'>Charm +2, Cool -1, Sharp +1, Tough +2, Weird -1</option>
          <option value='{"charm":-1,"cool":2,"sharp":1,"tough":2,"weird":-1}'>Charm -1, Cool +2, Sharp +1, Tough +2, Weird -1</option>
          <option value='{"charm":1,"cool":2,"sharp":1,"tough":1,"weird":-1}'>Charm +1, Cool +2, Sharp +1, Tough +1, Weird -1</option>
          <option value='{"charm":-1,"cool":1,"sharp":2,"tough":-1,"weird":2}'>Charm -1, Cool +1, Sharp +2, Tough -1, Weird +2</option>
          <option value='{"charm":1,"cool":2,"sharp":-1,"tough":-1,"weird":2}'>Charm +1, Cool +2, Sharp -1, Tough -1, Weird +2</option>
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
    console.log(myKey)
    if (myKey === 'moves') {
        description = myMoves.find(move => move.name === name);
    }
    if (myKey === 'gear') {
      description = hunterGear.find(gear => gear.name === name);
    }
    if (myKey === 'fate') {
      description = myFate.find(fate => fate.name === name);
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

  const handleChoosenHover = (myObject) => {
    let hoverText = '';
    hoverText += `${myObject.description}, `;
    setHoverGear(hoverText.trimEnd());
  }

  const gearForm = () => {
    return <>
      {hunterGear.filter(myObject => myObject.base).map((myObject, index) => (
        <div key={index} className='flex-2'>
          <div 
            className={`margin-right-small no-wrap flex `}
            onMouseEnter={() => handleGearHover(myObject)}
            onMouseLeave={() => setHoverGear(`Hover over weapon for descriptions`)}
          >   
            <input
              className='flex margin-right-small'
              type="checkbox"
              id={`base-gear-${index}`}
              name={myObject.name}
              value={myObject.name}
              onChange={(e) => handleCheckboxChange(e, selectedGear, setSelectedGear, 'gear')}
              checked={myObject.name in selectedGear} 
              disabled={!((myObject.name in selectedGear) || Object.keys(selectedGear).length < 1)} 
            />
            <label htmlFor={`base-gear-${index}`} className={`no-wrap flex${myObject.name in selectedGear ? ' text-bold' : ''}`}> 
              {myObject.base && <span className='margin-right'>{`${myObject.name}`}</span>}
            </label>
          </div>
        </div>
      ))}
    </>
  }

  const gearBusinessEnd = () => {
    return <>
      {hunterGear.filter(myObject => !myObject.base).map((myObject, index) => (
        <div key={index} className='flex-2'>
          <div 
            className={`margin-right-small no-wrap flex `}
            onMouseEnter={() => handleGearHover(myObject)}
            onMouseLeave={() => setHoverGear(`'Hover over Weapons for descriptions'`)}
          >   
            <input
              className='flex margin-right-small'
              type="checkbox"
              id={`hidden-gear-${index}`}
              name={myObject.name}
              value={myObject.name}
              onChange={(e) => handleCheckboxChange(e, selectedGear2, setSelectedGear2, 'gear')}
              checked={myObject.name in selectedGear2} 
              disabled={!((myObject.name in selectedGear2) || Object.keys(selectedGear2).length < 3)} 
            />
            <label htmlFor={`hidden-gear-${index}`} className={`no-wrap flex${myObject.name in selectedGear2 ? ' text-bold' : ''}`}> 
              {!myObject.base && <span>{`${myObject.name}`}</span>}
            </label>
          </div>
        </div>
      ))}
    </>
  }

  const gearMaterial = () => {
    return <>
      {hunterGearMaterial.map((myObject, index) => (
        <div key={index} className='flex-2'>
          <div 
            className={`margin-right-small no-wrap flex `}
          >   
            <input
              className='flex margin-right-small'
              type="checkbox"
              id={`base-material-${index}`}
              name={myObject.name}
              value={myObject.name}
              onChange={(e) => handleCheckboxChange(e, selectedGear3, setSelectedGear3, 'gear')}
              checked={myObject.name in selectedGear3} 
              disabled={!((myObject.name in selectedGear3) || Object.keys(selectedGear3).length < 1)} 
            />
            <label htmlFor={`base-material-${index}`} className={`no-wrap flex${myObject.name in selectedGear3 ? ' text-bold' : ''}`}> 
              {<span className='margin-right'>{`${myObject.name}`}</span>}
            </label>
          </div>
        </div>
      ))}
    </>
  }

  const ChoosenMoves = () => {
    return <>
      {myMoves.map((myObject, index) => (
        <div key={index} className='flex-2'>
          <div 
            className={`margin-right-small no-wrap flex `}
            onMouseEnter={() => handleChoosenHover(myObject)}
            onMouseLeave={() => setHoverGear(`Hover over Moves for descriptions`)}
          >   
            <input
              className='flex margin-right-small'
              type="checkbox"
              id={`base-choosen-${index}`}
              name={myObject.name}
              value={myObject.name}
              onChange={(e) => handleCheckboxChange(e, selectedMove, setSelectedMove, 'moves')}
              checked={myObject.name in selectedMove} 
              disabled={!((myObject.name in selectedMove) || Object.keys(selectedMove).length < 3)}
            />
            <label htmlFor={`base-choosen-${index}`} className={`no-wrap flex${myObject.name in selectedMove ? ' text-bold' : ''}`}> 
              {myObject.name && <span className='margin-right'>{`${myObject.name}`}</span>}
            </label>
          </div>
        </div>
      ))}
    </>
  }

  const fateForm = () => {
    return <>
      <div className='flex margin-left text-bold'>First pick 2 Heroic</div>
      {myFate.filter(myObject => myObject.heroic).map((myObject, index) => (
        <div key={index} className='flex-2'>
          <div 
            className={`margin-right-small no-wrap flex `}
            onMouseEnter={() => setHoverGear(fateNote)}
            onMouseLeave={() => setHoverGear(`Hover over Moves for descriptions`)}
          >   
            <input
              className='flex margin-right-small'
              type="checkbox"
              id={`heroic-fate-${index}`}
              name={myObject.name}
              value={myObject.name}
              onChange={(e) => handleCheckboxChange(e, selectedFate, setSelectedFate, 'fate')}
              checked={myObject.name in selectedFate} 
              disabled={Object.keys(selectedFate).length >= 2 && !(myObject.name in selectedFate) || Object.keys(selectedFate).length >= 3} 
            />
            <label htmlFor={`heroic-fate-${index}`} className={`no-wrap flex${myObject.name in selectedFate ? ' text-bold' : ''}`}> 
              {myObject.heroic && <span className='margin-right'>{`${myObject.name}`}</span>}
            </label>
          </div>
        </div>
      ))}
    </>
  }

  const fateForm2 = () => {
    return <>
      <div className='flex margin-left text-bold'>Then pick 2 Doom</div>
      {myFate.filter(fateObject => !fateObject.heroic).map((fateObject, index) => (
        <div key={index} className='flex-2'>
          <div 
            className={`margin-right-small no-wrap flex `}
            onMouseEnter={() => setHoverGear(fateNote)}
            onMouseLeave={() => setHoverGear(`Hover over Moves for descriptions`)}
          >   
            <input
              className='flex margin-right-small'
              type="checkbox"
              id={`doom-fate-${index}`}
              name={fateObject.name}
              value={fateObject.name}
              onChange={(e) => handleCheckboxChange(e, selectedFate, setSelectedFate, 'fate')}
              checked={fateObject.name in selectedFate} 
              disabled={Object.keys(selectedFate).length < 2 && !(fateObject.name in selectedFate) || Object.keys(selectedFate).length >= 4 && !(fateObject.name in selectedFate) }
            />
            <label htmlFor={`doom-fate-${index}`} className={`no-wrap flex${fateObject.name in selectedFate ? ' text-bold' : ''}`}> 
              {!fateObject.heroic && <span className='margin-right'>{`${fateObject.name}`}</span>}
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
      {handleRatingDropdown()}

      <div className='flex'>
        <div className='flex-2 collumn'>
          <h3 className='flex-centered'>Create your Special Weapon</h3>
          <div className='flex margin-left text-bold'>Form (choose 1):</div>
          <div>{gearForm()}</div>
          <div className='flex margin-left text-bold'>Business-end (choose 3, add effects):</div>
          <div>{gearBusinessEnd()}</div>
          <div className='flex margin-left text-bold'>Matterial (choose 1):</div>
          <div>{gearMaterial()}</div>
        </div>
        <div className='flex-2 collumn'>
          <h3 className='flex-centered'>Pick Three Choosen Moves</h3>
          <div>{ChoosenMoves()}</div>
          <h3 className='flex-centered'>Choose your fate</h3>
          {basicDropDown("How you found out about your fate", "feature", hunterFeatures, handleDropDownChange)}
          <div className='flex margin-top'>
            <div className='flex-2'>{fateForm()}</div>
            <div className='flex-2'>{fateForm2()}</div>
          </div>
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
