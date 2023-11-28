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
      if (err.code === 'auth/email-already-in-use') {
        setBadInfo('The email address is already in use.');
      } else if (err.code === 'auth/invalid-email') {
        setBadInfo('The email address is not valid.');
      } else if (err.code === 'auth/missing-password') {
        setBadInfo('You must have a password.');
      } else if (err.code ==='auth/missing-email') {
        setBadInfo('The email address is not valid.');
      } else if (err.code === 'auth/weak-password'){
        setBadInfo('Passwords must be at least 6 characters.')
      } else {
        setBadInfo('Something went wrong.')
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
          <div><input placeholder='Email...' onChange={(e) => setEmail(e.target.value)}></input></div>
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
