import Team from '../models/team.model.js';
import Player from '../models/player.model.js';


export const createTeam = async (req, res) => {
  try {
    const { teamName, players } = req.body;

    console.log("Team name is : ", teamName)

    // Check if team name and players are provided
    if (!teamName || !players || players.length === 0) {
      return res.status(400).json({ message: 'Team name and players are required.' });
    }

    // Check if players exceed 11
    if (players.length > 11) {
      return res.status(400).json({ message: 'A team can have a maximum of 11 players.' });
    }

    // Check if players exist in the database
    const foundPlayers = await Player.find({ _id: { $in: players } });
    if (foundPlayers.length !== players.length) {
      return res.status(404).json({ message: 'Some players are not found in the database.' });
    }

    // Calculate total points based on the players' points
    const totalPoints = foundPlayers.reduce((total, player) => total + player.points, 0);

    // Create new team
    const newTeam = new Team({
      teamName,
      players,
      totalPoints
    });

    // Save the team to the database
    await newTeam.save();

    return res.status(201).json({ message: 'Team created successfully.', team: newTeam });
  } catch (error) {
    console.error('Error creating team:', error);
    return res.status(500).json({
      message: 'An error occurred while creating the team. Please try again',
      error: error.message,
    });
  }
};


// Controller to get a team by ID
export const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the team by ID
    const team = await Team.findById(id).populate('players');

    // Check if the team exists
    if (!team) {
      return res.status(404).json({ message: 'Team not found.' });
    }

    // Return the team data
    return res.status(200).json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    return res.status(500).json({
      message: 'An error occurred while retrieving the team. Please try again later.',
      error: error.message,
    });
  }
};
