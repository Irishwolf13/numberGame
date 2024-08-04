import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setCurrentNumber } from '../../store/numberSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const goToStandardGame = () => {
    dispatch(setCurrentNumber({ number: 0 }));
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
        <IonButton onClick={goToStandardGame}>Standard Game</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
