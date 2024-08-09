import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage } from '@ionic/react';
import { RootState } from '../../store/store';
import { setCurrentNumber } from '../../store/numberSlice';

import BouncingNumbers from '../../components/BouncingNumbers/BouncingNumbers'; 
import { addNumberToUser } from '../../components/firebase/firebaseController'; // Import the function
import './StandardGame.css';

const StandardGame: React.FC = () => {
  const dispatch = useDispatch();
  const globalNumber = useSelector((state: RootState) => state.currentNumber.currentNumber?.number || null);
  const userInfo = useSelector((state: RootState) => state.user.user);

  const unreachableNumbers = [0, 76, 79, 86, 92, 94, 97, 98];
  const actions = ['+', '-', '/', 'x'];
  const [myNumbers, setMyNumbers] = useState([1, 2, 3, 4, 5]);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [firstSelectedIdx, setFirstSelectedIdx] = useState<number | null>(null);
  const [secondSelectedIdx, setSecondSelectedIdx] = useState<number | null>(null);
  const [randomNumber, setRandomNumber] = useState<number | null>(globalNumber);
  const itemClass = randomNumber ? 'showItem' : 'hiddenItem';

  const [itemClass2, setItemClass2] = useState('');
  const showNumberToGet = () => (
    <div className={`circle centered ${itemClass2}`}>{randomNumber}</div>
  );

  useEffect(() => {
    setRandomNumber(globalNumber);
  }, [globalNumber]);

  useEffect(() => {
    if (randomNumber === null) {
      generateRandomNumber();
    }
  }, []);

  useEffect(() => {
    // console.log(myNumbers)
    if(myNumbers.length === 1) {
      // console.log(randomNumber)
      // console.log(myNumbers[0])
      if (myNumbers[0] === randomNumber) {
        console.log('You Win!')
      }else {
        console.log('You Lose!')
      }
    }
  },[myNumbers])

  const generateRandomNumber = () => {
    const reachedNumbers = userInfo?.reachedNumbers?.map(obj => obj.number) || [];
    let number;

    do {number = Math.floor(Math.random() * 101);}
    while (unreachableNumbers.includes(number) || reachedNumbers.includes(number));
  
    dispatch(setCurrentNumber({ number }));
    setRandomNumber(number);
    // console.log(number);
    // console.log(userInfo);
    // console.log(reachedNumbers);
  };

  const handleButtonClick = (num: number, index: number) => {
    if (index === firstSelectedIdx) {
      setFirstSelectedIdx(null);
    } else if (index === secondSelectedIdx) {
      setSecondSelectedIdx(null);
    } else if (firstSelectedIdx === null) {
      setFirstSelectedIdx(index);
    } else if (secondSelectedIdx === null) {
      setSecondSelectedIdx(index);
    }
  };

  const handleActionButtonClick = (action: string) => {
    if (currentAction === action) {
      setCurrentAction(null); // Deselect the action if it is already selected
    } else {
      setCurrentAction(action);
    }
  };

  const applyChanges = () => {
    if (currentAction !== null && firstSelectedIdx !== null && secondSelectedIdx !== null) {
      const firstNumber = myNumbers[firstSelectedIdx];
      const secondNumber = myNumbers[secondSelectedIdx];

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
      newMyNumbers.splice(Math.max(firstSelectedIdx, secondSelectedIdx), 1);
      newMyNumbers.splice(Math.min(firstSelectedIdx, secondSelectedIdx), 1);
      newMyNumbers.push(result);

      setMyNumbers(newMyNumbers);
      setFirstSelectedIdx(null);
      setSecondSelectedIdx(null);
      setCurrentAction(null);
    }
  };

  const newNumber = () => {
    setMyNumbers([1, 2, 3, 4, 5]);
    setFirstSelectedIdx(null);
    setSecondSelectedIdx(null);
    setCurrentAction(null);
    generateRandomNumber();
  };

  const addNumber = async () => {
    setItemClass2('explosion');
    
    if (userInfo && userInfo.uid) {
      if (globalNumber !== null) {
        await addNumberToUser('users', userInfo.uid, globalNumber);
      }
    }
    
    // Reset the itemClass after animation (cleanup) and then call setRandomNumber(null)
    setTimeout(() => {
      setItemClass2('');
      dispatch(setCurrentNumber({ number: undefined }));
      setRandomNumber(null);
      // You need to add something to pop up and tell the user they GOT THAT NUMBER
      // Then you should let them eithe pick number or hit random number again...
    }, 1000); // match the duration of the animation (1 second)
  };

  const renderNumberButtons = () => {
    return myNumbers.map((num, index) => (
      <IonButton
        key={`${num}-${index}`}
        onClick={() => handleButtonClick(num, index)}
        color={
          index === firstSelectedIdx || index === secondSelectedIdx
            ? 'success'
            : undefined
        }
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
    if (position === 1 && firstSelectedIdx !== null) {
      return myNumbers[firstSelectedIdx];
    }
    if (position === 2 && currentAction !== null) {
      return currentAction;
    }
    if (position === 3 && secondSelectedIdx !== null) {
      return myNumbers[secondSelectedIdx];
    }
    return '';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonButtons>
          <IonBackButton></IonBackButton>
          <IonButton onClick={addNumber}>Blow up Number</IonButton>
        </IonButtons>
      </IonHeader>
      <IonContent fullscreen>
        {/* <BouncingNumbers numbersArray={numbersArray} setNumber={setNumber} /> */}
        <div className="centerMe">
          {showNumberToGet()}
          <div className="circles-container-spacer"></div>
          <div className="circles-container">
            <div className={`circle ${itemClass}`}>
              {getCurrentDisplayValue(1)}
            </div>
            <div className={`circle ${itemClass}`}>
              {getCurrentDisplayValue(2)}
            </div>
            <div className={`circle ${itemClass}`}>
              {getCurrentDisplayValue(3)}
            </div>
          </div>
          <div className={itemClass}>{renderNumberButtons()}</div>
          <div className={itemClass}>{renderActionButtons()}</div>
          <IonButton className={itemClass} onClick={applyChanges}>
            Calculate
          </IonButton>
        </div>

        <IonButton
          expand="full"
          onClick={newNumber}
          className={`bottom-button showItem`}
        >
          New Number
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default StandardGame;
