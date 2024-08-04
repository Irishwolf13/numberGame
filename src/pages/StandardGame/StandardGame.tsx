import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
} from '@ionic/react';
import './StandardGame.css';
import { RootState } from '../../store/store';
import { setCurrentNumber } from '../../store/numberSlice';
import BouncingNumbers from '../../components/BouncingNumbers/BouncingNumbers'; // Import the new component

const StandardGame: React.FC = () => {
  const dispatch = useDispatch();
  const globalNumber = useSelector((state: RootState) => state.currentNumber.currentNumber?.number || null);
  const alreadyReached = [1]; // This will be retrieved from database at some point later...
  const [myNumbers, setMyNumbers] = useState([1, 2, 3, 4, 5]);
  const [clickedIndices, setClickedIndices] = useState<number[]>([]);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [randomNumber, setRandomNumber] = useState<number | null>(globalNumber);
  const unreachableNumbers = [0, 76, 79, 86, 92, 94, 97, 98];
  const actions = ['+', '-', '/', 'x'];

  let numbersArray = Array.from({ length: 100 }, (_, i) => i + 1);
  // Filter out both unreachable numbers and already reached numbers
  numbersArray = numbersArray.filter(
    (num) => !unreachableNumbers.includes(num) && !alreadyReached.includes(num)
  );

  const goToStandardGame = () => {
    // Select random number from filtered Number array
    const randomIndex = Math.floor(Math.random() * numbersArray.length);
    const randomNumber = numbersArray[randomIndex];
    dispatch(setCurrentNumber({ number: randomNumber }));
  };

  useEffect(() => {
    setRandomNumber(globalNumber); // Set randomNumber to the global state number when the page loads
  }, [globalNumber]);

  const generateRandomNumber = () => {
    let number;
    do {
      number = Math.floor(Math.random() * 101);
    } while (unreachableNumbers.includes(number));
    
    dispatch(setCurrentNumber({ number })); // Update the global state with the new random number
    setRandomNumber(number); // Update the local state with the new random number
  };

  const handleButtonClick = (num: number, index: number) => {
    if (clickedIndices.includes(index)) {
      setClickedIndices(clickedIndices.filter((i) => i !== index));
    } else if (clickedIndices.length < 2) {
      setClickedIndices([...clickedIndices, index]);
    }
  };

  const handleActionButtonClick = (action: string) => {
    setCurrentAction(action);
  };

  const applyChanges = () => {
    if (currentAction !== null && clickedIndices.length === 2) {
      const [firstIndex, secondIndex] = clickedIndices;
      const firstNumber = myNumbers[firstIndex];
      const secondNumber = myNumbers[secondIndex];

      let result: number;
      switch (currentAction) {
        case '+':
          result = firstNumber + secondNumber;
          break;
        case '-':
          result = firstNumber - secondNumber;
          break;
        case '/':
          result = firstNumber / secondNumber;
          break;
        case 'x':
          result = firstNumber * secondNumber;
          break;
        default:
          return; // The action is invalid
      }

      const newMyNumbers = [...myNumbers];

      // Remove elements from higher index first to avoid shifting issues
      newMyNumbers.splice(Math.max(firstIndex, secondIndex), 1);
      newMyNumbers.splice(Math.min(firstIndex, secondIndex), 1);

      newMyNumbers.push(result); // Add the result to the array

      setMyNumbers(newMyNumbers);
      setClickedIndices([]); // Reset clicked indices after applying changes
      setCurrentAction(null); // Reset current action after applying changes
    }
  };

  const newNumber = () => {
    setMyNumbers([1, 2, 3, 4, 5]);
    setClickedIndices([]);
    setCurrentAction(null);
    generateRandomNumber();
  };

  const renderNumberButtons = () => {
    return myNumbers.map((num, index) => (
      <IonButton
        key={`${num}-${index}`}
        onClick={() => handleButtonClick(num, index)}
        color={clickedIndices.includes(index) ? 'success' : undefined}
      >
        {num}
      </IonButton>
    ));
  };

  const renderActionButtons = () => {
    return actions.map((action) => (
      <IonButton
        key={action}
        onClick={() => handleActionButtonClick(action)}
        color={currentAction === action ? 'danger' : undefined}
      >
        {action}
      </IonButton>
    ));
  };

  const getCurrentDisplayValue = (position: number) => {
    if (position === 1 && clickedIndices.length > 0) {
      return myNumbers[clickedIndices[0]];
    }
    if (position === 2 && currentAction !== null) {
      return currentAction;
    }
    if (position === 3 && clickedIndices.length > 1) {
      return myNumbers[clickedIndices[1]];
    }
    return '';
  };

  const itemClass = randomNumber ? 'showItem' : 'hiddenItem';

  return (
    <IonPage>
      <IonHeader>
        <IonButtons><IonBackButton></IonBackButton></IonButtons>
      </IonHeader>
      <IonContent fullscreen>
        <BouncingNumbers numbersArray={numbersArray} />
        <div className='centerMe'>
          <div className="circles-container-spacer">
            
          </div>
          <div className="circles-container">
            <div className={`circle ${itemClass}`}>{getCurrentDisplayValue(1)}</div>
            <div className={`circle ${itemClass}`}>{getCurrentDisplayValue(2)}</div>
            <div className={`circle ${itemClass}`}>{getCurrentDisplayValue(3)}</div>
          </div>
          <div className={itemClass}>{renderNumberButtons()}</div>
          <div className={itemClass}>{renderActionButtons()}</div>
          <IonButton className={itemClass} onClick={applyChanges}>Calculate</IonButton>
        </div>

        <IonButton expand="full" onClick={newNumber} className={`bottom-button showItem`}>
          New Number
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default StandardGame;
