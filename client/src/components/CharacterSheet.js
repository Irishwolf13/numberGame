import React, { useState, useEffect } from 'react';
import choosen1 from '../images/choosen1.jpg'

export default function CharacterSheet({ currentCharater }) {
  useEffect(() => {
    // Your existing useEffect code goes here
    console.log(currentCharater)
    return () => {
      // Cleanup code
    };
  }, [currentCharater]);
  return (
    <div>
      <div className="grid-container">
        <div className='grid-top'>
          <div className="grid-1">
            <div className='line1'>Gender: </div>
            <div className='line2'>Features: </div>
            <div className='line3'>Look: </div>
            <div className='level'>Level: 1</div>
          </div>
          <div className="grid-2">
            <div className='line1'>Frank The Destoryer</div>
            <div className='line2'>The Choosen</div>
          </div>
          <div className="grid-3"></div>
        </div>
        <div className='grid-mid'>
          <div className="grid-4">
            <div className='Top'>
              <div className='Left'>
                <img className='art-character' src={choosen1} alt="Chosen Character" />

              </div>
              <div className='Right'>
                <div className='center-vertial'>
                  <div className='attribute-holder'>
                    <div className="round">+1</div>
                    <p>Charm</p>
                    <button className='roll-button'>Roll</button>
                  </div>
                  <div className='attribute-holder'>
                    <div className="round">+1</div>
                    <p>Cool</p>
                    <button className='roll-button'>Roll</button>
                  </div>
                  <div className='attribute-holder'>
                    <div className="round">+1</div>
                    <p>Sharp</p>
                    <button className='roll-button'>Roll</button>
                  </div>
                  <div className='attribute-holder'>
                    <div className="round">+1</div>
                    <p>Tough</p>
                    <button className='roll-button'>Roll</button>
                  </div>
                  <div className='attribute-holder'>
                    <div className="round">+1</div>
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
