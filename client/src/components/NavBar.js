import React from 'react'
import { auth } from '../config/firebase.js'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      alert('You have been logged out.')
      navigate('/'); // Navigate to login page after logout
    } catch (err) {
      console.error(err);
    }
  }
  const handleGoHome = () => {navigate('/home');}
  const handleCreateCharacter = () => {
    console.log('iran')
    navigate('/createCharacter');
  }

  return (
    <div className='navBar'>
      <button onClick={handleGoHome}>Home page</button>
      <button onClick={handleCreateCharacter}>Create Character</button>
      <button>Select Character</button>
      <button>Other</button>
      <button onClick={handleLogOut}>Log Out</button>
      {/* {auth.currentUser.email} */}
    </div>
  )
}
