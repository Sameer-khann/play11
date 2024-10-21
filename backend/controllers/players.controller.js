import Player from '../models/player.model.js';


export const addPlayer = async (req, res) => {
  try {
    const { name, role, points, profileImage, team } = req.body;

    // Check if required fields are provided
    if (!name || !role || points === undefined || !profileImage) {
      return res.status(400).json({ message: 'All fields (name, role, points, profileImage) are required.' });
    }

    // Create a new player instance
    const newPlayer = new Player({
      name,
      role,
      points,
      profileImage,
      team // team is optional
    });

    // Save the player to the database
    await newPlayer.save();

    return res.status(201).json({ message: 'Player added successfully.', player: newPlayer });
  } catch (error) {
    console.error('Error adding player:', error);
    return res.status(500).json({
      message: 'An error occurred while adding the player. Please try again later.',
      error: error.message,
    });
  }
};



export const getAllPlayers = async (req, res) => {
  try {
    
    const players = await Player.find();

    
    if (!players || players.length === 0) {
      return res.status(404).json({ message: 'No players found.' });
    }

    
    return res.status(200).json(players);
  } catch (error) {
    
    console.error('Error fetching players:', error);
    return res.status(500).json({
      message: 'An error occurred while retrieving players. Please try again later.',
      error: error.message,
    });
  }
};