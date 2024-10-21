import Player from '../models/player.model.js';


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
