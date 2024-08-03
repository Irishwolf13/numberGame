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

const StandardGame: React.FC = () => {
  const dispatch = useDispatch();
  const globalNumber = useSelector((state: RootState) => state.currentNumber.currentNumber?.number || 0);

  const [myNumbers, setMyNumbers] = useState([1, 2, 3, 4, 5]);
  const [clickedIndices, setClickedIndices] = useState<number[]>([]);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [randomNumber, setRandomNumber] = useState<number>(globalNumber);
  const unreachableNumbers = [76, 79, 86, 92, 94, 97, 98];
  const actions = ['+', '-', '/', 'x'];

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

  return (
    <IonPage>
      <IonHeader>
        <IonButtons><IonBackButton></IonBackButton></IonButtons>
      </IonHeader>
      <IonContent fullscreen>
        <div className='centerMe'>
          <div className="circles-container">
            <div className="circle">{randomNumber}</div>
          </div>
          <div className="circles-container">
            <div className="circle">{getCurrentDisplayValue(1)}</div>
            <div className="circle">{getCurrentDisplayValue(2)}</div>
            <div className="circle">{getCurrentDisplayValue(3)}</div>
          </div>
          <div>{renderNumberButtons()}</div>
          <div>{renderActionButtons()}</div>
          <IonButton onClick={applyChanges}>Calculate</IonButton>
        </div>

        <IonButton expand="full" onClick={newNumber} className="bottom-button">
          New Number
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default StandardGame;
