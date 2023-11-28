import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./components/HomePage";
import LogInPage from "./components/LogInPage";
import SignUpPage from "./components/SignUpPage";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
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
    return <div className="loading-container"></div>; // Show some loading text while waiting if you want...
  }

  return (
    <div className="App">
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={!isAuthenticated ? <LogInPage /> : <Navigate to="/home" replace />} />
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/home" replace />} />
        <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}

export default App;