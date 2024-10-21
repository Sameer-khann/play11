import React, { useState, useEffect } from 'react';
import './CreateTeam.css';
import axios from 'axios'; // Import axios
import Swal from 'sweetalert2'; // Import SweetAlert2

const CreateTeam = () => {
    const [teamName, setTeamName] = useState('');
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [availablePlayers, setAvailablePlayers] = useState([]); // State for available players

    useEffect(() => {
        // Fetch players from the database when the component mounts
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/players'); // Adjust the URL based on your API
                setAvailablePlayers(response.data); // Set available players from the response
            } catch (error) {
                console.error("Error fetching players:", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Could not fetch players. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        };

        fetchPlayers();
    }, []); // Empty dependency array means this runs once on mount

    const handlePlayerSelect = (player) => {
        if (selectedPlayers.length < 11 && !selectedPlayers.includes(player)) {
            setSelectedPlayers([...selectedPlayers, player]);
        } else {
            alert("You can only add up to 11 players.");
        }
    };

    const handlePlayerRemove = (player) => {
        setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const teamData = {
                teamName,
                players: selectedPlayers.map(player => player.id) // Only include player IDs
            };
    
            // POST request to create a team using axios
            const response = await axios.post('http://localhost:8000/teams', teamData);
    
            if (response.status === 201) {
                // Show success alert using SweetAlert2
                Swal.fire({
                    title: 'Team Created!',
                    text: `Team "${teamName}" created successfully with ${selectedPlayers.length} players!`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
    
                // Reset form
                setTeamName('');
                setSelectedPlayers([]);
            }
        } catch (error) {
            console.error("Error creating team:", error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue creating the team. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
    

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const teamData = {
    //             teamName,
    //             players: selectedPlayers.map(player => ({
    //                 id: player.id,
    //                 name: player.name,
    //                 role: player.role,
    //                 points: player.points
    //             }))
    //         };

    //         // POST request to create a team using axios
    //         const response = await axios.post('http://localhost:8000/teams', teamData);

    //         if (response.status === 201) {
    //             // Show success alert using SweetAlert2
    //             Swal.fire({
    //                 title: 'Team Created!',
    //                 text: `Team "${teamName}" created successfully with ${selectedPlayers.length} players!`,
    //                 icon: 'success',
    //                 confirmButtonText: 'OK'
    //             });

    //             // Reset form
    //             setTeamName('');
    //             setSelectedPlayers([]);
    //         }
    //     } catch (error) {
    //         console.error("Error creating team:", error);
    //         Swal.fire({
    //             title: 'Error!',
    //             text: 'There was an issue creating the team. Please try again later.',
    //             icon: 'error',
    //             confirmButtonText: 'OK'
    //         });
    //     }
    // };

    return (
        <div className="create-team">
            <h2>Create or Edit Team</h2>
            <form onSubmit={handleSubmit} className="team-form">
                <div className="form-group">
                    <label htmlFor="teamName">Team Name:</label>
                    <input
                        type="text"
                        id="teamName"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                    />
                </div>

                <div className="selected-players">
                    <h3>Selected Players ({selectedPlayers.length}/11)</h3>
                    <div className="selected-player-cards">
                        {selectedPlayers.map(player => (
                            <div key={player.id} className="selected-player-card">
                                <span>{player.name}</span>
                                <button type="button" onClick={() => handlePlayerRemove(player)}>Remove</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="available-players">
                    <h3>Available Players</h3>
                    <div className="player-cards">
                        {availablePlayers.map(player => (
                            <div key={player._id} className="player-card">
                                <img src={player.profileImage} alt={player.name} className="player-image" />
                                <div className="player-details">
                                    <h4>{player.name}</h4>
                                    <p>Role: {player.role}</p>
                                    <p>Points: {player.points}</p>
                                    <button
                                        type="button"
                                        onClick={() => handlePlayerSelect(player)}
                                        disabled={selectedPlayers.includes(player) || selectedPlayers.length >= 11}
                                    >
                                        Add to Team
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="submit-button">Create Team</button>
            </form>
        </div>
    );
};

export default CreateTeam;