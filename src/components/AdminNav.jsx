import { Link } from 'react-router-dom';

export const AdminNav = () => {
    const navStyle = {
        backgroundColor: 'var(--primary-color)', // Use CSS variable for primary color
        padding: '1rem',
        color: 'white'
    };

    const titleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem'
    };

    const navListStyle = {
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem'
    };

    const navLinkStyle = {
        color: '#d1d5db', // Tailwind's gray-300
        textDecoration: 'none',
        transition: 'color 0.3s'
    };

    const navLinkHoverStyle = {
        color: 'white'
    };

    return (
     <nav className="flex justify-between items-center" style={navStyle}></nav>
    );
};
