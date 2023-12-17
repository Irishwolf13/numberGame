import { useState } from 'react';

// Initial state for the character object
const initialCharacterState = {
  hunterType: '',
  name: '',
  gender: '',
  look: '',
  feature: '',
  hunterFate:'',
  gear: {},
  magic: {},
  moves: {},
  fate: {},
  charm: 0,
  cool: 0,
  sharp: 0,
  tough: 0,
  weird: 0,
  level: 1,
  introduction: '',
  history: '',
  image: '', // Placeholder, set this to choosen1 or whatever initial value you need
};

// Custom hook for character state
function useCharacter(initialImage) {
  const [character, setCharacter] = useState({
    ...initialCharacterState,
    image: initialImage,
  });

  return [character, setCharacter];
}

export default useCharacter;
