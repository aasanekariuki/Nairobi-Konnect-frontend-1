import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faEnvelope, faCogs, faSignInAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logoutIcon from '../assets/logout.png'; // Adjust this path if necessary
import './styles/Navbar.css';

const Navbar = () => {
    const [user, setUser] = useState({
        name: 'User',
        profilePhoto: null,
    });

    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        localStorage.removeItem('user');
        navigate('/login');
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
    <li>
        <Link to="/user" className="navbar-item">
            <FontAwesomeIcon icon={faUser} className="icon" /> <span className="menu-text">User</span>
        </Link>
    </li>
    <li>
        <Link to="/login" className="navbar-item login-button">
            <FontAwesomeIcon icon={faSignInAlt} className="icon" /> <span className="menu-text">Login</span>
        </Link>
    </li>
    <li>
        <div onClick={handleLogout} className="cursor-pointer">
            <img src={logoutIcon} alt="Logout" className="h-8 w-8 ml-4 transition-transform duration-200 hover:scale-110" />
        </div>
    </li>
</ul>

            </div>
        </nav>
    );
};

export default Navbar;
