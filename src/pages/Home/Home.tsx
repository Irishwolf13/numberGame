// pages/Home/Home.tsx
import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../components/firebase/config';

import { useDispatch } from 'react-redux';
import { setCurrentNumber } from '../../store/numberSlice';
import { setUser, clearUser } from '../../store/userSlice'; // New imports
import { listenToDocumentChanges } from '../../components/firebase/firebaseController';


const Home: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUserState] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserState(currentUser);
      if (currentUser) {
        // Dispatch to Redux store
        // @ts-ignore
        dispatch(setUser({ uid: currentUser.uid, email: currentUser.email }));
      } else {
        dispatch(clearUser());
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const unsubscribe = listenToDocumentChanges('users', user.uid, (userData) => {
        dispatch(setUser(userData));
      });
  
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [user, dispatch]);

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
