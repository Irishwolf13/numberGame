import React, { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase.js'
import { useNavigate } from 'react-router-dom';

export default function LogInPage() {
  // console.log(auth?.currentUser?.uid)
  // console.log(auth?.currentUser)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [badInfo, setBadInfo] = useState(false)
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home'); // Navigate to home page upon successful sign-in
    } catch (err) {
      setBadInfo(true)
      // console.error(err);
    }
  }
  
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/home'); // Navigate to home page upon successful Google sign-in
    } catch (err) {
      setBadInfo(true)
      // console.error(err);
    }
  }

  return (
    <div className='mainContainer'>
      <div className='otherContainer'>
        <div><input autoFocus placeholder='Email...' onChange={(e) => setEmail(e.target.value)}></input></div>
        <div><input placeholder='Password...' type='password' onChange={(e) => setPassword(e.target.value)}></input></div>
        {badInfo && <div className='invalid spacing'>Invalid email or password.</div>}
        <div className='spacing'>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
        <div>
          <button onClick={handleGoogleSignIn}>Sign In with Google</button>
        </div>
      </div>
    </div>
  )
}
