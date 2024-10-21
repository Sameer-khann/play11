import React from 'react';
import CurrentTeamSection from '../components/CurrentTeamSection';
import PlayerList from '../components/PlayerList';

const Home = ({ teamName, score, players, availablePlayers }) => {
  return (
    <div className="home">
      <CurrentTeamSection teamName={teamName} score={score} players={players} />
      <PlayerList players={availablePlayers} />
    </div>
  );
};

export default Home;
