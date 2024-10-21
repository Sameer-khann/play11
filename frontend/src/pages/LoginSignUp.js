// src/components/LoginSignup.js
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API requests
import './LoginSignUp.css'; // Import CSS for styling

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin ? 'http://localhost:8000/login' : 'http://localhost:8000/signup';
            const response = await axios.post(url, formData);
            setMessage(response.data.message || 'Success!'); // Display success message
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred'); // Display error message
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/logout');
            setMessage('Successfully logged out');
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred during logout');
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
                <button type="submit" className="submit-button">
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </p>
            {message && <p className="message">{message}</p>}
            {isLogin && <button onClick={handleLogout} className="logout-button">Logout</button>}
        </div>
    );
};

export default LoginSignup;