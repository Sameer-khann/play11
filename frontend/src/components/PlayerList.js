import React from 'react';
import { Link } from 'react-router-dom';
import './PlayerList.css';

const PlayerList = ({ players }) => {
    return (
        <div className="player-list">
            <h2>Available Players</h2>
            <div className="player-cards">
                {players.map((player) => (
                    <div key={player.id} className="player-card">
                        <img src={player.image} alt={player.name} className="player-image" />
                        <div className="player-details">
                            <h3>{player.name}</h3>
                            <p>Role: {player.role}</p>
                            <p>Points: {player.points}</p>
                        </div>
                        <Link to="/create-team" className="add-button">
                            Add to Team
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayerList;
