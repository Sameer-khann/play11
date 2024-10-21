// src/components/PlayerList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PlayerList.css';

const PlayerList = () => {
    const [players, setPlayers] = useState([]); // State to hold players data
    const [loading, setLoading] = useState(true); // State to manage loading status

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/players`); // Fetch all players
                setPlayers(response.data); // Assuming response.data is an array of players
            } catch (error) {
                console.error('Error fetching players:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    // Show loading message while fetching
    if (loading) {
        return <div>Loading players data...</div>;
    }

    // If no players are found
    if (!players.length) {
        return <div>No players found.</div>;
    }

    return (
        <div className="player-list">
            <h2>Available Players</h2>
            <div className="player-cards">
                {players.map((player) => (
                    <div key={player._id} className="player-card">
                        <img src={player.profileImage} alt={player.name} className="player-image" />
                        <div className="player-details">
                            <h3 className="player-name">{player.name}</h3>
                            <p className="player-role">Role: {player.role}</p>
                            <p className="player-points">Points: {player.points}</p>
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
