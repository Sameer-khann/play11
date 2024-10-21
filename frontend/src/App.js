import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

import Home from './pages/Home'; // Import the Home component
import CreateTeam from './components/CreateTeam';
import image from './img/logo.png';

const teamName = "Team Alpha";
const score = 150;
const players = [
  { name: "Player 1" },
  { name: "Player 2" },
  { name: "Player 3" },
  { name: "Player 4" },
];

const availablePlayers = [
  {
    id: 1,
    name: "Player One",
    role: "Forward",
    points: 85,
    image: image
  },
  {
    id: 2,
    name: "Player Two",
    role: "Midfielder",
    points: 90,
    image: image
  },
  {
    id: 3,
    name: "Player Three",
    role: "Forward",
    points: 85,
    image: image
  },
  {
    id: 4,
    name: "Player Four",
    role: "Midfielder",
    points: 90,
    image: image
  },
  {
    id: 5,
    name: "Player One",
    role: "Forward",
    points: 85,
    image: image
  },
  {
    id: 6,
    name: "Player Two",
    role: "Midfielder",
    points: 90,
    image: image
  },
  {
    id: 7,
    name: "Player Three",
    role: "Forward",
    points: 85,
    image: image
  },
  {
    id: 8,
    name: "Player Four",
    role: "Midfielder",
    points: 90,
    image: image
  },
  {
    id: 9,
    name: "Player One",
    role: "Forward",
    points: 85,
    image: image
  },
  {
    id: 10,
    name: "Player Two",
    role: "Midfielder",
    points: 90,
    image: image
  },
  {
    id: 11,
    name: "Player Three",
    role: "Forward",
    points: 85,
    image: image
  },
  {
    id: 12,
    name: "Player Four",
    role: "Midfielder",
    points: 90,
    image: image
  },
];

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <div className="App">
          <Routes>
            {/* Route for Home page */}
            <Route
              path="/" element={<Home teamName={teamName} score={score} players={players} availablePlayers={availablePlayers}
              />
              }
            />

            {/* Route for Create Team page */}
            <Route
              path="/create-team"
              element={<CreateTeam availablePlayers={availablePlayers} />}
            />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
