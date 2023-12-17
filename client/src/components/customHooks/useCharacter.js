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
  experience: [false, false, false, false, false],
  luckChecks: [false, false, false, false, false, false, false],
  harmChecks: [false, false, false, false, false, false, false],
  charm: 0,
  cool: 0,
  sharp: 0,
  tough: 0,
  weird: 0,
  level: 1,
  introduction: '',
  history: '',
  image: '', // Placeholder
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
