import React, { useState } from 'react';

export default function SpellSlinger() {
  const [state, setState] = useState({
    myLook: '',
    myFeature: '',
    myGear: '',
    myMagic1: '',
    myMagic2: '',
    myMagic3: '',
    myMagicMove1: '',
    myMagicMove2: '',
    myMagicMove3: ''
  });
  const hunterLook = ["Rumpled clothes", "Stylish clothes", "Goth clothes", "Old Fashioned clothes"]
  const hunterFeatures = ["Shadowed eyes", "Fierce eyes", "Weary eyes", "Sparkling eyes"]
  const hunterGear = [
    {name:"Old Revolver",harm:2,distance:'close',subtle:"reload",sounds:'loud'}, 
    {name:"Ritual Knife",harm:1,distance:'hand',subtle:"",sounds:'none'}, 
    {name:"Heirloom Sword",harm:2,distance:'hand',subtle:"messy",sounds:'none'}
  ]
  const baseMagicObjects = [
    {base:true, name: 'Blast', type:'magic', harm:2, distance:'close',armor:0, subtle:'obvious', sounds:'loud'},
    {base:true, name: 'Ball', type:'magic', harm:1, distance:'area close',armor:0, subtle:'obvious', sounds:'loud'},
    {base:true, name: 'Missile', type:'magic', harm:1, distance:'far',armor:0, subtle:'obvious', sounds:'loud'},
    {base:true, name: 'Wall', type:'magic', harm:1, distance:'barrier',armor:1, subtle:'obvious', sounds:'loud'},
    {base:false, name: 'Fire', type:'effect', harm:2, armor:0, effects:'If you get a 10+ on a combat magic roll, the fire won’t spread'},
    {base:false, name: 'Force or Wind', type:'effect', harm:1, armor:1, effects:'Add “+1 harm forceful” to a base, or “+1 armour” to a wall'},
    {base:false, name: 'Lightning or Entropy', type:'effect', harm:1, effects:'Add “+1 harm messy” to a base'},
    {base:false, name: 'Frost or Ice', type:'effect', harm:1, armor:2, effects:'Adds “-1 harm +2 armour” to a wall, or “+1 harm restraining” to other bases'},
    {base:false, name: 'Earth', type:'effect', harm:0, armor:0, effects:'Add “forceful restraining” to a base'},
    {base:false, name: 'Necromantic', type:'effect', harm:0, armor:0, effects:'Add “life-drain” to a base'},
    
  ]
  const magicMoves = [
    {name:'Tools and Techniques', description:['To use your combat magic effectively, you rely on a collection of tools and techniques. Cross off one; you’ll need the rest.', 'Consumables: You need certain supplies— powders, oils, etc—on hand, some will be used up each cast. If you don’t have them, take 1-harm ignore-armour when you cast','Foci: You need wands, staves, and other obvious props to focus. If you don’t have what you need, your combat magic does 1 less harm.','Gestures: You need to wave your hands around to use combat magic. If you’re restrained, take -1 ongoing for combat magic.','Incantations: You must speak in an arcane language to control your magic. If you use combat magic without speaking, act under pressure to avoid scrambling your thoughts.']},
    {name:'Advanced Arcane Training', description:['If you have two of your three Tools and Techniques at the ready, you may ignore the third one.']},
    {name:'Arcane Reputation', description:['Pick three big organizations or groups in the supernatural community, which can include some of the more sociable types of monsters. They’ve heard of you and respect your power. With affected humans, take +1 forward when you manipulate them. You may manipulate affected monsters as if they were human, with no bonus.']},
    {name:'Could have been worse', description:['When you miss a use magic roll you can choose one of the following options instead of losing control of the magic.','Fizzle: The preparations and materials for the spell are ruined. You’ll have to start over from scratch with the prep time doubled.','This Is Gonna Suck: The effect happens, but you trigger all of the listed glitches but one. You pick the one you avoid.']},
    {name:'Enchated Clothing', description:['Pick an article of every-day clothing–it’s enchanted without any change in appearance. Take -1 harm from any source that tries to get at you through the garment.']},
    {name:'Forensic Divination', description:['When you successfully investigate a mystery, you may ask “What magic was done here?” as a free extra question.']},
    {name:'Go Big or Go Home',description:['When you must use magic as a requirement for Big Magic, take +1 ongoing to those use magic rolls.']},
    {name:'Noy my fault',description:['+1 to act under pressure when you are dealing with the consequences of your own spellcasting.']},
    {name:'Practitioner',description:['Choose two effects available to you under use magic. Take +1 to use magic whenever you choose one of those effects.']},
    {name:'Shield Spell',description:['When you protect someone, gain 2-armour against any harm that is transferred to you. This doesn’t stack with your other armour, if any']},
    {name:'Third Eye',description:['When you read a bad situation, you can open up your third eye for a moment to take in extra information. Take +1 hold on any result of 7 or more, plus you can see invisible things. On a miss, you may still get 1 hold, but you’re exposed to supernatural danger. Unfiltered hidden reality is rough on the mind!']}]

  const handleDropDownChange = (event, mySetterKey) => {
    setState((prevState) => ({
      ...prevState,
      [mySetterKey]: event.target.value
    }));
  };

  const dropdown = (id, valueKey, options, onChangeHandler) => {
    return (
      <div>
        <label htmlFor={id}>{id}: </label>
        <select id={id} value={state[valueKey]} onChange={(e) => onChangeHandler(e, valueKey)}>
          <option value="" disabled>Select {id}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  return (
    <div>
      {dropdown("Look", "myLook", hunterLook, handleDropDownChange)}
      {dropdown("Features", "myFeature", hunterFeatures, handleDropDownChange)}
      {dropdown("Gear", "myGear", hunterGear, handleDropDownChange)}
      <div>
        <h3>Moves You get all the basic moves and four Spell-slinger moves. You have this one:</h3>
        <p>
        Tools and Techniques: To use your combat magic effectively, you rely on a collection of tools and techniques. Cross off one; you’ll need the rest.
        </p>
      </div>
    </div>
  )
}
