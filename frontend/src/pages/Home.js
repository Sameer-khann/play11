import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // React Router for navigation
import CurrentTeamSection from '../components/CurrentTeamSection';
import PlayerList from '../components/PlayerList';

const Home = ({ teamName, score, players, availablePlayers }) => {
  const user = useSelector((state) => state.auth.user); // Get user data from Redux
  const navigate = useNavigate();

  return (
    <div className="home">
      
      <CurrentTeamSection teamName={teamName} score={score} players={players} />
      <PlayerList players={availablePlayers} />
    </div>
  );
};

export default Home;
