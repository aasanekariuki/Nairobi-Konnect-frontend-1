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
        <div style={navStyle}>
            <h1 style={titleStyle}>Admin Dashboard</h1>
            <nav>
                <ul style={navListStyle}>
                    <li>
                        <Link 
                            to="/admin" 
                            style={navLinkStyle} 
                            onMouseOver={(e) => e.currentTarget.style.color = navLinkHoverStyle.color}
                            onMouseOut={(e) => e.currentTarget.style.color = navLinkStyle.color}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/admin/users" 
                            style={navLinkStyle} 
                            onMouseOver={(e) => e.currentTarget.style.color = navLinkHoverStyle.color}
                            onMouseOut={(e) => e.currentTarget.style.color = navLinkStyle.color}
                        >
                            Manage Users
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/admin/activity" 
                            style={navLinkStyle} 
                            onMouseOver={(e) => e.currentTarget.style.color = navLinkHoverStyle.color}
                            onMouseOut={(e) => e.currentTarget.style.color = navLinkStyle.color}
                        >
                            View Activity
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
