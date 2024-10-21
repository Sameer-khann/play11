// src/components/CurrentTeamSection.js
import React, { useEffect, useState } from 'react';
import { FaUsers, FaStar } from 'react-icons/fa'; // Importing icons from react-icons
import axios from 'axios'; // Importing axios for API calls
import './CurrentTeamSection.css';

const CurrentTeamSection = () => {
    const [team, setTeam] = useState(null); // State to hold team data
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [expanded, setExpanded] = useState(false); // State to manage view all players
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

    // Function to calculate total points of the team
    const calculateTotalPoints = (players) => {
        return players.reduce((total, player) => total + player.points, 0);
    };

    // Show loading message while fetching
    if (loading) {
        return <div>Loading team data...</div>;
    }

    // If team data is not available
    if (!team) {
        return <div>No team data available.</div>;
    }

    // Calculate total points
    const teamPoints = calculateTotalPoints(team.players);

    // Handle expand/collapse
    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    // Get players to display (either 3 or all if expanded)
    const displayedPlayers = expanded ? team.players : team.players.slice(0, 3);

    return (
        <div className="current-team-section">
            <div className="current-team-details">
                <h2>{team.name}</h2>
                <div className="score-info">
                    <FaStar className="icon" />
                    <span className="score">Current Score: {teamPoints}</span>
                </div>
                <div className="players-info">
                    <FaUsers className="icon" />
                    <span className="number-of-players">Players: {team.players.length}</span>
                </div>
                <div className="players-list">
                    <h3>Players:</h3>
                    <div className="player-cards">
                        {displayedPlayers.map((player, index) => (
                            <div key={index} className="player-card">
                                <img src={player.profileImage} alt={`${player.name}'s profile`} className="profile-image" />
                                <div className="player-info">
                                    <span className="player-name">{player.name}</span>
                                    <span className="player-role">{player.role}</span>
                                    <span className="player-points">Points: {player.points}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {team.players.length > 3 && (
                        <button className="view-all-players" onClick={toggleExpand}>
                            {expanded ? 'Show Less' : 'View All Players'}
                        </button>
                    )}
                </div>
            </div>

            <div className="create-team-button">
                <button>Create Team</button>
            </div>
        </div>
    );
};

export default CurrentTeamSection;
