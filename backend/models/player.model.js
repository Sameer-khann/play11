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
    // required: true (you can enable this later if needed)
  },
  points: {
    type: Number,
    required: true,
    min: 0
  },
  profileImage: {
    type: String, // You can store a URL to the image
    required: true, // Set to true if you want to make the image mandatory
  }
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
