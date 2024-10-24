import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateTeam from './components/CreateTeam';
import LoginSignup from './pages/LoginSignUp';


function App() {
  return (
    <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/LoginSignup" element={<LoginSignup />} />
            <Route path="/create-team" element={<CreateTeam />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
