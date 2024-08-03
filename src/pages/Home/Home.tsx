import React from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import BouncingNumbers from '../../components/BouncingNumbers/BouncingNumbers'; // Import the new component
import './Home.css';
import { useDispatch } from 'react-redux';
import { setCurrentNumber } from '../../store/numberSlice';

const Home: React.FC = () => {
  const alreadyReached = [1]; // This will be retrieved from database at some point later...
  const unreachableNumbers = [76, 79, 86, 92, 94, 97, 98];
  let numbersArray = Array.from({ length: 100 }, (_, i) => i + 1);
  // Filter out both unreachable numbers and already reached numbers
  numbersArray = numbersArray.filter(
    (num) => !unreachableNumbers.includes(num) && !alreadyReached.includes(num)
  );

  const dispatch = useDispatch();
  const history = useHistory();
  
  const goToStandardGame = () => {
    // Select random number from filtered Number array
    const randomIndex = Math.floor(Math.random() * numbersArray.length);
    const randomNumber = numbersArray[randomIndex];
    dispatch(setCurrentNumber({ number: randomNumber }));
    history.push('/standardgame');
  };
  
  return (
    <IonPage>
      <IonHeader collapse='condense'>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={goToStandardGame}>Random Number to get</IonButton>
        <BouncingNumbers numbersArray={numbersArray} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
