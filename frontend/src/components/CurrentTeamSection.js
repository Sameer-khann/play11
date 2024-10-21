// src/components/CurrentTeamSection.js
import React, { useEffect, useState } from 'react';
import { FaUsers, FaStar } from 'react-icons/fa'; // Importing icons from react-icons
import axios from 'axios'; // Importing axios for API calls
import './CurrentTeamSection.css';

const CurrentTeamSection = () => {
    const [team, setTeam] = useState(null); // State to hold team data
    const [loading, setLoading] = useState(true); // State to manage loading status
    const teamId = '6716c303d4cd17dfe97853c0'; // Team ID to fetch

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/teams/${teamId}`);
                setTeam(response.data);
            } catch (error) {
                console.error('Error fetching team:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    // Show loading message while fetching
    if (loading) {
        return <div>Loading team data...</div>;
    }

    // If team data is not available
    if (!team) {
        return <div>No team data available.</div>;
    }

    const calculateTotalPoints = (players) => {
        return players.reduce((total, player) => total + player.points, 0);
    };

    // Calculate total points
    const teamPoints = calculateTotalPoints(team.players);

    return (
        <div className="current-team-section">
            <div className="current-team-details">
                <h2>{team.name}</h2> {/* Updated to use team.name */}
                <div className="score-info">
                    <FaStar className="icon" />
                    <span className="score">Current Score: {teamPoints}</span> {/* Assuming team has a score field */}
                </div>
                <div className="players-info">
                    <FaUsers className="icon" />
                    <span className="number-of-players">Players: {team.players.length}</span>
                </div>
                <div className="players-list">
                    <h3>Players:</h3>
                    <ul>
                        {team.players.map((player, index) => (
                            <li key={index}>{player.name}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="create-team-button">
                <button>Create Team</button>
            </div>
        </div>
    );
};

export default CurrentTeamSection;
