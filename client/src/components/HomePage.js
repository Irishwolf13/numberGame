import React from 'react'
import { auth } from '../config/firebase.js'
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      Home Page
    </div>
  )
}
