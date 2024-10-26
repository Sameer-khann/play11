// src/components/LogoutModal.js
import React from 'react';
import { useDispatch } from 'react-redux'; // Ensure this is imported
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearUser } from '../redux/authSlice'; // Import clearUser action
import './LogoutModal.css';

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
    const dispatch = useDispatch(); // Call useDispatch at the top
    const navigate = useNavigate(); // Call useNavigate at the top

    if (!isOpen) return null; // Don't render if not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Logout</h2>
                <p>Are you sure you want to logout?</p>
                <button onClick={onLogout}>Logout</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default LogoutModal;
