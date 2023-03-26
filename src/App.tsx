import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import GroupSessions from './GroupSessions';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [role, setRole] = useState('');

  const handleLogin = (role: string) => {
    setIsLoggedIn(true);
    setRole(role);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}/>
        <Route path="/dashboard" element={ isLoggedIn ? (
            <>
              <Dashboard role={role} onLogout={() => setIsLoggedIn(false)} />
            </>
          ) : (
            <Navigate to="/" />
          )} />
        <Route path="/group-sessions-instructor" element={ isLoggedIn ? (
            <>
              <GroupSessions onLogout={() => setIsLoggedIn(false)} />
            </>
          ) : (
            <Navigate to="/" />
          )} />
      </Routes>
    </Router>
  );
}

export default App;
