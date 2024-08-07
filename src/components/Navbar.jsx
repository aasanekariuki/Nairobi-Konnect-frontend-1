import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faInfoCircle, faCogs, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const handleNavClick = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand" onClick={scrollToTop}>
                    NairobiKonnect
                </Link>
                <ul className="navbar-menu">
                    <li>
                        <a href="#home" className="navbar-item" onClick={scrollToTop}>
                            <FontAwesomeIcon icon={faHome} className="icon" /> Home
                        </a>
                    </li>
                    <li>
                        <a href="#services" className="navbar-item" onClick={() => handleNavClick('services')}>
                            <FontAwesomeIcon icon={faCogs} className="icon" /> Services
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="navbar-item" onClick={() => handleNavClick('contact')}>
                            <FontAwesomeIcon icon={faEnvelope} className="icon" /> Contact
                        </a>
                    </li>
                    <li>
                        <Link to="/signup" className="navbar-item">
                            <FontAwesomeIcon icon={faSignInAlt} className="icon" /> Signup
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="navbar-item login-button">
                            <FontAwesomeIcon icon={faSignInAlt} className="icon" /> Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;