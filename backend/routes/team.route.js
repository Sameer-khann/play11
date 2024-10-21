import express from 'express';
import { createTeam, getTeamById } from '../controllers/teams.controller.js';

const router = express.Router();

// Route to create a new team
router.post('/teams', createTeam);

// Route to get a team by ID
router.get('/teams/:id', getTeamById);

export default router;
