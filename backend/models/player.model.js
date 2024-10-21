import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper'],
    required: true
  },
  team: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true,
    min: 0
  }
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
