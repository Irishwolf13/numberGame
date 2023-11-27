import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./components/HomePage";
import Auth from "./components/Auth";
import { auth } from "./config/firebase"; // Ensure correct path to firebase configuration

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
      {/* Conditionally render the div based on isAuthenticated */}
      {isAuthenticated && <div style={{ color: 'green' }}>THIS</div>}

      <Routes>
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/" replace />} />
        <Route path="/" element={<Auth />} />
        {/* Add routes as needed */}
      </Routes>
    </div>
  );
}

export default App;