import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import logo from '../img/logo.png';

// const Navbar = ({ totalTeams, totalPlayers, userProfile }) => {
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <img src= {logo} alt="Play11 Logo" className="logo" />
                </Link>
            </div>

            <div className="navbar-center">
                {/* Links */}
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/create-team" className="nav-link">Create Team</Link>
            </div>

            <div className="navbar-right">
                {/* Total Teams */}
                <div className="nav-item">
                    {/* <span>Total Teams: {totalTeams}</span> */}
                    <span>Total Teams</span>
                </div>

                {/* Total Players */}
                <div className="nav-item">
                    {/* <span>Total Players: {totalPlayers}</span> */}
                    <span>Total Players</span>
                </div>

                {/* User Profile */}
                {/* <div className="nav-item profile">
                    <img src={userProfile.image} alt="User" className="profile-image" />
                    <span>{userProfile.name}</span>
                </div> */}
            </div>
        </nav>
    );
};

export default Navbar;
