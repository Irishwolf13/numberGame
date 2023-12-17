import React, { useState, useEffect } from 'react';
import choosen1 from '../images/choosen1.jpg'
import spellSlinger from '../images/spellSlinger.jpg'
import flake1 from '../images/flake1.jpg'

export default function CharacterSheet({ currentCharacter }) {
  useEffect(() => {
    console.log(currentCharacter)
    return () => {
      // Cleanup code
    };
  }, [currentCharacter]);

  const hunterImages = {
    'The Chosen': choosen1,
    "The Crooked": choosen1, 
    "The Divine": choosen1, 
    "The Expert": choosen1, 
    "The Flake": flake1, 
    "The Initiate": choosen1, 
    "The Monstrous": choosen1,
    "The Mundane": choosen1, 
    "The Professional": choosen1, 
    "The Spell-Slinger": spellSlinger, 
    "The Spooky": choosen1, 
    "The Wronged": choosen1
    // Add more hunter types and their images here...
  };

  const characterImageSrc = hunterImages[currentCharacter.hunterType]

  const rollDice = (e, frank) => {
    console.log(currentCharacter)
  }
  return (
    <div>
      <div className="grid-container">
        <div className='grid-top'>
          <div className="grid-1">
            <div className='line1'>Gender: {currentCharacter?.gender}</div>
            <div className='line2'>Features: {currentCharacter?.feature}</div>
            <div className='line3'>Look: {currentCharacter?.look}</div>
            <div className='level'>Level: {currentCharacter?.level}</div>
          </div>
          <div className="grid-2">
            <div className='line1'>{currentCharacter?.name}</div>
            <div className='line2'>{currentCharacter?.hunterType}</div>
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
                    <div className="round">{currentCharacter?.charm}</div>
                    <p>Charm</p>
                    <button className='roll-button' onClick={(e) => rollDice(e, 'charm')}>Roll</button>
                  </div>
                  <div className='attribute-holder'>
                    <div className="round">{currentCharacter?.cool}</div>
                    <p>Cool</p>
                    <button className='roll-button'>Roll</button>
                  </div>
                  <div className='attribute-holder'>
                    <div className="round">{currentCharacter?.sharp}</div>
                    <p>Sharp</p>
                    <button className='roll-button'>Roll</button>
                  </div>
                  <div className='attribute-holder'>
                    <div className="round">{currentCharacter?.tough}</div>
                    <p>Tough</p>
                    <button className='roll-button'>Roll</button>
                  </div>
                  <div className='attribute-holder'>
                    <div className="round">{currentCharacter?.weird}</div>
                    <p>Weird</p>
                    <button className='roll-button'>Roll</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='Bottom'>
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
