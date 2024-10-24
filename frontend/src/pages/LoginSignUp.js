// src/components/LoginSignup.js
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API requests
import './LoginSignUp.css'; // Import CSS for styling
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser, setLoading } from '../redux/authSlice'; // Redux actions
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, isAuthenticated } = useSelector((state) => state.auth); // Get auth state from Redux

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle login API call
    const handleLogin = async () => {
        try {
            dispatch(setLoading(true)); // Start loading
            const response = await axios.post('http://localhost:8000/users/login', {
                email: formData.email,
                password: formData.password,
            });
            dispatch(setUser(response.data.name)); // Set user in Redux store
            console.log("The API entire data : ", response)
            console.log("The API data : ", response.data.user)
            setMessage(response.data.message || 'Login successful!');
            navigate("/")
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed.');
        } finally {
            dispatch(setLoading(false)); // Stop loading
        }
    };

    // Handle signup API call
    const handleSignup = async () => {
        try {
            dispatch(setLoading(true)); // Start loading
            const response = await axios.post('http://localhost:8000/users/signup', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            dispatch(setUser(response.data.user)); // Set user in Redux store
            setMessage(response.data.message || 'Signup successful!');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Signup failed.');
        } finally {
            dispatch(setLoading(false)); // Stop loading
        }
    };

    // Handle form submission based on login/signup state
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            handleLogin(); // Call login API
        } else {
            handleSignup(); // Call signup API
        }
    };

    // Handle user logout
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/users/logout');
            dispatch(clearUser()); // Clear user from Redux store
            setMessage('Successfully logged out');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Logout failed.');
        }
    };

    return (
        <div className="login-signup-container">
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={handleSubmit} className="form">
                {!isLogin && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="submit-button" disabled={loading}>
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </p>
            {message && <p className="message">{message}</p>}
            {isAuthenticated && isLogin && (
                <button onClick={handleLogout} className="logout-button" disabled={loading}>
                    Logout
                </button>
            )}
        </div>
    );
};

export default LoginSignup;