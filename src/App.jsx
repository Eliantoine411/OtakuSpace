import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Immediately check the session on app load
    const session = supabase.auth.session();
    console.log('Session:', session); // Debugging session
    setUser(session?.user ?? null);
    setLoading(false);

    // Listen to auth state changes and update user state
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', session); // Debugging auth state change
      setUser(session?.user ?? null);
      setLoading(false); // Stop loading after session is set
    });

    return () => {
      authListener?.unsubscribe(); // Clean up the listener when the component unmounts
    };
  }, []);

  // Handle the loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user is logged in, show the login page
  if (user === null) {
    return <Login />;
  }

  // If the user is logged in, show the home page
  return <Home />;
}

export default App;
