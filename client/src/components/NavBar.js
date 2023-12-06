import React from 'react'
import { auth } from '../config/firebase.js'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const handleNavigate = (destination) => {navigate(`/${destination}`);}

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      alert('You have been logged out.')
      navigate('/'); // Navigate to login page after logout
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <div className='navBar'>
      <button onClick={() => handleNavigate('home')}>Home page</button>
      <button onClick={() => handleNavigate('createCharacter')}>Create Character</button>
      <button onClick={() => handleNavigate('selectCharacter')}>Select Character</button>
      <button>Other</button>
      <button onClick={handleLogOut}>Log Out</button>
      {/* {auth.currentUser.email} */}
    </div>
  )
}
