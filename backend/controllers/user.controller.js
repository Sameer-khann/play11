// src/controllers/user.controller.js
import User from '../models/user.model.js'; // Import User model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Replace with your secret key

// Sign Up (Sign In)
export const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    //console.log("This is user's info : ", req.body)

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        //console.log("This is user : ", user)

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // return res.status(200).json({ token, userId: user._id, name: user.name });

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'None'}).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })

    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Logout
export const logout = (req, res) => {
    // For this implementation, we can handle logout on the client-side
    // by simply deleting the token. However, if you want to implement
    // a more secure logout, you can invalidate the token here if you're
    // storing it in a database.

    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log("We are getting error here")
        console.log(error);
    }

    // res.status(200).json({ message: 'User logged out successfully.' });
};
