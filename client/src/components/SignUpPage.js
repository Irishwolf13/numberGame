import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase.js'
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const [badInfo, setBadInfo] = useState(false)
  
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/home'); // Navigate to home page upon successful sign-up
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setBadInfo('The email address is already in use.');
          break;
        case 'auth/invalid-email':
          setBadInfo('The email address is not valid.');
          break;
        case 'auth/missing-password':
          setBadInfo('You must have a password.');
          break;
        case 'auth/missing-email':
          setBadInfo('The email address is not valid.');
          break;
        case 'auth/weak-password':
          setBadInfo('Passwords must be at least 6 characters.');
          break;
        default:
          setBadInfo('Something went wrong.');
          break;
      }
      // console.error(err);
    }
  }
  
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/home'); // Navigate to home page upon successful Google sign-in
    } catch (err) {
      setBadInfo(true)
      console.error(err);
    }
  }

  return (
    <div className='mainContainer'>
      <div className='otherContainer'>
        <div>
          <div><input autoFocus placeholder='Email...' onChange={(e) => setEmail(e.target.value)}></input></div>
          <div><input placeholder='Password...' type='password' onChange={(e) => setPassword(e.target.value)}></input></div>
          {badInfo && <div className='invalid'>{badInfo}</div>}
        </div>
        <div className='spacing'>
          <button onClick={handleSignUp}>Create User</button>
        </div>
        <button onClick={handleGoogleSignIn}>Google Sign in</button>
      </div>
    </div>
  )
}
