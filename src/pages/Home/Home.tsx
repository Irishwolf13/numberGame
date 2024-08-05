import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../components/firebase/config';

import { useDispatch } from 'react-redux';
import { setCurrentNumber } from '../../store/numberSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const goToStandardGame = () => {
    dispatch(setCurrentNumber({ number: 0 }));
    history.push('/standardgame');
  };

  const handleLogout = async () => {
    await signOut(auth);
    history.push('/home');
  };

  return (
    <IonPage>
      <IonHeader collapse='condense'>
        <IonToolbar>
          <IonTitle>{user ? user.email : 'Home'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={goToStandardGame}>Standard Game</IonButton>
        {user ? (
          <IonButton onClick={handleLogout}>Logout</IonButton>
        ) : (
          <IonButton onClick={() => history.push('/login')}>Login</IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
