import React, { useEffect, useState } from 'react';
import './Modal.css';
import { IonButton } from '@ionic/react';

interface ModalProps {
  getNewRandomNumber: () => void;
  resetWithOldNumber: () => void;
  gotIt: boolean;
  number: number;
}

interface MyModalProps {
  getNewRandomNumber: () => void;
  resetWithOldNumber: () => void;
  gotIt: boolean;
  number: number;
  showModal: boolean;
}

const Modal: React.FC<ModalProps> = ({ gotIt, number, getNewRandomNumber, resetWithOldNumber }) => {
  const [visibleClass, setVisibleClass] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    setVisibleClass('fade-in');

    if (gotIt) {
      setModalMessage(`You Got ${number} !!`);
    } else {
      setModalMessage(`You Missed ${number}`);
    }
  }, [gotIt]);

  return (
    <div className={`modal ${visibleClass} ${gotIt ? 'background-green' : 'background-red'}`}>
      <div className="modal-content">
        <p>{modalMessage}</p>
        <IonButton onClick={getNewRandomNumber}>{gotIt ? 'Got that Number' : "Get New Random Number"}</IonButton>
        {gotIt ? <div></div> : <IonButton onClick={resetWithOldNumber}>{`Try to Get ${number} again?`}</IonButton>}
      </div>
    </div>
  );
};

const MyModal: React.FC<MyModalProps> = ({ showModal, getNewRandomNumber, resetWithOldNumber, gotIt, number }) => {
  return (
    <div className="myModal">
      {showModal && <Modal gotIt={gotIt} number={number} getNewRandomNumber={getNewRandomNumber} resetWithOldNumber={resetWithOldNumber} />}
    </div>
  );
};

export default MyModal;
