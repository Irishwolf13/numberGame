import React, { useState, useEffect } from 'react';
import comingSoon from '../images/comingSoon.jpg'
import choosen1 from '../images/choosen1.jpg'
import spellSlinger from '../images/spellSlinger.jpg'
import flake1 from '../images/flake1.jpg'

export default function CharacterSheet({ currentCharacter }) {
  const [experienceChecks, setExperienceChecks] = useState([]);
  const [luckChecks, setLuckChecks] = useState([]);
  const [harmChecks, setHarmChecks] = useState([]);
  const [currentDescription, setCurrentDescription] = useState(`Click on item to see description.`);
  const [currentDescriptionName, setCurrentDescriptionName] = useState('');
  const [currentDescriptionRoll, setCurrentDescriptionRoll] = useState('');
  const showButton = experienceChecks.every((checked) => checked);
  const standardMoves = [
    { name: 'Manipulate Someone',
      description:`Once you have given them a reason, tell them what you want them to do and roll +Charm.\n\nFor a normal person:\n\n• On a 10+, then they’ll do it for the reason you gave them. If you asked too much, they’ll tell you the minimum it would take for them to do it (or if there’s no way they’d do it).\n\n• On a 7-9, they’ll do it, but only if you do something for them right now to show that you mean it. If you asked too much, they’ll tell you what, if anything, it would take for them to do it.\n\n• Advanced: On a 12+ not only do they do what you want right now, they also become your ally for the rest of the mystery (or, if you do enough for them, permanently).\nFor another hunter:\n\n• On a 10+, if they do what you ask they mark experience and get +1 forward.\n\n• On a 7-9, they mark experience if they do what you ask.\n\n• On a miss, it’s up to that hunter to decide how badly you offend or annoy them. They mark experience if they decide not to do what you asked. Monsters and minions cannot normally be manipulated.\n\n• Advanced: On a 12+ they must act under pressure to resist your request. If they do what you ask, they mark one experience and take +1 ongoing while doing what you asked. `,
      roll: '+Charm'
    },
    { name: 'Act Under Pressure',
      description:`When you act under pressure.\n\nOn a 10+ you do what you set out to.\nOn a 7-9 the Keeper is going to giveyou a worse outcome, hard choice, orprice to pay. \n\nAdvanced: On a 12+ you may choose to either do what you wanted and something extra, or to do what you wanted to absolute perfection.`,
      roll: '+Cool'
    },
    { name: 'Help Out',
      description:`When you help another hunter.\n\nOn a 10+ your help grants them +1 to their roll.\nOn a 7-9 your help grants them +1 to their roll, but you also expose yourself to trouble or danger.\n\nAdvanced: On a 12+ your help lets them act as if they just rolled a 12, regardless of what they actually got.`,
      roll: '+Cool'
    },
    { name: 'Investigate a Mystery',
      description:`When you investigate a mystery.\n\nOn a 10+ receive 2 Hold\nOn a 7-9 receive 1.\n\nOne hold can be spent to ask the Keeper one of the following questions:\n• What happened here?\n• What sort of creature is it?\n• What can it do?\n• What can hurt it?\n• Where did it go?\n• What was it going to do?\n• What is being concealed here?\n\nAdvanced: On a 12+, you may ask the Keeper any question you want about the mystery, not just the listed ones.`,
      roll: '+Sharp'
    },
    { name: 'Read a Bad Situtation',
      description:`When you look around and read a bad situation.\n\nOn a 10+ recieve 3 Hold\nOn a 7-9, receive 1 Hold.\n\nOne hold can be spent to ask the Keeper one of the following questions:\n• What’s my best way in?\n• What’s my best way out?\n• Are there any dangers we haven’t noticed?\n• What’s the biggest threat?\n• What’s most vulnerable to me?\n• What’s the best way to protect the\nvictims?\n\nIf you act on the answers, you get +1 ongoing while the information is relevant.\n\nAdvanced: On a 12+ you may ask the Keeper any question you want about the situation, not just the listed ones.`,
      roll: '+Sharp'
    },
    { name: 'Kick Some Ass',
      description:`When you get into a fight and kick some ass.\n\nOn a 7+, you and whatever you’re fighting inflict harm on each other. The amount of harm is based on the established dangers in the game. That usually means you inflict the harm rating of your weapon and your enemy inflicts their attack’s harm rating on you.\n\nOn a 10+, choose one extra effect:\n• You gain the advantage: take +1 forward, or give +1 forward to another hunter.\n• You inflict terrible harm (+1 harm).\n• You suffer less harm (-1 harm).\n• You force them where you want them.\n\nAdvanced: On a 12+ instead pick an enhanced effect:\n• You completely hold the advantage. All hunters involved in the fight get +1 forward.\n• You suffer no harm at all.\n• Your attack inflicts double the normal harm.\n• Your attack drives the enemy away in a rout.`,
      roll: '+Tough'
    },
    { name: 'Protect Someone',
      description:`When you prevent harm to another character.\n\nOn a 7+, you protect them okay, but you’ll suffer some or all of the harm they were going to get.\n\nOn a 10+ choose an extra:\n• You suffer little harm (-1 harm).\n• All impending danger is now focused on you.\n• You inflict harm on the enemy.\n• You hold the enemy back.\n\nAdvanced: on a 12+ both you and the character you are protecting are unharmed and out of danger. If you were protecting a bystander, they also become your ally.`,
      roll: '+Tough'
    },
    { name: 'Use Magic',
      description:`When you use magic, say what you’re trying to achieve and how you do the spell.\n\nOn a 10+, the magic works without issues: choose your effect.\nOn a 7-9, it works imperfectly: choose your effect and a glitch. The Keeper will decide what effect the glitch has. advanced: On a 12+ the Keeper will offer you some added benefit.\n\nEffects\n• Inflict harm (1-harm ignorearmour magic obvious).\n• Enchant a weapon. It gets +1 harm and +magic.\n• Do one thing that is beyond human limitations.\n• Bar a place or portal to a specific person or a type of creature.\n• Trap a specific person, minion, or monster.\n• Banish a spirit or curse from the person, object, or place it inhabits.\n• Summon a monster into the world.\n• Communicate with something that you do not share a language with.\n• Observe another place or time.\n• Heal 1-harm from an injury, or cure a disease, or neutralize a poison.\n\nGlitches\n• The effect is weakened.\n• The effect is of short duration.\n• You take 1-harm ignore-armour.\n• The magic draws immediate, unwelcome attention.\n• It has a problematic side effect.`,
      roll: '+Weird'
    },
    { name: 'BIG MAGIC',
      description:`Use this when you want more than the Use Magic effects. Tell the Keeper what you want to do.\n\nThe Keeper may require:\n• You need to spend a lot of time (days or weeks) researching the magic ritual.\n• You need to experiment with the spell – there will be lots of failures before you get it right.\n• You need some rare and weird ingredients and supplies.\n• The spell will take a long time (hours or days) to cast.\n• You need a lot of people (2, 3, 7, 13, or more) to help.\n• The spell needs to be cast at a particular place and/or time.\n• You need to use magic as part of the ritual, perhaps to summon a monster, communicate with something, or bar the portal you opened.\n• It will have a specific side-effect or danger.\n\nIf you meet the requirements, then the magic takes effect.`,
      roll: 'Ask Keeper'
    },
  ] 
  
  useEffect(() => {
    console.log(currentCharacter)
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
  const setBasicDescription = (name, description) => {
    setCurrentDescriptionName(name);
    setCurrentDescription(description);
    setCurrentDescriptionRoll('');
  }

  // Going to break down the main weapon created in the first bit here...
  const renderGearItems = (gear) => {
    if (currentCharacter.hunterType === 'The Chosen') {
      return Object.values(gear).map((item, index) => (
        <div 
          className='flex-centered pointer' 
          key={index}
          onClick={() => {
            setBasicDescription('Your Gear','This is a list of your gear.');
          }}
        >
          {item.name && <div className='margin-right-small'> {item.name} </div>}
          {item.harm !== 0 && <div className='margin-right-small'>+{item.harm} Harm,</div>}
          {item.distance && <div className='margin-right-small'> {item.distance} </div>}
          {item.subtle && <div className='margin-right-small'> {item.subtle} </div>}
          {item.sounds && <div className='margin-right-small'> {item.sounds} </div>}
          {item.armor && <div className='margin-right-small'> {`+${item.armor} Armor`}</div>}
        </div>
      ));
    }else {
      if (!gear) return null;
    
      return Object.values(gear).map((item, index) => (
        <div className='flex-centered' key={index}>
          {item.name && <div className='margin-right-small'> {item.name}: </div>}
          {item.harm !== 0 && <div className='margin-right-small'>+{item.harm} Harm,</div>}
          {item.distance && <div className='margin-right-small'> {item.distance} </div>}
          {item.subtle && <div className='margin-right-small'> {item.subtle} </div>}
          {item.sounds && <div className='margin-right-small'> {item.sounds} </div>}
          {item.armor && <div className='margin-right-small'> {`+${item.armor} Armor`}</div>}
        </div>
      ));
    }
  }

  const renderStandardMoves = () => {
    return standardMoves.map((item, index) => (
      <div 
        className='pointer'
        key={`standard-move-${index}`}
        onClick={() => handleCurrentDescriptionSelection(item)}
      >
        {item.name && <div className=''>{item.name}</div>}
      </div>
    ));
  }

  const handleCurrentDescriptionSelection = (item) => {
    setCurrentDescription(item.description);
    setCurrentDescriptionName(item.name);
    if (item.roll) {
      setCurrentDescriptionRoll(item.roll);
    } else {
      setCurrentDescriptionRoll('');
    }
  }

  const renderHunterMoves = (currentCharacter) => {
    if (!currentCharacter || !currentCharacter.moves || typeof currentCharacter.moves !== 'object') return null;
  
    return Object.values(currentCharacter.moves).map((item, index) => (
      <div 
        className='pointer'
        key={`standard-move-${index}`}
        onClick={() => handleCurrentDescriptionSelection(item)}
      >
        {item.name}
      </div>
    ));
  };

  const renderConditionalContent = (currentCharacter) => {
    if (currentCharacter.hunterType === 'The Chosen') {
      return (
        <div className='flex-2'>
          <p className='text-bold moveTitles'>{`${currentCharacter.hunterType}'s Fate`}</p>
          {renderChoosenFate(currentCharacter)} 
        </div>
      );
    }
    if (currentCharacter.hunterType === 'The Spell-Slinger') {
      return (
        <div className='flex-2'>
          <p className='text-bold'>{``}</p>
          {renderSpellSlingerMagic(currentCharacter)} 
        </div>
      );
    }
    return null;
  };
  const renderChoosenFate = (currentCharacter) => {
    if (!currentCharacter || !currentCharacter.fate || typeof currentCharacter.fate !== 'object') return null;
    const heroicChoices = Object.values(currentCharacter.fate).filter(item => item.heroic);
    const nonHeroicChoices = Object.values(currentCharacter.fate).filter(item => !item.heroic);
  
    return (
      <>
        <div className='heroic'>
          <div className='text-bold'>-- Heroic --</div>
          {heroicChoices.map((item, index) => (
            <div className='pointer' key={`heroic-move-${index}`} onClick={() => handleCurrentDescriptionSelection(item)}>
              {item.name}
            </div>
          ))}
        </div>
        <div className='non-heroic'>
          <div className='text-bold'>-- Doom --</div>
          {nonHeroicChoices.map((item, index) => (
            <div  className='pointer' key={`non-heroic-move-${index}`} onClick={() => handleCurrentDescriptionSelection(item)}>
              {item.name}
            </div>
          ))}
        </div>
      </>
    );
  };
  const renderSpellSlingerMagic = (currentCharacter) => {
    if (!currentCharacter || !currentCharacter.magic || typeof currentCharacter.magic !== 'object') return null;
    const baseMagic = Object.values(currentCharacter.magic).filter(item => item.base);
    const nonBaseMagic = Object.values(currentCharacter.magic).filter(item => !item.base);
  
    return (
      <>
        <div className='magic'>
          <div className='text-bold'>-- Base Magic --</div>
          {baseMagic.map((item, index) => (
            <div className='pointer' key={`magic-move-${index}`} onClick={() => handleCurrentDescriptionSelection(item)}>
              {item.name}
            </div>
          ))}
        </div>
        <div className='non-magic'>
          <div className='text-bold'>-- Effects --</div>
          {nonBaseMagic.map((item, index) => (
            <div  className='pointer' key={`non-magic-move-${index}`} onClick={() => handleCurrentDescriptionSelection(item)}>
              {item.name}
            </div>
          ))}
        </div>
      </>
    );
  };
  
  
  // Usage in JSX:
  <div>
    {renderHunterMoves(currentCharacter)}
  </div>
  
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
                <div
                  className='pointer' 
                  onClick={() => {setBasicDescription('Experience',`Mark an experience point whenever your roll totals six or less, or when a move tells you to.\n\nWhenever you mark the fifth experience box, level up. Erase all five marks and choose an improvement from your list.\n\nAfter you have levelled up five times, you may choose from the advanced improvement list as well.`);}}>
                  Experience
                </div>
                <div className='flex-centered'>
                  <div className='container-experience'>
                    {experienceChecks.map((checked, index) => (
                      <input
                        className='checkbox-medium pointer'
                        key={`experience-${index}`}
                        type="checkbox"
                        checked={checked}
                        onChange={toggleChecks(index, setExperienceChecks, experienceChecks)}
                      />
                    ))}
                  </div>
                  <button className='margin-left pointer' onClick={handleLevelUp} style={{ visibility: showButton ? 'visible' : 'hidden' }}>
                    Level Up
                  </button>
                </div>
              </div>
              <div className='margin-10'>
                <div
                  className='pointer' 
                  onClick={() => {setBasicDescription('Luck',`When you spend a point of Luck, pick one:\n   • Decrease a wound you have suffered to 0 harm.\n   • After you roll, retroactively change the result to a 12.\n\nWhen you have no luck left, bad things will happen to you.`);}}>
                  Luck
                </div>
                <div className='flex-centered'>
                  <div className='margin-right-10'>Okay</div>
                  <div>
                    {luckChecks.map((checked, index) => (
                      <input
                        className='checkbox-medium accent-green pointer'
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
                <div
                  className='pointer' 
                  onClick={() => {setBasicDescription(`Harm`,`Whenever you suffer harm, the Keeper will tell you what effect it has.\n\nInjury severity depends on how much harm you have suffered:\n• 0-harm wounds have only minor, short term effects.\n• 4-7 harm wounds are serious and unstable. They will get worse unless treated. Mark the “Unstable” box.\n• 8-harm or more will kill a normal human, including a hunter.\n\nArmour reduces the harm suffered by the number of points it is rated for.\nMonsters may not be defeated until you use their weakness against them, and this applies to some minions as well.`)}}>
                  Harm
                </div>
                <div className='flex-centered'>
                  <div className='margin-right-10'>Okay</div>
                  <div>
                    {harmChecks.map((checked, index) => (
                      <input
                        className='checkbox-medium accent-red pointer'
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
            <div className='text-bold moveTitles'>Gear</div>
              {renderGearItems(currentCharacter.gear)}
            </div>
            <div className="flex">
              <div className='flex-2'>
                <p className='text-bold moveTitles'>Standard Moves</p>
                {renderStandardMoves(standardMoves)} 
              </div>
              <div className='flex-2'>
                <p className='text-bold moveTitles'>{`${currentCharacter.hunterType} Moves`}</p>
                {renderHunterMoves(currentCharacter)} 
                {renderConditionalContent(currentCharacter)}
              </div>
              <div className=''>
              </div>
            </div>
          </div>
          <div className="grid-6">
            <div className='text-bold'>{currentDescriptionName === '' ? 'Description' : currentDescriptionName}</div>
            <div className='description-box'>
              <div>
                { currentDescriptionRoll !== '' && ( <div className='text-bold'>{`Roll: ${currentDescriptionRoll}`}</div> ) }
                { currentDescription }
              </div>
            </div>
          </div>
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
