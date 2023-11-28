import React from 'react'
import { auth } from '../config/firebase.js'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
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
      <button>Home Page</button>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}
