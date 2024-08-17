import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faEnvelope, faCogs, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import logoutIcon from '../assets/logout.png'; // Adjust this path if necessary
import './styles/Navbar.css'

const Navbar = () => {
    const [user, setUser] = useState({
        name: 'User',
        profilePhoto: null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('');
    };

    const handleNavClick = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goToProfile = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container flex items-center justify-between px-4 py-2">
                <Link to="/" className="navbar-brand" onClick={scrollToTop}>
                    NairobiKonnect
                </Link>
                <ul className="navbar-menu flex space-x-4">
                    <li>
                        <a href="/#home" className="navbar-item" onClick={scrollToTop}>
                            <FontAwesomeIcon icon={faHome} className="icon" /> Home
                        </a>
                    </li>
                    <li>
                        <a href="/#services" className="navbar-item" onClick={() => handleNavClick('services')}>
                            <FontAwesomeIcon icon={faCogs} className="icon" /> Services
                        </a>
                    </li>
                    <li>
                        <a href="/#contact" className="navbar-item" onClick={() => handleNavClick('contact')}>
                            <FontAwesomeIcon icon={faEnvelope} className="icon" /> Contact
                        </a>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Link to="/user" className="navbar-item">
                                    <FontAwesomeIcon icon={faUser} className="icon" /> {user.name}
                                </Link>
                            </li>
                            <li>
                                <div onClick={handleLogout} className="cursor-pointer">
                                    <img src={logoutIcon} alt="Logout" className="h-11 w-11 ml-4 transition-transform duration-200 hover:scale-110" />
                                </div>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login" className="navbar-item login-button">
                                <FontAwesomeIcon icon={faSignInAlt} className="icon" /> Login
                            </Link>
                        </li>
                    )}
                </ul>
                
                {/* Profile Section */}
                {/* <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="flex flex-col items-center mr-24" onClick={goToProfile}>
                        {user.profilePhoto ? (
                            <img
                                src={user.profilePhoto}
                                alt="Profile"
                                className="h-12 w-12 rounded-full object-cover border border-gray-300"
                            />
                        ) : (
                            <div className="bg-gray-200 h-12 w-12 rounded-full flex items-center justify-center text-gray-700 text-lg border border-gray-300">
                                {getInitials(user.name)}
                            </div>
                        )}
                        <div className="text-sm font-medium text-gray-700 mt-1">
                            {getInitials(user.name)}
                        </div>
                    </div>
                    
                </div> */}
            </div>
        </nav>
    );
};

export default Navbar;
