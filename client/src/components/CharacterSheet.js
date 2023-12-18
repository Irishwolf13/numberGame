import React, { useState, useEffect } from 'react';
import comingSoon from '../images/comingSoon.jpg'
import choosen1 from '../images/choosen1.jpg'
import spellSlinger from '../images/spellSlinger.jpg'
import flake1 from '../images/flake1.jpg'

export default function CharacterSheet({ currentCharacter }) {
  const [experienceChecks, setExperienceChecks] = useState([]);
  const [luckChecks, setLuckChecks] = useState([]);
  const [harmChecks, setHarmChecks] = useState([]);
  const showButton = experienceChecks.every((checked) => checked);
  // const standardMoves = [
  //   { name: 'Manipulate Someone',
  //     description:`Once you have given them a reason, tell them what you want them to do and roll +Charm.\n
  //     For a normal person:\n
  //     • On a 10+, then they’ll do it for the reason you gave them. If you asked too much, they’ll tell you the minimum it would take for them to do it (or if there’s no way they’d do it).\n
  //     • On a 7-9, they’ll do it, but only if you do something for them right now to show that you mean it. If you asked too much, they’ll tell you what, if anything, it would take for them to do it.\n
  //     • Advanced: On a 12+ not only do they do what you want right now, they also become your ally for the rest of the mystery (or, if you do enough for them, permanently).\n
  //     For another hunter:\n
  //     • On a 10+, if they do what you ask they mark experience and get +1 forward.\n
  //     • On a 7-9, they mark experience if they do what you ask.\n
  //     • On a miss, it’s up to that hunter to decide how badly you offend or annoy them. They mark experience if they decide not to do what you asked. Monsters and minions cannot normally be manipulated.\n
  //     • Advanced: On a 12+ they must act under pressure to resist your request. If they do what you ask, they mark one experience and take +1 ongoing while doing what you asked. `
  //   },
  //   { name: 'Act Under Pressure',
  //     description:`When you act under pressure, roll+Cool.\n
  //     On a 10+ you do what you set out to.\n
  //     On a 7-9 the Keeper is going to giveyou a worse outcome, hard choice, orprice to pay. \n
  //     Advanced: On a 12+ you may choose to either do what you wanted and something extra, or to do what you wanted to absolute perfection.`
  //   },
  // ] 
  
  useEffect(() => {
    if (currentCharacter.experience) setExperienceChecks(currentCharacter.experience)
    if (currentCharacter.luckChecks) setLuckChecks(currentCharacter.luckChecks)
    if (currentCharacter.harmChecks) setHarmChecks(currentCharacter.harmChecks)

  }, [currentCharacter]);

  const hunterImages = {
    'The Chosen': choosen1,
    "The Crooked": comingSoon, 
    "The Divine": comingSoon, 
    "The Expert": comingSoon, 
    "The Flake": flake1, 
    "The Initiate": comingSoon, 
    "The Monstrous": comingSoon,
    "The Mundane": comingSoon, 
    "The Professional": comingSoon, 
    "The Spell-Slinger": spellSlinger, 
    "The Spooky": comingSoon, 
    "The Wronged": comingSoon
  };
  const characterImageSrc = hunterImages[currentCharacter.hunterType] || comingSoon;

  const handleLevelUp = () => {
    setExperienceChecks([false, false, false, false, false]);
    // Additional level up logic goes here...
  };
  
  const toggleChecks = (index, setter, myArray) => () => {
    setter(myArray.map((checked, i) => (i === index ? !checked : checked)));
  }
  
  const AttributeHolder = ({ attribute, label, onRoll }) => {
    return (
      <div className='attribute-holder'>
        <div className="round">
          {attribute > 0 ? `+${attribute}` : attribute}
        </div>
        <p>{label}</p>
        <button className='roll-button' onClick={onRoll}>Roll</button>
      </div>
    );
  }
  const rollDice = (e, type) => {
    console.log(currentCharacter)
    console.log(type)
  }

  function renderGearItems(gear) {
    if (!gear) return null;
  
    return Object.values(gear).map((item, index) => (
      <div className='flex margin-left' key={index}>
        {item.name && <div className='margin-right-small'> {item.name}: </div>}
        {item.harm !== 0 && <div className='margin-right-small'>Harm+{item.harm}</div>}
        {item.distance && <div className='margin-right-small'> {item.distance} </div>}
        {item.subtle && <div className='margin-right-small'> {item.subtle} </div>}
        {item.sounds && <div className='margin-right-small'> {item.sounds} </div>}
      </div>
    ));
  }
  
  return (
    <div>
      <div className="grid-container">
        <div className='grid-top'>
          <div className="grid-1">
            <div className='line1'><div className='text-bold margin-right-small '>Gender: </div>{currentCharacter?.gender}</div>
            <div className='line2'><div className='text-bold margin-right-small '>Features: </div>{currentCharacter?.feature}</div>
            <div className='line3'><div className='text-bold margin-right-small '>Look: </div> {currentCharacter?.look}</div>
            <div className='level'><div className='text-bold margin-right-small '>Level: </div> {currentCharacter?.level}</div>
          </div>
          <div className="grid-2">
            <div className='characterName'>{currentCharacter?.name}</div>
            <div className='hunterType '>{currentCharacter?.hunterType}</div>
          </div>
          <div className="grid-3"></div>
        </div>
        <div className='grid-mid'>
          <div className="grid-4">
            <div className='Top'>
              <div className='Left'>
                <img className='art-character' src={characterImageSrc} alt="Character Image" />
              </div>
              <div className='Right'>
              <div className='center-vertical'>
                <AttributeHolder attribute={currentCharacter?.charm} label="Charm" onRoll={(e) => rollDice(e, 'charm')} />
                <AttributeHolder attribute={currentCharacter?.cool} label="Cool" onRoll={(e) => rollDice(e, 'cool')} />
                <AttributeHolder attribute={currentCharacter?.sharp} label="Sharp" onRoll={(e) => rollDice(e, 'sharp')} />
                <AttributeHolder attribute={currentCharacter?.tough} label="Tough" onRoll={(e) => rollDice(e, 'tough')} />
                <AttributeHolder attribute={currentCharacter?.weird} label="Weird" onRoll={(e) => rollDice(e, 'weird')} />
              </div>
              </div>
            </div>
            <div className='Bottom'>
              <div>
                <div>Experience</div>
                <div className='flex-centered'>
                  <div className='container-experience'>
                    {experienceChecks.map((checked, index) => (
                      <input
                        className='checkbox-medium'
                        key={`experience-${index}`}
                        type="checkbox"
                        checked={checked}
                        onChange={toggleChecks(index, setExperienceChecks, experienceChecks)}
                      />
                    ))}
                  </div>
                  <button className='margin-left' onClick={handleLevelUp} style={{ visibility: showButton ? 'visible' : 'hidden' }}>
                    Level Up
                  </button>
                </div>
              </div>
              <div className='margin-10'>
                <div>Luck</div>
                <div className='flex-centered'>
                  <div className='margin-right-10'>Okay</div>
                  <div>
                    {luckChecks.map((checked, index) => (
                      <input
                        className='checkbox-medium accent-green'
                        key={`luck-${index}`}
                        type="checkbox"
                        checked={checked}
                        onChange={toggleChecks(index, setLuckChecks, luckChecks)}
                      />
                    ))}
                  </div>
                  <div className='margin-left-10'>Doomed</div>
                </div>
              </div>
              <div>
                <div>Harm</div>
                <div className='flex-centered'>
                  <div className='margin-right-10'>Okay</div>
                  <div>
                    {harmChecks.map((checked, index) => (
                      <input
                        className='checkbox-medium accent-red'
                        key={`harm-${index}`}
                        type="checkbox"
                        checked={checked}
                        onChange={toggleChecks(index, setHarmChecks, harmChecks)}
                      />
                    ))}
                  </div>
                  <div className='margin-left-10'>Dying</div>
                </div>
              </div>
              <div>
                <label>Unstable </label>
                <input
                  className='checkbox-medium accent-black'
                  key={`unstable`}
                  type="checkbox"
                  checked={harmChecks.filter(Boolean).length > 3}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="grid-5">
          <div>
            <div className='text-bold'>Gear</div>
            <div>
              {renderGearItems(currentCharacter.gear)}
            </div>
            </div>
            <div>
              <div>Standard Moves</div>
              {/* Render Standard moves here */}
            </div>
            <div>
              <div>Hunter Moves</div>
            </div>
          </div>
          <div className="grid-6"></div>
        </div>
        <div className='grid-bottom'>
          <div className="grid-7"></div>
          <div className="grid-8"></div>
          <div className="grid-9"></div>
        </div>
      </div>
    </div>
  )
}
