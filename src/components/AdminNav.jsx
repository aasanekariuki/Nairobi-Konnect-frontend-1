import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

export const AdminNav = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navStyle = {
        backgroundColor: 'var(--primary-color)',
        padding: '1rem',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const titleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    };

    const navListStyle = {
        display: isMobileMenuOpen ? 'block' : 'none',
        position: 'absolute',
        top: '4rem',
        left: 0,
        width: '100%',
        backgroundColor: 'var(--primary-color)',
        padding: '1rem',
    };

    const navLinkStyle = {
        color: '#d1d5db',
        textDecoration: 'none',
        padding: '0.5rem 0',
        display: 'block',
    };

    const navLinkHoverStyle = {
        color: 'white',
    };

    const menuIconStyle = {
        fontSize: '1.5rem',
        cursor: 'pointer',
    };

    const isAdmin = true;
    const canManageUsers = true;

    return (
        <nav style={navStyle}>
            <h1 style={titleStyle}>Admin Dashboard</h1>
            <div className="md:hidden" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <FaTimes style={menuIconStyle} /> : <FaBars style={menuIconStyle} />}
            </div>
            <ul className={`md:flex md:items-center md:gap-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`} style={navListStyle}>
                <li>
                    <NavLink
                        to="/admin"
                        style={navLinkStyle}
                        className={({ isActive }) =>
                            isActive ? 'text-white' : 'hover:text-white'
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
                {isAdmin && canManageUsers && (
                    <li>
                        <NavLink
                            to="/admin/users"
                            style={navLinkStyle}
                            className={({ isActive }) =>
                                isActive ? 'text-white' : 'hover:text-white'
                            }
                        >
                            Manage Users
                        </NavLink>
                    </li>
                )}
                <li>
                    <NavLink
                        to="/admin/activity"
                        style={navLinkStyle}
                        className={({ isActive }) =>
                            isActive ? 'text-white' : 'hover:text-white'
                        }
                    >
                        View Activity
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/settings"
                        style={navLinkStyle}
                        className={({ isActive }) =>
                            isActive ? 'text-white' : 'hover:text-white'
                        }
                    >
                        Settings
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
