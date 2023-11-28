import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./components/HomePage";
import LogInPage from "./components/LogInPage";
import SignUpPage from "./components/SignUpPage";
import LandingPage from "./components/LandingPage";
import { auth } from "./config/firebase";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user); // Set isAuthenticated to true if user is not null
      setLoading(false); // Set loading to false once the auth state is confirmed
    });

    return () => unsubscribe(); // Make sure to unsubscribe on cleanup
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show some loading text or spinner while waiting for auth to initialize
  }

  return (
    <div className="App">
      {isAuthenticated && <div>THIS</div>}

      <Routes>
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;