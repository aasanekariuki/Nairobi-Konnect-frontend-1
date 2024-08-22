import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faEnvelope, faCogs, faSignInAlt, faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logoutIcon from "../../assets/logout.png"; 
// import "../../styles/Navbar.css";
// import { useAuth } from './AuthContext'; // Import the useAuth hook

const Navbar = () => {
    const { user, setUser } = useAuth(); // Access user state and setUser function from context
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility

    useEffect(() => {
        // Check if the user is logged in by retrieving the user from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse and set user state
        }
    }, [setUser]); // Add setUser as a dependency

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('');
    };

    const handleNavClick = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false); // Close the menu after clicking
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMenuOpen(false); // Close the menu after clicking
    };

    const goToProfile = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        // Clear the user from localStorage and update state
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        setUser(null); // Update user state immediately
        navigate('/login'); // Navigate to the login page
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand" onClick={scrollToTop}>
                    NairobiKonnect
                </Link>
                <div className="menu-icon" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </div>
                <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li>
                        <a href="/#home" className="navbar-item" onClick={scrollToTop}>
                            <FontAwesomeIcon icon={faHome} className="icon" /> <span className="menu-text">Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="/#services" className="navbar-item" onClick={() => handleNavClick('services')}>
                            <FontAwesomeIcon icon={faCogs} className="icon" /> <span className="menu-text">Services</span>
                        </a>
                    </li>
                    <li>
                        <a href="/#contact" className="navbar-item" onClick={() => handleNavClick('contact')}>
                            <FontAwesomeIcon icon={faEnvelope} className="icon" /> <span className="menu-text">Contact</span>
                        </a>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Link to="/user" className="navbar-item">
                                    <FontAwesomeIcon icon={faUser} className="icon" /> {user.name}
                                </Link>
                            </li>
                            <li className="relative">
                                <div onClick={() => setDropdownVisible(!dropdownVisible)} className="cursor-pointer flex items-center" aria-label="Logout">
                                    <FontAwesomeIcon icon={faSignOutAlt} className="h-6 w-6 ml-2 transition-transform duration-200 hover:scale-110" />
                                    <span className="ml-2">Logout</span>
                                </div>
                                {dropdownVisible && (
                                    <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                                        <div className="px-4 py-2 text-gray-800">Are you sure you want to log out?</div>
                                        <div className="flex justify-between">
                                            <button
                                                onClick={handleLogout}
                                                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                                            >
                                                Yes
                                            </button>
                                            <button
                                                onClick={() => setDropdownVisible(false)}
                                                className="px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login" className="navbar-item login-button">
                                <FontAwesomeIcon icon={faSignInAlt} className="icon" /> <span className="menu-text">Login</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
