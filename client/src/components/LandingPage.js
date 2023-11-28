import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  }
  const handleLogIn = () => {
    navigate('/login');
  }

  return (
    <div className='mainContainer'>
      <div className='otherContainer'>
        <button onClick={handleSignUp}>Sign up</button>
        <button onClick={handleLogIn}>Log In</button>
      </div>
    </div>
  )
}
