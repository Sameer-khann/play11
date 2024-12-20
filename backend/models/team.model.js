import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  }],
  totalPoints: {
    type: Number,
    default: 0,
    required: true
  }
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

export default Team;
