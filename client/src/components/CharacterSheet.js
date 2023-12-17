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

  const rollDice = (e, frank) => {
    console.log(currentCharacter)
  }
  
  const handleLevelUp = () => {
    setExperienceChecks([false, false, false, false, false]);
    // Additional level up logic goes here...
  };

  const toggleChecks = (index, setter, myArray) => () => {
    setter(myArray.map((checked, i) => (i === index ? !checked : checked)));
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
                <div className='center-vertial'>
                  <div className='attribute-holder'>
                    <div className="round">{currentCharacter?.charm > 0 ? `+${currentCharacter.charm}` : currentCharacter?.charm}</div>
                    <p>Charm</p>
                    <button className='roll-button' onClick={(e) => rollDice(e, 'charm')}>Roll</button>
                  </div>
                  <div className='attribute-holder'>
                    <div className="round">{currentCharacter?.cool > 0 ? `+${currentCharacter.cool}` : currentCharacter?.cool}</div>
                    <p>Cool</p>
                    <button className='roll-button'>Roll</button>
                  </div>
                  <div className='attribute-holder'>
                    <div className="round">{currentCharacter?.sharp > 0 ? `+${currentCharacter.sharp}` : currentCharacter?.sharp}</div>
                    <p>Sharp</p>
                    <button className='roll-button'>Roll</button>
                  </div>
                  <div className='attribute-holder'>
                  <div className="round">{currentCharacter?.tough > 0 ? `+${currentCharacter.tough}` : currentCharacter?.tough}</div>
                    <p>Tough</p>
                    <button className='roll-button'>Roll</button>
                  </div>
                  <div className='attribute-holder'>
                  <div className="round">{currentCharacter?.weird > 0 ? `+${currentCharacter.weird}` : currentCharacter?.weird}</div>
                    <p>Weird</p>
                    <button className='roll-button'>Roll</button>
                  </div>
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
            </div>
          </div>
          <div className="grid-5"></div>
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
