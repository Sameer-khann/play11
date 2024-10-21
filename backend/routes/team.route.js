import express from 'express';
import { createTeam, getTeamById } from '../controllers/teams.controller.js';

const router = express.Router();

// Route to create a new team
router.post('/', createTeam); // Change this line

// Route to get a team by ID
router.get('/:id', getTeamById); // Change this line as well

export default router;