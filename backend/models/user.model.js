import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6 
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team' // Reference to the Team model
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
