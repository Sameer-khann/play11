// src/routes/user.routes.js
import express from 'express';
import { signUp, login, logout } from '../controllers/user.controller.js';
// import { isAuthenticated } from '../middleware/isAuthenticate.js';
import { isAuthenticated } from '../middleware/IsAuthenticate.js';

const router = express.Router();

// User Sign Up
router.post('/signup', signUp);

// User Login
router.post('/login', login);

// User Logout
router.post('/logout', isAuthenticated, logout); // Protect the logout route

export default router;
