import React, { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase.js'
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  console.log(auth?.currentUser?.email)

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home'); // Navigate to home page upon successful sign-in
    } catch (err) {
      console.error(err);
    }
  }
  
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/home'); // Navigate to home page upon successful sign-up
    } catch (err) {
      console.error(err);
    }
  }
  
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/home'); // Navigate to home page upon successful Google sign-in
    } catch (err) {
      console.error(err);
    }
  }

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Navigate to login page after logout
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <input placeholder='Email...' onChange={(e) => setEmail(e.target.value)}></input>
      <input placeholder='Password...' type='password' onChange={(e) => setPassword(e.target.value)}></input>
      <button onClick={handleSignUp}>Create user</button>
      <button onClick={handleSignIn}>Sign In with Email</button>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}
