// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../img/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/authSlice'; // Import your clearUser action
import LogoutModal from './LogoutModal'; // Import the LogoutModal component
import axios from 'axios';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const naviagte = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);


    const handleLogout = async () => {
        try {
            await axios.post('https://localhost:8000/users/logout', {},
                {
                    withCredentials: true
                });
            dispatch(clearUser());
            naviagte("/")
        } catch (error) {
            console.error('Logout has been failed:', error);
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <Link to="/" className="navbar-logo">
                        <img src={logo} alt="Play11 Logo" className="logo" />
                    </Link>
                </div>

                <div className="navbar-right">
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/LoginSignUp"><span variant="outline">Login /</span></Link>
                                <Link to="/LoginSignUp"><span className="logonButton"> Signup</span></Link>
                            </div>
                        ) : (
                            <div className="nav-item profile" onClick={() => setModalOpen(true)}>
                                <span>{user}</span> {/* Change this to user.name if it's an object */}
                            </div>
                        )
                    }
                </div>
            </nav>

            <LogoutModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onLogout={handleLogout}
            />
        </>
    );
};

export default Navbar;