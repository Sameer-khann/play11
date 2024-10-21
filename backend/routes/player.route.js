import express from 'express';
import { getAllPlayers, addPlayer } from '../controllers/players.controller.js';

const router = express.Router();

// Route to add a new player
router.post('/', addPlayer);

// Route to get all players
router.get('/', getAllPlayers);

export default router;
